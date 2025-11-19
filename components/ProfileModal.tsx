
import React, { useState, useRef } from 'react';
import { X, Camera, LogOut, User, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: SupabaseUser;
    profile: any;
    onUpdateUser: (payload?: { avatarUrl?: string }) => Promise<void> | void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, user, profile, onUpdateUser }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [localAvatarUrl, setLocalAvatarUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        onClose();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            return;
        }

        const file = event.target.files[0];
        const fileExt = file.name.split('.').pop();
        const uniqueId = typeof crypto !== 'undefined' && 'randomUUID' in crypto
            ? crypto.randomUUID()
            : Math.random().toString(36).slice(2);
        const fileName = `${user.id}/${uniqueId}.${fileExt}`;
        const filePath = `${fileName}`;

        setIsUploading(true);

        try {
            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: true,
                    contentType: file.type,
                });

            if (uploadError) {
                throw uploadError;
            }

            // Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            // Update Profile Table
            const updates = {
                id: user.id,
                avatar_url: publicUrl,
                updated_at: new Date().toISOString(),
            };

            const { error: updateError } = await supabase
                .from('profiles')
                .upsert(updates);

            if (updateError) {
                throw updateError;
            }

            await supabase.auth.updateUser({
                data: {
                    avatar_url: publicUrl,
                    picture: publicUrl,
                },
            });

            setLocalAvatarUrl(publicUrl);
            await onUpdateUser({
                avatarUrl: publicUrl,
            });
        } catch (error) {
            console.error('Error uploading avatar:', error);
            alert('Error uploading avatar. Please make sure the "avatars" bucket exists and is public.');
        } finally {
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            setIsUploading(false);
        }
    };

    const avatarUrl = localAvatarUrl || profile?.avatar_url || user.user_metadata?.avatar_url || user.user_metadata?.picture;
    const userName = profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative z-10 w-full max-w-sm bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-slide-up">

                {/* Header */}
                <div className="relative h-32 bg-gradient-to-br from-indigo-900/50 to-purple-900/50">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Profile Content */}
                <div className="px-6 pb-8 -mt-12 flex flex-col items-center">

                    {/* Avatar */}
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-full border-4 border-zinc-900 bg-zinc-800 overflow-hidden shadow-xl relative">
                            {avatarUrl ? (
                                <img src={avatarUrl} alt={userName} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-zinc-500">
                                    <User className="w-10 h-10" />
                                </div>
                            )}

                            {isUploading && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                                </div>
                            )}
                        </div>

                        {/* Edit Button */}
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="absolute bottom-0 right-0 p-2 bg-zinc-800 border border-zinc-700 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors shadow-lg"
                        >
                            <Camera className="w-4 h-4" />
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>

                    {/* User Info */}
                    <h2 className="mt-4 text-xl font-bold text-white">{userName}</h2>
                    <p className="text-sm text-zinc-500">{user.email}</p>

                    {/* Actions */}
                    <div className="mt-8 w-full space-y-3">
                        <button className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-sm font-medium text-zinc-300 hover:text-white transition-colors flex items-center justify-center gap-2">
                            Manage Account
                        </button>

                        <button
                            onClick={handleSignOut}
                            className="w-full py-2.5 px-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 transition-colors flex items-center justify-center gap-2"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};
