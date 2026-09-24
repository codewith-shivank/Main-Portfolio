/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Code2, 
  Headphones, 
  GraduationCap, 
  MapPin, 
  Layers, 
  TrendingUp, 
  ShieldCheck,
  Search
} from 'lucide-react';
import { PortfolioData } from '../data/portfolioData';

interface AboutProps {
  data: PortfolioData;
}

export const About: React.FC<AboutProps> = ({ data }) => {
  const { profile } = data;

  const highlights = [
    {
      icon: Code2,
      title: "FullStack MERN Development",
      description: "Building responsive, component-driven web applications with MongoDB, Express.js, React.js, and Node.js."
    },
    {
      icon: Headphones,
      title: "Production Support & RCA",
      description: "Supporting Swiggy's high-scale food and quick-commerce operations at Niftel Communications with 50+ daily interactions."
    },
    {
      icon: TrendingUp,
      title: "Measurable Impact",
      description: "Achieved ~20% repeat ticket reduction through systematic root-cause troubleshooting and clear escalation logs."
    },
    {
      icon: GraduationCap,
      title: "Academic Rigor",
      description: "Pursuing Bachelor of Computer Applications (BCA) at Babu Banarasi Das University (2025–2028)."
    }
  ];

  return (
    <section id="about" className="py-20 border-b border-neutral-200 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-2">
            <span>01</span>
            <span className="text-neutral-400 dark:text-neutral-600">/</span>
            <span>PROFILE_SUMMARY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Engineering software by understanding user reality.
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            A developer who pairs modern JavaScript engineering with real customer-support operational discipline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Narrative Content */}
          <div className="lg:col-span-7 space-y-4 text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
            <p className="font-medium text-neutral-900 dark:text-neutral-100">
              {profile.bioIntro}
            </p>

            {profile.bioParagraphs.map((para, i) => (
              <p key={i} className="text-neutral-600 dark:text-neutral-300">
                {para}
              </p>
            ))}

            {/* Recruiter quick summary box */}
            <div className="mt-6 p-4 rounded-xl bg-neutral-100/80 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm">
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 block mb-1">
                Recruiter Takeaway:
              </span>
              <p className="text-neutral-600 dark:text-neutral-400">
                Unlike typical candidates who have only built local hobby apps, I handle real production traffic, customer frustration, SLA turnarounds, and cross-functional handoffs on a daily basis while continuously sharpening my full-stack engineering skills.
              </p>
            </div>
          </div>

          {/* Factual Snapshot Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors shadow-2xs"
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-snug">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
