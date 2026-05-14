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
    id: 'pathogens',
    title: 'Understanding Pathogens',
    subtitle: 'Viruses, bacteria, fungi, and parasites',
    description: 'Learn the fundamental differences between pathogen types and how each category causes disease in the human body.',
    icon: '🧬',
    content: {
      overview: 'Pathogens are microorganisms that can cause disease. Understanding the different types is crucial for developing treatments and prevention strategies.',
      sections: [
        {
          title: 'Viruses',
          content: 'Viruses are microscopic parasites that require a living host cell to replicate. They consist of genetic material (DNA or RNA) surrounded by a protein coat called a capsid. Examples include SARS-CoV-2, influenza, HIV, and Ebola.',
          keyPoints: ['Cannot reproduce outside host cells', 'Can be DNA or RNA based', 'Antibiotics do not work against viruses', 'Vaccines and antivirals are primary treatments']
        },
        {
          title: 'Bacteria',
          content: 'Bacteria are single-celled organisms that can live independently. While many bacteria are beneficial, some cause diseases like tuberculosis, cholera, and plague.',
          keyPoints: ['Single-celled prokaryotes', 'Can reproduce independently', 'Treated with antibiotics', 'Antibiotic resistance is a growing concern']
        },
        {
          title: 'Fungi',
          content: 'Fungi include yeasts, molds, and mushrooms. Fungal infections range from superficial (like athlete\'s foot) to life-threatening systemic infections.',
          keyPoints: ['Eukaryotic organisms', 'Can be single or multicellular', 'Treated with antifungals', 'Immunocompromised patients at higher risk']
        },
        {
          title: 'Parasites',
          content: 'Parasites are organisms that live on or in a host organism. They include protozoa (single-celled) and helminths (worms). Malaria is caused by a parasite.',
          keyPoints: ['Require a host to survive', 'Complex life cycles', 'Vector transmission common', 'Antiparasitic medications available']
        }
      ]
    }
  },
  {
    id: 'vaccines',
    title: 'How Vaccines Work',
    subtitle: 'From mRNA to viral vectors',
    description: 'A comprehensive guide to vaccine technology, how different platforms generate immunity, and why vaccines are our most powerful tool.',
    icon: '💉',
    content: {
      overview: 'Vaccines train the immune system to recognize and fight specific pathogens without causing disease. They are one of the most effective public health interventions in history.',
      sections: [
        {
          title: 'mRNA Vaccines',
          content: 'mRNA vaccines (like Pfizer and Moderna COVID-19 vaccines) deliver instructions for cells to make a harmless piece of the target pathogen, triggering an immune response.',
          keyPoints: ['No live virus used', 'Quick to develop and manufacture', 'mRNA degrades naturally', 'Cannot alter DNA']
        },
        {
          title: 'Viral Vector Vaccines',
          content: 'These vaccines use a modified harmless virus to deliver genetic instructions. Examples include AstraZeneca and Johnson & Johnson COVID-19 vaccines.',
          keyPoints: ['Uses modified harmless virus', 'Proven technology', 'Strong immune response', 'Single or two-dose regimens']
        },
        {
          title: 'Inactivated Vaccines',
          content: 'Traditional vaccines using killed pathogens. Examples include flu shots and polio vaccines (IPV).',
          keyPoints: ['Pathogen is killed/inactivated', 'Cannot cause disease', 'May require boosters', 'Well-established safety profile']
        },
        {
          title: 'Live Attenuated Vaccines',
          content: 'Vaccines using weakened forms of the pathogen. Examples include MMR and yellow fever vaccines.',
          keyPoints: ['Weakened but live pathogen', 'Strong, lasting immunity', 'Usually one or two doses', 'Not suitable for immunocompromised']
        }
      ]
    }
  },
  {
    id: 'epidemic-curves',
    title: 'Reading Epidemic Curves',
    subtitle: 'Data visualization for public health',
    description: 'Learn how to interpret epidemic curves, understand R0, and read the charts used by epidemiologists to track disease spread.',
    icon: '📈',
    content: {
      overview: 'Epidemic curves (epi curves) are graphical displays of disease occurrence over time. They help epidemiologists understand outbreak dynamics and predict future trends.',
      sections: [
        {
          title: 'Understanding R0',
          content: 'The basic reproduction number (R0) represents the average number of people an infected person will infect in a fully susceptible population. R0 > 1 means epidemic growth.',
          keyPoints: ['R0 > 1: Epidemic spreading', 'R0 = 1: Endemic (stable)', 'R0 < 1: Epidemic declining', 'Varies by disease and context']
        },
        {
          title: 'Curve Shapes',
          content: 'Point source outbreaks show steep rises and falls. Continuous source shows gradual increase. Person-to-person spread shows waves.',
          keyPoints: ['Point source: single exposure event', 'Continuous source: ongoing exposure', 'Propagated: person-to-person spread', 'Shape reveals transmission pattern']
        },
        {
          title: 'Flattening the Curve',
          content: 'Interventions like social distancing reduce transmission rate, spreading cases over time. This prevents healthcare system overload.',
          keyPoints: ['Same total cases, slower rate', 'Prevents healthcare overwhelm', 'Buys time for treatments/vaccines', 'Achieved through NPIs']
        },
        {
          title: 'Lag Indicators',
          content: 'Cases, hospitalizations, and deaths appear in sequence with delays. Deaths may lag cases by 2-4 weeks.',
          keyPoints: ['Cases appear first', 'Hospitalizations lag by ~1 week', 'Deaths lag by 2-4 weeks', 'Consider reporting delays']
        }
      ]
    }
  },
  {
    id: 'source-credibility',
    title: 'Source Credibility',
    subtitle: 'Evaluating health information',
    description: 'How to assess the credibility of health information sources, recognize misinformation, and find trustworthy data.',
    icon: '🛡️',
    content: {
      overview: 'In the age of information overload, evaluating source credibility is essential. Learn to distinguish reliable health information from misinformation.',
      sections: [
        {
          title: 'Tier 1 Sources',
          content: 'WHO, CDC, national health ministries, and peer-reviewed journals. These undergo rigorous review processes.',
          keyPoints: ['Primary data collection', 'Peer review process', 'Transparent methodology', 'Regular updates and corrections']
        },
        {
          title: 'Red Flags',
          content: 'Warning signs include sensationalist headlines, anonymous sources, claims of suppressed cures, and emotional manipulation.',
          keyPoints: ['No cited sources', 'Too good to be true claims', 'Conspiracy theories', 'Selling products']
        },
        {
          title: 'Fact-Checking',
          content: 'Cross-reference claims with multiple reliable sources. Use fact-checking organizations like Snopes, FactCheck.org, and PolitiFact.',
          keyPoints: ['Verify with multiple sources', 'Check original studies', 'Review author credentials', 'Look for consensus']
        },
        {
          title: 'Understanding Studies',
          content: 'Learn to distinguish between preprints, peer-reviewed articles, meta-analyses, and expert opinion.',
          keyPoints: ['Preprints not peer-reviewed', 'Sample size matters', 'Correlation ≠ causation', 'RCTs are gold standard']
        }
      ]
    }
  },
  {
    id: 'zoonotic',
    title: 'Zoonotic Diseases',
    subtitle: 'When animals transmit to humans',
    description: 'Understanding how diseases jump from animal populations to humans and why this process is accelerating.',
    icon: '🦇',
    content: {
      overview: 'About 75% of emerging infectious diseases are zoonotic — they originate in animals. Understanding spillover events is crucial for pandemic prevention.',
      sections: [
        {
          title: 'Spillover Events',
          content: 'When pathogens jump from animals to humans. Can occur through direct contact, consumption, or vector transmission.',
          keyPoints: ['Direct contact with animals', 'Consumption of infected animals', 'Vector-borne transmission', 'Environmental contamination']
        },
        {
          title: 'Reservoir Hosts',
          content: 'Animals that harbor pathogens without getting sick. Bats are reservoirs for many viruses including coronaviruses and Ebola.',
          keyPoints: ['Bats: coronaviruses, Ebola', 'Rodents: hantavirus, plague', 'Birds: avian influenza', 'Primates: HIV, Ebola']
        },
        {
          title: 'Risk Factors',
          content: 'Deforestation, wildlife trade, intensive farming, and climate change increase human-animal contact and spillover risk.',
          keyPoints: ['Habitat destruction', 'Wet markets and wildlife trade', 'Factory farming', 'Climate-driven migration']
        },
        {
          title: 'Prevention',
          content: 'One Health approach recognizes human, animal, and environmental health are interconnected.',
          keyPoints: ['Surveillance at human-animal interface', 'Sustainable land use', 'Regulate wildlife trade', 'Early warning systems']
        }
      ]
    }
  },
  {
    id: 'amr',
    title: 'Antimicrobial Resistance',
    subtitle: 'The silent pandemic',
    description: 'Why bacteria are becoming resistant to antibiotics, the scale of the threat, and what can be done.',
    icon: '🧫',
    content: {
      overview: 'Antimicrobial resistance (AMR) threatens to undo a century of medical progress. By 2050, drug-resistant infections could cause 10 million deaths annually.',
      sections: [
        {
          title: 'How Resistance Develops',
          content: 'Bacteria evolve resistance through random mutations and gene transfer. Antibiotic overuse accelerates this process.',
          keyPoints: ['Natural selection at work', 'Mutations provide survival advantage', 'Genes shared between bacteria', 'Rapid bacterial reproduction']
        },
        {
          title: 'Current Threats',
          content: 'MRSA, drug-resistant TB, carbapenem-resistant Enterobacteriaceae (CRE), and resistant gonorrhea are major concerns.',
          keyPoints: ['MRSA: resistant staph infections', 'XDR-TB: extremely drug-resistant TB', 'CRE: "nightmare bacteria"', 'Pan-resistant strains emerging']
        },
        {
          title: 'Contributing Factors',
          content: 'Overuse in healthcare, agricultural use, incomplete treatment courses, and lack of new antibiotic development.',
          keyPoints: ['Overprescription', 'Agricultural overuse', 'Poor sanitation', 'Limited new drug development']
        },
        {
          title: 'Solutions',
          content: 'Antibiotic stewardship, infection prevention, new drug development, and rapid diagnostics.',
          keyPoints: ['Prescribe only when needed', 'Complete full courses', 'Invest in new antibiotics', 'Improve diagnostics']
        }
      ]
    }
  },
];

