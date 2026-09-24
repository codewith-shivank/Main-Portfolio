/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FileText, Printer, ArrowRight, CheckCircle2, ShieldCheck, Terminal } from 'lucide-react';

interface ResumeCTAProps {
  onOpenResume: () => void;
}

export const ResumeCTA: React.FC<ResumeCTAProps> = ({ onOpenResume }) => {
  return (
    <section className="py-16 bg-neutral-900/50 dark:bg-neutral-900/30 border-b border-neutral-200 dark:border-neutral-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono font-medium mb-4">
          <Terminal className="w-3.5 h-3.5" />
          <span>RECRUITER_QUICK_EVALUATION</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-3">
          Want the complete professional profile?
        </h2>

        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto mb-8">
          Access the ATS-structured digital résumé with verified metrics, clean printing styles, and one-click plain-text export for hiring software.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onOpenResume}
            className="px-6 py-3 rounded-xl bg-cyan-600 dark:bg-cyan-500 hover:bg-cyan-700 dark:hover:bg-cyan-400 text-white dark:text-neutral-950 font-semibold text-sm shadow-md transition-all flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Open ATS Résumé</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              onOpenResume();
              setTimeout(() => window.print(), 350);
            }}
            className="px-5 py-3 rounded-xl bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-medium text-sm border border-neutral-200 dark:border-neutral-700 transition-all flex items-center gap-2 shadow-2xs"
          >
            <Printer className="w-4 h-4 text-neutral-400" />
            <span>Print / Save PDF</span>
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-500 font-mono">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            100% Resume Verified
          </span>
          <span>·</span>
          <span>Zero Fabricated Statistics</span>
          <span>·</span>
          <span>Parsable Plain-Text Mode</span>
        </div>

      </div>
    </section>
  );
};
