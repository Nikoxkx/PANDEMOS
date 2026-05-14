import { useState } from 'react';
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
    subtitle: 'Viruses, bacteria, fungi, parasites',
    description: 'Fundamental differences between pathogen types and disease mechanisms.',
    icon: 'dna',
    content: {
      sections: [
        { title: 'Viruses', text: 'Obligate intracellular parasites requiring host cells to replicate. Consist of nucleic acid (DNA/RNA) surrounded by protein capsid. Examples: SARS-CoV-2, Influenza, HIV, Ebola. Cannot be treated with antibiotics.' },
        { title: 'Bacteria', text: 'Single-celled prokaryotes that can replicate independently. Have cell wall, ribosomes, and genetic material. Examples: M. tuberculosis, V. cholerae, S. aureus. Treatable with antibiotics.' },
        { title: 'Fungi', text: 'Eukaryotic organisms including yeasts and molds. Can cause superficial to systemic infections. Examples: Candida, Aspergillus, Cryptococcus. Treated with antifungals.' },
        { title: 'Parasites', text: 'Eukaryotic organisms living on/in hosts. Include protozoa (Plasmodium, Giardia) and helminths (roundworms, tapeworms). Require specific antiparasitic drugs.' },
      ],
      keyFacts: ['Viruses are 100-1000x smaller than bacteria', 'Antibiotic resistance kills 1.27M yearly', 'Fungi cause 1.5M deaths annually'],
    },
  },
  {
    id: 'vaccines',
    title: 'How Vaccines Work',
    subtitle: 'From mRNA to viral vectors',
    description: 'Comprehensive guide to vaccine technology and immune response.',
    icon: 'syringe',
    content: {
      sections: [
        { title: 'mRNA Vaccines', text: 'Deliver genetic instructions for cells to produce antigen proteins. Body recognizes as foreign, mounts immune response. Examples: Pfizer-BioNTech, Moderna COVID-19 vaccines. mRNA degrades within days.' },
        { title: 'Viral Vector', text: 'Modified harmless virus carries antigen gene into cells. Triggers immune response without disease. Examples: AstraZeneca, Johnson & Johnson, Sputnik V.' },
        { title: 'Inactivated', text: 'Killed pathogen that cannot replicate but retains antigens. Traditional technology. Examples: Sinovac, Polio (IPV), Hepatitis A.' },
        { title: 'Live Attenuated', text: 'Weakened pathogen that replicates but cannot cause disease. Strong, lasting immunity. Examples: MMR, Yellow Fever, Oral Polio.' },
        { title: 'Protein Subunit', text: 'Purified antigen proteins without genetic material. Very safe profile. Examples: Hepatitis B, Novavax COVID-19.' },
      ],
      keyFacts: ['Vaccines prevent 4-5M deaths annually', 'mRNA technology developed over 30 years', 'Herd immunity thresholds vary by disease'],
    },
  },
  {
    id: 'epi-curves',
    title: 'Reading Epidemic Curves',
    subtitle: 'Data visualization for public health',
    description: 'Interpret epidemic curves and understand outbreak dynamics.',
    icon: 'chart',
    content: {
      sections: [
        { title: 'Basic Reproduction Number (R0)', text: 'Average secondary infections from one case in susceptible population. Measles: 12-18 (highest), COVID-19: 5-8, Seasonal flu: 1.3. R>1 means epidemic growth.' },
        { title: 'Effective Reproduction (Rt)', text: 'Real-time R accounting for immunity and interventions. When Rt<1, outbreak declining. Target of public health measures.' },
        { title: 'Epidemic Curve Shapes', text: 'Point source: sharp peak, common exposure. Propagated: successive waves of transmission. Continuous: ongoing exposure source.' },
        { title: 'Doubling Time', text: 'Time for cases to double. Shorter = faster spread. Early COVID-19: 2-3 days. Critical for healthcare planning.' },
      ],
      keyFacts: ['CFR vs IFR: confirmed cases vs all infections', 'Attack rate: % population infected', 'Serial interval: time between successive cases'],
    },
  },
  {
    id: 'source-credibility',
    title: 'Source Credibility',
    subtitle: 'Evaluating health information',
    description: 'Assess credibility of health sources and identify misinformation.',
    icon: 'shield',
    content: {
      sections: [
        { title: 'Tier 1: Gold Standard', text: 'WHO, national CDCs, peer-reviewed journals (Lancet, NEJM, Nature). International mandate, transparent methods, independent audits.' },
        { title: 'Tier 2: Highly Credible', text: 'National health authorities (RKI, PHE), regional CDCs, established research institutions. Government-backed, regular reporting.' },
        { title: 'Red Flags', text: 'Anonymous sources, emotional language, no citations, unrealistic claims, selling products, anti-establishment rhetoric without evidence.' },
        { title: 'Verification Steps', text: 'Check author credentials, find primary sources, cross-reference multiple outlets, verify with fact-checkers, consult experts.' },
      ],
      keyFacts: ['Misinformation spreads 6x faster than facts', '65% read headlines only', 'Prebunking more effective than debunking'],
    },
  },
  {
    id: 'zoonotic',
    title: 'Zoonotic Diseases',
    subtitle: 'Animal-to-human transmission',
    description: 'How diseases jump species and why spillover is increasing.',
    icon: 'alert',
    content: {
      sections: [
        { title: 'Spillover Events', text: 'Pathogen jumps from animal reservoir to human. Requires close contact + adaptation. 75% of emerging diseases are zoonotic.' },
        { title: 'Key Reservoirs', text: 'Bats: Ebola, SARS, Nipah, rabies. Rodents: Hantavirus, Lassa. Primates: HIV, Ebola. Birds: Influenza. Mosquitoes: Dengue, Malaria, Zika.' },
        { title: 'Drivers of Emergence', text: 'Deforestation, agricultural expansion, wildlife trade, urbanization, climate change, antimicrobial resistance.' },
        { title: 'One Health Approach', text: 'Integration of human, animal, and environmental health. Surveillance at human-animal interface. Interdisciplinary response.' },
      ],
      keyFacts: ['1.7M unknown viruses in wildlife', '3 new zoonoses emerge yearly', 'Pandemic potential pathogens in priority lists'],
    },
  },
  {
    id: 'amr',
    title: 'Antimicrobial Resistance',
    subtitle: 'The silent pandemic',
    description: 'Why bacteria are becoming resistant and the global threat.',
    icon: 'bacteria',
    content: {
      sections: [
        { title: 'Mechanism', text: 'Bacteria acquire resistance genes through mutation or horizontal transfer. Selective pressure from antibiotic use drives resistant strains.' },
        { title: 'Priority Pathogens', text: 'WHO critical: Carbapenem-resistant Enterobacteriaceae, Acinetobacter, Pseudomonas. MRSA, VRE, MDR-TB also major concerns.' },
        { title: 'Global Burden', text: '1.27M deaths attributed to AMR in 2019. 4.95M deaths associated. Could reach 10M/year by 2050.' },
        { title: 'Solutions', text: 'Antibiotic stewardship, infection prevention, new drug development, rapid diagnostics, vaccines, phage therapy, international coordination.' },
      ],
      keyFacts: ['Only 12 antibiotics in advanced development', '43% of antibiotics used in agriculture', 'Last new antibiotic class discovered 1987'],
    },
  },
];

