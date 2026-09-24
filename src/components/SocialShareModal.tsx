/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  Linkedin, 
  Twitter, 
  MessageCircle, 
  Mail, 
  ExternalLink,
  Code
} from 'lucide-react';
import { PortfolioData } from '../data/portfolioData';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({ isOpen, onClose, data }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSignature, setCopiedSignature] = useState(false);
  const { profile } = data;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : profile.canonicalUrl;
  const shareText = `Check out the FullStack MERN Developer portfolio & ATS résumé of ${profile.name} (MongoDB, Express, React, Node.js):`;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const handleCopySignature = () => {
    const sig = `${profile.name} | ${profile.primaryRole}\nPortfolio: ${currentUrl}\nEmail: ${profile.email}\nLinkedIn: https://www.linkedin.com/in/shivank-maurya-21257a303/`;
    navigator.clipboard.writeText(sig);
    setCopiedSignature(true);
    setTimeout(() => setCopiedSignature(false), 2200);
  };

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const shareToWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${currentUrl}`)}`, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto no-print"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div 
        className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-cyan-500" />
            <h2 id="share-modal-title" className="text-sm font-bold text-neutral-900 dark:text-white">
              Share Portfolio & Digital Résumé
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Canonical Link Copy */}
        <div className="my-5">
          <label className="block text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-1.5">
            Canonical Web Link:
          </label>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700">
            <input 
              type="text" 
              readOnly 
              value={currentUrl} 
              className="flex-1 bg-transparent text-xs font-mono text-neutral-800 dark:text-neutral-200 focus:outline-none px-1"
            />
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-600 dark:bg-cyan-500 hover:bg-cyan-700 dark:hover:bg-cyan-400 text-white dark:text-neutral-950 flex items-center gap-1 transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Quick Social Broadcast Buttons */}
        <div className="grid grid-cols-3 gap-2.5 mb-6">
          <button
            onClick={shareToLinkedIn}
            className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex flex-col items-center gap-1.5 transition-colors text-xs font-medium text-neutral-700 dark:text-neutral-300"
          >
            <Linkedin className="w-5 h-5 text-sky-600" />
            <span>LinkedIn</span>
          </button>

          <button
            onClick={shareToWhatsApp}
            className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex flex-col items-center gap-1.5 transition-colors text-xs font-medium text-neutral-700 dark:text-neutral-300"
          >
            <MessageCircle className="w-5 h-5 text-emerald-500" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={shareToTwitter}
            className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex flex-col items-center gap-1.5 transition-colors text-xs font-medium text-neutral-700 dark:text-neutral-300"
          >
            <Twitter className="w-5 h-5 text-neutral-900 dark:text-white" />
            <span>X / Twitter</span>
          </button>
        </div>

        {/* Email Signature Snippet */}
        <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-neutral-900 dark:text-white flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-cyan-500" />
              <span>Email Signature Snippet</span>
            </span>
            <button
              onClick={handleCopySignature}
              className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
            >
              {copiedSignature ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              <span>{copiedSignature ? 'Copied' : 'Copy Snippet'}</span>
            </button>
          </div>
          <p className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
            {profile.name} | {profile.primaryRole}<br/>
            Portfolio: {currentUrl}<br/>
            Email: {profile.email}
          </p>
        </div>

      </div>
    </div>
  );
};
