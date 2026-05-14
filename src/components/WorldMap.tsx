import { useState, useRef } from 'react';
import { useStore } from '../store/useStore';
import { getSeverityColor } from '../data/diseases';

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
  travelPaths?: { to: string; toLat: number; toLng: number }[];
}

// Comprehensive outbreak data
const outbreakData: MapPoint[] = [
  // Mpox hotspots
  { id: 'm1', name: 'Kinshasa', country: 'Democratic Republic of Congo', lat: -4.32, lng: 15.31, cases: 3245, deaths: 89, severity: 'critical', disease: 'Mpox', source: 'WHO', sourceFull: 'World Health Organization - Disease Outbreak News', tier: 1, date: '2024-01-15', reportDetails: 'Clade Ib outbreak with sustained human-to-human transmission. Index case traced to mining community. Enhanced surveillance and contact tracing underway.', travelPaths: [{ to: 'Bujumbura', toLat: -3.38, toLng: 29.36 }] },
  { id: 'm2', name: 'Goma', country: 'Democratic Republic of Congo', lat: -1.67, lng: 29.23, cases: 1876, deaths: 52, severity: 'critical', disease: 'Mpox', source: 'Africa CDC', sourceFull: 'Africa Centres for Disease Control and Prevention', tier: 2, date: '2024-01-14', reportDetails: 'Escalating cases in displacement camps. MSF establishing treatment facilities. Vaccine supplies critically low.' },
  { id: 'm3', name: 'Bujumbura', country: 'Burundi', lat: -3.38, lng: 29.36, cases: 456, deaths: 12, severity: 'elevated', disease: 'Mpox', source: 'WHO', sourceFull: 'World Health Organization - AFRO', tier: 1, date: '2024-01-14', reportDetails: 'Cross-border transmission from DRC confirmed. First cases detected in urban areas. National emergency response activated.' },
  { id: 'm4', name: 'Kigali', country: 'Rwanda', lat: -1.94, lng: 30.06, cases: 89, deaths: 2, severity: 'watch', disease: 'Mpox', source: 'Rwanda MOH', sourceFull: 'Rwanda Ministry of Health', tier: 2, date: '2024-01-13', reportDetails: 'Border screening intensified. Cases linked to travel from DRC. Contact tracing 95% complete.' },
  { id: 'm5', name: 'Lagos', country: 'Nigeria', lat: 6.45, lng: 3.39, cases: 234, deaths: 8, severity: 'elevated', disease: 'Mpox', source: 'NCDC', sourceFull: 'Nigeria Centre for Disease Control', tier: 2, date: '2024-01-12', reportDetails: 'Clade II endemic transmission continuing. Majority cases in adult males. Vaccination campaign for high-risk groups.' },

  // H5N1 cases
  { id: 'h1', name: 'Houston', country: 'United States', lat: 29.76, lng: -95.36, cases: 3, deaths: 0, severity: 'critical', disease: 'H5N1', source: 'U.S. CDC', sourceFull: 'U.S. Centers for Disease Control and Prevention', tier: 1, date: '2024-01-15', reportDetails: 'Third dairy farm worker tests positive. All cases with mild conjunctivitis and respiratory symptoms. No evidence of human-to-human transmission. Genomic sequencing ongoing.' },
  { id: 'h2', name: 'Amarillo', country: 'United States', lat: 35.22, lng: -101.83, cases: 2, deaths: 0, severity: 'elevated', disease: 'H5N1', source: 'Texas DSHS', sourceFull: 'Texas Department of State Health Services', tier: 2, date: '2024-01-14', reportDetails: 'Poultry farm workers with confirmed H5N1. Culling of 500,000 birds completed. Enhanced PPE requirements implemented.' },
  { id: 'h3', name: 'Amsterdam', country: 'Netherlands', lat: 52.37, lng: 4.89, cases: 0, deaths: 0, severity: 'watch', disease: 'H5N1', source: 'RIVM', sourceFull: 'National Institute for Public Health (Netherlands)', tier: 2, date: '2024-01-13', reportDetails: 'H5N1 detected in mink farms. No human cases. Farms culled. Risk assessment elevated for fur farm workers.' },
  { id: 'h4', name: 'Hanoi', country: 'Vietnam', lat: 21.03, lng: 105.85, cases: 1, deaths: 1, severity: 'critical', disease: 'H5N1', source: 'WHO', sourceFull: 'World Health Organization - WPRO', tier: 1, date: '2024-01-10', reportDetails: 'Fatal case in poultry market worker. Clade 2.3.2.1c virus confirmed. Extensive culling and market closures.' },

  // COVID-19 monitoring
  { id: 'c1', name: 'Beijing', country: 'China', lat: 39.9, lng: 116.4, cases: 12340, deaths: 23, severity: 'monitoring', disease: 'COVID-19', source: 'WHO', sourceFull: 'World Health Organization', tier: 1, date: '2024-01-15', reportDetails: 'Winter surge with JN.1 subvariant predominant. Hospital capacity adequate. Vaccination booster campaign ongoing.' },
  { id: 'c2', name: 'New Delhi', country: 'India', lat: 28.61, lng: 77.21, cases: 8923, deaths: 45, severity: 'elevated', disease: 'COVID-19', source: 'WHO', sourceFull: 'World Health Organization - SEARO', tier: 1, date: '2024-01-15', reportDetails: 'Rising cases in northern states. JN.1 and BA.2.86 co-circulating. ICU admissions increasing but below previous waves.' },
  { id: 'c3', name: 'São Paulo', country: 'Brazil', lat: -23.55, lng: -46.63, cases: 6721, deaths: 34, severity: 'monitoring', disease: 'COVID-19', source: 'PAHO', sourceFull: 'Pan American Health Organization', tier: 1, date: '2024-01-14', reportDetails: 'Seasonal uptick in cases. Healthcare system stable. Updated vaccines available in public health units.' },
  { id: 'c4', name: 'London', country: 'United Kingdom', lat: 51.5, lng: -0.12, cases: 4521, deaths: 18, severity: 'monitoring', disease: 'COVID-19', source: 'UKHSA', sourceFull: 'UK Health Security Agency', tier: 1, date: '2024-01-15', reportDetails: 'JN.1 now dominant. Wastewater surveillance shows plateau. Autumn booster uptake at 68% in over-65s.' },
  { id: 'c5', name: 'Tokyo', country: 'Japan', lat: 35.68, lng: 139.69, cases: 5234, deaths: 12, severity: 'monitoring', disease: 'COVID-19', source: 'NIID', sourceFull: 'National Institute of Infectious Diseases (Japan)', tier: 1, date: '2024-01-15', reportDetails: 'Post-holiday increase in cases. BA.2.86 sublineages predominant. No strain on healthcare system.' },

  // Cholera outbreaks
  { id: 'ch1', name: 'Maputo', country: 'Mozambique', lat: -25.97, lng: 32.58, cases: 2345, deaths: 78, severity: 'elevated', disease: 'Cholera', source: 'WHO', sourceFull: 'World Health Organization - AFRO', tier: 1, date: '2024-01-14', reportDetails: 'Flooding from Cyclone Freddy damaged water infrastructure. Oral cholera vaccine campaign underway. WASH interventions prioritized.' },
  { id: 'ch2', name: 'Dhaka', country: 'Bangladesh', lat: 23.81, lng: 90.41, cases: 1890, deaths: 34, severity: 'monitoring', disease: 'Cholera', source: 'icddr,b', sourceFull: 'International Centre for Diarrhoeal Disease Research, Bangladesh', tier: 2, date: '2024-01-13', reportDetails: 'Seasonal cholera activity. Treatment centers operating normally. Case fatality rate <1% with treatment.' },
  { id: 'ch3', name: 'Port-au-Prince', country: 'Haiti', lat: 18.54, lng: -72.34, cases: 3456, deaths: 123, severity: 'critical', disease: 'Cholera', source: 'PAHO', sourceFull: 'Pan American Health Organization', tier: 1, date: '2024-01-15', reportDetails: 'Ongoing outbreak complicated by civil unrest. Healthcare access severely limited. MSF operating mobile clinics.' },

  // Ebola surveillance
  { id: 'e1', name: 'Kampala', country: 'Uganda', lat: 0.31, lng: 32.58, cases: 0, deaths: 0, severity: 'contained', disease: 'Ebola', source: 'WHO', sourceFull: 'World Health Organization', tier: 1, date: '2024-01-08', reportDetails: 'No new cases for 42 days. Outbreak officially declared over. Surveillance and preparedness maintained.' },
  { id: 'e2', name: 'Mbandaka', country: 'Democratic Republic of Congo', lat: -0.05, lng: 18.26, cases: 4, deaths: 2, severity: 'watch', disease: 'Ebola', source: 'DRC MOH', sourceFull: 'DRC Ministry of Health', tier: 2, date: '2024-01-12', reportDetails: 'Small cluster under investigation. Ring vaccination deployed. All contacts identified and monitored.' },

  // Marburg
  { id: 'ma1', name: 'Dar es Salaam', country: 'Tanzania', lat: -6.79, lng: 39.28, cases: 8, deaths: 5, severity: 'critical', disease: 'Marburg', source: 'WHO', sourceFull: 'World Health Organization - AFRO', tier: 1, date: '2024-01-11', reportDetails: 'Cluster linked to cave exposure (Rousettus bats). Healthcare worker among cases. Isolation facilities activated. Experimental vaccines under consideration.' },

  // Additional global coverage
  { id: 'c6', name: 'Sydney', country: 'Australia', lat: -33.87, lng: 151.21, cases: 2134, deaths: 8, severity: 'monitoring', disease: 'COVID-19', source: 'Australia DOH', sourceFull: 'Australian Department of Health', tier: 1, date: '2024-01-15', reportDetails: 'Summer surge leveling off. JN.1 predominant. Aged care facilities implementing enhanced protocols.' },
  { id: 'c7', name: 'Johannesburg', country: 'South Africa', lat: -26.2, lng: 28.04, cases: 1567, deaths: 12, severity: 'monitoring', disease: 'COVID-19', source: 'NICD', sourceFull: 'National Institute for Communicable Diseases (South Africa)', tier: 1, date: '2024-01-14', reportDetails: 'BA.2.86 lineages circulating. Healthcare capacity adequate. Genomic surveillance ongoing.' },
  { id: 'c8', name: 'Mexico City', country: 'Mexico', lat: 19.43, lng: -99.13, cases: 3421, deaths: 28, severity: 'monitoring', disease: 'COVID-19', source: 'Mexico SSA', sourceFull: 'Secretaría de Salud (Mexico)', tier: 2, date: '2024-01-14', reportDetails: 'Increased respiratory illness. COVID and influenza co-circulating. Hospital occupancy stable.' },
];

