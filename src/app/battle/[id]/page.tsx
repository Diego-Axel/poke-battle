import { fetchBattlePokemons } from "@/lib/api";
import { BattleBoard } from "@/components/game/battle-board";

interface BattlePageProps {
  params: {
    id: string;
  };
  // O Next.js injeta os query params aqui automaticamente
  searchParams: {
    player?: string;
  };
}

export default async function BattlePage({ params, searchParams }: BattlePageProps) {
  // Converte a string "25" para número 25 ou undefined
  const playerId = searchParams.player ? Number(searchParams.player) : undefined;

  // Passamos o ID escolhido para a função
  const [playerPokemon, opponentPokemon] = await fetchBattlePokemons(playerId);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-[url('/grid.svg')] bg-center pt-20">
       <BattleBoard 
          playerPokemon={playerPokemon} 
          opponentPokemon={opponentPokemon} 
       />
    </main>
  );
}