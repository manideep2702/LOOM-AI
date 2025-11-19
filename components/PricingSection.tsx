import React from 'react';
import { Pricing2 } from './ui/pricing2';

export const PricingSection = () => {
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for aspiring creators testing the waters.',
      monthlyPrice: '$0',
      yearlyPrice: '$0',
      features: [
        { text: '5 Analyses per day' },
        { text: 'Basic Virality Scoring (0-100)' },
        { text: 'Standard Tone Matching' },
        { text: 'Email support' },
      ],
      button: {
        text: 'Get started',
        url: '#home',
      },
    },
    {
      id: 'pro',
      name: 'Viral Architect',
      description: 'For serious founders & thought leaders.',
      monthlyPrice: '$29',
      yearlyPrice: '$290',
      features: [
        { text: 'Unlimited Analysis' },
        { text: 'Deep Pattern Decoding' },
        { text: 'Advanced Hook Generation' },
        { text: 'Real-time Trend Engine' },
        { text: 'Priority support' },
      ],
      button: {
        text: 'Buy now',
        url: '#home',
      },
    },
  ];

  return (
    <div id="pricing" className="w-full">
      <Pricing2
        heading="Simple, transparent pricing"
        description="Choose the plan that fits your content velocity."
        plans={plans}
      />
    </div>
  );
};
