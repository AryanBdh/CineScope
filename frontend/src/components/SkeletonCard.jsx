export default function SkeletonCard() {
  return (
    <div>
      <div className="rounded-2xl aspect-[2/3] skeleton" />
      <div className="mt-2.5 space-y-2">
        <div className="h-3.5 skeleton rounded-full w-5/6" />
        <div className="h-3 skeleton rounded-full w-2/5" />
      </div>
    </div>
  )
}