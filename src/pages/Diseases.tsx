import { useState } from 'react';
import { useStore } from '../store/useStore';
import { diseases, getSeverityColor } from '../data/diseases';
import Card from '../components/Card';
import Sparkline from '../components/Sparkline';
import SeverityBadge from '../components/SeverityBadge';

interface DiseasesProps {
  onNavigate: (path: string) => void;
}

export default function Diseases({ onNavigate }: DiseasesProps) {
  const { darkMode } = useStore();
  const [search, setSearch] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const textPrimary = darkMode ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = darkMode ? '#A1A1A6' : '#6E6E73';
  const textTertiary = darkMode ? '#6E6E73' : '#86868B';
  const borderColor = darkMode ? '#2C2C2E' : '#D2D2D7';

  const filtered = diseases.filter(d => {
    if (search && !d.name.toLowerCase().includes(search.toLowerCase()) && !d.scientificName.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterSeverity !== 'all' && d.severity !== filterSeverity) return false;
    if (filterType !== 'all' && d.pathogenType !== filterType) return false;
    return true;
  });

  const types = Array.from(new Set(diseases.map(d => d.pathogenType)));

  return (
    <div className="pt-[52px] min-h-screen" style={{ backgroundColor: darkMode ? '#000' : '#FFF' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center py-16 md:py-24">
          <p className="text-[12px] uppercase tracking-[0.1em] font-medium mb-4" style={{ color: textTertiary }}>
            DISEASE CATALOG
          </p>
          <h1 className="text-[36px] md:text-[48px] font-bold tracking-tight" style={{ color: textPrimary, letterSpacing: '-0.025em' }}>
            Global Disease Index
          </h1>
          <p className="text-[17px] md:text-[19px] mt-5 max-w-[540px] mx-auto leading-relaxed" style={{ color: textSecondary }}>
            Every disease we track, with comprehensive data from verified sources. Click any disease for its full intelligence page.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search diseases..."
            className="px-5 py-3 rounded-full text-[15px] w-[280px] border-0 outline-none"
            style={{
              backgroundColor: darkMode ? '#1C1C1E' : '#F5F5F7',
              color: textPrimary,
              border: `1px solid ${borderColor}`,
              fontFamily: 'inherit',
            }}
          />
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="px-4 py-3 rounded-full text-[13px] border-0 outline-none cursor-pointer"
            style={{
              backgroundColor: darkMode ? '#1C1C1E' : '#F5F5F7',
              color: textPrimary,
              border: `1px solid ${borderColor}`,
            }}
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="elevated">Elevated</option>
            <option value="watch">Watch</option>
            <option value="monitoring">Monitoring</option>
            <option value="contained">Contained</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 rounded-full text-[13px] border-0 outline-none cursor-pointer"
            style={{
              backgroundColor: darkMode ? '#1C1C1E' : '#F5F5F7',
              color: textPrimary,
              border: `1px solid ${borderColor}`,
            }}
          >
            <option value="all">All Pathogens</option>
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
          {filtered.map((disease) => {
            const severityColor = getSeverityColor(disease.severity);
            return (
              <Card
                key={disease.id}
                severity={severityColor}
                onClick={() => onNavigate(`/disease/${disease.slug}`)}
              >
                <div className="pt-2">
                  <SeverityBadge severity={disease.severity} />
                  <h3 className="text-[22px] font-semibold mt-3" style={{ color: textPrimary }}>
                    {disease.name}
                  </h3>
                  <p className="text-[13px] italic mt-1" style={{ color: textSecondary }}>
                    {disease.scientificName}
                  </p>
                  <div className="mt-2">
                    <span
                      className="inline-block text-[11px] uppercase tracking-wide px-2.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: darkMode ? '#2C2C2E' : '#F5F5F7',
                        color: textSecondary,
                      }}
                    >
                      {disease.pathogenType}
                    </span>
                  </div>
                  <div className="mt-4">
                    <Sparkline data={disease.sparklineData} color={severityColor} width={140} height={36} />
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div>
                      <p className="text-[15px] font-semibold" style={{ fontFamily: 'monospace', color: textPrimary }}>
                        {disease.totalCases.toLocaleString()}
                      </p>
                      <p className="text-[11px] uppercase tracking-wide" style={{ color: textTertiary }}>Total Cases</p>
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold" style={{ fontFamily: 'monospace', color: textPrimary }}>
                        {disease.fatalityRate}
                      </p>
                      <p className="text-[11px] uppercase tracking-wide" style={{ color: textTertiary }}>Fatality Rate</p>
                    </div>
                  </div>
                  <p className="text-[13px] mt-3" style={{ color: textTertiary }}>
                    {disease.regions.join(' · ')}
                  </p>
                  <p className="text-[15px] font-medium mt-4" style={{ color: textPrimary }}>
                    View full report →
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-[19px]" style={{ color: textSecondary }}>No diseases match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
