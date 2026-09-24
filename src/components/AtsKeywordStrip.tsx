/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Terminal, Copy, Check, Sparkles } from 'lucide-react';

interface AtsKeywordStripProps {
  keywords: string[];
}

export const AtsKeywordStrip: React.FC<AtsKeywordStripProps> = ({ keywords }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyKeywords = () => {
    const text = keywords.join(', ');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="bg-neutral-100/70 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800/80 py-3.5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Label and Keywords */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-0.5">
          <div className="flex items-center gap-1.5 shrink-0 text-xs font-mono font-semibold text-neutral-500 dark:text-neutral-400">
            <Terminal className="w-3.5 h-3.5 text-cyan-500" />
            <span>ATS_CORE_STACK:</span>
          </div>

          <div className="flex items-center gap-2 flex-nowrap shrink-0 text-xs">
            {keywords.map((kw, idx) => (
              <React.Fragment key={kw}>
                <span className="font-mono text-neutral-800 dark:text-neutral-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors whitespace-nowrap">
                  {kw}
                </span>
                {idx < keywords.length - 1 && (
                  <span className="text-neutral-300 dark:text-neutral-700 select-none">/</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Copy for Recruiters Button */}
        <button
          onClick={handleCopyKeywords}
          className="shrink-0 self-start md:self-auto inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-white dark:bg-neutral-800/80 hover:bg-neutral-50 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700/60 rounded transition-colors shadow-2xs"
          title="Copy keywords for recruiter Boolean search or ATS matching"
          aria-label="Copy ATS keywords"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400">Keywords Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy for ATS / Search</span>
            </>
          )}
        </button>

      </div>
    </div>
  );
};
