export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Title skeleton */}
      <div>
        <div className="h-8 w-64 bg-gray-200 rounded-md"></div>
        <div className="h-4 w-96 bg-gray-200 rounded-md mt-2"></div>
      </div>

      {/* Cards skeleton row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 flex items-center gap-5">
            <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
              <div className="h-6 w-12 bg-gray-200 rounded"></div>
              <div className="h-3 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Info panel skeleton */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden max-w-2xl">
        <div className="h-12 bg-gray-50 border-b border-gray-100 px-6 py-4">
          <div className="h-5 w-48 bg-gray-200 rounded"></div>
        </div>
        <div className="p-6 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="grid grid-cols-3 py-2 border-b border-gray-50">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="col-span-2 h-4 w-48 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
