import { Suspense } from "react";
import { getAllArticles } from "@/lib/articles";
import SearchResults from "./SearchResults";

export default function SearchPage() {
  const articles = getAllArticles();
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0A0F1A] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SearchResults articles={JSON.parse(JSON.stringify(articles))} />
    </Suspense>
  );
}
