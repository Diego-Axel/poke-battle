import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header"; // Importamos o Header

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PokeBattle - Jogo de Cartas",
  description: "Batalhe com a CPU usando atributos Pokémon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {/* O Header fica aqui, fora do children, para aparecer sempre */}
        <Header />
        
        {/* Adicionamos um padding-top (pt-16) para o conteúdo não ficar escondido atrás do Header fixo */}
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}