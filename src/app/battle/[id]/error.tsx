"use client"; // Error components precisam ser Client Components

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Opcional: Logar o erro num serviço de análise
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4 text-center">
      <div className="p-4 bg-red-500/10 rounded-full animate-bounce">
        <AlertTriangle className="w-12 h-12 text-red-500" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">Algo deu errado na Arena!</h2>
        <p className="text-slate-400 max-w-md">
          A PokeAPI não respondeu ou não encontrou o Pokémon. Isso acontece com APIs públicas gratuitas às vezes.
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => reset()} // Tenta carregar a mesma página de novo
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center gap-2 transition-all"
        >
          <RefreshCcw size={20} />
          Tentar Novamente
        </button>

        <Link
          href="/"
          className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all border border-slate-700"
        >
          Voltar ao Menu
        </Link>
      </div>
    </div>
  );
}