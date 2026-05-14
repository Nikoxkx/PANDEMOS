import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { useScrollReveal, useCountUp } from '../hooks/useScrollReveal';
import Section from '../components/Section';
import Card from '../components/Card';
import Sparkline from '../components/Sparkline';
// SeverityBadge used on other pages
import { diseases, getSeverityColor, globalStats, credibilityTiers } from '../data/diseases';

interface LandingProps {
  onNavigate: (path: string) => void;
}

function HeroStats() {
  const { ref, isVisible } = useScrollReveal(0.3);
  const { darkMode } = useStore();

  const outbreaks = useCountUp(globalStats.activeOutbreaks, 1200, isVisible);
  const countries = useCountUp(globalStats.countriesAffected, 1200, isVisible);
  const sources = useCountUp(globalStats.sourcesMonitored, 1200, isVisible);

  const stats = [
    { value: outbreaks, label: 'ACTIVE OUTBREAKS' },
    { value: countries, label: 'COUNTRIES AFFECTED' },
    { value: sources, label: 'SOURCES MONITORED' },
    { value: 'Now', label: 'LAST UPDATED', isText: true },
  ];

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-[900px] mx-auto">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
          }}
        >
          <p
            className="text-[28px] md:text-[32px] font-semibold"
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              color: darkMode ? '#F5F5F7' : '#1D1D1F',
            }}
          >
            {'isText' in stat ? stat.value : stat.value.toLocaleString()}
          </p>
          <p
            className="text-[11px] uppercase tracking-[0.05em] mt-1"
            style={{ color: darkMode ? '#6E6E73' : '#86868B' }}
          >
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function Landing({ onNavigate }: LandingProps) {
  const { darkMode } = useStore();
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  const textPrimary = darkMode ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = darkMode ? '#A1A1A6' : '#6E6E73';
  const textTertiary = darkMode ? '#6E6E73' : '#86868B';

  const topThreats = diseases.filter(d => d.severity === 'critical' || d.severity === 'elevated').slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 pt-[52px]"
        style={{ backgroundColor: darkMode ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.95)' }}
      >
        <div className="text-center max-w-[800px] mx-auto">
          <p
            className="text-[12px] uppercase tracking-[0.1em] font-medium mb-4"
            style={{
              color: textTertiary,
              opacity: heroVisible ? 1 : 0,
              transition: 'opacity 0.5s ease 0.1s',
            }}
          >
            Global Disease Intelligence
          </p>

          <h1
            className="text-[36px] md:text-[48px] lg:text-[56px] font-bold leading-[1.15] tracking-tight"
            style={{
              color: textPrimary,
              letterSpacing: '-0.03em',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
            }}
          >
            Track every disease.<br />
            Across every border.<br />
            In real time.
          </h1>

          <p
            className="text-[17px] md:text-[19px] leading-[1.5] max-w-[540px] mx-auto mt-6"
            style={{
              color: textSecondary,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s',
            }}
          >
            Aggregating verified data from 50+ global health authorities. Every outbreak mapped, sourced, and tracked — so you don't have to search.
          </p>

          <div
            className="flex flex-wrap items-center justify-center gap-4 mt-10"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s',
            }}
          >
            <button
              onClick={() => onNavigate('/war-room')}
              className="px-7 py-3.5 rounded-full text-[17px] font-normal transition-colors duration-300 cursor-pointer border-0"
              style={{
                backgroundColor: darkMode ? '#F5F5F7' : '#1D1D1F',
                color: darkMode ? '#1D1D1F' : '#FFFFFF',
                fontFamily: 'inherit',
              }}
            >
              Enter the War Room
            </button>
            <button
              onClick={() => onNavigate('/diseases')}
              className="px-7 py-3.5 rounded-full text-[17px] font-normal transition-colors duration-300 cursor-pointer"
              style={{
                backgroundColor: 'transparent',
                color: textPrimary,
                border: `1px solid ${textPrimary}`,
                fontFamily: 'inherit',
              }}
            >
              Browse Diseases
            </button>
          </div>
        </div>

        <div className="mt-16 md:mt-20 w-full max-w-[1000px]">
          <HeroStats />
        </div>

        {/* Scroll indicator */}
        <div
          className="mt-16 md:mt-20"
          style={{
            opacity: heroVisible ? 0.5 : 0,
            transition: 'opacity 1s ease 1s',
            animation: 'bob 2s ease-in-out infinite',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={textTertiary} strokeWidth="1.5">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </section>

      {/* How It Works */}
      <Section
        label="HOW IT WORKS"
        heading="From raw data to global clarity."
        body="Our pipeline continuously monitors official sources, verifies reports against our credibility framework, and renders everything into interactive, sourceable visualizations."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {[
            {
              icon: (
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={textPrimary} strokeWidth="1.5" strokeLinecap="round">
                  <path d="M24 4v8M24 36v8M4 24h8M36 24h8M10 10l6 6M32 32l6 6M10 38l6-6M32 16l6-6" />
                  <circle cx="24" cy="24" r="6" />
                </svg>
              ),
              title: 'Aggregate',
              body: '50+ sources monitored continuously — WHO, CDC, ECDC, national ministries, and more.',
            },
            {
              icon: (
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={textPrimary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M24 4L6 14v12c0 10.5 7.8 20.3 18 23 10.2-2.7 18-12.5 18-23V14L24 4z" />
                  <path d="M16 24l6 6 10-12" />
                </svg>
              ),
              title: 'Verify',
              body: 'Every report scored on a 5-tier credibility system. Cross-referenced. Transparent. Linked.',
            },
            {
              icon: (
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={textPrimary} strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="24" cy="24" r="20" />
                  <ellipse cx="24" cy="24" rx="10" ry="20" />
                  <path d="M4 24h40M6 14h36M6 34h36" />
                </svg>
              ),
              title: 'Visualize',
              body: 'Interactive maps, epidemic curves, and travel path animations — all sourced and transparent.',
            },
          ].map((item, i) => (
            <Card key={item.title} delay={i * 100}>
              <div className="flex justify-center mb-6">{item.icon}</div>
              <h3 className="text-[22px] font-semibold" style={{ color: textPrimary }}>
                {item.title}
              </h3>
              <p className="text-[15px] mt-3 max-w-[260px] mx-auto leading-[1.5]" style={{ color: textSecondary }}>
                {item.body}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Live Threat Overview */}
      <Section
        alt
        label="CURRENT THREATS"
        heading="What the world is watching right now."
        body="The most critical active outbreaks, ranked by severity and global impact."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          {topThreats.map((disease, i) => {
            const severityColor = getSeverityColor(disease.severity);
            return (
              <Card
                key={disease.id}
                severity={severityColor}
                delay={i * 100}
                onClick={() => onNavigate(`/disease/${disease.slug}`)}
              >
                <div className="pt-4">
                  <h3 className="text-[22px] font-semibold" style={{ color: textPrimary }}>
                    {disease.name}
                  </h3>
                  <div className="mt-2">
                    <span
                      className="inline-block text-[12px] uppercase tracking-wide px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: darkMode ? '#2C2C2E' : '#F5F5F7',
                        color: textSecondary,
                      }}
                    >
                      {disease.pathogenType}
                    </span>
                  </div>
                  <div className="mt-5">
                    <Sparkline data={disease.sparklineData} color={severityColor} width={160} height={40} />
                  </div>
                  <p className="text-[15px] mt-5" style={{ fontFamily: 'monospace', color: textSecondary }}>
                    {disease.cases24h.toLocaleString()} new cases (24h)
                  </p>
                  <p
                    className="text-[13px] mt-2"
                    style={{ color: disease.growthRate > 0 ? '#FF3B30' : '#34C759' }}
                  >
                    {disease.growthRate > 0 ? '↑' : '↓'} {Math.abs(disease.growthRate)}% from last week
                  </p>
                  <p className="text-[13px] mt-4" style={{ color: textTertiary }}>
                    {disease.regions.join(' · ')}
                  </p>
                  <p className="text-[15px] font-medium mt-5 group" style={{ color: textPrimary }}>
                    View full report →
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Credibility Preview */}
      <Section
        label="OUR METHODOLOGY"
        heading={"Every claim has a source.\nEvery source has a score."}
        body="We built a transparent 5-tier credibility system so you always know how much to trust what you're reading."
      >
        <div className="flex flex-wrap justify-center gap-4 max-w-[1100px] mx-auto">
          {credibilityTiers.map((tier) => (
            <div
              key={tier.tier}
              className="w-[160px] md:w-[190px] text-center py-6"
              style={{
                opacity: 1,
              }}
            >
              <div className="text-[36px] mb-3" style={{ color: textPrimary }}>
                {tier.icon}
              </div>
              <p className="text-[15px] font-semibold" style={{ color: textPrimary }}>
                {tier.name}
              </p>
              <p className="text-[13px] mt-2 leading-relaxed" style={{ color: textTertiary }}>
                {tier.examples.slice(0, 2).join(' · ')}
              </p>
              <p className="text-[13px] mt-1" style={{ fontFamily: 'monospace', color: textTertiary }}>
                {tier.scoreRange}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('/sources')}
            className="text-[15px] font-medium cursor-pointer border-0 bg-transparent"
            style={{ color: textPrimary, fontFamily: 'inherit' }}
          >
            Learn about our credibility framework →
          </button>
        </div>
      </Section>

      {/* Footer Description */}
      <footer 
        className="py-16 px-6 text-center"
        style={{ 
          backgroundColor: darkMode ? 'rgba(0,0,0,0.98)' : 'rgba(250,250,252,1)',
          borderTop: `1px solid ${darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
        }}
      >
        <div className="max-w-[700px] mx-auto">
          <p 
            className="text-[13px] leading-[1.7]"
            style={{ color: textTertiary }}
          >
            PANDEMOS is a global disease surveillance platform designed to aggregate, verify, and visualize outbreak data from over 50 international health authorities. Our mission is to provide researchers, policymakers, and the public with accurate, real-time intelligence on emerging infectious disease threats. Every data point is sourced, scored for credibility, and transparently documented. This platform does not provide medical advice. For clinical guidance, consult qualified healthcare professionals.
          </p>
          <p 
            className="text-[11px] mt-6 uppercase tracking-[0.1em]"
            style={{ color: darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}
          >
            Data integrity. Transparency. Global vigilance.
          </p>
        </div>
      </footer>

    </div>
  );
}
