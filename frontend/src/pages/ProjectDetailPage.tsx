import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  CheckCircle2,
  Layers,
  Server,
  Database,
  Cpu,
  Zap,
  Shield,
  Activity,
} from 'lucide-react';
import { api } from '../services/api';
import { ProjectData } from '../types';
import { ProjectCard } from '../components/ProjectCard';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [related, setRelated] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    window.scrollTo(0, 0);

    api
      .getProjectBySlug(slug)
      .then((res) => {
        if (res.success && res.data) {
          setProject(res.data);
          setRelated(res.related || []);
        } else {
          navigate('/projects', { replace: true });
        }
      })
      .catch(() => {
        navigate('/projects', { replace: true });
      })
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  if (loading || !project) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-sm font-mono text-neutral-400">Loading system architecture case study...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Case Studies</span>
        </Link>

        <span className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-emerald-400">
          {project.category}
        </span>
      </div>

      {/* Case Study Hero */}
      <div className="space-y-6">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-100 tracking-tight leading-tight">
          {project.title}
        </h1>
        <p className="text-lg text-emerald-400/90 font-mono">{project.tagline}</p>
        <p className="text-base sm:text-lg text-neutral-300 max-w-4xl leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Links & CTA Bar */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-neutral-950 font-bold text-xs hover:opacity-95 transition-opacity shadow-md"
            >
              <span>Launch Live System</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-200 font-semibold text-xs hover:bg-neutral-800 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Source Repository</span>
            </a>
          )}
        </div>
      </div>

      {/* Featured Cover Image */}
      <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl">
        <img
          src={project.featuredImage}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full max-h-[500px] object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Problem & Solution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-neutral-100">The Problem & Challenge</h2>
          <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
            {project.problem}
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-neutral-100">The Engineered Solution</h2>
          <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
            {project.solution}
          </p>
        </div>
      </div>

      {/* System Architecture Blueprint */}
      {project.architecture && (
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/50 border border-neutral-800 space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
              <Cpu className="w-3.5 h-3.5" />
              <span>System Design</span>
            </div>
            <h2 className="text-2xl font-bold text-neutral-100">Architectural Specifications</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-2">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                Frontend Architecture
              </span>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {project.architecture.frontend || 'React 19 + TypeScript + Tailwind CSS'}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-2">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block">
                Backend Services
              </span>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {project.architecture.backend || 'Node.js Express REST & Microservices'}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-2">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block">
                Data Tier
              </span>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {project.architecture.database || 'MongoDB Atlas Sharded Cluster + Mongoose'}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-2">
              <span className="text-xs font-mono text-purple-400 uppercase tracking-wider block">
                Infrastructure
              </span>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {project.architecture.infrastructure || 'Docker + Kubernetes + Cloud CDN'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Metrics Achieved */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-neutral-100">Production Metrics Achieved</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm font-semibold text-neutral-200">{metric}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Features */}
      {project.keyFeatures && project.keyFeatures.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-neutral-100">Core System Capabilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.keyFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-neutral-900/30 border border-neutral-800 flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span className="text-sm text-neutral-300 leading-relaxed">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Lightbox */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-neutral-100">Visual Artifacts & Dashboards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.galleryImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(img)}
                className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 cursor-pointer group"
              >
                <img
                  src={img}
                  alt={`Artifact ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Enlarged Artifact"
            referrerPolicy="no-referrer"
            className="max-h-[85vh] max-w-[90vw] rounded-2xl border border-neutral-700 shadow-2xl object-contain"
          />
        </div>
      )}

      {/* Related Projects */}
      {related.length > 0 && (
        <div className="pt-12 border-t border-neutral-800 space-y-8">
          <h2 className="text-2xl font-bold text-neutral-100">Related Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((rel) => (
              <ProjectCard key={rel._id} project={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
