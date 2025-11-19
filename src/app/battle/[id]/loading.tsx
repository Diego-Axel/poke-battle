export default function Loading() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-12 p-4">
        <div className="h-8 w-64 bg-slate-800 rounded-full animate-pulse" />
        
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-24">
          {/* Skeleton Jogador */}
          <div className="w-72 h-[500px] bg-slate-800/50 rounded-2xl border border-slate-700 animate-pulse" />
          
          <div className="text-4xl font-black text-slate-800 italic">VS</div>
          
          {/* Skeleton CPU */}
          <div className="w-72 h-[500px] bg-slate-800/50 rounded-2xl border border-slate-700 animate-pulse" />
        </div>
      </div>
    );
  }