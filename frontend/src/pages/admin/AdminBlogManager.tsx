import React, { useState, useEffect, FormEvent } from 'react';
import { BookOpen, Plus, Edit2, Trash2, Eye, EyeOff, Save, X, Sparkles } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { BlogPostData } from '../../types';
import { Modal } from '../../components/Modal';
import { ImageUploader } from '../../components/ImageUploader';

const initialPost: Partial<BlogPostData> = {
  title: '',
  slug: '',
  excerpt: '',
  content: '## Executive Summary\n\nDeep dive into distributed systems...\n\n### Architectural Axioms\n\n1. Deterministic replication\n2. Sub-millisecond locking',
  coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
  category: 'Architecture',
  tags: ['DistributedSystems', 'MongoDB', 'NodeJS'],
  author: {
    name: 'Alexander Vance',
    role: 'Principal Systems Architect',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  publishedAt: new Date().toISOString(),
  readingTime: '6 min read',
  status: 'published',
  featured: false,
};

export function AdminBlogManager() {
  const { success, error } = useToast();
  const [posts, setPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPostData>>(initialPost);
  const [isSaving, setIsSaving] = useState(false);
  const [tagsInput, setTagsInput] = useState('');

  const fetchPosts = () => {
    setLoading(true);
    api
      .getBlogPosts({ includeDrafts: true })
      .then((res) => {
        if (res.success) setPosts(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleOpenCreate = () => {
    setEditingPost({ ...initialPost, publishedAt: new Date().toISOString() });
    setTagsInput(initialPost.tags?.join(', ') || '');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post: BlogPostData) => {
    setEditingPost({ ...post });
    setTagsInput(post.tags?.join(', ') || '');
    setIsModalOpen(true);
  };

 const handleDelete = async (id: string, title: string) => {
    try {
      await api.deleteBlogPost(id);
      success('Article Deleted', `"${title}" has been deleted.`);
      fetchPosts();
    } catch (err: any) {
      error('Delete Failed', err.message);
    }
  };

  const handleToggleStatus = async (post: BlogPostData) => {
    const nextStatus = post.status === 'published' ? 'draft' : 'published';
    try {
      await api.updateBlogPost(post._id, { status: nextStatus });
      success('Status Updated', `Post marked as ${nextStatus}.`);
      fetchPosts();
    } catch (err: any) {
      error('Update Failed', err.message);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost.title || !editingPost.slug || !editingPost.content) {
      error('Validation Error', 'Title, slug, and content are required.');
      return;
    }

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const payload: Partial<BlogPostData> = {
      ...editingPost,
      tags: parsedTags.length > 0 ? parsedTags : editingPost.tags,
    };

    setIsSaving(true);
    try {
      if (editingPost._id) {
        await api.updateBlogPost(editingPost._id, payload);
        success('Article Updated', `"${editingPost.title}" was updated.`);
      } else {
        await api.createBlogPost(payload);
        success('Article Created', `"${editingPost.title}" was saved to MongoDB.`);
      }
      setIsModalOpen(false);
      fetchPosts();
    } catch (err: any) {
      error('Save Failed', err.message || 'Could not save article.');
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
            Engineering Blog & Deep Dives CMS
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-0.5">
            Full-Stack Markdown Publications backed by MongoDB BlogPost Collection
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-neutral-950 font-bold text-xs hover:opacity-95 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Posts Table */}
      {loading ? (
        <div className="py-16 text-center text-sm font-mono text-neutral-400">
          Loading publications from MongoDB...
        </div>
      ) : posts.length > 0 ? (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 overflow-hidden">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-neutral-950/80 border-b border-neutral-800 text-[11px] font-mono uppercase text-neutral-400">
              <tr>
                <th className="py-3.5 px-4">Publication</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Published</th>
                <th className="py-3.5 px-4">Views</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80">
              {posts.map((post) => (
                <tr key={post._id} className="hover:bg-neutral-900/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-lg object-cover border border-neutral-800"
                      />
                      <div>
                        <p className="font-bold text-neutral-100 text-sm">{post.title}</p>
                        <p className="text-[11px] font-mono text-neutral-400">/{post.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-md bg-neutral-800 border border-neutral-700 text-[11px] font-mono text-neutral-300">
                      {post.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleStatus(post)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-colors ${
                        post.status === 'published'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                      }`}
                    >
                      {post.status === 'published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{post.status}</span>
                    </button>
                  </td>
                  <td className="py-3.5 px-4 font-mono">{post.views || 0}</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(post)}
                        className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                        title="Edit Article"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(post._id, post.title)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                        title="Delete Article"
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
      ) : (
        <div className="p-12 text-center rounded-2xl border border-neutral-800 bg-neutral-900/30 space-y-3">
          <p className="text-neutral-300 font-semibold">No articles published yet</p>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-xl bg-emerald-500 text-neutral-950 text-xs font-bold"
          >
            Draft First Publication
          </button>
        </div>
      )}

      {/* Article Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPost._id ? 'Edit Engineering Publication' : 'Draft New Publication'}
        maxWidth="max-w-4xl"
      >
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono font-medium text-neutral-300">Article Title *</label>
              <input
                type="text"
                required
                value={editingPost.title}
                onChange={(e) => {
                  const title = e.target.value;
                  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  setEditingPost({
                    ...editingPost,
                    title,
                    slug: editingPost.slug ? editingPost.slug : slug,
                  });
                }}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-medium text-neutral-300">URL Slug *</label>
              <input
                type="text"
                required
                value={editingPost.slug}
                onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-medium text-neutral-300">Category *</label>
              <input
                type="text"
                required
                value={editingPost.category}
                onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                placeholder="Architecture, Databases, Frontend"
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-medium text-neutral-300">Estimated Reading Time</label>
              <input
                type="text"
                value={editingPost.readingTime}
                onChange={(e) => setEditingPost({ ...editingPost, readingTime: e.target.value })}
                placeholder="e.g. 6 min read"
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <ImageUploader
                label="Article Cover Image"
                value={editingPost.coverImage || ''}
                onChange={(url) => setEditingPost({ ...editingPost, coverImage: url })}
                folder="blog"
                required
                helpText="Uploaded to Cloudinary CDN portfolio/blog folder."
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-mono font-medium text-neutral-300">Tags (Comma-separated)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="DistributedSystems, MongoDB, Concurrency"
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-mono font-medium text-neutral-300">Article Abstract / Excerpt</label>
              <textarea
                rows={2}
                required
                value={editingPost.excerpt}
                onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none resize-none"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-mono font-medium text-neutral-300">Full Content (Markdown Supported)</label>
              <textarea
                rows={8}
                required
                value={editingPost.content}
                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none font-mono leading-relaxed"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
            <select
              value={editingPost.status}
              onChange={(e) => setEditingPost({ ...editingPost, status: e.target.value as any })}
              className="px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>

            <div className="flex items-center gap-3">
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
                className="px-5 py-2 rounded-xl bg-emerald-500 text-neutral-950 text-xs font-bold hover:opacity-95 disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Article to MongoDB'}
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
