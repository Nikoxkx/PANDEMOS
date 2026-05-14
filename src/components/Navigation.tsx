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
  const { darkMode, toggleDarkMode, mobileMenuOpen, setMobileMenuOpen, setSearchOpen } = useStore();

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] h-[52px] flex items-center justify-between px-6 md:px-10"
        style={{
          backgroundColor: darkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          borderBottom: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => onNavigate('/')}
          className="text-[18px] font-semibold tracking-tight cursor-pointer border-0 bg-transparent"
          style={{ color: darkMode ? '#F5F5F7' : '#1D1D1F', fontFamily: 'inherit' }}
        >
          PANDEMOS
        </button>

        {/* Center links — desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => onNavigate(link.path)}
              className="text-[13px] tracking-[0.01em] cursor-pointer border-0 bg-transparent transition-colors duration-300"
              style={{
                color: currentPath === link.path
                  ? (darkMode ? '#F5F5F7' : '#1D1D1F')
                  : (darkMode ? '#A1A1A6' : '#6E6E73'),
                fontWeight: currentPath === link.path ? 500 : 400,
                fontFamily: 'inherit',
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-5">
          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden md:block cursor-pointer border-0 bg-transparent transition-colors duration-300"
            style={{ color: darkMode ? '#A1A1A6' : '#6E6E73' }}
            aria-label="Search"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="cursor-pointer border-0 bg-transparent transition-colors duration-300"
            style={{ color: darkMode ? '#A1A1A6' : '#6E6E73' }}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden cursor-pointer border-0 bg-transparent transition-colors duration-300"
            style={{ color: darkMode ? '#A1A1A6' : '#6E6E73' }}
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-12 transition-opacity duration-300"
          style={{
            backgroundColor: darkMode ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => { onNavigate(link.path); setMobileMenuOpen(false); }}
              className="text-[22px] font-medium cursor-pointer border-0 bg-transparent transition-colors duration-300"
              style={{
                color: currentPath === link.path
                  ? (darkMode ? '#F5F5F7' : '#1D1D1F')
                  : (darkMode ? '#A1A1A6' : '#6E6E73'),
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
