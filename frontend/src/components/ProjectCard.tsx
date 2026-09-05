import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, Sparkles, Layers, Cpu } from 'lucide-react';
import { ProjectData } from '../types';

export interface ProjectCardProps {
  project: ProjectData;
  key?: React.Key;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const categoryIcon =
    project.category === 'AI & ML' ? (
      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
    ) : project.category === 'Cloud & Systems' ? (
      <Layers className="w-3.5 h-3.5 text-cyan-500" />
    ) : (
      <Cpu className="w-3.5 h-3.5 text-emerald-500" />
    );

  return (
    <div className="group relative rounded-2xl border border-slate-200/80 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/40 hover:bg-slate-50/80 dark:hover:bg-neutral-900/80 hover:border-emerald-500/40 dark:hover:border-neutral-700 transition-all duration-300 flex flex-col overflow-hidden shadow-xs hover:shadow-xl dark:shadow-neutral-950/40">
      {/* Featured Thumbnail */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-neutral-950">
        <img
          src={project.featuredImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 dark:opacity-85 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 dark:from-neutral-950 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/90 dark:bg-neutral-900/90 border border-slate-200/80 dark:border-neutral-700/60 backdrop-blur-md text-xs font-semibold text-slate-800 dark:text-neutral-200 shadow-xs">
            {categoryIcon}
            <span>{project.category}</span>
          </span>
          {project.featured && (
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-[11px] font-semibold text-emerald-600 dark:text-emerald-300 backdrop-blur-md">
              Featured Case Study
            </span>
          )}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-neutral-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors tracking-tight line-clamp-1">
            <Link to={`/projects/${project.slug}`}>{project.title}</Link>
          </h3>
          <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400/90 mt-1 font-semibold">{project.tagline}</p>
          <p className="text-sm text-slate-600 dark:text-neutral-400 mt-2.5 line-clamp-2 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Technology Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-neutral-800/80 border border-slate-200 dark:border-neutral-700/40 text-[11px] font-mono text-slate-700 dark:text-neutral-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-neutral-800/50 text-[11px] font-mono text-slate-500 dark:text-neutral-400">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-200 dark:border-neutral-800/80 flex items-center justify-between">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-neutral-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group/link"
          >
            <span>View Deep Architecture</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </Link>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
                title="View Source Repository"
                aria-label="View Source Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
                title="Open Live Demonstration"
                aria-label="Open Live Demonstration"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
