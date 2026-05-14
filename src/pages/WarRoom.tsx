import { useState } from 'react';
import { useStore } from '../store/useStore';
import { diseases, getSeverityColor, globalStats } from '../data/diseases';
import WorldMap, { MapPoint } from '../components/WorldMap';
import SeverityBadge from '../components/SeverityBadge';

interface WarRoomProps {
  onNavigate: (path: string) => void;
}

export default function WarRoom({ onNavigate }: WarRoomProps) {
  const { darkMode } = useStore();
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [filterDisease, setFilterDisease] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const textPrimary = darkMode ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = darkMode ? '#A1A1A6' : '#6E6E73';
  const textTertiary = darkMode ? '#6E6E73' : '#86868B';
  const surface = darkMode ? '#1C1C1E' : '#FFFFFF';
  const borderColor = darkMode ? '#2C2C2E' : '#D2D2D7';

  const uniqueDiseases = ['Mpox', 'H5N1', 'COVID-19', 'Cholera', 'Ebola', 'Marburg'];

  const handlePointClick = (point: MapPoint) => {
    setSelectedPoint(point);
  };

  const tierColors: Record<number, string> = {
    1: '#34C759',
    2: '#007AFF',
    3: '#FF9500',
    4: '#FFCC00',
    5: '#FF3B30',
  };

  const tierNames: Record<number, string> = {
    1: 'Gold Standard',
    2: 'Highly Credible',
    3: 'Credible',
    4: 'Preliminary',
    5: 'Unverified',
  };

  return (
    <div className="min-h-screen pt-[52px]" style={{ backgroundColor: darkMode ? '#000' : '#FFF' }}>
      {/* Info Bar */}
      <div
        className="h-[44px] flex items-center justify-center gap-8 text-[13px] px-4"
        style={{
          backgroundColor: darkMode ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          borderBottom: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <span style={{ color: textSecondary }}>
          <strong style={{ color: textPrimary }}>{globalStats.activeOutbreaks}</strong> Active Outbreaks
        </span>
        <span className="hidden md:inline" style={{ color: textSecondary }}>
          <strong style={{ color: textPrimary }}>{globalStats.countriesAffected}</strong> Countries
        </span>
        <span className="hidden md:inline flex items-center gap-1.5" style={{ color: textSecondary }}>
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#34C759' }} />
          Live data
        </span>
      </div>

      {/* Map area */}
      <div className="relative" style={{ height: 'calc(100vh - 96px)' }}>
        {/* Full Map */}
        <div className="absolute inset-0">
          <WorldMap
            onPointClick={handlePointClick}
            selectedDisease={filterDisease}
            selectedSeverity={filterSeverity}
          />
        </div>

        {/* Filter Panel — top left */}
        <div
          className="absolute top-4 left-4 rounded-2xl p-4 w-[200px] hidden md:block"
          style={{
            backgroundColor: darkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <p className="text-[11px] uppercase tracking-[0.06em] font-semibold mb-3" style={{ color: textTertiary }}>
            Filters
          </p>
          
          <label className="block text-[12px] mb-1.5" style={{ color: textSecondary }}>Disease</label>
          <select
            value={filterDisease}
            onChange={(e) => setFilterDisease(e.target.value)}
            className="w-full rounded-lg px-3 py-2 text-[13px] mb-3 border-0 outline-none cursor-pointer"
            style={{
              backgroundColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
              color: textPrimary,
            }}
          >
            <option value="all">All Diseases</option>
            {uniqueDiseases.map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          <label className="block text-[12px] mb-1.5" style={{ color: textSecondary }}>Severity</label>
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="w-full rounded-lg px-3 py-2 text-[13px] border-0 outline-none cursor-pointer"
            style={{
              backgroundColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
              color: textPrimary,
            }}
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="elevated">Elevated</option>
            <option value="watch">Watch</option>
            <option value="monitoring">Monitoring</option>
            <option value="contained">Contained</option>
          </select>
        </div>

        {/* Legend — top right */}
        <div
          className="absolute top-4 right-4 rounded-2xl p-4 hidden md:block"
          style={{
            backgroundColor: darkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <p className="text-[11px] uppercase tracking-[0.06em] font-semibold mb-3" style={{ color: textTertiary }}>
            Severity Legend
          </p>
          <div className="space-y-2">
            {['critical', 'elevated', 'watch', 'monitoring', 'contained'].map((sev) => (
              <div key={sev} className="flex items-center gap-2 text-[12px]">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: getSeverityColor(sev) }} />
                <span className="capitalize" style={{ color: textSecondary }}>{sev}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline scrubber — bottom center */}
        <div
          className="absolute bottom-4 left-4 right-4 md:left-8 md:right-8 h-[52px] rounded-2xl flex items-center gap-4 px-4 md:px-6"
          style={{
            backgroundColor: darkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="border-0 bg-transparent cursor-pointer p-2 rounded-lg transition-colors"
            style={{ color: textPrimary }}
          >
            {isPlaying ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          
          <div className="flex-1 relative">
            <div className="h-1 rounded-full" style={{ backgroundColor: borderColor }}>
              <div 
                className="h-full rounded-full transition-all duration-300" 
                style={{ backgroundColor: textPrimary, width: '45%' }} 
              />
            </div>
            <div
              className="absolute top-1/2 w-3 h-3 rounded-full -translate-y-1/2 cursor-grab"
              style={{ backgroundColor: textPrimary, left: '45%', transform: 'translate(-50%, -50%)' }}
            />
          </div>
          
          <div className="hidden md:flex items-center gap-1">
            {[
              { label: '1x', value: 1 },
              { label: '2x', value: 2 },
              { label: '5x', value: 5 },
            ].map(s => (
              <button
                key={s.value}
                onClick={() => setPlaybackSpeed(s.value)}
                className="text-[11px] px-2 py-1 rounded-md border-0 cursor-pointer transition-colors"
                style={{ 
                  color: playbackSpeed === s.value ? textPrimary : textTertiary,
                  backgroundColor: playbackSpeed === s.value ? (darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)') : 'transparent',
                  fontFamily: 'inherit' 
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
          
          <span className="text-[13px] hidden md:inline" style={{ fontFamily: 'monospace', color: textSecondary }}>
            Jan 15, 2024
          </span>
        </div>

        {/* Selected Point Detail Panel */}
        {selectedPoint && (
          <>
            {/* Backdrop */}
            <div
              className="absolute inset-0 z-[10]"
              style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
              onClick={() => setSelectedPoint(null)}
            />
            
            {/* Detail Sheet */}
            <div
              className="absolute bottom-0 left-0 right-0 z-[20] rounded-t-3xl overflow-hidden"
              style={{
                backgroundColor: darkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                boxShadow: '0 -8px 40px rgba(0,0,0,0.3)',
                maxHeight: '75vh',
                border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)',
              }}
            >
              {/* Drag handle */}
              <div className="flex justify-center py-3">
                <div className="w-10 h-1 rounded-full" style={{ backgroundColor: borderColor }} />
              </div>
              
              <div className="px-6 pb-8 overflow-y-auto" style={{ maxHeight: 'calc(75vh - 40px)' }}>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="mb-3">
                    <SeverityBadge severity={selectedPoint.severity} size="md" />
                  </div>
                  <h2 className="text-[24px] font-semibold" style={{ color: textPrimary }}>
                    {selectedPoint.disease}
                  </h2>
                  <p className="text-[15px] mt-1" style={{ color: textSecondary }}>
                    {selectedPoint.name}, {selectedPoint.country}
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-[800px] mx-auto">
                  <div className="text-center p-4 rounded-xl" style={{ backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)' }}>
                    <p className="text-[22px] font-semibold" style={{ fontFamily: 'monospace', color: textPrimary }}>
                      {selectedPoint.cases.toLocaleString()}
                    </p>
                    <p className="text-[11px] uppercase tracking-wide mt-1" style={{ color: textTertiary }}>
                      Confirmed Cases
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-xl" style={{ backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)' }}>
                    <p className="text-[22px] font-semibold" style={{ fontFamily: 'monospace', color: '#FF3B30' }}>
                      {selectedPoint.deaths.toLocaleString()}
                    </p>
                    <p className="text-[11px] uppercase tracking-wide mt-1" style={{ color: textTertiary }}>
                      Deaths
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-xl" style={{ backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)' }}>
                    <p className="text-[22px] font-semibold" style={{ fontFamily: 'monospace', color: textPrimary }}>
                      {selectedPoint.cases > 0 ? ((selectedPoint.deaths / selectedPoint.cases) * 100).toFixed(1) : '0'}%
                    </p>
                    <p className="text-[11px] uppercase tracking-wide mt-1" style={{ color: textTertiary }}>
                      Case Fatality
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-xl" style={{ backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)' }}>
                    <p className="text-[15px] font-semibold" style={{ fontFamily: 'monospace', color: textPrimary }}>
                      {selectedPoint.date}
                    </p>
                    <p className="text-[11px] uppercase tracking-wide mt-1" style={{ color: textTertiary }}>
                      Last Update
                    </p>
                  </div>
                </div>

                {/* Report Details */}
                <div className="max-w-[700px] mx-auto mb-8">
                  <h3 className="text-[15px] font-semibold mb-3 text-center" style={{ color: textPrimary }}>
                    Situation Report
                  </h3>
                  <p className="text-[15px] leading-relaxed text-center" style={{ color: textSecondary }}>
                    {selectedPoint.reportDetails}
                  </p>
                </div>

                {/* Source Information */}
                <div className="max-w-[600px] mx-auto p-5 rounded-xl text-center mb-6" style={{ 
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                  border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)',
                }}>
                  <h4 className="text-[13px] uppercase tracking-wide font-semibold mb-3" style={{ color: textTertiary }}>
                    Primary Source
                  </h4>
                  <p className="text-[17px] font-semibold" style={{ color: textPrimary }}>
                    {selectedPoint.sourceFull}
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <span
                      className="inline-flex items-center gap-1.5 text-[12px] px-3 py-1 rounded-full font-medium"
                      style={{
                        backgroundColor: `${tierColors[selectedPoint.tier]}20`,
                        color: tierColors[selectedPoint.tier],
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tierColors[selectedPoint.tier] }} />
                      Tier {selectedPoint.tier}: {tierNames[selectedPoint.tier]}
                    </span>
                  </div>
                  <p className="text-[13px] mt-3" style={{ color: textTertiary }}>
                    Reported: {selectedPoint.date}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => {
                      const d = diseases.find(dis => dis.name === selectedPoint.disease);
                      if (d) onNavigate(`/disease/${d.slug}`);
                      setSelectedPoint(null);
                    }}
                    className="px-6 py-3 rounded-full text-[15px] font-medium cursor-pointer border-0"
                    style={{
                      backgroundColor: darkMode ? '#F5F5F7' : '#1D1D1F',
                      color: darkMode ? '#1D1D1F' : '#FFFFFF',
                      fontFamily: 'inherit',
                    }}
                  >
                    View Disease Profile
                  </button>
                  <button
                    className="px-6 py-3 rounded-full text-[15px] font-medium cursor-pointer"
                    style={{
                      backgroundColor: 'transparent',
                      color: textPrimary,
                      border: `1px solid ${textPrimary}`,
                      fontFamily: 'inherit',
                    }}
                  >
                    View Original Report ↗
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
