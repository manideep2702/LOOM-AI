import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface LegalLayoutProps {
    title: string;
    lastUpdated: string;
    children: React.ReactNode;
    icon?: 'shield' | 'file';
}

export const LegalLayout = ({ title, lastUpdated, children, icon = 'file' }: LegalLayoutProps) => {
    return (
        <div className="min-h-screen bg-black text-zinc-100 relative overflow-hidden selection:bg-indigo-500/30">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-32">
                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-16 text-center md:text-left"
                >
                    <div className="inline-flex items-center justify-center md:justify-start gap-3 mb-6">
                        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            {icon === 'shield' ? (
                                <Shield className="w-8 h-8 text-indigo-400" />
                            ) : (
                                <FileText className="w-8 h-8 text-indigo-400" />
                            )}
                        </div>
                        <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium uppercase tracking-wider">
                            Legal
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                        {title}
                    </h1>
                    <p className="text-zinc-500 text-sm">
                        Last updated: {lastUpdated}
                    </p>
                </motion.div>

                {/* Content Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="prose prose-invert prose-lg max-w-none"
                >
                    <div className="p-8 md:p-12 rounded-3xl bg-zinc-900/50 border border-white/5 backdrop-blur-md shadow-2xl ring-1 ring-white/10">
                        {children}
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-16 pt-8 border-t border-white/5 text-center text-zinc-600 text-sm"
                >
                    <p>© {new Date().getFullYear()} Loom.ai. All rights reserved.</p>
                </motion.div>
            </div>
        </div>
    );
};
