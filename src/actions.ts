"use server";

import { redirect } from "next/navigation";

export async function startBattle(formData: FormData) {
  const battleId = Math.floor(Math.random() * 1000000);
  
  // Pega o ID que veio do input hidden
  const pokemonId = formData.get("pokemonId");

  // Monta a URL: /battle/123?player=25
  if (pokemonId) {
    redirect(`/battle/${battleId}?player=${pokemonId}`);
  } else {
    // Se não escolheu nada, vai sem parâmetro (aleatório)
    redirect(`/battle/${battleId}`);
  }
}