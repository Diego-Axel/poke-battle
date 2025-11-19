import { fetchPokedex } from "@/lib/api";
import { PokemonCard } from "@/components/game/pokemon-card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Isso força o Next.js a entender que essa página é Estática (SSG)
export const dynamic = "force-static"; 

export default async function PokedexPage() {
  const pokemons = await fetchPokedex();

  return (
    <main className="min-h-screen p-8 pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white">Pokedex da Elite</h1>
            <p className="text-slate-400">
              Esta página é gerada estaticamente (SSG) no momento do build.
            </p>
          </div>
          
          <Link 
            href="/"
            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <ArrowLeft size={20} />
            Voltar ao Início
          </Link>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {pokemons.map((pokemon) => (
            <div key={pokemon.id} className="scale-90 hover:scale-100 transition-transform">
              <PokemonCard 
                pokemon={pokemon} 
                isPlayer={true} 
                disabled={true} // Apenas para visualização, sem clique
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}