import { useState, useEffect } from 'react';
import { Search, Code2, Cpu, Database, Server, Layers, Wrench, X } from 'lucide-react';
import { SkillBadge } from '../components/SkillBadge';
import { api } from '../services/api';
import { SkillData, SkillCategory } from '../types';

const categories: ('All' | SkillCategory)[] = [
  'All',
  'Frontend',
  'Backend',
  'Database',
  'DevOps',
  'Tools',
];

export function SkillsPage() {
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLoading(true);
    api
      .getSkills()
      .then((res) => {
        if (res.success) setSkills(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory =
      selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch =
      !searchTerm.trim() ||
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (skill.highlightText && skill.highlightText.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
          <Code2 className="w-3.5 h-3.5" />
          <span>Engineering Arsenal</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-100 tracking-tight">
          Technical Arsenal & Core Competencies
        </h1>
        <p className="text-neutral-400 text-base leading-relaxed">
          Comprehensive inventory of verified proficiencies across modern frontend ecosystems, enterprise backend runtimes, distributed MongoDB architectures, and container orchestration.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-neutral-900 border border-neutral-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-neutral-800 text-emerald-400 font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter competencies..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder-neutral-500 text-xs focus:outline-none focus:border-emerald-500 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="p-16 text-center text-sm font-mono text-neutral-400">
          Loading competencies matrix...
        </div>
      ) : filteredSkills.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => (
            <SkillBadge key={skill._id} skill={skill} />
          ))}
        </div>
      ) : (
        <div className="p-16 rounded-2xl border border-neutral-800 bg-neutral-900/30 text-center space-y-2">
          <p className="text-base font-semibold text-neutral-200">No matching skills found</p>
          <p className="text-xs text-neutral-400">
            Clear your filter to inspect all engineering skills.
          </p>
        </div>
      )}
    </div>
  );
}
