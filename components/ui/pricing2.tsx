
"use client";

import React, { useState } from "react";
import { ArrowRight, CircleCheck } from "lucide-react";
import { Button } from "./button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Separator } from "./separator";
import { Switch } from "./switch";

interface PricingFeature {
  text: string;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: PricingFeature[];
  button: {
    text: string;
    url: string;
  };
}

interface Pricing2Props {
  heading?: string;
  description?: string;
  plans?: PricingPlan[];
}

export const Pricing2 = ({
  heading = "Pricing",
  description = "Check out our affordable pricing plans",
  plans = [],
}: Pricing2Props) => {
  return (
    <section className="py-24 md:py-32 relative z-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">

          <div className="space-y-2">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              {heading}
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">{description}</p>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch gap-8 justify-center mt-12 w-full">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`flex w-full max-w-sm flex-col justify-between text-left border-white/10 bg-zinc-900/50 backdrop-blur-md hover:border-indigo-500/30 transition-all duration-300 ${plan.id === 'pro' ? 'ring-1 ring-indigo-500/50 shadow-[0_0_40px_rgba(99,102,241,0.15)] bg-zinc-900/80' : ''}`}
              >
                <CardHeader className="pb-8">
                  <CardTitle className="text-xl font-semibold text-white">
                    {plan.name}
                  </CardTitle>
                  <p className="text-sm text-zinc-400 mt-2">
                    {plan.description}
                  </p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-white tracking-tight">
                      {plan.monthlyPrice}
                    </span>
                    <span className="text-sm text-zinc-500 font-mono uppercase tracking-wider">
                      /month
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="flex-grow">
                  <Separator className="mb-6 bg-white/10" />
                  {plan.id === "pro" && (
                    <p className="mb-4 text-sm font-semibold text-indigo-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block"></span>
                      Everything in Starter, plus:
                    </p>
                  )}
                  <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-zinc-300">
                        <CircleCheck className={`size-5 shrink-0 ${plan.id === 'pro' ? 'text-indigo-500' : 'text-zinc-600'}`} />
                        <span className="text-sm leading-snug">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-8">
                  <Button asChild size="lg" className={`w-full h-12 text-base font-medium transition-all ${plan.id === 'pro' ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40' : 'bg-white/5 hover:bg-white/10 text-white border border-white/5'}`}>
                    <a href={plan.button.url}>
                      {plan.button.text}
                      <ArrowRight className="ml-2 size-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
