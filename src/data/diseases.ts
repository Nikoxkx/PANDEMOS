export interface Disease {
  id: string;
  slug: string;
  name: string;
  scientificName: string;
  pathogenType: string;
  pathogenDetail: string;
  icdCode: string;
  severity: 'critical' | 'elevated' | 'watch' | 'monitoring' | 'contained';
  description: string;
  incubation: string;
  fatalityRate: string;
  timeToDeath: string;
  r0: string;
  transmission: string[];
  treatments: string;
  vaccines: string;
  cases24h: number;
  deaths24h: number;
  totalCases: number;
  totalDeaths: number;
  growthRate: number;
  affectedCountries: number;
  regions: string[];
  sparklineData: number[];
  sources: Source[];
  discoveryTimeline: TimelineEvent[];
  transmissionMethods: TransmissionMethod[];
  symptoms: SymptomPhase[];
  affectedOrgans: AffectedOrgan[];
  riskFactors: RiskFactor[];
  preventionMeasures: string[];
  treatmentDetails: TreatmentDetail[];
  variants?: Variant[];
}

export interface Source {
  name: string;
  tier: 1 | 2 | 3 | 4 | 5;
  url: string;
  date: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  source: Source;
}

export interface TransmissionMethod {
  method: string;
  icon: string;
  description: string;
  riskLevel: 'high' | 'moderate' | 'low';
}

export interface SymptomPhase {
  phase: string;
  timeRange: string;
  severity: 'mild' | 'moderate' | 'severe';
  symptoms: { name: string; frequency: number }[];
}

export interface AffectedOrgan {
  name: string;
  system: string;
  severity: number;
  description: string;
  symptoms: string[];
  longTermEffects: string[];
}

export interface RiskFactor {
  factor: string;
  icon: string;
  description: string;
}

export interface TreatmentDetail {
  name: string;
  type: string;
  description: string;
  effectiveness: string;
}

export interface Variant {
  name: string;
  designation: string;
  dateIdentified: string;
  transmissibility: string;
  severity: string;
  vaccineEvasion: string;
}

