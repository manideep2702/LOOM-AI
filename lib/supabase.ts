
import { createClient } from '@supabase/supabase-js';


// TODO: Move these to .env.local in production
const supabaseUrl = 'https://ephskvtfqwlqtlbpitbs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwaHNrdnRmcXdscXRsYnBpdGJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzODc1OTMsImV4cCI6MjA3ODk2MzU5M30.YC9nlnUIftEb9I3zBv-pCfkBEXWT4EDXmcZwdIGYgNA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
