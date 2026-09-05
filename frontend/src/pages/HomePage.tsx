import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Terminal,
  Shield,
  Layers,
  Cpu,
  Database,
  Server,
  Zap,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Activity,
  Code2,
  Smartphone,
  Globe,
  Award,
} from 'lucide-react';
import { ProjectCard } from '../components/ProjectCard';
import { ServiceCard } from '../components/ServiceCard';
import { SkillBadge } from '../components/SkillBadge';
import { TestimonialCard } from '../components/TestimonialCard';
import { BlogCard } from '../components/BlogCard';
import { ProjectCardSkeleton } from '../components/Skeleton';
import { api } from '../services/api';
import { ProfileData, ProjectData, ServiceData, SkillData, TestimonialData, BlogPostData } from '../types';

export function HomePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [services, setServices] = useState<ServiceData[]>([]);
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>('All');

  useEffect(() => {
    async function loadData() {
      try {
        const [profRes, projRes, servRes, skillRes, testRes, blogRes] = await Promise.all([
          api.getProfile().catch(() => ({ success: false, data: null })),
          api.getProjects({ featured: true }).catch(() => ({ success: false, data: [] })),
          api.getServices().catch(() => ({ success: false, data: [] })),
          api.getSkills().catch(() => ({ success: false, data: [] })),
          api.getTestimonials({ featured: true }).catch(() => ({ success: false, data: [] })),
          api.getBlogPosts({ limit: 3 }).catch(() => ({ success: false, data: [] })),
        ]);

        if (profRes.success && profRes.data) setProfile(profRes.data);
        if (projRes.success) setProjects(projRes.data);
        if (servRes.success) setServices(servRes.data);
        if (skillRes.success) setSkills(skillRes.data);
        if (testRes.success) setTestimonials(testRes.data);
        if (blogRes.success) setBlogPosts(blogRes.data);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredSkills =
    activeSkillCategory === 'All'
      ? skills.slice(0, 8)
      : skills.filter((s) => s.category === activeSkillCategory);

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-hidden">
      {/* 1. HERO SECTION REDESIGN */}
      <section className="relative pt-8 sm:pt-16 pb-12 overflow-hidden">
        {/* Animated Background Glowing Orbs */}
        <div className="absolute top-10 left-1/4 -translate-x-1/2 w-[500px] h-[400px] bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-transparent blur-3xl -z-10 pointer-events-none rounded-full animate-pulse-glow" />
        <div className="absolute top-20 right-1/4 translate-x-1/2 w-[450px] h-[350px] bg-gradient-to-bl from-cyan-500/15 via-emerald-500/10 to-transparent blur-3xl -z-10 pointer-events-none rounded-full animate-pulse-glow" style={{ animationDelay: '2.5s' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-7">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 dark:bg-neutral-900/90 border border-slate-200 dark:border-neutral-800 backdrop-blur-md shadow-xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-mono font-medium text-slate-700 dark:text-neutral-300">
                  {profile?.availability || 'Available for Full-Stack & Modern Web Projects'}
                </span>
              </div>

              {/* Main Heading as requested */}
              <div className="space-y-2">
                <p className="text-sm font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>Full-Stack Engineering & Clean Architecture</span>
                </p>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-neutral-100 leading-[1.08]">
                  I am a{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400">
                    Professional Web Developer
                  </span>
                </h1>
              </div>

              {/* Tagline & Bio */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
                {profile?.biography ||
                  'Building high-performance web applications, resilient backend architectures, and delightful interactive experiences crafted with React 19, TypeScript, Node.js, and MongoDB.'}
              </p>

              {/* CTA Group */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-neutral-950 font-bold text-sm hover:shadow-lg hover:shadow-emerald-500/25 hover:opacity-95 transition-all duration-300 active:scale-95"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-neutral-900 hover:bg-slate-100 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-slate-800 dark:text-neutral-200 font-semibold text-sm transition-all shadow-xs"
                >
                  <span>Let’s Work Together</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 dark:text-neutral-400" />
                </Link>

                <a
                  href="#profile-json"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('/api/profile', '_blank');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-3 rounded-xl text-slate-500 hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-400 text-xs font-mono transition-colors"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>API Schema</span>
                </a>
              </div>

              {/* Quick Tech Badges */}
              <div className="pt-3 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-600 dark:text-neutral-400">
                <span className="text-slate-400 dark:text-neutral-500">Core Stack:</span>
                {['React 19', 'TypeScript', 'Node.js', 'MongoDB Atlas', 'Tailwind CSS', 'Cloudinary'].map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-[11px] text-slate-700 dark:text-neutral-300 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Visual: Glowing Glassmorphic Portrait & Floating Elements */}
            <div className="lg:col-span-5 relative flex justify-center">
              {/* Floating Element 1: Top Right Experience Pill */}
              <div className="absolute -top-4 -right-2 sm:-right-4 z-20 px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-slate-200 dark:border-neutral-700/80 shadow-xl flex items-center gap-3 animate-float-slow">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-neutral-100">100% Quality</p>
                  <p className="text-[10px] font-mono text-slate-500 dark:text-neutral-400">Clean Code Standard</p>
                </div>
              </div>

              {/* Floating Element 2: Bottom Left Cloudinary & Stack Pill */}
              <div className="absolute -bottom-5 -left-2 sm:-left-6 z-20 px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-slate-200 dark:border-neutral-700/80 shadow-xl flex items-center gap-3 animate-float-slow" style={{ animationDelay: '3s' }}>
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-neutral-100">Full-Stack CDN</p>
                  <p className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">Cloudinary Powered</p>
                </div>
              </div>

              {/* Main Avatar Card Frame */}
              <div className="relative group w-full max-w-sm">
                {/* Glowing Outline Background */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-40 group-hover:opacity-75 blur-xl transition-all duration-500" />

                <div className="relative rounded-3xl bg-white/80 dark:bg-neutral-900/90 border border-slate-200/80 dark:border-neutral-800 p-5 backdrop-blur-2xl shadow-2xl space-y-5">
                  {/* Portrait Image with Glass Overlay */}
                  <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800">
                    <img
                      src={
                        profile?.profileImage ||
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
                      }
                      alt={profile?.name || 'Alexander Vance'}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                      <div>
                        <h3 className="font-bold text-base tracking-tight">{profile?.name || 'Alexander Vance'}</h3>
                        <p className="text-xs font-mono text-emerald-400">{profile?.professionalTitle || 'Professional Web Developer'}</p>
                      </div>
                      <span className="px-2 py-1 rounded-md bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-mono text-emerald-300 font-bold backdrop-blur-md">
                        PRO DEV
                      </span>
                    </div>
                  </div>

                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {profile?.statistics?.slice(0, 2).map((stat, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-950/60 border border-slate-200/60 dark:border-neutral-800/80 text-center"
                      >
                        <p className="text-lg font-black text-slate-900 dark:text-neutral-100 tracking-tight">
                          {stat.value}
                        </p>
                        <p className="text-[10px] font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
                          {stat.label}
                        </p>
                      </div>
                    )) || (
                      <>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-950/60 border border-slate-200/60 dark:border-neutral-800/80 text-center">
                          <p className="text-lg font-black text-slate-900 dark:text-neutral-100">10+ Yrs</p>
                          <p className="text-[10px] font-mono text-slate-500 dark:text-neutral-400">Experience</p>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-950/60 border border-slate-200/60 dark:border-neutral-800/80 text-center">
                          <p className="text-lg font-black text-slate-900 dark:text-neutral-100">100+ Apps</p>
                          <p className="text-[10px] font-mono text-slate-500 dark:text-neutral-400">Delivered</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ARCHITECTURAL METRICS BAR */}
      <section className="border-y border-slate-200 dark:border-neutral-800/80 bg-slate-100/60 dark:bg-neutral-900/30 py-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold">
                <Activity className="w-4 h-4" />
                <span>Peak Concurrency</span>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-neutral-100">50K+ RPS</p>
              <p className="text-xs text-slate-500 dark:text-neutral-400">Sustained with sub-30ms p99 latency</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-semibold">
                <Database className="w-4 h-4" />
                <span>Data Volume</span>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-neutral-100">12TB+ Managed</p>
              <p className="text-xs text-slate-500 dark:text-neutral-400">Zero-downtime MongoDB sharded clusters</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-mono text-xs font-semibold">
                <Shield className="w-4 h-4" />
                <span>Security Compliance</span>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-neutral-100">SOC-2 & GDPR</p>
              <p className="text-xs text-slate-500 dark:text-neutral-400">HTTP-only JWT & strict NoSQL hygiene</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-mono text-xs font-semibold">
                <Zap className="w-4 h-4" />
                <span>Client Retention</span>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-neutral-100">100% On-Time</p>
              <p className="text-xs text-slate-500 dark:text-neutral-400">Production delivery track record</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CASE STUDIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2 font-bold">
              <Cpu className="w-3.5 h-3.5" />
              <span>Architectural Case Studies</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-neutral-100 tracking-tight">
              Featured Engineering Deployments
            </h2>
            <p className="text-sm text-slate-600 dark:text-neutral-400 mt-2 max-w-xl">
              Production systems designed for fault tolerance, security, and exceptional user experiences.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-neutral-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 text-center text-slate-500 dark:text-neutral-400">
            No featured projects available right now.
          </div>
        )}
      </section>

      {/* 4. CORE SERVICES & ADVISORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold">
            <Layers className="w-3.5 h-3.5" />
            <span>Consulting & Development</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-neutral-100 tracking-tight">
            Professional Web Development Services
          </h2>
          <p className="text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
            High-impact web development, full-stack architecture, API design, and cloud database optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.slice(0, 4).map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE TECHNICAL ARSENAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2 font-bold">
              <Server className="w-3.5 h-3.5" />
              <span>Skills Matrix</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-neutral-100 tracking-tight">
              Technical Arsenal & Disciplines
            </h2>
            <p className="text-sm text-slate-600 dark:text-neutral-400 mt-2 max-w-xl">
              Modern tools and frameworks utilized across responsive interfaces and cloud backends.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
            {['All', 'Frontend', 'Backend', 'Database', 'DevOps'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveSkillCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeSkillCategory === cat
                    ? 'bg-white dark:bg-neutral-800 text-emerald-600 dark:text-emerald-400 font-bold shadow-xs'
                    : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => (
            <SkillBadge key={skill._id} skill={skill} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/skills"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-neutral-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <span>View Complete Skills Matrix ({skills.length} Total Competencies)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 6. CLIENT ENDORSEMENTS */}
      {testimonials.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Proven Impact</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-neutral-100 tracking-tight">
              Client & Executive Endorsements
            </h2>
            <p className="text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
              Feedback from product owners and founders on engineering speed and code reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((test) => (
              <TestimonialCard key={test._id} testimonial={test} />
            ))}
          </div>
        </section>
      )}

      {/* 7. LATEST ARTICLES */}
      {blogPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Engineering Insights</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-neutral-100 tracking-tight">
                Latest Publications & Deep Dives
              </h2>
              <p className="text-sm text-slate-600 dark:text-neutral-400 mt-2 max-w-xl">
                Essays on React performance, scalable backend architectures, and database tuning.
              </p>
            </div>

            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-neutral-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* 8. ENGAGEMENT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-neutral-800 bg-gradient-to-b from-white to-slate-100 dark:from-neutral-900/90 dark:to-neutral-950 p-8 sm:p-12 lg:p-16 text-center space-y-6 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Open for New Projects & Contracts</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-neutral-100 tracking-tight max-w-2xl mx-auto leading-tight">
            Ready to build your next web application?
          </h2>

          <p className="text-slate-600 dark:text-neutral-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Whether you need a high-impact full-stack application, an intuitive dashboard, or performance optimization, let’s bring your vision to life.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-neutral-950 font-bold text-sm tracking-wide hover:opacity-95 transition-opacity shadow-lg shadow-emerald-500/20"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 text-slate-800 dark:text-neutral-200 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors shadow-xs"
            >
              <span>Browse Portfolio</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

