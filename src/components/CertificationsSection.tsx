/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, CheckCircle2, Shield, BrainCircuit, BarChart3, Database } from 'lucide-react';
import { Certification } from '../data/portfolioData';

interface CertificationsSectionProps {
  certifications: Certification[];
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications }) => {
  const getIconForType = (title: string) => {
    if (title.toLowerCase().includes('cyber')) return Shield;
    if (title.toLowerCase().includes('prompt') || title.toLowerCase().includes('ai')) return BrainCircuit;
    if (title.toLowerCase().includes('data') || title.toLowerCase().includes('visualization')) return BarChart3;
    if (title.toLowerCase().includes('node') || title.toLowerCase().includes('mongo')) return Database;
    return Award;
  };

  return (
    <section id="certifications" className="py-20 border-b border-neutral-200 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-2">
            <span>06</span>
            <span className="text-neutral-400 dark:text-neutral-600">/</span>
            <span>VERIFIED_CREDENTIALS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Certifications & Industry Job Simulations
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Professional skill accreditations, corporate job simulations, and backend developer credentials.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {certifications.map((cert) => {
            const Icon = getIconForType(cert.title);
            return (
              <div
                key={cert.id}
                className="p-5 rounded-xl bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/90 hover:border-neutral-300 dark:hover:border-neutral-700/80 transition-all flex flex-col justify-between shadow-2xs group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                      {cert.credentialType}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                    {cert.title}
                  </h3>
                  
                  <div className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-3">
                    {cert.issuer}
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
                  <div className="flex flex-wrap gap-1">
                    {cert.skillsGained.map((sk) => (
                      <span
                        key={sk}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
