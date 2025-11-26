// src/components/game/pokemon-selector.tsx
"use client";

import { useState } from "react";
import { Pokemon } from "@/types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Sword, Shuffle, Search } from "lucide-react";

interface PokemonSelectorProps {
  starters: Pokemon[];
}

export function PokemonSelector({ starters }: PokemonSelectorProps) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleToggleSelect(id: number) {
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  }

  function handleStartBattle(e: React.MouseEvent) {
    e.preventDefault();
    setIsLoading(true);
    const battleId = Math.floor(Math.random() * 1000000);

    if (selectedId) {
      router.push(`/battle/${battleId}?player=${selectedId}`);
    } else {
      router.push(`/battle/${battleId}`);
    }
  }

  const filteredPokemons = starters.filter((p) => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-5xl">
      <h3 className="text-2xl text-white mb-6 font-bold text-center">
        Escolha seu Lutador:
      </h3>
      
      <div className="flex flex-col items-center gap-8">
        
        {/* Barra de Pesquisa */}
        <div className="w-full max-w-xs relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text"
            placeholder="Buscar..."
            className="w-full bg-slate-800/50 text-white text-sm rounded-full pl-9 pr-4 py-2 border border-slate-700 focus:outline-none focus:border-indigo-500 transition-colors"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* GRID LIMPO */}
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {filteredPokemons.map((poke) => (
              <button
                key={poke.id}
                type="button"
                onClick={() => handleToggleSelect(poke.id)}
                className={cn(
                  "relative group rounded-xl p-2 border-2 transition-all duration-200 flex flex-col items-center gap-2 w-28",
                  "bg-slate-800/50 hover:bg-slate-700",
                  selectedId === poke.id
                    ? "border-indigo-500 bg-indigo-600/20 shadow-[0_0_20px_rgba(99,102,241,0.4)] scale-110 z-10"
                    : "border-transparent opacity-80 hover:opacity-100 hover:scale-105 grayscale hover:grayscale-0"
                )}
              >
                {/* AQUI ESTÁ A MÁGICA: Usamos nosso componente inteligente */}
                <PokemonAvatar 
                    src={poke.image} 
                    name={poke.name} 
                    id={poke.id} 
                />
                
                <span className="text-xs font-bold text-white capitalize truncate w-full text-center">
                  {poke.name}
                </span>
              </button>
            ))}

            {filteredPokemons.length === 0 && (
              <div className="col-span-full text-center py-8 text-slate-500">
                Nenhum Pokémon encontrado.
              </div>
            )}
          </div>
        </div>

        {/* BOTÃO DE AÇÃO */}
        <button
          type="button"
          onClick={handleStartBattle}
          disabled={isLoading}
          className={cn(
            "w-full max-w-md group relative px-8 py-4 font-bold rounded-xl transition-all hover:scale-105 hover:shadow-lg flex items-center justify-center gap-3 mt-4",
            selectedId 
              ? "bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-indigo-500/50"
              : "bg-slate-700 hover:bg-slate-600 text-slate-200 hover:shadow-slate-500/50",
            isLoading ? "opacity-50 cursor-wait" : ""
          )}
        >
          {isLoading ? (
            <span>Carregando Arena...</span>
          ) : selectedId ? (
            <>
              <Sword className="w-6 h-6 group-hover:rotate-45 transition-transform" />
              <span>LUTAR COM {starters.find(p => p.id === selectedId)?.name.toUpperCase()}</span>
            </>
          ) : (
            <>
              <Shuffle className="w-6 h-6 group-hover:rotate-180 transition-transform" />
              <span>SORTEAR E LUTAR</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// --- COMPONENTE AUXILIAR INTELIGENTE ---
// Se o GIF falhar, ele carrega a imagem estática automaticamente.
function PokemonAvatar({ src, name, id }: { src: string, name: string, id: number }) {
    const [imgSrc, setImgSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    return (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img 
            src={imgSrc} 
            alt={name} 
            className="w-20 h-20 object-contain drop-shadow-lg"
            onError={() => {
                // Se deu erro e ainda não tentamos o fallback...
                if (!hasError) {
                    setHasError(true);
                    // Tenta carregar a versão estática oficial (que nunca falha)
                    setImgSrc(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`);
                }
            }}
        />
    )
}