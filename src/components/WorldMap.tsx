import { useEffect, useRef, useState } from 'react';
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

const outbreakData: MapPoint[] = [
  { id: 'm1', name: 'Kinshasa', country: 'DRC', lat: -4.32, lng: 15.31, cases: 3245, deaths: 89, severity: 'critical', disease: 'Mpox', source: 'WHO', sourceFull: 'World Health Organization', tier: 1, date: '2024-01-15', reportDetails: 'Clade Ib outbreak with sustained human-to-human transmission.' },
  { id: 'm2', name: 'Goma', country: 'DRC', lat: -1.67, lng: 29.23, cases: 1876, deaths: 52, severity: 'critical', disease: 'Mpox', source: 'Africa CDC', sourceFull: 'Africa CDC', tier: 2, date: '2024-01-14', reportDetails: 'Escalating cases in displacement camps.' },
  { id: 'm3', name: 'Lagos', country: 'Nigeria', lat: 6.45, lng: 3.39, cases: 234, deaths: 8, severity: 'elevated', disease: 'Mpox', source: 'NCDC', sourceFull: 'Nigeria CDC', tier: 2, date: '2024-01-12', reportDetails: 'Clade II endemic transmission.' },
  { id: 'h1', name: 'Houston', country: 'USA', lat: 29.76, lng: -95.36, cases: 3, deaths: 0, severity: 'critical', disease: 'H5N1', source: 'CDC', sourceFull: 'US CDC', tier: 1, date: '2024-01-15', reportDetails: 'Dairy farm worker cases.' },
  { id: 'h2', name: 'Hanoi', country: 'Vietnam', lat: 21.03, lng: 105.85, cases: 1, deaths: 1, severity: 'critical', disease: 'H5N1', source: 'WHO', sourceFull: 'WHO WPRO', tier: 1, date: '2024-01-10', reportDetails: 'Fatal case in poultry worker.' },
  { id: 'c1', name: 'Beijing', country: 'China', lat: 39.9, lng: 116.4, cases: 12340, deaths: 23, severity: 'monitoring', disease: 'COVID-19', source: 'WHO', sourceFull: 'WHO', tier: 1, date: '2024-01-15', reportDetails: 'JN.1 winter surge.' },
  { id: 'c2', name: 'New Delhi', country: 'India', lat: 28.61, lng: 77.21, cases: 8923, deaths: 45, severity: 'elevated', disease: 'COVID-19', source: 'WHO', sourceFull: 'WHO SEARO', tier: 1, date: '2024-01-15', reportDetails: 'Rising cases in northern states.' },
  { id: 'c3', name: 'London', country: 'UK', lat: 51.5, lng: -0.12, cases: 4521, deaths: 18, severity: 'monitoring', disease: 'COVID-19', source: 'UKHSA', sourceFull: 'UK HSA', tier: 1, date: '2024-01-15', reportDetails: 'JN.1 dominant.' },
  { id: 'ch1', name: 'Port-au-Prince', country: 'Haiti', lat: 18.54, lng: -72.34, cases: 3456, deaths: 123, severity: 'critical', disease: 'Cholera', source: 'PAHO', sourceFull: 'PAHO', tier: 1, date: '2024-01-15', reportDetails: 'Ongoing outbreak.' },
  { id: 'ch2', name: 'Maputo', country: 'Mozambique', lat: -25.97, lng: 32.58, cases: 2345, deaths: 78, severity: 'elevated', disease: 'Cholera', source: 'WHO', sourceFull: 'WHO AFRO', tier: 1, date: '2024-01-14', reportDetails: 'Flooding damaged water infrastructure.' },
  { id: 'ma1', name: 'Dar es Salaam', country: 'Tanzania', lat: -6.79, lng: 39.28, cases: 8, deaths: 5, severity: 'critical', disease: 'Marburg', source: 'WHO', sourceFull: 'WHO AFRO', tier: 1, date: '2024-01-11', reportDetails: 'Cluster linked to cave exposure.' },
  { id: 'tb1', name: 'Mumbai', country: 'India', lat: 19.08, lng: 72.88, cases: 45000, deaths: 2100, severity: 'elevated', disease: 'MDR-TB', source: 'WHO', sourceFull: 'WHO', tier: 1, date: '2024-01-15', reportDetails: 'Multi-drug resistant tuberculosis hotspot.' },
  { id: 'dn1', name: 'Manila', country: 'Philippines', lat: 14.6, lng: 120.98, cases: 78000, deaths: 340, severity: 'elevated', disease: 'Dengue', source: 'WHO', sourceFull: 'WHO WPRO', tier: 1, date: '2024-01-14', reportDetails: 'Seasonal dengue surge.' },
  { id: 'dn2', name: 'Jakarta', country: 'Indonesia', lat: -6.2, lng: 106.85, cases: 65000, deaths: 290, severity: 'elevated', disease: 'Dengue', source: 'Indonesia MOH', sourceFull: 'Indonesia MOH', tier: 2, date: '2024-01-13', reportDetails: 'Endemic transmission.' },
  { id: 'ml1', name: 'Abuja', country: 'Nigeria', lat: 9.08, lng: 7.53, cases: 120000, deaths: 1800, severity: 'elevated', disease: 'Malaria', source: 'WHO', sourceFull: 'WHO AFRO', tier: 1, date: '2024-01-15', reportDetails: 'Seasonal malaria peak.' },
  { id: 'yf1', name: 'Brasilia', country: 'Brazil', lat: -15.79, lng: -47.88, cases: 890, deaths: 45, severity: 'watch', disease: 'Yellow Fever', source: 'PAHO', sourceFull: 'PAHO', tier: 1, date: '2024-01-12', reportDetails: 'Sylvatic yellow fever cases.' },
  { id: 'lf1', name: 'Ondo', country: 'Nigeria', lat: 7.1, lng: 4.84, cases: 234, deaths: 34, severity: 'elevated', disease: 'Lassa Fever', source: 'NCDC', sourceFull: 'Nigeria CDC', tier: 2, date: '2024-01-14', reportDetails: 'Seasonal Lassa fever outbreak.' },
];

