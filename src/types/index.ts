// O que a API do Pokémon retorna (simplificado)
export interface PokemonAPIResponse {
  id: number;
  name: string;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

// O formato limpo que vou usar no Jogo
export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  attributes: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
}

// Estado da Batalha (para usar depois)
export interface BattleState {
  playerPokemon: Pokemon | null;
  opponentPokemon: Pokemon | null;
  status: "idle" | "fighting" | "finished";
  winner: "player" | "opponent" | "draw" | null;
}