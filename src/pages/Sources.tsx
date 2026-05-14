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
  { icon: '🏛️', name: 'Institutional Authority', weight: '20 points', description: 'Is the source backed by a government or international body with a legal mandate for surveillance?' },
  { icon: '🔬', name: 'Scientific Rigor', weight: '20 points', description: 'Does the source use peer-reviewed methodology and transparent data collection practices?' },
  { icon: '📊', name: 'Historical Accuracy', weight: '20 points', description: 'What is the source\'s track record for accuracy? Have past reports been verified?' },
  { icon: '⏱️', name: 'Timeliness', weight: '15 points', description: 'How quickly does the source report new data? Are there delays between events and publication?' },
  { icon: '🔗', name: 'Cross-referencing', weight: '15 points', description: 'Can the data be independently verified through other credible sources?' },
  { icon: '📋', name: 'Transparency', weight: '10 points', description: 'Does the source publish its methodology, limitations, and correction history?' },
];

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
      {/* Hero */}
      <div className="pt-[52px]" style={{ backgroundColor: darkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-24 text-center">
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
              <div className="text-[36px] mb-4">{f.icon}</div>
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
