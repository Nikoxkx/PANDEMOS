import { useStore } from '../store/useStore';

interface NavigationProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'War Room', path: '/war-room' },
  { label: 'Diseases', path: '/diseases' },
  { label: 'Command Center', path: '/command-center' },
  { label: 'Sources', path: '/sources' },
  { label: 'Learn', path: '/learn' },
];

export default function Navigation({ currentPath, onNavigate }: NavigationProps) {
  const { mobileMenuOpen, setMobileMenuOpen, setSearchOpen } = useStore();

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] h-[52px] flex items-center justify-between px-6 md:px-10"
        style={{
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <button
          onClick={() => onNavigate('/')}
          className="text-[18px] font-semibold tracking-tight cursor-pointer border-0 bg-transparent"
          style={{ color: '#F5F5F7', fontFamily: 'inherit' }}
        >
          PANDEMOS
        </button>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => onNavigate(link.path)}
              className="text-[13px] tracking-[0.01em] cursor-pointer border-0 bg-transparent transition-colors duration-300"
              style={{
                color: currentPath === link.path ? '#F5F5F7' : '#A1A1A6',
                fontWeight: currentPath === link.path ? 500 : 400,
                fontFamily: 'inherit',
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden md:block cursor-pointer border-0 bg-transparent transition-colors duration-300"
            style={{ color: '#A1A1A6' }}
            aria-label="Search"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden cursor-pointer border-0 bg-transparent"
            style={{ color: '#A1A1A6' }}
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-12"
          style={{
            background: 'rgba(0,0,0,0.95)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => { onNavigate(link.path); setMobileMenuOpen(false); }}
              className="text-[22px] font-medium cursor-pointer border-0 bg-transparent"
              style={{
                color: currentPath === link.path ? '#F5F5F7' : '#A1A1A6',
                fontFamily: 'inherit',
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
