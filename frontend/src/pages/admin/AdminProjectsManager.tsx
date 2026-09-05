
import { useState, useEffect, FormEvent } from 'react';

import {
  FolderGit2,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  ExternalLink,
  Save,
  X,
  Sparkles,
} from 'lucide-react';

import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { ProjectData, ProjectCategory } from '../../types';
import { Modal } from '../../components/Modal';
import { ImageUploader } from '../../components/ImageUploader';

const initialProject: Partial<ProjectData> = {
  title: '',
  slug: '',
  tagline: '',
  shortDescription: '',
  fullDescription: '',
  problem: '',
  solution: '',
  keyFeatures: [
    'Sub-25ms response time',
    'Zero-downtime MongoDB sync',
    'Comprehensive audit logs',
  ],
  featuredImage:
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  galleryImages: [],
  technologies: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Tailwind CSS'],
  category: 'Full-Stack',
  architecture: {
    frontend: 'React 19 + TypeScript + Tailwind CSS',
    backend: 'Node.js Express REST microservices',
    database: 'MongoDB Atlas Sharded Cluster + Mongoose',
    infrastructure: 'Docker + Kubernetes + Cloud CDN',
  },
  metrics: ['50K+ Active Users', '99.99% Availability', 'Sub-30ms Latency'],
  githubUrl: 'https://github.com',
  liveUrl: 'https://example.com',
  featured: true,
  published: true,
  displayOrder: 0,
};

