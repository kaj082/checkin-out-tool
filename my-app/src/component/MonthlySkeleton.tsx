const MonthlySummarySkeleton = () => {
  return (
    <div className="w-full bg-white rounded-xl p-6 shadow-lg border border-gray-200 animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-gray-300 p-3 rounded-full w-12 h-12" />
        <div className="flex flex-col gap-2 w-full">
          <div className="w-1/4 h-4 bg-gray-300 rounded" />
          <div className="w-1/2 h-5 bg-gray-400 rounded" />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="w-1/3 h-6 bg-gray-300 rounded" />
        <div className="w-1/2 h-4 bg-gray-300 rounded" />
      </div>

      <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-gray-300 w-1/3 rounded-full" />
      </div>
    </div>
  );
};

export default MonthlySummarySkeleton;
