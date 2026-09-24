/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw, 
  Copy, 
  Check, 
  FolderPlus, 
  Layers, 
  FileCode2 
} from 'lucide-react';
import { Project, initialPortfolioData } from '../data/portfolioData';

interface ProjectCmsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onSaveProjects: (updated: Project[]) => void;
  onResetProjects: () => void;
}

export const ProjectCmsModal: React.FC<ProjectCmsModalProps> = ({
  isOpen,
  onClose,
  projects,
  onSaveProjects,
  onResetProjects
}) => {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showExportJson, setShowExportJson] = useState(false);

  // Form state
  const [formState, setFormState] = useState<Partial<Project>>({
    title: '',
    tagline: '',
    category: 'Full Stack',
    status: 'Completed',
    role: 'Full Stack Developer',
    description: '',
    problemSolved: '',
    solution: '',
    technologies: [],
    keyFeatures: [],
    githubUrl: '',
    liveUrl: '',
    isFeatured: true
  });

  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');

  if (!isOpen) return null;

  const handleStartAdd = () => {
    setIsAddingNew(true);
    setEditingProject(null);
    setFormState({
      id: `proj-${Date.now()}`,
      title: '',
      tagline: '',
      category: 'Full Stack',
      status: 'Completed',
      role: 'Full Stack Developer',
      description: '',
      problemSolved: '',
      solution: '',
      technologies: ['React.js', 'TypeScript', 'Node.js'],
      keyFeatures: ['Responsive component architecture'],
      githubUrl: '',
      liveUrl: '',
      isFeatured: true
    });
    setTechInput('');
    setFeatureInput('');
  };

  const handleStartEdit = (proj: Project) => {
    setEditingProject(proj);
    setIsAddingNew(false);
    setFormState({ ...proj });
    setTechInput('');
    setFeatureInput('');
  };

  const handleAddTech = () => {
    if (!techInput.trim()) return;
    const current = formState.technologies || [];
    if (!current.includes(techInput.trim())) {
      setFormState({ ...formState, technologies: [...current, techInput.trim()] });
    }
    setTechInput('');
  };

  const handleRemoveTech = (item: string) => {
    setFormState({
      ...formState,
      technologies: (formState.technologies || []).filter(t => t !== item)
    });
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    const current = formState.keyFeatures || [];
    setFormState({ ...formState, keyFeatures: [...current, featureInput.trim()] });
    setFeatureInput('');
  };

  const handleRemoveFeature = (index: number) => {
    setFormState({
      ...formState,
      keyFeatures: (formState.keyFeatures || []).filter((_, i) => i !== index)
    });
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title?.trim() || !formState.description?.trim()) {
      alert('Please fill out at least a project title and description.');
      return;
    }

    const newProjectItem: Project = {
      id: formState.id || `proj-${Date.now()}`,
      title: formState.title.trim(),
      tagline: formState.tagline?.trim() || 'Modern web application',
      category: (formState.category as any) || 'Full Stack',
      status: (formState.status as any) || 'Completed',
      role: formState.role?.trim() || 'Developer',
      description: formState.description.trim(),
      problemSolved: formState.problemSolved?.trim() || 'Addressed operational and architectural performance needs.',
      solution: formState.solution?.trim() || 'Engineered responsive frontend with verified backend services.',
      technologies: formState.technologies?.length ? formState.technologies : ['React.js', 'JavaScript'],
      keyFeatures: formState.keyFeatures?.length ? formState.keyFeatures : ['Production-ready user interface'],
      githubUrl: formState.githubUrl?.trim() || undefined,
      liveUrl: formState.liveUrl?.trim() || undefined,
      isFeatured: formState.isFeatured ?? true
    };

    let updatedList: Project[];
    if (editingProject) {
      updatedList = projects.map(p => (p.id === editingProject.id ? newProjectItem : p));
    } else {
      updatedList = [newProjectItem, ...projects];
    }

    onSaveProjects(updatedList);
    setEditingProject(null);
    setIsAddingNew(false);
  };

  const handleDeleteProject = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove "${title}"?`)) {
      const updated = projects.filter(p => p.id !== id);
      onSaveProjects(updated);
      if (editingProject?.id === id) {
        setEditingProject(null);
        setIsAddingNew(false);
      }
    }
  };

  const handleExportJson = () => {
    const jsonString = JSON.stringify(projects, null, 2);
    navigator.clipboard.writeText(jsonString);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto no-print"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cms-modal-title"
    >
      <div 
        className="fixed inset-0 bg-neutral-950/75 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-6 z-10 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-500/20">
              <FolderPlus className="w-4 h-4" />
            </div>
            <div>
              <h2 id="cms-modal-title" className="text-base font-bold text-neutral-900 dark:text-white">
                Case Study Content Manager
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Easily add or update projects without touching code. Persists in browser and exports to TypeScript.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowExportJson(!showExportJson)}
              className="px-3 py-1.5 text-xs font-mono rounded-md border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-1.5"
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>{showExportJson ? 'Hide Code' : 'Export Data'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Export Drawer if toggled */}
        {showExportJson && (
          <div className="bg-neutral-950 text-neutral-200 p-4 border-b border-neutral-800 text-xs font-mono">
            <div className="flex items-center justify-between mb-2">
              <span className="text-neutral-400">Exportable JSON for portfolioData.ts:</span>
              <button
                onClick={handleExportJson}
                className="px-2.5 py-1 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded flex items-center gap-1 transition-colors"
              >
                {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCode ? 'Copied to Clipboard' : 'Copy JSON'}</span>
              </button>
            </div>
            <pre className="max-h-48 overflow-y-auto bg-neutral-900 p-3 rounded border border-neutral-800 text-[11px] leading-tight select-all">
              {JSON.stringify(projects, null, 2)}
            </pre>
          </div>
        )}

        {/* CMS Workspace */}
        <div className="p-6 max-h-[72vh] overflow-y-auto">
          
          {/* Active List & Add Button */}
          {!isAddingNew && !editingProject && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  {projects.length} Published Case Studies
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onResetProjects}
                    className="px-3 py-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-red-500 dark:hover:text-red-400 flex items-center gap-1 transition-colors"
                    title="Reset to default verified projects"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Defaults</span>
                  </button>

                  <button
                    onClick={handleStartAdd}
                    className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-cyan-600 dark:bg-cyan-500 hover:bg-cyan-700 dark:hover:bg-cyan-400 text-white dark:text-neutral-950 flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Project</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                          {proj.title}
                        </h4>
                        <span className="px-2 py-0.2 text-[10px] font-mono rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                          {proj.category}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-1">
                        {proj.tagline}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {proj.technologies.slice(0, 4).map(t => (
                          <span key={t} className="text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-500 dark:text-neutral-400">
                            {t}
                          </span>
                        ))}
                        {proj.technologies.length > 4 && (
                          <span className="text-[10px] font-mono text-neutral-400">
                            +{proj.technologies.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleStartEdit(proj)}
                        className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-cyan-600 dark:hover:text-cyan-400 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        title="Edit project"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id, proj.title)}
                        className="p-2 text-neutral-400 hover:text-red-500 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add / Edit Form */}
          {(isAddingNew || editingProject) && (
            <form onSubmit={handleSaveForm} className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                  {editingProject ? `Edit: ${editingProject.title}` : 'Add New Project'}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNew(false);
                    setEditingProject(null);
                  }}
                  className="text-xs text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.title || ''}
                    onChange={e => setFormState({ ...formState, title: e.target.value })}
                    placeholder="e.g. Next.js SaaS Platform"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Tagline / One-liner *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.tagline || ''}
                    onChange={e => setFormState({ ...formState, tagline: e.target.value })}
                    placeholder="e.g. Real-time collaboration platform for design teams"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Category
                  </label>
                  <select
                    value={formState.category || 'Full Stack'}
                    onChange={e => setFormState({ ...formState, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none"
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Web App">Web App</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Your Role
                  </label>
                  <input
                    type="text"
                    value={formState.role || 'Full Stack Developer'}
                    onChange={e => setFormState({ ...formState, role: e.target.value })}
                    placeholder="e.g. Lead Developer, Frontend Architect"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Overview Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formState.description || ''}
                  onChange={e => setFormState({ ...formState, description: e.target.value })}
                  placeholder="Comprehensive description of the application and its purpose..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-amber-700 dark:text-amber-400 mb-1">
                    Problem Solved
                  </label>
                  <textarea
                    rows={2}
                    value={formState.problemSolved || ''}
                    onChange={e => setFormState({ ...formState, problemSolved: e.target.value })}
                    placeholder="What specific user friction or technical hurdle did this project tackle?"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-emerald-700 dark:text-emerald-400 mb-1">
                    Solution Implemented
                  </label>
                  <textarea
                    rows={2}
                    value={formState.solution || ''}
                    onChange={e => setFormState({ ...formState, solution: e.target.value })}
                    placeholder="How did you architect the application to solve the problem cleanly?"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Technologies Used
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={e => setTechInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTech();
                      }
                    }}
                    placeholder="Type tech name and click Add (e.g. Next.js, Redis)"
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddTech}
                    className="px-3 py-1.5 text-xs bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 text-neutral-800 dark:text-white rounded-lg"
                  >
                    Add Tech
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(formState.technologies || []).map(t => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700"
                    >
                      <span>{t}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTech(t)}
                        className="text-neutral-400 hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Key Features / Deliverables
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={e => setFeatureInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                    placeholder="Add key feature bullet point..."
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-3 py-1.5 text-xs bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 text-neutral-800 dark:text-white rounded-lg"
                  >
                    Add Feature
                  </button>
                </div>
                <ul className="space-y-1">
                  {(formState.keyFeatures || []).map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between text-xs px-2.5 py-1.5 rounded bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/60"
                    >
                      <span className="text-neutral-700 dark:text-neutral-300">{feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-neutral-400 hover:text-red-500 text-xs"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    GitHub Repository URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formState.githubUrl || ''}
                    onChange={e => setFormState({ ...formState, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Live Demo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formState.liveUrl || ''}
                    onChange={e => setFormState({ ...formState, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNew(false);
                    setEditingProject(null);
                  }}
                  className="px-4 py-2 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold rounded-lg bg-cyan-600 dark:bg-cyan-500 hover:bg-cyan-700 dark:hover:bg-cyan-400 text-white dark:text-neutral-950 flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{editingProject ? 'Save Changes' : 'Publish Project'}</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
