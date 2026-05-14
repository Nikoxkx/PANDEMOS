import { useState } from 'react';
import { useStore } from '../store/useStore';
import { organPathology } from '../data/diseaseScience';
import { getSeverityColor } from '../data/diseases';

interface AnatomyViewerProps {
  diseaseSlug?: string;
  onOrganSelect?: (organName: string) => void;
}

interface BodyPart {
  name: string;
  icon: string;
  system: string;
  affectedBy: string[];
}

const bodyParts: BodyPart[] = [
  { name: 'Brain', icon: '🧠', system: 'Nervous', affectedBy: ['covid-19', 'ebola', 'measles', 'rabies'] },
  { name: 'Lungs', icon: '🫁', system: 'Respiratory', affectedBy: ['covid-19', 'avian-influenza-h5n1', 'tuberculosis', 'pneumonia'] },
  { name: 'Heart', icon: '❤️', system: 'Cardiovascular', affectedBy: ['covid-19', 'ebola', 'chagas-disease'] },
  { name: 'Liver', icon: '🫀', system: 'Digestive', affectedBy: ['ebola', 'hepatitis-b', 'hepatitis-c', 'yellow-fever'] },
  { name: 'Kidneys', icon: '🫘', system: 'Urinary', affectedBy: ['covid-19', 'hantavirus', 'leptospirosis'] },
  { name: 'Stomach', icon: '🔴', system: 'Digestive', affectedBy: ['cholera', 'norovirus', 'rotavirus'] },
  { name: 'Intestines', icon: '🟤', system: 'Digestive', affectedBy: ['cholera', 'ebola', 'typhoid', 'dysentery'] },
  { name: 'Skin', icon: '🟨', system: 'Integumentary', affectedBy: ['mpox', 'smallpox', 'chickenpox', 'measles'] },
  { name: 'Blood', icon: '🩸', system: 'Circulatory', affectedBy: ['ebola', 'dengue', 'malaria', 'hiv-aids'] },
  { name: 'Lymph Nodes', icon: '⚪', system: 'Lymphatic', affectedBy: ['plague', 'hiv-aids', 'tuberculosis'] },
];

