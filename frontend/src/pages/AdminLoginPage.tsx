import React, { useState, useEffect, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, CheckCircle2, ArrowLeft, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ThemeToggle } from '../components/ThemeToggle';

export function AdminLoginPage() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleAutofill = () => {
    setEmail('siamtazbidul4@gmail.com');
    setPassword('Siam12345');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      error('Credentials Required', 'Please enter your administrator email and password.');
      return;
    }

    setIsLoggingIn(true);
    try {
      await login(email, password);
      success('Authentication Granted', 'Welcome to Vance Content Management System.');
      navigate('/admin');
    } catch (err: any) {
      error('Authentication Denied', err.message || 'Invalid administrative credentials.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-neutral-100 flex flex-col items-center justify-center p-4 selection:bg-emerald-500/20 selection:text-emerald-700 dark:selection:text-emerald-300 transition-colors duration-200 relative">
      {/* Top right Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      {/* Background glow */}
      <div className="absolute w-[500px] h-[300px] bg-gradient-to-tr from-emerald-500/10 via-cyan-500/5 to-transparent blur-3xl -z-10 pointer-events-none rounded-full" />

      <div className="max-w-md w-full space-y-8">
        {/* Top brand */}
        <div className="text-center space-y-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Live Portfolio</span>
          </Link>

          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
            <Shield className="w-6 h-6" />
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-neutral-100 tracking-tight">
            Administrative Access
          </h1>
          <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono">
            JWT Token + Secure HTTP-Only Session
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/80 p-8 shadow-xl dark:shadow-2xl backdrop-blur-xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-slate-700 dark:text-neutral-300">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-neutral-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alexander.vance.dev@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-neutral-100 placeholder-slate-400 dark:placeholder-neutral-600 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-slate-700 dark:text-neutral-300">
                Security Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-neutral-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-neutral-100 placeholder-slate-400 dark:placeholder-neutral-600 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-neutral-950 font-bold text-xs hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 disabled:opacity-50 cursor-pointer"
            >
              {isLoggingIn ? (
                <div className="w-4 h-4 rounded-full border-2 border-neutral-950 border-t-transparent animate-spin" />
              ) : (
                <>
                  <span>Authenticate Session</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Autofill Button for Reviewers */}
          <div className="pt-4 border-t border-slate-200 dark:border-neutral-800/80">
            <button
              type="button"
              onClick={handleAutofill}
              className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-neutral-800/80 hover:bg-slate-200 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-700/60 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Autofill Seed Admin Credentials</span>
            </button>
          </div>
        </div>

        {/* Security Footer */}
        <p className="text-[11px] text-center text-slate-500 dark:text-neutral-400 font-mono">
          Protected by Bcrypt 12-rounds hash & rate-limited Express router.
        </p>
      </div>
    </div>
  );
}
