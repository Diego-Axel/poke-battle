"use client";

import { useState } from "react";
import { Pokemon } from "@/types";
import { cn } from "@/lib/utils";

interface PokemonSelectorProps {
  starters: Pokemon[];
}

export function PokemonSelector({ starters }: PokemonSelectorProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="w-full max-w-4xl">
      <h3 className="text-xl text-white mb-4 font-bold text-center">
        Escolha seu Lutador:
      </h3>
      
      {/* Grid de Opções */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
        {starters.map((poke) => (
          <button
            key={poke.id}
            type="button" // Importante para não submeter o form ao clicar
            onClick={() => setSelectedId(poke.id)}
            className={cn(
              "relative group rounded-xl p-2 border-2 transition-all duration-300 flex flex-col items-center gap-2",
              "bg-slate-800/50 hover:bg-slate-700",
              selectedId === poke.id
                ? "border-indigo-500 bg-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.5)] scale-110 z-10"
                : "border-transparent grayscale hover:grayscale-0 hover:scale-105 opacity-70 hover:opacity-100"
            )}
          >
            <img 
              src={poke.image} 
              alt={poke.name} 
              className="w-16 h-16 object-contain drop-shadow-lg"
            />
            <span className="text-xs font-bold text-white capitalize truncate w-full text-center">
              {poke.name}
            </span>
          </button>
        ))}
      </div>

      {/* Input Escondido: É isso que o Server Action vai ler! */}
      <input type="hidden" name="pokemonId" value={selectedId || ""} />

      {/* Aviso se não selecionou nada */}
      {!selectedId && (
        <p className="text-center text-yellow-500 text-sm animate-pulse mb-4">
          * Selecione um Pokémon para habilitar o botão ou deixe vazio para aleatório
        </p>
      )}
    </div>
  );
}