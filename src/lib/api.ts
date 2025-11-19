// src/lib/api.ts
import { Pokemon, PokemonAPIResponse } from "@/types";

// Limitamos para a Geração 1 para ser mais leve
const MAX_POKEMON_ID = 151;

function getRandomId() {
  return Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
}

function formatPokemonData(data: PokemonAPIResponse): Pokemon {
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other["official-artwork"].front_default,
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
// Se a API falhar, usamos estes dados para o jogo não quebrar
const FALLBACK_POKEMONS: Record<number, Pokemon> = {
  1: {
    id: 6,
    name: "charizard (offline)",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
    types: ["fire", "flying"],
    attributes: { hp: 78, attack: 84, defense: 78, speed: 100 }
  },
  2: {
    id: 9,
    name: "blastoise (offline)",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
    types: ["water"],
    attributes: { hp: 79, attack: 83, defense: 100, speed: 78 }
  }
};

export async function getPokemon(id: number): Promise<Pokemon> {
  try {
    // Tenta buscar na API com timeout de 5 segundos (para não ficar travado carregando)
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
    
    // Se deu erro, retorna um dos pokémons de backup baseado se o ID é par ou ímpar
    return id % 2 === 0 ? FALLBACK_POKEMONS[2] : FALLBACK_POKEMONS[1];
  }
}

// 1. NOVA FUNÇÃO: Busca os candidatos para o usuário escolher
export async function fetchStarterOptions(): Promise<Pokemon[]> {
  // Vamos dar 6 opções clássicas
  const starterIds = [1, 4, 7, 25, 133, 150]; // Bulbasaur, Charmander, Squirtle, Pikachu, Eevee, Mewtwo
  
  // Busca todos em paralelo
  return await Promise.all(starterIds.map(id => getPokemon(id)));
}

// 2. ATUALIZAR: Agora aceita um "playerId" opcional
export async function fetchBattlePokemons(playerId?: number): Promise<[Pokemon, Pokemon]> {
  // Se o usuário escolheu um ID, usamos ele. Se não, sorteamos.
  const p1Id = playerId || getRandomId();
  
  let p2Id = getRandomId();

  // Garante que a CPU não escolha o mesmo que o jogador
  while (p1Id === p2Id) {
    p2Id = getRandomId();
  }

  const [poke1, poke2] = await Promise.all([getPokemon(p1Id), getPokemon(p2Id)]);

  return [poke1, poke2];
}

export async function fetchPokedex(): Promise<Pokemon[]> {
  // Vamos buscar os iniciais (Bulbasaur, Charmander, Squirtle) + Pikachu + Mewtwo + Dragonite
  const ids = [1, 4, 7, 25, 150, 149];

  // Busca todos em paralelo
  // Como nossa função getPokemon já tem tratamento de erro, 
  // se a API falhar, ele vai retornar os "dublês" sem quebrar a build.
  const pokemons = await Promise.all(ids.map((id) => getPokemon(id)));

  return pokemons;
}

// NOVA FUNÇÃO: Busca a lista leve dos 151 primeiros
export async function fetchGen1List(): Promise<Pokemon[]> {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await res.json();

  // Mapeia os resultados simples para o nosso formato
  return data.results.map((entry: any, index: number) => {
    const id = index + 1; // O index começa em 0, então somamos 1
    return {
      id: id,
      name: entry.name,
      // Geramos o link da imagem manualmente para não precisar fazer 151 requests
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      types: [], // Não precisamos disso na seleção
      attributes: { hp: 0, attack: 0, defense: 0, speed: 0 } // Nem disso
    };
  });
}