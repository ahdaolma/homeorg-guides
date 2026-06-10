import type { ArticleMeta } from '@/lib/articles';

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <a href={'/articles/' + article.slug}
      className="bg-[#1E293B] rounded-xl border border-slate-700/30 p-6 hover:border-blue-500/50 hover:bg-[#233044] hover:shadow-lg transition block group">
      <span className="text-xs font-bold text-blue-400 bg-blue-900/20 px-2 py-0.5 rounded">
        {article.category}
      </span>
      <h3 className="text-lg font-bold text-slate-100 mt-3 mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
        {article.title}
      </h3>
      <p className="text-sm text-slate-400 line-clamp-3">{article.excerpt}</p>
      <div className="flex items-center gap-2 mt-4 text-xs text-slate-600">
        <span>{article.date}</span>
        <span>&middot;</span>
        <span>{article.readTime} min</span>
      </div>
    </a>
  );
}
