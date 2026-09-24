/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { initialPortfolioData, PortfolioData, Project } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AtsKeywordStrip } from './components/AtsKeywordStrip';
import { About } from './components/About';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { CertificationsSection } from './components/CertificationsSection';
import { ResumeCTA } from './components/ResumeCTA';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { SocialShareModal } from './components/SocialShareModal';
import { AskShivankAiDrawer } from './components/AskShivankAiDrawer';
import { AdminKnowledgeModal } from './components/AdminKnowledgeModal';
import { RecruiterHubModal } from './components/RecruiterHubModal';

export default function App() {
  const [data, setData] = useState<PortfolioData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedProjects = localStorage.getItem('sm_custom_projects');
        if (savedProjects) {
          const parsed = JSON.parse(savedProjects) as Project[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            return {
              ...initialPortfolioData,
              projects: parsed
            };
          }
        }
      } catch (err) {
        console.error('Failed to parse local stored projects', err);
      }
    }
    return initialPortfolioData;
  });

  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isHubOpen, setIsHubOpen] = useState(false);
  const [hubTab, setHubTab] = useState<'saved' | 'inquiry' | 'endorse' | 'admin' | 'chats'>('saved');

  const handleSaveProjects = (updatedProjects: Project[]) => {
    const updatedData: PortfolioData = {
      ...data,
      projects: updatedProjects
    };
    setData(updatedData);
    try {
      localStorage.setItem('sm_custom_projects', JSON.stringify(updatedProjects));
    } catch (e) {
      console.error('Storage error', e);
    }
  };

  const handleResetProjects = () => {
    if (window.confirm('Reset projects to default verified resume case studies?')) {
      localStorage.removeItem('sm_custom_projects');
      setData({
        ...data,
        projects: initialPortfolioData.projects
      });
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-cyan-500/20 selection:text-cyan-400 transition-colors duration-200">
          
          {/* Navigation */}
          <Navbar
            onOpenResume={() => setIsResumeOpen(true)}
            onOpenShare={() => setIsShareOpen(true)}
            onOpenAdmin={() => setIsAdminOpen(true)}
            onOpenAi={() => setIsAiOpen(true)}
            onOpenHub={() => {
              setHubTab('saved');
              setIsHubOpen(true);
            }}
          />

          {/* Main Content Area */}
          <main>
            {/* Recruiter Hero */}
            <Hero
              data={data}
              onOpenResume={() => setIsResumeOpen(true)}
            />

            {/* ATS Keyword Quick-Scan Strip */}
            <AtsKeywordStrip
              keywords={data.atsKeywords}
            />

            {/* About / Professional Positioning */}
            <About
              data={data}
            />

            {/* Filterable Skills & Technology Matrix */}
            <SkillsSection
              categories={data.skills}
              onOpenEndorse={() => {
                setHubTab('endorse');
                setIsHubOpen(true);
              }}
            />

            {/* Real Work Experience & Operational Outcomes */}
            <ExperienceSection
              experienceList={data.experience}
            />

            {/* Projects & Integrated Case Study CMS */}
            <ProjectsSection
              projects={data.projects}
              onSaveProjects={handleSaveProjects}
              onResetProjects={handleResetProjects}
            />

            {/* Education */}
            <EducationSection
              educationList={data.education}
            />

            {/* Certifications & Simulations */}
            <CertificationsSection
              certifications={data.certifications}
            />

            {/* Dedicated Resume Action Banner */}
            <ResumeCTA
              onOpenResume={() => setIsResumeOpen(true)}
            />

            {/* Verified Contact Section */}
            <ContactSection
              data={data}
            />
          </main>

          {/* Footer */}
          <Footer
            data={data}
          />

          {/* Full ATS Résumé Modal (Printable & Plain Text) */}
          <ResumeModal
            isOpen={isResumeOpen}
            onClose={() => setIsResumeOpen(false)}
            data={data}
          />

          {/* Social Share & Email Signature Drawer */}
          <SocialShareModal
            isOpen={isShareOpen}
            onClose={() => setIsShareOpen(false)}
            data={data}
          />

          {/* AI Grounded Knowledge Assistant Drawer */}
          <AskShivankAiDrawer />

          {/* Admin RAG Document Ingestion Modal */}
          <AdminKnowledgeModal
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
          />

          {/* Firebase Recruiter & Visitor Hub Modal */}
          <RecruiterHubModal
            isOpen={isHubOpen}
            onClose={() => setIsHubOpen(false)}
            defaultTab={hubTab}
          />

        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
