import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Terminal, Shield, ArrowRight, Sparkles, Code2 } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut listener for hidden admin portal: Ctrl+Shift+A or Cmd+Shift+A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        navigate('/admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Services', path: '/services' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3.5'
          : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`rounded-2xl transition-all duration-500 px-4 sm:px-6 py-3 flex items-center justify-between ${
            isScrolled
              ? 'bg-white/80 dark:bg-neutral-950/80 backdrop-blur-2xl border border-slate-200/80 dark:border-neutral-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)]'
              : 'bg-white/40 dark:bg-neutral-900/30 backdrop-blur-md border border-slate-200/50 dark:border-neutral-800/40'
          }`}
        >
          {/* Developer Brand Identity */}
          <Link
            to="/"
            className="group flex items-center gap-3 focus:outline-none"
            title="Alexander Vance — Professional Web Developer"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 p-[1px] shadow-sm group-hover:shadow-emerald-500/20 transition-all duration-300">
                <div className="w-full h-full rounded-[11px] bg-slate-900 dark:bg-neutral-950 flex items-center justify-center text-emerald-400 group-hover:scale-95 transition-transform duration-300">
                  <Code2 className="w-5 h-5" />
                </div>
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-neutral-950 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-neutral-100 tracking-tight text-base group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                  Tajbidul Islam
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 tracking-wider uppercase flex items-center gap-1">
                <span>Web Developer</span>
                <span className="text-emerald-500">•</span>
                <span className="text-emerald-600 dark:text-emerald-400">Available</span>
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-slate-100/80 dark:bg-neutral-900/80 border border-slate-200/80 dark:border-neutral-800/80 backdrop-blur-md">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'bg-white dark:bg-neutral-800 text-emerald-600 dark:text-emerald-400 font-bold shadow-xs border border-slate-200/60 dark:border-neutral-700/60'
                      : 'text-slate-600 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-neutral-100 hover:bg-slate-200/50 dark:hover:bg-neutral-800/50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right CTA + Theme Toggle */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />

            {isAuthenticated ? (
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors shadow-xs"
                title={`Admin Portal (${user?.role})`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin CMS</span>
              </Link>
            ) : null}

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-neutral-950 font-bold text-xs tracking-wide hover:shadow-lg hover:shadow-emerald-500/25 hover:opacity-95 transition-all duration-300 active:scale-95"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-neutral-100 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-w-7xl mx-auto px-4 mt-2">
          <div className="rounded-2xl bg-white/95 dark:bg-neutral-950/95 backdrop-blur-2xl border border-slate-200/90 dark:border-neutral-800/90 p-5 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-1.5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-emerald-50 dark:bg-neutral-800 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-neutral-700'
                        : 'text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-900 hover:text-slate-900 dark:hover:text-neutral-100'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-3 h-3 opacity-40" />
                </NavLink>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-neutral-800 flex flex-col gap-2.5">
              <Link
                to="/contact"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-neutral-950 font-bold text-center text-xs shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                <span>Hire / Start a Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {isAuthenticated ? (
                <Link
                  to="/admin"
                  className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-medium text-center text-xs flex items-center justify-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  <span>Open Admin Portal</span>
                </Link>
              ) : (
                <Link
                  to="/admin/login"
                  className="text-slate-400 dark:text-neutral-500 text-[11px] text-center hover:text-slate-600 dark:hover:text-neutral-400 transition-colors pt-1"
                >
                  Admin Secure Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

