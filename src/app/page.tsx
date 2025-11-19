import { startBattle } from "@/actions";
import { Sword } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Fundo Decorativo */}
      <div className="absolute inset-0 bg-[url('https://wallpaperaccess.com/full/5818315.png')] bg-cover bg-center opacity-20 blur-sm" />

      <div className="z-10 flex flex-col items-center gap-8 text-center max-w-md w-full bg-slate-900/80 p-12 rounded-3xl border border-slate-700 backdrop-blur-md shadow-2xl">
        
        {/* Título */}
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 drop-shadow-sm">
            POKE BATTLE
          </h1>
          <p className="text-slate-400">Desafie a CPU em uma batalha de atributos!</p>
        </div>

        {/* Formulário com Server Action */}
        <form action={startBattle} className="w-full">
          <button
            type="submit"
            className="w-full group relative px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/50 flex items-center justify-center gap-3"
          >
            <Sword className="w-6 h-6 group-hover:rotate-45 transition-transform" />
            <span>INICIAR BATALHA</span>
          </button>
        </form>

        <div className="text-xs text-slate-500">
          Projeto desenvolvido com Next.js 14, Tailwind e PokéAPI.
        </div>
      </div>
    </main>
  );
}