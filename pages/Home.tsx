
import React, { useState, useEffect } from 'react';
import { analyzePost, generatePost } from '../services/geminiService';
import { InputSection } from '../components/InputSection';
import { AnalysisDashboard } from '../components/AnalysisDashboard';
import { FeatureSection } from '../components/FeatureSection';
import { PricingSection } from '../components/PricingSection';
import { ViralAnalysis, GeneratedContent, AppState } from '../types';
import { Sparkles } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import { useLocation } from 'react-router-dom';

interface HomeProps {
    user: User | null;
    onShowAuth: () => void;
}

export default function Home({ user, onShowAuth }: HomeProps) {
    const [appState, setAppState] = useState<AppState>(AppState.IDLE);
    const [analysis, setAnalysis] = useState<ViralAnalysis | null>(null);
    const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
    const location = useLocation();

    useEffect(() => {
    if (!location.hash) return;

    try {
        const element = document.querySelector(location.hash);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    } catch (error) {
        console.warn('Skipping scroll for invalid hash', location.hash, error);
    }
}, [location]);

    const handleAnalyze = async (reference: string) => {
    if (!user) {
        onShowAuth();
        return;
    }

        setAppState(AppState.ANALYZING);
        try {
            const result = await analyzePost(reference);
            setAnalysis(result);
            setAppState(AppState.ANALYSIS_COMPLETE);
        } catch (error) {
            console.error(error);
            setAppState(AppState.ERROR);
        }
    };

    const handleGenerate = async (topic: string) => {
        if (!analysis) return;

        setAppState(AppState.GENERATING);
        try {
            const result = await generatePost(analysis, topic);
            setGeneratedContent(result);
            setAppState(AppState.GENERATION_COMPLETE);
        } catch (error) {
            console.error(error);
            setAppState(AppState.ERROR);
        }
    };

    const handleReset = () => {
        setAppState(AppState.IDLE);
        setAnalysis(null);
        setGeneratedContent(null);
    };

    return (
        <main id="home" className="w-full max-w-7xl mx-auto px-4 pt-32 pb-20 flex flex-col items-center justify-start flex-grow">

            {/* Error Toast */}
            {appState === AppState.ERROR && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-red-950/50 border border-red-500/20 text-red-200 px-6 py-3 rounded-full text-sm flex items-center gap-3 backdrop-blur-md z-50 animate-slide-up shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    Unable to process content. Please ensure the text is valid.
                    <button onClick={handleReset} className="ml-4 text-white underline hover:no-underline">Retry</button>
                </div>
            )}

            {/* Hero / Input Phase */}
            {(appState === AppState.IDLE || appState === AppState.ANALYZING) && (
                <div className="flex flex-col items-center w-full max-w-5xl mx-auto text-center mt-8 md:mt-12 relative">

                    {/* Floating Background Elements */}
                    <div className="absolute top-0 -left-20 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-[11px] font-mono text-indigo-300 mb-8 animate-fade-in shadow-[0_0_15px_rgba(99,102,241,0.1)]">
                        <Sparkles className="w-3 h-3" />
                        <span>ENGINEERED FOR VIRALITY</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-white animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        Weave your next <br className="hidden md:block" />
                        <span className="shimmer-text relative inline-block">
                            Masterpiece
                            {/* Underline decoration */}
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-indigo-500/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed animate-slide-up font-light" style={{ animationDelay: '0.2s' }}>
                        Decode the DNA of viral influence. Loom.ai deconstructs the hidden patterns of top performing content to architect posts that resonate.
                        <span className="text-zinc-200 font-normal"> Transform your ideas into magnetic narratives with precision, not guesswork.</span>
                    </p>

                    <InputSection
                        onAnalyze={handleAnalyze}
                        isLoading={appState === AppState.ANALYZING}
                    />


                </div>
            )}

            {/* Analysis & Results Phase */}
            {(appState === AppState.ANALYSIS_COMPLETE || appState === AppState.GENERATING || appState === AppState.GENERATION_COMPLETE) && analysis && (
                <AnalysisDashboard
                    analysis={analysis}
                    generatedContent={generatedContent}
                    isGenerating={appState === AppState.GENERATING}
                    onGenerate={handleGenerate}
                    onReset={handleReset}
                />
            )}

            <FeatureSection />
            <PricingSection />
        </main>
    );
}
