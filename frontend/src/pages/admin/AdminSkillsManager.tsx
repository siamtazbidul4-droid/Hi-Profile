import { useState, useEffect, FormEvent } from 'react';
import { Code2, Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { SkillData, SkillCategory } from '../../types';
import { Modal } from '../../components/Modal';

const initialSkill: Partial<SkillData> = {
  name: '',
  category: 'Frontend',
  proficiency: 90,
  icon: 'Code',
  experienceYears: 5,
  highlightText: '',
  displayOrder: 0,
  status: 'active',
};

export function AdminSkillsManager() {
  const { success, error } = useToast();
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Partial<SkillData>>(initialSkill);
  const [isSaving, setIsSaving] = useState(false);

  const fetchSkills = () => {
    setLoading(true);
    api
      .getSkills({ includeInactive: true })
      .then((res) => {
        if (res.success) setSkills(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleOpenCreate = () => {
    setEditingSkill({ ...initialSkill });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (skill: SkillData) => {
    setEditingSkill({ ...skill });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    try {
      await api.deleteSkill(id);
      success('Skill Deleted', `"${name}" removed from MongoDB.`);
      fetchSkills();
    } catch (err: any) {
      error('Delete Failed', err.message);
    }
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingSkill.name) {
      error('Validation Error', 'Skill name is required.');
      return;
    }

    setIsSaving(true);
    try {
      if (editingSkill._id) {
        await api.updateSkill(editingSkill._id, editingSkill);
        success('Skill Updated', `"${editingSkill.name}" updated.`);
      } else {
        await api.createSkill(editingSkill);
        success('Skill Created', `"${editingSkill.name}" added to MongoDB.`);
      }
      setIsModalOpen(false);
      fetchSkills();
    } catch (err: any) {
      error('Save Failed', err.message || 'Could not save skill.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h1 className="text-2xl font-extrabold text-neutral-100 tracking-tight">
            Skills Arsenal CMS
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-0.5">
            Synchronized to MongoDB Skill Collection
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-neutral-950 font-bold text-xs hover:opacity-95 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Competency</span>
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-16 text-center text-sm font-mono text-neutral-400">
          Loading competencies from MongoDB...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800 flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-neutral-100 truncate">{skill.name}</h4>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-emerald-400">
                    {skill.proficiency}%
                  </span>
                </div>
                <p className="text-xs text-neutral-400">{skill.category} • {skill.experienceYears || 3}+ yrs</p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleOpenEdit(skill)}
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(skill._id, skill.name)}
                  className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSkill._id ? 'Edit Skill Competency' : 'Add Skill Competency'}
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-mono font-medium text-neutral-300">Skill Name *</label>
            <input
              type="text"
              required
              value={editingSkill.name}
              onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
              placeholder="e.g. MongoDB Atlas / Mongoose"
              className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono font-medium text-neutral-300">Category *</label>
              <select
                value={editingSkill.category}
                onChange={(e) =>
                  setEditingSkill({ ...editingSkill, category: e.target.value as SkillCategory })
                }
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Database">Database</option>
                <option value="DevOps">DevOps</option>
                <option value="Tools">Tools</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-medium text-neutral-300">Years Experience</label>
              <input
                type="number"
                value={editingSkill.experienceYears || 5}
                onChange={(e) =>
                  setEditingSkill({ ...editingSkill, experienceYears: Number(e.target.value) })
                }
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono text-neutral-300">
              <span>Proficiency Level</span>
              <span className="text-emerald-400 font-bold">{editingSkill.proficiency}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={editingSkill.proficiency}
              onChange={(e) => setEditingSkill({ ...editingSkill, proficiency: Number(e.target.value) })}
              className="w-full accent-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono font-medium text-neutral-300">Highlight Description</label>
            <input
              type="text"
              value={editingSkill.highlightText || ''}
              onChange={(e) => setEditingSkill({ ...editingSkill, highlightText: e.target.value })}
              placeholder="e.g. Sharded cluster modeling, change streams, index profiling"
              className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-emerald-500 text-neutral-950 text-xs font-bold"
            >
              {isSaving ? 'Saving...' : 'Save Skill'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