const glossary = [
  { term: 'Aerosol', definition: 'Fine particles <5 micrometers that remain suspended in air and can be inhaled deep into lungs. Distinguished from larger respiratory droplets.' },
  { term: 'Antibody', definition: 'Y-shaped protein produced by B cells that recognizes and binds to specific antigens, neutralizing pathogens or marking them for destruction.' },
  { term: 'Antigen', definition: 'Any molecule that triggers an immune response. Usually proteins on pathogen surface that antibodies recognize.' },
  { term: 'Attack Rate', definition: 'Proportion of exposed population that develops disease. Used to measure transmissibility in specific settings.' },
  { term: 'Case Fatality Rate (CFR)', definition: 'Deaths divided by confirmed cases. Overestimates true mortality as mild cases often missed.' },
  { term: 'Contact Tracing', definition: 'Identifying and monitoring people who contacted infected individuals to break transmission chains.' },
  { term: 'Cytokine Storm', definition: 'Excessive immune response where cytokines cause widespread inflammation and organ damage. Seen in severe COVID-19, flu.' },
  { term: 'Endemic', definition: 'Constant presence of disease in population. Baseline level of transmission without exponential growth.' },
  { term: 'Epidemic', definition: 'Unexpected increase in disease cases within geographic area, exceeding normal endemic levels.' },
  { term: 'Fomite', definition: 'Contaminated surface or object that can transmit infection. Survival time varies by pathogen and material.' },
  { term: 'Herd Immunity', definition: 'Population-level protection when sufficient proportion immune. Threshold varies: measles 95%, COVID 70-85%.' },
  { term: 'Incidence', definition: 'New cases per population over time period. Measures disease occurrence rate.' },
  { term: 'Incubation Period', definition: 'Time between infection and symptom onset. Critical for quarantine duration and contact tracing windows.' },
  { term: 'Index Case', definition: 'First documented case in outbreak. May differ from true first case (patient zero).' },
  { term: 'Infection Fatality Rate (IFR)', definition: 'Deaths divided by all infections (including asymptomatic). More accurate than CFR but harder to measure.' },
  { term: 'Isolate', definition: 'Separate infected individuals from others to prevent transmission. Differs from quarantine of exposed.' },
  { term: 'Morbidity', definition: 'State of being diseased. Morbidity rate measures disease frequency in population.' },
  { term: 'Mortality', definition: 'Death as outcome. Mortality rate measures deaths per population.' },
  { term: 'Nosocomial', definition: 'Hospital-acquired infection. Major concern with AMR pathogens and vulnerable patients.' },
  { term: 'Pandemic', definition: 'Epidemic spread across multiple countries/continents. WHO declares based on global spread, not severity.' },
  { term: 'Pathogen', definition: 'Disease-causing organism: virus, bacterium, fungus, parasite, or prion.' },
  { term: 'Prevalence', definition: 'Total cases (new and existing) at given time. Snapshot of disease burden.' },
  { term: 'Quarantine', definition: 'Restriction of exposed but not confirmed infected individuals. Duration based on incubation period.' },
  { term: 'R0 (Basic Reproduction Number)', definition: 'Average secondary infections from one case in fully susceptible population. Intrinsic transmissibility measure.' },
  { term: 'Reservoir', definition: 'Animal or environment where pathogen naturally lives and maintains itself between outbreaks.' },
  { term: 'Secondary Attack Rate', definition: 'Proportion of contacts who develop disease. Measures transmission in households, schools.' },
  { term: 'Seroprevalence', definition: 'Proportion with antibodies, indicating past infection or vaccination. Measured through blood surveys.' },
  { term: 'Spillover', definition: 'Pathogen transmission from animal reservoir to human host. Origin of most emerging diseases.' },
  { term: 'Super-spreader', definition: 'Individual causing disproportionate secondary infections. Often 20% cause 80% of transmission.' },
  { term: 'Surveillance', definition: 'Systematic collection and analysis of health data. Active (seeking cases) or passive (waiting for reports).' },
  { term: 'Vector', definition: 'Organism transmitting pathogen between hosts. Mosquitoes, ticks, fleas are common vectors.' },
  { term: 'Viral Load', definition: 'Amount of virus in body fluid. Higher loads generally mean higher infectiousness.' },
  { term: 'Virulence', definition: 'Degree of pathogenicity. How severe disease a pathogen causes.' },
  { term: 'Zoonosis', definition: 'Infectious disease transmitted from animals to humans. 75% of emerging diseases are zoonotic.' },
];

