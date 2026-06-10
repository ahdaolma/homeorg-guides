import { getAllArticles, getCategories } from '@/lib/articles';
import AdSlot from '@/components/AdSlot';
import PopularArticles from '@/components/PopularArticles';

const rooms = [
  { emoji: '🛋️', name: 'Living Room', count: 15 },
  { emoji: '🍳', name: 'Kitchen', count: 18 },
  { emoji: '🛏️', name: 'Bedroom', count: 12 },
  { emoji: '🚿', name: 'Bathroom', count: 8 },
  { emoji: '🚗', name: 'Garage', count: 10 },
  { emoji: '👔', name: 'Closet', count: 14 },
  { emoji: '💻', name: 'Office', count: 6 },
  { emoji: '🧺', name: 'Laundry', count: 4 },
  { emoji: '🎮', name: 'Kids', count: 5 },
  { emoji: '🌿', name: 'Garden', count: 3 },
];

export default async function HomePage() {
  const articles = getAllArticles();
  const categories = getCategories();

  return (
    <>
      {/* Hero - Clean Grid */}
      <section className="border-b border-slate-700/30" style={{background: 'linear-gradient(180deg, #0F172A 0%, #1A2740 100%)'}}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900/20 border border-blue-700/20 rounded mb-6">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="text-blue-300 text-xs font-medium tracking-wide">100+ GUIDES · ROOM BY ROOM</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight" style={{color: '#F1F5F9'}}>
                Your home,<br/><span style={{color: '#60A5FA'}}>organized</span>
              </h1>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Room-by-room organization systems, decluttering strategies, and storage solutions that actually work.
              </p>
              <div className="flex gap-3">
                <a href="/articles" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition text-sm">
                  Start Organizing →
                </a>
                <a href="#rooms" className="px-6 py-3 border border-slate-600 hover:border-blue-500 text-slate-300 font-semibold rounded-lg transition text-sm">
                  Browse Rooms
                </a>
              </div>
            </div>
            <div className="hidden md:grid grid-cols-3 gap-2">
              {rooms.slice(0, 9).map(r => (
                <a key={r.name} href="#rooms" className="clean-card p-3 text-center hover:-translate-y-1">
                  <span className="text-2xl block mb-1">{r.emoji}</span>
                  <span className="text-xs text-slate-400">{r.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        {/* Room Navigator */}
        <section id="rooms" className="my-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-200 m-0">🏠 Browse by Room</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-3">
            {rooms.map(r => (
              <a key={r.name} href={`/category/${r.name.toLowerCase().replace(/\s+/g, '-')}`} className="clean-card p-4 text-center hover:-translate-y-1 transition-transform">
                <span className="text-3xl block mb-2">{r.emoji}</span>
                <span className="font-semibold text-xs text-slate-300">{r.name}</span>
                <span className="text-xs text-slate-600 block mt-1">{r.count}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Quick Start Checklist */}
        <section className="my-16 bg-[#1A2740] border border-slate-700/30 rounded-xl p-8">
          <h2 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2 m-0">✅ Start Here: 5-Minute Wins</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { step: '01', title: 'Declutter Your Kitchen Counter', desc: 'Remove everything, keep only daily essentials', slug: 'kitchen-counter-clutter-solutions' },
              { step: '02', title: 'Organize Your Closet', desc: 'The 5-step system that doubles your space', slug: 'closet-organization-system' },
              { step: '03', title: 'Fix Your Junk Drawer', desc: '$8 tray turns chaos into order', slug: 'kitchen-junk-drawer-solution' },
            ].map(item => (
              <a key={item.step} href={`/articles/${item.slug}`} className="checklist-item group cursor-pointer hover:border-blue-500 transition-colors">
                <span className="text-2xl font-bold text-blue-500">{item.step}</span>
                <div>
                  <p className="font-semibold text-sm text-slate-200 group-hover:text-blue-400 transition-colors">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <AdSlot id='home-top' />

        {/* Categories Grid */}
        <section id='categories' className='my-16'>
          <h2 className="text-2xl font-bold text-slate-200 mb-8">📚 All Topics</h2>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3'>
            {categories.map(cat => (
              <a key={cat.slug} href={'/category/' + cat.slug} className='clean-card p-5 text-center hover:border-blue-500 transition-colors'>
                <span className='text-2xl block mb-3'>{cat.icon}</span>
                <span className='font-semibold text-sm text-slate-300'>{cat.name}</span>
                <span className='text-xs text-slate-600 block mt-1'>{cat.count}</span>
              </a>
            ))}
          </div>
        </section>

        <AdSlot id='home-middle' />

        <PopularArticles />

        {/* Latest */}
        <section className='my-16'>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-200 m-0">🆕 Latest Guides</h2>
            <a href="/articles" className="text-blue-400 text-sm font-medium hover:text-blue-300">View all →</a>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {articles.slice(0, 9).map(article => (
              <a key={article.slug} href={'/articles/' + article.slug} className='clean-card p-6 hover:border-blue-500 transition-colors'>
                <span className="text-xs text-blue-400 font-medium mb-2 block">{article.category}</span>
                <h3 className="font-semibold text-slate-200 mb-2 line-clamp-2 text-sm">{article.title}</h3>
                <p className="text-xs text-slate-500">{article.date} · {article.readTime} min</p>
              </a>
            ))}
          </div>
        </section>

        <AdSlot id='home-bottom' />
      </div>
    </>
  );
}
