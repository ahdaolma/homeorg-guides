"use client";

import { useSearchParams } from "next/navigation";
import type { ArticleMeta } from "@/lib/articles";

const ICONS: Record<string, string> = {
  Kitchen: "🍳", Bedroom: "🛏️", Closet: "👗", Garage: "🔧",
  Bathroom: "🛁", "Living Room": "🛋️", "Home Office": "💻", General: "📦",
  Decluttering: "🧹", Storage: "📦", Cleaning: "🧼",
};

function getIcon(category: string): string {
  return ICONS[category] || "📄";
}

interface Props {
  articles: ArticleMeta[];
}

export default function SearchResults({ articles }: Props) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";

  if (!query) {
    return (
      <div className="min-h-screen bg-[#0A0F1A] flex flex-col items-center justify-center px-6">
        <p className="text-slate-400 text-lg">Search hundreds of home organization guides.</p>
      </div>
    );
  }

  const lowerQuery = query.toLowerCase();

  const filtered = articles.filter((article) => {
    return (
      article.title.toLowerCase().includes(lowerQuery) ||
      article.excerpt.toLowerCase().includes(lowerQuery) ||
      article.category.toLowerCase().includes(lowerQuery) ||
      article.keywords.some((kw) => kw.toLowerCase().includes(lowerQuery))
    );
  });

  if (filtered.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A0F1A] flex flex-col items-center justify-center px-6 gap-4">
        <div className="text-5xl">🔍</div>
        <h2 className="text-xl font-semibold text-slate-100">No results found</h2>
        <p className="text-slate-400 text-center max-w-md">
          No guides matched &ldquo;{query}&rdquo;. Try a different search term.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1A]">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-sm text-slate-500 mb-8">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
        </p>

        <div className="grid gap-4">
          {filtered.map((article) => (
            <a
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="block bg-[#1E293B] border border-slate-700/30 rounded-lg p-5 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/5 group"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl flex-shrink-0 mt-0.5" role="img" aria-label={article.category}>
                  {getIcon(article.category)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="text-slate-100 font-semibold group-hover:text-blue-400 transition-colors truncate">
                      {article.title}
                    </h3>
                    <span className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {article.category}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm line-clamp-2 mb-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>{article.date}</span>
                    <span>{article.readTime} min read</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
