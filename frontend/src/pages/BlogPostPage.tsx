import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Bookmark,
  Eye,
  ArrowUpRight,
  BookOpen,
} from 'lucide-react';
import { api } from '../services/api';
import { BlogPostData } from '../types';
import { BlogCard } from '../components/BlogCard';
import { useToast } from '../context/ToastContext';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { info } = useToast();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [related, setRelated] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    window.scrollTo(0, 0);

    api
      .getBlogPostBySlug(slug)
      .then((res) => {
        if (res.success && res.data) {
          setPost(res.data);
          setRelated(res.related || []);
        } else {
          navigate('/blog', { replace: true });
        }
      })
      .catch(() => {
        navigate('/blog', { replace: true });
      })
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      info('Link Copied', 'Article URL copied to clipboard.');
    }
  };

  if (loading || !post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-sm font-mono text-neutral-400">Loading technical publication...</p>
      </div>
    );
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Top Nav */}
      <div className="flex items-center justify-between">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-emerald-400 text-xs transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Article</span>
        </button>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
          {post.category}
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-100 tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-lg text-neutral-300 leading-relaxed">{post.excerpt}</p>

        {/* Metadata & Author Card */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-y border-neutral-800 py-4">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover border border-neutral-700"
            />
            <div>
              <p className="font-bold text-sm text-neutral-100">{post.author.name}</p>
              <p className="text-xs text-neutral-400">{post.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {post.views} views
            </span>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl">
        <img
          src={post.coverImage}
          alt={post.title}
          referrerPolicy="no-referrer"
          className="w-full max-h-[450px] object-cover object-center"
        />
      </div>

      {/* Formatted Content */}
      <div className="prose prose-invert max-w-none text-neutral-200 text-base leading-relaxed space-y-6 pt-4">
        {post.content.split('\n\n').map((block, idx) => {
          if (block.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-xl font-bold text-neutral-100 mt-8 mb-4">
                {block.replace('### ', '')}
              </h3>
            );
          }
          if (block.startsWith('## ')) {
            return (
              <h2 key={idx} className="text-2xl font-bold text-neutral-100 mt-10 mb-4 border-b border-neutral-800 pb-2">
                {block.replace('## ', '')}
              </h2>
            );
          }
          if (block.startsWith('```')) {
            const lines = block.split('\n');
            const code = lines.slice(1, -1).join('\n');
            return (
              <pre key={idx} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 overflow-x-auto text-xs font-mono text-emerald-300">
                <code>{code}</code>
              </pre>
            );
          }
          return (
            <p key={idx} className="text-neutral-300 leading-relaxed">
              {block}
            </p>
          );
        })}
      </div>

      {/* Tags */}
      <div className="pt-8 border-t border-neutral-800 flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-neutral-400">Indexed Tags:</span>
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Related Posts */}
      {related.length > 0 && (
        <div className="pt-12 border-t border-neutral-800 space-y-8">
          <h2 className="text-2xl font-bold text-neutral-100">Related Technical Deep Dives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {related.map((rel) => (
              <BlogCard key={rel._id} post={rel} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
