/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Linkedin, 
  Github, 
  Send, 
  Check, 
  Copy, 
  MessageSquare,
  Clock,
  Sparkles,
  Settings,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import { PortfolioData } from '../data/portfolioData';
import { sendInquiry, EmailDispatchResult } from '../services/emailService';
import { EmailSettingsModal } from './EmailSettingsModal';

interface ContactSectionProps {
  data: PortfolioData;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ data }) => {
  const { profile } = data;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dispatchResult, setDispatchResult] = useState<EmailDispatchResult | null>(null);
  const [showAutoReplyLetter, setShowAutoReplyLetter] = useState(true);
  const [copiedReceipt, setCopiedReceipt] = useState(false);
  const [isEmailSettingsOpen, setIsEmailSettingsOpen] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendInquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim() || 'FullStack MERN Engineering Inquiry',
        message: formData.message.trim(),
        position: 'FullStack MERN Developer',
        type: 'contact_form'
      });

      setDispatchResult(result);
    } catch (err: any) {
      console.error('Inquiry dispatch error:', err);
      // Fallback
      alert('Could not dispatch online. Opening email client fallback.');
      const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(formData.subject || 'Inquiry')}&body=${encodeURIComponent(formData.message)}`;
      window.location.href = mailtoUrl;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyReceipt = () => {
    if (!dispatchResult) return;
    navigator.clipboard.writeText(dispatchResult.autoReplyPreview.body);
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2200);
  };

  const handleResetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setDispatchResult(null);
  };

  return (
    <section id="contact" className="py-20 border-b border-neutral-200 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-2">
            <span>07</span>
            <span className="text-neutral-400 dark:text-neutral-600">/</span>
            <span>GET_IN_TOUCH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Let's discuss engineering opportunities.
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Open for full-time Full Stack and Frontend Engineering roles, technical support leadership, and project collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Direct Verified Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/90 shadow-2xs space-y-5">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider font-mono">
                Direct Channels
              </h3>

              {/* Email item */}
              <div className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/80 dark:border-neutral-800">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 font-mono block">Email Address</span>
                    <a 
                      href={`mailto:${profile.email}`} 
                      className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 text-neutral-400 hover:text-neutral-800 dark:hover:text-white"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location item */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/80 dark:border-neutral-800">
                <div className="w-8 h-8 rounded-lg bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-neutral-400 font-mono block">Location</span>
                  <span className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white">
                    {profile.location}
                  </span>
                </div>
              </div>

              {/* Professional Links */}
              <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 space-y-2">
                <span className="text-xs font-mono text-neutral-400 block mb-2">Verified Profiles:</span>
                
                <a
                  href="https://www.linkedin.com/in/shivank-maurya-21257a303/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-xs font-medium text-neutral-700 dark:text-neutral-200"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-cyan-600" />
                    <span>LinkedIn Profile</span>
                  </span>
                  <span className="text-neutral-400 text-[11px] font-mono">/in/shivank-maurya-21257a303/</span>
                </a>

                <a
                  href="https://github.com/shivankmaurya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-xs font-medium text-neutral-700 dark:text-neutral-200"
                >
                  <span className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-neutral-800 dark:text-white" />
                    <span>GitHub Profile</span>
                  </span>
                  <span className="text-neutral-400 text-[11px] font-mono">github.com/shivankmaurya</span>
                </a>
              </div>

            </div>

            {/* Recruiter SLA Box */}
            <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-500" />
                Response Commitment
              </span>
              <p>
                As someone with strict customer SLA background, I respond to recruiter inquiries and technical discussions within 24 business hours.
              </p>
            </div>

          </div>

          {/* Direct Message Form or Dispatch Confirmation */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/90 shadow-2xs">
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                    Send an Inquiry
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Direct routing with instant ticket confirmation & automated auto-reply
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEmailSettingsOpen(true)}
                  className="px-2.5 py-1 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center gap-1.5 transition-colors"
                  title="Configure EmailJS or view Auto-Responder settings"
                >
                  <Settings className="w-3.5 h-3.5 text-cyan-500" />
                  <span className="hidden sm:inline font-mono">Email.js Setup</span>
                </button>
              </div>

              {/* SUCCESS AUTO-REPLY RECEIPT CARD */}
              {dispatchResult ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs sm:text-sm">
                            Inquiry Dispatched & Auto-Reply Generated
                          </span>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 font-semibold">
                            Ticket #{dispatchResult.ticketId}
                          </span>
                        </div>
                        <p className="text-xs mt-1 text-emerald-700 dark:text-emerald-300/90 leading-relaxed">
                          Thank you, <strong>{dispatchResult.autoReplyPreview.recipientName}</strong>. Your message has been logged in Shivank's priority queue. An automated confirmation receipt was generated for <strong>{dispatchResult.autoReplyPreview.recipientEmail}</strong> with guaranteed 24 business hour turnaround.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Collapsible Auto-Reply Letter Preview */}
                  <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setShowAutoReplyLetter(!showAutoReplyLetter)}
                      className="w-full p-3.5 bg-neutral-50 dark:bg-neutral-950/60 flex items-center justify-between text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-cyan-500" />
                        <span>View Automated Auto-Reply Confirmation Copy</span>
                      </span>
                      {showAutoReplyLetter ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {showAutoReplyLetter && (
                      <div className="p-4 bg-neutral-950 text-neutral-200 font-mono text-[11px] leading-relaxed whitespace-pre-wrap border-t border-neutral-800 max-h-72 overflow-y-auto">
                        {dispatchResult.autoReplyPreview.body}
                      </div>
                    )}
                  </div>

                  {/* Actions after submission */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                    <button
                      type="button"
                      onClick={handleCopyReceipt}
                      className="px-3.5 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
                    >
                      {copiedReceipt ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedReceipt ? 'Copied to Clipboard' : 'Copy Confirmation Receipt'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold flex items-center gap-1.5 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-2xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Send Another Inquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* INQUIRY FORM */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Hunter (Recruiter)"
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="FullStack MERN Opportunity at [Company]"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Details about the role, technical requirements, or collaboration..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-400">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                      <span>Instant automated auto-reply &amp; 24h SLA response</span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-2.5 rounded-lg bg-cyan-600 dark:bg-cyan-500 hover:bg-cyan-700 dark:hover:bg-cyan-400 text-white dark:text-neutral-950 font-semibold text-xs shadow-2xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          <span>Routing &amp; Generating Receipt...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* EmailJS & Auto-Responder Settings Modal */}
      <EmailSettingsModal
        isOpen={isEmailSettingsOpen}
        onClose={() => setIsEmailSettingsOpen(false)}
        userEmail={profile.email}
      />
    </section>
  );
};
