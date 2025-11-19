import Link from "next/link";
import { Gamepad2, BookOpen } from "lucide-react";

export function Header() {
  return (
    <header className="w-full absolute top-0 z-50 border-b border-white/10 bg-slate-900/50 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white hover:text-indigo-400 transition-colors">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <Gamepad2 size={20} className="text-white" />
          </div>
          <span>PokeBattle</span>
        </Link>

        {/* Menu de Navegação */}
        <nav className="flex items-center gap-6">
          <Link 
            href="/" 
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Batalhar
          </Link>
          
          <Link 
            href="/pokedex" 
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all hover:scale-105 text-sm font-bold border border-slate-700"
          >
            <BookOpen size={16} />
            Pokedex (SSG)
          </Link>
        </nav>
      </div>
    </header>
  );
}