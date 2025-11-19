"use client";

import { useState } from "react";
import { Pokemon } from "@/types";
import { PokemonCard } from "./pokemon-card";
import { cn } from "@/lib/utils";
import { Trophy, Skull, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

interface BattleBoardProps {
  playerPokemon: Pokemon;
  opponentPokemon: Pokemon;
}

export function BattleBoard({ playerPokemon, opponentPokemon }: BattleBoardProps) {
  const router = useRouter();
  const [isRevealed, setIsRevealed] = useState(false);
  const [winner, setWinner] = useState<"player" | "opponent" | "draw" | null>(null);

  // Função que roda quando o jogador escolhe um atributo
  function handleAttack(attribute: keyof Pokemon["attributes"]) {
    const playerValue = playerPokemon.attributes[attribute];
    const opponentValue = opponentPokemon.attributes[attribute];

    setIsRevealed(true); // Revela a carta do inimigo

    if (playerValue > opponentValue) {
      setWinner("player");
    } else if (opponentValue > playerValue) {
      setWinner("opponent");
    } else {
      setWinner("draw");
    }
  }

  // Função para jogar novamente (Recarrega a rota para buscar novos pokémons)
  function handlePlayAgain() {
    router.refresh(); 
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto gap-12">
      
      {/* Placar / Resultado */}
      <div className="h-24 flex items-center justify-center">
        {!winner ? (
          <h2 className="text-2xl text-slate-300 animate-pulse font-light">
            Escolha um atributo para atacar...
          </h2>
        ) : (
          <div className={cn(
            "flex items-center gap-4 px-8 py-4 rounded-full shadow-2xl border-2 animate-in zoom-in duration-300",
            winner === "player" ? "bg-green-500/20 border-green-500 text-green-400" :
            winner === "opponent" ? "bg-red-500/20 border-red-500 text-red-400" :
            "bg-yellow-500/20 border-yellow-500 text-yellow-400"
          )}>
            {winner === "player" && <Trophy size={32} />}
            {winner === "opponent" && <Skull size={32} />}
            <span className="text-3xl font-bold uppercase">
              {winner === "player" ? "Você Venceu!" : 
               winner === "opponent" ? "Você Perdeu!" : "Empate!"}
            </span>
          </div>
        )}
      </div>

      {/* Arena das Cartas */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-24">
        {/* Jogador */}
        <div className="relative">
            <div className="absolute -top-12 left-0 right-0 text-center text-blue-400 font-bold tracking-widest">VOCÊ</div>
            <PokemonCard 
                pokemon={playerPokemon} 
                isPlayer 
                disabled={!!winner} // Desabilita clique se já acabou
                onSelectAttribute={handleAttack}
            />
        </div>

        {/* VS */}
        <div className="text-4xl font-black text-slate-700 italic">VS</div>

        {/* Oponente */}
        <div className="relative">
            <div className="absolute -top-12 left-0 right-0 text-center text-red-400 font-bold tracking-widest">CPU</div>
            <PokemonCard 
                pokemon={opponentPokemon} 
                isPlayer={false} 
                isRevealed={isRevealed} 
            />
        </div>
      </div>

      {/* Botão Jogar Novamente */}
      {winner && (
        <button
          onClick={handlePlayAgain}
          className="mt-8 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold flex items-center gap-2 transition-all hover:scale-105 shadow-lg shadow-indigo-500/30"
        >
          <RefreshCw />
          Jogar Novamente
        </button>
      )}
    </div>
  );
}