export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-slate-200 rounded-lg w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 bg-slate-200 rounded-2xl"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

