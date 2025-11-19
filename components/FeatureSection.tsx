import React from 'react';
import { FeaturesSectionWithHoverEffects } from './ui/feature-section-with-hover-effects';

export const FeatureSection = () => {
  return (
    <section id="features" className="w-full py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Architecting <span className="text-indigo-400">Attention</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Loom isn't just a text generator. It's a sophisticated reverse-engineering engine for social algorithms.
          </p>
        </div>

        <FeaturesSectionWithHoverEffects />
      </div>
    </section>
  );
};
