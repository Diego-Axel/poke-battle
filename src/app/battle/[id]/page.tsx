import { fetchBattlePokemons } from "@/lib/api";
import { BattleBoard } from "@/components/game/battle-board";

interface BattlePageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    player?: string;
  }>;
}

export default async function BattlePage(props: BattlePageProps) {
  // --- CORREÇÃO AQUI ---
  // OBS -> No Next.js 15, precisa aguardar (await) os parametros antes de ler
  const searchParams = await props.searchParams;
  
  // Agora consigo ler o .player
  const playerId = searchParams.player ? Number(searchParams.player) : undefined;

  // Passo o ID escolhido para a função
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