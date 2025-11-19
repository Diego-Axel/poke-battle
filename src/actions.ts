"use server";

import { redirect } from "next/navigation";

export async function startBattle() {
  // Gera um ID aleatório para a sala de batalha (simbólico por enquanto)
  const battleId = Math.floor(Math.random() * 1000000);
  
  // Redireciona o usuário para a arena
  redirect(`/battle/${battleId}`);
}