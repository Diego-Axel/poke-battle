"use client";

import { Pokemon } from "@/types";
import { cn } from "@/lib/utils";
import { Sword, Shield, Zap, Heart, HelpCircle } from "lucide-react";

interface PokemonCardProps {
  pokemon: Pokemon | null;
  isPlayer?: boolean; // Define se é o card do jogador ou da CPU
  isRevealed?: boolean; // Se o card da CPU deve ser mostrado
  onSelectAttribute?: (attr: keyof Pokemon["attributes"]) => void;
  disabled?: boolean;
}

// Mapa de cores para cada tipo de Pokémon
const typeColors: Record<string, string> = {
  fire: "bg-orange-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-500",
  psychic: "bg-purple-500",
  ice: "bg-cyan-400",
  dragon: "bg-indigo-600",
  dark: "bg-gray-800",
  fairy: "bg-pink-400",
  normal: "bg-gray-400",
  fighting: "bg-red-700",
  flying: "bg-sky-400",
  poison: "bg-violet-600",
  ground: "bg-amber-700",
  rock: "bg-stone-500",
  bug: "bg-lime-600",
  ghost: "bg-purple-800",
  steel: "bg-slate-400",
};

export function PokemonCard({
  pokemon,
  isPlayer,
  isRevealed = true,
  onSelectAttribute,
  disabled = false,
}: PokemonCardProps) {
  // Estado de Carregamento ou Vazio
  if (!pokemon) {
    return (
      <div className="w-64 h-96 rounded-xl bg-slate-800/50 animate-pulse border border-slate-700" />
    );
  }

  // Estado "Carta Virada" (Oculta da CPU)
  if (!isRevealed && !isPlayer) {
    return (
      <div className="w-64 h-96 rounded-xl bg-indigo-950 border-4 border-indigo-500 flex items-center justify-center relative overflow-hidden shadow-2xl transform transition-all hover:scale-105">
        <div className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png')] bg-center bg-no-repeat opacity-10 scale-150 animate-spin-slow" />
        <HelpCircle size={64} className="text-indigo-400 animate-bounce" />
      </div>
    );
  }

  // Define a cor principal baseada no primeiro tipo do Pokémon
  const mainType = pokemon.types[0];
  const colorClass = typeColors[mainType] || "bg-gray-500";

  return (
    <div
      className={cn(
        "w-72 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 border-2 border-slate-700/50 relative group",
        "bg-slate-900/80 backdrop-blur-sm",
        isPlayer ? "hover:-translate-y-2 hover:shadow-indigo-500/20" : ""
      )}
    >
      {/* Cabeçalho com Imagem e Fundo Colorido */}
      <div className={cn("h-40 relative flex items-center justify-center", colorClass)}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90" />
        
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-40 h-40 object-contain z-10 drop-shadow-2xl group-hover:scale-110 transition-transform duration-300"
        />
        
        <span className="absolute top-2 right-2 text-white/50 text-xs font-bold">
          #{String(pokemon.id).padStart(3, "0")}
        </span>
      </div>

      {/* Corpo do Card */}
      <div className="p-4 pt-0 relative z-10">
        <div className="text-center mb-4 -mt-6">
          <h2 className="text-2xl font-bold capitalize text-white drop-shadow-md">
            {pokemon.name}
          </h2>
          <div className="flex justify-center gap-2 mt-1">
            {pokemon.types.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-xs rounded-full bg-slate-800/80 text-slate-200 border border-slate-600 capitalize"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Lista de Atributos */}
        <div className="space-y-2">
            {/* Função auxiliar para renderizar cada linha de atributo */}
          {[
            { key: "hp", label: "HP", icon: Heart, color: "text-red-400" },
            { key: "attack", label: "Attack", icon: Sword, color: "text-orange-400" },
            { key: "defense", label: "Defense", icon: Shield, color: "text-blue-400" },
            { key: "speed", label: "Speed", icon: Zap, color: "text-yellow-400" },
          ].map((stat) => (
            <button
              key={stat.key}
              disabled={!isPlayer || disabled}
              onClick={() => isPlayer && onSelectAttribute?.(stat.key as keyof Pokemon["attributes"])}
              className={cn(
                "w-full flex items-center justify-between p-2 rounded-lg transition-colors border border-transparent",
                // Só permite hover e click se for o jogador
                isPlayer && !disabled
                  ? "hover:bg-slate-700 cursor-pointer hover:border-slate-500"
                  : "cursor-default",
                "bg-slate-800/50"
              )}
            >
              <div className="flex items-center gap-2">
                <stat.icon size={16} className={stat.color} />
                <span className="text-sm text-slate-300 font-medium">
                  {stat.label}
                </span>
              </div>
              <span className="text-lg font-bold text-white">
                {pokemon.attributes[stat.key as keyof typeof pokemon.attributes]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}