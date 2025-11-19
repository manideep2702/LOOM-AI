import React, { useState } from 'react';
import { Terminal, Quote, FileText } from 'lucide-react';
import { PromptInputBox } from './ui/ai-prompt-box';

interface InputSectionProps {
  onAnalyze: (reference: string) => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, isLoading }) => {
  const [error, setError] = useState('');

  const handleSend = (message: string) => {
    if (!message.trim()) {
      setError('Please provide content to analyze.');
      return;
    }
    if (message.trim().length < 50 && message.includes('http')) {
       setError('Please paste the full text content for deep analysis.');
       return;
    }
    setError('');
    onAnalyze(message);
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
      
      <div className="relative group">
        {/* Glow effect behind the card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        
        <div className="relative glass-panel rounded-2xl p-1 ring-1 ring-white/10">
          <div className="bg-zinc-950/80 rounded-xl p-6 md:p-8 backdrop-blur-xl">
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center border border-white/10 shadow-inner">
                  <Terminal className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-semibold text-zinc-200 tracking-tight">Source Material</h3>
                  <p className="text-[11px] text-zinc-500 font-mono uppercase tracking-wide">Input High-Performance Text</p>
                </div>
              </div>
              
              <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/5 text-[10px] text-zinc-500 font-mono">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                SYSTEM READY
              </div>
            </div>

            <PromptInputBox 
              onSend={(msg) => handleSend(msg)}
              isLoading={isLoading}
              placeholder="Paste your viral reference post here..."
              className="bg-black/40 border-white/5 focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/20"
            />

            {error && (
              <div className="mt-4 text-xs text-red-400 bg-red-500/5 border border-red-500/10 p-3 rounded flex items-center gap-2 animate-fade-in">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Micro-interactions / hints */}
      <div className="mt-8 flex justify-center gap-12 text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
        <div className="flex flex-col items-center gap-2 group cursor-help">
          <div className="w-8 h-8 rounded border border-white/5 bg-zinc-900 flex items-center justify-center group-hover:border-indigo-500/30 transition-colors">
            <FileText className="w-3 h-3 text-zinc-500" />
          </div>
          <span>Tone Match</span>
        </div>
        <div className="flex flex-col items-center gap-2 group cursor-help">
          <div className="w-8 h-8 rounded border border-white/5 bg-zinc-900 flex items-center justify-center group-hover:border-indigo-500/30 transition-colors">
             <div className="flex gap-0.5 items-end h-3">
               <div className="w-0.5 h-2 bg-zinc-500"></div>
               <div className="w-0.5 h-3 bg-zinc-500"></div>
               <div className="w-0.5 h-1.5 bg-zinc-500"></div>
             </div>
          </div>
          <span>Structure</span>
        </div>
        <div className="flex flex-col items-center gap-2 group cursor-help">
           <div className="w-8 h-8 rounded border border-white/5 bg-zinc-900 flex items-center justify-center group-hover:border-indigo-500/30 transition-colors">
              <Quote className="w-3 h-3 text-zinc-500" />
           </div>
           <span>Hook DNA</span>
        </div>
      </div>
    </div>
  );
};
