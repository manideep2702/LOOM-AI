
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface AnimatedLogoProps {
  className?: string;
  logoClassName?: string;
  showText?: boolean;
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ className, logoClassName, showText = true }) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-zinc-900 to-black rounded-full border border-white/10 shadow-[0_0_15px_rgba(99,102,241,0.3)] overflow-hidden group", logoClassName)}>
        <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <svg
          viewBox="0 0 40 40"
          className="w-1/2 h-1/2 text-white relative z-10"
          style={{ overflow: 'visible' }}
        >
          {/* L Shape */}
          <motion.path
            d="M 12 10 V 30 H 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              delay: 0.2
            }}
          />

          {/* A Shape - Woven over/under L */}
          <motion.path
            d="M 20 30 L 28 10 L 36 30"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              delay: 0.8
            }}
          />

          {/* A Crossbar */}
          <motion.path
            d="M 23 22 H 33"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: 1.8
            }}
          />
        </svg>
      </div>

      {showText && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="flex flex-col"
        >
          <span className="text-sm font-bold tracking-tight text-white leading-none">LOOM</span>
          <span className="text-[10px] text-indigo-400 font-mono tracking-widest leading-none">AI</span>
        </motion.div>
      )}
    </div>
  );
};
