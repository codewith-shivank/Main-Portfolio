/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GraduationCap, Calendar, MapPin, BookOpen, Award } from 'lucide-react';
import { Education } from '../data/portfolioData';

interface EducationSectionProps {
  educationList: Education[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({ educationList }) => {
  return (
    <section id="education" className="py-20 border-b border-neutral-200 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-2">
            <span>05</span>
            <span className="text-neutral-400 dark:text-neutral-600">/</span>
            <span>ACADEMIC_BACKGROUND</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Formal Education & Foundations
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Verified academic qualifications in Computer Applications and foundational Sciences.
          </p>
        </div>

        {/* Academic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationList.map((edu, idx) => (
            <div
              key={edu.id}
              className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/90 hover:border-neutral-300 dark:hover:border-neutral-700/80 transition-all shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/80 px-2.5 py-1 rounded">
                    {edu.period}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-1">
                  {edu.degree}
                </h3>
                
                <div className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                  {edu.institution}
                </div>

                {edu.details && (
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4">
                    {edu.details}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center gap-1.5 text-xs text-neutral-500 font-mono">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>{edu.location}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
