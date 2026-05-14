import { useStore } from '../store/useStore';
import { credibilityTiers } from '../data/diseases';
import Section from '../components/Section';
import Card from '../components/Card';

interface SourcesProps {
  onNavigate?: (path: string) => void;
}

const sourceLinks = [
  { category: 'Global Health Organizations', sources: [
    { name: 'World Health Organization', url: 'https://www.who.int/', tier: 1 },
    { name: 'WHO Disease Outbreak News', url: 'https://www.who.int/emergencies/disease-outbreak-news', tier: 1 },
    { name: 'Africa CDC', url: 'https://africacdc.org/', tier: 1 },
    { name: 'European CDC', url: 'https://www.ecdc.europa.eu/', tier: 1 },
    { name: 'PAHO', url: 'https://www.paho.org/', tier: 1 },
  ]},
  { category: 'National Health Agencies', sources: [
    { name: 'U.S. CDC', url: 'https://www.cdc.gov/', tier: 1 },
    { name: 'CDC Avian Influenza', url: 'https://www.cdc.gov/flu/avianflu/', tier: 1 },
    { name: 'UK Health Security Agency', url: 'https://www.gov.uk/government/organisations/uk-health-security-agency', tier: 1 },
    { name: 'Robert Koch Institute', url: 'https://www.rki.de/', tier: 1 },
    { name: 'Nigeria CDC', url: 'https://ncdc.gov.ng/', tier: 2 },
    { name: 'Japan NIID', url: 'https://www.niid.go.jp/', tier: 1 },
    { name: 'NICD South Africa', url: 'https://www.nicd.ac.za/', tier: 2 },
    { name: 'Australia Health', url: 'https://www.health.gov.au/', tier: 1 },
    { name: 'Public Health Canada', url: 'https://www.canada.ca/en/public-health.html', tier: 1 },
    { name: 'Sante Publique France', url: 'https://www.santepubliquefrance.fr/', tier: 1 },
  ]},
  { category: 'Research & Data', sources: [
    { name: 'Johns Hopkins CSSE', url: 'https://systems.jhu.edu/', tier: 1 },
    { name: 'IHME', url: 'https://www.healthdata.org/', tier: 1 },
    { name: 'Our World in Data', url: 'https://ourworldindata.org/', tier: 1 },
    { name: 'GISAID', url: 'https://gisaid.org/', tier: 1 },
    { name: 'Nextstrain', url: 'https://nextstrain.org/', tier: 1 },
    { name: 'icddr,b', url: 'https://www.icddrb.org/', tier: 2 },
  ]},
  { category: 'Medical Journals', sources: [
    { name: 'The Lancet', url: 'https://www.thelancet.com/', tier: 1 },
    { name: 'NEJM', url: 'https://www.nejm.org/', tier: 1 },
    { name: 'Nature', url: 'https://www.nature.com/', tier: 1 },
    { name: 'Science', url: 'https://www.science.org/', tier: 1 },
    { name: 'JAMA', url: 'https://jamanetwork.com/', tier: 1 },
    { name: 'BMJ', url: 'https://www.bmj.com/', tier: 1 },
    { name: 'EID Journal', url: 'https://wwwnc.cdc.gov/eid/', tier: 1 },
  ]},
  { category: 'Humanitarian', sources: [
    { name: 'MSF', url: 'https://www.msf.org/', tier: 1 },
    { name: 'ICRC', url: 'https://www.icrc.org/', tier: 1 },
    { name: 'UNICEF', url: 'https://www.unicef.org/', tier: 1 },
    { name: 'GAVI', url: 'https://www.gavi.org/', tier: 1 },
  ]},
];

const scoringFactors = [
  { icon: 'authority', name: 'Institutional Authority', weight: '20 points', description: 'Is the source backed by a government or international body with a legal mandate for surveillance?' },
  { icon: 'science', name: 'Scientific Rigor', weight: '20 points', description: 'Does the source use peer-reviewed methodology and transparent data collection practices?' },
  { icon: 'accuracy', name: 'Historical Accuracy', weight: '20 points', description: 'What is the source\'s track record for accuracy? Have past reports been verified?' },
  { icon: 'time', name: 'Timeliness', weight: '15 points', description: 'How quickly does the source report new data? Are there delays between events and publication?' },
  { icon: 'link', name: 'Cross-referencing', weight: '15 points', description: 'Can the data be independently verified through other credible sources?' },
  { icon: 'transparency', name: 'Transparency', weight: '10 points', description: 'Does the source publish its methodology, limitations, and correction history?' },
];

const ScoringIcon = ({ type, color }: { type: string; color: string }) => {
  const icons: Record<string, JSX.Element> = {
    authority: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01M9 13h.01M15 13h.01"/>
      </svg>
    ),
    science: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M9 3v6l-4 8h14l-4-8V3M9 3h6M7 17l2.5 4h5L17 17"/>
        <circle cx="10" cy="12" r="1" fill={color}/>
        <circle cx="14" cy="14" r="1" fill={color}/>
      </svg>
    ),
    accuracy: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
      </svg>
    ),
    time: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    link: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
    transparency: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  };
  return icons[type] || null;
};

