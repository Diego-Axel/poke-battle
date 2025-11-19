import { fetchBattlePokemons } from "@/lib/api";
import { BattleBoard } from "@/components/game/battle-board";

interface BattlePageProps {
  params: {
    id: string;
  };
}

export default async function BattlePage({ params }: BattlePageProps) {
  // 1. Busca os dados no servidor (Server-side Data Fetching)
  // Isso acontece ANTES da página ser enviada para o navegador
  const [playerPokemon, opponentPokemon] = await fetchBattlePokemons();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-[url('/grid.svg')] bg-center">
       {/* Passamos os dados prontos para o componente interativo */}
       <BattleBoard 
          playerPokemon={playerPokemon} 
          opponentPokemon={opponentPokemon} 
       />
    </main>
  );
}