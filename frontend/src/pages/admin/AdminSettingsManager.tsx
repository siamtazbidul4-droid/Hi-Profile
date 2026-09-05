import { useState, useEffect, FormEvent } from 'react';
import { Settings, Save, Globe, Shield, RefreshCw } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { SiteSettingsData } from '../../types';

export function AdminSettingsManager() {
  const { success, error } = useToast();
  const [settings, setSettings] = useState<SiteSettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    api
      .getSettings()
      .then((res) => {
        if (res.success && res.data) setSettings(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setIsSaving(true);
    try {
      const res = await api.updateSettings(settings);
      if (res.success) {
        setSettings(res.data);
        success('Settings Saved', 'Site configuration updated in MongoDB.');
      }
    } catch (err: any) {
      error('Save Failed', err.message || 'Could not update settings.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="py-16 text-center text-sm font-mono text-neutral-400">
        Loading site configuration from MongoDB...
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h1 className="text-2xl font-extrabold text-neutral-100 tracking-tight">
            Site Configuration & SEO Settings
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-0.5">
            Synchronized to MongoDB SiteSettings Collection
          </p>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-neutral-950 font-bold text-xs hover:opacity-95 transition-opacity disabled:opacity-50"
        >
          {isSaving ? (
            <div className="w-4 h-4 rounded-full border-2 border-neutral-950 border-t-transparent animate-spin" />
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </>
          )}
        </button>
      </div>

      {/* SEO & Meta */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-8 space-y-6">
        <h2 className="text-base font-bold text-neutral-100">Global Metadata & SEO</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-mono font-medium text-neutral-300">Site Title Tag</label>
            <input
              type="text"
              required
              value={settings.siteTitle}
              onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-mono font-medium text-neutral-300">Meta Description</label>
            <textarea
              rows={3}
              required
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-neutral-300">Contact Email</label>
            <input
              type="email"
              required
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-neutral-300">Availability Headline</label>
            <input
              type="text"
              required
              value={settings.availabilityBannerText}
              onChange={(e) => setSettings({ ...settings, availabilityBannerText: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-2 text-xs font-medium text-neutral-300 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.isAvailableForHire}
              onChange={(e) => setSettings({ ...settings, isAvailableForHire: e.target.checked })}
              className="rounded text-emerald-500 bg-neutral-950 border-neutral-800 focus:ring-0"
            />
            <span>Broadcast Availability ("Open for New Engagements" live indicator)</span>
          </label>
        </div>
      </div>

      {/* Social Links */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-8 space-y-6">
        <h2 className="text-base font-bold text-neutral-100">Social Media & Repository Links</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-neutral-300">GitHub Profile URL</label>
            <input
              type="text"
              value={settings.socialLinks?.github || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, github: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-neutral-300">LinkedIn Profile URL</label>
            <input
              type="text"
              value={settings.socialLinks?.linkedin || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-neutral-300">Twitter / X URL</label>
            <input
              type="text"
              value={settings.socialLinks?.twitter || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, twitter: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-neutral-300">Substack / Medium URL</label>
            <input
              type="text"
              value={settings.socialLinks?.medium || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, medium: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
