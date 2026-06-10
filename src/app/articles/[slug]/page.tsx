import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllSlugs, getAllArticles } from '@/lib/articles';
import BackToTop from '@/components/BackToTop';
import ReadingProgress from '@/components/ReadingProgress';
import AdSlot from '@/components/AdSlot';
import { remark } from 'remark';
import html from 'remark-html';

interface Props { params: Promise<{ slug: string }>; }

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title, description: article.excerpt, keywords: article.keywords,
    openGraph: { title: article.title, description: article.excerpt, type: 'article', publishedTime: article.date },
    alternates: { canonical: '/articles/' + slug },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const processed = await remark().use(html).process(article.content);
  const contentHtml = processed.toString();

  const paragraphs = contentHtml.split('</p>');
  const mid = Math.floor(paragraphs.length / 2);
  const firstHalf = paragraphs.slice(0, mid).join('</p>') + '</p>';
  const secondHalf = paragraphs.slice(mid).join('</p>');

  const related = getAllArticles().filter(a => a.category === article.category && a.slug !== slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: article.title, description: article.excerpt,
    datePublished: article.date,
    author: { '@type': 'Organization', name: 'HomeOrg Guides' },
    publisher: { '@type': 'Organization', name: 'HomeOrg Guides' },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://homeorg-guides.vercel.app' },
      { '@type': 'ListItem', position: 2, name: article.category, item: 'https://homeorg-guides.vercel.app/category/' + article.category.toLowerCase().replace(/\s+/g, '-') },
      { '@type': 'ListItem', position: 3, name: article.title },
    ],
  };

  return (<ReadingProgress />
    
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="max-w-3xl mx-auto px-6 py-8 bg-[#0A0F1A]">
        <nav className="text-sm text-slate-600 mb-6">
          <a href="/" className="hover:text-blue-400 transition-colors">Home</a>
          <span className="mx-2">/</span>
          <a href={'/category/' + article.category.toLowerCase().replace(/\s+/g, '-')} className="hover:text-blue-400 transition-colors">
            {article.category}
          </a>
          <span className="mx-2">/</span>
          <span className="text-slate-300">{article.title}</span>
        </nav>

        <header className="mb-10">
          <span className="text-xs font-bold text-blue-400 bg-blue-900/20 px-3 py-1 rounded-lg">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mt-4 mb-4 leading-tight tracking-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <time dateTime={article.date}>{article.date}</time>
            <span>&middot;</span>
            <span>{article.readTime} min read</span>
          </div>
        </header>

        <div className="prose prose-invert prose-lg max-w-none
          prose-headings:text-slate-200
          prose-p:text-slate-300 prose-p:leading-relaxed
          prose-strong:text-slate-100
          prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
          prose-img:rounded-lg prose-img:shadow-lg prose-img:border prose-img:border-slate-700/30
          prose-li:text-slate-300 prose-li:marker:text-blue-500
          prose-code:text-blue-300 prose-code:bg-slate-800 prose-code:px-1 prose-code:rounded"
          dangerouslySetInnerHTML={{ __html: firstHalf }} />

        <AdSlot id={'article-mid-' + slug} />

        <div className="prose prose-invert prose-lg max-w-none
          prose-headings:text-slate-200
          prose-p:text-slate-300 prose-p:leading-relaxed
          prose-strong:text-slate-100
          prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
          prose-img:rounded-lg prose-img:shadow-lg prose-img:border prose-img:border-slate-700/30
          prose-li:text-slate-300 prose-li:marker:text-blue-500"
          dangerouslySetInnerHTML={{ __html: secondHalf }} />

        <AdSlot id={'article-bottom-' + slug} />

        {related.length > 0 && (
          <section className="mt-16 pt-10 border-t border-slate-700/30">
            <h2 className="text-xl font-bold text-slate-200 mb-6">Related Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map(r => (
                <a key={r.slug} href={'/articles/' + r.slug}
                  className="bg-[#1E293B] border border-slate-700/30 rounded-lg p-4 hover:border-blue-500/50 hover:bg-[#233044] transition group">
                  <span className="text-xs font-bold text-blue-400 bg-blue-900/20 px-2 py-0.5 rounded">{r.category}</span>
                  <h3 className="font-bold text-sm text-slate-100 mt-2 line-clamp-2 group-hover:text-blue-300 transition-colors">{r.title}</h3>
                  <p className="text-xs text-slate-600 mt-2">{r.date} &middot; {r.readTime} min</p>
                </a>
              ))}
            </div>
          </section>
        )}
      </article>
      <BackToTop />
    </>
  );
}
