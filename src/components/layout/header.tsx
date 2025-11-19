// src/components/layout/header.tsx
import Link from "next/link";
import { Gamepad2, BookOpen } from "lucide-react";

export function Header() {
  return (
    <header className="w-full absolute top-0 z-50 border-b border-white/5 bg-black/20 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo com Cores Pokémon */}
        <Link href="/" className="group flex items-center gap-2 text-xl font-black tracking-tight text-white transition-colors">
          <div className="relative bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Gamepad2 size={24} className="text-white drop-shadow-md" />
            {/* Brilho do botão da Pokedex */}
            <div className="absolute top-1 right-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          </div>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 group-hover:to-white">
            PokeBattle
          </span>
        </Link>

        {/* Menu de Navegação */}
        <nav className="flex items-center gap-6">
          <Link 
            href="/" 
            className="text-sm font-bold text-slate-400 hover:text-yellow-400 transition-colors"
          >
            ARENA
          </Link>
          
          <Link 
            href="/pokedex" 
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 hover:text-blue-300 transition-all hover:scale-105 text-sm font-bold border border-blue-500/30 hover:border-blue-400"
          >
            <BookOpen size={16} />
            <span>POKEDEX</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}