export default function AnatomyViewer({ diseaseSlug, onOrganSelect }: AnatomyViewerProps) {
  const { darkMode } = useStore();
  const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null);
  const [hoveredOrgan, setHoveredOrgan] = useState<string | null>(null);

  const textPrimary = darkMode ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = darkMode ? '#A1A1A6' : '#6E6E73';
  const textTertiary = darkMode ? '#6E6E73' : '#86868B';

  const handleOrganClick = (organName: string) => {
    setSelectedOrgan(organName === selectedOrgan ? null : organName);
    onOrganSelect?.(organName);
  };

  const selectedOrganPathology = selectedOrgan
    ? organPathology.find(o => o.organName === selectedOrgan)
    : null;

  const diseaseEffect = selectedOrganPathology?.diseaseEffects.find(
    e => e.diseaseSlug === diseaseSlug
  );

  const isAffected = (part: BodyPart) => diseaseSlug ? part.affectedBy.includes(diseaseSlug) : false;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Body Parts Grid */}
      <div 
        className="rounded-2xl p-6"
        style={{ 
          backgroundColor: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
          border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)',
        }}
      >
        <h3 className="text-[15px] font-semibold mb-4 text-center" style={{ color: textPrimary }}>
          Affected Body Systems
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {bodyParts.map((part) => {
            const affected = isAffected(part);
            const isSelected = selectedOrgan === part.name;
            const isHovered = hoveredOrgan === part.name;
            
            return (
              <button
                key={part.name}
                onClick={() => handleOrganClick(part.name)}
                onMouseEnter={() => setHoveredOrgan(part.name)}
                onMouseLeave={() => setHoveredOrgan(null)}
                className="flex flex-col items-center p-4 rounded-xl transition-all duration-300"
                style={{
                  backgroundColor: isSelected 
                    ? (affected ? `${getSeverityColor('critical')}20` : (darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'))
                    : (darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'),
                  border: `1px solid ${
                    isSelected 
                      ? (affected ? getSeverityColor('critical') : (darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'))
                      : (darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)')
                  }`,
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                  opacity: diseaseSlug ? (affected ? 1 : 0.5) : 1,
                }}
              >
                <span className="text-2xl mb-2">{part.icon}</span>
                <span className="text-[11px] font-medium" style={{ color: textPrimary }}>{part.name}</span>
                <span className="text-[9px] mt-0.5" style={{ color: textTertiary }}>{part.system}</span>
                {affected && diseaseSlug && (
                  <span 
                    className="mt-2 text-[8px] px-2 py-0.5 rounded-full font-medium"
                    style={{ 
                      backgroundColor: `${getSeverityColor('critical')}20`,
                      color: getSeverityColor('critical'),
                    }}
                  >
                    AFFECTED
                  </span>
                )}
              </button>
            );
          })}
        </div>
        
        {diseaseSlug && (
          <p className="text-[11px] text-center mt-4" style={{ color: textTertiary }}>
            Click on any body part to see detailed pathophysiology and how this disease affects it
          </p>
        )}
      </div>

      {/* Information Panel */}
      <div 
        className="rounded-2xl p-6"
        style={{ 
          backgroundColor: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
          border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)',
          minHeight: '400px',
        }}
      >
        {selectedOrgan ? (
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{bodyParts.find(p => p.name === selectedOrgan)?.icon}</span>
                <div>
                  <h3 className="text-[22px] font-semibold" style={{ color: textPrimary }}>
                    {selectedOrgan}
                  </h3>
                  <p className="text-[12px]" style={{ color: textTertiary }}>
                    {bodyParts.find(p => p.name === selectedOrgan)?.system} System
                  </p>
                </div>
              </div>
              {selectedOrganPathology && (
                <p className="text-[14px] mt-3 leading-relaxed" style={{ color: textSecondary }}>
                  {selectedOrganPathology.normalFunction}
                </p>
              )}
            </div>

            {selectedOrganPathology && (
              <div>
                <h4 className="text-[13px] font-semibold mb-2" style={{ color: textPrimary }}>Cell Types</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedOrganPathology.cellTypes.map((cell) => (
                    <span
                      key={cell}
                      className="text-[10px] px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                        color: textSecondary,
                      }}
                    >
                      {cell}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {diseaseEffect ? (
              <>
                <div>
                  <h4 className="text-[13px] font-semibold mb-2" style={{ color: textPrimary }}>
                    How This Disease Affects The {selectedOrgan}
                  </h4>
                  <p className="text-[13px] leading-relaxed" style={{ color: textSecondary }}>
                    {diseaseEffect.mechanism}
                  </p>
                </div>

                <div>
                  <h4 className="text-[13px] font-semibold mb-2" style={{ color: textPrimary }}>Cellular Damage</h4>
                  <ul className="space-y-1">
                    {diseaseEffect.cellularDamage.map((damage, i) => (
                      <li key={i} className="text-[12px] flex items-start gap-2" style={{ color: textSecondary }}>
                        <span style={{ color: getSeverityColor('critical') }}>•</span>
                        {damage}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[13px] font-semibold mb-2" style={{ color: textPrimary }}>Clinical Signs</h4>
                  <ul className="space-y-1">
                    {diseaseEffect.clinicalManifestations.map((sign, i) => (
                      <li key={i} className="text-[12px] flex items-start gap-2" style={{ color: textSecondary }}>
                        <span style={{ color: '#007AFF' }}>•</span>
                        {sign}
                      </li>
                    ))}
                  </ul>
                </div>

                {diseaseEffect.longTermSequelae.length > 0 && (
                  <div>
                    <h4 className="text-[13px] font-semibold mb-2" style={{ color: textPrimary }}>Long-term Effects</h4>
                    <ul className="space-y-1">
                      {diseaseEffect.longTermSequelae.map((effect, i) => (
                        <li key={i} className="text-[12px] flex items-start gap-2" style={{ color: textSecondary }}>
                          <span style={{ color: '#AF52DE' }}>•</span>
                          {effect}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div 
                className="p-4 rounded-xl text-center"
                style={{ 
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                }}
              >
                <p className="text-[13px]" style={{ color: textSecondary }}>
                  {diseaseSlug 
                    ? `This disease does not primarily affect the ${selectedOrgan.toLowerCase()}.`
                    : `Select a disease to see how it affects the ${selectedOrgan.toLowerCase()}.`
                  }
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center py-12">
            <span className="text-5xl mb-4">🫀</span>
            <p className="text-[17px] font-medium" style={{ color: textPrimary }}>
              Select a Body Part
            </p>
            <p className="text-[14px] mt-2 max-w-[280px]" style={{ color: textSecondary }}>
              Click on any body part above to see detailed information about how diseases affect it
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
