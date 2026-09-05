import React from 'react';
import { Code2, Database, Server, Cpu, Layers, Wrench, Shield, Cloud } from 'lucide-react';
import { SkillData } from '../types';

export interface SkillBadgeProps {
  skill: SkillData;
  key?: React.Key;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({ skill }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend':
        return <Code2 className="w-4 h-4 text-cyan-500" />;
      case 'Backend':
        return <Server className="w-4 h-4 text-emerald-500" />;
      case 'Database':
        return <Database className="w-4 h-4 text-amber-500" />;
      case 'DevOps':
        return <Cloud className="w-4 h-4 text-purple-500" />;
      default:
        return <Wrench className="w-4 h-4 text-slate-500 dark:text-neutral-400" />;
    }
  };

  return (
    <div className="p-4 rounded-xl border border-slate-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 hover:bg-slate-50/80 dark:hover:bg-neutral-900/80 hover:border-emerald-500/40 dark:hover:border-neutral-700 transition-all duration-200 flex flex-col justify-between gap-3 group shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-slate-100 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800">
            {getCategoryIcon(skill.category)}
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-neutral-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {skill.name}
            </h4>
            <span className="text-[11px] font-mono text-slate-500 dark:text-neutral-500">{skill.category}</span>
          </div>
        </div>
        <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
          {skill.proficiency}%
        </span>
      </div>

      {skill.highlightText && (
        <p className="text-xs text-slate-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
          {skill.highlightText}
        </p>
      )}

      {/* Progress Bar */}
      <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-neutral-950 overflow-hidden border border-slate-200 dark:border-neutral-800/80">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000"
          style={{ width: `${skill.proficiency}%` }}
        />
      </div>
    </div>
  );
};