export const diseases: Disease[] = [
  {
    id: '1', slug: 'covid-19', name: 'COVID-19', scientificName: 'Coronavirus Disease 2019',
    pathogenType: 'RNA Virus', pathogenDetail: 'SARS-CoV-2 · Betacoronavirus', icdCode: 'U07.1',
    severity: 'elevated', description: 'Acute respiratory illness caused by SARS-CoV-2 virus.',
    incubation: '2-14 days', fatalityRate: '0.5-1.0%', timeToDeath: '18 days', r0: '5.0-8.2',
    transmission: ['Airborne', 'Droplet', 'Contact'], treatments: 'Antivirals, Supportive', vaccines: 'mRNA, Viral Vector',
    cases24h: 45230, deaths24h: 312, totalCases: 776890543, totalDeaths: 7059612, growthRate: -2.3,
    affectedCountries: 193, regions: ['Global'],
    sparklineData: [120,145,132,178,156,189,201,187,165,143,156,178,190,210,198,176,165,154,143,138,132,128,135,141,148,152,145,138,132,128],
    sources: [{ name: 'WHO', tier: 1, url: 'https://who.int', date: '2024-01-15' }],
    discoveryTimeline: [{ date: 'Dec 2019', title: 'First cases', description: 'Cluster in Wuhan.', source: { name: 'WHO', tier: 1, url: '#', date: '2019-12' } }],
    transmissionMethods: [
      { method: 'Airborne', icon: 'airborne', description: 'Aerosol transmission in enclosed spaces.', riskLevel: 'high' },
      { method: 'Respiratory Droplets', icon: 'droplet', description: 'Large droplets from coughing/sneezing.', riskLevel: 'high' },
      { method: 'Surface Contact', icon: 'contact', description: 'Fomite transmission possible.', riskLevel: 'low' },
    ],
    symptoms: [
      { phase: 'Early', timeRange: 'Days 1-3', severity: 'mild', symptoms: [{ name: 'Fever', frequency: 88 }, { name: 'Dry cough', frequency: 68 }, { name: 'Fatigue', frequency: 62 }, { name: 'Anosmia', frequency: 44 }] },
      { phase: 'Progressive', timeRange: 'Days 3-7', severity: 'moderate', symptoms: [{ name: 'Dyspnea', frequency: 31 }, { name: 'Myalgia', frequency: 35 }] },
      { phase: 'Severe', timeRange: 'Days 7+', severity: 'severe', symptoms: [{ name: 'Pneumonia', frequency: 15 }, { name: 'ARDS', frequency: 8 }, { name: 'Cytokine storm', frequency: 5 }] },
    ],
    affectedOrgans: [
      { name: 'Lungs', system: 'Respiratory', severity: 95, description: 'Primary target via ACE2 receptors.', symptoms: ['Cough', 'Dyspnea', 'Pneumonia'], longTermEffects: ['Pulmonary fibrosis'] },
      { name: 'Heart', system: 'Cardiovascular', severity: 60, description: 'Myocardial injury in severe cases.', symptoms: ['Chest pain', 'Arrhythmia'], longTermEffects: ['Myocarditis'] },
      { name: 'Brain', system: 'Nervous', severity: 45, description: 'Neurological manifestations.', symptoms: ['Brain fog', 'Anosmia'], longTermEffects: ['Cognitive impairment'] },
      { name: 'Kidneys', system: 'Renal', severity: 35, description: 'Acute kidney injury in severe cases.', symptoms: ['Oliguria'], longTermEffects: ['CKD'] },
    ],
    riskFactors: [
      { factor: 'Age over 65', icon: 'user', description: 'Significantly higher mortality.' },
      { factor: 'Cardiovascular disease', icon: 'heart', description: 'Pre-existing conditions increase risk.' },
      { factor: 'Diabetes mellitus', icon: 'activity', description: 'Both types are significant risk factors.' },
      { factor: 'Immunocompromised', icon: 'shield', description: 'Prolonged infection and severity.' },
      { factor: 'Obesity BMI>30', icon: 'scale', description: 'Increased hospitalization risk.' },
    ],
    preventionMeasures: ['Vaccination', 'Masking', 'Hand hygiene', 'Ventilation', 'Physical distancing'],
    treatmentDetails: [
      { name: 'Paxlovid', type: 'Antiviral', description: 'Nirmatrelvir/ritonavir. Start within 5 days.', effectiveness: '89% reduction in hospitalization' },
      { name: 'Remdesivir', type: 'Antiviral', description: 'IV antiviral for hospitalized patients.', effectiveness: 'Reduces recovery time 5 days' },
      { name: 'Dexamethasone', type: 'Corticosteroid', description: 'For patients requiring oxygen.', effectiveness: '35% mortality reduction in ventilated' },
    ],
    variants: [
      { name: 'Omicron', designation: 'B.1.1.529', dateIdentified: 'Nov 2021', transmissibility: '3.5x Delta', severity: 'Lower', vaccineEvasion: 'Significant' },
    ],
  },
  {
    id: '2', slug: 'mpox', name: 'Mpox', scientificName: 'Monkeypox',
    pathogenType: 'DNA Virus', pathogenDetail: 'Orthopoxvirus · Poxviridae', icdCode: 'B04',
    severity: 'critical', description: 'Zoonotic viral disease with smallpox-like illness.',
    incubation: '5-21 days', fatalityRate: '3-6%', timeToDeath: '14 days', r0: '1.2-2.4',
    transmission: ['Contact', 'Droplet', 'Fomites'], treatments: 'Tecovirimat', vaccines: 'JYNNEOS',
    cases24h: 1245, deaths24h: 18, totalCases: 98456, totalDeaths: 2134, growthRate: 34.2,
    affectedCountries: 116, regions: ['Central Africa', 'West Africa', 'Europe'],
    sparklineData: [20,25,30,35,42,48,55,62,58,65,72,78,85,92,88,95,102,110,118,125,132,140,148,155,162,170,175,180,185,190],
    sources: [{ name: 'WHO', tier: 1, url: 'https://who.int', date: '2024-01-15' }],
    discoveryTimeline: [{ date: '1958', title: 'Discovered', description: 'First found in lab monkeys.', source: { name: 'Lancet', tier: 1, url: '#', date: '1958' } }],
    transmissionMethods: [
      { method: 'Direct Contact', icon: 'contact', description: 'Close contact with lesions.', riskLevel: 'high' },
      { method: 'Respiratory Droplets', icon: 'droplet', description: 'Prolonged face-to-face.', riskLevel: 'moderate' },
    ],
    symptoms: [
      { phase: 'Prodromal', timeRange: 'Days 1-3', severity: 'mild', symptoms: [{ name: 'Fever', frequency: 85 }, { name: 'Lymphadenopathy', frequency: 90 }, { name: 'Headache', frequency: 72 }] },
      { phase: 'Eruptive', timeRange: 'Days 3-10', severity: 'moderate', symptoms: [{ name: 'Skin lesions', frequency: 98 }, { name: 'Vesicles', frequency: 88 }, { name: 'Pustules', frequency: 82 }] },
    ],
    affectedOrgans: [{ name: 'Skin', system: 'Integumentary', severity: 98, description: 'Deep-seated lesions.', symptoms: ['Rash', 'Lesions'], longTermEffects: ['Scarring'] }],
    riskFactors: [{ factor: 'Close physical contact', icon: 'users', description: 'Intimate contact.' }],
    preventionMeasures: ['JYNNEOS vaccination', 'Isolation', 'Hand hygiene'],
    treatmentDetails: [{ name: 'Tecovirimat', type: 'Antiviral', description: 'FDA-approved for orthopox.', effectiveness: 'Under evaluation' }],
  },
  {
    id: '3', slug: 'h5n1', name: 'Avian Influenza H5N1', scientificName: 'HPAI A(H5N1)',
    pathogenType: 'RNA Virus', pathogenDetail: 'Influenza A · Orthomyxoviridae', icdCode: 'J09.X1',
    severity: 'critical', description: 'Highly pathogenic avian flu with pandemic potential.',
    incubation: '2-7 days', fatalityRate: '50-60%', timeToDeath: '9 days', r0: '0.1-0.4',
    transmission: ['Animal-to-human', 'Limited airborne'], treatments: 'Oseltamivir', vaccines: 'Experimental',
    cases24h: 3, deaths24h: 1, totalCases: 912, totalDeaths: 461, growthRate: 156,
    affectedCountries: 24, regions: ['Southeast Asia', 'North America'],
    sparklineData: [1,0,0,1,0,2,1,0,0,1,2,0,1,0,0,3,1,0,2,1,0,0,1,2,3,1,2,3,2,3],
    sources: [{ name: 'WHO', tier: 1, url: 'https://who.int', date: '2024-01-15' }],
    discoveryTimeline: [{ date: '1996', title: 'First detection', description: 'Found in domestic geese in China.', source: { name: 'WHO', tier: 1, url: '#', date: '1996' } }],
    transmissionMethods: [{ method: 'Animal-to-Human', icon: 'vector', description: 'Direct contact with infected poultry.', riskLevel: 'high' }],
    symptoms: [
      { phase: 'Early', timeRange: 'Days 1-3', severity: 'moderate', symptoms: [{ name: 'High fever', frequency: 97 }, { name: 'Cough', frequency: 83 }] },
      { phase: 'Critical', timeRange: 'Days 5+', severity: 'severe', symptoms: [{ name: 'ARDS', frequency: 55 }, { name: 'Multi-organ failure', frequency: 45 }] },
    ],
    affectedOrgans: [{ name: 'Lungs', system: 'Respiratory', severity: 98, description: 'Severe viral pneumonia.', symptoms: ['Respiratory failure'], longTermEffects: ['Pulmonary fibrosis'] }],
    riskFactors: [{ factor: 'Poultry workers', icon: 'alert', description: 'Occupational exposure.' }],
    preventionMeasures: ['Avoid sick birds', 'PPE for poultry workers', 'Culling infected flocks'],
    treatmentDetails: [{ name: 'Oseltamivir', type: 'Antiviral', description: 'Neuraminidase inhibitor. Start within 48h.', effectiveness: 'Reduces mortality if early' }],
  },
  {
    id: '4', slug: 'ebola', name: 'Ebola Virus Disease', scientificName: 'Ebola Hemorrhagic Fever',
    pathogenType: 'RNA Virus', pathogenDetail: 'Ebolavirus · Filoviridae', icdCode: 'A98.4',
    severity: 'watch', description: 'Severe hemorrhagic fever. CFR 25-90%.',
    incubation: '2-21 days', fatalityRate: '25-90%', timeToDeath: '8 days', r0: '1.5-2.5',
    transmission: ['Contact', 'Bodily Fluids'], treatments: 'mAb therapies', vaccines: 'rVSV-ZEBOV',
    cases24h: 8, deaths24h: 3, totalCases: 34356, totalDeaths: 15227, growthRate: -12,
    affectedCountries: 4, regions: ['West Africa', 'Central Africa'],
    sparklineData: [5,8,12,15,22,18,14,10,8,12,15,18,14,10,8,6,5,8,10,12,8,6,5,4,6,8,10,8,6,8],
    sources: [{ name: 'WHO', tier: 1, url: 'https://who.int', date: '2024-01-14' }],
    discoveryTimeline: [{ date: '1976', title: 'First identified', description: 'Outbreaks in Sudan and DRC.', source: { name: 'WHO', tier: 1, url: '#', date: '1976' } }],
    transmissionMethods: [{ method: 'Direct Contact', icon: 'contact', description: 'Contact with bodily fluids.', riskLevel: 'high' }],
    symptoms: [
      { phase: 'Early', timeRange: 'Days 1-3', severity: 'moderate', symptoms: [{ name: 'Sudden fever', frequency: 90 }, { name: 'Fatigue', frequency: 80 }] },
      { phase: 'Critical', timeRange: 'Days 7+', severity: 'severe', symptoms: [{ name: 'Hemorrhaging', frequency: 40 }, { name: 'Multi-organ failure', frequency: 60 }] },
    ],
    affectedOrgans: [{ name: 'Liver', system: 'Hepatic', severity: 90, description: 'Massive hepatocyte necrosis.', symptoms: ['Jaundice'], longTermEffects: [] }],
    riskFactors: [{ factor: 'Healthcare workers', icon: 'cross', description: 'High exposure risk.' }],
    preventionMeasures: ['rVSV-ZEBOV vaccination', 'Infection control', 'Safe burials'],
    treatmentDetails: [{ name: 'Inmazeb', type: 'mAb', description: 'Triple monoclonal antibody.', effectiveness: 'Significant mortality reduction' }],
  },
  {
    id: '5', slug: 'marburg', name: 'Marburg Virus Disease', scientificName: 'Marburg Hemorrhagic Fever',
    pathogenType: 'RNA Virus', pathogenDetail: 'Marburgvirus · Filoviridae', icdCode: 'A98.3',
    severity: 'watch', description: 'Highly virulent hemorrhagic fever. CFR up to 88%.',
    incubation: '2-21 days', fatalityRate: '24-88%', timeToDeath: '8-9 days', r0: '1.4-1.8',
    transmission: ['Contact', 'Bodily Fluids'], treatments: 'Supportive only', vaccines: 'Experimental',
    cases24h: 2, deaths24h: 1, totalCases: 623, totalDeaths: 372, growthRate: 45,
    affectedCountries: 3, regions: ['East Africa'],
    sparklineData: [0,0,1,0,0,1,2,1,0,0,1,2,3,2,1,0,1,2,1,0,0,1,2,3,2,1,2,2,1,2],
    sources: [{ name: 'WHO', tier: 1, url: 'https://who.int', date: '2024-01-14' }],
    discoveryTimeline: [{ date: '1967', title: 'First identified', description: 'Outbreaks in Germany linked to African monkeys.', source: { name: 'WHO', tier: 1, url: '#', date: '1967' } }],
    transmissionMethods: [{ method: 'Direct Contact', icon: 'contact', description: 'Contact with infected fluids.', riskLevel: 'high' }],
    symptoms: [{ phase: 'Early', timeRange: 'Days 1-5', severity: 'moderate', symptoms: [{ name: 'High fever', frequency: 92 }, { name: 'Severe headache', frequency: 85 }] }],
    affectedOrgans: [{ name: 'Liver', system: 'Hepatic', severity: 92, description: 'Severe hepatic necrosis.', symptoms: ['Liver failure'], longTermEffects: [] }],
    riskFactors: [{ factor: 'Cave workers', icon: 'alert', description: 'Exposure to Rousettus bats.' }],
    preventionMeasures: ['Avoid bat habitats', 'Infection control'],
    treatmentDetails: [{ name: 'Supportive care', type: 'Symptomatic', description: 'Rehydration and blood products.', effectiveness: 'Essential for survival' }],
  },
  {
    id: '6', slug: 'cholera', name: 'Cholera', scientificName: 'Cholera',
    pathogenType: 'Bacteria', pathogenDetail: 'Vibrio cholerae · O1/O139', icdCode: 'A00',
    severity: 'monitoring', description: 'Acute diarrhoeal infection from contaminated water.',
    incubation: '12h-5 days', fatalityRate: '<1% treated', timeToDeath: '2-3 days', r0: '1.0-2.0',
    transmission: ['Fecal-oral', 'Waterborne'], treatments: 'ORS, Antibiotics', vaccines: 'OCV',
    cases24h: 3400, deaths24h: 42, totalCases: 456000, totalDeaths: 3200, growthRate: 8.5,
    affectedCountries: 31, regions: ['Sub-Saharan Africa', 'South Asia'],
    sparklineData: [30,35,40,45,42,48,55,50,45,48,52,55,58,62,58,55,52,48,45,50,55,58,52,48,45,42,45,48,50,52],
    sources: [{ name: 'WHO', tier: 1, url: 'https://who.int', date: '2024-01-15' }],
    discoveryTimeline: [{ date: '1817', title: 'First pandemic', description: 'Ganges Delta origin.', source: { name: 'Historical', tier: 3, url: '#', date: '1817' } }],
    transmissionMethods: [{ method: 'Contaminated Water', icon: 'water', description: 'Primary infection route.', riskLevel: 'high' }],
    symptoms: [{ phase: 'Onset', timeRange: 'Hours 6-24', severity: 'moderate', symptoms: [{ name: 'Rice-water diarrhea', frequency: 95 }, { name: 'Vomiting', frequency: 80 }] }],
    affectedOrgans: [{ name: 'Small Intestine', system: 'Digestive', severity: 95, description: 'Massive fluid secretion.', symptoms: ['Dehydration'], longTermEffects: [] }],
    riskFactors: [{ factor: 'Lack of clean water', icon: 'droplet', description: 'Poor infrastructure.' }],
    preventionMeasures: ['Clean water', 'Sanitation', 'OCV', 'Hygiene education'],
    treatmentDetails: [{ name: 'ORS', type: 'Rehydration', description: 'WHO formula.', effectiveness: 'Reduces mortality to <1%' }],
  },
  {
    id: '7', slug: 'dengue', name: 'Dengue Fever', scientificName: 'Dengue',
    pathogenType: 'RNA Virus', pathogenDetail: 'Dengue virus · Flaviviridae', icdCode: 'A90',
    severity: 'elevated', description: 'Mosquito-borne tropical disease affecting 390M annually.',
    incubation: '4-10 days', fatalityRate: '0.1-2.5%', timeToDeath: '5-7 days', r0: '1.5-6.0',
    transmission: ['Vector (Aedes)', 'Mosquito'], treatments: 'Supportive', vaccines: 'Dengvaxia',
    cases24h: 45000, deaths24h: 120, totalCases: 5200000, totalDeaths: 24000, growthRate: 15,
    affectedCountries: 128, regions: ['Southeast Asia', 'Latin America', 'Caribbean'],
    sparklineData: [100,120,140,160,180,200,220,240,220,200,180,160,140,120,100,90,100,120,140,160,180,200,220,240,260,280,300,280,260,240],
    sources: [{ name: 'WHO', tier: 1, url: 'https://who.int', date: '2024-01-15' }],
    discoveryTimeline: [{ date: '1779', title: 'First recorded', description: 'Asia and Africa outbreaks.', source: { name: 'Historical', tier: 3, url: '#', date: '1779' } }],
    transmissionMethods: [{ method: 'Aedes mosquito', icon: 'vector', description: 'Aedes aegypti primary vector.', riskLevel: 'high' }],
    symptoms: [
      { phase: 'Febrile', timeRange: 'Days 1-4', severity: 'moderate', symptoms: [{ name: 'High fever', frequency: 90 }, { name: 'Severe headache', frequency: 85 }, { name: 'Retro-orbital pain', frequency: 70 }] },
      { phase: 'Critical', timeRange: 'Days 4-7', severity: 'severe', symptoms: [{ name: 'Plasma leakage', frequency: 25 }, { name: 'Hemorrhage', frequency: 15 }] },
    ],
    affectedOrgans: [{ name: 'Blood vessels', system: 'Cardiovascular', severity: 80, description: 'Endothelial dysfunction.', symptoms: ['Bleeding', 'Shock'], longTermEffects: [] }],
    riskFactors: [{ factor: 'Prior dengue infection', icon: 'alert', description: 'Secondary infection more severe.' }],
    preventionMeasures: ['Mosquito control', 'Dengvaxia (seropositive)', 'Remove standing water'],
    treatmentDetails: [{ name: 'Fluid management', type: 'Supportive', description: 'Careful IV fluids.', effectiveness: 'Reduces mortality significantly' }],
  },
  {
    id: '8', slug: 'malaria', name: 'Malaria', scientificName: 'Malaria',
    pathogenType: 'Parasite', pathogenDetail: 'Plasmodium · P. falciparum', icdCode: 'B50-54',
    severity: 'elevated', description: 'Life-threatening parasitic disease. 619,000 deaths/year.',
    incubation: '7-30 days', fatalityRate: '0.1-0.3%', timeToDeath: '3-7 days', r0: '2-100+',
    transmission: ['Vector (Anopheles)'], treatments: 'Artemisinin-based', vaccines: 'RTS,S',
    cases24h: 620000, deaths24h: 1700, totalCases: 247000000, totalDeaths: 619000, growthRate: 1.2,
    affectedCountries: 85, regions: ['Sub-Saharan Africa', 'South Asia'],
    sparklineData: [600,610,620,630,625,618,610,605,615,620,625,618,610,608,615,620,625,630,618,610,605,615,620,625,630,618,610,615,620,625],
    sources: [{ name: 'WHO', tier: 1, url: 'https://who.int', date: '2024-01-15' }],
    discoveryTimeline: [{ date: '1880', title: 'Parasite discovered', description: 'Laveran identified Plasmodium.', source: { name: 'Historical', tier: 1, url: '#', date: '1880' } }],
    transmissionMethods: [{ method: 'Anopheles mosquito', icon: 'vector', description: 'Female Anopheles bite.', riskLevel: 'high' }],
    symptoms: [{ phase: 'Acute', timeRange: 'Days 7-14', severity: 'moderate', symptoms: [{ name: 'Cyclic fever', frequency: 95 }, { name: 'Chills', frequency: 90 }, { name: 'Sweating', frequency: 85 }] }],
    affectedOrgans: [
      { name: 'Red blood cells', system: 'Hematologic', severity: 90, description: 'Parasite destroys RBCs.', symptoms: ['Anemia'], longTermEffects: [] },
      { name: 'Spleen', system: 'Lymphatic', severity: 70, description: 'Splenomegaly from clearance.', symptoms: ['Abdominal pain'], longTermEffects: [] },
    ],
    riskFactors: [{ factor: 'Children under 5', icon: 'user', description: '80% of deaths.' }],
    preventionMeasures: ['ITNs', 'IRS', 'Chemoprophylaxis', 'RTS,S vaccine'],
    treatmentDetails: [{ name: 'Artemether-lumefantrine', type: 'ACT', description: 'First-line treatment.', effectiveness: '>95% cure rate' }],
  },
  {
    id: '9', slug: 'tuberculosis', name: 'Tuberculosis', scientificName: 'Tuberculosis',
    pathogenType: 'Bacteria', pathogenDetail: 'Mycobacterium tuberculosis', icdCode: 'A15-19',
    severity: 'elevated', description: 'Leading infectious disease killer. 1.3M deaths/year.',
    incubation: '2-12 weeks', fatalityRate: '15% untreated', timeToDeath: 'Months-years', r0: '0.5-5.0',
    transmission: ['Airborne'], treatments: 'RIPE regimen', vaccines: 'BCG',
    cases24h: 28000, deaths24h: 3600, totalCases: 10600000, totalDeaths: 1300000, growthRate: -2,
    affectedCountries: 190, regions: ['Global'],
    sparklineData: [100,98,96,94,92,90,88,86,84,82,80,78,76,74,72,70,68,66,64,62,60,58,56,54,52,50,52,54,56,58],
    sources: [{ name: 'WHO', tier: 1, url: 'https://who.int', date: '2024-01-15' }],
    discoveryTimeline: [{ date: '1882', title: 'Bacillus discovered', description: 'Koch identified M. tuberculosis.', source: { name: 'Historical', tier: 1, url: '#', date: '1882' } }],
    transmissionMethods: [{ method: 'Airborne', icon: 'airborne', description: 'Droplet nuclei transmission.', riskLevel: 'high' }],
    symptoms: [{ phase: 'Active', timeRange: 'Weeks-months', severity: 'moderate', symptoms: [{ name: 'Chronic cough', frequency: 90 }, { name: 'Hemoptysis', frequency: 50 }, { name: 'Night sweats', frequency: 75 }, { name: 'Weight loss', frequency: 80 }] }],
    affectedOrgans: [{ name: 'Lungs', system: 'Respiratory', severity: 95, description: 'Granuloma formation.', symptoms: ['Cough', 'Hemoptysis'], longTermEffects: ['Fibrosis', 'Bronchiectasis'] }],
    riskFactors: [{ factor: 'HIV co-infection', icon: 'alert', description: '18x higher risk.' }],
    preventionMeasures: ['BCG vaccine', 'Contact tracing', 'Isoniazid preventive therapy'],
    treatmentDetails: [{ name: 'RIPE', type: 'Antibiotic', description: 'Rifampin, Isoniazid, Pyrazinamide, Ethambutol.', effectiveness: '85% cure rate' }],
  },
  {
    id: '10', slug: 'hiv-aids', name: 'HIV/AIDS', scientificName: 'Human Immunodeficiency Virus',
    pathogenType: 'RNA Virus', pathogenDetail: 'HIV-1/HIV-2 · Retroviridae', icdCode: 'B20-24',
    severity: 'monitoring', description: 'Chronic viral infection attacking the immune system.',
    incubation: '2-4 weeks', fatalityRate: '~100% untreated', timeToDeath: '8-10 years', r0: '2-5',
    transmission: ['Sexual', 'Blood', 'Vertical'], treatments: 'ART', vaccines: 'None',
    cases24h: 4100, deaths24h: 1800, totalCases: 39000000, totalDeaths: 40400000, growthRate: -3,
    affectedCountries: 195, regions: ['Global'],
    sparklineData: [42,41,40,39,38,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13],
    sources: [{ name: 'UNAIDS', tier: 1, url: 'https://unaids.org', date: '2024-01-15' }],
    discoveryTimeline: [{ date: '1981', title: 'First cases', description: 'CDC reports unusual pneumonia.', source: { name: 'CDC', tier: 1, url: '#', date: '1981' } }],
    transmissionMethods: [{ method: 'Sexual contact', icon: 'contact', description: 'Primary transmission route.', riskLevel: 'high' }],
    symptoms: [{ phase: 'Acute', timeRange: 'Weeks 2-4', severity: 'mild', symptoms: [{ name: 'Flu-like illness', frequency: 70 }, { name: 'Lymphadenopathy', frequency: 60 }] }],
    affectedOrgans: [{ name: 'CD4 T-cells', system: 'Immune', severity: 100, description: 'Progressive immune destruction.', symptoms: ['Opportunistic infections'], longTermEffects: ['AIDS'] }],
    riskFactors: [{ factor: 'Unprotected sex', icon: 'alert', description: 'Primary risk factor.' }],
    preventionMeasures: ['Condoms', 'PrEP', 'ART as prevention', 'Testing'],
    treatmentDetails: [{ name: 'ART', type: 'Antiviral', description: 'Combination antiretroviral therapy.', effectiveness: 'Normal life expectancy' }],
  },
  {
    id: '11', slug: 'rabies', name: 'Rabies', scientificName: 'Rabies',
    pathogenType: 'RNA Virus', pathogenDetail: 'Lyssavirus · Rhabdoviridae', icdCode: 'A82',
    severity: 'watch', description: 'Viral encephalitis. Nearly 100% fatal once symptomatic.',
    incubation: '1-3 months', fatalityRate: '~100%', timeToDeath: '2-10 days', r0: '1.0-1.2',
    transmission: ['Animal bite', 'Saliva'], treatments: 'PEP', vaccines: 'Rabies vaccine',
    cases24h: 160, deaths24h: 160, totalCases: 59000, totalDeaths: 59000, growthRate: 0,
    affectedCountries: 150, regions: ['Asia', 'Africa'],
    sparklineData: [160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160],
    sources: [{ name: 'WHO', tier: 1, url: 'https://who.int', date: '2024-01-15' }],
    discoveryTimeline: [{ date: '1885', title: 'Vaccine developed', description: 'Pasteur treats first patient.', source: { name: 'Historical', tier: 1, url: '#', date: '1885' } }],
    transmissionMethods: [{ method: 'Animal bite', icon: 'vector', description: 'Infected saliva via wound.', riskLevel: 'high' }],
    symptoms: [{ phase: 'Prodromal', timeRange: 'Days 1-4', severity: 'mild', symptoms: [{ name: 'Fever', frequency: 90 }, { name: 'Paresthesia at bite site', frequency: 85 }] }],
    affectedOrgans: [{ name: 'Brain', system: 'Nervous', severity: 100, description: 'Acute viral encephalitis.', symptoms: ['Hydrophobia', 'Aerophobia'], longTermEffects: ['Death'] }],
    riskFactors: [{ factor: 'Dog exposure', icon: 'alert', description: '99% of cases from dogs.' }],
    preventionMeasures: ['Dog vaccination', 'PEP', 'Wound washing'],
    treatmentDetails: [{ name: 'PEP', type: 'Prophylaxis', description: 'Post-exposure prophylaxis.', effectiveness: '100% if given before symptoms' }],
  },
  {
    id: '12', slug: 'measles', name: 'Measles', scientificName: 'Rubeola',
    pathogenType: 'RNA Virus', pathogenDetail: 'Measles morbillivirus · Paramyxoviridae', icdCode: 'B05',
    severity: 'elevated', description: 'Highly contagious viral infection. R0 12-18.',
    incubation: '10-14 days', fatalityRate: '0.1-0.3%', timeToDeath: '2-3 weeks', r0: '12-18',
    transmission: ['Airborne'], treatments: 'Supportive, Vitamin A', vaccines: 'MMR',
    cases24h: 12000, deaths24h: 35, totalCases: 9000000, totalDeaths: 128000, growthRate: 8,
    affectedCountries: 92, regions: ['Africa', 'Southeast Asia'],
    sparklineData: [80,85,90,95,100,105,110,115,120,125,130,135,140,145,150,145,140,135,130,125,120,115,110,105,100,105,110,115,120,125],
    sources: [{ name: 'WHO', tier: 1, url: 'https://who.int', date: '2024-01-15' }],
    discoveryTimeline: [{ date: '1963', title: 'Vaccine licensed', description: 'First measles vaccine.', source: { name: 'CDC', tier: 1, url: '#', date: '1963' } }],
    transmissionMethods: [{ method: 'Airborne', icon: 'airborne', description: 'Most contagious virus. Lingers in air 2h.', riskLevel: 'high' }],
    symptoms: [{ phase: 'Prodromal', timeRange: 'Days 1-4', severity: 'mild', symptoms: [{ name: 'Fever', frequency: 95 }, { name: 'Koplik spots', frequency: 90 }, { name: 'Coryza', frequency: 85 }] }],
    affectedOrgans: [{ name: 'Respiratory tract', system: 'Respiratory', severity: 80, description: 'Airway inflammation.', symptoms: ['Cough', 'Pneumonia'], longTermEffects: ['Immune amnesia'] }],
    riskFactors: [{ factor: 'Unvaccinated', icon: 'alert', description: 'Lack of MMR vaccine.' }],
    preventionMeasures: ['MMR vaccination', '95% herd immunity threshold'],
    treatmentDetails: [{ name: 'Vitamin A', type: 'Supportive', description: 'Reduces mortality 50%.', effectiveness: 'WHO recommended' }],
  },
  {
    id: '13', slug: 'lassa-fever', name: 'Lassa Fever', scientificName: 'Lassa Hemorrhagic Fever',
    pathogenType: 'RNA Virus', pathogenDetail: 'Lassa mammarenavirus · Arenaviridae', icdCode: 'A96.2',
    severity: 'elevated', description: 'Viral hemorrhagic fever endemic to West Africa.',
    incubation: '6-21 days', fatalityRate: '1-15%', timeToDeath: '14 days', r0: '1.0-1.5',
    transmission: ['Rodent contact', 'Human-to-human'], treatments: 'Ribavirin', vaccines: 'None',
    cases24h: 120, deaths24h: 12, totalCases: 300000, totalDeaths: 5000, growthRate: 15,
    affectedCountries: 4, regions: ['West Africa'],
    sparklineData: [100,105,110,115,120,125,130,135,140,135,130,125,120,115,110,105,110,115,120,125,130,135,130,125,120,115,120,125,130,135],
    sources: [{ name: 'WHO', tier: 1, url: 'https://who.int', date: '2024-01-15' }],
    discoveryTimeline: [{ date: '1969', title: 'First described', description: 'Identified in Lassa, Nigeria.', source: { name: 'WHO', tier: 1, url: '#', date: '1969' } }],
    transmissionMethods: [{ method: 'Mastomys rodents', icon: 'vector', description: 'Contact with rodent excreta.', riskLevel: 'high' }],
    symptoms: [{ phase: 'Progressive', timeRange: 'Days 5-14', severity: 'moderate', symptoms: [{ name: 'Fever', frequency: 90 }, { name: 'Facial edema', frequency: 60 }, { name: 'Pharyngitis', frequency: 70 }] }],
    affectedOrgans: [{ name: 'Liver', system: 'Hepatic', severity: 75, description: 'Hepatitis.', symptoms: ['Elevated transaminases'], longTermEffects: [] }],
    riskFactors: [{ factor: 'Healthcare workers', icon: 'cross', description: 'Nosocomial transmission.' }],
    preventionMeasures: ['Rodent control', 'Food storage', 'PPE'],
    treatmentDetails: [{ name: 'Ribavirin', type: 'Antiviral', description: 'Most effective early.', effectiveness: 'Reduces mortality if early' }],
  },
  {
    id: '14', slug: 'yellow-fever', name: 'Yellow Fever', scientificName: 'Yellow Fever',
    pathogenType: 'RNA Virus', pathogenDetail: 'Yellow fever virus · Flaviviridae', icdCode: 'A95',
    severity: 'watch', description: 'Acute viral hemorrhagic disease. Vaccine-preventable.',
    incubation: '3-6 days', fatalityRate: '20-50% severe', timeToDeath: '7-10 days', r0: '4-7',
    transmission: ['Vector (Aedes)'], treatments: 'Supportive', vaccines: 'YF-17D',
    cases24h: 80, deaths24h: 8, totalCases: 200000, totalDeaths: 30000, growthRate: 5,
    affectedCountries: 47, regions: ['Africa', 'South America'],
    sparklineData: [70,72,74,76,78,80,82,84,86,88,90,88,86,84,82,80,78,76,78,80,82,84,86,84,82,80,78,80,82,84],
    sources: [{ name: 'WHO', tier: 1, url: 'https://who.int', date: '2024-01-15' }],
    discoveryTimeline: [{ date: '1937', title: 'Vaccine developed', description: 'YF-17D strain.', source: { name: 'Historical', tier: 1, url: '#', date: '1937' } }],
    transmissionMethods: [{ method: 'Aedes mosquito', icon: 'vector', description: 'Sylvatic and urban cycles.', riskLevel: 'high' }],
    symptoms: [{ phase: 'Toxic', timeRange: 'Days 3-4', severity: 'severe', symptoms: [{ name: 'Jaundice', frequency: 80 }, { name: 'Hemorrhage', frequency: 50 }, { name: 'Renal failure', frequency: 40 }] }],
    affectedOrgans: [{ name: 'Liver', system: 'Hepatic', severity: 95, description: 'Councilman bodies.', symptoms: ['Jaundice'], longTermEffects: [] }],
    riskFactors: [{ factor: 'Unvaccinated travelers', icon: 'alert', description: 'Endemic zone travel.' }],
    preventionMeasures: ['YF-17D vaccination', 'Mosquito control'],
    treatmentDetails: [{ name: 'Supportive care', type: 'Symptomatic', description: 'No specific antiviral.', effectiveness: 'ICU support critical' }],
  },
  {
    id: '15', slug: 'nipah', name: 'Nipah Virus', scientificName: 'Nipah Virus Infection',
    pathogenType: 'RNA Virus', pathogenDetail: 'Nipah henipavirus · Paramyxoviridae', icdCode: 'B33.8',
    severity: 'critical', description: 'Emerging zoonosis with high fatality. WHO priority pathogen.',
    incubation: '4-14 days', fatalityRate: '40-75%', timeToDeath: '3-14 days', r0: '0.5-1.0',
    transmission: ['Bat-to-human', 'Human-to-human'], treatments: 'Supportive', vaccines: 'Experimental',
    cases24h: 0, deaths24h: 0, totalCases: 700, totalDeaths: 400, growthRate: 0,
    affectedCountries: 2, regions: ['South Asia', 'Southeast Asia'],
    sparklineData: [0,0,1,2,0,0,0,1,0,0,0,2,3,0,0,0,1,0,0,0,0,1,2,0,0,0,1,0,0,0],
    sources: [{ name: 'WHO', tier: 1, url: 'https://who.int', date: '2024-01-15' }],
    discoveryTimeline: [{ date: '1999', title: 'First outbreak', description: 'Malaysia pig farm outbreak.', source: { name: 'WHO', tier: 1, url: '#', date: '1999' } }],
    transmissionMethods: [{ method: 'Pteropus bats', icon: 'vector', description: 'Date palm sap contamination.', riskLevel: 'high' }],
    symptoms: [{ phase: 'Acute', timeRange: 'Days 3-14', severity: 'severe', symptoms: [{ name: 'Encephalitis', frequency: 80 }, { name: 'Respiratory distress', frequency: 60 }] }],
    affectedOrgans: [{ name: 'Brain', system: 'Nervous', severity: 98, description: 'Acute encephalitis.', symptoms: ['Altered consciousness', 'Seizures'], longTermEffects: ['Neurological sequelae'] }],
    riskFactors: [{ factor: 'Date palm sap consumption', icon: 'alert', description: 'Bat-contaminated sap.' }],
    preventionMeasures: ['Avoid raw date palm sap', 'Infection control'],
    treatmentDetails: [{ name: 'Ribavirin', type: 'Antiviral', description: 'Under investigation.', effectiveness: 'Limited data' }],
  },
];

