import { useState, useEffect } from 'react';
import {
  Database,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Cpu,
  Shield,
  Layers,
  Activity,
  HardDrive,
  Sparkles,
} from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { DbStatus } from '../../types';

export function AdminDatabaseDiagnostic() {
  const { success, error } = useToast();
  const [dbStatus, setDbStatus] = useState<DbStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchStatus = () => {
    setIsRefreshing(true);
    api
      .getDbStatus()
      .then((res) => {
        if (res.success && res.data) {
          setDbStatus(res.data);
          success('Diagnostic Refreshed', 'Database telemetry retrieved.');
        }
      })
      .catch((err) => {
        error('Diagnostic Failed', err.message);
      })
      .finally(() => {
        setLoading(false);
        setIsRefreshing(false);
      });
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  if (loading || !dbStatus) {
    return (
      <div className="py-20 text-center text-sm font-mono text-neutral-400 flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin" />
          <Database className="w-5 h-5 text-emerald-400 absolute inset-0 m-auto animate-pulse" />
        </div>
        <p className="tracking-wide text-neutral-300">Connecting to MongoDB Diagnostic Bridge...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-neutral-100 tracking-tight">
              MongoDB Atlas Engine Diagnostic
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-3 h-3 animate-spin" /> Live Telemetry
            </span>
          </div>
          <p className="text-xs text-neutral-400 font-mono mt-0.5">
            Real-time telemetry, Mongoose ODM state & security pipeline audit
          </p>
        </div>

        <button
          onClick={fetchStatus}
          disabled={isRefreshing}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/20"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh Telemetry</span>
        </button>
      </div>

      {/* Primary Connection Banner */}
      <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-neutral-900/60 to-neutral-900/40 p-6 sm:p-8 space-y-6 shadow-2xl shadow-emerald-950/20 transition-all duration-500 hover:border-emerald-500/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-inner relative group">
              <Database className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 rounded-2xl bg-emerald-400/10 animate-pulse pointer-events-none" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <h2 className="text-xl font-bold text-neutral-100">
                  {dbStatus?.connected ? 'MongoDB Engine: Healthy & Connected' : 'Database Disconnected'}
                </h2>
              </div>
              <p className="text-xs font-mono text-emerald-400/90 mt-0.5 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                Active Mode: {dbStatus?.mode ? dbStatus.mode.toUpperCase() : 'UNKNOWN'}
              </p>
            </div>
          </div>

          <div className="px-4 py-2 rounded-xl bg-neutral-900/90 border border-neutral-700/80 font-mono text-xs text-neutral-200 shadow-inner">
            Mongoose State: <span className="text-emerald-400 font-bold">{dbStatus?.state || 'Unknown'}</span>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-neutral-800/80">
          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-1 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-950">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Database Name</span>
            <p className="text-xs font-bold text-neutral-200 flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
              {dbStatus?.databaseName || 'N/A'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-1 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-950">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Cluster Host</span>
            <p className="text-xs font-bold text-neutral-200 truncate flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              {dbStatus?.host || 'N/A'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-1 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-950">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Engine Type</span>
            <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              {dbStatus?.mode === 'memory' ? 'In-Memory MongoDB Server' : 'MongoDB Atlas Cluster'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-1 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-950">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Sanitized URI</span>
            <p className="text-xs font-bold text-neutral-200 truncate font-mono">
              {dbStatus?.uri || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Registered Schemas & Document Totals */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400 animate-pulse" />
          <h3 className="text-base font-bold text-neutral-100">
            Registered Mongoose Schemas & Collections
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dbStatus?.collections?.map((coll, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 flex items-center justify-between transition-all duration-300 hover:border-cyan-500/30 hover:bg-neutral-950 group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform duration-300 shadow-sm shadow-emerald-400" />
                <span className="font-mono text-xs font-semibold text-neutral-200 group-hover:text-cyan-300 transition-colors">
                  {coll.name}
                </span>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-emerald-400 font-bold shadow-inner">
                {coll.count} docs
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Security Architecture Verification */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400 animate-pulse" />
          <h3 className="text-base font-bold text-neutral-100">
            Security & Data Protection Pipeline
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 flex items-start gap-3 transition-all duration-300 hover:border-emerald-500/30 hover:bg-neutral-950">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 animate-bounce" />
            <div>
              <p className="text-xs font-bold text-neutral-200">NoSQL Injection Prevention</p>
              <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                Recursive sanitization middleware automatically filters MongoDB query selector keys ($where, $gt, etc.) from all incoming request bodies.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 flex items-start gap-3 transition-all duration-300 hover:border-emerald-500/30 hover:bg-neutral-950">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 animate-bounce" />
            <div>
              <p className="text-xs font-bold text-neutral-200">Cryptographic Password Hashing</p>
              <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                All admin credentials hashed with Bcrypt (12 computational rounds). Never stored in plaintext.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 flex items-start gap-3 transition-all duration-300 hover:border-emerald-500/30 hover:bg-neutral-950">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 animate-bounce" />
            <div>
              <p className="text-xs font-bold text-neutral-200">HTTP-Only SameSite Cookie Session</p>
              <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                JWT auth tokens are locked inside HTTP-only cookies, immune to JavaScript XSS extraction.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 flex items-start gap-3 transition-all duration-300 hover:border-emerald-500/30 hover:bg-neutral-950">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 animate-bounce" />
            <div>
              <p className="text-xs font-bold text-neutral-200">IP Rate Limiting & Helmet Guard</p>
              <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                Express rate limiters protect all authentication routes from brute force attacks; Helmet strips fingerprint headers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}