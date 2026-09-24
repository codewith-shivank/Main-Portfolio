/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Linkedin, Github, Mail, ArrowUp } from 'lucide-react';
import { PortfolioData } from '../data/portfolioData';

interface FooterProps {
  data: PortfolioData;
}

export const Footer: React.FC<FooterProps> = ({ data }) => {
  const { profile } = data;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-neutral-950 text-neutral-400 border-t border-neutral-900 no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-neutral-900">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded bg-neutral-800 border border-neutral-700 font-mono font-bold text-xs text-cyan-400 flex items-center justify-center">
                SM
              </span>
              <span className="text-base font-bold text-white tracking-tight">
                {profile.name}
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Full Stack Developer & Technical Operations · Lucknow, India
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href="https://www.linkedin.com/in/shivank-maurya-21257a303/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/shivankmaurya"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href={`mailto:${profile.email}`}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors ml-2"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} Shivank Maurya. All rights reserved.</p>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span>Built with React & TypeScript</span>
            <span>·</span>
            <span>ATS Optimized</span>
            <span>·</span>
            <span>WCAG Accessible</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
