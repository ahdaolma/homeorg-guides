'use client';

import { useState } from 'react';

export default function SearchBar({ placeholder = 'Search organization tips...', className = '' }: { placeholder?: string; className?: string }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = '/search?q=' + encodeURIComponent(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 rounded-lg bg-[#1E293B] border border-slate-600 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
        />
        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-400 p-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
      </div>
    </form>
  );
}
