import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  FolderGit2,
  BookOpen,
  Code2,
  Layers,
  Star,
  Mail,
  Settings,
  Database,
  LogOut,
  ChevronRight,
  Shield,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ThemeToggle } from '../components/ThemeToggle';
import { api } from '../services/api';

export function AdminLayout() {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/admin/login', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      api
        .getAdminStats()
        .then((res) => {
          if (res.success) {
            setUnreadCount(res.data.messages.unread);
          }
        })
        .catch(() => {});
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      await logout();
      success('Logged Out', 'You have been securely signed out.');
      navigate('/');
    } catch {
      error('Logout Failed', 'Please try again.');
    }
  };

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Profile Information', path: '/admin/profile', icon: User },
    { name: 'Projects CMS', path: '/admin/projects', icon: FolderGit2 },
    { name: 'Engineering Blog', path: '/admin/blog', icon: BookOpen },
    { name: 'Skills Arsenal', path: '/admin/skills', icon: Code2 },
    { name: 'Services & Pricing', path: '/admin/services', icon: Layers },
    { name: 'Client Testimonials', path: '/admin/testimonials', icon: Star },
    { name: 'Inquiries & Messages', path: '/admin/messages', icon: Mail, badge: unreadCount },
    { name: 'Site Settings & SEO', path: '/admin/settings', icon: Settings },
    { name: 'MongoDB Diagnostic', path: '/admin/database', icon: Database },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-neutral-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
          <p className="text-sm font-mono">Verifying administrative security token...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-neutral-100 flex flex-col md:flex-row transition-colors duration-200">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-neutral-900 border-b border-slate-200 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span className="font-bold text-sm text-slate-900 dark:text-neutral-100">Vance Admin CMS</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-neutral-700"
            aria-label="Toggle sidebar"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white/95 md:bg-white dark:bg-neutral-900/95 md:dark:bg-neutral-900 border-r border-slate-200 dark:border-neutral-800 p-5 flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          {/* Admin Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-neutral-800">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-bold text-sm text-slate-900 dark:text-neutral-100">Vance CMS</h2>
                <p className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  MongoDB Secured
                </p>
              </div>
            </Link>
          </div>

          {/* Nav List */}
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                onClick={() => setMobileSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-neutral-800 text-emerald-700 dark:text-emerald-400 font-semibold border border-emerald-200 dark:border-neutral-700/50 shadow-xs'
                      : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-neutral-200 hover:bg-slate-100 dark:hover:bg-neutral-800/40'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {item.badge && item.badge > 0 ? (
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-neutral-950 text-[10px] font-bold">
                    {item.badge}
                  </span>
                ) : null}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="pt-4 border-t border-slate-200 dark:border-neutral-800 space-y-3">
          <div className="flex items-center gap-2.5 px-2">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
              alt={user?.name || 'Admin'}
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover border border-slate-300 dark:border-neutral-700"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-800 dark:text-neutral-200 truncate">{user?.name || 'Alexander'}</p>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">{user?.role || 'ADMIN'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex-1 py-1.5 px-2.5 rounded-lg bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-700 dark:text-neutral-300 text-xs font-medium flex items-center justify-center gap-1.5 border border-slate-200 dark:border-neutral-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Desktop Top Header */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white/80 dark:bg-neutral-900/60 border-b border-slate-200 dark:border-neutral-800 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-neutral-400">
            <span>Admin</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 dark:text-neutral-200 font-semibold">Content Management System</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Express + MongoDB Active</span>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Admin Views */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
