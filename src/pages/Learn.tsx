import { useState } from 'react';
import { useStore } from '../store/useStore';
import Section from '../components/Section';
import Card from '../components/Card';
import { historicalPandemics } from '../data/diseases';

interface LearnProps {
  onNavigate: (path: string) => void;
}

const guides = [
  {
    title: 'Understanding Pathogens',
    subtitle: 'Viruses, bacteria, fungi, and parasites',
    description: 'Learn the fundamental differences between pathogen types and how each category causes disease in the human body.',
    icon: '🧬',
  },
  {
    title: 'How Vaccines Work',
    subtitle: 'From mRNA to viral vectors',
    description: 'A comprehensive guide to vaccine technology, how different platforms generate immunity, and why vaccines are our most powerful tool.',
    icon: '💉',
  },
  {
    title: 'Reading Epidemic Curves',
    subtitle: 'Data visualization for public health',
    description: 'Learn how to interpret epidemic curves, understand R₀, and read the charts used by epidemiologists to track disease spread.',
    icon: '📈',
  },
  {
    title: 'Source Credibility',
    subtitle: 'Evaluating health information',
    description: 'How to assess the credibility of health information sources, recognize misinformation, and find trustworthy data.',
    icon: '🛡️',
  },
  {
    title: 'Zoonotic Diseases',
    subtitle: 'When animals transmit to humans',
    description: 'Understanding how diseases jump from animal populations to humans and why this process is accelerating.',
    icon: '🦇',
  },
  {
    title: 'Antimicrobial Resistance',
    subtitle: 'The silent pandemic',
    description: 'Why bacteria are becoming resistant to antibiotics, the scale of the threat, and what can be done.',
    icon: '🧫',
  },
];

const glossary = [
  { term: 'Case Fatality Rate (CFR)', definition: 'The proportion of people diagnosed with a disease who die from it. Calculated as deaths divided by confirmed cases.' },
  { term: 'Epidemic', definition: 'An unexpected increase in the number of disease cases in a specific geographical area.' },
  { term: 'Endemic', definition: 'The constant presence and/or usual prevalence of a disease in a population within a geographic area.' },
  { term: 'Incubation Period', definition: 'The time between infection and the appearance of symptoms.' },
  { term: 'Pandemic', definition: 'An epidemic that has spread across multiple countries or continents, usually affecting a large number of people.' },
  { term: 'R₀ (Basic Reproduction Number)', definition: 'The average number of people that one infected person will pass the disease to in a fully susceptible population.' },
  { term: 'Seroprevalence', definition: 'The proportion of a population who have antibodies against a specific pathogen, indicating past infection or vaccination.' },
  { term: 'Zoonosis', definition: 'An infectious disease that is transmitted from animals to humans.' },
  { term: 'Vector', definition: 'An organism that transmits a pathogen from one host to another, such as mosquitoes transmitting malaria.' },
  { term: 'Surveillance', definition: 'The continuous, systematic collection, analysis, and interpretation of health-related data.' },
];

