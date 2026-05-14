import { useState, useEffect, memo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useStore } from '../store/useStore';
import { getSeverityColor } from '../data/diseases';
import 'leaflet/dist/leaflet.css';

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
}

// Comprehensive outbreak data with real source URLs
const outbreakData: MapPoint[] = [
  // Mpox hotspots
  { id: 'm1', name: 'Kinshasa', country: 'Democratic Republic of Congo', lat: -4.32, lng: 15.31, cases: 3245, deaths: 89, severity: 'critical', disease: 'Mpox', source: 'WHO', sourceFull: 'World Health Organization - Disease Outbreak News', tier: 1, date: '2024-01-15', reportDetails: 'Clade Ib outbreak with sustained human-to-human transmission. Index case traced to mining community. Enhanced surveillance and contact tracing underway.', sourceUrl: 'https://www.who.int/emergencies/disease-outbreak-news' },
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

  // Additional diseases
  { id: 'tb1', name: 'Mumbai', country: 'India', lat: 19.08, lng: 72.88, cases: 8900, deaths: 456, severity: 'elevated', disease: 'Tuberculosis', source: 'India MOH', sourceFull: 'Indian Ministry of Health', tier: 2, date: '2024-01-14', reportDetails: 'MDR-TB cases increasing. DOTS program expansion ongoing.', sourceUrl: 'https://www.mohfw.gov.in/' },
  { id: 'mal1', name: 'Ouagadougou', country: 'Burkina Faso', lat: 12.37, lng: -1.52, cases: 12340, deaths: 234, severity: 'elevated', disease: 'Malaria', source: 'WHO', sourceFull: 'World Health Organization', tier: 1, date: '2024-01-13', reportDetails: 'Seasonal malaria transmission. Bed net distribution campaign.', sourceUrl: 'https://www.who.int/teams/global-malaria-programme' },
  { id: 'lf1', name: 'Ondo', country: 'Nigeria', lat: 7.09, lng: 4.84, cases: 456, deaths: 89, severity: 'elevated', disease: 'Lassa Fever', source: 'NCDC', sourceFull: 'Nigeria Centre for Disease Control', tier: 2, date: '2024-01-12', reportDetails: 'Seasonal Lassa fever activity. Contact tracing ongoing.', sourceUrl: 'https://ncdc.gov.ng/' },
  { id: 'pol1', name: 'Karachi', country: 'Pakistan', lat: 24.86, lng: 67.01, cases: 12, deaths: 0, severity: 'watch', disease: 'Polio', source: 'WHO', sourceFull: 'World Health Organization', tier: 1, date: '2024-01-11', reportDetails: 'Wild poliovirus type 1 detected. Emergency vaccination response.', sourceUrl: 'https://polioeradication.org/' },
];

interface WorldMapProps {
  onPointClick: (point: MapPoint) => void;
  selectedDisease?: string;
  selectedSeverity?: string;
}

// Component to handle map view changes and track zoom level
function MapController({ darkMode, onZoomChange }: { darkMode: boolean; onZoomChange: (zoom: number) => void }) {
  const map = useMap();
  
  useEffect(() => {
    // Force map to invalidate size after render
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
    
    // Track zoom changes
    const handleZoom = () => {
      onZoomChange(map.getZoom());
    };
    
    map.on('zoomend', handleZoom);
    return () => {
      map.off('zoomend', handleZoom);
    };
  }, [map, onZoomChange]);

  return null;
}

