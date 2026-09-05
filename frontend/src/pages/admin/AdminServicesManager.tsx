import { useState, useEffect, FormEvent } from 'react';
import { Layers, Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { ServiceData } from '../../types';
import { Modal } from '../../components/Modal';
import { ImageUploader } from '../../components/ImageUploader';

const initialService: Partial<ServiceData> = {
  title: '',
  subtitle: '',
  description: '',
  icon: 'Layers',
  features: ['Microservices architecture', 'Zero-downtime MongoDB cluster', 'Real-time telemetry'],
  deliverables: ['System blueprint', 'Source code', 'Deployment scripts'],
  idealFor: 'Startups scaling beyond single-node bottlenecks',
  priceRange: '$25,000 – $50,000',
  timeline: '4 – 8 Weeks',
  displayOrder: 0,
  status: 'published',
};

export function AdminServicesManager() {
  const { success, error } = useToast();
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Partial<ServiceData>>(initialService);
  const [isSaving, setIsSaving] = useState(false);
  const [featuresInput, setFeaturesInput] = useState('');

  const fetchServices = () => {
    setLoading(true);
    api
      .getServices({ includeDrafts: true })
      .then((res) => {
        if (res.success) setServices(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenCreate = () => {
    setEditingService({ ...initialService });
    setFeaturesInput(initialService.features?.join('\n') || '');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (service: ServiceData) => {
    setEditingService({ ...service });
    setFeaturesInput(service.features?.join('\n') || '');
    setIsModalOpen(true);
  };
const handleDelete = async (id: string, title: string) => {
    try {
      await api.deleteService(id);
      success('Service Deleted', `"${title}" was removed.`);
      fetchServices();
    } catch (err: any) {
      error('Delete Failed', err.message);
    }
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingService.title) {
      error('Validation Error', 'Service title is required.');
      return;
    }

    const parsedFeatures = featuresInput
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const payload: Partial<ServiceData> = {
      ...editingService,
      features: parsedFeatures.length > 0 ? parsedFeatures : editingService.features,
    };

    setIsSaving(true);
    try {
      if (editingService._id) {
        await api.updateService(editingService._id, payload);
        success('Service Updated', `"${editingService.title}" updated.`);
      } else {
        await api.createService(payload);
        success('Service Created', `"${editingService.title}" created in MongoDB.`);
      }
      setIsModalOpen(false);
      fetchServices();
    } catch (err: any) {
      error('Save Failed', err.message || 'Could not save service.');
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
            Services & Advisory CMS
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-0.5">
            Synchronized to MongoDB Service Collection
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-neutral-950 font-bold text-xs hover:opacity-95 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service Offering</span>
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-16 text-center text-sm font-mono text-neutral-400">
          Loading services from MongoDB...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-neutral-100">{service.title}</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-neutral-800 text-[11px] font-mono text-emerald-400">
                    {service.timeline}
                  </span>
                </div>
                <p className="text-xs font-mono text-emerald-400 mt-1">{service.subtitle}</p>
                <p className="text-xs text-neutral-400 mt-2 line-clamp-2">{service.description}</p>
                <p className="text-xs font-semibold text-neutral-300 mt-3 font-mono">
                  Tier: {service.priceRange}
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-neutral-800">
                <button
                  onClick={() => handleOpenEdit(service)}
                  className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-neutral-200 flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(service._id, service.title)}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-xs font-medium text-rose-400 flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
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
        title={editingService._id ? 'Edit Service Offering' : 'Add Service Offering'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-mono font-medium text-neutral-300">Service Title *</label>
            <input
              type="text"
              required
              value={editingService.title}
              onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono font-medium text-neutral-300">Subtitle</label>
            <input
              type="text"
              value={editingService.subtitle}
              onChange={(e) => setEditingService({ ...editingService, subtitle: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono font-medium text-neutral-300">Price Range</label>
              <input
                type="text"
                value={editingService.priceRange}
                onChange={(e) => setEditingService({ ...editingService, priceRange: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-medium text-neutral-300">Timeline</label>
              <input
                type="text"
                value={editingService.timeline}
                onChange={(e) => setEditingService({ ...editingService, timeline: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono font-medium text-neutral-300">Description</label>
            <textarea
              rows={3}
              value={editingService.description}
              onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none resize-none"
            />
          </div>

          <div className="space-y-1">
            <ImageUploader
              label="Service Icon / Visual Graphic"
              value={editingService.icon || ''}
              onChange={(url) => setEditingService({ ...editingService, icon: url })}
              folder="services"
              aspectRatio="square"
              helpText="Upload a custom icon or graphic to Cloudinary CDN, or enter an icon name (e.g. Layers, Database, Cpu)."
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono font-medium text-neutral-300">
              Features / Scope (One per line)
            </label>
            <textarea
              rows={4}
              value={featuresInput}
              onChange={(e) => setFeaturesInput(e.target.value)}
              placeholder="Enterprise Node.js microservices&#10;Zero-downtime MongoDB migrations&#10;24/7 p99 latency SLA guarantee"
              className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none font-mono"
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
              {isSaving ? 'Saving...' : 'Save Service'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
