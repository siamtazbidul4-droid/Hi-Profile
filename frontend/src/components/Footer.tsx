import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowUpRight,
  Lock,
  Database,
  Send,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { success } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    success('Subscribed!', 'Thank you for subscribing to architectural updates.');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-slate-100 dark:bg-neutral-950 border-t border-slate-200/80 dark:border-neutral-800/80 pt-16 pb-12 text-slate-600 dark:text-neutral-400 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          {/* Column 1: Brand & Philosophy */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-[1px] shadow-sm">
                <div className="w-full h-full rounded-[11px] bg-slate-900 dark:bg-neutral-950 flex items-center justify-center text-emerald-400">
                  <Code2 className="w-5 h-5" />
                </div>
              </div>
              <span className="font-bold text-slate-900 dark:text-neutral-100 text-lg tracking-tight group-hover:text-emerald-500 transition-colors">
                Tajbidul Islam
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-neutral-400 leading-relaxed max-w-sm">
              Professional Web Developer & Systems Architect. Designing resilient cloud architectures, high-concurrency Node.js microservices, and luxury React interfaces.
            </p>

            {/* Social Channels */}
            <div className="flex items-center gap-2.5 pt-2">
              {[
                { name: 'GitHub', icon: Github, url: 'https://github.com' },
                { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
                { name: 'Twitter', icon: Twitter, url: 'https://x.com' },
                { name: 'Email', icon: Mail, url: 'mailto:alexander.vance.dev@gmail.com' },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex items-center justify-center text-slate-600 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/40 transition-all duration-200 shadow-xs hover:scale-105"
                  aria-label={item.name}
                >
                  <item.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Architecture Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-neutral-200 mb-4">
              Explore
            </p>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link to="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  About & Background
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link to="/skills" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Skills Arsenal
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Services & Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & Proof */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-neutral-200 mb-4">
              Resources
            </p>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link to="/blog" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Engineering Blog
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Client Reviews
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Contact & Hire
                </Link>
              </li>
              <li>
                <a
                  href="#profile-api"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('/api/profile', '_blank');
                  }}
                  className="inline-flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <span>JSON API Feed</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Luxury Newsletter & Availability */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-neutral-200">
              Stay Informed
            </p>
            <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
              Subscribe to get monthly architectural deep dives, open-source releases, and engineering case studies.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You're all set! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-3.5 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-slate-900 dark:text-neutral-100 placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-neutral-950 font-bold text-xs hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer"
                >
                  <span>Join</span>
                  <Send className="w-3 h-3" />
                </button>
              </form>
            )}

            <div className="pt-2 flex items-center gap-3 text-[11px] font-mono text-slate-500 dark:text-neutral-400">
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Available Q3/Q4
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Database className="w-3 h-3 text-cyan-500" />
                MongoDB Atlas
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-neutral-400">
          <p>© {currentYear} Alexander Vance. Crafted with React 19, TypeScript & Tailwind.</p>

          <div className="flex items-center gap-6">
            <span className="text-[11px] font-mono">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300 shadow-xs">Ctrl+Shift+A</kbd> for CMS
            </span>

            <Link
              to="/admin"
              className="hover:text-slate-900 dark:hover:text-neutral-200 transition-colors flex items-center gap-1 text-[11px]"
              title="Private Administrative Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

