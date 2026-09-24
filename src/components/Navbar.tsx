/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  FileText, 
  Share2, 
  ExternalLink,
  ChevronRight,
  Bot,
  Database,
  Bookmark,
  User
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { ConsistencyCheckBadge } from './ConsistencyCheckBadge';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenShare: () => void;
  onOpenAdmin: () => void;
  onOpenAi: () => void;
  onOpenHub: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenResume, 
  onOpenShare,
  onOpenAdmin,
  onOpenAi,
  onOpenHub
}) => {
  const { theme, toggleTheme } = useTheme();
  const { user, savedProjects } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 no-print ${
        isScrolled 
          ? 'bg-neutral-950/85 dark:bg-neutral-950/85 bg-white/85 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 shadow-sm' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <a 
          href="#hero" 
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg p-1"
          aria-label="Shivank Maurya - Full Stack Developer - Home"
        >
          <div className="w-8 h-8 rounded-md bg-neutral-900 dark:bg-neutral-800 border border-neutral-700/60 flex items-center justify-center font-mono font-bold text-xs tracking-wider text-cyan-400 group-hover:border-cyan-500 transition-colors shadow-sm">
            SM
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              Shivank Maurya
            </span>
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono tracking-tight -mt-0.5">
              Full Stack Dev
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  isActive
                    ? 'text-cyan-600 dark:text-cyan-400 bg-neutral-100 dark:bg-neutral-900 font-semibold'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/60 dark:hover:bg-neutral-800/60'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Action Cluster */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Consistency Badge */}
          <ConsistencyCheckBadge />

          {/* Recruiter Hub & Bookmarks */}
          <button
            onClick={onOpenHub}
            className="px-2.5 py-1.5 text-xs font-semibold rounded-md bg-neutral-100 dark:bg-neutral-850 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/80 transition-colors flex items-center gap-1.5 shadow-2xs"
            title="Recruiter Shortlist & Direct Proposal Hub (Firebase)"
          >
            {user?.photoURL ? (
              <img src={user.photoURL} alt="" className="w-4 h-4 rounded-full" />
            ) : (
              <Bookmark className="w-3.5 h-3.5 text-cyan-500" />
            )}
            <span className="hidden xl:inline">{user ? (user.displayName?.split(' ')[0] || 'Recruiter') : 'Recruiter Hub'}</span>
            {savedProjects.length > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] font-mono font-bold rounded-full bg-cyan-500 text-neutral-950">
                {savedProjects.length}
              </span>
            )}
          </button>

          {/* Ask Shivank AI Button */}
          <button
            onClick={onOpenAi}
            className="px-2.5 py-1.5 text-xs font-semibold rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20 transition-colors flex items-center gap-1.5"
            title="Ask Shivank AI (Grounded RAG Assistant)"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Ask AI</span>
          </button>

          {/* Admin Ingestion Button */}
          <button
            onClick={onOpenAdmin}
            className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-md transition-colors"
            title="Admin & RAG Document Ingestion"
            aria-label="Admin Ingestion"
          >
            <Database className="w-3.5 h-3.5" />
          </button>

          {/* Share Button */}
          <button
            onClick={onOpenShare}
            className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-md border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800 transition-colors text-xs flex items-center gap-1.5"
            aria-label="Share Portfolio"
            title="Share portfolio"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Share</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-md border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800 transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-600" />
            )}
          </button>

          {/* Primary CTA: Resume View / Download */}
          <button
            onClick={onOpenResume}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-white transition-all shadow-sm flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400 dark:text-cyan-600" />
            <span>ATS Resume</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-1.5 sm:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-md"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-600" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800 px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col gap-1 pb-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHub();
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold rounded-md bg-cyan-600 hover:bg-cyan-500 text-white flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4" />
                <span>Recruiter Hub & Shortlist</span>
              </div>
              {savedProjects.length > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-neutral-900 text-cyan-400">
                  {savedProjects.length}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-cyan-400 dark:text-cyan-600" />
              <span>View & Download ATS Resume</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenShare();
              }}
              className="w-full py-2 px-4 text-xs font-medium rounded-md border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 flex items-center justify-center gap-2"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Portfolio Link</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
