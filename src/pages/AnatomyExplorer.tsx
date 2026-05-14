import { useState } from 'react';
import { useStore } from '../store/useStore';
import { diseases } from '../data/diseases';
import AnatomyViewer from '../components/AnatomyViewer';

interface AnatomyExplorerProps {
  onNavigate: (path: string) => void;
}

export default function AnatomyExplorer({ onNavigate }: AnatomyExplorerProps) {
  const { darkMode } = useStore();
  const [selectedDisease, setSelectedDisease] = useState<string>('covid-19');
  const [_selectedOrgan, setSelectedOrgan] = useState<string | null>(null);

  const textPrimary = darkMode ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = darkMode ? '#A1A1A6' : '#6E6E73';
  const textTertiary = darkMode ? '#6E6E73' : '#86868B';
  const borderColor = darkMode ? '#2C2C2E' : '#D2D2D7';

  const disease = diseases.find(d => d.slug === selectedDisease);

  return (
    <div className="min-h-screen pt-[52px]" style={{ backgroundColor: darkMode ? '#000' : '#FFF' }}>
      {/* Header */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-12 md:py-16 text-center">
        <p className="text-[12px] uppercase tracking-[0.1em] font-medium mb-4" style={{ color: textTertiary }}>
          INTERACTIVE ANATOMY
        </p>
        <h1 className="text-[36px] md:text-[48px] font-bold tracking-tight" style={{ color: textPrimary, letterSpacing: '-0.025em' }}>
          Human Body Atlas
        </h1>
        <p className="text-[17px] md:text-[19px] mt-5 max-w-[600px] mx-auto leading-relaxed" style={{ color: textSecondary }}>
          Explore how different diseases affect the human body. Select a disease to see which organs are impacted and understand the pathophysiology at a cellular level.
        </p>
      </div>

      {/* Disease Selector */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 mb-12">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {diseases.map((d) => (
            <button
              key={d.slug}
              onClick={() => setSelectedDisease(d.slug)}
              className="px-4 py-2 rounded-full text-[14px] font-medium cursor-pointer border transition-all duration-200"
              style={{
                backgroundColor: selectedDisease === d.slug ? (darkMode ? '#F5F5F7' : '#1D1D1F') : 'transparent',
                color: selectedDisease === d.slug ? (darkMode ? '#1D1D1F' : '#FFFFFF') : textSecondary,
                borderColor: selectedDisease === d.slug ? 'transparent' : borderColor,
                fontFamily: 'inherit',
              }}
            >
              {d.name}
            </button>
          ))}
        </div>
      </div>

      {/* Disease Info Card */}
      {disease && (
        <div className="max-w-[800px] mx-auto px-6 md:px-10 mb-12">
          <div
            className="rounded-2xl p-6 text-center"
            style={{
              backgroundColor: darkMode ? '#1C1C1E' : '#F5F5F7',
              border: `1px solid ${borderColor}`,
            }}
          >
            <h2 className="text-[24px] font-semibold" style={{ color: textPrimary }}>
              {disease.name}
            </h2>
            <p className="text-[14px] italic mt-1" style={{ color: textSecondary }}>
              {disease.scientificName}
            </p>
            <p className="text-[15px] mt-4 max-w-[600px] mx-auto leading-relaxed" style={{ color: textSecondary }}>
              {disease.description}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
              <span className="text-[13px]" style={{ color: textTertiary }}>
                <strong style={{ color: textPrimary }}>{disease.pathogenType}</strong> pathogen
              </span>
              <span className="text-[13px]" style={{ color: textTertiary }}>
                Fatality: <strong style={{ color: textPrimary }}>{disease.fatalityRate}</strong>
              </span>
              <span className="text-[13px]" style={{ color: textTertiary }}>
                R₀: <strong style={{ color: textPrimary }}>{disease.r0}</strong>
              </span>
            </div>
            <button
              onClick={() => onNavigate(`/disease/${disease.slug}`)}
              className="mt-5 text-[14px] font-medium cursor-pointer border-0 bg-transparent"
              style={{ color: '#007AFF', fontFamily: 'inherit' }}
            >
              View full disease profile →
            </button>
          </div>
        </div>
      )}

      {/* Anatomy Viewer */}
      <div
        className="py-16"
        style={{ backgroundColor: darkMode ? '#0A0A0A' : '#F5F5F7' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <AnatomyViewer
            diseaseSlug={selectedDisease}
            onOrganSelect={(organ) => setSelectedOrgan(organ)}
          />
        </div>
      </div>

      {/* Transmission Info */}
      {disease && (
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
          <h3 className="text-[24px] font-semibold text-center mb-8" style={{ color: textPrimary }}>
            How {disease.name} Spreads
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {disease.transmissionMethods.map((tm) => (
              <div
                key={tm.method}
                className="rounded-2xl p-6 text-center"
                style={{
                  backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF',
                  border: `1px solid ${borderColor}`,
                }}
              >
                <h4 className="text-[17px] font-semibold" style={{ color: textPrimary }}>
                  {tm.method}
                </h4>
                <p className="text-[14px] mt-3 leading-relaxed" style={{ color: textSecondary }}>
                  {tm.description}
                </p>
                <span
                  className="inline-block mt-4 text-[11px] uppercase tracking-wide px-3 py-1 rounded-full font-medium"
                  style={{
                    backgroundColor: tm.riskLevel === 'high' ? '#FF3B3015' : tm.riskLevel === 'moderate' ? '#FF950015' : '#34C75915',
                    color: tm.riskLevel === 'high' ? '#FF3B30' : tm.riskLevel === 'moderate' ? '#FF9500' : '#34C759',
                  }}
                >
                  {tm.riskLevel} risk
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