const glossary = [
  { term: 'Case Fatality Rate (CFR)', definition: 'The proportion of people diagnosed with a disease who die from it. Calculated as deaths divided by confirmed cases. CFR can vary significantly based on healthcare access and testing capacity.' },
  { term: 'Epidemic', definition: 'An unexpected increase in the number of disease cases in a specific geographical area. When an epidemic spreads to multiple countries or continents, it becomes a pandemic.' },
  { term: 'Endemic', definition: 'The constant presence and/or usual prevalence of a disease in a population within a geographic area. Malaria is endemic in many tropical regions.' },
  { term: 'Incubation Period', definition: 'The time between infection and the appearance of symptoms. During this period, a person may be infectious without knowing they are sick.' },
  { term: 'Pandemic', definition: 'An epidemic that has spread across multiple countries or continents, usually affecting a large number of people. COVID-19 was declared a pandemic in March 2020.' },
  { term: 'R0 (Basic Reproduction Number)', definition: 'The average number of people that one infected person will pass the disease to in a fully susceptible population. Measles has an R0 of 12-18, while COVID-19 original strain was 2-3.' },
  { term: 'Seroprevalence', definition: 'The proportion of a population who have antibodies against a specific pathogen, indicating past infection or vaccination. Serosurveys help estimate true infection rates.' },
  { term: 'Zoonosis', definition: 'An infectious disease that is transmitted from animals to humans. About 75% of emerging infectious diseases are zoonotic, including COVID-19, Ebola, and HIV.' },
  { term: 'Vector', definition: 'An organism that transmits a pathogen from one host to another, such as mosquitoes transmitting malaria or ticks transmitting Lyme disease.' },
  { term: 'Surveillance', definition: 'The continuous, systematic collection, analysis, and interpretation of health-related data. Surveillance systems are critical for early outbreak detection.' },
  { term: 'Contact Tracing', definition: 'The process of identifying people who may have come into contact with an infected person. Essential for controlling outbreaks of diseases like Ebola and COVID-19.' },
  { term: 'Herd Immunity', definition: 'When a sufficient proportion of a population is immune to a disease (through vaccination or prior infection), providing indirect protection to non-immune individuals.' },
  { term: 'Asymptomatic', definition: 'Having no symptoms of disease. Asymptomatic carriers can still transmit infections, complicating disease control efforts.' },
  { term: 'Superspreader', definition: 'An infected individual who transmits the pathogen to many more people than average. Superspreading events can drive outbreaks.' },
  { term: 'Variant', definition: 'A version of a pathogen with one or more mutations that distinguish it from the original strain. Variants may have different transmissibility or severity.' },
  { term: 'Quarantine', definition: 'Separating and restricting movement of people who were exposed to a contagious disease to see if they become sick. Different from isolation.' },
  { term: 'Isolation', definition: 'Separating sick people with a contagious disease from those who are not sick. Quarantine is for exposed but not yet sick individuals.' },
  { term: 'Fomite', definition: 'An inanimate object that can carry and spread disease-causing organisms when contaminated. Examples include doorknobs, phones, and medical equipment.' },
  { term: 'Pathogenicity', definition: 'The ability of a pathogen to cause disease. A highly pathogenic virus causes severe disease in a high proportion of infected individuals.' },
  { term: 'Virulence', definition: 'The degree of damage a pathogen can cause to its host. High virulence means the pathogen causes severe disease or death.' },
];

