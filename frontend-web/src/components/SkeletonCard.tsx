export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-subtle">
      <div className="h-48 animate-pulse rounded-2xl bg-neutral-100" />
      <div className="mt-5 space-y-3">
        <div className="h-5 w-2/3 animate-pulse rounded-full bg-neutral-100" />
        <div className="h-4 w-1/2 animate-pulse rounded-full bg-neutral-100" />
        <div className="h-10 w-full animate-pulse rounded-full bg-neutral-100" />
      </div>
    </div>
  );
}