export default function Sources({ onNavigate: _onNavigate }: SourcesProps) {
  const { darkMode } = useStore();

  const textPrimary = darkMode ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = darkMode ? '#A1A1A6' : '#6E6E73';
  const textTertiary = darkMode ? '#6E6E73' : '#86868B';

  const getTierColor = (tier: number) => {
    if (tier === 1) return '#34C759';
    if (tier === 2) return '#007AFF';
    return '#FF9500';
  };

  return (
    <div style={{ backgroundColor: darkMode ? '#000' : '#FFF' }}>
      {/* Hero with stylistic background elements */}
      <div className="pt-[52px] relative overflow-hidden" style={{ backgroundColor: darkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
        {/* Decorative symbols */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute top-20 left-10 opacity-[0.03]" width="120" height="120" viewBox="0 0 100 100" fill={textPrimary}>
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none"/>
            <circle cx="50" cy="20" r="12"/>
            <circle cx="24" cy="65" r="12"/>
            <circle cx="76" cy="65" r="12"/>
            <circle cx="50" cy="50" r="8"/>
          </svg>
          <svg className="absolute top-32 right-20 opacity-[0.03]" width="80" height="80" viewBox="0 0 24 24" fill={textPrimary}>
            <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 18.5L4 16V8.5l8 4v8zm0-10L4.5 7 12 3.5 19.5 7 12 10.5z"/>
          </svg>
          <svg className="absolute bottom-20 left-1/4 opacity-[0.02]" width="150" height="150" viewBox="0 0 100 100" fill={textPrimary}>
            <path d="M50 5L5 30v40l45 25 45-25V30L50 5zm0 15l30 17v30L50 85 20 67V37l30-17z"/>
          </svg>
          <svg className="absolute top-1/2 right-10 opacity-[0.02]" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke={textPrimary} strokeWidth="0.5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
        </div>
        
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-24 text-center relative">
          {/* Biohazard icon */}
          <div className="mb-6 flex justify-center">
            <svg width="48" height="48" viewBox="0 0 100 100" fill="none" stroke={darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'} strokeWidth="2">
              <circle cx="50" cy="50" r="8"/>
              <path d="M50 15 A35 35 0 0 1 80 65 L50 50 Z"/>
              <path d="M80 65 A35 35 0 0 1 20 65 L50 50 Z"/>
              <path d="M20 65 A35 35 0 0 1 50 15 L50 50 Z"/>
            </svg>
          </div>
          <p className="text-[12px] uppercase tracking-[0.1em] font-medium mb-4" style={{ color: textTertiary }}>
            OUR FRAMEWORK
          </p>
          <h1 className="text-[36px] md:text-[48px] font-bold tracking-tight" style={{ color: textPrimary, letterSpacing: '-0.025em' }}>
            How we evaluate credibility.
          </h1>
          <p className="text-[17px] md:text-[19px] mt-5 max-w-[600px] mx-auto leading-relaxed" style={{ color: textSecondary }}>
            Every piece of data on Pandemos comes from a named source. Every source is evaluated on six factors and assigned a tier from 1 to 5.
          </p>
        </div>
      </div>

      {/* Quick Links to All Sources */}
      <Section label="ALL SOURCES" heading="Direct links to our sources" body="Click any source to visit the official website">
        <div className="max-w-[1200px] mx-auto space-y-8">
          {sourceLinks.map((cat) => (
            <div key={cat.category}>
              <h3 className="text-[15px] font-semibold mb-4" style={{ color: textPrimary }}>{cat.category}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.sources.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] transition-all hover:scale-105"
                    style={{
                      backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                      border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)',
                      color: textPrimary,
                      textDecoration: 'none',
                    }}
                  >
                    {s.name}
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${getTierColor(s.tier)}20`, color: getTierColor(s.tier) }}>
                      T{s.tier}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Tier Sections */}
      {credibilityTiers.map((tier, i) => (
        <Section key={tier.tier} alt={i % 2 === 1}>
          <div className="text-center max-w-[700px] mx-auto">
            <div className="text-[56px] mb-4">{tier.icon}</div>
            <h2 className="text-[28px] font-semibold" style={{ color: textPrimary }}>
              Tier {tier.tier}: {tier.name}
            </h2>
            <p className="text-[15px] mt-2" style={{ fontFamily: 'monospace', color: textSecondary }}>
              Score: {tier.scoreRange}
            </p>
            <p className="text-[17px] mt-6 leading-relaxed" style={{ color: textSecondary }}>
              {tier.description}
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {tier.examples.map((ex) => (
                <span
                  key={ex}
                  className="text-[13px] px-4 py-2 rounded-xl"
                  style={{
                    backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                    color: textPrimary,
                    border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)',
                  }}
                >
                  {ex}
                </span>
              ))}
            </div>
            <div className="mt-8 space-y-2 max-w-[400px] mx-auto">
              {tier.criteria.map((c) => (
                <div key={c} className="flex items-center gap-2 text-[14px]">
                  <span style={{ color: '#34C759' }}>✓</span>
                  <span style={{ color: textSecondary }}>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>
      ))}

      {/* Scoring Factors */}
      <Section
        label="SCORING METHODOLOGY"
        heading="Six factors. One score."
        body="Each source is evaluated across these dimensions to produce a composite credibility score."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {scoringFactors.map((f) => (
            <Card key={f.name}>
              <div className="mb-4 flex justify-center">
                <ScoringIcon type={f.icon} color={darkMode ? '#A1A1A6' : '#6E6E73'} />
              </div>
              <h3 className="text-[17px] font-semibold" style={{ color: textPrimary }}>{f.name}</h3>
              <p className="text-[13px] mt-1" style={{ fontFamily: 'monospace', color: textTertiary }}>{f.weight}</p>
              <p className="text-[15px] mt-3 leading-relaxed" style={{ color: textSecondary }}>{f.description}</p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
