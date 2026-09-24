/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ExternalLink, 
  Github, 
  ArrowRight, 
  Layers, 
  UserCheck, 
  AlertCircle,
  FileText,
  Bookmark
} from 'lucide-react';
import { Project } from '../data/portfolioData';
import { useAuth } from '../context/AuthContext';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const { isProjectSaved, toggleSaveProject } = useAuth();
  const saved = isProjectSaved(project.id);
  return (
    <div className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/90 hover:border-neutral-300 dark:hover:border-neutral-700/80 transition-all shadow-2xs group">
      
      <div>
        {/* Top meta tags */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-mono rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20 font-medium">
              {project.category}
            </span>
            <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
              {project.status}
            </span>
          </div>

          <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
            <UserCheck className="w-3 h-3 text-cyan-500" />
            <span>{project.role}</span>
          </div>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onSelect(project)}
          className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 cursor-pointer transition-colors mb-1.5"
        >
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-3.5">
          {project.tagline}
        </p>

        {/* Brief description */}
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-3 mb-4">
          {project.description}
        </p>

        {/* Problem addressed preview */}
        <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/70 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 mb-5">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
            <AlertCircle className="w-3.5 h-3.5 text-cyan-500" />
            <span>Problem Solved:</span>
          </div>
          <p className="line-clamp-2 leading-relaxed">
            {project.problemSolved}
          </p>
        </div>
      </div>

      <div>
        {/* Technologies pills */}
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 mb-5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[11px] font-mono rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700/60"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between gap-2 pt-2">
          
          <button
            onClick={() => onSelect(project)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded px-1 -ml-1"
          >
            <span>Case Study Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSaveProject({ id: project.id, title: project.title, category: project.category });
              }}
              className={`p-2 rounded-lg transition-colors ${
                saved
                  ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-500/30'
                  : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
              title={saved ? 'Remove from Recruiter Shortlist (Firestore)' : 'Save to Recruiter Shortlist (Firestore)'}
              aria-label={saved ? 'Remove bookmark' : 'Bookmark project'}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-cyan-500' : ''}`} />
            </button>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                title="View GitHub Repository"
                aria-label={`View ${project.title} GitHub repository`}
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                title="Live Application Demo"
                aria-label={`View live demo of ${project.title}`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 px-2 py-1 rounded bg-neutral-100/60 dark:bg-neutral-800/40">
                Link coming soon
              </span>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};
