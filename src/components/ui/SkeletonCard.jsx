export default function SkeletonCard() {
  return (
    <div className="shopsphere-card overflow-hidden p-4">
      <div className="aspect-[4/3] animate-pulse rounded-2xl bg-surface-100" />
      <div className="mt-4 h-4 w-3/4 animate-pulse rounded-full bg-surface-100" />
      <div className="mt-3 h-3 w-1/2 animate-pulse rounded-full bg-surface-100" />
      <div className="mt-5 h-9 w-full animate-pulse rounded-full bg-surface-100" />
    </div>
  )
}