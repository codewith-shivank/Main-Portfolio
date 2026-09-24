/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  TrendingDown, 
  Users, 
  Clock, 
  FileCheck2,
  Building2,
  ArrowUpRight
} from 'lucide-react';
import { Experience } from '../data/portfolioData';

interface ExperienceSectionProps {
  experienceList: Experience[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experienceList }) => {
  return (
    <section id="experience" className="py-20 border-b border-neutral-200 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-2">
            <span>03</span>
            <span className="text-neutral-400 dark:text-neutral-600">/</span>
            <span>PRODUCTION_EXPERIENCE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Work Experience & Operational Impact
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Real customer operations, high-SLA platform support, and technical root-cause problem solving.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-8 border-l border-neutral-200 dark:border-neutral-800 space-y-12">
          {experienceList.map((exp) => (
            <div key={exp.id} className="relative group">
              
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-cyan-500 border-4 border-white dark:border-neutral-950 shadow-sm" />

              {/* Main Experience Card */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/90 hover:border-neutral-300 dark:hover:border-neutral-700/80 transition-all shadow-2xs">
                
                {/* Header metadata */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                        {exp.title}
                      </h3>
                      {exp.isCurrent && (
                        <span className="px-2 py-0.5 text-[11px] font-mono rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
                          Current Role
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-600 dark:text-neutral-400">
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                        {exp.company}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                        {exp.location}
                      </span>
                      <span>·</span>
                      <span className="text-cyan-700 dark:text-cyan-400 font-medium">
                        Platform: {exp.platformSupported}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/60 px-3 py-1.5 rounded-md border border-neutral-200/80 dark:border-neutral-700/60 self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                  {exp.summary}
                </p>

                {/* Measurable Verified Metrics Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/80 dark:border-neutral-800">
                  {exp.metrics.map((metric, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-lg sm:text-xl font-bold font-mono text-neutral-900 dark:text-white">
                        {metric.value}
                      </span>
                      <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Key Bullet Highlights */}
                <div className="space-y-2.5 mb-6">
                  <h4 className="text-xs font-semibold font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Key Responsibilities & System Outcomes:
                  </h4>
                  <ul className="space-y-2">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills Used */}
                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-mono text-neutral-400 mr-1">Competencies:</span>
                  {exp.skillsUsed.map((sk) => (
                    <span 
                      key={sk} 
                      className="px-2 py-0.5 text-xs font-mono rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700/60"
                    >
                      {sk}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
