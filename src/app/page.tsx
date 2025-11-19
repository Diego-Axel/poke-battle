import { fetchStarterOptions } from "@/lib/api";
import { PokemonSelector } from "@/components/game/pokemon-selector";

export default async function Home() {
  // Busca os dados no servidor
  const starters = await fetchStarterOptions();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[url('https://wallpaperaccess.com/full/5818315.png')] bg-cover bg-center opacity-20 blur-sm" />

      <div className="z-10 flex flex-col items-center gap-6 text-center max-w-4xl w-full bg-slate-900/80 p-8 md:p-12 rounded-3xl border border-slate-700 backdrop-blur-md shadow-2xl">
        
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 drop-shadow-sm">
            POKE BATTLE
          </h1>
          <p className="text-slate-400">Monte sua estratégia e vença a CPU</p>
        </div>

        {/* Agora chamamos apenas o componente, ele cuida de tudo */}
        <PokemonSelector starters={starters} />
        
      </div>
    </main>
  );
}