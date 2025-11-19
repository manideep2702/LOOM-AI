import React from 'react';
import { LegalLayout } from '../components/ui/legal-layout';

export const Privacy = () => {
    return (
        <LegalLayout
            title="Privacy Policy"
            lastUpdated={new Date().toLocaleDateString()}
            icon="shield"
        >
            <div className="space-y-12 text-zinc-300">
                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-bold border border-indigo-500/20">1</span>
                        Information We Collect
                    </h2>
                    <p className="leading-relaxed text-zinc-400">
                        We collect information you provide directly to us, such as when you create an account, use our services, or communicate with us. This may include:
                    </p>
                    <ul className="mt-4 space-y-2 list-disc list-inside text-zinc-400 ml-4">
                        <li>Account information (name, email, password)</li>
                        <li>Content you upload or generate using our AI tools</li>
                        <li>Communication preferences and history</li>
                        <li>Usage data and analytics</li>
                    </ul>
                </section>

                <div className="h-px bg-white/5" />

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-bold border border-indigo-500/20">2</span>
                        How We Use Your Information
                    </h2>
                    <p className="leading-relaxed text-zinc-400">
                        We use the information we collect to provide, maintain, and improve our services, as well as to communicate with you. Specifically, we use your data to:
                    </p>
                    <ul className="mt-4 space-y-2 list-disc list-inside text-zinc-400 ml-4">
                        <li>Process your transactions and manage your account</li>
                        <li>Improve our AI models and service performance</li>
                        <li>Send you technical notices, updates, and support messages</li>
                        <li>Respond to your comments and questions</li>
                    </ul>
                </section>

                <div className="h-px bg-white/5" />

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-bold border border-indigo-500/20">3</span>
                        Data Security
                    </h2>
                    <p className="leading-relaxed text-zinc-400">
                        We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access. We use industry-standard encryption and security protocols to safeguard your data.
                    </p>
                </section>

                <div className="h-px bg-white/5" />

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-bold border border-indigo-500/20">4</span>
                        Contact Us
                    </h2>
                    <p className="leading-relaxed text-zinc-400">
                        If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@loom.ai" className="text-indigo-400 hover:text-indigo-300 transition-colors">support@loom.ai</a>.
                    </p>
                </section>
            </div>
        </LegalLayout>
    );
};
