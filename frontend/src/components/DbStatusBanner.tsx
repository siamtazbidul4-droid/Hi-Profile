import { useEffect, useState } from 'react';
import { Database, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';
import { DatabaseStatus } from '../types';
import { api } from '../services/api';

export function DbStatusBanner() {
  const [status, setStatus] = useState<DatabaseStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getDbStatus()
      .then((res) => {
        if (res.success) setStatus(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading || !status) return null;

  return (
    <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
          <Database className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-100">
              MongoDB Engine Status:
            </span>
            <span className="inline-flex items-center gap-1 text-emerald-400 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {status.mode === 'atlas' ? 'MongoDB Atlas Cluster Connected' : 'In-Process MongoDB Engine Active'}
            </span>
          </div>
          <p className="text-[11px] font-mono text-neutral-400 mt-0.5">
            Database: <span className="text-neutral-200">{status.dbName}</span> • Models: <span className="text-neutral-200">{status.modelsRegistered.length} registered</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto">
        <span className="px-2.5 py-1 rounded-md bg-neutral-800 border border-neutral-700 text-neutral-300 font-mono text-[11px]">
          Mongoose v8.x / v9.x
        </span>
      </div>
    </div>
  );
}
