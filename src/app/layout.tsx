import type { Metadata } from "next";
import "./globals.css";
import SearchBar from "@/components/SearchBar";

export const metadata: Metadata = {
  metadataBase: new URL("https://homeorg-guides.vercel.app"),
  title: { default: "HomeOrg Guides | Organize Your Space 2026", template: "%s | HomeOrg Guides" },
  description: "Transform your home with expert organization guides. Decluttering strategies, storage solutions, and room-by-room systems.",
  keywords: ["home organization","decluttering","storage","closet organization","kitchen organization"],
  openGraph: { type: "website", siteName: "HomeOrg Guides", title: "HomeOrg Guides | Organize Better", description: "Room-by-room organization guides that actually work." },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6600381860016497" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0F172A]/95 border-b border-slate-700/30">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-lg">📦</span>
              <span className="text-lg font-bold tracking-tight text-slate-100">HomeOrg</span>
            </a>
            <nav className="flex gap-8 text-sm font-medium">
              <a href="/" className="text-slate-400 hover:text-blue-400 transition-colors">Home</a>
              <a href="/articles" className="text-slate-400 hover:text-blue-400 transition-colors">Guides</a>
              <a href="/#rooms" className="text-slate-400 hover:text-blue-400 transition-colors">Rooms</a>
            </nav>
            <SearchBar placeholder="Search organization..." className="w-44" />
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-700/30 bg-[#0A0F1A] py-12 mt-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-xs">📦</span>
              <span className="font-bold text-slate-300">HomeOrg Guides</span>
            </div>
            <div className="flex justify-center gap-6 text-sm text-slate-600">
              <a href="/privacy" className="hover:text-blue-400">Privacy</a>
              <a href="/terms" className="hover:text-blue-400">Terms</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

