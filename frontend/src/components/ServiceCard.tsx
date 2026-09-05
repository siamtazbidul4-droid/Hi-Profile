import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Layers } from 'lucide-react';
import { ServiceData } from '../types';

export interface ServiceCardProps {
  service: ServiceData;
  key?: React.Key;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 hover:bg-slate-50/80 dark:hover:bg-neutral-900/70 hover:border-emerald-500/40 dark:hover:border-neutral-700 transition-all duration-300 p-8 flex flex-col justify-between gap-6 group shadow-xs hover:shadow-xl dark:shadow-neutral-950/40">
      <div className="space-y-4">
        {/* Optional Service Image / Icon Header */}
        <div className="flex items-center justify-between">
          {service.image ? (
            <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-700">
              <img
                src={service.image}
                alt={service.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
          )}
          <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
            {service.timeline}
          </span>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-neutral-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {service.title}
          </h3>
          <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400/90 mt-1 font-semibold">{service.subtitle}</p>
          <p className="text-sm text-slate-600 dark:text-neutral-400 mt-3 leading-relaxed">{service.description}</p>
        </div>

        {/* Deliverables / Capabilities */}
        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-neutral-800/80">
          <p className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">Core Scope</p>
          <ul className="space-y-2">
            {service.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Details */}
      <div className="pt-4 border-t border-slate-200 dark:border-neutral-800/80 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono text-slate-400 dark:text-neutral-500 uppercase block">Investment Tier</span>
          <span className="text-sm font-bold text-slate-800 dark:text-neutral-200">{service.priceRange}</span>
        </div>

        <Link
          to="/contact"
          state={{ defaultSubject: `Inquiry for ${service.title}` }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-emerald-500 hover:text-neutral-950 dark:bg-neutral-800 dark:hover:bg-emerald-500 dark:hover:text-neutral-950 text-slate-800 dark:text-neutral-200 text-xs font-bold transition-all shadow-xs"
        >
          <span>Retain & Book</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
