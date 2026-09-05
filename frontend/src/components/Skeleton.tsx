export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-neutral-800/60 dark:bg-neutral-800/60 ${className}`}
    />
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6 flex flex-col gap-4">
      <Skeleton className="h-48 w-full rounded-xl" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-24 rounded-full" />
      </div>
      <Skeleton className="h-7 w-3/4" />
      <Skeleton className="h-16 w-full" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-6 w-16 rounded-md" />
        <Skeleton className="h-6 w-16 rounded-md" />
        <Skeleton className="h-6 w-16 rounded-md" />
      </div>
    </div>
  );
}

export function BlogPostSkeleton() {
  return (
    <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6 flex flex-col gap-4">
      <Skeleton className="h-44 w-full rounded-xl" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-7 w-5/6" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
}
