export default function MatchDetailsLoading() {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="h-6 w-32 bg-white/5 rounded-md animate-pulse"></div>

      <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg">
        <div className="space-y-4">
          <div className="h-8 w-3/4 bg-white/5 rounded-md animate-pulse mx-auto"></div>
          <div className="h-4 w-1/2 bg-white/5 rounded-md animate-pulse mx-auto"></div>
          <div className="h-4 w-1/3 bg-white/5 rounded-md animate-pulse mx-auto"></div>
        </div>
      </div>

      <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg">
        <div className="space-y-6">
          <div className="h-6 w-1/3 bg-white/5 rounded-md animate-pulse mx-auto"></div>

          <div className="flex justify-between items-center">
            <div className="space-y-4 w-1/3 flex flex-col items-center">
              <div className="w-16 h-16 bg-white/5 rounded-full animate-pulse"></div>
              <div className="h-4 w-24 bg-white/5 rounded-md animate-pulse"></div>
            </div>

            <div className="flex items-center justify-center space-x-6 w-1/3">
              <div className="h-10 w-8 bg-white/5 rounded-md animate-pulse"></div>
              <div className="h-10 w-8 bg-white/5 rounded-md animate-pulse"></div>
            </div>

            <div className="space-y-4 w-1/3 flex flex-col items-center">
              <div className="w-16 h-16 bg-white/5 rounded-full animate-pulse"></div>
              <div className="h-4 w-24 bg-white/5 rounded-md animate-pulse"></div>
            </div>
          </div>

          <div className="h-8 w-1/3 bg-white/5 rounded-md animate-pulse mx-auto"></div>
        </div>
      </div>

      <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg">
        <div className="h-6 w-1/3 bg-white/5 rounded-md animate-pulse mx-auto mb-6"></div>

        <div className="space-y-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <div className="h-4 w-8 bg-white/5 rounded-md animate-pulse"></div>
                <div className="h-4 w-20 bg-white/5 rounded-md animate-pulse"></div>
                <div className="h-4 w-8 bg-white/5 rounded-md animate-pulse"></div>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
