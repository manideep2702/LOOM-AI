import React, { useState } from 'react';
import { ViralAnalysis, GeneratedContent } from '../types';
import { 
  Copy, 
  Check, 
  BarChart3, 
  Zap, 
  Type, 
  Hash, 
  Clock, 
  ArrowLeft,
  TrendingUp,
  Activity,
  Lightbulb,
  Sparkles,
  PenTool,
  Wand2
} from 'lucide-react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface AnalysisDashboardProps {
  analysis: ViralAnalysis;
  generatedContent: GeneratedContent | null;
  isGenerating: boolean;
  onGenerate: (topic: string) => void;
  onReset: () => void;
}

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ 
  analysis, 
  generatedContent, 
  isGenerating,
  onGenerate, 
  onReset 
}) => {
  const [copied, setCopied] = useState(false);
  const [topic, setTopic] = useState('');

  const handleCopy = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent.postContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scoreData = [
    { name: 'Score', value: analysis.viralityScore, fill: '#6366f1' }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto animate-slide-up pb-20">
      
      {/* Header Navigation */}
      <div className="flex items-center justify-between mb-8 px-1">
        <button 
          onClick={onReset}
          className="flex items-center text-zinc-500 hover:text-white transition-colors gap-2 text-xs font-mono uppercase tracking-wider group"
        >
          <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 border border-white/5">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span>Reset Context</span>
        </button>
        
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-wider">Analysis Engine Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ---------------------------------------------------------------------------
            LEFT COLUMN: BENTO GRID ANALYSIS
           --------------------------------------------------------------------------- */}
        <div className={`lg:col-span-5 space-y-4 transition-all duration-700 ${generatedContent ? 'lg:opacity-40 lg:hover:opacity-100 lg:scale-95 lg:hover:scale-100' : ''}`}>
          
          {/* Row 1: Score & Tone */}
          <div className="grid grid-cols-2 gap-4">
             {/* Virality Score Card */}
             <div className="glass-panel rounded-2xl p-5 relative overflow-hidden col-span-1 group hover:border-indigo-500/30 transition-colors">
                <div className="flex flex-col h-full justify-between relative z-10">
                  <div className="flex items-center gap-2 text-zinc-500 mb-2">
                     <Activity className="w-3.5 h-3.5 text-indigo-400" />
                     <span className="text-[10px] font-mono uppercase tracking-wider">Virality</span>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white tracking-tighter group-hover:text-indigo-200 transition-colors">{analysis.viralityScore}</span>
                      <span className="text-xs text-zinc-500 font-mono">/100</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-800 rounded-full mt-3 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-600 to-purple-500 rounded-full" 
                        style={{ width: `${analysis.viralityScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                {/* Background Chart Graphic */}
                <div className="absolute -right-6 -top-6 w-24 h-24 opacity-20 group-hover:opacity-40 transition-opacity">
                   <ResponsiveContainer width="100%" height="100%">
                     <RadialBarChart innerRadius="60%" outerRadius="100%" barSize={10} data={scoreData} startAngle={90} endAngle={-270}>
                        <RadialBar background dataKey="value" cornerRadius={30} />
                     </RadialBarChart>
                   </ResponsiveContainer>
                </div>
             </div>

             {/* Tone Card */}
             <div className="glass-panel rounded-2xl p-5 col-span-1 flex flex-col justify-between hover:border-pink-500/30 transition-colors group">
                <div className="flex items-center gap-2 text-zinc-500 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  <span className="text-[10px] font-mono uppercase tracking-wider">Tone</span>
                </div>
                <p className="text-sm font-medium text-zinc-200 leading-snug group-hover:text-white transition-colors">
                  {analysis.tone}
                </p>
             </div>
          </div>

          {/* Row 2: Hook Strategy (Full Width) */}
          <div className="glass-panel rounded-2xl p-6 relative overflow-hidden hover:border-white/20 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Zap className="w-16 h-16 rotate-12" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1 rounded bg-yellow-500/10 border border-yellow-500/20">
                  <Zap className="w-3 h-3 text-yellow-400" />
                </div>
                <h3 className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Hook Architecture</h3>
              </div>
              <p className="text-lg font-medium text-white leading-snug">{analysis.hookStrategy}</p>
            </div>
          </div>

          {/* Row 3: Formatting DNA */}
          <div className="glass-panel rounded-2xl p-6 hover:border-white/20 transition-colors">
             <div className="flex items-center gap-2 mb-4">
                <div className="p-1 rounded bg-blue-500/10 border border-blue-500/20">
                   <Type className="w-3 h-3 text-blue-400" />
                </div>
                <h3 className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Structural DNA</h3>
             </div>
             <div className="flex flex-wrap gap-2">
                {analysis.formattingFeatures.map((feature, i) => (
                  <span key={i} className="px-3 py-1.5 bg-zinc-900 border border-white/5 rounded-md text-[11px] text-zinc-300 hover:border-white/20 hover:text-white transition-colors cursor-default">
                    {feature}
                  </span>
                ))}
             </div>
          </div>

           {/* Row 4: Keywords */}
           <div className="glass-panel rounded-2xl p-6 hover:border-white/20 transition-colors">
             <div className="flex items-center gap-2 mb-4">
                <div className="p-1 rounded bg-green-500/10 border border-green-500/20">
                  <Hash className="w-3 h-3 text-green-400" />
                </div>
                <h3 className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Discovery Tags</h3>
             </div>
             <div className="flex flex-wrap gap-2">
                {analysis.keywords.map((k, i) => (
                  <span key={i} className="text-xs text-zinc-500 font-mono hover:text-indigo-400 transition-colors cursor-pointer">
                    #{k}
                  </span>
                ))}
             </div>
          </div>

        </div>

        {/* ---------------------------------------------------------------------------
            RIGHT COLUMN: GENERATION / RESULTS
           --------------------------------------------------------------------------- */}
        <div className="lg:col-span-7 flex flex-col">
          
          {!generatedContent ? (
            <div className="h-full min-h-[500px] glass-panel rounded-3xl p-1 flex flex-col relative overflow-hidden group border-indigo-500/20 shadow-[0_0_40px_rgba(99,102,241,0.05)]">
               
               {/* Animated Background Mesh */}
               <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black z-0"></div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] z-0 pointer-events-none"></div>
               
               <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 md:p-16 text-center">
                  
                  <div className="w-20 h-20 bg-gradient-to-br from-zinc-800 to-black rounded-2xl border border-white/10 flex items-center justify-center mb-8 shadow-2xl relative">
                    <div className="absolute -inset-2 bg-indigo-500/20 blur-xl rounded-full animate-pulse-slow"></div>
                    <Wand2 className="w-8 h-8 text-white relative z-10" />
                  </div>
                  
                  <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Weave the next thread</h2>
                  <p className="text-zinc-400 mb-10 max-w-md leading-relaxed">
                    We've decoded the pattern. Now, give us a topic, and we'll generate a post that mathematically matches the viral structure.
                  </p>
                  
                  <form onSubmit={(e) => { e.preventDefault(); if(topic.trim()) onGenerate(topic); }} className="w-full max-w-md relative group/form">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-30 blur transition duration-1000 group-hover/form:opacity-70"></div>
                    <div className="relative flex items-center bg-zinc-950 rounded-xl p-1">
                      <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g. 3 Lessons from scaling a SaaS..."
                        className="w-full bg-transparent text-white rounded-lg pl-4 pr-12 py-3.5 outline-none placeholder:text-zinc-600 font-medium"
                        autoFocus
                      />
                      <button 
                        type="submit"
                        disabled={isGenerating || !topic.trim()}
                        className="absolute right-2 p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/20"
                      >
                        {isGenerating ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <ArrowLeft className="w-4 h-4 rotate-180" />
                        )}
                      </button>
                    </div>
                  </form>
               </div>
            </div>
          ) : (
            <div className="space-y-6 animate-slide-up">
              
              {/* GENERATED CONTENT PREVIEW */}
              <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col shadow-2xl">
                {/* Window Controls Header */}
                <div className="h-12 bg-black/60 border-b border-white/5 flex items-center justify-between px-4">
                  <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">loom_draft_v1.md</div>
                  <button
                    onClick={handleCopy}
                    className="text-xs font-medium text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-md border border-white/5"
                  >
                    {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>

                {/* Content Area */}
                <div className="p-8 bg-gradient-to-b from-zinc-900/50 to-black/80 min-h-[400px] relative">
                  {/* Subtle grid inside text area */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-20 pointer-events-none"></div>
                  
                  <pre className="relative z-10 whitespace-pre-wrap font-sans text-[15px] leading-relaxed text-zinc-200 max-w-none selection:bg-indigo-500/30">
                    {generatedContent.postContent}
                  </pre>
                </div>
              </div>

              {/* METADATA GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Why it works */}
                <div className="glass-panel rounded-2xl p-6">
                   <h4 className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-2">
                     <Lightbulb className="w-3 h-3 text-yellow-500/50" />
                     Tactical Breakdown
                   </h4>
                   <ul className="space-y-3">
                     {generatedContent.whyItWorks.map((reason, i) => (
                       <li key={i} className="flex gap-3 text-sm text-zinc-400 group">
                         <span className="flex-shrink-0 w-5 h-5 rounded bg-zinc-900 border border-white/5 text-zinc-500 group-hover:text-white group-hover:border-white/20 transition-colors flex items-center justify-center text-[10px] font-mono">
                           {i + 1}
                         </span>
                         <span className="leading-snug group-hover:text-zinc-300 transition-colors">{reason}</span>
                       </li>
                     ))}
                   </ul>
                </div>

                {/* Timing */}
                <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-2">
                      <Clock className="w-3 h-3 text-blue-500/50" />
                      Optimal Velocity
                    </h4>
                    <div className="flex items-end gap-2 mb-2">
                      <div className="text-2xl font-bold text-white">
                        {generatedContent.postingAdvice.bestTime}
                      </div>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {generatedContent.postingAdvice.reason}
                    </p>
                  </div>
                  
                  <button 
                    onClick={onReset}
                    className="mt-6 w-full py-3 text-xs font-medium text-white bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all flex items-center justify-center gap-2 group"
                  >
                    <PenTool className="w-3 h-3" />
                    Architect New Post
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};