export const getSeverityColor = (severity: string): string => {
  const colors: Record<string, string> = {
    critical: '#FF3B30',
    elevated: '#FF9500',
    watch: '#FFCC00',
    monitoring: '#007AFF',
    contained: '#34C759',
  };
  return colors[severity] || '#86868B';
};

export const getSeverityLabel = (severity: string): string => {
  const labels: Record<string, string> = {
    critical: 'Critical Threat',
    elevated: 'Elevated Threat',
    watch: 'Under Watch',
    monitoring: 'Monitoring',
    contained: 'Contained',
  };
  return labels[severity] || 'Unknown';
};

export const globalStats = {
  activeOutbreaks: 247,
  countriesAffected: 194,
  sourcesMonitored: 53,
  lastUpdated: new Date().toISOString(),
};

export const credibilityTiers = [
  { tier: 1, name: 'Gold Standard', icon: '*', scoreRange: '90-100', description: 'WHO, CDC, peer-reviewed journals.', examples: ['WHO', 'CDC', 'Lancet', 'NEJM'], criteria: ['International mandate', 'Peer-reviewed', 'Audited'] },
  { tier: 2, name: 'Highly Credible', icon: '+', scoreRange: '75-89', description: 'National health authorities.', examples: ['RKI', 'PHE', 'Africa CDC'], criteria: ['Government-backed', 'Regular reporting'] },
  { tier: 3, name: 'Credible', icon: 'o', scoreRange: '60-74', description: 'Regional authorities, wire services.', examples: ['Reuters Health', 'MSF'], criteria: ['Editorial standards', 'Named sources'] },
  { tier: 4, name: 'Preliminary', icon: '-', scoreRange: '40-59', description: 'Preprints, state health depts.', examples: ['medRxiv', 'bioRxiv'], criteria: ['Identified methodology', 'Subject to review'] },
  { tier: 5, name: 'Unverified', icon: '?', scoreRange: '0-39', description: 'Social media, user submissions.', examples: ['Social media signals'], criteria: ['Not independently confirmed'] },
];