export function AdminProjectsManager() {
  const { success, error } = useToast();

  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] =
    useState<Partial<ProjectData>>(initialProject);
  const [isSaving, setIsSaving] = useState(false);
  const [techInput, setTechInput] = useState('');

  const fetchProjects = () => {
    setLoading(true);

    api
      .getProjects({ includeUnpublished: true })
      .then((res) => {
        if (res.success) setProjects(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenCreate = () => {
    setEditingProject({ ...initialProject });
    setTechInput(initialProject.technologies?.join(', ') || '');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: ProjectData) => {
    setEditingProject({ ...project });
    setTechInput(project.technologies?.join(', ') || '');
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    try {
      await api.deleteProject(id);
      success('Project Deleted', `"${title}" has been permanently removed.`);
      fetchProjects();
    } catch (err: any) {
      error('Delete Failed', err.message || 'Unable to delete project.');
    }
  };

  const handleTogglePublished = async (project: ProjectData) => {
    try {
      await api.updateProject(project._id, {
        published: !project.published,
      });

      success(
        'Status Updated',
        `Project marked as ${
          !project.published ? 'Published' : 'Draft'
        }.`
      );

      fetchProjects();
    } catch (err: any) {
      error('Update Failed', err.message);
    }
  };

  const handleToggleFeatured = async (project: ProjectData) => {
    try {
      await api.updateProject(project._id, {
        featured: !project.featured,
      });

      success(
        'Featured Updated',
        `Project ${
          !project.featured ? 'is now featured' : 'unfeatured'
        }.`
      );

      fetchProjects();
    } catch (err: any) {
      error('Update Failed', err.message);
    }
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    if (!editingProject.title || !editingProject.slug) {
      error('Validation Error', 'Title and slug are required.');
      return;
    }

    // Process comma separated technologies
    const parsedTechs = techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: Partial<ProjectData> = {
      ...editingProject,
      technologies:
        parsedTechs.length > 0
          ? parsedTechs
          : editingProject.technologies,
    };

    setIsSaving(true);

    try {
      if (editingProject._id) {
        await api.updateProject(editingProject._id, payload);

        success(
          'Project Updated',
          `"${editingProject.title}" was updated successfully.`
        );
      } else {
        await api.createProject(payload);

        success(
          'Project Created',
          `"${editingProject.title}" was saved to MongoDB.`
        );
      }

      setIsModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      error(
        'Save Failed',
        err.message || 'Could not save project.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h1 className="text-2xl font-extrabold text-neutral-100 tracking-tight">
            Case Studies & Projects CMS
          </h1>

          <p className="text-xs text-neutral-400 font-mono mt-0.5">
            Full-Stack CRUD backed by MongoDB Project Collection
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-neutral-950 font-bold text-xs hover:opacity-95 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Case Study</span>
        </button>
      </div>

      {/* Projects Table */}
      {loading ? (
        <div className="py-16 text-center text-sm font-mono text-neutral-400">
          Loading case studies from MongoDB...
        </div>
      ) : projects.length > 0 ? (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-300">
              <thead className="bg-neutral-950/80 border-b border-neutral-800 text-[11px] font-mono uppercase text-neutral-400">
                <tr>
                  <th className="py-3.5 px-4">Project</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Featured</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-800/80">
                {projects.map((project) => (
                  <tr
                    key={project._id}
                    className="hover:bg-neutral-900/60 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={project.featuredImage}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-lg object-cover border border-neutral-800"
                        />

                        <div>
                          <p className="font-bold text-neutral-100 text-sm">
                            {project.title}
                          </p>

                          <p className="text-[11px] font-mono text-neutral-400">
                            /{project.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-neutral-800 border border-neutral-700 text-[11px] font-mono text-neutral-300">
                        {project.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() =>
                          handleTogglePublished(project)
                        }
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-colors ${
                          project.published
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                        }`}
                      >
                        {project.published ? (
                          <Eye className="w-3 h-3" />
                        ) : (
                          <EyeOff className="w-3 h-3" />
                        )}

                        <span>
                          {project.published
                            ? 'Published'
                            : 'Draft'}
                        </span>
                      </button>
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() =>
                          handleToggleFeatured(project)
                        }
                        className={`p-1.5 rounded-lg transition-colors ${
                          project.featured
                            ? 'text-amber-400'
                            : 'text-neutral-600 hover:text-neutral-400'
                        }`}
                        title={
                          project.featured
                            ? 'Featured on Home'
                            : 'Not Featured'
                        }
                      >
                        <Star
                          className={`w-4 h-4 ${
                            project.featured
                              ? 'fill-amber-400'
                              : ''
                          }`}
                        />
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() =>
                            handleOpenEdit(project)
                          }
                          className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                          title="Edit Project"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              project._id,
                              project.title
                            )
                          }
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl border border-neutral-800 bg-neutral-900/30 space-y-3">
          <p className="text-neutral-300 font-semibold">
            No case studies in database
          </p>

          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-xl bg-emerald-500 text-neutral-950 text-xs font-bold"
          >
            Create First Case Study
          </button>
        </div>
      )}

      {/* Create / Edit Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          editingProject._id
            ? 'Edit Case Study'
            : 'Create New Case Study'
        }
        maxWidth="max-w-4xl"
      >
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono font-medium text-neutral-300">
                Project Title *
              </label>

              <input
                type="text"
                required
                value={editingProject.title}
                onChange={(e) => {
                  const title = e.target.value;

                  const slug = title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');

                  setEditingProject({
                    ...editingProject,
                    title,
                    slug: editingProject.slug
                      ? editingProject.slug
                      : slug,
                  });
                }}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-medium text-neutral-300">
                URL Slug *
              </label>

              <input
                type="text"
                required
                value={editingProject.slug}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    slug: e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-medium text-neutral-300">
                Category *
              </label>

              <select
                value={editingProject.category}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    category:
                      e.target.value as ProjectCategory,
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
              >
                <option value="Full-Stack">Full-Stack</option>
                <option value="Cloud & Systems">
                  Cloud & Systems
                </option>
                <option value="AI & ML">AI & ML</option>
                <option value="Fintech">Fintech</option>
                <option value="Open Source">
                  Open Source
                </option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-medium text-neutral-300">
                Architectural Tagline
              </label>

              <input
                type="text"
                value={editingProject.tagline}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    tagline: e.target.value,
                  })
                }
                placeholder="e.g. Distributed Microservices & Event Stream Engine"
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <ImageUploader
                label="Featured Project Cover Image"
                value={editingProject.featuredImage || ''}
                onChange={(url) =>
                  setEditingProject({
                    ...editingProject,
                    featuredImage: url,
                  })
                }
                folder="projects"
                required
                helpText="Uploaded to Cloudinary CDN portfolio/projects folder. Supports PNG, JPG, WebP."
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-mono font-medium text-neutral-300">
                Technologies (Comma-separated)
              </label>

              <input
                type="text"
                value={techInput}
                onChange={(e) =>
                  setTechInput(e.target.value)
                }
                placeholder="React 19, TypeScript, Node.js, Express, MongoDB Atlas, Docker"
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-mono font-medium text-neutral-300">
                Short Summary
              </label>

              <textarea
                rows={2}
                required
                value={editingProject.shortDescription}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    shortDescription: e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none resize-none"
              />
            </div>

            {/* FIX: Full Description field added */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-mono font-medium text-neutral-300">
                Full Description *
              </label>

              <textarea
                rows={5}
                required
                minLength={20}
                value={editingProject.fullDescription}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    fullDescription: e.target.value,
                  })
                }
                placeholder="Provide a detailed description of the project, its architecture, capabilities, and overall engineering approach..."
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-medium text-neutral-300">
                The Problem
              </label>

              <textarea
                rows={3}
                required
                value={editingProject.problem}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    problem: e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-medium text-neutral-300">
                The Solution
              </label>

              <textarea
                rows={3}
                required
                value={editingProject.solution}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    solution: e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-medium text-neutral-300">
                Live URL
              </label>

              <input
                type="text"
                value={editingProject.liveUrl || ''}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    liveUrl: e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-medium text-neutral-300">
                GitHub Repository URL
              </label>

              <input
                type="text"
                value={editingProject.githubUrl || ''}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    githubUrl: e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Published and Featured Toggles */}
          <div className="flex items-center gap-6 pt-2 border-t border-neutral-800">
            <label className="flex items-center gap-2 text-xs font-medium text-neutral-300 cursor-pointer">
              <input
                type="checkbox"
                checked={editingProject.published}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    published: e.target.checked,
                  })
                }
                className="rounded text-emerald-500 bg-neutral-950 border-neutral-800 focus:ring-0"
              />

              <span>Published (Publicly Visible)</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-medium text-neutral-300 cursor-pointer">
              <input
                type="checkbox"
                checked={editingProject.featured}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    featured: e.target.checked,
                  })
                }
                className="rounded text-emerald-500 bg-neutral-950 border-neutral-800 focus:ring-0"
              />

              <span>Featured on Homepage</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-emerald-500 text-neutral-950 text-xs font-bold hover:opacity-95 transition-opacity disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save to MongoDB'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

