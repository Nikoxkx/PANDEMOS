import { useStore } from '../store/useStore';
import { diseases, getSeverityColor, Disease } from '../data/diseases';
import { diseaseScience } from '../data/diseaseScience';
import Section from '../components/Section';
import Card from '../components/Card';
import SeverityBadge from '../components/SeverityBadge';
import SourceCitation from '../components/SourceCitation';
import Sparkline from '../components/Sparkline';
import DataFreshness from '../components/DataFreshness';
import AnatomyViewer from '../components/AnatomyViewer';
import type { JSX } from 'react';

interface DiseaseDetailProps {
  slug: string;
  onNavigate: (path: string) => void;
}

function QuickFacts({ disease }: { disease: Disease }) {
  const { darkMode } = useStore();
  const textPrimary = darkMode ? '#F5F5F7' : '#1D1D1F';
  const textTertiary = darkMode ? '#6E6E73' : '#86868B';
  const borderColor = darkMode ? '#2C2C2E' : '#E8E8ED';

  const facts = [
    { icon: '🧬', value: disease.pathogenType, label: 'PATHOGEN' },
    { icon: '⏱', value: disease.incubation, label: 'INCUBATION' },
    { icon: '⚠️', value: disease.fatalityRate, label: 'FATALITY RATE' },
    { icon: '💀', value: disease.timeToDeath, label: 'TIME TO DEATH' },
    { icon: '📊', value: disease.r0, label: 'R₀' },
    { icon: '🔄', value: disease.transmission.join(', '), label: 'TRANSMISSION' },
    { icon: '💊', value: disease.treatments, label: 'TREATMENTS' },
    { icon: '💉', value: disease.vaccines, label: 'VACCINES' },
  ];

  return (
    <div
      className="py-12 border-t border-b"
      style={{ borderColor, backgroundColor: darkMode ? '#000' : '#FFF' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {facts.map((fact) => (
            <div key={fact.label} className="text-center">
              <div className="text-[20px] mb-2">{fact.icon}</div>
              <p className="text-[15px] font-semibold" style={{ fontFamily: 'monospace', color: textPrimary }}>
                {fact.value}
              </p>
              <p className="text-[10px] uppercase tracking-[0.06em] mt-1" style={{ color: textTertiary }}>
                {fact.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Timeline({ disease }: { disease: Disease }) {
  const { darkMode } = useStore();
  const textPrimary = darkMode ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = darkMode ? '#A1A1A6' : '#6E6E73';
  const textTertiary = darkMode ? '#6E6E73' : '#86868B';
  const lineColor = darkMode ? '#2C2C2E' : '#D2D2D7';

  return (
    <div className="max-w-[700px] mx-auto relative">
      {/* Center line */}
      <div
        className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
        style={{ backgroundColor: lineColor }}
      />
      <div
        className="absolute left-6 top-0 bottom-0 w-px md:hidden"
        style={{ backgroundColor: lineColor }}
      />

      {disease.discoveryTimeline.map((event, i) => {
        const isLeft = i % 2 === 0;
        return (
          <div
            key={i}
            className={`relative flex mb-10 ${
              i % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
            } flex-row`}
          >
            {/* Dot on center line */}
            <div
              className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-10 mt-1"
              style={{ backgroundColor: textPrimary }}
            />
            {/* Content */}
            <div className={`ml-14 md:ml-0 ${isLeft ? 'md:mr-[calc(50%+24px)] md:text-right' : 'md:ml-[calc(50%+24px)] md:text-left'} w-full md:w-[calc(50%-24px)]`}>
              <Card hoverable={false}>
                <p className="text-[13px]" style={{ fontFamily: 'monospace', color: textTertiary }}>
                  {event.date}
                </p>
                <h4 className="text-[17px] font-semibold mt-2" style={{ color: textPrimary }}>
                  {event.title}
                </h4>
                <p className="text-[15px] mt-2 leading-relaxed" style={{ color: textSecondary }}>
                  {event.description}
                </p>
                <div className="mt-3">
                  <SourceCitation source={event.source} inline />
                </div>
              </Card>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TransmissionSection({ disease }: { disease: Disease }) {
  const { darkMode } = useStore();
  const textPrimary = darkMode ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = darkMode ? '#A1A1A6' : '#6E6E73';

  const iconMap: Record<string, JSX.Element> = {
    airborne: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke={textPrimary} strokeWidth="1.2" strokeLinecap="round">
        <path d="M8 28h40M12 20c4 0 8-4 12 0s8 0 12 0M12 36c4 0 8 4 12 0s8 0 12 0" />
        <circle cx="20" cy="16" r="2" fill={textPrimary} opacity="0.3" />
        <circle cx="36" cy="12" r="1.5" fill={textPrimary} opacity="0.3" />
        <circle cx="28" cy="40" r="2" fill={textPrimary} opacity="0.3" />
      </svg>
    ),
    droplet: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke={textPrimary} strokeWidth="1.2" strokeLinecap="round">
        <path d="M28 8c-8 12-16 20-16 28a16 16 0 0032 0c0-8-8-16-16-28z" />
        <path d="M20 36a8 8 0 0012 4" opacity="0.4" />
      </svg>
    ),
    contact: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke={textPrimary} strokeWidth="1.2" strokeLinecap="round">
        <path d="M14 36c0-8 6-14 14-14M42 36c0-8-6-14-14-14" />
        <circle cx="14" cy="36" r="6" />
        <circle cx="42" cy="36" r="6" />
        <circle cx="28" cy="24" r="3" fill={textPrimary} opacity="0.2" />
      </svg>
    ),
    vector: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke={textPrimary} strokeWidth="1.2" strokeLinecap="round">
        <ellipse cx="28" cy="28" rx="12" ry="8" />
        <path d="M16 28L8 20M40 28L48 20" />
        <path d="M20 24L14 14M36 24L42 14" />
        <line x1="28" y1="20" x2="28" y2="12" />
      </svg>
    ),
    fomite: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke={textPrimary} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="12" y="16" width="32" height="24" rx="4" />
        <circle cx="20" cy="28" r="3" fill={textPrimary} opacity="0.2" />
        <circle cx="36" cy="24" r="2" fill={textPrimary} opacity="0.2" />
        <circle cx="30" cy="32" r="2.5" fill={textPrimary} opacity="0.2" />
      </svg>
    ),
    water: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke={textPrimary} strokeWidth="1.2" strokeLinecap="round">
        <path d="M8 32c4-4 8-4 12 0s8 4 12 0 8-4 12 0" />
        <path d="M8 40c4-4 8-4 12 0s8 4 12 0 8-4 12 0" opacity="0.5" />
        <path d="M28 8v16" />
        <path d="M24 12l4 4 4-4" />
      </svg>
    ),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
      {disease.transmissionMethods.map((tm) => {
        const riskColors: Record<string, string> = { high: '#FF3B30', moderate: '#FF9500', low: '#34C759' };
        return (
          <Card key={tm.method}>
            <div className="flex justify-center mb-5">
              {iconMap[tm.icon] || iconMap.contact}
            </div>
            <h3 className="text-[19px] font-semibold" style={{ color: textPrimary }}>{tm.method}</h3>
            <p className="text-[15px] mt-3 leading-relaxed max-w-[260px] mx-auto" style={{ color: textSecondary }}>
              {tm.description}
            </p>
            <div className="mt-3">
              <span
                className="inline-block text-[11px] uppercase tracking-wide px-2.5 py-0.5 rounded-full font-medium"
                style={{
                  backgroundColor: `${riskColors[tm.riskLevel]}15`,
                  color: riskColors[tm.riskLevel],
                }}
              >
                {tm.riskLevel} risk
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function SymptomsSection({ disease }: { disease: Disease }) {
  const { darkMode } = useStore();
  const textPrimary = darkMode ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = darkMode ? '#A1A1A6' : '#6E6E73';
  const textTertiary = darkMode ? '#6E6E73' : '#86868B';

  const phaseColors: Record<string, string> = { mild: '#34C759', moderate: '#FF9500', severe: '#FF3B30' };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
      {disease.symptoms.map((phase) => (
        <Card key={phase.phase}>
          <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: phaseColors[phase.severity] }} />
          <div className="pt-2">
            <h3 className="text-[19px] font-semibold" style={{ color: textPrimary }}>
              {phase.phase}
            </h3>
            <p className="text-[13px] mt-1" style={{ color: textTertiary }}>{phase.timeRange}</p>
            <div className="mt-5 space-y-4">
              {phase.symptoms.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between items-center text-[14px] mb-1">
                    <span style={{ color: textPrimary }}>{s.name}</span>
                    <span style={{ fontFamily: 'monospace', color: textSecondary }}>{s.frequency}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: darkMode ? '#2C2C2E' : '#E8E8ED' }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${s.frequency}%`,
                        backgroundColor: phaseColors[phase.severity],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function MolecularSection({ diseaseSlug }: { diseaseSlug: string }) {
  const { darkMode } = useStore();
  const science = diseaseScience[diseaseSlug];
  
  const textPrimary = darkMode ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = darkMode ? '#A1A1A6' : '#6E6E73';
  const textTertiary = darkMode ? '#6E6E73' : '#86868B';
  const borderColor = darkMode ? '#2C2C2E' : '#D2D2D7';

  if (!science) return null;

  return (
    <div className="max-w-[1100px] mx-auto space-y-12">
      {/* Genome Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {science.genomeType && (
          <Card hoverable={false}>
            <p className="text-[11px] uppercase tracking-wide mb-2" style={{ color: textTertiary }}>Genome Type</p>
            <p className="text-[15px] font-medium" style={{ color: textPrimary }}>{science.genomeType}</p>
          </Card>
        )}
        {science.genomeSize && (
          <Card hoverable={false}>
            <p className="text-[11px] uppercase tracking-wide mb-2" style={{ color: textTertiary }}>Genome Size</p>
            <p className="text-[15px] font-medium" style={{ color: textPrimary }}>{science.genomeSize}</p>
          </Card>
        )}
        {science.mutationRate && (
          <Card hoverable={false}>
            <p className="text-[11px] uppercase tracking-wide mb-2" style={{ color: textTertiary }}>Mutation Rate</p>
            <p className="text-[15px] font-medium" style={{ color: textPrimary }}>{science.mutationRate}</p>
          </Card>
        )}
      </div>

      {/* Viral Structure */}
      {science.viralStructure && (
        <div>
          <h3 className="text-[19px] font-semibold text-center mb-6" style={{ color: textPrimary }}>
            Viral Structure & Components
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {science.viralStructure.map((vs) => (
              <div
                key={vs.component}
                className="p-5 rounded-xl"
                style={{
                  backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF',
                  border: `1px solid ${borderColor}`,
                }}
              >
                <div className="flex items-start justify-between">
                  <h4 className="text-[15px] font-semibold" style={{ color: textPrimary }}>
                    {vs.component}
                  </h4>
                  {vs.targetable && (
                    <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full" style={{ backgroundColor: '#34C75920', color: '#34C759' }}>
                      Drug Target
                    </span>
                  )}
                </div>
                <p className="text-[13px] mt-2 leading-relaxed" style={{ color: textSecondary }}>
                  {vs.function}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cell Entry Pathway */}
      <div>
        <h3 className="text-[19px] font-semibold text-center mb-2" style={{ color: textPrimary }}>
          Cellular Entry Mechanism
        </h3>
        <p className="text-[15px] text-center mb-6" style={{ color: textSecondary }}>
          <strong style={{ color: textPrimary }}>Receptor:</strong> {science.cellEntry.receptor}
          {science.cellEntry.coreceptors && (
            <span> · <strong style={{ color: textPrimary }}>Co-receptors:</strong> {science.cellEntry.coreceptors.join(', ')}</span>
          )}
        </p>
        
        {/* Pathway Steps */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-current to-transparent" style={{ color: borderColor }} />
          
          <div className="space-y-6">
            {science.cellEntry.pathway.map((step) => (
              <div key={step.step} className="relative flex items-start gap-6 md:gap-8">
                {/* Step number */}
                <div
                  className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF',
                    border: `2px solid ${darkMode ? '#2C2C2E' : '#D2D2D7'}`,
                  }}
                >
                  <span className="text-[18px] font-bold" style={{ color: textPrimary }}>{step.step}</span>
                </div>
                
                {/* Content */}
                <div className="flex-1 pb-4">
                  <h4 className="text-[17px] font-semibold" style={{ color: textPrimary }}>
                    {step.title}
                  </h4>
                  <p className="text-[14px] mt-2 leading-relaxed" style={{ color: textSecondary }}>
                    {step.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {step.molecules.map((mol) => (
                      <span
                        key={mol}
                        className="text-[11px] px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: darkMode ? '#2C2C2E' : '#F5F5F7',
                          color: textSecondary,
                        }}
                      >
                        {mol}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Drug Targets */}
      {science.drugTargets && (
        <div>
          <h3 className="text-[19px] font-semibold text-center mb-6" style={{ color: textPrimary }}>
            Therapeutic Targets
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {science.drugTargets.map((dt) => (
              <Card key={dt.target} hoverable={false}>
                <h4 className="text-[15px] font-semibold" style={{ color: textPrimary }}>
                  {dt.target}
                </h4>
                <p className="text-[13px] mt-2" style={{ color: textSecondary }}>
                  {dt.mechanism}
                </p>
                <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${borderColor}` }}>
                  <p className="text-[11px] uppercase tracking-wide mb-1.5" style={{ color: textTertiary }}>Drugs</p>
                  <div className="flex flex-wrap gap-1.5">
                    {dt.drugs.map((drug) => (
                      <span key={drug} className="text-[12px] px-2 py-0.5 rounded-full" style={{ backgroundColor: '#007AFF20', color: '#007AFF' }}>
                        {drug}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Immune Response */}
      {science.immuneResponse && (
        <div>
          <h3 className="text-[19px] font-semibold text-center mb-6" style={{ color: textPrimary }}>
            Immune Response Timeline
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {science.immuneResponse.map((ir) => (
              <Card key={ir.phase} hoverable={false}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[15px] font-semibold" style={{ color: textPrimary }}>
                    {ir.phase}
                  </h4>
                  <span className="text-[12px] px-2 py-0.5 rounded-full" style={{ backgroundColor: darkMode ? '#2C2C2E' : '#F5F5F7', color: textSecondary }}>
                    {ir.timing}
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed" style={{ color: textSecondary }}>
                  {ir.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {ir.keyPlayers.map((player) => (
                    <span key={player} className="text-[11px] px-2 py-0.5 rounded-full" style={{ backgroundColor: '#34C75920', color: '#34C759' }}>
                      {player}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LethalitySection({ disease }: { disease: Disease }) {
  const { darkMode } = useStore();
  const textPrimary = darkMode ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = darkMode ? '#A1A1A6' : '#6E6E73';
  const textTertiary = darkMode ? '#6E6E73' : '#86868B';

  const comparisons = [
    { name: 'Ebola (Zaire)', days: 8, color: '#FF3B30' },
    { name: 'H5N1', days: 9, color: '#FF3B30' },
    { name: 'COVID-19', days: 18, color: '#FF9500' },
    { name: 'SARS', days: 23, color: '#FF9500' },
    { name: 'Smallpox', days: 14, color: '#FF3B30' },
  ];
  const maxDays = Math.max(...comparisons.map(c => c.days));

  return (
    <div className="max-w-[900px] mx-auto text-center">
      <p className="text-[15px] italic mb-12 max-w-[540px] mx-auto" style={{ color: textTertiary }}>
        The following data is presented for informational purposes. Individual outcomes vary significantly based on age, health, and access to care.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div>
          <p className="text-[24px] font-semibold" style={{ fontFamily: 'monospace', color: textPrimary }}>{disease.timeToDeath}</p>
          <p className="text-[11px] uppercase tracking-wide mt-1" style={{ color: textTertiary }}>Median Time to Death</p>
        </div>
        <div>
          <p className="text-[24px] font-semibold" style={{ fontFamily: 'monospace', color: textPrimary }}>{disease.fatalityRate}</p>
          <p className="text-[11px] uppercase tracking-wide mt-1" style={{ color: textTertiary }}>Case Fatality Rate</p>
        </div>
        <div>
          <p className="text-[24px] font-semibold" style={{ fontFamily: 'monospace', color: textPrimary }}>{disease.r0}</p>
          <p className="text-[11px] uppercase tracking-wide mt-1" style={{ color: textTertiary }}>Basic Reproduction #</p>
        </div>
        <div>
          <p className="text-[24px] font-semibold" style={{ fontFamily: 'monospace', color: textPrimary }}>{disease.incubation}</p>
          <p className="text-[11px] uppercase tracking-wide mt-1" style={{ color: textTertiary }}>Incubation Period</p>
        </div>
      </div>

      <h4 className="text-[19px] font-semibold mb-8" style={{ color: textPrimary }}>
        Time to Death Comparison
      </h4>
      <div className="max-w-[600px] mx-auto space-y-4">
        {comparisons.map((c) => (
          <div key={c.name} className="text-left">
            <div className="flex justify-between text-[14px] mb-1.5">
              <span style={{ color: textPrimary }}>{c.name}</span>
              <span style={{ fontFamily: 'monospace', color: textSecondary }}>{c.days} days</span>
            </div>
            <div className="w-full h-2 rounded-full" style={{ backgroundColor: darkMode ? '#2C2C2E' : '#E8E8ED' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(c.days / maxDays) * 100}%`,
                  backgroundColor: c.color,
                  opacity: c.name.toLowerCase().includes(disease.name.toLowerCase().split(' ')[0]) ? 1 : 0.5,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <SourceCitation source={disease.sources[0]} inline />
      </div>
    </div>
  );
}

export default function DiseaseDetail({ slug, onNavigate }: DiseaseDetailProps) {
  const { darkMode } = useStore();
  const disease = diseases.find(d => d.slug === slug);

  if (!disease) {
    return (
      <div className="min-h-screen pt-[52px] flex items-center justify-center" style={{ backgroundColor: darkMode ? '#000' : '#FFF' }}>
        <div className="text-center">
          <h1 className="text-[40px] font-semibold" style={{ color: darkMode ? '#F5F5F7' : '#1D1D1F' }}>Disease not found</h1>
          <button
            onClick={() => onNavigate('/diseases')}
            className="mt-6 text-[17px] cursor-pointer border-0 bg-transparent"
            style={{ color: darkMode ? '#A1A1A6' : '#6E6E73', fontFamily: 'inherit' }}
          >
            ← Back to diseases
          </button>
        </div>
      </div>
    );
  }

  const textPrimary = darkMode ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = darkMode ? '#A1A1A6' : '#6E6E73';
  const textTertiary = darkMode ? '#6E6E73' : '#86868B';
  const severityColor = getSeverityColor(disease.severity);

  return (
    <div style={{ backgroundColor: darkMode ? '#000' : '#FFF' }}>
      {/* Hero */}
      <div
        className="pt-[52px]"
        style={{ backgroundColor: darkMode ? '#0A0A0A' : '#F5F5F7' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-20 text-center">
          <p className="text-[13px] mb-6" style={{ color: textTertiary }}>
            <button onClick={() => onNavigate('/')} className="cursor-pointer border-0 bg-transparent" style={{ color: textTertiary, fontFamily: 'inherit' }}>Home</button>
            {' / '}
            <button onClick={() => onNavigate('/diseases')} className="cursor-pointer border-0 bg-transparent" style={{ color: textTertiary, fontFamily: 'inherit' }}>Diseases</button>
            {' / '}
            <span style={{ color: textSecondary }}>{disease.name}</span>
          </p>

          <SeverityBadge severity={disease.severity} size="md" />

          <h1 className="text-[36px] md:text-[48px] font-bold mt-4 tracking-tight" style={{ color: textPrimary, letterSpacing: '-0.025em' }}>
            {disease.name}
          </h1>
          <p className="text-[17px] md:text-[19px] italic mt-2" style={{ color: textSecondary }}>
            {disease.scientificName}
          </p>
          <p className="text-[13px] mt-1" style={{ color: textTertiary }}>
            {disease.pathogenDetail} · ICD: {disease.icdCode}
          </p>
          <p className="text-[17px] mt-6 max-w-[600px] mx-auto leading-relaxed" style={{ color: textSecondary }}>
            {disease.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <button
              onClick={() => onNavigate('/war-room')}
              className="px-6 py-3 rounded-full text-[15px] font-normal cursor-pointer border-0"
              style={{ backgroundColor: darkMode ? '#F5F5F7' : '#1D1D1F', color: darkMode ? '#1D1D1F' : '#FFF', fontFamily: 'inherit' }}
            >
              Track on Map
            </button>
            <button
              className="px-6 py-3 rounded-full text-[15px] font-normal cursor-pointer"
              style={{ backgroundColor: 'transparent', color: textPrimary, border: `1px solid ${textPrimary}`, fontFamily: 'inherit' }}
            >
              Download Report
            </button>
          </div>
        </div>
      </div>

      {/* Data freshness */}
      <DataFreshness />

      {/* Quick Facts */}
      <QuickFacts disease={disease} />

      {/* About */}
      <Section label="ABOUT" heading={`Understanding ${disease.name}`} body={disease.description}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px] mx-auto">
          <Card hoverable={false}>
            <h4 className="text-[17px] font-semibold mb-3" style={{ color: textPrimary }}>Key Statistics</h4>
            <div className="space-y-2 text-[15px]">
              <div className="flex justify-between">
                <span style={{ color: textSecondary }}>Total Cases</span>
                <span style={{ fontFamily: 'monospace', color: textPrimary }}>{disease.totalCases.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: textSecondary }}>Total Deaths</span>
                <span style={{ fontFamily: 'monospace', color: textPrimary }}>{disease.totalDeaths.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: textSecondary }}>Countries Affected</span>
                <span style={{ fontFamily: 'monospace', color: textPrimary }}>{disease.affectedCountries}</span>
              </div>
            </div>
          </Card>
          <Card hoverable={false}>
            <h4 className="text-[17px] font-semibold mb-3" style={{ color: textPrimary }}>30-Day Trend</h4>
            <Sparkline data={disease.sparklineData} color={severityColor} width={200} height={60} />
            <p
              className="text-[13px] mt-3"
              style={{ color: disease.growthRate > 0 ? '#FF3B30' : '#34C759' }}
            >
              {disease.growthRate > 0 ? '↑' : '↓'} {Math.abs(disease.growthRate)}% change
            </p>
          </Card>
        </div>
      </Section>

      {/* Discovery Timeline */}
      <Section alt label="ORIGINS" heading="When and where it was found.">
        <Timeline disease={disease} />
      </Section>

      {/* Transmission */}
      <Section label="TRANSMISSION" heading="How it spreads." body={`${disease.name} can be transmitted through ${disease.transmission.join(', ').toLowerCase()}.`}>
        <TransmissionSection disease={disease} />
      </Section>

      {/* Symptoms */}
      <Section alt label="SYMPTOMS" heading="What it does to you, and when." body="Symptoms progress through distinct phases with varying frequency and severity.">
        <SymptomsSection disease={disease} />
      </Section>

      {/* Lethality */}
      <Section label="LETHALITY" heading="How fast it can kill.">
        <LethalitySection disease={disease} />
      </Section>

      {/* Molecular Mechanism */}
      {diseaseScience[disease.slug] && (
        <Section alt label="MOLECULAR BIOLOGY" heading="How it works at the cellular level." body="Understanding the viral structure and cellular entry mechanisms.">
          <MolecularSection diseaseSlug={disease.slug} />
        </Section>
      )}

      {/* Interactive Anatomy */}
      <section className="w-full py-[80px] md:py-[120px]" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center mb-12">
            <p className="text-[12px] uppercase tracking-[0.1em] font-medium mb-4" style={{ color: '#6E6E73' }}>
              INTERACTIVE ANATOMY
            </p>
            <h2 className="text-[32px] md:text-[40px] font-semibold leading-[1.2] tracking-tight max-w-[700px] mx-auto" style={{ color: '#F5F5F7', letterSpacing: '-0.02em' }}>
              How {disease.name} attacks the body.
            </h2>
            <p className="text-[17px] mt-4 max-w-[580px] mx-auto" style={{ color: '#A1A1A6' }}>
              Click on any organ to see detailed pathophysiology, cellular damage, and clinical manifestations.
            </p>
          </div>
          <AnatomyViewer diseaseSlug={disease.slug} />
        </div>
      </section>

      {/* Risk Factors */}
      <Section label="RISK FACTORS" heading="Who is most vulnerable?" body="Certain populations face elevated risk of severe outcomes.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {disease.riskFactors.map((rf) => (
            <Card key={rf.factor}>
              <div className="text-[28px] mb-3">{rf.icon}</div>
              <h4 className="text-[17px] font-semibold" style={{ color: textPrimary }}>{rf.factor}</h4>
              <p className="text-[15px] mt-2" style={{ color: textSecondary }}>{rf.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Prevention */}
      <Section alt label="PREVENTION" heading="How to protect yourself." body="Evidence-based prevention measures recommended by health authorities.">
        <div className="max-w-[600px] mx-auto">
          <Card hoverable={false}>
            <div className="space-y-4">
              {disease.preventionMeasures.map((measure, i) => (
                <div key={i} className="flex items-center gap-3 text-left">
                  <span className="text-[13px] flex-shrink-0" style={{ color: '#34C759' }}>✓</span>
                  <span className="text-[15px]" style={{ color: textPrimary }}>{measure}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* Treatments */}
      <Section label="TREATMENTS" heading="Available therapeutic options." body="Current treatment approaches as recommended by leading health authorities.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {disease.treatmentDetails.map((t) => (
            <Card key={t.name}>
              <span
                className="inline-block text-[11px] uppercase tracking-wide px-2.5 py-0.5 rounded-full mb-3"
                style={{ backgroundColor: darkMode ? '#2C2C2E' : '#F5F5F7', color: textSecondary }}
              >
                {t.type}
              </span>
              <h4 className="text-[17px] font-semibold" style={{ color: textPrimary }}>{t.name}</h4>
              <p className="text-[15px] mt-2 leading-relaxed" style={{ color: textSecondary }}>{t.description}</p>
              <p className="text-[13px] mt-3 font-medium" style={{ color: '#34C759' }}>{t.effectiveness}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Variants */}
      {disease.variants && disease.variants.length > 0 && (
        <Section alt label="MUTATIONS & VARIANTS" heading="Known variants." body="Tracked mutations with assessed impacts on transmissibility and severity.">
          <div className="max-w-[800px] mx-auto space-y-4">
            {disease.variants.map((v) => (
              <Card key={v.name} hoverable={false}>
                <div className="md:flex items-center gap-8">
                  <div className="flex-shrink-0 mb-4 md:mb-0">
                    <span className="inline-block text-[11px] uppercase tracking-wide px-2.5 py-0.5 rounded-full" style={{ backgroundColor: '#AF52DE20', color: '#AF52DE' }}>
                      {v.designation}
                    </span>
                    <h4 className="text-[19px] font-semibold mt-2" style={{ color: textPrimary }}>{v.name}</h4>
                    <p className="text-[13px]" style={{ color: textTertiary }}>{v.dateIdentified}</p>
                  </div>
                  <div className="flex-1 grid grid-cols-3 gap-4 text-[13px]">
                    <div>
                      <p style={{ color: textTertiary }}>Transmissibility</p>
                      <p className="font-medium mt-1" style={{ color: textPrimary }}>{v.transmissibility}</p>
                    </div>
                    <div>
                      <p style={{ color: textTertiary }}>Severity</p>
                      <p className="font-medium mt-1" style={{ color: textPrimary }}>{v.severity}</p>
                    </div>
                    <div>
                      <p style={{ color: textTertiary }}>Vaccine Evasion</p>
                      <p className="font-medium mt-1" style={{ color: textPrimary }}>{v.vaccineEvasion}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* Sources */}
      <Section label="SOURCES & REFERENCES" heading="Data provenance.">
        <div className="max-w-[600px] mx-auto space-y-4">
          {disease.sources.map((source, i) => (
            <SourceCitation key={i} source={source} inline={false} />
          ))}
        </div>
        <p className="text-center text-[13px] mt-8 italic" style={{ color: textTertiary }}>
          This page is not a substitute for professional medical advice. Consult a healthcare provider for clinical guidance.
        </p>
      </Section>
    </div>
  );
}
