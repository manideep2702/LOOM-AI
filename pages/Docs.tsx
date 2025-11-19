import React from 'react';

export const Docs = () => {
    return (
        <div className="min-h-screen pt-32 pb-20 px-4 max-w-4xl mx-auto text-zinc-300">
            <h1 className="text-4xl font-bold text-white mb-8">Documentation</h1>

            <div className="space-y-8">
                <section className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h2 className="text-2xl font-semibold text-white mb-4">Getting Started with Loom.ai</h2>
                    <p className="mb-4">Loom.ai helps you create viral social media posts by analyzing successful content and generating new variations tailored to your topic.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">How to Use</h2>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">1</div>
                            <div>
                                <h3 className="text-xl font-medium text-white mb-2">Login</h3>
                                <p>You must be logged in to use the analysis and generation features. Click the "Login" button in the top right corner to sign in with your email or Google account.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">2</div>
                            <div>
                                <h3 className="text-xl font-medium text-white mb-2">Analyze Content</h3>
                                <p>Paste a link or text from a successful social media post into the input field on the home page. Click "Analyze" to let our AI deconstruct what makes it viral.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">3</div>
                            <div>
                                <h3 className="text-xl font-medium text-white mb-2">Generate New Posts</h3>
                                <p>Once the analysis is complete, enter a new topic you want to write about. Loom.ai will generate a new post applying the viral patterns from the analyzed content to your topic.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">Features</h2>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><strong>Viral Analysis:</strong> Understand the hook, structure, and emotional triggers of top posts.</li>
                        <li><strong>Smart Generation:</strong> Create new content that follows proven viral formulas.</li>
                        <li><strong>Profile Management:</strong> Save your preferences and history (coming soon).</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};