export default function Learn({ onNavigate }: LearnProps) {
  const { darkMode } = useStore();
  const [glossarySearch, setGlossarySearch] = useState('');
  const [selectedGuide, setSelectedGuide] = useState<typeof guides[0] | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);

  const textPrimary = darkMode ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = darkMode ? '#A1A1A6' : '#6E6E73';
  const textTertiary = darkMode ? '#6E6E73' : '#86868B';

  const filteredGlossary = glossary.filter(g =>
    g.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
    g.definition.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  if (selectedGuide) {
    return (
      <div style={{ backgroundColor: darkMode ? '#000' : '#FFF', minHeight: '100vh' }}>
        <div className="pt-[52px]">
          <div className="max-w-[900px] mx-auto px-6 md:px-10 py-12">
            <button
              onClick={() => setSelectedGuide(null)}
              className="flex items-center gap-2 text-[15px] mb-8 transition-opacity hover:opacity-70"
              style={{ color: '#007AFF', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              ← Back to Learning Center
            </button>
            
            <div className="text-center mb-12">
              <span className="text-[56px] mb-4 block">{selectedGuide.icon}</span>
              <h1 className="text-[32px] md:text-[40px] font-bold" style={{ color: textPrimary }}>
                {selectedGuide.title}
              </h1>
              <p className="text-[17px] mt-3" style={{ color: textSecondary }}>
                {selectedGuide.content.overview}
              </p>
            </div>

            <div className="space-y-4">
              {selectedGuide.content.sections.map((section) => {
                const isExpanded = expandedSection === section.title;
                return (
                  <div
                    key={section.title}
                    className="rounded-2xl overflow-hidden transition-all duration-300"
                    style={{
                      backgroundColor: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                      border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)',
                    }}
                  >
                    <button
                      onClick={() => setExpandedSection(isExpanded ? null : section.title)}
                      className="w-full p-6 flex items-center justify-between text-left"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                      <h3 className="text-[19px] font-semibold" style={{ color: textPrimary }}>
                        {section.title}
                      </h3>
                      <span 
                        className="text-[24px] transition-transform duration-300"
                        style={{ 
                          color: textTertiary,
                          transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)',
                        }}
                      >
                        +
                      </span>
                    </button>
                    
                    <div
                      style={{
                        maxHeight: isExpanded ? '500px' : '0',
                        opacity: isExpanded ? 1 : 0,
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <div className="px-6 pb-6">
                        <p className="text-[15px] leading-relaxed mb-6" style={{ color: textSecondary }}>
                          {section.content}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {section.keyPoints.map((point, i) => (
                            <div 
                              key={i}
                              className="flex items-start gap-2 p-3 rounded-xl"
                              style={{
                                backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                              }}
                            >
                              <span style={{ color: '#007AFF' }}>•</span>
                              <span className="text-[13px]" style={{ color: textSecondary }}>{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={() => onNavigate('/sources')}
                className="text-[15px] px-6 py-3 rounded-full transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: '#007AFF',
                  color: '#FFF',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                View All Sources →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: darkMode ? '#000' : '#FFF' }}>
      {/* Hero */}
      <div 
        className="pt-[52px]" 
        style={{ 
          backgroundColor: darkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-24 text-center">
          <p className="text-[12px] uppercase tracking-[0.1em] font-medium mb-4" style={{ color: textTertiary }}>
            EDUCATIONAL CENTER
          </p>
          <h1 className="text-[36px] md:text-[48px] font-bold tracking-tight" style={{ color: textPrimary, letterSpacing: '-0.025em' }}>
            Learn about diseases.
          </h1>
          <p className="text-[17px] md:text-[19px] mt-5 max-w-[540px] mx-auto leading-relaxed" style={{ color: textSecondary }}>
            Interactive guides, a comprehensive glossary, and a timeline of humanity&apos;s battles with infectious disease.
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
            <Card key={guide.title} onClick={() => setSelectedGuide(guide)}>
              <div className="text-[40px] mb-4">{guide.icon}</div>
              <h3 className="text-[19px] font-semibold" style={{ color: textPrimary }}>{guide.title}</h3>
              <p className="text-[13px] mt-1" style={{ color: textTertiary }}>{guide.subtitle}</p>
              <p className="text-[15px] mt-3 leading-relaxed" style={{ color: textSecondary }}>{guide.description}</p>
              <p className="text-[15px] font-medium mt-4" style={{ color: '#007AFF' }}>Read guide →</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Interactive Historical Timeline */}
      <Section
        alt
        label="HISTORICAL ARCHIVE"
        heading="Pandemics through history."
        body="From ancient plagues to modern outbreaks — humanity&apos;s long battle with infectious disease."
      >
        <div className="max-w-[1000px] mx-auto">
          {/* Timeline Navigation */}
          <div className="relative mb-8">
            <div 
              className="h-1 rounded-full mb-4"
              style={{ backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
            >
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${((activeTimelineIndex + 1) / historicalPandemics.length) * 100}%`,
                  backgroundColor: '#FF3B30',
                }}
              />
            </div>
            <div className="flex justify-between overflow-x-auto pb-4 gap-2">
              {historicalPandemics.map((p, i) => (
                <button
                  key={p.year}
                  onClick={() => setActiveTimelineIndex(i)}
                  className={`flex-shrink-0 px-3 py-2 rounded-full text-[11px] font-medium transition-all duration-300`}
                  style={{
                    backgroundColor: i === activeTimelineIndex 
                      ? '#FF3B30' 
                      : (darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'),
                    color: i === activeTimelineIndex ? '#FFF' : textTertiary,
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transform: i === activeTimelineIndex ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {p.year}
                </button>
              ))}
            </div>
          </div>

          {/* Active Pandemic Detail */}
          <div 
            className="rounded-2xl p-8 md:p-12 text-center transition-all duration-500"
            style={{
              backgroundColor: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
              border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)',
            }}
          >
            <p 
              className="text-[48px] md:text-[64px] font-bold mb-2"
              style={{ fontFamily: 'monospace', color: '#FF3B30' }}
            >
              {historicalPandemics[activeTimelineIndex].year}
            </p>
            <h3 className="text-[28px] md:text-[36px] font-bold" style={{ color: textPrimary }}>
              {historicalPandemics[activeTimelineIndex].name}
            </h3>
            <p 
              className="text-[20px] md:text-[24px] mt-4 font-semibold"
              style={{ fontFamily: 'monospace', color: '#FF3B30' }}
            >
              {historicalPandemics[activeTimelineIndex].deaths}
            </p>
            <p className="text-[12px] uppercase tracking-wide" style={{ color: textTertiary }}>
              Estimated Deaths
            </p>
            <p className="text-[17px] mt-6 max-w-[600px] mx-auto leading-relaxed" style={{ color: textSecondary }}>
              {historicalPandemics[activeTimelineIndex].description}
            </p>
            
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setActiveTimelineIndex(Math.max(0, activeTimelineIndex - 1))}
                disabled={activeTimelineIndex === 0}
                className="px-4 py-2 rounded-full text-[13px] transition-opacity"
                style={{
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                  color: textPrimary,
                  border: 'none',
                  cursor: activeTimelineIndex === 0 ? 'not-allowed' : 'pointer',
                  opacity: activeTimelineIndex === 0 ? 0.5 : 1,
                  fontFamily: 'inherit',
                }}
              >
                ← Previous
              </button>
              <button
                onClick={() => setActiveTimelineIndex(Math.min(historicalPandemics.length - 1, activeTimelineIndex + 1))}
                disabled={activeTimelineIndex === historicalPandemics.length - 1}
                className="px-4 py-2 rounded-full text-[13px] transition-opacity"
                style={{
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                  color: textPrimary,
                  border: 'none',
                  cursor: activeTimelineIndex === historicalPandemics.length - 1 ? 'not-allowed' : 'pointer',
                  opacity: activeTimelineIndex === historicalPandemics.length - 1 ? 0.5 : 1,
                  fontFamily: 'inherit',
                }}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Expanded Glossary */}
      <Section
        label="GLOSSARY"
        heading="Key terms defined."
        body="Essential epidemiology and public health terminology, clearly explained."
      >
        <div className="max-w-[800px] mx-auto">
          <div className="mb-8 text-center">
            <input
              type="text"
              value={glossarySearch}
              onChange={(e) => setGlossarySearch(e.target.value)}
              placeholder="Search terms..."
              className="px-5 py-3 rounded-full text-[15px] w-full max-w-[320px] border-0 outline-none"
              style={{
                backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                color: textPrimary,
                border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)',
                fontFamily: 'inherit',
              }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGlossary.map((g) => (
              <div
                key={g.term}
                className="rounded-2xl p-5"
                style={{
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                  border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)',
                }}
              >
                <h4 className="text-[15px] font-semibold" style={{ color: textPrimary }}>{g.term}</h4>
                <p className="text-[13px] mt-2 leading-relaxed" style={{ color: textSecondary }}>{g.definition}</p>
              </div>
            ))}
          </div>
          {filteredGlossary.length === 0 && (
            <p className="text-center py-12 text-[15px]" style={{ color: textTertiary }}>
              No terms found matching &quot;{glossarySearch}&quot;
            </p>
          )}
        </div>
      </Section>
    </div>
  );
}
