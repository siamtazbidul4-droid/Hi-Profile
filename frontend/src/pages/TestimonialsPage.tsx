import { useState, useEffect } from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';
import { TestimonialCard } from '../components/TestimonialCard';
import { api } from '../services/api';
import { TestimonialData } from '../types';

export function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getTestimonials()
      .then((res) => {
        if (res.success) setTestimonials(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Client & Executive Endorsements</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-100 tracking-tight">
          What Engineering Leaders Say
        </h1>
        <p className="text-neutral-400 text-base leading-relaxed">
          Verifiable feedback from CTOs, Engineering VPs, and Startup Founders who have partnered with Alexander on high-scale systems and product architectures.
        </p>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="p-16 text-center text-sm font-mono text-neutral-400">
          Loading endorsements...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <TestimonialCard key={t._id} testimonial={t} />
          ))}
        </div>
      )}
    </div>
  );
}
