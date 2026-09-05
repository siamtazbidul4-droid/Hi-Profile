import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { UploadCloud, Image as ImageIcon, CheckCircle2, AlertCircle, RefreshCw, X, Link as LinkIcon, Cloud } from 'lucide-react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';

export interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  required?: boolean;
  helpText?: string;
  aspectRatio?: 'landscape' | 'square' | 'avatar' | 'auto';
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  onChange,
  folder = 'portfolio',
  required = false,
  helpText,
  aspectRatio = 'landscape',
}) => {
  const { success, error } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      error('Invalid File', 'Please select a valid image file (PNG, JPG, WebP, SVG, GIF, AVIF).');
      return;
    }

    // Limit to 10MB
    if (file.size > 10 * 1024 * 1024) {
      error('File Too Large', 'Maximum image size is 10MB.');
      return;
    }

    setIsUploading(true);
    setUploadProgress('Uploading to Cloudinary CDN...');

    try {
      const res = await api.uploadImage(file, folder);
      if (res.success && res.data?.url) {
        onChange(res.data.url);
        success('Image Uploaded', `Successfully uploaded to Cloudinary folder "${folder}".`);
      } else {
        throw new Error('Upload succeeded but no image URL was returned.');
      }
    } catch (err: any) {
      console.error('Image Upload Error:', err);
      error(
        'Upload Failed',
        err.message || 'Could not upload image to Cloudinary. Check credentials or network.'
      );
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const previewAspectClasses =
    aspectRatio === 'square'
      ? 'aspect-square max-w-[140px]'
      : aspectRatio === 'avatar'
      ? 'w-20 h-20 rounded-full'
      : 'aspect-video max-w-full';

  return (
    <div className="space-y-2">
      {/* Label and Mode Switch */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono font-medium text-neutral-300 flex items-center gap-1.5">
          <span>{label}</span>
          {required && <span className="text-rose-400">*</span>}
        </label>

        <div className="flex items-center gap-1 bg-neutral-950 p-0.5 rounded-lg border border-neutral-800 text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-0.5 rounded-md transition-colors flex items-center gap-1 ${
              mode === 'upload'
                ? 'bg-neutral-800 text-emerald-400 font-bold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <UploadCloud className="w-3 h-3" />
            <span>Upload File</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-0.5 rounded-md transition-colors flex items-center gap-1 ${
              mode === 'url'
                ? 'bg-neutral-800 text-emerald-400 font-bold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>Direct URL</span>
          </button>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleInputChange}
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml,image/avif"
        className="hidden"
      />

      {/* Content Area */}
      {mode === 'upload' ? (
        <div className="space-y-3">
          {/* Drag and Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className={`relative rounded-2xl border-2 border-dashed p-4 sm:p-6 transition-all cursor-pointer flex flex-col items-center justify-center text-center group ${
              isDragging
                ? 'border-emerald-500 bg-emerald-950/20'
                : isUploading
                ? 'border-neutral-700 bg-neutral-950/80 cursor-wait'
                : 'border-neutral-800 hover:border-emerald-500/60 bg-neutral-950/60 hover:bg-neutral-950'
            }`}
          >
            {isUploading ? (
              <div className="py-4 space-y-3 text-center">
                <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin mx-auto" />
                <p className="text-xs font-mono text-emerald-400 font-semibold">{uploadProgress}</p>
                <p className="text-[11px] text-neutral-500">Streaming buffer directly to Cloudinary...</p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 group-hover:text-emerald-400 group-hover:border-emerald-500/40 flex items-center justify-center mx-auto transition-colors">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-200">
                    <span className="text-emerald-400 underline">Click to choose image</span> or drag and drop
                  </p>
                  <p className="text-[11px] text-neutral-400 font-mono mt-0.5">
                    Cloudinary storage • PNG, JPG, WebP, SVG up to 10MB
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Direct URL Mode */
        <div className="space-y-1.5">
          <input
            type="text"
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://res.cloudinary.com/... or https://images.unsplash.com/..."
            className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-emerald-500 focus:outline-none font-mono"
          />
        </div>
      )}

      {/* Live Preview & URL details if value exists */}
      {value && (
        <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className={`relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900 shrink-0 ${previewAspectClasses}`}>
              <img
                src={value}
                alt="Selected asset"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80';
                }}
              />
            </div>
            <div className="min-w-0 flex-1 space-y-0.5">
              <div className="flex items-center gap-1.5">
                {value.includes('cloudinary.com') ? (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-cyan-950/80 border border-cyan-500/30 text-[10px] font-mono font-bold text-cyan-300">
                    <Cloud className="w-2.5 h-2.5" />
                    Cloudinary CDN
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-neutral-800 text-[10px] font-mono text-neutral-300">
                    <ImageIcon className="w-2.5 h-2.5" />
                    External Image
                  </span>
                )}
              </div>
              <p className="text-[11px] font-mono text-neutral-400 truncate max-w-sm sm:max-w-md">
                {value}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold"
              title="Replace with another file"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs"
              title="Remove image"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {helpText && <p className="text-[11px] text-neutral-500 font-mono">{helpText}</p>}
    </div>
  );
};
