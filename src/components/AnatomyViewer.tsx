import { useState } from 'react';
import { useStore } from '../store/useStore';
import { organPathology } from '../data/diseaseScience';
import { getSeverityColor } from '../data/diseases';

interface AnatomyViewerProps {
  diseaseSlug?: string;
  onOrganSelect?: (organName: string) => void;
}

interface OrganData {
  name: string;
  path: string;
  labelPosition: { x: number; y: number };
  affectedBy: string[];
}

// Detailed SVG paths for human organs
const organs: OrganData[] = [
  {
    name: 'Brain',
    path: 'M250,65 C230,65 215,75 210,90 C205,105 210,125 225,140 C230,145 235,148 240,150 C235,155 232,162 235,170 C240,180 250,185 265,185 C280,185 290,180 295,170 C298,162 295,155 290,150 C295,148 300,145 305,140 C320,125 325,105 320,90 C315,75 300,65 280,65 C275,65 270,66 265,68 C260,66 255,65 250,65 Z M230,95 C225,95 222,100 225,108 C228,115 235,118 240,115 M290,95 C295,95 298,100 295,108 C292,115 285,118 280,115 M255,120 L255,135 L265,140 L275,135 L275,120',
    labelPosition: { x: 265, y: 50 },
    affectedBy: ['covid-19', 'ebola'],
  },
  {
    name: 'Lungs',
    path: 'M265,195 L265,220 M265,195 C250,195 235,200 225,215 C215,230 210,250 215,275 C220,300 235,320 260,330 L265,330 L270,330 C295,320 310,300 315,275 C320,250 315,230 305,215 C295,200 280,195 265,195 Z M265,220 C250,220 240,235 238,255 C236,275 242,295 260,305 M265,220 C280,220 290,235 292,255 C294,275 288,295 270,305 M240,240 L245,245 L240,250 L245,255 M290,240 L285,245 L290,250 L285,255',
    labelPosition: { x: 180, y: 260 },
    affectedBy: ['covid-19', 'avian-influenza-h5n1'],
  },
  {
    name: 'Heart',
    path: 'M265,255 C255,250 245,253 238,262 C230,272 230,285 240,298 C250,312 265,325 265,325 C265,325 280,312 290,298 C300,285 300,272 292,262 C285,253 275,250 265,255 Z M252,270 C248,275 248,282 253,288 M278,270 C282,275 282,282 277,288',
    labelPosition: { x: 340, y: 290 },
    affectedBy: ['covid-19', 'ebola'],
  },
  {
    name: 'Liver',
    path: 'M230,335 C215,340 205,355 210,375 C215,395 235,410 265,415 C295,410 315,395 320,375 C325,355 315,340 300,335 L265,335 Z M235,355 C230,360 232,370 240,375 M295,355 C300,360 298,370 290,375 M250,370 L265,380 L280,370',
    labelPosition: { x: 340, y: 375 },
    affectedBy: ['ebola', 'covid-19'],
  },
  {
    name: 'Kidneys',
    path: 'M225,395 C215,398 210,410 215,425 C220,440 235,448 248,445 C260,442 268,430 265,415 C262,400 250,392 235,395 Z M305,395 C315,398 320,410 315,425 C310,440 295,448 282,445 C270,442 262,430 265,415 C268,400 280,392 295,395 Z M230,415 L240,420 L230,425 M300,415 L290,420 L300,425',
    labelPosition: { x: 180, y: 420 },
    affectedBy: ['covid-19'],
  },
  {
    name: 'Stomach',
    path: 'M245,365 C235,370 228,385 235,405 C242,425 260,435 280,430 C295,425 305,410 300,390 C295,375 280,365 265,365 C258,365 252,365 245,368 Z M255,390 C250,395 252,405 260,408 M280,385 L288,395',
    labelPosition: { x: 180, y: 390 },
    affectedBy: ['cholera'],
  },
  {
    name: 'Intestines',
    path: 'M235,440 Q245,455 265,455 Q285,455 295,440 M240,460 Q255,475 280,475 Q295,470 300,455 M238,478 Q260,495 290,480 M245,495 Q265,508 285,495 M250,510 Q265,520 280,510',
    labelPosition: { x: 340, y: 470 },
    affectedBy: ['cholera', 'ebola'],
  },
  {
    name: 'Skin',
    path: 'M180,180 L180,520 M350,180 L350,520 M175,175 C175,160 185,150 200,150 L330,150 C345,150 355,160 355,175 L355,525 C355,540 345,550 330,550 L200,550 C185,550 175,540 175,525 Z',
    labelPosition: { x: 100, y: 350 },
    affectedBy: ['mpox'],
  },
];

