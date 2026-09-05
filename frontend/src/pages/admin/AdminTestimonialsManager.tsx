import { useState, useEffect, FormEvent } from 'react';

import { Star, Plus, Edit2, Trash2 } from 'lucide-react';

import { api } from '../../services/api';

import { useToast } from '../../context/ToastContext';

import { TestimonialData } from '../../types';

import { Modal } from '../../components/Modal';

import { ImageUploader } from '../../components/ImageUploader';

const initialTestimonial: Partial<TestimonialData> = {
  clientName: '',
  role: '',
  company: '',
  avatar:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  quote: '',
  projectRef: '',
  rating: 5,
  featured: true,
  displayOrder: 0,
};

export function AdminTestimonialsManager() {
  const { success, error } = useToast();

  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Partial<TestimonialData>>(initialTestimonial);
  const [isSaving, setIsSaving] = useState(false);

  const fetchTestimonials = () => {
    setLoading(true);

    api
      .getTestimonials()
      .then((res) => {
        if (res.success) {
          const normalizedTestimonials = res.data.map((testimonial) => ({
            ...testimonial,

            clientName:
              testimonial.clientName ??
              (testimonial as TestimonialData & { name?: string }).name ??
              '',

            quote:
              testimonial.quote ??
              (testimonial as TestimonialData & { testimonial?: string })
                .testimonial ??
              '',

            projectRef:
              testimonial.projectRef ??
              (testimonial as TestimonialData & {
                projectRelation?: string;
              }).projectRelation ??
              '',
          }));

          setTestimonials(normalizedTestimonials);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenCreate = () => {
    setEditingTestimonial({ ...initialTestimonial });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: TestimonialData) => {
    setEditingTestimonial({ ...t });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    try {
      await api.deleteTestimonial(id);

      success('Endorsement Deleted', `Removed from MongoDB.`);

      fetchTestimonials();
    } catch (err: any) {
      error('Delete Failed', err.message);
    }
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !editingTestimonial.clientName?.trim() ||
      !editingTestimonial.quote?.trim()
    ) {
      error(
        'Validation Error',
        'Client name and quote are required.'
      );
      return;
    }

    if (!editingTestimonial.role?.trim()) {
      error('Validation Error', 'Role is required.');
      return;
    }

    if (!editingTestimonial.company?.trim()) {
      error('Validation Error', 'Company is required.');
      return;
    }

    if (!editingTestimonial.avatar?.trim()) {
      error('Validation Error', 'Client avatar is required.');
      return;
    }

    setIsSaving(true);

    try {
      const testimonialPayload = {
        ...editingTestimonial,

        // Frontend field → Backend Zod field
        name: editingTestimonial.clientName,
        testimonial: editingTestimonial.quote,
        projectRelation: editingTestimonial.projectRef,

        status: 'published' as const,
      };

      if (editingTestimonial._id) {
        await api.updateTestimonial(
          editingTestimonial._id,
          testimonialPayload
        );

        success('Endorsement Updated', 'Changes saved.');
      } else {
        await api.createTestimonial(testimonialPayload);

        success('Endorsement Created', 'Saved to MongoDB.');
      }

      setIsModalOpen(false);

      fetchTestimonials();
    } catch (err: any) {
      error(
        'Save Failed',
        err.message || 'Could not save endorsement.'
      );
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
            Client Endorsements CMS
          </h1>

          <p className="text-xs text-neutral-400 font-mono mt-0.5">
            Synchronized to MongoDB Testimonial Collection
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-neutral-950 font-bold text-xs hover:opacity-95 transition-opacity"
        >
          <Plus className="w-4 h-4" />

          <span>Add Endorsement</span>
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-16 text-center text-sm font-mono text-neutral-400">
          Loading endorsements from MongoDB...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.clientName}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-neutral-700"
                  />

                  <div>
                    <h4 className="font-bold text-sm text-neutral-100">
                      {t.clientName}
                    </h4>

                    <p className="text-xs text-neutral-400">
                      {t.role} • {t.company}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(t)}
                    className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDelete(t._id, t.clientName)}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          editingTestimonial._id
            ? 'Edit Endorsement'
            : 'Add Client Endorsement'
        }
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono font-medium text-neutral-300">
                Client Name *
              </label>

              <input
                type="text"
                required
                value={editingTestimonial.clientName || ''}
                onChange={(e) =>
                  setEditingTestimonial({
                    ...editingTestimonial,
                    clientName: e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-medium text-neutral-300">
                Role / Title *
              </label>

              <input
                type="text"
                required
                value={editingTestimonial.role || ''}
                onChange={(e) =>
                  setEditingTestimonial({
                    ...editingTestimonial,
                    role: e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono font-medium text-neutral-300">
              Company *
            </label>

            <input
              type="text"
              required
              value={editingTestimonial.company || ''}
              onChange={(e) =>
                setEditingTestimonial({
                  ...editingTestimonial,
                  company: e.target.value,
                })
              }
              className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <ImageUploader
              label="Client Avatar Photo"
              value={editingTestimonial.avatar || ''}
              onChange={(url) =>
                setEditingTestimonial({
                  ...editingTestimonial,
                  avatar: url,
                })
              }
              folder="testimonials"
              aspectRatio="avatar"
              helpText="Upload client portrait to Cloudinary CDN."
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono font-medium text-neutral-300">
              Endorsement Quote *
            </label>

            <textarea
              rows={4}
              required
              value={editingTestimonial.quote || ''}
              onChange={(e) =>
                setEditingTestimonial({
                  ...editingTestimonial,
                  quote: e.target.value,
                })
              }
              className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none resize-none"
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
              {isSaving ? 'Saving...' : 'Save Endorsement'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}