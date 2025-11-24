// src/app/page.tsx
import { fetchGen1List } from "@/lib/api"; // <--- AQUI ESTAVA O PROBLEMA (Import correto)
import { PokemonSelector } from "@/components/game/pokemon-selector";

// Força esta página a ser dinâmica (para sempre trazer dados novos se precisar)
export const dynamic = "force-dynamic";

export default async function Home() {
  // Agora chamo a função correta que existe na sua API
  const pokemons = await fetchGen1List();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[url('https://wallpaperaccess.com/full/5818315.png')] bg-cover bg-center opacity-20 blur-sm" />

      <div className="z-10 flex flex-col items-center gap-6 text-center max-w-6xl w-full bg-slate-900/90 p-4 md:p-8 rounded-3xl border border-slate-700 backdrop-blur-md shadow-2xl">
        
        <div className="space-y-2 mb-4">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 drop-shadow-sm">
            POKE BATTLE
          </h1>
          <p className="text-slate-400">Escolha seu Campeão</p>
        </div>

        {/* Passo a lista para o seletor */}
        <PokemonSelector starters={pokemons} />
        
      </div>
    </main>
  );
}