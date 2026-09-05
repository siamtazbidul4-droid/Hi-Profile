import { useState, useEffect } from 'react';
import { Layers, ShieldCheck, CheckCircle2, HelpCircle } from 'lucide-react';
import { ServiceCard } from '../components/ServiceCard';
import { api } from '../services/api';
import { ServiceData } from '../types';

export function ServicesPage() {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getServices()
      .then((res) => {
        if (res.success) setServices(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const faqs = [
    {
      q: 'What is your typical architectural engagement model?',
      a: 'I provide dedicated technical leadership either as an embedded Principal Architect (for 3 to 12-month transformation roadmaps) or on a targeted Milestone / Deliverable basis for greenfield MVP builds.',
    },
    {
      q: 'Why MongoDB Atlas for mission-critical enterprise systems?',
      a: 'When modeled with rigorous schema validation and compound indexing, MongoDB Atlas delivers unparalleled flexibility, horizontal sharded scaling, built-in search (Atlas Vector/Text), and sub-20ms p99 write latency without relational schema migration lockups.',
    },
    {
      q: 'Do you offer code audits and latency optimization for existing codebases?',
      a: 'Yes. I perform thorough architectural audits covering database query execution plans, server memory leaks, JWT session vulnerabilities, API bottleneck profiles, and frontend bundle tree-shaking.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
          <Layers className="w-3.5 h-3.5" />
          <span>Engineering Advisory</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-100 tracking-tight">
          Architectural Services & Advisory
        </h1>
        <p className="text-neutral-400 text-base leading-relaxed">
          High-impact engineering engagements tailored for ambitious founders, scale-ups, and enterprise teams seeking resilient architectures and rapid, defect-free delivery.
        </p>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="p-16 text-center text-sm font-mono text-neutral-400">
          Loading architectural services...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      )}

      {/* FAQ Section */}
      <div className="pt-12 border-t border-neutral-800 space-y-8">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Clarified Questions</span>
          </div>
          <h2 className="text-2xl font-bold text-neutral-100">Engineering Engagement FAQ</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-3"
            >
              <h3 className="font-bold text-sm text-neutral-100">{faq.q}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