// Create glass-style pin icon
const createPinIcon = (severity: string) => {
  const color = getSeverityColor(severity);
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
      <defs>
        <filter id="glow-${severity}" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feFlood flood-color="${color}" flood-opacity="0.6"/>
          <feComposite in2="blur" operator="in"/>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="glass-${severity}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(255,255,255,0.4)"/>
          <stop offset="50%" style="stop-color:rgba(255,255,255,0.1)"/>
          <stop offset="100%" style="stop-color:rgba(255,255,255,0.2)"/>
        </linearGradient>
      </defs>
      <path d="M14 0C6.3 0 0 6.3 0 14c0 8.4 14 22 14 22s14-13.6 14-22C28 6.3 21.7 0 14 0z" 
            fill="${color}" 
            fill-opacity="0.7"
            stroke="rgba(255,255,255,0.6)" 
            stroke-width="1"
            filter="url(#glow-${severity})"/>
      <path d="M14 2C7.4 2 2 7.4 2 14c0 1.5 0.3 3 0.8 4.3C5 12 9 8 14 8s9 4 11.2 10.3c0.5-1.3 0.8-2.8 0.8-4.3C26 7.4 20.6 2 14 2z" 
            fill="url(#glass-${severity})" 
            opacity="0.5"/>
      <circle cx="14" cy="13" r="5" fill="rgba(255,255,255,0.85)" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    </svg>
  `;
  
  return L.divIcon({
    html: svgIcon,
    className: 'custom-pin-icon',
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -36],
  });
};

const WorldMap = memo(function WorldMap({ onPointClick, selectedDisease = 'all', selectedSeverity = 'all' }: WorldMapProps) {
  const { darkMode } = useStore();
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [mapType, setMapType] = useState<'dark' | 'satellite'>('dark');
  const [currentZoom, setCurrentZoom] = useState(2);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  
  // Hide controls after 5 seconds of inactivity
  useEffect(() => {
    const timer = setInterval(() => {
      if (Date.now() - lastInteraction > 5000) {
        setControlsVisible(false);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [lastInteraction]);

  const handleInteraction = () => {
    setLastInteraction(Date.now());
    setControlsVisible(true);
  };

  const filteredPoints = outbreakData.filter(p => {
    if (selectedDisease !== 'all' && p.disease !== selectedDisease) return false;
    if (selectedSeverity !== 'all' && p.severity !== selectedSeverity) return false;
    return true;
  });

  const textPrimary = darkMode ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = darkMode ? '#A1A1A6' : '#6E6E73';

  // Tile URLs for different map types
  const darkTileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
  const satelliteTileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
  
  const tileUrl = mapType === 'satellite' ? satelliteTileUrl : darkTileUrl;
  const tileAttribution = mapType === 'satellite' 
    ? '&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';



  return (
    <div 
      className="relative w-full h-full"
      onMouseMove={handleInteraction}
      onTouchStart={handleInteraction}
      onClick={handleInteraction}
    >
      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        maxZoom={12}
        zoomControl={false}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
        style={{ 
          width: '100%', 
          height: '100%',
          background: darkMode ? '#1a1a2e' : '#e8e8e8',
        }}
      >
        <MapController darkMode={darkMode} onZoomChange={setCurrentZoom} />
        
        {/* Zoom controls positioned top-right */}
        <ZoomControl position="topright" />
        
        {/* Map tiles - dark CartoDB or satellite */}
        <TileLayer
          key={mapType}
          attribution={tileAttribution}
          url={tileUrl}
        />

        {/* Outbreak markers */}
        {filteredPoints.map((point) => {
          const color = getSeverityColor(point.severity);

          return (
            <Marker
              key={point.id}
              position={[point.lat, point.lng]}
              icon={createPinIcon(point.severity)}
              eventHandlers={{
                click: () => {
                  setSelectedPoint(point);
                  onPointClick(point);
                },
              }}
            >
              <Popup>
                <div style={{ 
                  minWidth: '220px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    marginBottom: '8px',
                  }}>
                    <div style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: color,
                      boxShadow: `0 0 8px ${color}`,
                    }} />
                    <span style={{ 
                      fontWeight: 600, 
                      fontSize: '14px',
                      color: '#1D1D1F',
                    }}>
                      {point.name}, {point.country}
                    </span>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    gap: '16px',
                    marginBottom: '8px',
                  }}>
                    <div>
                      <div style={{ fontSize: '11px', color: '#6E6E73', textTransform: 'uppercase' }}>Cases</div>
                      <div style={{ fontSize: '16px', fontWeight: 600, color: '#1D1D1F' }}>{point.cases.toLocaleString()}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: '#6E6E73', textTransform: 'uppercase' }}>Deaths</div>
                      <div style={{ fontSize: '16px', fontWeight: 600, color: '#1D1D1F' }}>{point.deaths.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    marginBottom: '6px',
                  }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 500,
                      backgroundColor: color,
                      color: '#fff',
                      textTransform: 'uppercase',
                    }}>
                      {point.disease}
                    </span>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      backgroundColor: 'rgba(0,0,0,0.05)',
                      color: '#6E6E73',
                      textTransform: 'uppercase',
                    }}>
                      {point.severity}
                    </span>
                  </div>
                  
                  <div style={{ 
                    fontSize: '11px', 
                    color: '#6E6E73',
                  }}>
                    Source: {point.source} &middot; {point.date}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Map type toggle - Apple Glass style */}
      <div 
        className="absolute top-4 left-4 z-[1000] flex rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          opacity: controlsVisible ? 1 : 0,
          pointerEvents: controlsVisible ? 'auto' : 'none',
          transform: controlsVisible ? 'translateY(0)' : 'translateY(-10px)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          backgroundColor: darkMode ? 'rgba(30, 30, 40, 0.7)' : 'rgba(255, 255, 255, 0.7)',
          border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: darkMode 
            ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 0 0.5px rgba(255, 255, 255, 0.1)'
            : '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 0.5px rgba(255, 255, 255, 0.5)',
        }}
      >
        <button
          onClick={() => setMapType('dark')}
          className="px-4 py-2.5 text-xs font-medium transition-all duration-200 border-0 cursor-pointer"
          style={{
            backgroundColor: mapType === 'dark' 
              ? (darkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)')
              : 'transparent',
            color: mapType === 'dark'
              ? (darkMode ? '#ffffff' : '#1D1D1F')
              : (darkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)'),
            fontFamily: 'inherit',
          }}
        >
          Dark
        </button>
        <button
          onClick={() => setMapType('satellite')}
          className="px-4 py-2.5 text-xs font-medium transition-all duration-200 border-0 cursor-pointer"
          style={{
            backgroundColor: mapType === 'satellite' 
              ? (darkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)')
              : 'transparent',
            color: mapType === 'satellite'
              ? (darkMode ? '#ffffff' : '#1D1D1F')
              : (darkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)'),
            fontFamily: 'inherit',
          }}
        >
          Satellite
        </button>
      </div>

      {/* Custom CSS for Leaflet - Apple Glass style */}
      <style>{`
        .leaflet-container {
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
        }
        .custom-pin-icon {
          background: none !important;
          border: none !important;
        }
        .leaflet-control-zoom {
          border: none !important;
          border-radius: 16px !important;
          overflow: hidden !important;
          backdrop-filter: blur(20px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
          background: ${darkMode ? 'rgba(30, 30, 40, 0.7)' : 'rgba(255, 255, 255, 0.7)'} !important;
          box-shadow: ${darkMode 
            ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 0 0.5px rgba(255, 255, 255, 0.1)'
            : '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 0.5px rgba(255, 255, 255, 0.5)'} !important;
          border: ${darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'} !important;
          transition: opacity 0.3s ease, transform 0.3s ease !important;
          opacity: ${controlsVisible ? 1 : 0} !important;
          pointer-events: ${controlsVisible ? 'auto' : 'none'} !important;
          transform: ${controlsVisible ? 'translateY(0)' : 'translateY(-10px)'} !important;
        }
        .leaflet-control-zoom a {
          background: transparent !important;
          color: ${darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)'} !important;
          border: none !important;
          width: 36px !important;
          height: 36px !important;
          line-height: 36px !important;
          font-size: 18px !important;
          font-weight: 300 !important;
          transition: background 0.2s ease !important;
        }
        .leaflet-control-zoom a:hover {
          background: ${darkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)'} !important;
        }
        .leaflet-control-zoom-in {
          border-radius: 0 !important;
          border-bottom: ${darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'} !important;
        }
        .leaflet-control-zoom-out {
          border-radius: 0 !important;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 16px !important;
          backdrop-filter: blur(20px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
          background: rgba(255, 255, 255, 0.95) !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15), inset 0 0 0 0.5px rgba(255, 255, 255, 0.5) !important;
        }
        .leaflet-popup-tip {
          background: rgba(255, 255, 255, 0.95) !important;
          box-shadow: none !important;
        }
        .leaflet-control-attribution {
          backdrop-filter: blur(10px) !important;
          -webkit-backdrop-filter: blur(10px) !important;
          background: ${darkMode ? 'rgba(30, 30, 40, 0.6)' : 'rgba(255, 255, 255, 0.6)'} !important;
          color: ${darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)'} !important;
          font-size: 10px !important;
          border-radius: 8px 0 0 0 !important;
          padding: 2px 8px !important;
          transition: opacity 0.3s ease !important;
          opacity: ${controlsVisible ? 1 : 0} !important;
        }
        .leaflet-control-attribution a {
          color: ${darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)'} !important;
        }
      `}</style>
    </div>
  );
});

export default WorldMap;
