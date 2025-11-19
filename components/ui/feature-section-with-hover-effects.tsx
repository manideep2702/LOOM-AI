import React from 'react';
import { cn } from "../../lib/utils";
import {
  IconTerminal2,
  IconEaseInOut,
  IconCurrencyDollar,
  IconCloud,
  IconRouteAltLeft,
  IconHelp,
  IconAdjustmentsBolt,
  IconHeart,
  IconScan,
  IconWand,
  IconBolt,
  IconChartBar,
  IconLock,
  IconShare,
  IconMoodSmile,
  IconTrendingUp
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Pattern Recognition",
      description:
        "Our AI dissects thousands of viral posts to understand the mathematical structure behind human attention.",
      icon: <IconScan />,
    },
    {
      title: "Style Mimicry",
      description:
        "Input your reference, and Loom weaves a new narrative that matches the tone, pacing, and formatting exactly.",
      icon: <IconWand />,
    },
    {
      title: "Hook Engineering",
      description:
        "Generate opening lines that are psychologically designed to stop the scroll and capture immediate interest.",
      icon: <IconBolt />,
    },
    {
      title: "Virality Scoring",
      description: "Get a predictive 0-100 score on your potential post performance based on historical algorithm data.",
      icon: <IconChartBar />,
    },
    {
      title: "Private & Secure",
      description: "Your data and unique voice remain yours. We don't train our public models on your specific inputs.",
      icon: <IconLock />,
    },
    {
      title: "Multi-Format Ready",
      description:
        "Export optimized content for LinkedIn, X (Twitter), and other text-heavy social platforms instantly.",
      icon: <IconShare />,
    },
    {
      title: "Tone Analysis",
      description:
        "Deep emotional intelligence analysis to ensure your message resonates with the right audience sentiment.",
      icon: <IconMoodSmile />,
    },
    {
      title: "Real-time Trends",
      description: "Our engines are constantly updated to align with the latest algorithm shifts and content trends.",
      icon: <IconTrendingUp />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-white/5",
        (index === 0 || index === 4) && "lg:border-l border-white/5",
        index < 4 && "lg:border-b border-white/5"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-zinc-400 group-hover/feature:text-indigo-400 transition-colors">
        {React.cloneElement(icon as React.ReactElement<any>, { size: 28 })}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-zinc-700 group-hover/feature:bg-indigo-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-zinc-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-zinc-500 max-w-xs relative z-10 px-10 leading-relaxed">
        {description}
      </p>
    </div>
  );
};