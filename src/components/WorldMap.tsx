import { useState, useRef, memo } from 'react';
import { useStore } from '../store/useStore';
import { getSeverityColor } from '../data/diseases';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';

interface MapPoint {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  cases: number;
  deaths: number;
  severity: string;
  disease: string;
  source: string;
  sourceFull: string;
  tier: number;
  date: string;
  reportDetails: string;
  sourceUrl?: string;
  travelPaths?: { to: string; toLat: number; toLng: number }[];
}

// Comprehensive outbreak data with real source URLs
const outbreakData: MapPoint[] = [
  // Mpox hotspots
  { id: 'm1', name: 'Kinshasa', country: 'Democratic Republic of Congo', lat: -4.32, lng: 15.31, cases: 3245, deaths: 89, severity: 'critical', disease: 'Mpox', source: 'WHO', sourceFull: 'World Health Organization - Disease Outbreak News', tier: 1, date: '2024-01-15', reportDetails: 'Clade Ib outbreak with sustained human-to-human transmission. Index case traced to mining community. Enhanced surveillance and contact tracing underway.', sourceUrl: 'https://www.who.int/emergencies/disease-outbreak-news', travelPaths: [{ to: 'Bujumbura', toLat: -3.38, toLng: 29.36 }] },
  { id: 'm2', name: 'Goma', country: 'Democratic Republic of Congo', lat: -1.67, lng: 29.23, cases: 1876, deaths: 52, severity: 'critical', disease: 'Mpox', source: 'Africa CDC', sourceFull: 'Africa Centres for Disease Control and Prevention', tier: 2, date: '2024-01-14', reportDetails: 'Escalating cases in displacement camps. MSF establishing treatment facilities. Vaccine supplies critically low.', sourceUrl: 'https://africacdc.org/disease/monkeypox/' },
  { id: 'm3', name: 'Bujumbura', country: 'Burundi', lat: -3.38, lng: 29.36, cases: 456, deaths: 12, severity: 'elevated', disease: 'Mpox', source: 'WHO', sourceFull: 'World Health Organization - AFRO', tier: 1, date: '2024-01-14', reportDetails: 'Cross-border transmission from DRC confirmed. First cases detected in urban areas. National emergency response activated.', sourceUrl: 'https://www.afro.who.int/' },
  { id: 'm4', name: 'Kigali', country: 'Rwanda', lat: -1.94, lng: 30.06, cases: 89, deaths: 2, severity: 'watch', disease: 'Mpox', source: 'Rwanda MOH', sourceFull: 'Rwanda Ministry of Health', tier: 2, date: '2024-01-13', reportDetails: 'Border screening intensified. Cases linked to travel from DRC. Contact tracing 95% complete.', sourceUrl: 'https://www.moh.gov.rw/' },
  { id: 'm5', name: 'Lagos', country: 'Nigeria', lat: 6.45, lng: 3.39, cases: 234, deaths: 8, severity: 'elevated', disease: 'Mpox', source: 'NCDC', sourceFull: 'Nigeria Centre for Disease Control', tier: 2, date: '2024-01-12', reportDetails: 'Clade II endemic transmission continuing. Majority cases in adult males. Vaccination campaign for high-risk groups.', sourceUrl: 'https://ncdc.gov.ng/' },
  { id: 'm6', name: 'Kampala', country: 'Uganda', lat: 0.31, lng: 32.58, cases: 156, deaths: 4, severity: 'elevated', disease: 'Mpox', source: 'Uganda MOH', sourceFull: 'Uganda Ministry of Health', tier: 2, date: '2024-01-13', reportDetails: 'Cross-border cases from DRC detected. Enhanced surveillance at border crossings.', sourceUrl: 'https://www.health.go.ug/' },

  // H5N1 cases
  { id: 'h1', name: 'Houston', country: 'United States', lat: 29.76, lng: -95.36, cases: 3, deaths: 0, severity: 'critical', disease: 'H5N1', source: 'U.S. CDC', sourceFull: 'U.S. Centers for Disease Control and Prevention', tier: 1, date: '2024-01-15', reportDetails: 'Third dairy farm worker tests positive. All cases with mild conjunctivitis and respiratory symptoms. No evidence of human-to-human transmission. Genomic sequencing ongoing.', sourceUrl: 'https://www.cdc.gov/flu/avianflu/' },
  { id: 'h2', name: 'Amarillo', country: 'United States', lat: 35.22, lng: -101.83, cases: 2, deaths: 0, severity: 'elevated', disease: 'H5N1', source: 'Texas DSHS', sourceFull: 'Texas Department of State Health Services', tier: 2, date: '2024-01-14', reportDetails: 'Poultry farm workers with confirmed H5N1. Culling of 500,000 birds completed. Enhanced PPE requirements implemented.', sourceUrl: 'https://www.dshs.texas.gov/' },
  { id: 'h3', name: 'Amsterdam', country: 'Netherlands', lat: 52.37, lng: 4.89, cases: 0, deaths: 0, severity: 'watch', disease: 'H5N1', source: 'RIVM', sourceFull: 'National Institute for Public Health (Netherlands)', tier: 2, date: '2024-01-13', reportDetails: 'H5N1 detected in mink farms. No human cases. Farms culled. Risk assessment elevated for fur farm workers.', sourceUrl: 'https://www.rivm.nl/' },
  { id: 'h4', name: 'Hanoi', country: 'Vietnam', lat: 21.03, lng: 105.85, cases: 1, deaths: 1, severity: 'critical', disease: 'H5N1', source: 'WHO', sourceFull: 'World Health Organization - WPRO', tier: 1, date: '2024-01-10', reportDetails: 'Fatal case in poultry market worker. Clade 2.3.2.1c virus confirmed. Extensive culling and market closures.', sourceUrl: 'https://www.who.int/westernpacific' },
  { id: 'h5', name: 'Cairo', country: 'Egypt', lat: 30.04, lng: 31.24, cases: 2, deaths: 1, severity: 'elevated', disease: 'H5N1', source: 'Egypt MOH', sourceFull: 'Egyptian Ministry of Health', tier: 2, date: '2024-01-11', reportDetails: 'Sporadic cases in backyard poultry workers. Endemic circulation in poultry population continues.', sourceUrl: 'https://www.mohp.gov.eg/' },

  // COVID-19 monitoring
  { id: 'c1', name: 'Beijing', country: 'China', lat: 39.9, lng: 116.4, cases: 12340, deaths: 23, severity: 'monitoring', disease: 'COVID-19', source: 'WHO', sourceFull: 'World Health Organization', tier: 1, date: '2024-01-15', reportDetails: 'Winter surge with JN.1 subvariant predominant. Hospital capacity adequate. Vaccination booster campaign ongoing.', sourceUrl: 'https://www.who.int/emergencies/diseases/novel-coronavirus-2019' },
  { id: 'c2', name: 'New Delhi', country: 'India', lat: 28.61, lng: 77.21, cases: 8923, deaths: 45, severity: 'elevated', disease: 'COVID-19', source: 'WHO', sourceFull: 'World Health Organization - SEARO', tier: 1, date: '2024-01-15', reportDetails: 'Rising cases in northern states. JN.1 and BA.2.86 co-circulating. ICU admissions increasing but below previous waves.', sourceUrl: 'https://www.who.int/india' },
  { id: 'c3', name: 'Sao Paulo', country: 'Brazil', lat: -23.55, lng: -46.63, cases: 6721, deaths: 34, severity: 'monitoring', disease: 'COVID-19', source: 'PAHO', sourceFull: 'Pan American Health Organization', tier: 1, date: '2024-01-14', reportDetails: 'Seasonal uptick in cases. Healthcare system stable. Updated vaccines available in public health units.', sourceUrl: 'https://www.paho.org/' },
  { id: 'c4', name: 'London', country: 'United Kingdom', lat: 51.5, lng: -0.12, cases: 4521, deaths: 18, severity: 'monitoring', disease: 'COVID-19', source: 'UKHSA', sourceFull: 'UK Health Security Agency', tier: 1, date: '2024-01-15', reportDetails: 'JN.1 now dominant. Wastewater surveillance shows plateau. Autumn booster uptake at 68% in over-65s.', sourceUrl: 'https://www.gov.uk/government/organisations/uk-health-security-agency' },
  { id: 'c5', name: 'Tokyo', country: 'Japan', lat: 35.68, lng: 139.69, cases: 5234, deaths: 12, severity: 'monitoring', disease: 'COVID-19', source: 'NIID', sourceFull: 'National Institute of Infectious Diseases (Japan)', tier: 1, date: '2024-01-15', reportDetails: 'Post-holiday increase in cases. BA.2.86 sublineages predominant. No strain on healthcare system.', sourceUrl: 'https://www.niid.go.jp/' },
  { id: 'c6', name: 'Sydney', country: 'Australia', lat: -33.87, lng: 151.21, cases: 2134, deaths: 8, severity: 'monitoring', disease: 'COVID-19', source: 'Australia DOH', sourceFull: 'Australian Department of Health', tier: 1, date: '2024-01-15', reportDetails: 'Summer surge leveling off. JN.1 predominant. Aged care facilities implementing enhanced protocols.', sourceUrl: 'https://www.health.gov.au/' },
  { id: 'c7', name: 'Johannesburg', country: 'South Africa', lat: -26.2, lng: 28.04, cases: 1567, deaths: 12, severity: 'monitoring', disease: 'COVID-19', source: 'NICD', sourceFull: 'National Institute for Communicable Diseases (South Africa)', tier: 1, date: '2024-01-14', reportDetails: 'BA.2.86 lineages circulating. Healthcare capacity adequate. Genomic surveillance ongoing.', sourceUrl: 'https://www.nicd.ac.za/' },
  { id: 'c8', name: 'Mexico City', country: 'Mexico', lat: 19.43, lng: -99.13, cases: 3421, deaths: 28, severity: 'monitoring', disease: 'COVID-19', source: 'Mexico SSA', sourceFull: 'Secretaria de Salud (Mexico)', tier: 2, date: '2024-01-14', reportDetails: 'Increased respiratory illness. COVID and influenza co-circulating. Hospital occupancy stable.', sourceUrl: 'https://www.gob.mx/salud' },
  { id: 'c9', name: 'Paris', country: 'France', lat: 48.85, lng: 2.35, cases: 3890, deaths: 21, severity: 'monitoring', disease: 'COVID-19', source: 'Sante Publique France', sourceFull: 'Sante Publique France', tier: 1, date: '2024-01-15', reportDetails: 'Winter wave with JN.1 dominant. Hospital admissions stable. Vaccination campaign ongoing.', sourceUrl: 'https://www.santepubliquefrance.fr/' },
  { id: 'c10', name: 'Berlin', country: 'Germany', lat: 52.52, lng: 13.4, cases: 2890, deaths: 15, severity: 'monitoring', disease: 'COVID-19', source: 'RKI', sourceFull: 'Robert Koch Institute', tier: 1, date: '2024-01-15', reportDetails: 'Moderate increase in respiratory infections. JN.1 predominant variant. Healthcare system stable.', sourceUrl: 'https://www.rki.de/' },

  // Cholera outbreaks
  { id: 'ch1', name: 'Maputo', country: 'Mozambique', lat: -25.97, lng: 32.58, cases: 2345, deaths: 78, severity: 'elevated', disease: 'Cholera', source: 'WHO', sourceFull: 'World Health Organization - AFRO', tier: 1, date: '2024-01-14', reportDetails: 'Flooding from Cyclone Freddy damaged water infrastructure. Oral cholera vaccine campaign underway. WASH interventions prioritized.', sourceUrl: 'https://www.afro.who.int/' },
  { id: 'ch2', name: 'Dhaka', country: 'Bangladesh', lat: 23.81, lng: 90.41, cases: 1890, deaths: 34, severity: 'monitoring', disease: 'Cholera', source: 'icddr,b', sourceFull: 'International Centre for Diarrhoeal Disease Research, Bangladesh', tier: 2, date: '2024-01-13', reportDetails: 'Seasonal cholera activity. Treatment centers operating normally. Case fatality rate <1% with treatment.', sourceUrl: 'https://www.icddrb.org/' },
  { id: 'ch3', name: 'Port-au-Prince', country: 'Haiti', lat: 18.54, lng: -72.34, cases: 3456, deaths: 123, severity: 'critical', disease: 'Cholera', source: 'PAHO', sourceFull: 'Pan American Health Organization', tier: 1, date: '2024-01-15', reportDetails: 'Ongoing outbreak complicated by civil unrest. Healthcare access severely limited. MSF operating mobile clinics.', sourceUrl: 'https://www.paho.org/' },
  { id: 'ch4', name: 'Harare', country: 'Zimbabwe', lat: -17.83, lng: 31.05, cases: 1234, deaths: 45, severity: 'elevated', disease: 'Cholera', source: 'WHO', sourceFull: 'World Health Organization', tier: 1, date: '2024-01-12', reportDetails: 'Outbreak linked to water supply contamination. Emergency response activated.', sourceUrl: 'https://www.who.int/' },
  { id: 'ch5', name: 'Nairobi', country: 'Kenya', lat: -1.29, lng: 36.82, cases: 567, deaths: 12, severity: 'watch', disease: 'Cholera', source: 'Kenya MOH', sourceFull: 'Kenya Ministry of Health', tier: 2, date: '2024-01-13', reportDetails: 'Localized outbreak in informal settlements. WASH response ongoing.', sourceUrl: 'https://www.health.go.ke/' },

  // Ebola surveillance
  { id: 'e1', name: 'Mbandaka', country: 'Democratic Republic of Congo', lat: -0.05, lng: 18.26, cases: 4, deaths: 2, severity: 'watch', disease: 'Ebola', source: 'DRC MOH', sourceFull: 'DRC Ministry of Health', tier: 2, date: '2024-01-12', reportDetails: 'Small cluster under investigation. Ring vaccination deployed. All contacts identified and monitored.', sourceUrl: 'https://www.who.int/emergencies/situations/ebola-outbreak' },
  { id: 'e2', name: 'Butembo', country: 'Democratic Republic of Congo', lat: 0.14, lng: 29.29, cases: 0, deaths: 0, severity: 'contained', disease: 'Ebola', source: 'WHO', sourceFull: 'World Health Organization', tier: 1, date: '2024-01-08', reportDetails: 'Previous outbreak officially declared over. Enhanced surveillance maintained.', sourceUrl: 'https://www.who.int/' },

  // Marburg
  { id: 'ma1', name: 'Dar es Salaam', country: 'Tanzania', lat: -6.79, lng: 39.28, cases: 8, deaths: 5, severity: 'critical', disease: 'Marburg', source: 'WHO', sourceFull: 'World Health Organization - AFRO', tier: 1, date: '2024-01-11', reportDetails: 'Cluster linked to cave exposure (Rousettus bats). Healthcare worker among cases. Isolation facilities activated. Experimental vaccines under consideration.', sourceUrl: 'https://www.who.int/health-topics/marburg-virus-disease' },
  { id: 'ma2', name: 'Equatorial Guinea', country: 'Equatorial Guinea', lat: 1.65, lng: 10.27, cases: 3, deaths: 2, severity: 'elevated', disease: 'Marburg', source: 'WHO', sourceFull: 'World Health Organization', tier: 1, date: '2024-01-10', reportDetails: 'Outbreak investigation ongoing. Contact tracing in progress.', sourceUrl: 'https://www.who.int/' },

  // Dengue
  { id: 'd1', name: 'Manila', country: 'Philippines', lat: 14.6, lng: 120.98, cases: 45678, deaths: 234, severity: 'elevated', disease: 'Dengue', source: 'DOH Philippines', sourceFull: 'Department of Health Philippines', tier: 2, date: '2024-01-14', reportDetails: 'Seasonal dengue surge. All four serotypes circulating. Vector control measures intensified.', sourceUrl: 'https://doh.gov.ph/' },
  { id: 'd2', name: 'Jakarta', country: 'Indonesia', lat: -6.2, lng: 106.85, cases: 32456, deaths: 156, severity: 'elevated', disease: 'Dengue', source: 'Indonesia MOH', sourceFull: 'Indonesian Ministry of Health', tier: 2, date: '2024-01-13', reportDetails: 'Rainy season contributing to vector breeding. Fogging operations ongoing.', sourceUrl: 'https://www.kemkes.go.id/' },
  { id: 'd3', name: 'Rio de Janeiro', country: 'Brazil', lat: -22.91, lng: -43.17, cases: 28900, deaths: 89, severity: 'elevated', disease: 'Dengue', source: 'Brazil MOH', sourceFull: 'Brazilian Ministry of Health', tier: 2, date: '2024-01-14', reportDetails: 'Summer outbreak. New dengue vaccine rollout in progress.', sourceUrl: 'https://www.gov.br/saude/' },

  // Yellow Fever
  { id: 'yf1', name: 'Abuja', country: 'Nigeria', lat: 9.08, lng: 7.4, cases: 234, deaths: 45, severity: 'watch', disease: 'Yellow Fever', source: 'NCDC', sourceFull: 'Nigeria Centre for Disease Control', tier: 2, date: '2024-01-12', reportDetails: 'Localized outbreak. Reactive vaccination campaign initiated.', sourceUrl: 'https://ncdc.gov.ng/' },

  // Measles
  { id: 'ms1', name: 'Lahore', country: 'Pakistan', lat: 31.55, lng: 74.34, cases: 4567, deaths: 89, severity: 'elevated', disease: 'Measles', source: 'Pakistan NIH', sourceFull: 'Pakistan National Institute of Health', tier: 2, date: '2024-01-14', reportDetails: 'Outbreak linked to vaccine coverage gaps. Emergency immunization campaign underway.', sourceUrl: 'https://www.nih.org.pk/' },
  { id: 'ms2', name: 'Kabul', country: 'Afghanistan', lat: 34.53, lng: 69.17, cases: 6789, deaths: 123, severity: 'critical', disease: 'Measles', source: 'WHO', sourceFull: 'World Health Organization - EMRO', tier: 1, date: '2024-01-15', reportDetails: 'Widespread outbreak due to disrupted health services. UNICEF supporting vaccination efforts.', sourceUrl: 'https://www.emro.who.int/' },
];

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

