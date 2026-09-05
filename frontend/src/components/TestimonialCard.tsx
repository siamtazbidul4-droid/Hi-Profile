import React from 'react';
import { Star, Quote } from 'lucide-react';
import { TestimonialData } from '../types';

export interface TestimonialCardProps {
  testimonial: TestimonialData;
  key?: React.Key;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const name = testimonial.clientName || testimonial.name || 'Anonymous Leader';
  const quoteText = testimonial.quote || testimonial.testimonial || '';

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 hover:bg-slate-50/80 dark:hover:bg-neutral-900/70 hover:border-emerald-500/40 dark:hover:border-neutral-700 transition-all duration-300 p-6 flex flex-col justify-between gap-6 shadow-xs hover:shadow-xl dark:shadow-neutral-950/40">
      {/* Star Rating & Quote Mark */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-amber-500">
          {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-500" />
          ))}
        </div>
        <Quote className="w-6 h-6 text-slate-300 dark:text-neutral-700 opacity-60" />
      </div>

      {/* Testimonial Quote */}
      <p className="text-sm text-slate-700 dark:text-neutral-300 leading-relaxed italic">
        "{quoteText}"
      </p>

      {/* Author Profile */}
      <div className="pt-4 border-t border-slate-200 dark:border-neutral-800/80 flex items-center gap-3.5">
        <img
          src={testimonial.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
          alt={name}
          referrerPolicy="no-referrer"
          className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-neutral-700/80"
          loading="lazy"
        />
        <div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-neutral-100">{name}</h4>
          <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono">
            {testimonial.role} • <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{testimonial.company}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

