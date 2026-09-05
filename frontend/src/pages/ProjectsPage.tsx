import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, FolderGit2, Sparkles, Filter, X } from 'lucide-react';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectCardSkeleton } from '../components/Skeleton';
import { api } from '../services/api';
import { ProjectData, ProjectCategory } from '../types';

const categories: ('All' | ProjectCategory)[] = [
  'All',
  'Full-Stack',
  'Cloud & Systems',
  'AI & ML',
  'Fintech',
  'Open Source',
];

export function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const activeCategory = searchParams.get('category') || 'All';

  useEffect(() => {
    setLoading(true);
    api
      .getProjects({
        category: activeCategory !== 'All' ? activeCategory : undefined,
      })
      .then((res) => {
        if (res.success) setProjects(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const handleCategoryChange = (cat: string) => {
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const filteredProjects = projects.filter((p) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      p.title.toLowerCase().includes(term) ||
      p.shortDescription.toLowerCase().includes(term) ||
      p.technologies.some((t) => t.toLowerCase().includes(term))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Case Studies & Architectures</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-100 tracking-tight">
          Featured Engineering Deployments
        </h1>
        <p className="text-neutral-400 text-base leading-relaxed">
          Deep architectural case studies spanning distributed Node.js microservices, resilient MongoDB Atlas clusters, real-time telemetry systems, and modern React interfaces.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-neutral-900 border border-neutral-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-neutral-800 text-emerald-400 font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Live Search Field */}
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search stack or title..."
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

      {/* Projects Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <div className="p-16 rounded-2xl border border-neutral-800 bg-neutral-900/30 text-center space-y-3">
          <p className="text-base font-semibold text-neutral-200">No matching case studies found</p>
          <p className="text-xs text-neutral-400">
            Try adjusting your search keywords or switching the category filter.
          </p>
        </div>
      )}
    </div>
  );
}
