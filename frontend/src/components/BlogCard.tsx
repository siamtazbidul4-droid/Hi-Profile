import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowUpRight, BookOpen } from 'lucide-react';
import { BlogPostData } from '../types';

export interface BlogCardProps {
  post: BlogPostData;
  key?: React.Key;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="group rounded-2xl border border-slate-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 hover:bg-slate-50/80 dark:hover:bg-neutral-900/70 hover:border-emerald-500/40 dark:hover:border-neutral-700 transition-all duration-300 flex flex-col overflow-hidden shadow-xs hover:shadow-xl dark:shadow-neutral-950/40">
      {/* Cover Image */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-neutral-950">
        <img
          src={post.coverImage || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'}
          alt={post.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 dark:opacity-85 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 dark:from-neutral-950 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-lg bg-white/90 dark:bg-neutral-900/90 border border-slate-200/60 dark:border-neutral-700/60 backdrop-blur-md text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold shadow-xs">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500 dark:text-neutral-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readingTime}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-neutral-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>

          <p className="text-xs text-slate-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-neutral-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={post.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
              alt={post.author?.name || 'Author'}
              referrerPolicy="no-referrer"
              className="w-6 h-6 rounded-full object-cover border border-slate-200 dark:border-neutral-700"
            />
            <span className="text-xs font-medium text-slate-700 dark:text-neutral-300">{post.author?.name || 'Author'}</span>
          </div>

          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-neutral-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group/link"
          >
            <span>Read Post</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
