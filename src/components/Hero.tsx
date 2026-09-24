/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowDown, 
  FileText, 
  FolderGit2, 
  Linkedin, 
  Github, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Copy, 
  Check 
} from 'lucide-react';
import { PortfolioData } from '../data/portfolioData';

interface HeroProps {
  data: PortfolioData;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ data, onOpenResume }) => {
  const { profile, socialLinks } = data;
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section 
      id="hero" 
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-neutral-200 dark:border-neutral-800/80"
      aria-label="Hero Introduction"
    >
      {/* Subtle background ambient grid (no neon slop) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Controlled subtle glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/5 dark:bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Availability & Location Bar */}
        <div className="inline-flex flex-wrap items-center gap-2 mb-6 text-xs text-neutral-600 dark:text-neutral-400">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {profile.availability}
          </span>
          <span className="hidden sm:inline text-neutral-400 dark:text-neutral-600">·</span>
          <span className="inline-flex items-center gap-1 text-neutral-600 dark:text-neutral-400 font-medium">
            <MapPin className="w-3.5 h-3.5 text-neutral-400" />
            {profile.location}
          </span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.15] mb-4">
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-700 dark:from-white dark:via-neutral-200 dark:to-neutral-400">{profile.name}</span>.
          <span className="block mt-2 text-2xl sm:text-4xl lg:text-5xl font-semibold text-neutral-700 dark:text-neutral-300">
            FullStack MERN developer building modern, scalable web experiences.
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed mb-8">
          Bridging the modern JavaScript/TypeScript ecosystem (<strong className="font-semibold text-neutral-900 dark:text-neutral-100">React.js, Next.js, Node.js, Express, MongoDB</strong>) with high-volume technical support experience. Focused on architecting clean, maintainable user interfaces and solving real customer problems.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <a
            href="#projects"
            className="px-5 py-2.5 rounded-lg bg-cyan-600 dark:bg-cyan-500 text-white font-medium text-sm hover:bg-cyan-700 dark:hover:bg-cyan-400 dark:text-neutral-950 transition-all shadow-sm flex items-center gap-2 group"
          >
            <FolderGit2 className="w-4 h-4" />
            <span>View Projects</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </a>

          <button
            onClick={onOpenResume}
            className="px-5 py-2.5 rounded-lg bg-neutral-900 dark:bg-neutral-800 hover:bg-neutral-800 dark:hover:bg-neutral-700 text-white font-medium text-sm border border-neutral-700/60 transition-all shadow-sm flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Download ATS Resume</span>
          </button>

          <a
            href="#contact"
            className="px-4 py-2.5 rounded-lg bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-700 dark:text-neutral-300 font-medium text-sm border border-neutral-300 dark:border-neutral-800 transition-all flex items-center gap-2"
          >
            <Mail className="w-4 h-4 text-neutral-400" />
            <span>Contact Me</span>
          </a>
        </div>

        {/* Verified Links & Quick Copy Email Strip */}
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs font-mono text-neutral-500 dark:text-neutral-400">
            <span className="font-sans font-medium text-neutral-700 dark:text-neutral-300">Connect:</span>
            
            <a
              href="https://www.linkedin.com/in/shivank-maurya-21257a303/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/shivankmaurya"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>

          {/* Quick Copy Email widget */}
          <div className="inline-flex items-center gap-2 bg-neutral-100 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 rounded-md text-xs">
            <Mail className="w-3.5 h-3.5 text-cyan-500" />
            <span className="font-mono text-neutral-700 dark:text-neutral-300">{profile.email}</span>
            <button
              onClick={handleCopyEmail}
              className="ml-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              title="Copy email address"
              aria-label="Copy email address"
            >
              {copiedEmail ? (
                <span className="flex items-center gap-1 text-emerald-500 font-sans font-medium text-[11px]">
                  <Check className="w-3 h-3" /> Copied
                </span>
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
