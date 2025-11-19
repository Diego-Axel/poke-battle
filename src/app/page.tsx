// src/app/page.tsx
import { startBattle } from "@/actions";
import { fetchStarterOptions } from "@/lib/api"; // <--- Importe isso
import { PokemonSelector } from "@/components/game/pokemon-selector"; // <--- Importe isso
import { Sword } from "lucide-react";

export default async function Home() {
  // Busca os dados no servidor antes de renderizar
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

        {/* Formulário agora engloba o seletor */}
        <form action={startBattle} className="w-full flex flex-col items-center gap-6">
          
          {/* O componente de escolha visual */}
          <PokemonSelector starters={starters} />

          <button
            type="submit"
            className="w-full max-w-md group relative px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/50 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sword className="w-6 h-6 group-hover:rotate-45 transition-transform" />
            <span>INICIAR BATALHA</span>
          </button>
        </form>
      </div>
    </main>
  );
}