export default function AnatomyViewer({ diseaseSlug, onOrganSelect }: AnatomyViewerProps) {
  const { darkMode } = useStore();
  const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null);
  const [hoveredOrgan, setHoveredOrgan] = useState<string | null>(null);

  const textPrimary = darkMode ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = darkMode ? '#A1A1A6' : '#6E6E73';
  const bgColor = darkMode ? '#0A0A0A' : '#F5F5F7';

  const handleOrganClick = (organName: string) => {
    setSelectedOrgan(organName);
    onOrganSelect?.(organName);
  };

  // Get pathology data for selected organ
  const selectedOrganPathology = selectedOrgan
    ? organPathology.find(o => o.organName === selectedOrgan)
    : null;

  const diseaseEffect = selectedOrganPathology?.diseaseEffects.find(
    e => e.diseaseSlug === diseaseSlug
  );

  const getOrganColor = (organ: OrganData) => {
    if (!diseaseSlug) return darkMode ? '#3a4a5a' : '#c8d8e8';
    
    const isAffected = organ.affectedBy.includes(diseaseSlug);
    if (!isAffected) return darkMode ? '#2a3a4a' : '#d8e8f0';
    
    const pathology = organPathology.find(o => o.organName === organ.name);
    const effect = pathology?.diseaseEffects.find(e => e.diseaseSlug === diseaseSlug);
    
    if (!effect) return darkMode ? '#4a5a6a' : '#b8c8d8';
    
    // Color based on severity of effect
    const hasCritical = effect.clinicalManifestations.some(m => 
      m.toLowerCase().includes('ards') || 
      m.toLowerCase().includes('failure') ||
      m.toLowerCase().includes('death')
    );
    
    if (hasCritical) return getSeverityColor('critical');
    return getSeverityColor('elevated');
  };

  const getOrganOpacity = (organ: OrganData) => {
    if (selectedOrgan && selectedOrgan !== organ.name) return 0.3;
    if (hoveredOrgan === organ.name) return 1;
    if (!diseaseSlug) return 0.7;
    return organ.affectedBy.includes(diseaseSlug) ? 0.9 : 0.4;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Anatomy SVG */}
      <div 
        className="relative rounded-2xl p-8 flex items-center justify-center"
        style={{ backgroundColor: bgColor, minHeight: '600px' }}
      >
        <svg
          viewBox="120 100 280 480"
          className="w-full max-w-[350px] h-auto"
          style={{ maxHeight: '550px' }}
        >
          <defs>
            {/* Gradient for body outline */}
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={darkMode ? '#2a3a4a' : '#e0e8f0'} />
              <stop offset="100%" stopColor={darkMode ? '#1a2a3a' : '#c8d8e8'} />
            </linearGradient>
            
            {/* Glow for selected organ */}
            <filter id="organGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Body silhouette */}
          <ellipse cx="265" cy="135" rx="35" ry="40" fill="url(#bodyGradient)" opacity="0.3" />
          <path 
            d="M265,175 L265,350 M265,200 L200,280 M265,200 L330,280 M265,350 L220,550 M265,350 L310,550" 
            stroke={darkMode ? '#3a4a5a' : '#b8c8d8'}
            strokeWidth="20"
            strokeLinecap="round"
            fill="none"
            opacity="0.3"
          />

          {/* Organs */}
          {organs.map((organ) => {
            const color = getOrganColor(organ);
            const opacity = getOrganOpacity(organ);
            const isSelected = selectedOrgan === organ.name;
            const isHovered = hoveredOrgan === organ.name;

            return (
              <g
                key={organ.name}
                onClick={() => handleOrganClick(organ.name)}
                onMouseEnter={() => setHoveredOrgan(organ.name)}
                onMouseLeave={() => setHoveredOrgan(null)}
                className="cursor-pointer transition-all duration-300"
                style={{ opacity }}
              >
                <path
                  d={organ.path}
                  fill={organ.name === 'Skin' ? 'none' : color}
                  stroke={organ.name === 'Skin' ? color : darkMode ? '#fff' : '#333'}
                  strokeWidth={organ.name === 'Skin' ? 2 : 1}
                  strokeDasharray={organ.name === 'Skin' ? '4,4' : 'none'}
                  filter={isSelected || isHovered ? 'url(#organGlow)' : undefined}
                  style={{ transition: 'all 0.3s ease' }}
                />
                
                {/* Pulse animation for affected organs */}
                {diseaseSlug && organ.affectedBy.includes(diseaseSlug) && organ.name !== 'Skin' && (
                  <path
                    d={organ.path}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    opacity="0"
                  >
                    <animate attributeName="opacity" values="0.5;0" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="stroke-width" values="2;8" dur="2s" repeatCount="indefinite" />
                  </path>
                )}
              </g>
            );
          })}

          {/* Organ labels */}
          {organs.map((organ) => {
            const isSelected = selectedOrgan === organ.name || hoveredOrgan === organ.name;
            if (organ.name === 'Skin') return null;
            
            return (
              <g key={`label-${organ.name}`} opacity={isSelected ? 1 : 0.7}>
                <line
                  x1={organ.labelPosition.x < 265 ? organ.labelPosition.x + 40 : organ.labelPosition.x - 40}
                  y1={organ.labelPosition.y + 10}
                  x2={organ.labelPosition.x < 265 ? 220 : 310}
                  y2={organ.labelPosition.y + 10}
                  stroke={darkMode ? '#6E6E73' : '#86868B'}
                  strokeWidth="0.5"
                  strokeDasharray="2,2"
                />
                <text
                  x={organ.labelPosition.x}
                  y={organ.labelPosition.y + 15}
                  fill={isSelected ? textPrimary : textSecondary}
                  fontSize="11"
                  fontWeight={isSelected ? '600' : '400'}
                  textAnchor={organ.labelPosition.x < 265 ? 'end' : 'start'}
                  style={{ fontFamily: 'inherit' }}
                >
                  {organ.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        {diseaseSlug && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5" style={{ color: textSecondary }}>
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: getSeverityColor('critical') }} />
                Severe effect
              </span>
              <span className="flex items-center gap-1.5" style={{ color: textSecondary }}>
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: getSeverityColor('elevated') }} />
                Moderate effect
              </span>
              <span className="flex items-center gap-1.5" style={{ color: textSecondary }}>
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: darkMode ? '#2a3a4a' : '#d8e8f0' }} />
                Not affected
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Information Panel */}
      <div className="space-y-6">
        {selectedOrgan ? (
          <>
            <div className="text-center lg:text-left">
              <h3 className="text-[28px] font-semibold" style={{ color: textPrimary }}>
                {selectedOrgan}
              </h3>
              {selectedOrganPathology && (
                <p className="text-[15px] mt-2 leading-relaxed" style={{ color: textSecondary }}>
                  {selectedOrganPathology.normalFunction}
                </p>
              )}
            </div>

            {selectedOrganPathology && (
              <div className="space-y-4">
                <h4 className="text-[15px] font-semibold" style={{ color: textPrimary }}>
                  Cell Types
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedOrganPathology.cellTypes.map((cell) => (
                    <span
                      key={cell}
                      className="text-[12px] px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: darkMode ? '#1C1C1E' : '#FFFFFF',
                        color: textSecondary,
                        border: `1px solid ${darkMode ? '#2C2C2E' : '#D2D2D7'}`,
                      }}
                    >
                      {cell}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {diseaseEffect && (
              <>
                <div className="space-y-3">
                  <h4 className="text-[15px] font-semibold" style={{ color: textPrimary }}>
                    Pathophysiology
                  </h4>
                  <p className="text-[14px] leading-relaxed" style={{ color: textSecondary }}>
                    {diseaseEffect.mechanism}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[15px] font-semibold" style={{ color: textPrimary }}>
                    Cellular Damage
                  </h4>
                  <ul className="space-y-1.5">
                    {diseaseEffect.cellularDamage.map((damage, i) => (
                      <li key={i} className="text-[13px] flex items-start gap-2" style={{ color: textSecondary }}>
                        <span className="text-[#FF3B30] mt-0.5">•</span>
                        {damage}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[15px] font-semibold" style={{ color: textPrimary }}>
                    Histopathology
                  </h4>
                  <ul className="space-y-1.5">
                    {diseaseEffect.histopathology.map((finding, i) => (
                      <li key={i} className="text-[13px] flex items-start gap-2" style={{ color: textSecondary }}>
                        <span className="text-[#FF9500] mt-0.5">•</span>
                        {finding}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[15px] font-semibold" style={{ color: textPrimary }}>
                    Clinical Manifestations
                  </h4>
                  <ul className="space-y-1.5">
                    {diseaseEffect.clinicalManifestations.map((manifestation, i) => (
                      <li key={i} className="text-[13px] flex items-start gap-2" style={{ color: textSecondary }}>
                        <span className="text-[#007AFF] mt-0.5">•</span>
                        {manifestation}
                      </li>
                    ))}
                  </ul>
                </div>

                {diseaseEffect.longTermSequelae.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-[15px] font-semibold" style={{ color: textPrimary }}>
                      Long-term Sequelae
                    </h4>
                    <ul className="space-y-1.5">
                      {diseaseEffect.longTermSequelae.map((sequela, i) => (
                        <li key={i} className="text-[13px] flex items-start gap-2" style={{ color: textSecondary }}>
                          <span className="text-[#AF52DE] mt-0.5">•</span>
                          {sequela}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {diseaseEffect.imagingFindings && diseaseEffect.imagingFindings.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-[15px] font-semibold" style={{ color: textPrimary }}>
                      Imaging Findings
                    </h4>
                    <ul className="space-y-1.5">
                      {diseaseEffect.imagingFindings.map((finding, i) => (
                        <li key={i} className="text-[13px] flex items-start gap-2" style={{ color: textSecondary }}>
                          <span className="text-[#34C759] mt-0.5">•</span>
                          {finding}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-[17px]" style={{ color: textSecondary }}>
              Click on an organ to see detailed pathophysiology
            </p>
            {diseaseSlug && (
              <p className="text-[14px] mt-2" style={{ color: darkMode ? '#6E6E73' : '#86868B' }}>
                Highlighted organs are affected by this disease
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
