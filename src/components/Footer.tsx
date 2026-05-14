interface FooterProps {
  onNavigate: (path: string) => void;
}

const columns = [
  {
    title: 'Platform',
    links: [
      { label: 'War Room', path: '/war-room' },
      { label: 'Disease Catalog', path: '/diseases' },
      { label: 'Command Center', path: '/command-center' },
      { label: 'Anatomy Explorer', path: '/anatomy' },
    ],
  },
  {
    title: 'Data',
    links: [
      { label: 'Sources', path: '/sources' },
      { label: 'Methodology', path: '/sources' },
      { label: 'API', path: '/developers' },
      { label: 'Data Downloads', path: '/developers' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'About Pandemos', path: '/learn' },
      { label: 'FAQ', path: '/learn' },
      { label: 'Privacy', path: '/learn' },
      { label: 'Accessibility', path: '/learn' },
    ],
  },
];

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="w-full" style={{ backgroundColor: '#1D1D1F' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-20 pb-10">
        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
          {columns.map((col) => (
            <div key={col.title}>
              <h4
                className="text-[13px] uppercase tracking-[0.05em] font-semibold mb-5"
                style={{ color: '#F5F5F7' }}
              >
                {col.title}
              </h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => onNavigate(link.path)}
                      className="text-[15px] font-normal cursor-pointer border-0 bg-transparent transition-colors duration-300 hover:text-white"
                      style={{ color: '#A1A1A6', fontFamily: 'inherit' }}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-12 mb-8" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }} />

        {/* Bottom */}
        <div className="text-center">
          <p className="text-[13px] mb-2" style={{ color: '#6E6E73' }}>
            PANDEMOS is not a substitute for professional medical advice. Data aggregated from public sources.
          </p>
          <p className="text-[13px]" style={{ color: '#6E6E73' }}>
            © 2024 Pandemos. All data sourced and attributed.
          </p>
        </div>
      </div>
    </footer>
  );
}
