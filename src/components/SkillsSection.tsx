/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Filter, CheckCircle2, Award } from 'lucide-react';
import { SkillCategory } from '../data/portfolioData';

interface SkillsSectionProps {
  categories: SkillCategory[];
  onOpenEndorse?: () => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ categories, onOpenEndorse }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryNames = useMemo(() => {
    return ['All', ...categories.map(c => c.name)];
  }, [categories]);

  const filteredCategories = useMemo(() => {
    return categories
      .map(cat => {
        // Filter by category
        if (activeCategory !== 'All' && cat.name !== activeCategory) {
          return null;
        }

        // Filter by search query
        if (!searchQuery.trim()) {
          return cat;
        }

        const query = searchQuery.toLowerCase().trim();
        const matchedSkills = cat.skills.filter(s =>
          s.name.toLowerCase().includes(query) || cat.name.toLowerCase().includes(query)
        );

        if (matchedSkills.length === 0) {
          return null;
        }

        return {
          ...cat,
          skills: matchedSkills
        };
      })
      .filter((cat): cat is SkillCategory => cat !== null);
  }, [categories, activeCategory, searchQuery]);

  const totalSkillCount = useMemo(() => {
    return categories.reduce((acc, cat) => acc + cat.skills.length, 0);
  }, [categories]);

  return (
    <section id="skills" className="py-20 border-b border-neutral-200 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-2">
              <span>02</span>
              <span className="text-neutral-400 dark:text-neutral-600">/</span>
              <span>TECHNICAL_COMPETENCIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Skills & Technology Matrix
            </h2>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Verified technical proficiencies across client, server, databases, and development workflows.
            </p>
          </div>

          {/* Search Input for Recruiters */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g. React, Docker)..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
              aria-label="Filter skills by keyword"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills (Functional Buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-3 mb-8">
          <div className="flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500 mr-1.5 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Filter:</span>
          </div>

          {categoryNames.map((catName) => (
            <button
              key={catName}
              onClick={() => setActiveCategory(catName)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                activeCategory === catName
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 font-semibold shadow-2xs'
                  : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/70 dark:hover:bg-neutral-800'
              }`}
            >
              {catName}
            </button>
          ))}
        </div>

        {/* Skill Category Cards Grid */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCategories.map((category) => (
              <div
                key={category.name}
                className="p-5 rounded-xl bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/90 hover:border-neutral-300 dark:hover:border-neutral-700/80 transition-all flex flex-col justify-between shadow-2xs group"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {category.name}
                    </h3>
                    <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                      {category.skills.length} skills
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Skill badges without AI slop / pill spam */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                        skill.highlight
                          ? 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 font-medium'
                          : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700/50'
                      }`}
                    >
                      {skill.highlight && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 p-6 rounded-xl bg-neutral-100/50 dark:bg-neutral-900/30 border border-dashed border-neutral-300 dark:border-neutral-800">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              No skills found matching "<strong className="text-neutral-900 dark:text-neutral-100">{searchQuery}</strong>".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="mt-3 text-xs text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* ATS Quality Note & Firestore Endorsements */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400 pt-4 border-t border-neutral-200 dark:border-neutral-800/60 font-mono">
          <span>{totalSkillCount} verified technical competencies · No subjective percentage bars</span>
          {onOpenEndorse && (
            <button
              onClick={onOpenEndorse}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-sans text-xs font-semibold transition-colors"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Endorse a Competency</span>
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