export const historicalPandemics = [
  { year: '430 BC', name: 'Plague of Athens', deaths: '75,000-100,000', description: 'Typhoid fever during Peloponnesian War.' },
  { year: '541', name: 'Plague of Justinian', deaths: '25-50 million', description: 'First major bubonic plague pandemic.' },
  { year: '1346', name: 'Black Death', deaths: '75-200 million', description: 'Killed 30-60% of Europe.' },
  { year: '1520', name: 'Smallpox Americas', deaths: '56 million', description: 'Devastated indigenous populations.' },
  { year: '1817', name: 'First Cholera Pandemic', deaths: '100,000+', description: 'Ganges Delta origin.' },
  { year: '1918', name: 'Spanish Flu', deaths: '50-100 million', description: 'H1N1 infected 1/3 of world.' },
  { year: '1957', name: 'Asian Flu', deaths: '1-2 million', description: 'H2N2 influenza.' },
  { year: '1968', name: 'Hong Kong Flu', deaths: '1-4 million', description: 'H3N2 influenza.' },
  { year: '1981', name: 'HIV/AIDS', deaths: '40+ million', description: 'Ongoing pandemic.' },
  { year: '2002', name: 'SARS', deaths: '774', description: 'First SARS coronavirus.' },
  { year: '2009', name: 'H1N1 Pandemic', deaths: '151,700-575,400', description: 'Swine flu.' },
  { year: '2014', name: 'West African Ebola', deaths: '11,325', description: 'Largest Ebola outbreak.' },
  { year: '2019', name: 'COVID-19', deaths: '7+ million', description: 'SARS-CoV-2 pandemic.' },
  { year: '2022', name: 'Mpox Global', deaths: '100+', description: 'Multi-country outbreak.' },
];
