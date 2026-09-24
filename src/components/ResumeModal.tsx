/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  Mail, 
  MapPin, 
  ExternalLink,
  Linkedin,
  Github,
  CheckCircle2
} from 'lucide-react';
import { PortfolioData } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, data }) => {
  const [copiedText, setCopiedText] = useState(false);
  const { profile, skills, experience, projects, education, certifications } = data;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
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

  const handlePrint = () => {
    window.print();
  };

  const handleCopyPlainText = () => {
    const plainText = `
SHIVANK MAURYA
Full Stack Developer | Customer Support & Technical Support
Location: ${profile.location}
Email: ${profile.email}
LinkedIn: https://www.linkedin.com/in/shivank-maurya-21257a303/
GitHub: https://github.com/shivankmaurya

PROFESSIONAL SUMMARY
${profile.bioIntro}
${profile.bioParagraphs.join('\n\n')}

CORE TECHNICAL SKILLS
${skills.map(s => `• ${s.name}: ${s.skills.map(sk => sk.name).join(', ')}`).join('\n')}

PROFESSIONAL EXPERIENCE
${experience.map(e => `
${e.title} | ${e.company}
${e.location} | ${e.period}
Platform Supported: ${e.platformSupported}
Summary: ${e.summary}
Key Accomplishments:
${e.highlights.map(h => `- ${h}`).join('\n')}
Skills Used: ${e.skillsUsed.join(', ')}
`).join('\n')}

PROJECTS
${projects.map(p => `
${p.title} (${p.category}) - Role: ${p.role}
Technologies: ${p.technologies.join(', ')}
Overview: ${p.description}
Problem Solved: ${p.problemSolved}
Solution: ${p.solution}
Key Features:
${p.keyFeatures.map(f => `- ${f}`).join('\n')}
`).join('\n')}

EDUCATION
${education.map(ed => `
${ed.degree}
${ed.institution} (${ed.period}) - ${ed.location}
${ed.details || ''}
`).join('\n')}

CERTIFICATIONS & JOB SIMULATIONS
${certifications.map(c => `• ${c.title} - ${c.issuer} (${c.credentialType})`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(plainText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity no-print"
        onClick={onClose}
      />

      {/* Main Container */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-4 z-10 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Control Bar */}
        <div className="px-6 py-3.5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-950/70 no-print">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-500" />
            <h2 id="resume-modal-title" className="text-sm font-bold text-neutral-900 dark:text-white">
              Official ATS Résumé Document
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyPlainText}
              className="px-3 py-1.5 text-xs font-mono rounded-md border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-1.5 transition-colors"
              title="Copy plain-text formatted résumé for ATS job applications"
            >
              {copiedText ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied Text</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy ATS Text</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-semibold rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-white flex items-center gap-1.5 transition-colors shadow-2xs"
              title="Print document or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400 dark:text-cyan-600" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              aria-label="Close résumé dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable & ATS-formatted Document Content */}
        <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 font-sans print:p-0 print:max-h-none print:bg-white print:text-black">
          
          {/* Header */}
          <div className="border-b-2 border-neutral-900 dark:border-neutral-200 pb-4 mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white uppercase">
              {profile.name}
            </h1>
            <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mt-0.5">
              {profile.headline}
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-neutral-600 dark:text-neutral-400 mt-2 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-neutral-400" />
                {profile.location}
              </span>
              <span>•</span>
              <a href={`mailto:${profile.email}`} className="hover:underline flex items-center gap-1">
                <Mail className="w-3 h-3 text-neutral-400" />
                {profile.email}
              </a>
              <span>•</span>
              <a href="https://www.linkedin.com/in/shivank-maurya-21257a303/" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                <Linkedin className="w-3 h-3 text-neutral-400" />
                LinkedIn
              </a>
              <span>•</span>
              <a href="https://github.com/shivankmaurya" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                <Github className="w-3 h-3 text-neutral-400" />
                GitHub
              </a>
            </div>
          </div>

          {/* Section: Professional Summary */}
          <div className="mb-6">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-1 mb-2.5">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {profile.bioIntro} Currently pursuing a Bachelor of Computer Applications (BCA) at Babu Banarasi Das University while maintaining active production support operations at Niftel Communications for Swiggy's food and quick-commerce platform.
            </p>
          </div>

          {/* Section: Core Technical Skills */}
          <div className="mb-6">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-1 mb-2.5">
              Technical Proficiencies
            </h2>
            <div className="space-y-1.5 text-xs text-neutral-800 dark:text-neutral-200 font-sans">
              {skills.map((category) => (
                <div key={category.name} className="flex flex-col sm:flex-row sm:items-start gap-1">
                  <span className="font-semibold text-neutral-900 dark:text-white w-36 shrink-0">
                    {category.name}:
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-300">
                    {category.skills.map(s => s.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Experience */}
          <div className="mb-6">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-1 mb-3">
              Professional Work Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                  <span>{exp.title} — {exp.company}</span>
                  <span className="font-mono text-xs font-normal text-neutral-500">{exp.period} | {exp.location}</span>
                </div>
                <div className="text-xs text-cyan-700 dark:text-cyan-400 font-medium mb-1.5">
                  Platform: {exp.platformSupported}
                </div>
                <ul className="list-disc pl-4 space-y-1 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Section: Projects */}
          <div className="mb-6">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-1 mb-3">
              Technical Projects
            </h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                  <span>{proj.title}</span>
                  <span className="font-mono text-[11px] font-normal text-neutral-500">
                    Stack: {proj.technologies.join(', ')}
                  </span>
                </div>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed mt-0.5">
                  {proj.description}
                </p>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
                  <strong>Key Implementation:</strong> {proj.keyFeatures.slice(0, 2).join(' · ')}
                </div>
              </div>
            ))}
          </div>

          {/* Section: Education */}
          <div className="mb-6">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-1 mb-2.5">
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                  <span>{edu.degree} — {edu.institution}</span>
                  <span className="font-mono text-xs font-normal text-neutral-500">{edu.period}</span>
                </div>
                {edu.details && (
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                    {edu.details}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Section: Certifications */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-1 mb-2.5">
              Certifications & Industry Job Simulations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700 dark:text-neutral-300">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>{cert.title}</strong> — {cert.issuer}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer info banner */}
        <div className="px-6 py-3 bg-neutral-100 dark:bg-neutral-950/80 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 font-mono no-print">
          <span>ATS Standard 1-Page Layout · Clean Text Parser Ready</span>
          <button
            onClick={onClose}
            className="hover:text-neutral-900 dark:hover:text-white"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