export default function Learn({ onNavigate: _onNavigate }: LearnProps) {
  const [glossarySearch, setGlossarySearch] = useState('');
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null);
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const [expandedPandemic, setExpandedPandemic] = useState<string | null>(null);

  const filteredGlossary = glossary.filter(g =>
    g.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
    g.definition.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#000' }}>
      {/* Hero */}
      <div className="pt-[52px]" style={{ background: 'linear-gradient(to bottom, #0A0A0A, #000)' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-24 text-center">
          <p className="text-[12px] uppercase tracking-[0.1em] font-medium mb-4" style={{ color: '#6E6E73' }}>
            EDUCATIONAL CENTER
          </p>
          <h1 className="text-[36px] md:text-[48px] font-bold tracking-tight text-balance" style={{ color: '#F5F5F7', letterSpacing: '-0.025em' }}>
            Learn about diseases.
          </h1>
          <p className="text-[17px] md:text-[19px] mt-5 max-w-[540px] mx-auto leading-relaxed" style={{ color: '#A1A1A6' }}>
            Interactive guides, comprehensive glossary, and historical context for understanding infectious disease.
          </p>
        </div>
      </div>

      {/* Interactive Guides */}
      <Section label="INTERACTIVE GUIDES" heading="Understand the science." body="Click any guide to expand detailed content.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {guides.map((guide) => (
            <div key={guide.id}>
              <Card onClick={() => setExpandedGuide(expandedGuide === guide.id ? null : guide.id)}>
                <div className="w-10 h-10 mx-auto mb-4 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <svg className="w-5 h-5" fill="none" stroke="#F5F5F7" viewBox="0 0 24 24">
                    {guide.icon === 'dna' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />}
                    {guide.icon === 'syringe' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />}
                    {guide.icon === 'chart' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />}
                    {guide.icon === 'shield' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
                    {guide.icon === 'alert' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />}
                    {guide.icon === 'bacteria' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />}
                  </svg>
                </div>
                <h3 className="text-[19px] font-semibold" style={{ color: '#F5F5F7' }}>{guide.title}</h3>
                <p className="text-[13px] mt-1" style={{ color: '#6E6E73' }}>{guide.subtitle}</p>
                <p className="text-[15px] mt-3 leading-relaxed" style={{ color: '#A1A1A6' }}>{guide.description}</p>
                <p className="text-[15px] font-medium mt-4 flex items-center justify-center gap-2" style={{ color: '#F5F5F7' }}>
                  {expandedGuide === guide.id ? 'Close' : 'Expand'} 
                  <svg className={`w-4 h-4 transition-transform ${expandedGuide === guide.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </p>
              </Card>
              
              {expandedGuide === guide.id && (
                <div className="mt-4 p-6 rounded-2xl" style={{ background: 'rgba(28,28,30,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {guide.content.sections.map((section, i) => (
                    <div key={i} className="mb-4 pb-4" style={{ borderBottom: i < guide.content.sections.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                      <h4 className="text-[15px] font-semibold mb-2" style={{ color: '#F5F5F7' }}>{section.title}</h4>
                      <p className="text-[14px] leading-relaxed" style={{ color: '#A1A1A6' }}>{section.text}</p>
                    </div>
                  ))}
                  <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <h4 className="text-[13px] uppercase tracking-wide mb-3" style={{ color: '#6E6E73' }}>Key Facts</h4>
                    <div className="flex flex-wrap gap-2">
                      {guide.content.keyFacts.map((fact, i) => (
                        <span key={i} className="px-3 py-1 rounded-full text-[12px]" style={{ background: 'rgba(255,255,255,0.1)', color: '#F5F5F7' }}>
                          {fact}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Historical Pandemics Timeline */}
      <Section alt label="HISTORICAL ARCHIVE" heading="Pandemics through history." body="Click any event for more details.">
        <div className="max-w-[900px] mx-auto">
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-max px-4">
              {historicalPandemics.map((p) => (
                <div
                  key={p.year}
                  onClick={() => setExpandedPandemic(expandedPandemic === p.year ? null : p.year)}
                  className="w-[240px] flex-shrink-0 text-center rounded-2xl p-6 cursor-pointer transition-all hover:scale-105"
                  style={{
                    background: expandedPandemic === p.year ? 'rgba(255,255,255,0.1)' : 'rgba(28,28,30,0.6)',
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${expandedPandemic === p.year ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}`,
                  }}
                >
                  <p className="text-[15px] font-semibold font-mono" style={{ color: '#6E6E73' }}>{p.year}</p>
                  <h4 className="text-[17px] font-semibold mt-2" style={{ color: '#F5F5F7' }}>{p.name}</h4>
                  <p className="text-[13px] mt-2 font-medium font-mono" style={{ color: '#FF3B30' }}>{p.deaths}</p>
                  <p className="text-[11px] uppercase tracking-wide mt-0.5" style={{ color: '#6E6E73' }}>estimated deaths</p>
                  <p className="text-[13px] mt-3 leading-relaxed" style={{ color: '#A1A1A6' }}>{p.description}</p>
                  {expandedPandemic === p.year && (
                    <div className="mt-4 pt-4 text-left" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                      <p className="text-[12px]" style={{ color: '#6E6E73' }}>
                        This pandemic significantly impacted global health infrastructure and led to advances in disease surveillance and prevention methods.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-[13px] mt-4" style={{ color: '#6E6E73' }}>Scroll to explore | Click for details</p>
        </div>
      </Section>

      {/* Glossary */}
      <Section label="GLOSSARY" heading="Key terms defined." body="Search and click terms for expanded definitions.">
        <div className="max-w-[700px] mx-auto">
          <div className="mb-8 text-center">
            <input
              type="text"
              value={glossarySearch}
              onChange={(e) => setGlossarySearch(e.target.value)}
              placeholder="Search terms..."
              className="px-5 py-3 rounded-full text-[15px] w-[280px] outline-none"
              style={{
                background: 'rgba(28,28,30,0.8)',
                backdropFilter: 'blur(10px)',
                color: '#F5F5F7',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            />
            <p className="text-[12px] mt-3" style={{ color: '#6E6E73' }}>
              {filteredGlossary.length} terms | Click to expand
            </p>
          </div>
          <div className="space-y-3">
            {filteredGlossary.map((g) => (
              <div
                key={g.term}
                onClick={() => setExpandedTerm(expandedTerm === g.term ? null : g.term)}
                className="rounded-xl p-5 cursor-pointer transition-all"
                style={{
                  background: expandedTerm === g.term ? 'rgba(255,255,255,0.08)' : 'rgba(28,28,30,0.6)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${expandedTerm === g.term ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-[16px] font-semibold" style={{ color: '#F5F5F7' }}>{g.term}</h4>
                  <svg className={`w-4 h-4 transition-transform ${expandedTerm === g.term ? 'rotate-180' : ''}`} fill="none" stroke="#6E6E73" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <p className={`text-[14px] mt-2 leading-relaxed transition-all ${expandedTerm === g.term ? '' : 'line-clamp-2'}`} style={{ color: '#A1A1A6' }}>
                  {g.definition}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
