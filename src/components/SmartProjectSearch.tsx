/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Sparkles, X, Tag } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface SmartProjectSearchProps {
  projects: Project[];
  onFilterChange: (filtered: Project[], activeQuery: string) => void;
}

const COMMON_TECH_QUICK_FILTERS = [
  "All",
  "React.js",
  "Next.js",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "PostgreSQL",
  "JWT",
  "Tailwind CSS"
];

export const SmartProjectSearch: React.FC<SmartProjectSearchProps> = ({ projects, onFilterChange }) => {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  const handleSearchChange = (text: string) => {
    setQuery(text);
    applyFilter(text, selectedTag);
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag);
    applyFilter(query, tag);
  };

  const applyFilter = (text: string, tag: string) => {
    const qLower = text.toLowerCase().trim();
    const tagMatch = tag === 'All' ? '' : tag.toLowerCase();

    const filtered = projects.filter((p) => {
      const matchText =
        !qLower ||
        p.title.toLowerCase().includes(qLower) ||
        p.description.toLowerCase().includes(qLower) ||
        p.tagline.toLowerCase().includes(qLower) ||
        p.technologies.some(t => t.toLowerCase().includes(qLower)) ||
        p.category.toLowerCase().includes(qLower);

      const matchTag =
        !tagMatch ||
        p.technologies.some(t => t.toLowerCase() === tagMatch);

      return matchText && matchTag;
    });

    onFilterChange(filtered, text || (tag !== 'All' ? tag : ''));
  };

  const clearAll = () => {
    setQuery('');
    setSelectedTag('All');
    onFilterChange(projects, '');
  };

  return (
    <div className="mb-8 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800">
      
      {/* Top Search Bar */}
      <div className="flex items-center gap-2 mb-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Smart project search (e.g. 'JWT authentication', 'React', 'MongoDB')..."
            className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          {query && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {(query || selectedTag !== 'All') && (
          <button
            onClick={clearAll}
            className="text-xs text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 underline font-mono shrink-0"
          >
            Clear
          </button>
        )}
      </div>

      {/* Tech Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
        <span className="text-[11px] font-mono text-neutral-400 shrink-0 flex items-center gap-1 mr-1">
          <Tag className="w-3 h-3 text-cyan-500" />
          Filter by Stack:
        </span>
        {COMMON_TECH_QUICK_FILTERS.map((tech) => (
          <button
            key={tech}
            onClick={() => handleTagSelect(tech)}
            className={`px-2.5 py-1 text-[11px] rounded-lg font-mono transition-colors whitespace-nowrap ${
              selectedTag === tech
                ? 'bg-neutral-900 text-white dark:bg-cyan-500 dark:text-neutral-950 font-semibold shadow-2xs'
                : 'bg-white dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400'
            }`}
          >
            {tech}
          </button>
        ))}
      </div>

    </div>
  );
};
