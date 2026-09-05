import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Terminal,
  Shield,
  Layers,
  Cpu,
  Calendar,
  MapPin,
  Mail,
  CheckCircle2,
  Award,
  ArrowRight,
  Download,
  Database,
  Server,
  Zap,
} from 'lucide-react';
import { api } from '../services/api';
import { ProfileData } from '../types';

export function AboutPage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getProfile()
      .then((res) => {
        if (res.success && res.data) setProfile(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const principles = [
    {
      title: 'Architectural Correctness Over Premature Optimization',
      description:
        'Clean boundaries, deterministic state machines, and clear domain separation always yield higher velocity and fewer catastrophic bugs than esoteric micro-optimizations.',
      icon: Shield,
    },
    {
      title: 'Zero-Downtime Resilience',
      description:
        'Every database migration, schema transformation, and deployment must be designed to execute without interrupting active end-user traffic.',
      icon: Database,
    },
    {
      title: 'Obsessive Latency & Concurrency Engineering',
      description:
        'Leveraging asynchronous queues, edge caches, connection pooling, and optimized MongoDB index pipelines to guarantee sub-30ms p99 response times.',
      icon: Zap,
    },
    {
      title: 'Craftsmanship at the Boundary',
      description:
        'Interfaces must be responsive, visually deliberate, accessible, and mathematically balanced. The API and UI are two sides of the exact same product contract.',
      icon: Layers,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20">
      {/* 1. HERO / BIOGRAPHY */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Bio text */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
            <Terminal className="w-3.5 h-3.5" />
            <span>Biographical & Engineering Context</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-100 tracking-tight leading-tight">
            Building software with durability, precision, and architectural clarity.
          </h1>

          <div className="prose prose-invert max-w-none text-neutral-300 text-base leading-relaxed space-y-4">
            <p>
              I am <strong>Tajbidul Islam</strong>, a Principal Systems Architect and Full-Stack Engineer with over a decade of experience designing and scaling distributed web applications, data-intensive microservices, and luxury digital products.
            </p>
            <p>
              My engineering philosophy was forged across hyper-growth tech startups, fintech institutions, and distributed cloud initiatives. I focus on reducing system entropy—replacing fragile monoliths with elegant, event-driven Node.js services and resilient MongoDB Atlas databases.
            </p>
            <p>
              Beyond raw backend scalability, I care deeply about end-user ergonomics. I build frontends that feel instantaneous, responsive, and mathematically structured with modern React and TypeScript.
            </p>
          </div>

          {/* Quick Meta Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-800">
            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>{profile?.location || 'San Francisco, CA (PST)'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>{profile?.yearsOfExperience || 10}+ Years Professional Experience</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <Mail className="w-4 h-4 text-amber-400" />
              <span>siamtazbidul4@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Available for Advisory & Principal Roles</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-neutral-950 font-bold text-sm hover:opacity-95 transition-opacity"
            >
              <span>Initiate Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="/api/profile"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-200 font-semibold text-sm hover:bg-neutral-800 transition-colors"
            >
              <Download className="w-4 h-4 text-neutral-400" />
              <span>Download Profile JSON</span>
            </a>
          </div>
        </div>

        {/* Right Portrait & Visual */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
            <img
              src={
                profile?.profileImage ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
              }
              alt="Tajbidul Islam"
              referrerPolicy="no-referrer"
              className="w-full h-96 object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 backdrop-blur-md">
              <p className="text-xs font-mono text-emerald-400">Principal Systems Architect</p>
              <p className="text-sm font-bold text-neutral-100 mt-0.5">Tajbidul Islam</p>
              <p className="text-xs text-neutral-400 mt-1">
                Specialized in distributed microservices, MongoDB sharding, and React architecture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ENGINEERING PRINCIPLES */}
      <section className="space-y-8">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
            <Shield className="w-3.5 h-3.5" />
            <span>Foundational Doctrine</span>
          </div>
          <h2 className="text-3xl font-extrabold text-neutral-100 tracking-tight">
            Engineering Principles & Code Values
          </h2>
          <p className="text-sm text-neutral-400">
            The core axioms guiding all software architecture, database design, and code reviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800 hover:border-neutral-700 transition-all space-y-4"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-neutral-100">{item.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CAREER TIMELINE / LEADERSHIP */}
      <section className="space-y-8">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
            <Award className="w-3.5 h-3.5" />
            <span>Career Progression</span>
          </div>
          <h2 className="text-3xl font-extrabold text-neutral-100 tracking-tight">
            Leadership & Architectural Experience
          </h2>
          <p className="text-sm text-neutral-400">
            Key milestones in high-scale systems architecture and engineering management.
          </p>
        </div>

        <div className="space-y-6">
          {profile?.experience?.map((exp, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-neutral-100">{exp.role}</h3>
                  <p className="text-sm text-emerald-400 font-medium">
                    {exp.company} • <span className="text-neutral-400 font-normal">{exp.location}</span>
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-neutral-800 border border-neutral-700 text-xs font-mono text-neutral-300 self-start sm:self-auto">
                  {exp.startDate} — {exp.endDate}
                </span>
              </div>

              <ul className="space-y-2 text-sm text-neutral-300">
                {exp.description.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md bg-neutral-800 border border-neutral-700/60 text-xs font-mono text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )) || (
            <div className="p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800 text-neutral-400">
              Loading experience timeline...
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