// Convert lat/lng to SVG coordinates (Natural Earth projection approximation)
function toSVG(lat: number, lng: number, width = 1000, height = 500): { x: number; y: number } {
  const x = ((lng + 180) / 360) * width;
  const latRad = (lat * Math.PI) / 180;
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const y = height / 2 - (mercN * width) / (2 * Math.PI);
  return { x: Math.max(0, Math.min(width, x)), y: Math.max(0, Math.min(height, y)) };
}

interface WorldMapProps {
  onPointClick: (point: MapPoint) => void;
  selectedDisease?: string;
  selectedSeverity?: string;
}

export default function WorldMap({ onPointClick, selectedDisease = 'all', selectedSeverity = 'all' }: WorldMapProps) {
  const { darkMode } = useStore();
  const [hoveredPoint, setHoveredPoint] = useState<MapPoint | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  const filteredPoints = outbreakData.filter(p => {
    if (selectedDisease !== 'all' && p.disease !== selectedDisease) return false;
    if (selectedSeverity !== 'all' && p.severity !== selectedSeverity) return false;
    return true;
  });

  const handleMouseMove = (e: React.MouseEvent, point: MapPoint) => {
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top - 10,
      });
    }
    setHoveredPoint(point);
  };

  // Colors
  const waterColor = darkMode ? '#0a1628' : '#c8d8e8';
  // landColor defined in gradients
  const borderColor = darkMode ? '#2a3a4a' : '#b8c8d8';
  const gridColor = darkMode ? '#1a2a3a' : '#d8e8f0';

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      <svg
        ref={svgRef}
        viewBox="0 0 1000 500"
        className="w-full h-full"
        style={{ backgroundColor: waterColor }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradient for water */}
          <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={darkMode ? '#0c1a2c' : '#b8d0e8'} />
            <stop offset="100%" stopColor={darkMode ? '#061018' : '#d8e8f0'} />
          </linearGradient>
          
          {/* Land texture gradient */}
          <linearGradient id="landGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={darkMode ? '#1c2c3c' : '#f0f0f0'} />
            <stop offset="100%" stopColor={darkMode ? '#162636' : '#e0e0e0'} />
          </linearGradient>

          {/* Glow filter for points */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Pulse animation for critical */}
          <radialGradient id="pulseGradient">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background */}
        <rect width="100%" height="100%" fill="url(#waterGradient)" />

        {/* Grid lines */}
        <g opacity="0.3">
          {Array.from({ length: 19 }, (_, i) => {
            const x = (i * 1000) / 18;
            return <line key={`vg-${i}`} x1={x} y1="0" x2={x} y2="500" stroke={gridColor} strokeWidth="0.5" />;
          })}
          {Array.from({ length: 10 }, (_, i) => {
            const y = (i * 500) / 9;
            return <line key={`hg-${i}`} x1="0" y1={y} x2="1000" y2={y} stroke={gridColor} strokeWidth="0.5" />;
          })}
        </g>

        {/* Simplified continent paths - realistic shapes */}
        <g fill="url(#landGradient)" stroke={borderColor} strokeWidth="0.5">
          {/* North America */}
          <path d="M40,45 Q60,30 90,35 L130,40 Q160,35 190,45 L230,55 Q260,65 270,90 L275,130 Q280,160 270,190 L255,220 Q240,245 220,250 L195,245 Q175,235 165,220 L155,200 Q145,175 130,160 L110,145 Q90,130 85,110 L75,85 Q60,60 40,45 Z" />
          {/* Central America */}
          <path d="M155,220 Q165,235 175,255 L185,275 Q195,290 190,305 L180,320 Q170,330 160,325 L155,310 Q150,290 155,270 L158,250 Q160,235 155,220 Z" />
          {/* South America */}
          <path d="M190,305 Q210,300 230,310 L260,330 Q285,350 295,380 L300,420 Q295,455 280,480 L255,495 Q230,500 215,490 L195,470 Q175,445 170,415 L168,380 Q165,350 175,325 L190,305 Z" />
          {/* Greenland */}
          <path d="M280,20 Q310,15 330,25 L345,40 Q355,55 350,75 L340,90 Q325,100 305,95 L285,85 Q270,70 275,50 L280,20 Z" />
          {/* Europe */}
          <path d="M430,50 Q450,40 480,45 L520,55 Q550,65 560,85 L565,110 Q560,130 545,145 L520,155 Q495,160 475,150 L455,135 Q440,115 435,90 L430,65 Q425,55 430,50 Z" />
          {/* UK/Ireland */}
          <path d="M400,70 Q415,65 425,75 L430,90 Q430,105 420,110 L405,108 Q395,100 395,85 L400,70 Z" />
          {/* Scandinavia */}
          <path d="M480,20 Q510,15 530,25 L545,45 Q555,70 545,95 L530,85 Q515,70 500,55 L485,40 Q475,30 480,20 Z" />
          {/* Africa */}
          <path d="M430,160 Q470,150 510,160 L560,180 Q590,210 600,260 L605,320 Q600,375 575,420 L540,455 Q495,475 460,465 L435,445 Q415,410 410,365 L408,310 Q405,250 415,200 L430,160 Z" />
          {/* Russia */}
          <path d="M545,25 Q620,15 720,20 L820,30 Q890,45 920,65 L935,90 Q940,115 920,135 L880,150 Q820,160 760,155 L700,145 Q640,135 600,115 L565,90 Q545,65 545,25 Z" />
          {/* Middle East */}
          <path d="M560,130 Q590,120 620,130 L650,145 Q670,160 665,185 L655,210 Q640,225 615,220 L585,210 Q565,195 560,170 L555,145 Q555,135 560,130 Z" />
          {/* South Asia */}
          <path d="M650,145 Q680,135 720,145 L755,165 Q780,190 785,230 L780,270 Q770,295 745,305 L710,310 Q680,300 665,275 L655,240 Q645,200 650,170 L650,145 Z" />
          {/* Southeast Asia */}
          <path d="M740,230 Q770,220 800,235 L830,260 Q850,285 845,315 L835,340 Q815,360 785,355 L755,340 Q735,320 735,290 L738,260 Q738,245 740,230 Z" />
          {/* East Asia */}
          <path d="M760,100 Q810,90 860,100 L900,120 Q925,145 920,180 L905,215 Q880,240 845,235 L805,225 Q775,210 760,180 L755,145 Q755,115 760,100 Z" />
          {/* Japan */}
          <path d="M880,120 Q895,115 905,125 L915,145 Q920,165 912,180 L898,185 Q885,180 882,160 L880,140 Q878,130 880,120 Z" />
          {/* Australia */}
          <path d="M780,340 Q830,330 880,345 L920,375 Q945,410 940,450 L925,480 Q890,500 845,495 L800,480 Q770,455 765,415 L770,375 Q770,355 780,340 Z" />
          {/* New Zealand */}
          <path d="M945,450 Q955,445 965,455 L970,475 Q968,490 958,495 L945,490 Q938,480 940,465 L945,450 Z" />
          {/* Indonesia/Philippines */}
          <path d="M800,300 Q820,295 835,305 L845,320 Q850,335 842,345 L825,350 Q810,345 805,330 L800,315 Q798,305 800,300 Z" />
          <path d="M850,310 Q865,305 875,315 L880,330 Q878,345 868,350 L855,348 Q845,340 848,325 L850,310 Z" />
        </g>

        {/* Travel paths */}
        {filteredPoints.map((point) => {
          if (!point.travelPaths) return null;
          const from = toSVG(point.lat, point.lng);
          return point.travelPaths.map((path, i) => {
            const to = toSVG(path.toLat, path.toLng);
            const midX = (from.x + to.x) / 2;
            const midY = Math.min(from.y, to.y) - 30;
            const color = getSeverityColor(point.severity);
            return (
              <g key={`path-${point.id}-${i}`}>
                <path
                  d={`M${from.x},${from.y} Q${midX},${midY} ${to.x},${to.y}`}
                  fill="none"
                  stroke={color}
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                  opacity="0.5"
                >
                  <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1s" repeatCount="indefinite" />
                </path>
                {/* Animated dot */}
                <circle r="3" fill={color}>
                  <animateMotion
                    path={`M${from.x},${from.y} Q${midX},${midY} ${to.x},${to.y}`}
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          });
        })}

        {/* Data points */}
        {filteredPoints.map((point) => {
          const { x, y } = toSVG(point.lat, point.lng);
          const color = getSeverityColor(point.severity);
          const size = Math.max(5, Math.min(18, Math.log10(point.cases + 1) * 4 + 3));
          const isCritical = point.severity === 'critical';
          const isHovered = hoveredPoint?.id === point.id;

          return (
            <g
              key={point.id}
              onClick={() => onPointClick(point)}
              onMouseMove={(e) => handleMouseMove(e, point)}
              onMouseLeave={() => setHoveredPoint(null)}
              className="cursor-pointer"
              style={{ transition: 'transform 0.2s ease' }}
            >
              {/* Critical pulse rings */}
              {isCritical && (
                <>
                  <circle cx={x} cy={y} r={size} fill="none" stroke={color} strokeWidth="1" opacity="0">
                    <animate attributeName="r" values={`${size};${size * 2.5}`} dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={x} cy={y} r={size} fill="none" stroke={color} strokeWidth="1" opacity="0">
                    <animate attributeName="r" values={`${size};${size * 2.5}`} dur="2s" repeatCount="indefinite" begin="1s" />
                    <animate attributeName="opacity" values="0.5;0" dur="2s" repeatCount="indefinite" begin="1s" />
                  </circle>
                </>
              )}
              {/* Main dot */}
              <circle
                cx={x}
                cy={y}
                r={isHovered ? size * 1.3 : size}
                fill={color}
                opacity={0.85}
                filter={isHovered ? 'url(#glow)' : undefined}
                style={{ transition: 'r 0.2s ease' }}
              >
                {!isCritical && (
                  <animate attributeName="opacity" values="0.7;0.95;0.7" dur="2s" repeatCount="indefinite" />
                )}
              </circle>
              {/* Inner highlight */}
              <circle cx={x - size * 0.2} cy={y - size * 0.2} r={size * 0.3} fill="white" opacity="0.3" />
              {/* Clickable area */}
              <circle cx={x} cy={y} r={Math.max(size + 5, 15)} fill="transparent" />
            </g>
          );
        })}

        {/* Equator and tropics (subtle) */}
        <g stroke={gridColor} strokeWidth="0.3" strokeDasharray="10,5" opacity="0.5">
          <line x1="0" y1="250" x2="1000" y2="250" /> {/* Equator */}
        </g>
      </svg>

      {/* Tooltip */}
      {hoveredPoint && (
        <div
          className="absolute z-50 pointer-events-none px-4 py-3 rounded-xl max-w-[280px]"
          style={{
            left: Math.min(tooltipPos.x, (svgRef.current?.clientWidth || 300) - 290),
            top: tooltipPos.y - 80,
            backgroundColor: darkMode ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            border: `1px solid ${darkMode ? '#333' : '#ddd'}`,
          }}
        >
          <div className="text-center">
            <p className="text-[15px] font-semibold" style={{ color: darkMode ? '#F5F5F7' : '#1D1D1F' }}>
              {hoveredPoint.disease}
            </p>
            <p className="text-[13px]" style={{ color: darkMode ? '#A1A1A6' : '#6E6E73' }}>
              {hoveredPoint.name}, {hoveredPoint.country}
            </p>
            <div className="flex items-center justify-center gap-3 mt-2">
              <span className="text-[13px]" style={{ fontFamily: 'monospace', color: darkMode ? '#F5F5F7' : '#1D1D1F' }}>
                {hoveredPoint.cases.toLocaleString()} cases
              </span>
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: getSeverityColor(hoveredPoint.severity) }}
              />
            </div>
            <p className="text-[11px] mt-2 flex items-center justify-center gap-1" style={{ color: darkMode ? '#6E6E73' : '#86868B' }}>
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: hoveredPoint.tier <= 2 ? '#34C759' : '#FF9500' }} />
              {hoveredPoint.source} · T{hoveredPoint.tier} · {hoveredPoint.date}
            </p>
            <p className="text-[11px] mt-1" style={{ color: darkMode ? '#6E6E73' : '#86868B' }}>
              Click for details
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export type { MapPoint };