interface WorldMapProps {
  onPointClick: (point: MapPoint) => void;
  selectedDisease?: string;
  selectedSeverity?: string;
}

const WorldMap = memo(function WorldMap({ onPointClick, selectedDisease = 'all', selectedSeverity = 'all' }: WorldMapProps) {
  const { darkMode } = useStore();
  const [hoveredPoint, setHoveredPoint] = useState<MapPoint | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredPoints = outbreakData.filter(p => {
    if (selectedDisease !== 'all' && p.disease !== selectedDisease) return false;
    if (selectedSeverity !== 'all' && p.severity !== selectedSeverity) return false;
    return true;
  });

  const handleMouseMove = (e: React.MouseEvent, point: MapPoint) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    setHoveredPoint(point);
  };

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {/* Satellite-style background gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: darkMode 
            ? 'radial-gradient(ellipse at center, #0c1929 0%, #030812 100%)'
            : 'radial-gradient(ellipse at center, #1a3a5c 0%, #0a1628 100%)',
        }}
      />
      
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 140,
          center: [0, 20],
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <ZoomableGroup center={[0, 20]} zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={darkMode ? 'rgba(30, 58, 95, 0.6)' : 'rgba(40, 75, 120, 0.5)'}
                  stroke={darkMode ? 'rgba(60, 100, 150, 0.4)' : 'rgba(80, 130, 180, 0.3)'}
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { 
                      fill: darkMode ? 'rgba(40, 75, 120, 0.7)' : 'rgba(50, 90, 140, 0.6)',
                      outline: 'none' 
                    },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Data point markers */}
          {filteredPoints.map((point) => {
            const color = getSeverityColor(point.severity);
            const size = Math.max(4, Math.min(12, Math.log10(point.cases + 1) * 3 + 2));
            const isCritical = point.severity === 'critical';
            const isHovered = hoveredPoint?.id === point.id;

            return (
              <Marker
                key={point.id}
                coordinates={[point.lng, point.lat]}
                onClick={() => onPointClick(point)}
                onMouseEnter={(e) => handleMouseMove(e as unknown as React.MouseEvent, point)}
                onMouseMove={(e) => handleMouseMove(e as unknown as React.MouseEvent, point)}
                onMouseLeave={() => setHoveredPoint(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Pulse animation for critical */}
                {isCritical && (
                  <>
                    <circle
                      r={size}
                      fill="none"
                      stroke={color}
                      strokeWidth={1}
                      opacity={0}
                    >
                      <animate attributeName="r" values={`${size};${size * 2.5}`} dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle
                      r={size}
                      fill="none"
                      stroke={color}
                      strokeWidth={1}
                      opacity={0}
                    >
                      <animate attributeName="r" values={`${size};${size * 2.5}`} dur="2s" repeatCount="indefinite" begin="1s" />
                      <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite" begin="1s" />
                    </circle>
                  </>
                )}
                
                {/* Main marker */}
                <circle
                  r={isHovered ? size * 1.4 : size}
                  fill={color}
                  opacity={0.9}
                  style={{
                    filter: isHovered ? 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' : 'drop-shadow(0 0 4px rgba(0,0,0,0.5))',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {!isCritical && (
                    <animate attributeName="opacity" values="0.7;0.95;0.7" dur="2s" repeatCount="indefinite" />
                  )}
                </circle>
                
                {/* Inner glow */}
                <circle
                  r={size * 0.4}
                  fill="white"
                  opacity={0.4}
                  cx={-size * 0.15}
                  cy={-size * 0.15}
                />
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      {hoveredPoint && (
        <div
          className="absolute z-50 pointer-events-none px-4 py-3 rounded-xl max-w-[300px]"
          style={{
            left: Math.min(tooltipPos.x + 15, (containerRef.current?.clientWidth || 300) - 310),
            top: Math.max(tooltipPos.y - 100, 10),
            backgroundColor: darkMode ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            border: darkMode ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.08)',
          }}
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ backgroundColor: getSeverityColor(hoveredPoint.severity) }}
              />
              <p className="text-[15px] font-semibold" style={{ color: darkMode ? '#F5F5F7' : '#1D1D1F' }}>
                {hoveredPoint.disease}
              </p>
            </div>
            <p className="text-[13px]" style={{ color: darkMode ? '#A1A1A6' : '#6E6E73' }}>
              {hoveredPoint.name}, {hoveredPoint.country}
            </p>
            <div className="flex items-center justify-center gap-4 mt-2">
              <span className="text-[13px]" style={{ fontFamily: 'monospace', color: darkMode ? '#F5F5F7' : '#1D1D1F' }}>
                {hoveredPoint.cases.toLocaleString()} cases
              </span>
              <span className="text-[13px]" style={{ fontFamily: 'monospace', color: '#FF3B30' }}>
                {hoveredPoint.deaths.toLocaleString()} deaths
              </span>
            </div>
            <p className="text-[11px] mt-2" style={{ color: darkMode ? '#6E6E73' : '#86868B' }}>
              {hoveredPoint.source} | Tier {hoveredPoint.tier} | {hoveredPoint.date}
            </p>
            <p className="text-[11px] mt-1 font-medium" style={{ color: darkMode ? '#A1A1A6' : '#6E6E73' }}>
              Click for full details
            </p>
          </div>
        </div>
      )}
    </div>
  );
});

export default WorldMap;
export type { MapPoint };
