/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mail, 
  Send, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  ExternalLink, 
  HelpCircle, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  FileCode,
  Copy
} from 'lucide-react';
import { 
  getEmailJsConfig, 
  saveEmailJsConfig, 
  EmailJsConfig, 
  sendInquiry,
  generateAutoReplyText
} from '../services/emailService';

interface EmailSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
}

export const EmailSettingsModal: React.FC<EmailSettingsModalProps> = ({
  isOpen,
  onClose,
  userEmail = 'codewithshivank@gmail.com'
}) => {
  const [config, setConfig] = useState<EmailJsConfig>({
    serviceId: '',
    templateId: '',
    autoReplyTemplateId: '',
    publicKey: ''
  });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [testStatus, setTestStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'settings' | 'variables' | 'preview'>('settings');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setConfig(getEmailJsConfig());
      setSavedSuccess(false);
      setTestStatus('idle');
      setTestResult(null);
    }
  }, [isOpen]);

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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveEmailJsConfig(config);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleTestDispatch = async () => {
    if (!testEmail || !testEmail.includes('@')) {
      alert('Please enter a valid recipient email to test the automated response.');
      return;
    }

    setTestStatus('sending');
    setTestResult(null);

    try {
      const result = await sendInquiry(
        {
          name: 'Test Recruiter',
          email: testEmail,
          subject: 'Sample Engineering Inquiry & Verification',
          message: 'This is a test submission to verify the EmailJS pipeline and automated auto-reply dispatch system.',
          company: 'Acme Corp',
          position: 'FullStack MERN Developer'
        },
        config
      );

      setTestStatus('success');
      setTestResult(`Success! Ticket #${result.ticketId} issued. Automated auto-reply confirmation generated for ${testEmail}. Method: ${result.deliveryMethod}`);
    } catch (err: any) {
      setTestStatus('error');
      setTestResult(`Test failed: ${err.message || 'Unknown error'}`);
    }
  };

  const hasConfig = Boolean(config.serviceId && config.templateId && config.publicKey);

  const samplePreviewText = generateAutoReplyText({
    name: 'Sarah Connor (Technical Recruiter)',
    email: 'sarah.connor@cyberdyne.tech',
    subject: 'Senior FullStack MERN Role at Cyberdyne',
    ticketId: 'SM-INQ-DEMO',
    message: 'We were impressed with your portfolio, SLA background at Swiggy, and React/Node projects. Would you be open for an initial conversation?',
    company: 'Cyberdyne Systems',
    position: 'FullStack MERN Developer'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/70 backdrop-blur-xs">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-settings-title"
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/60 dark:bg-neutral-950/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 id="email-settings-title" className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                Email.js & Automated Auto-Responder
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20 font-normal">
                  Production Engine
                </span>
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Guaranteed immediate acknowledgment & 24h SLA inquiry dispatch
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-200 dark:border-neutral-800 px-5 pt-2 text-xs font-medium">
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-2.5 px-3 border-b-2 font-mono transition-colors ${
              activeTab === 'settings'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 font-semibold'
                : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
          >
            EmailJS Configuration
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`pb-2.5 px-3 border-b-2 font-mono transition-colors ${
              activeTab === 'preview'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 font-semibold'
                : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
          >
            Auto-Reply Template Preview
          </button>
          <button
            onClick={() => setActiveTab('variables')}
            className={`pb-2.5 px-3 border-b-2 font-mono transition-colors ${
              activeTab === 'variables'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 font-semibold'
                : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
          >
            Template Variables & Setup
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm">
          
          {/* Status banner */}
          <div className="p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mt-1.5 shrink-0" />
              <div>
                <span className="font-semibold text-neutral-900 dark:text-neutral-100 block">
                  {hasConfig ? 'EmailJS Connected & Active' : 'Automated Auto-Responder Active (Zero-Setup)'}
                </span>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                  {hasConfig
                    ? 'Dispatches live outbound email notifications to ' + userEmail + ' and triggers automated reply templates via your EmailJS account.'
                    : 'Every inquiry submitted via the Contact form or Recruiter Hub receives an instant official receipt with reference ticket ID and 24h SLA confirmation.'}
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono px-2 py-1 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 shrink-0">
              {hasConfig ? 'LIVE EMAILJS' : 'AUTOMATED ENGINE'}
            </span>
          </div>

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      EmailJS Service ID
                    </label>
                    <input
                      type="text"
                      value={config.serviceId}
                      onChange={e => setConfig({ ...config, serviceId: e.target.value.trim() })}
                      placeholder="e.g. service_g49d9k1"
                      className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white font-mono focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Inquiry Template ID
                    </label>
                    <input
                      type="text"
                      value={config.templateId}
                      onChange={e => setConfig({ ...config, templateId: e.target.value.trim() })}
                      placeholder="e.g. template_inquiry"
                      className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white font-mono focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Auto-Reply Template ID (Optional)
                    </label>
                    <input
                      type="text"
                      value={config.autoReplyTemplateId || ''}
                      onChange={e => setConfig({ ...config, autoReplyTemplateId: e.target.value.trim() })}
                      placeholder="e.g. template_autoreply"
                      className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white font-mono focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                    <span className="text-[10px] text-neutral-400 mt-1 block">
                      Sends automated email confirmation to inquirer's address
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Public Key (User ID)
                    </label>
                    <input
                      type="text"
                      value={config.publicKey}
                      onChange={e => setConfig({ ...config, publicKey: e.target.value.trim() })}
                      placeholder="e.g. user_8d9w01KxYz..."
                      className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white font-mono focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-neutral-500">
                    Keys are safely stored locally in your browser session.
                  </span>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    {savedSuccess ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Saved Config</span>
                      </>
                    ) : (
                      <span>Save Settings</span>
                    )}
                  </button>
                </div>
              </form>

              {/* Live Test Section */}
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/40 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                    Test Inquiry & Auto-Reply Dispatch
                  </h4>
                  <span className="text-[10px] font-mono text-neutral-400">
                    Instant SLA Verification
                  </span>
                </div>

                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Simulate an incoming recruiter inquiry and verify that an official ticket number and automated auto-reply receipt are created immediately.
                </p>

                <div className="flex gap-2">
                  <input
                    type="email"
                    value={testEmail}
                    onChange={e => setTestEmail(e.target.value)}
                    placeholder="Enter recipient email (e.g. your-email@domain.com)"
                    className="flex-1 px-3 py-2 text-xs rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                  <button
                    type="button"
                    onClick={handleTestDispatch}
                    disabled={testStatus === 'sending'}
                    className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shrink-0 disabled:opacity-50"
                  >
                    {testStatus === 'sending' ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Testing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Test Auto-Reply</span>
                      </>
                    )}
                  </button>
                </div>

                {testResult && (
                  <div className={`p-3 rounded-lg text-xs leading-relaxed ${
                    testStatus === 'success' 
                      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                      : 'bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20'
                  }`}>
                    {testResult}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider font-mono">
                    Automated Confirmation Letter
                  </h4>
                  <p className="text-[11px] text-neutral-400">
                    This email is automatically formatted and delivered to any recruiter or visitor who submits an inquiry:
                  </p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(samplePreviewText);
                    setCopiedSnippet(true);
                    setTimeout(() => setCopiedSnippet(false), 2000);
                  }}
                  className="px-2.5 py-1 text-xs rounded-md border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-1"
                >
                  {copiedSnippet ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSnippet ? 'Copied' : 'Copy Template'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 text-neutral-100 font-mono text-[11px] leading-relaxed whitespace-pre-wrap border border-neutral-800 overflow-x-auto shadow-inner">
                {samplePreviewText}
              </div>
            </div>
          )}

          {activeTab === 'variables' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-xs text-neutral-600 dark:text-neutral-400 space-y-2">
                <span className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-cyan-500" />
                  How to setup EmailJS in 3 steps
                </span>
                <ol className="list-decimal pl-4 space-y-1.5 leading-relaxed">
                  <li>
                    Create a free account at <a href="https://www.emailjs.com" target="_blank" rel="noopener noreferrer" className="text-cyan-600 dark:text-cyan-400 underline font-semibold">emailjs.com</a> and add an Email Service (e.g. Gmail or Outlook).
                  </li>
                  <li>
                    Create an <strong>Inquiry Notification Template</strong> and an optional <strong>Auto-Reply Template</strong>.
                  </li>
                  <li>
                    Copy your <code>Service ID</code>, <code>Template ID</code>, and <code>Public Key</code> into this modal or into <code>.env</code>.
                  </li>
                </ol>
              </div>

              <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider font-mono">
                EmailJS Template Placeholders
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                  <code className="text-cyan-600 dark:text-cyan-400 font-bold">&#123;&#123;from_name&#125;&#125;</code>
                  <span className="block text-[11px] text-neutral-500 font-sans mt-0.5">Sender's full name</span>
                </div>
                <div className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                  <code className="text-cyan-600 dark:text-cyan-400 font-bold">&#123;&#123;from_email&#125;&#125;</code>
                  <span className="block text-[11px] text-neutral-500 font-sans mt-0.5">Sender's email address</span>
                </div>
                <div className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                  <code className="text-cyan-600 dark:text-cyan-400 font-bold">&#123;&#123;subject&#125;&#125;</code>
                  <span className="block text-[11px] text-neutral-500 font-sans mt-0.5">Inquiry subject or topic</span>
                </div>
                <div className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                  <code className="text-cyan-600 dark:text-cyan-400 font-bold">&#123;&#123;message&#125;&#125;</code>
                  <span className="block text-[11px] text-neutral-500 font-sans mt-0.5">Full message content</span>
                </div>
                <div className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                  <code className="text-cyan-600 dark:text-cyan-400 font-bold">&#123;&#123;ticket_id&#125;&#125;</code>
                  <span className="block text-[11px] text-neutral-500 font-sans mt-0.5">Tracking reference number</span>
                </div>
                <div className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                  <code className="text-cyan-600 dark:text-cyan-400 font-bold">&#123;&#123;reply_to&#125;&#125;</code>
                  <span className="block text-[11px] text-neutral-500 font-sans mt-0.5">Sender's email for reply header</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-950/40 flex items-center justify-between text-xs text-neutral-500">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-500" />
            Strict SLA commitment: 24 business hour turnaround
          </span>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
