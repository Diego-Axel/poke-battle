"use client";

import { useState } from "react";
import { Pokemon } from "@/types";
import { cn } from "@/lib/utils";
import { startBattle } from "@/actions";
import { Sword, Shuffle } from "lucide-react";

interface PokemonSelectorProps {
  starters: Pokemon[];
}

export function PokemonSelector({ starters }: PokemonSelectorProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Função para limpar a seleção (caso queira voltar para aleatório)
  function handleToggleSelect(id: number) {
    if (selectedId === id) {
      setSelectedId(null); // Desmarca se clicar no mesmo
    } else {
      setSelectedId(id); // Marca o novo
    }
  }

  return (
    <div className="w-full max-w-4xl">
      <h3 className="text-xl text-white mb-4 font-bold text-center">
        Escolha seu Lutador:
      </h3>
      
      <form action={startBattle} className="flex flex-col items-center gap-8">
        
        {/* Grid de Opções */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {starters.map((poke) => (
            <button
              key={poke.id}
              type="button"
              onClick={() => handleToggleSelect(poke.id)}
              className={cn(
                "relative group rounded-xl p-2 border-2 transition-all duration-300 flex flex-col items-center gap-2",
                "bg-slate-800/50 hover:bg-slate-700",
                selectedId === poke.id
                  ? "border-indigo-500 bg-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.5)] scale-110 z-10 opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100 hover:scale-105 grayscale hover:grayscale-0"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
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

        {/* Input Escondido: Envia o ID se tiver, ou vazio se não tiver */}
        <input type="hidden" name="pokemonId" value={selectedId || ""} />

        {/* O Botão agora muda de cor e texto dependendo da escolha */}
        <button
          type="submit"
          className={cn(
            "w-full max-w-md group relative px-8 py-4 font-bold rounded-xl transition-all hover:scale-105 hover:shadow-lg flex items-center justify-center gap-3",
            selectedId 
              ? "bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-indigo-500/50" // Estilo com seleção
              : "bg-slate-700 hover:bg-slate-600 text-slate-200 hover:shadow-slate-500/50" // Estilo Aleatório
          )}
        >
          {selectedId ? (
            <>
              <Sword className="w-6 h-6 group-hover:rotate-45 transition-transform" />
              <span>INICIAR COM ESCOLHIDO</span>
            </>
          ) : (
            <>
              <Shuffle className="w-6 h-6 group-hover:rotate-180 transition-transform" />
              <span>INICIAR COM ALEATÓRIO</span>
            </>
          )}
        </button>

        {/* Texto de ajuda */}
        <p className="text-xs text-slate-500">
          {selectedId 
            ? "Você escolheu um Pokémon específico!" 
            : "* Nenhum Pokémon selecionado. A CPU escolherá um aleatório para você."}
        </p>

      </form>
    </div>
  );
}