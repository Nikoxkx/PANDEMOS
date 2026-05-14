import { useStore } from '../store/useStore';

interface FooterProps {
  onNavigate: (path: string) => void;
}

const columns = [
  {
    title: 'Platform',
    links: [
      { label: 'War Room', path: '/war-room' },
      { label: 'Disease Catalog', path: '/diseases' },
      { label: 'Learn', path: '/learn' },
      { label: 'Sources', path: '/sources' },
    ],
  },
  {
    title: 'Health Organizations',
    links: [
      { label: 'WHO', url: 'https://www.who.int/' },
      { label: 'U.S. CDC', url: 'https://www.cdc.gov/' },
      { label: 'ECDC', url: 'https://www.ecdc.europa.eu/' },
      { label: 'Africa CDC', url: 'https://africacdc.org/' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Outbreak News', url: 'https://www.who.int/emergencies/disease-outbreak-news' },
      { label: 'GISAID', url: 'https://gisaid.org/' },
      { label: 'Our World in Data', url: 'https://ourworldindata.org/' },
      { label: 'The Lancet', url: 'https://www.thelancet.com/' },
    ],
  },
];

export default function Footer({ onNavigate }: FooterProps) {
  const { darkMode } = useStore();
  
  const textSecondary = darkMode ? '#A1A1A6' : '#6E6E73';
  const textTertiary = darkMode ? '#6E6E73' : '#86868B';

  return (
    <footer 
      className="w-full"
      style={{ 
        backgroundColor: darkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(20px)',
        borderTop: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
          {columns.map((col) => (
            <div key={col.title}>
              <h4
                className="text-[12px] uppercase tracking-[0.08em] font-semibold mb-5"
                style={{ color: darkMode ? '#F5F5F7' : '#1D1D1F' }}
              >
                {col.title}
              </h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {'path' in link ? (
                      <button
                        onClick={() => onNavigate(link.path)}
                        className="text-[14px] cursor-pointer border-0 bg-transparent transition-opacity hover:opacity-70"
                        style={{ color: textSecondary, fontFamily: 'inherit' }}
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14px] transition-opacity hover:opacity-70"
                        style={{ color: textSecondary, textDecoration: 'none' }}
                      >
                        {link.label} ↗
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 mb-6" style={{ borderTop: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)' }} />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-[12px]" style={{ color: textTertiary }}>
            © {new Date().getFullYear()} PANDEMOS. Educational purposes only. Not medical advice.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Nikoxkx/PANDEMOS"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] transition-opacity hover:opacity-70"
              style={{ color: textTertiary, textDecoration: 'none' }}
            >
              GitHub ↗
            </a>
            <button
              onClick={() => onNavigate('/sources')}
              className="text-[12px] transition-opacity hover:opacity-70"
              style={{ color: textTertiary, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              All Sources
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
