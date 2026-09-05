import { useState, useEffect, FormEvent } from 'react';
import { Save, User, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { ProfileData } from '../../types';
import { ImageUploader } from '../../components/ImageUploader';

export function AdminProfileManager() {
  const { success, error } = useToast();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    api
      .getProfile()
      .then((res) => {
        if (res.success && res.data) setProfile(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setIsSaving(true);
    try {
      const res = await api.updateProfile(profile);
      if (res.success) {
        setProfile(res.data);
        success('Profile Updated', 'Your developer profile data was saved to MongoDB.');
      }
    } catch (err: any) {
      error('Save Failed', err.message || 'Unable to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddStat = () => {
    if (!profile) return;
    setProfile({
      ...profile,
      statistics: [...(profile.statistics || []), { label: 'New Metric', value: '100%' }],
    });
  };

  const handleRemoveStat = (idx: number) => {
    if (!profile) return;
    const updated = [...profile.statistics];
    updated.splice(idx, 1);
    setProfile({ ...profile, statistics: updated });
  };

  if (loading || !profile) {
    return (
      <div className="py-16 text-center text-sm font-mono text-neutral-400">
        Loading profile configuration from database...
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 pb-12">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h1 className="text-2xl font-extrabold text-neutral-100 tracking-tight">
            Profile Information CMS
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-0.5">
            Synchronized directly to MongoDB Profile collection
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
              <span>Save Profile Changes</span>
            </>
          )}
        </button>
      </div>

      {/* Main Details */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-8 space-y-6">
        <h2 className="text-base font-bold text-neutral-100">Primary Developer Information</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-neutral-300">Full Name</label>
            <input
              type="text"
              required
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-neutral-300">Professional Title</label>
            <input
              type="text"
              required
              value={profile.professionalTitle}
              onChange={(e) => setProfile({ ...profile, professionalTitle: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-neutral-300">Tagline / Mission</label>
            <input
              type="text"
              required
              value={profile.tagline}
              onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-neutral-300">Location & Timezone</label>
            <input
              type="text"
              required
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-neutral-300">Availability Status</label>
            <input
              type="text"
              required
              value={profile.availability}
              onChange={(e) => setProfile({ ...profile, availability: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-neutral-300">Years of Experience</label>
            <input
              type="number"
              required
              value={profile.yearsOfExperience}
              onChange={(e) => setProfile({ ...profile, yearsOfExperience: Number(e.target.value) })}
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <ImageUploader
              label="Primary Developer Profile Avatar / Portrait"
              value={profile.profileImage || ''}
              onChange={(url) => setProfile({ ...profile, profileImage: url })}
              folder="profile"
              aspectRatio="avatar"
              required
              helpText="Uploaded to Cloudinary CDN portfolio/profile folder."
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-mono font-medium text-neutral-300">Public Contact Email</label>
            <input
              type="email"
              required
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Biography */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-medium text-neutral-300">Detailed Biography</label>
          <textarea
            rows={4}
            required
            value={profile.biography}
            onChange={(e) => setProfile({ ...profile, biography: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none resize-none leading-relaxed"
          />
        </div>
      </div>

      {/* Hero Statistics */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-neutral-100">Hero Highlights & Metrics</h2>
          <button
            type="button"
            onClick={handleAddStat}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-emerald-400 text-xs font-semibold"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Statistic</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {profile.statistics?.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2 relative group"
            >
              <button
                type="button"
                onClick={() => handleRemoveStat(idx)}
                className="absolute top-2 right-2 text-neutral-500 hover:text-rose-400 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              <input
                type="text"
                value={stat.value}
                onChange={(e) => {
                  const updated = [...profile.statistics];
                  updated[idx].value = e.target.value;
                  setProfile({ ...profile, statistics: updated });
                }}
                placeholder="Value (e.g. 50K+ RPS)"
                className="w-full font-bold text-sm bg-transparent border-b border-neutral-800 focus:border-emerald-500 focus:outline-none pb-1"
              />

              <input
                type="text"
                value={stat.label}
                onChange={(e) => {
                  const updated = [...profile.statistics];
                  updated[idx].label = e.target.value;
                  setProfile({ ...profile, statistics: updated });
                }}
                placeholder="Label"
                className="w-full text-xs text-neutral-400 bg-transparent border-b border-neutral-800 focus:border-emerald-500 focus:outline-none pb-1"
              />
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