export default function Learn({ onNavigate: _onNavigate }: LearnProps) {
  const { darkMode } = useStore();
  const [glossarySearch, setGlossarySearch] = useState('');

  const textPrimary = darkMode ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = darkMode ? '#A1A1A6' : '#6E6E73';
  const textTertiary = darkMode ? '#6E6E73' : '#86868B';
  const borderColor = darkMode ? '#2C2C2E' : '#D2D2D7';

  const filteredGlossary = glossary.filter(g =>
    g.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
    g.definition.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: darkMode ? '#000' : '#FFF' }}>
      {/* Hero */}
      <div className="pt-[52px]" style={{ backgroundColor: darkMode ? '#0A0A0A' : '#F5F5F7' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-24 text-center">
          <p className="text-[12px] uppercase tracking-[0.1em] font-medium mb-4" style={{ color: textTertiary }}>
            EDUCATIONAL CENTER
          </p>
          <h1 className="text-[36px] md:text-[48px] font-bold tracking-tight" style={{ color: textPrimary, letterSpacing: '-0.025em' }}>
            Learn about diseases.
          </h1>
          <p className="text-[17px] md:text-[19px] mt-5 max-w-[540px] mx-auto leading-relaxed" style={{ color: textSecondary }}>
            Interactive guides, a comprehensive glossary, and a timeline of humanity's battles with infectious disease.
          </p>
        </div>
      </div>

      {/* Guides */}
      <Section
        label="INTERACTIVE GUIDES"
        heading="Understand the science."
        body="Accessible, well-sourced educational content for everyone."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {guides.map((guide) => (
            <Card key={guide.title}>
              <div className="text-[40px] mb-4">{guide.icon}</div>
              <h3 className="text-[19px] font-semibold" style={{ color: textPrimary }}>{guide.title}</h3>
              <p className="text-[13px] mt-1" style={{ color: textTertiary }}>{guide.subtitle}</p>
              <p className="text-[15px] mt-3 leading-relaxed" style={{ color: textSecondary }}>{guide.description}</p>
              <p className="text-[15px] font-medium mt-4" style={{ color: textPrimary }}>Read guide →</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Historical Pandemics Timeline */}
      <Section
        alt
        label="HISTORICAL ARCHIVE"
        heading="Pandemics through history."
        body="From ancient plagues to modern outbreaks — humanity's long battle with infectious disease."
      >
        <div className="max-w-[900px] mx-auto">
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-max px-4">
              {historicalPandemics.map((p) => (
                <div
                  key={p.year}
                  className="w-[240px] flex-shrink-0 text-center rounded-2xl p-6"
                  style={{
                    backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF',
                    border: `1px solid ${borderColor}`,
                    boxShadow: darkMode ? 'none' : '0 2px 12px rgba(0,0,0,0.08)',
                  }}
                >
                  <p className="text-[15px] font-semibold" style={{ fontFamily: 'monospace', color: textTertiary }}>
                    {p.year}
                  </p>
                  <h4 className="text-[17px] font-semibold mt-2" style={{ color: textPrimary }}>
                    {p.name}
                  </h4>
                  <p className="text-[13px] mt-2 font-medium" style={{ fontFamily: 'monospace', color: '#FF3B30' }}>
                    {p.deaths}
                  </p>
                  <p className="text-[11px] uppercase tracking-wide mt-0.5" style={{ color: textTertiary }}>
                    estimated deaths
                  </p>
                  <p className="text-[13px] mt-3 leading-relaxed" style={{ color: textSecondary }}>
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-[13px] mt-4" style={{ color: textTertiary }}>
            ← Scroll to explore timeline →
          </p>
        </div>
      </Section>

      {/* Glossary */}
      <Section
        label="GLOSSARY"
        heading="Key terms defined."
        body="Essential epidemiology and public health terminology, clearly explained."
      >
        <div className="max-w-[700px] mx-auto">
          <div className="mb-8 text-center">
            <input
              type="text"
              value={glossarySearch}
              onChange={(e) => setGlossarySearch(e.target.value)}
              placeholder="Search terms..."
              className="px-5 py-3 rounded-full text-[15px] w-[280px] border-0 outline-none"
              style={{
                backgroundColor: darkMode ? '#1C1C1E' : '#F5F5F7',
                color: textPrimary,
                border: `1px solid ${borderColor}`,
                fontFamily: 'inherit',
              }}
            />
          </div>
          <div className="space-y-4">
            {filteredGlossary.map((g) => (
              <div
                key={g.term}
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF',
                  border: `1px solid ${borderColor}`,
                }}
              >
                <h4 className="text-[17px] font-semibold" style={{ color: textPrimary }}>{g.term}</h4>
                <p className="text-[15px] mt-2 leading-relaxed" style={{ color: textSecondary }}>{g.definition}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
