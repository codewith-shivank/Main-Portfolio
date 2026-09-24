/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FolderGit2, Settings, Plus, Layers, Filter } from 'lucide-react';
import { Project } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailModal } from './ProjectDetailModal';
import { ProjectCmsModal } from './ProjectCmsModal';
import { SmartProjectSearch } from './SmartProjectSearch';

interface ProjectsSectionProps {
  projects: Project[];
  onSaveProjects: (updated: Project[]) => void;
  onResetProjects: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onSaveProjects,
  onResetProjects
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCmsOpen, setIsCmsOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchFiltered, setSearchFiltered] = useState<Project[] | null>(null);

  const categories = ['All', 'Full Stack', 'Frontend', 'Web App'];

  const baseList = searchFiltered !== null ? searchFiltered : projects;
  const displayProjects = baseList.filter((p) => {
    if (filterCategory === 'All') return true;
    return p.category === filterCategory;
  });

  return (
    <section id="projects" className="py-20 border-b border-neutral-200 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-2">
              <span>04</span>
              <span className="text-neutral-400 dark:text-neutral-600">/</span>
              <span>FEATURED_PROJECTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Engineering Case Studies & Applications
            </h2>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Verified technical builds demonstrating full-stack architecture, secure authentication, and responsive UI design.
            </p>
          </div>

          {/* CMS / Manage Projects Trigger */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => setIsCmsOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg bg-neutral-100 dark:bg-neutral-800/90 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/80 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700/60 transition-colors shadow-2xs"
              title="Open intuitive Case Study Content Manager to add or edit projects"
            >
              <Settings className="w-3.5 h-3.5 text-cyan-500" />
              <span>Manage Projects / CMS</span>
            </button>
          </div>
        </div>

        {/* Smart Technology & Semantic Search */}
        <SmartProjectSearch
          projects={projects}
          onFilterChange={(filtered, query) => {
            setSearchFiltered(query ? filtered : null);
          }}
        />

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-8">
          <span className="text-xs text-neutral-400 dark:text-neutral-500 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span>Category:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                filterCategory === cat
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 font-semibold'
                  : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={setSelectedProject}
            />
          ))}
        </div>

        {/* Verification Guarantee */}
        <div className="mt-8 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/30 border border-neutral-200/70 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            <span>All projects reflect genuine codebases built with standard JavaScript & React best practices.</span>
          </div>
          <span className="font-mono text-neutral-400">No fabricated user metrics or fake testimonials</span>
        </div>

      </div>

      {/* Case Study Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Project Content Management Modal */}
      <ProjectCmsModal
        isOpen={isCmsOpen}
        onClose={() => setIsCmsOpen(false)}
        projects={projects}
        onSaveProjects={onSaveProjects}
        onResetProjects={onResetProjects}
      />
    </section>
  );
};