interface WorldMapProps {
  onPointClick: (point: MapPoint) => void;
  selectedDisease?: string;
  selectedSeverity?: string;
}

export default function WorldMap({ onPointClick, selectedDisease = 'all', selectedSeverity = 'all' }: WorldMapProps) {
  const { darkMode } = useStore();
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<unknown>(null);
  const [hoveredPoint, setHoveredPoint] = useState<MapPoint | null>(null);
  const [zoom, setZoom] = useState(2);
  const [center, setCenter] = useState<[number, number]>([20, 0]);

  const filteredPoints = outbreakData.filter(p => {
    if (selectedDisease !== 'all' && p.disease !== selectedDisease) return false;
    if (selectedSeverity !== 'all' && p.severity !== selectedSeverity) return false;
    return true;
  });

  useEffect(() => {
    if (!mapRef.current || mapInstance) return;

    import('leaflet').then((L) => {
      import('leaflet/dist/leaflet.css');
      
      const map = L.map(mapRef.current!, {
        center: center,
        zoom: zoom,
        minZoom: 2,
        maxZoom: 18,
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        dragging: true,
      });

      // Real satellite imagery from ESRI World Imagery
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 19,
      }).addTo(map);

      // Add labels overlay
      L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}.png', {
        attribution: '',
        opacity: 0.7,
      }).addTo(map);

      map.on('zoomend', () => setZoom(map.getZoom()));
      map.on('moveend', () => {
        const c = map.getCenter();
        setCenter([c.lat, c.lng]);
      });

      setMapInstance(map);

      return () => {
        map.remove();
      };
    });
  }, []);

  useEffect(() => {
    if (!mapInstance) return;

    import('leaflet').then((L) => {
      const map = mapInstance as L.Map;
      
      // Clear existing markers
      map.eachLayer((layer: L.Layer) => {
        if ((layer as L.Marker).getLatLng) {
          map.removeLayer(layer);
        }
      });

      // Re-add tile layers
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 19,
      }).addTo(map);

      // Add outbreak markers
      filteredPoints.forEach(point => {
        const color = getSeverityColor(point.severity);
        const size = Math.max(8, Math.min(24, Math.log10(point.cases + 1) * 6));
        
        const icon = L.divIcon({
          className: 'custom-marker',
          html: `
            <div style="
              width: ${size}px;
              height: ${size}px;
              background: ${color};
              border: 2px solid rgba(255,255,255,0.8);
              border-radius: 50%;
              box-shadow: 0 0 ${point.severity === 'critical' ? '12px' : '6px'} ${color};
              animation: ${point.severity === 'critical' ? 'pulse 2s infinite' : 'none'};
            "></div>
          `,
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });

        const marker = L.marker([point.lat, point.lng], { icon }).addTo(map);
        
        marker.on('click', () => onPointClick(point));
        marker.on('mouseover', () => setHoveredPoint(point));
        marker.on('mouseout', () => setHoveredPoint(null));
      });
    });
  }, [mapInstance, filteredPoints, onPointClick]);

  const textPrimary = darkMode ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = darkMode ? '#A1A1A6' : '#6E6E73';

  return (
    <div className="relative w-full h-full">
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
        .leaflet-container { background: #0a1628; }
        .leaflet-control-zoom { border: none !important; }
        .leaflet-control-zoom a { 
          background: rgba(0,0,0,0.7) !important; 
          color: #fff !important;
          border: 1px solid rgba(255,255,255,0.2) !important;
          backdrop-filter: blur(10px);
        }
        .leaflet-control-zoom a:hover { background: rgba(0,0,0,0.9) !important; }
      `}</style>
      
      <div ref={mapRef} className="w-full h-full rounded-xl overflow-hidden" style={{ minHeight: 400 }} />
      
      {hoveredPoint && (
        <div 
          className="absolute top-4 left-4 p-4 rounded-xl z-[1000] max-w-xs"
          style={{
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getSeverityColor(hoveredPoint.severity) }}
            />
            <span className="text-sm font-semibold" style={{ color: textPrimary }}>
              {hoveredPoint.name}, {hoveredPoint.country}
            </span>
          </div>
          <p className="text-xs mb-1" style={{ color: textSecondary }}>{hoveredPoint.disease}</p>
          <div className="grid grid-cols-2 gap-2 text-xs mt-2">
            <div>
              <span style={{ color: textSecondary }}>Cases: </span>
              <span style={{ color: '#FF9500' }}>{hoveredPoint.cases.toLocaleString()}</span>
            </div>
            <div>
              <span style={{ color: textSecondary }}>Deaths: </span>
              <span style={{ color: '#FF3B30' }}>{hoveredPoint.deaths.toLocaleString()}</span>
            </div>
          </div>
          <p className="text-xs mt-2 opacity-70" style={{ color: textSecondary }}>
            {hoveredPoint.reportDetails}
          </p>
        </div>
      )}
      
      <div 
        className="absolute bottom-4 right-4 px-3 py-2 rounded-lg text-xs z-[1000]"
        style={{
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(10px)',
          color: textSecondary,
        }}
      >
        Zoom: {zoom}x | Satellite Imagery
      </div>
    </div>
  );
}
