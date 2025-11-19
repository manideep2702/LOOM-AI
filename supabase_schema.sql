-- Create a table for public profiles
create table if not exists profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

-- Policies (Drop first to avoid errors if re-running)
drop policy if exists "Public profiles are viewable by everyone." on profiles;
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

drop policy if exists "Users can insert their own profile." on profiles;
create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

drop policy if exists "Users can update own profile." on profiles;
create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Trigger for new users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Storage: Create bucket if not exists
insert into storage.buckets (id, name)
values ('avatars', 'avatars')
on conflict (id) do nothing;

-- Storage Policies
drop policy if exists "Avatar images are publicly accessible." on storage.objects;
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

drop policy if exists "Anyone can upload an avatar." on storage.objects;
create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');

drop policy if exists "Anyone can update their own avatar." on storage.objects;
create policy "Anyone can update their own avatar." on storage.objects
  for update using (auth.uid() = owner) with check (bucket_id = 'avatars');
