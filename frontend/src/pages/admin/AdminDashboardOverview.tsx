import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  BookOpen,
  Code2,
  Layers,
  Star,
  Mail,
  Database,
  ArrowUpRight,
  Plus,
  CheckCircle2,
  Clock,
  Shield,
  Activity,
} from 'lucide-react';
import { api } from '../../services/api';
import { AdminStats } from '../../types';
import { DbStatusBanner } from '../../components/DbStatusBanner';

export function AdminDashboardOverview() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = () => {
    setLoading(true);
    api
      .getAdminStats()
      .then((res) => {
        if (res.success) setStats(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading || !stats) {
    return (
      <div className="py-16 text-center text-sm font-mono text-neutral-400">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin mx-auto mb-3" />
        <p>Loading administrative dashboard metrics...</p>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Projects',
      count: stats.projects.total,
      sub: `${stats.projects.published} Published`,
      icon: FolderGit2,
      link: '/admin/projects',
      color: 'text-emerald-400',
    },
    {
      title: 'Blog Articles',
      count: stats.blog.total,
      sub: `${stats.blog.published} Published`,
      icon: BookOpen,
      link: '/admin/blog',
      color: 'text-cyan-400',
    },
    {
      title: 'Skills Matrix',
      count: stats.skills.total,
      sub: `${stats.skills.active} Active`,
      icon: Code2,
      link: '/admin/skills',
      color: 'text-amber-400',
    },
    {
      title: 'Services & Tiers',
      count: stats.services.total,
      sub: `${stats.services.published} Active`,
      icon: Layers,
      link: '/admin/services',
      color: 'text-purple-400',
    },
    {
      title: 'Testimonials',
      count: stats.testimonials.total,
      sub: `Verified Leaders`,
      icon: Star,
      link: '/admin/testimonials',
      color: 'text-pink-400',
    },
    {
      title: 'Inquiries',
      count: stats.messages.total,
      sub: `${stats.messages.unread} Unread`,
      icon: Mail,
      link: '/admin/messages',
      color: stats.messages.unread > 0 ? 'text-rose-400' : 'text-neutral-400',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-neutral-100 tracking-tight">
            Administrative Command Center
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Mongoose ODM • JWT Authentication • Full-Stack CRUD Engine
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/projects"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 text-neutral-950 font-bold text-xs hover:opacity-95 transition-opacity"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Case Study</span>
          </Link>
          <Link
            to="/admin/blog"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Article</span>
          </Link>
        </div>
      </div>

      {/* Live MongoDB Status Banner */}
      <DbStatusBanner />

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((card, idx) => (
          <Link
            key={idx}
            to={card.link}
            className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between gap-2 group"
          >
            <div className="flex items-center justify-between">
              <card.icon className={`w-4 h-4 ${card.color}`} />
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300 transition-colors" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-neutral-100 tracking-tight">
                {card.count}
              </p>
              <p className="text-xs font-semibold text-neutral-300 mt-0.5">{card.title}</p>
              <p className="text-[10px] font-mono text-neutral-400">{card.sub}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Inquiries & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Inquiries */}
        <div className="lg:col-span-7 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400" />
              <h2 className="font-bold text-sm text-neutral-100">Latest Client Inquiries</h2>
            </div>
            <Link
              to="/admin/messages"
              className="text-xs font-mono text-emerald-400 hover:underline"
            >
              View All ({stats.messages.total})
            </Link>
          </div>

          {stats.latestMessages && stats.latestMessages.length > 0 ? (
            <div className="space-y-3">
              {stats.latestMessages.map((msg) => (
                <Link
                  key={msg._id}
                  to="/admin/messages"
                  className={`block p-3.5 rounded-xl border transition-all ${
                    msg.isRead
                      ? 'bg-neutral-950/60 border-neutral-800/80 text-neutral-400'
                      : 'bg-neutral-900 border-emerald-500/30 text-neutral-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-neutral-200">{msg.name}</span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 font-medium truncate">{msg.subject || 'General Inquiry'}</p>
                  <p className="text-[11px] text-neutral-400 truncate mt-0.5">{msg.message}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-xs text-neutral-400">No client inquiries received yet.</p>
          )}
        </div>

        {/* Quick Management Shortcuts */}
        <div className="lg:col-span-5 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
            <Activity className="w-4 h-4 text-cyan-400" />
            <h2 className="font-bold text-sm text-neutral-100">Direct Actions</h2>
          </div>

          <div className="space-y-2.5">
            <Link
              to="/admin/profile"
              className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 flex items-center justify-between text-xs text-neutral-200 transition-colors"
            >
              <span>Edit Biography, Title & Metrics</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </Link>

            <Link
              to="/admin/projects"
              className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 flex items-center justify-between text-xs text-neutral-200 transition-colors"
            >
              <span>Manage Architectural Case Studies</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </Link>

            <Link
              to="/admin/skills"
              className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 flex items-center justify-between text-xs text-neutral-200 transition-colors"
            >
              <span>Add / Re-order Tech Arsenal</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </Link>

            <Link
              to="/admin/database"
              className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 flex items-center justify-between text-xs text-neutral-200 transition-colors"
            >
              <span>Inspect MongoDB Driver & Schemas</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
