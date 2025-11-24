import { Pokemon, PokemonAPIResponse } from "@/types";

// Limitei para a Geração 1 para ser mais leve
const MAX_POKEMON_ID = 151;

function getRandomId() {
  return Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
}

function formatPokemonData(data: PokemonAPIResponse): Pokemon {
  return {
    id: data.id,
    name: data.name,
    // MUDANÇA AQUI: Usando o sprite animado da Geração 5 (Black/White)
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${data.id}.gif`,
    types: data.types.map((t) => t.type.name),
    attributes: {
      hp: data.stats.find((s) => s.stat.name === "hp")?.base_stat || 50,
      attack: data.stats.find((s) => s.stat.name === "attack")?.base_stat || 50,
      defense: data.stats.find((s) => s.stat.name === "defense")?.base_stat || 50,
      speed: data.stats.find((s) => s.stat.name === "speed")?.base_stat || 50,
    },
  };
}

// --- DADOS DE SEGURANÇA (FALLBACK) ---
// Atualizei também os fallbacks para serem animados
const FALLBACK_POKEMONS: Record<number, Pokemon> = {
  1: {
    id: 6,
    name: "charizard (offline)",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/6.gif",
    types: ["fire", "flying"],
    attributes: { hp: 78, attack: 84, defense: 78, speed: 100 }
  },
  2: {
    id: 9,
    name: "blastoise (offline)",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/9.gif",
    types: ["water"],
    attributes: { hp: 79, attack: 83, defense: 100, speed: 78 }
  }
};

export async function getPokemon(id: number): Promise<Pokemon> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      cache: "no-store",
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    const data: PokemonAPIResponse = await res.json();
    return formatPokemonData(data);

  } catch (error) {
    console.error(`Erro ao buscar ID ${id}. Usando Fallback.`, error);
    return id % 2 === 0 ? FALLBACK_POKEMONS[2] : FALLBACK_POKEMONS[1];
  }
}

export async function fetchBattlePokemons(playerId?: number): Promise<[Pokemon, Pokemon]> {
  const p1Id = playerId || getRandomId();
  let p2Id = getRandomId();

  while (p1Id === p2Id) {
    p2Id = getRandomId();
  }

  const [poke1, poke2] = await Promise.all([getPokemon(p1Id), getPokemon(p2Id)]);

  return [poke1, poke2];
}

export async function fetchPokedex(): Promise<Pokemon[]> {
  const ids = [1, 4, 7, 25, 150, 149];
  const pokemons = await Promise.all(ids.map((id) => getPokemon(id)));
  return pokemons;
}

// AQUI TAMBÉM: Atualizei a lista de seleção para mostrar animados
export async function fetchGen1List(): Promise<Pokemon[]> {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await res.json();

  const allowedIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 25, 133, 150];

  const allPokemons = data.results.map((entry: { name: string; url: string }, index: number) => {
    const id = index + 1;
    return {
      id: id,
      name: entry.name,
      // MUDANÇA DO LINK AQUI TAMBÉM
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`,
      types: [], 
      attributes: { hp: 0, attack: 0, defense: 0, speed: 0 } 
    };
  });

  return allPokemons.filter((p: Pokemon) => allowedIds.includes(p.id));
}