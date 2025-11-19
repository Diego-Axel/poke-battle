// src/components/game/battle-board.tsx
"use client";

import { useState, useEffect } from "react";
import { Pokemon } from "@/types";
import { PokemonCard } from "./pokemon-card";
import { cn } from "@/lib/utils";
import { Trophy, Skull, Swords, LogOut, RotateCcw, Flame } from "lucide-react";
import { useRouter } from "next/navigation";

interface BattleBoardProps {
  playerPokemon: Pokemon;
  opponentPokemon: Pokemon;
}

export function BattleBoard({ playerPokemon, opponentPokemon }: BattleBoardProps) {
  const router = useRouter();
  const [isRevealed, setIsRevealed] = useState(false);
  const [winner, setWinner] = useState<"player" | "opponent" | "draw" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // NOVO ESTADO: Contador de Vitórias
  const [wins, setWins] = useState(0);

  // Resetar quando o oponente muda
  useEffect(() => {
    setWinner(null);
    setIsRevealed(false);
    setIsLoading(false);
  }, [opponentPokemon?.id]);

  function handleAttack(attribute: keyof Pokemon["attributes"]) {
    const playerValue = playerPokemon.attributes[attribute];
    const opponentValue = opponentPokemon.attributes[attribute];

    setIsRevealed(true);

    if (playerValue > opponentValue) {
      setWinner("player");
      setWins((prev) => prev + 1); // AQUI: Aumenta o contador se ganhar
    } else if (opponentValue > playerValue) {
      setWinner("opponent");
      // Não zeramos aqui para mostrar o score final na tela de derrota
    } else {
      setWinner("draw");
    }
  }

  function handleContinue() {
    setIsLoading(true);
    router.refresh(); 
  }

  function handleExit() {
    router.push("/");
  }

  function handleRematch() {
    setWinner(null);
    setIsRevealed(false);
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-6xl mx-auto gap-12">
      
      {/* PLACAR DE VITÓRIAS (NOVO) */}
      {/* Fica no topo direito, destacado */}
      <div className="absolute -top-20 right-4 md:right-0 flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-6 py-3 rounded-full border border-yellow-500/30 shadow-xl">
        <div className="bg-yellow-500/20 p-2 rounded-full">
            <Flame className="text-yellow-500 fill-yellow-500 animate-pulse" size={24} />
        </div>
        <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Sequência</span>
            <span className="text-2xl font-black text-white leading-none">{wins}</span>
        </div>
      </div>

      {/* Área de Status da Rodada */}
      <div className="h-24 flex items-center justify-center w-full">
        {!winner ? (
          <h2 className="text-2xl text-slate-300 animate-pulse font-light text-center">
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

      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-24">
        {/* Jogador */}
        <div className="relative group">
            <div className="absolute -top-12 left-0 right-0 text-center text-blue-400 font-bold tracking-widest">VOCÊ</div>
            {/* Efeito visual se estiver ganhando muito */}
            {wins > 2 && (
                <div className="absolute -inset-4 bg-yellow-500/20 rounded-[2rem] blur-xl animate-pulse -z-10" />
            )}
            <PokemonCard 
                pokemon={playerPokemon} 
                isPlayer 
                disabled={!!winner} 
                onSelectAttribute={handleAttack}
            />
        </div>

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

      {/* Botões Condicionais */}
      {winner && (
        <div className="mt-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
          
          {/* Vitória */}
          {winner === "player" && (
            <button
              onClick={handleContinue}
              disabled={isLoading}
              className="px-12 py-4 bg-green-600 hover:bg-green-500 text-whiteyb rounded-2xl font-bold text-xl flex items-center gap-3 transition-all hover:scale-105 shadow-lg shadow-green-500/30 text-white"
            >
              {isLoading ? (
                <span>Procurando Oponente...</span>
              ) : (
                <>
                  <Swords size={28} />
                  Continuar (Vitória #{wins + 1})
                </>
              )}
            </button>
          )}

          {/* Derrota */}
          {winner === "opponent" && (
            <div className="flex flex-col items-center gap-4">
              <p className="text-slate-400 text-sm">
                Fim de jogo! Você conseguiu {wins} vitória{wins !== 1 && "s"} consecutiva{wins !== 1 && "s"}.
              </p>
              <button
                onClick={handleExit}
                className="px-12 py-4 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-bold text-xl flex items-center gap-3 transition-all hover:scale-105 shadow-lg shadow-red-500/30"
              >
                <LogOut size={28} />
                Sair da Batalha
              </button>
            </div>
          )}

          {/* Empate */}
          {winner === "draw" && (
            <button
              onClick={handleRematch}
              className="px-8 py-3 bg-yellow-600 hover:bg-yellow-500 text-white rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105"
            >
              <RotateCcw size={20} />
              Desempatar
            </button>
          )}

        </div>
      )}
    </div>
  );
}