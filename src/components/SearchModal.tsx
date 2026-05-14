import { useState, useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { diseases } from '../data/diseases';

interface SearchModalProps {
  onNavigate: (path: string) => void;
}

export default function SearchModal({ onNavigate }: SearchModalProps) {
  const { searchOpen, setSearchOpen, darkMode } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchOpen]);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [searchOpen]);

  if (!searchOpen) return null;

  const results = query.length > 0
    ? diseases.filter(d =>
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.scientificName.toLowerCase().includes(query.toLowerCase()) ||
        d.pathogenType.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const bg = darkMode ? '#1C1C1E' : '#FFFFFF';
  const textPrimary = darkMode ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = darkMode ? '#A1A1A6' : '#6E6E73';
  const borderColor = darkMode ? '#2C2C2E' : '#D2D2D7';

  return (
    <div
      className="fixed inset-0 z-[300] flex items-start justify-center pt-[120px]"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
      onClick={() => setSearchOpen(false)}
    >
      <div
        className="w-full max-w-[560px] mx-6 rounded-2xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: bg }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-6 py-4" style={{ borderBottom: `1px solid ${borderColor}` }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={textSecondary} strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search diseases, locations, reports..."
            className="flex-1 bg-transparent border-0 outline-none text-[17px]"
            style={{ color: textPrimary, fontFamily: 'inherit' }}
          />
          <span className="text-[12px] px-2 py-1 rounded-md" style={{ color: textSecondary, backgroundColor: darkMode ? '#2C2C2E' : '#F5F5F7' }}>
            ESC
          </span>
        </div>

        {results.length > 0 && (
          <div className="max-h-[400px] overflow-y-auto">
            <div className="px-6 py-3">
              <p className="text-[12px] uppercase tracking-[0.05em] font-semibold" style={{ color: textSecondary }}>
                Diseases
              </p>
            </div>
            {results.map((disease) => (
              <button
                key={disease.id}
                onClick={() => { onNavigate(`/disease/${disease.slug}`); setSearchOpen(false); }}
                className="w-full text-left px-6 py-3 transition-colors duration-200 cursor-pointer border-0 bg-transparent"
                style={{ fontFamily: 'inherit' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = darkMode ? '#2C2C2E' : '#F5F5F7')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <p className="text-[15px] font-medium" style={{ color: textPrimary }}>{disease.name}</p>
                <p className="text-[13px] mt-1" style={{ color: textSecondary }}>
                  {disease.pathogenType} · {disease.regions.join(', ')}
                </p>
              </button>
            ))}
          </div>
        )}

        {query.length > 0 && results.length === 0 && (
          <div className="px-6 py-8 text-center">
            <p className="text-[15px]" style={{ color: textSecondary }}>No results found for "{query}"</p>
          </div>
        )}

        {query.length === 0 && (
          <div className="px-6 py-8 text-center">
            <p className="text-[15px]" style={{ color: textSecondary }}>Start typing to search…</p>
          </div>
        )}
      </div>
    </div>
  );
}
