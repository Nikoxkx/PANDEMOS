import { useStore } from '../store/useStore';
import { credibilityTiers } from '../data/diseases';
import Section from '../components/Section';
import Card from '../components/Card';

export default function Sources() {
  const { darkMode } = useStore();

  const textPrimary = darkMode ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = darkMode ? '#A1A1A6' : '#6E6E73';
  const textTertiary = darkMode ? '#6E6E73' : '#86868B';

  const scoringFactors = [
    { icon: '🏛️', name: 'Institutional Authority', weight: '20 points', description: 'Is the source backed by a government or international body with a legal mandate for surveillance?' },
    { icon: '🔬', name: 'Scientific Rigor', weight: '20 points', description: 'Does the source use peer-reviewed methodology and transparent data collection practices?' },
    { icon: '📊', name: 'Historical Accuracy', weight: '20 points', description: 'What is the source\'s track record for accuracy? Have past reports been verified?' },
    { icon: '⏱️', name: 'Timeliness', weight: '15 points', description: 'How quickly does the source report new data? Are there delays between events and publication?' },
    { icon: '🔗', name: 'Cross-referencing', weight: '15 points', description: 'Can the data be independently verified through other credible sources?' },
    { icon: '📋', name: 'Transparency', weight: '10 points', description: 'Does the source publish its methodology, limitations, and correction history?' },
  ];

  return (
    <div style={{ backgroundColor: darkMode ? '#000' : '#FFF' }}>
      {/* Hero */}
      <div className="pt-[52px]" style={{ backgroundColor: darkMode ? '#0A0A0A' : '#F5F5F7' }}>
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

            {/* Examples */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {tier.examples.map((ex) => (
                <span
                  key={ex}
                  className="text-[13px] px-4 py-2 rounded-xl"
                  style={{
                    backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF',
                    color: textPrimary,
                    border: `1px solid ${darkMode ? '#2C2C2E' : '#D2D2D7'}`,
                  }}
                >
                  {ex}
                </span>
              ))}
            </div>

            {/* Criteria */}
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
