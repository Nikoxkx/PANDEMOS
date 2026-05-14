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
    id: '1',
    slug: 'covid-19',
    name: 'COVID-19',
    scientificName: 'Coronavirus Disease 2019',
    pathogenType: 'RNA Virus',
    pathogenDetail: 'SARS-CoV-2 · Betacoronavirus',
    icdCode: 'U07.1',
    severity: 'elevated',
    description: 'An acute respiratory illness caused by the SARS-CoV-2 virus, first identified in Wuhan, China in December 2019.',
    incubation: '2–14 days',
    fatalityRate: '0.5–1.0%',
    timeToDeath: '18 days',
    r0: '5.0–8.2',
    transmission: ['Airborne', 'Droplet', 'Contact'],
    treatments: 'Antivirals, Supportive',
    vaccines: 'mRNA, Viral Vector',
    cases24h: 45230,
    deaths24h: 312,
    totalCases: 776890543,
    totalDeaths: 7059612,
    growthRate: -2.3,
    affectedCountries: 193,
    regions: ['Global'],
    sparklineData: [120, 145, 132, 178, 156, 189, 201, 187, 165, 143, 156, 178, 190, 210, 198, 176, 165, 154, 143, 138, 132, 128, 135, 141, 148, 152, 145, 138, 132, 128],
    sources: [
      { name: 'World Health Organization', tier: 1, url: 'https://www.who.int/emergencies/diseases/novel-coronavirus-2019', date: '2024-01-15' },
      { name: 'U.S. CDC', tier: 1, url: 'https://www.cdc.gov/covid/index.html', date: '2024-01-15' },
      { name: 'Johns Hopkins CSSE', tier: 1, url: 'https://coronavirus.jhu.edu/', date: '2024-01-14' },
    ],
    discoveryTimeline: [
      { date: 'Dec 2019', title: 'First cases identified', description: 'Cluster of pneumonia cases of unknown origin reported in Wuhan, Hubei Province, China.', source: { name: 'WHO', tier: 1, url: 'https://www.who.int', date: '2019-12-31' } },
      { date: 'Jan 7, 2020', title: 'Virus isolated', description: 'Chinese authorities identify a novel coronavirus (2019-nCoV) as the causative agent.', source: { name: 'WHO', tier: 1, url: 'https://www.who.int', date: '2020-01-07' } },
      { date: 'Jan 11, 2020', title: 'First death reported', description: 'A 61-year-old man becomes the first known fatality in Wuhan.', source: { name: 'Wuhan Health Commission', tier: 2, url: '#', date: '2020-01-11' } },
      { date: 'Feb 11, 2020', title: 'Official naming', description: 'WHO names the disease COVID-19. The virus is designated SARS-CoV-2 by the ICTV.', source: { name: 'WHO', tier: 1, url: 'https://www.who.int', date: '2020-02-11' } },
      { date: 'Mar 11, 2020', title: 'Pandemic declared', description: 'WHO characterizes COVID-19 as a pandemic. 118,000 cases in 114 countries at the time of declaration.', source: { name: 'WHO', tier: 1, url: 'https://www.who.int', date: '2020-03-11' } },
      { date: 'Dec 11, 2020', title: 'First vaccine authorized', description: 'Pfizer-BioNTech COVID-19 vaccine receives Emergency Use Authorization from the U.S. FDA.', source: { name: 'U.S. FDA', tier: 1, url: 'https://www.fda.gov', date: '2020-12-11' } },
    ],
    transmissionMethods: [
      { method: 'Airborne Transmission', icon: 'airborne', description: 'The virus can travel through the air in small aerosol particles and be inhaled by people nearby, especially in enclosed spaces.', riskLevel: 'high' },
      { method: 'Respiratory Droplets', icon: 'droplet', description: 'Large droplets produced when an infected person coughs, sneezes, or talks can land on nearby individuals.', riskLevel: 'high' },
      { method: 'Surface Contact', icon: 'contact', description: 'The virus can survive on surfaces for hours to days. Contact followed by touching the face may lead to infection.', riskLevel: 'low' },
    ],
    symptoms: [
      { phase: 'Early', timeRange: 'Days 1–3', severity: 'mild', symptoms: [{ name: 'Fever', frequency: 88 }, { name: 'Dry cough', frequency: 68 }, { name: 'Fatigue', frequency: 62 }, { name: 'Loss of taste/smell', frequency: 44 }] },
      { phase: 'Progressive', timeRange: 'Days 3–7', severity: 'moderate', symptoms: [{ name: 'Shortness of breath', frequency: 31 }, { name: 'Body aches', frequency: 35 }, { name: 'Headache', frequency: 14 }, { name: 'Sore throat', frequency: 12 }] },
      { phase: 'Severe', timeRange: 'Days 7+', severity: 'severe', symptoms: [{ name: 'Pneumonia', frequency: 15 }, { name: 'ARDS', frequency: 8 }, { name: 'Organ failure', frequency: 3 }, { name: 'Cytokine storm', frequency: 5 }] },
    ],
    affectedOrgans: [
      { name: 'Lungs', system: 'Respiratory', severity: 95, description: 'Primary target. SARS-CoV-2 binds to ACE2 receptors on alveolar cells, causing inflammation and fluid buildup.', symptoms: ['Cough', 'Shortness of breath', 'Pneumonia'], longTermEffects: ['Pulmonary fibrosis', 'Reduced lung capacity'] },
      { name: 'Heart', system: 'Cardiovascular', severity: 60, description: 'Myocardial injury observed in severe cases. Inflammation can affect heart muscle and blood vessels.', symptoms: ['Chest pain', 'Palpitations', 'Arrhythmia'], longTermEffects: ['Myocarditis', 'Heart failure'] },
      { name: 'Brain', system: 'Nervous', severity: 45, description: 'Neurological manifestations include loss of smell/taste, headaches, and in severe cases, encephalitis.', symptoms: ['Loss of smell', 'Brain fog', 'Headache'], longTermEffects: ['Cognitive impairment', 'Chronic fatigue'] },
      { name: 'Kidneys', system: 'Renal', severity: 35, description: 'ACE2 receptors in kidneys can be targeted. Acute kidney injury reported in severe cases.', symptoms: ['Reduced urine output', 'Fluid retention'], longTermEffects: ['Chronic kidney disease'] },
    ],
    riskFactors: [
      { factor: 'Age over 65', icon: '👤', description: 'Risk of severe illness increases significantly with age.' },
      { factor: 'Cardiovascular disease', icon: '❤️', description: 'Pre-existing heart conditions increase vulnerability.' },
      { factor: 'Diabetes', icon: '💉', description: 'Both type 1 and type 2 diabetes are significant risk factors.' },
      { factor: 'Immunocompromised', icon: '🛡️', description: 'Weakened immune systems lead to prolonged infection and severity.' },
      { factor: 'Obesity', icon: '⚖️', description: 'BMI ≥ 30 associated with increased risk of hospitalization.' },
      { factor: 'Chronic lung disease', icon: '🫁', description: 'COPD, asthma increase risk of respiratory complications.' },
    ],
    preventionMeasures: ['Vaccination', 'Mask wearing in crowded indoor settings', 'Hand hygiene', 'Ventilation improvement', 'Physical distancing during surges'],
    treatmentDetails: [
      { name: 'Paxlovid', type: 'Antiviral', description: 'Nirmatrelvir/ritonavir combination. Most effective when started within 5 days of symptom onset.', effectiveness: 'Reduces hospitalization by 89%' },
      { name: 'Remdesivir', type: 'Antiviral', description: 'IV antiviral for hospitalized patients. Inhibits viral RNA replication.', effectiveness: 'Reduces recovery time by 5 days' },
      { name: 'Dexamethasone', type: 'Corticosteroid', description: 'Reduces mortality in patients requiring oxygen or ventilation.', effectiveness: 'Reduces mortality by 35% in ventilated patients' },
    ],
    variants: [
      { name: 'Alpha', designation: 'B.1.1.7', dateIdentified: 'Sep 2020', transmissibility: '~50% more transmissible', severity: 'Slightly more severe', vaccineEvasion: 'Minimal' },
      { name: 'Delta', designation: 'B.1.617.2', dateIdentified: 'Oct 2020', transmissibility: '~60% more than Alpha', severity: 'More severe', vaccineEvasion: 'Moderate' },
      { name: 'Omicron', designation: 'B.1.1.529', dateIdentified: 'Nov 2021', transmissibility: '~3.5x more than Delta', severity: 'Less severe', vaccineEvasion: 'Significant' },
    ],
  },
  {
    id: '2',
    slug: 'mpox',
    name: 'Mpox',
    scientificName: 'Monkeypox',
    pathogenType: 'DNA Virus',
    pathogenDetail: 'Orthopoxvirus · Poxviridae',
    icdCode: 'B04',
    severity: 'critical',
    description: 'A zoonotic viral disease caused by the monkeypox virus, producing a smallpox-like illness with characteristic skin lesions.',
    incubation: '5–21 days',
    fatalityRate: '3–6%',
    timeToDeath: '14 days',
    r0: '1.2–2.4',
    transmission: ['Contact', 'Droplet', 'Fomites'],
    treatments: 'Tecovirimat, Supportive',
    vaccines: 'JYNNEOS',
    cases24h: 1245,
    deaths24h: 18,
    totalCases: 98456,
    totalDeaths: 2134,
    growthRate: 34.2,
    affectedCountries: 116,
    regions: ['Central Africa', 'West Africa', 'Europe'],
    sparklineData: [20, 25, 30, 35, 42, 48, 55, 62, 58, 65, 72, 78, 85, 92, 88, 95, 102, 110, 118, 125, 132, 140, 148, 155, 162, 170, 175, 180, 185, 190],
    sources: [
      { name: 'World Health Organization', tier: 1, url: 'https://www.who.int/health-topics/monkeypox', date: '2024-01-15' },
      { name: 'Africa CDC', tier: 2, url: 'https://africacdc.org/', date: '2024-01-14' },
    ],
    discoveryTimeline: [
      { date: '1958', title: 'Virus first identified', description: 'Monkeypox virus first discovered in colonies of monkeys kept for research in Denmark.', source: { name: 'The Lancet', tier: 1, url: '#', date: '1958-01-01' } },
      { date: '1970', title: 'First human case', description: 'First human case recorded in a 9-month-old boy in the Democratic Republic of Congo.', source: { name: 'WHO', tier: 1, url: '#', date: '1970-09-01' } },
      { date: 'May 2022', title: 'Multi-country outbreak', description: 'Cases detected outside endemic African countries, triggering global surveillance.', source: { name: 'WHO', tier: 1, url: '#', date: '2022-05-13' } },
      { date: 'Jul 2022', title: 'PHEIC declared', description: 'WHO declares monkeypox a Public Health Emergency of International Concern.', source: { name: 'WHO', tier: 1, url: '#', date: '2022-07-23' } },
      { date: 'Aug 2024', title: 'Clade I outbreak', description: 'New clade Ib variant identified in DRC with sustained human-to-human transmission.', source: { name: 'Africa CDC', tier: 2, url: '#', date: '2024-08-14' } },
    ],
    transmissionMethods: [
      { method: 'Direct Contact', icon: 'contact', description: 'Close physical contact with infectious skin lesions, bodily fluids, or contaminated materials.', riskLevel: 'high' },
      { method: 'Respiratory Droplets', icon: 'droplet', description: 'Prolonged face-to-face contact can allow transmission via large respiratory droplets.', riskLevel: 'moderate' },
      { method: 'Contaminated Objects', icon: 'fomite', description: 'Contact with contaminated clothing, bedding, or other fomites.', riskLevel: 'moderate' },
    ],
    symptoms: [
      { phase: 'Prodromal', timeRange: 'Days 1–3', severity: 'mild', symptoms: [{ name: 'Fever', frequency: 85 }, { name: 'Headache', frequency: 72 }, { name: 'Lymphadenopathy', frequency: 90 }, { name: 'Muscle aches', frequency: 55 }] },
      { phase: 'Eruptive', timeRange: 'Days 3–10', severity: 'moderate', symptoms: [{ name: 'Skin rash/lesions', frequency: 98 }, { name: 'Vesicles', frequency: 88 }, { name: 'Pustules', frequency: 82 }, { name: 'Pain at lesion sites', frequency: 75 }] },
      { phase: 'Resolution', timeRange: 'Days 14–28', severity: 'mild', symptoms: [{ name: 'Crusting of lesions', frequency: 95 }, { name: 'Scarring', frequency: 40 }, { name: 'Fatigue', frequency: 35 }] },
    ],
    affectedOrgans: [
      { name: 'Skin', system: 'Integumentary', severity: 98, description: 'Characteristic deep-seated, well-circumscribed lesions progressing through macules, papules, vesicles, and pustules.', symptoms: ['Rash', 'Lesions', 'Scarring'], longTermEffects: ['Permanent scarring', 'Skin discoloration'] },
      { name: 'Lymph Nodes', system: 'Lymphatic', severity: 85, description: 'Lymphadenopathy is a distinguishing feature of mpox, particularly cervical and inguinal lymph nodes.', symptoms: ['Swollen lymph nodes', 'Pain'], longTermEffects: [] },
    ],
    riskFactors: [
      { factor: 'Close physical contact', icon: '🤝', description: 'Intimate or prolonged skin-to-skin contact.' },
      { factor: 'Immunocompromised', icon: '🛡️', description: 'HIV/AIDS patients at higher risk of severe disease.' },
      { factor: 'Children under 8', icon: '👶', description: 'Higher risk of severe complications in young children.' },
    ],
    preventionMeasures: ['JYNNEOS vaccination for high-risk groups', 'Avoiding contact with infected individuals', 'Hand hygiene', 'Isolation of cases'],
    treatmentDetails: [
      { name: 'Tecovirimat (TPOXX)', type: 'Antiviral', description: 'FDA-approved antiviral that inhibits orthopoxvirus VP37 protein.', effectiveness: 'Under evaluation in clinical trials' },
      { name: 'Supportive care', type: 'Symptomatic', description: 'Pain management, wound care, and treatment of secondary infections.', effectiveness: 'Standard of care' },
    ],
  },
  {
    id: '3',
    slug: 'avian-influenza-h5n1',
    name: 'Avian Influenza (H5N1)',
    scientificName: 'Highly Pathogenic Avian Influenza A(H5N1)',
    pathogenType: 'RNA Virus',
    pathogenDetail: 'Influenza A · H5N1 · Orthomyxoviridae',
    icdCode: 'J09.X1',
    severity: 'critical',
    description: 'A highly pathogenic strain of avian influenza with pandemic potential. While primarily affecting birds, sporadic human infections carry extremely high mortality.',
    incubation: '2–7 days',
    fatalityRate: '50–60%',
    timeToDeath: '9 days',
    r0: '0.1–0.4',
    transmission: ['Animal-to-human', 'Airborne (limited)'],
    treatments: 'Oseltamivir, Supportive',
    vaccines: 'Experimental',
    cases24h: 3,
    deaths24h: 1,
    totalCases: 912,
    totalDeaths: 461,
    growthRate: 156,
    affectedCountries: 24,
    regions: ['Southeast Asia', 'North America', 'Europe'],
    sparklineData: [1, 0, 0, 1, 0, 2, 1, 0, 0, 1, 2, 0, 1, 0, 0, 3, 1, 0, 2, 1, 0, 0, 1, 2, 3, 1, 2, 3, 2, 3],
    sources: [
      { name: 'World Health Organization', tier: 1, url: 'https://www.who.int/influenza/human_animal_interface', date: '2024-01-15' },
      { name: 'U.S. CDC', tier: 1, url: 'https://www.cdc.gov/flu/avianflu/', date: '2024-01-14' },
    ],
    discoveryTimeline: [
      { date: '1996', title: 'First detection in poultry', description: 'H5N1 first detected in domestic geese in Guangdong, China.', source: { name: 'WHO', tier: 1, url: '#', date: '1996-01-01' } },
      { date: '1997', title: 'First human cases', description: '18 human infections in Hong Kong, 6 deaths. All poultry in the territory culled.', source: { name: 'WHO', tier: 1, url: '#', date: '1997-12-01' } },
      { date: '2003–2004', title: 'Re-emergence', description: 'Large-scale outbreaks in poultry across East and Southeast Asia. Human cases resume.', source: { name: 'WHO', tier: 1, url: '#', date: '2004-01-01' } },
      { date: '2024', title: 'Spread to dairy cattle', description: 'H5N1 detected in U.S. dairy herds, with sporadic human cases among farm workers.', source: { name: 'U.S. CDC', tier: 1, url: '#', date: '2024-04-01' } },
    ],
    transmissionMethods: [
      { method: 'Animal-to-Human', icon: 'vector', description: 'Direct contact with infected poultry, their droppings, or contaminated environments. The primary route of human infection.', riskLevel: 'high' },
      { method: 'Limited Airborne', icon: 'airborne', description: 'Limited human-to-human transmission has been documented in rare cases of prolonged close contact.', riskLevel: 'low' },
    ],
    symptoms: [
      { phase: 'Early', timeRange: 'Days 1–3', severity: 'moderate', symptoms: [{ name: 'High fever (>38°C)', frequency: 97 }, { name: 'Cough', frequency: 83 }, { name: 'Sore throat', frequency: 65 }, { name: 'Muscle pain', frequency: 70 }] },
      { phase: 'Progressive', timeRange: 'Days 3–5', severity: 'severe', symptoms: [{ name: 'Severe pneumonia', frequency: 75 }, { name: 'Respiratory distress', frequency: 60 }, { name: 'Diarrhea', frequency: 40 }] },
      { phase: 'Critical', timeRange: 'Days 5+', severity: 'severe', symptoms: [{ name: 'ARDS', frequency: 55 }, { name: 'Multi-organ failure', frequency: 45 }, { name: 'Septic shock', frequency: 30 }] },
    ],
    affectedOrgans: [
      { name: 'Lungs', system: 'Respiratory', severity: 98, description: 'Severe viral pneumonia with rapid progression to ARDS. The lungs are the primary battleground.', symptoms: ['Severe cough', 'Respiratory failure', 'Bilateral infiltrates'], longTermEffects: ['Pulmonary fibrosis'] },
      { name: 'Liver', system: 'Hepatic', severity: 50, description: 'Elevated liver enzymes observed in most severe cases.', symptoms: ['Jaundice', 'Liver dysfunction'], longTermEffects: [] },
    ],
    riskFactors: [
      { factor: 'Poultry farm workers', icon: '🐔', description: 'Direct occupational exposure to infected birds.' },
      { factor: 'Live bird market visitors', icon: '🏪', description: 'Exposure to environments with infected birds.' },
    ],
    preventionMeasures: ['Avoid contact with sick/dead birds', 'PPE for poultry workers', 'Culling of infected flocks', 'Surveillance of bird populations'],
    treatmentDetails: [
      { name: 'Oseltamivir (Tamiflu)', type: 'Antiviral', description: 'Neuraminidase inhibitor. Must be started within 48 hours of symptom onset for maximum benefit.', effectiveness: 'Reduces mortality when given early' },
      { name: 'Intensive care', type: 'Supportive', description: 'Mechanical ventilation, ECMO for severe ARDS cases.', effectiveness: 'Critical for survival' },
    ],
  },
  {
    id: '4',
    slug: 'ebola',
    name: 'Ebola Virus Disease',
    scientificName: 'Ebola Hemorrhagic Fever',
    pathogenType: 'RNA Virus',
    pathogenDetail: 'Ebolavirus · Filoviridae',
    icdCode: 'A98.4',
    severity: 'watch',
    description: 'A severe, often fatal hemorrhagic fever caused by Ebola virus. Case fatality rates have ranged from 25% to 90% in past outbreaks.',
    incubation: '2–21 days',
    fatalityRate: '25–90%',
    timeToDeath: '8 days',
    r0: '1.5–2.5',
    transmission: ['Contact', 'Bodily Fluids'],
    treatments: 'mAb therapies, Supportive',
    vaccines: 'rVSV-ZEBOV',
    cases24h: 8,
    deaths24h: 3,
    totalCases: 34356,
    totalDeaths: 15227,
    growthRate: -12,
    affectedCountries: 4,
    regions: ['West Africa', 'Central Africa'],
    sparklineData: [5, 8, 12, 15, 22, 18, 14, 10, 8, 12, 15, 18, 14, 10, 8, 6, 5, 8, 10, 12, 8, 6, 5, 4, 6, 8, 10, 8, 6, 8],
    sources: [
      { name: 'World Health Organization', tier: 1, url: 'https://www.who.int/health-topics/ebola', date: '2024-01-14' },
    ],
    discoveryTimeline: [
      { date: '1976', title: 'First identified', description: 'Simultaneous outbreaks in Nzara, South Sudan and Yambuku, DRC. Named after the Ebola River.', source: { name: 'WHO', tier: 1, url: '#', date: '1976-09-01' } },
      { date: '2014–2016', title: 'West African epidemic', description: 'Largest Ebola outbreak in history. Over 28,600 cases and 11,325 deaths across Guinea, Liberia, and Sierra Leone.', source: { name: 'WHO', tier: 1, url: '#', date: '2016-06-01' } },
    ],
    transmissionMethods: [
      { method: 'Direct Contact', icon: 'contact', description: 'Contact with blood, secretions, organs, or other bodily fluids of infected people.', riskLevel: 'high' },
      { method: 'Contaminated Objects', icon: 'fomite', description: 'Contact with surfaces and materials contaminated with these fluids.', riskLevel: 'moderate' },
    ],
    symptoms: [
      { phase: 'Early', timeRange: 'Days 1–3', severity: 'moderate', symptoms: [{ name: 'Sudden fever', frequency: 90 }, { name: 'Fatigue', frequency: 80 }, { name: 'Muscle pain', frequency: 75 }, { name: 'Headache', frequency: 70 }] },
      { phase: 'Progressive', timeRange: 'Days 3–7', severity: 'severe', symptoms: [{ name: 'Vomiting', frequency: 68 }, { name: 'Diarrhea', frequency: 66 }, { name: 'Rash', frequency: 50 }, { name: 'Internal bleeding', frequency: 30 }] },
      { phase: 'Critical', timeRange: 'Days 7+', severity: 'severe', symptoms: [{ name: 'Hemorrhaging', frequency: 40 }, { name: 'Multi-organ failure', frequency: 60 }, { name: 'Shock', frequency: 50 }] },
    ],
    affectedOrgans: [
      { name: 'Liver', system: 'Hepatic', severity: 90, description: 'Massive hepatocyte necrosis. The liver is one of the first organs severely damaged by Ebola.', symptoms: ['Jaundice', 'Liver failure'], longTermEffects: ['Chronic liver damage'] },
      { name: 'Blood vessels', system: 'Cardiovascular', severity: 85, description: 'Endothelial damage leads to vascular leakage and hemorrhagic symptoms.', symptoms: ['Internal bleeding', 'DIC'], longTermEffects: [] },
    ],
    riskFactors: [
      { factor: 'Healthcare workers', icon: '🏥', description: 'High exposure risk during patient care.' },
      { factor: 'Burial ceremony attendees', icon: '⚰️', description: 'Traditional burial practices involving contact with the deceased.' },
    ],
    preventionMeasures: ['rVSV-ZEBOV vaccination', 'Strict infection control', 'Safe burial practices', 'Contact tracing'],
    treatmentDetails: [
      { name: 'Inmazeb', type: 'Monoclonal antibody', description: 'FDA-approved combination of three monoclonal antibodies targeting Ebola virus.', effectiveness: 'Reduces mortality significantly' },
      { name: 'Ebanga', type: 'Monoclonal antibody', description: 'Single monoclonal antibody treatment for Ebola.', effectiveness: 'Proven effective in clinical trials' },
    ],
  },
  {
    id: '5',
    slug: 'marburg',
    name: 'Marburg Virus Disease',
    scientificName: 'Marburg Hemorrhagic Fever',
    pathogenType: 'RNA Virus',
    pathogenDetail: 'Marburgvirus · Filoviridae',
    icdCode: 'A98.3',
    severity: 'watch',
    description: 'A highly virulent disease that causes hemorrhagic fever. The case fatality rate can be as high as 88%.',
    incubation: '2–21 days',
    fatalityRate: '24–88%',
    timeToDeath: '8–9 days',
    r0: '1.4–1.8',
    transmission: ['Contact', 'Bodily Fluids'],
    treatments: 'Supportive only',
    vaccines: 'Experimental',
    cases24h: 2,
    deaths24h: 1,
    totalCases: 623,
    totalDeaths: 372,
    growthRate: 45,
    affectedCountries: 3,
    regions: ['East Africa'],
    sparklineData: [0, 0, 1, 0, 0, 1, 2, 1, 0, 0, 1, 2, 3, 2, 1, 0, 1, 2, 1, 0, 0, 1, 2, 3, 2, 1, 2, 2, 1, 2],
    sources: [
      { name: 'World Health Organization', tier: 1, url: 'https://www.who.int/health-topics/marburg-virus-disease', date: '2024-01-14' },
    ],
    discoveryTimeline: [
      { date: '1967', title: 'First identified', description: 'Simultaneous outbreaks in Marburg and Frankfurt, Germany, and Belgrade, Serbia, linked to African green monkeys.', source: { name: 'WHO', tier: 1, url: '#', date: '1967-08-01' } },
    ],
    transmissionMethods: [
      { method: 'Direct Contact', icon: 'contact', description: 'Contact with blood, secretions, or other bodily fluids of infected individuals.', riskLevel: 'high' },
    ],
    symptoms: [
      { phase: 'Early', timeRange: 'Days 1–5', severity: 'moderate', symptoms: [{ name: 'High fever', frequency: 92 }, { name: 'Severe headache', frequency: 85 }, { name: 'Severe malaise', frequency: 80 }] },
      { phase: 'Critical', timeRange: 'Days 5+', severity: 'severe', symptoms: [{ name: 'Severe hemorrhaging', frequency: 70 }, { name: 'Multi-organ failure', frequency: 65 }] },
    ],
    affectedOrgans: [
      { name: 'Liver', system: 'Hepatic', severity: 92, description: 'Severe hepatic necrosis.', symptoms: ['Liver failure', 'Jaundice'], longTermEffects: [] },
    ],
    riskFactors: [
      { factor: 'Cave/mine workers', icon: '⛏️', description: 'Exposure to Rousettus bat colonies in caves.' },
    ],
    preventionMeasures: ['Avoid fruit bat habitats', 'Strict infection control', 'Contact tracing'],
    treatmentDetails: [
      { name: 'Supportive care', type: 'Symptomatic', description: 'Rehydration, blood products, and treatment of specific symptoms.', effectiveness: 'Essential for survival' },
    ],
  },
  {
    id: '6',
    slug: 'cholera',
    name: 'Cholera',
    scientificName: 'Cholera',
    pathogenType: 'Bacteria',
    pathogenDetail: 'Vibrio cholerae · O1/O139',
    icdCode: 'A00',
    severity: 'monitoring',
    description: 'An acute diarrhoeal infection caused by ingestion of food or water contaminated with Vibrio cholerae bacteria.',
    incubation: '12h–5 days',
    fatalityRate: '<1% (treated)',
    timeToDeath: '2–3 days',
    r0: '1.0–2.0',
    transmission: ['Fecal-oral', 'Waterborne'],
    treatments: 'ORS, Antibiotics',
    vaccines: 'OCV',
    cases24h: 3400,
    deaths24h: 42,
    totalCases: 456000,
    totalDeaths: 3200,
    growthRate: 8.5,
    affectedCountries: 31,
    regions: ['Sub-Saharan Africa', 'South Asia', 'Caribbean'],
    sparklineData: [30, 35, 40, 45, 42, 48, 55, 50, 45, 48, 52, 55, 58, 62, 58, 55, 52, 48, 45, 50, 55, 58, 52, 48, 45, 42, 45, 48, 50, 52],
    sources: [
      { name: 'World Health Organization', tier: 1, url: 'https://www.who.int/health-topics/cholera', date: '2024-01-15' },
    ],
    discoveryTimeline: [
      { date: '1817', title: 'First pandemic', description: 'First cholera pandemic began in the Ganges Delta, spreading through South and Southeast Asia.', source: { name: 'Historical records', tier: 3, url: '#', date: '1817-01-01' } },
    ],
    transmissionMethods: [
      { method: 'Contaminated Water', icon: 'water', description: 'Primary route of infection through contaminated drinking water or food washed with contaminated water.', riskLevel: 'high' },
    ],
    symptoms: [
      { phase: 'Onset', timeRange: 'Hours 6–24', severity: 'moderate', symptoms: [{ name: 'Profuse watery diarrhea', frequency: 95 }, { name: 'Vomiting', frequency: 80 }, { name: 'Rapid dehydration', frequency: 90 }] },
      { phase: 'Severe', timeRange: 'Days 1–3', severity: 'severe', symptoms: [{ name: 'Severe dehydration', frequency: 75 }, { name: 'Shock', frequency: 40 }, { name: 'Renal failure', frequency: 20 }] },
    ],
    affectedOrgans: [
      { name: 'Small Intestine', system: 'Digestive', severity: 95, description: 'Cholera toxin causes massive secretion of fluid into the intestinal lumen.', symptoms: ['Rice-water stool', 'Dehydration'], longTermEffects: [] },
    ],
    riskFactors: [
      { factor: 'Lack of clean water', icon: '🚰', description: 'Areas without safe drinking water infrastructure.' },
    ],
    preventionMeasures: ['Clean water access', 'Sanitation', 'Oral cholera vaccines', 'Hygiene education'],
    treatmentDetails: [
      { name: 'Oral Rehydration Salts', type: 'Rehydration', description: 'Standard WHO ORS formula to replace lost fluids and electrolytes.', effectiveness: 'Reduces mortality to <1%' },
    ],
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
  {
    tier: 1,
    name: 'Gold Standard',
    icon: '★',
    scoreRange: '90–100',
    description: 'International organizations and peer-reviewed scientific institutions with global mandates for disease surveillance. Data from these sources has been independently verified through multiple channels and is considered the benchmark for accuracy.',
    examples: ['World Health Organization', 'U.S. CDC', 'ECDC', 'The Lancet', 'NEJM', 'Nature', 'Science'],
    criteria: ['International mandate or recognition', 'Peer-reviewed methodology', 'Historical accuracy > 95%', 'Transparent data collection methods', 'Regular independent audits'],
  },
  {
    tier: 2,
    name: 'Highly Credible',
    icon: '◆',
    scoreRange: '75–89',
    description: 'National health authorities of major nations and established research institutions with strong track records. Data is well-sourced and regularly updated.',
    examples: ['RKI (Germany)', 'Institut Pasteur', 'PHE (UK)', 'ProMED-mail', 'Africa CDC'],
    criteria: ['Government-backed authority', 'Established data infrastructure', 'Regular reporting cadence', 'Peer recognition'],
  },
  {
    tier: 3,
    name: 'Credible',
    icon: '●',
    scoreRange: '60–74',
    description: 'Regional health authorities, major news wire services with health desks, and established NGOs. Data is generally reliable but may have delays or gaps.',
    examples: ['Reuters Health', 'STAT News', 'MSF', 'Regional health ministries'],
    criteria: ['Established editorial standards', 'Named sources and attribution', 'Regular corrections policy', 'Recognized expertise'],
  },
  {
    tier: 4,
    name: 'Preliminary',
    icon: '○',
    scoreRange: '40–59',
    description: 'Preprint servers, state/provincial health departments, and preliminary research. Data should be treated as provisional and may be revised.',
    examples: ['medRxiv', 'bioRxiv', 'State health departments', 'University research teams'],
    criteria: ['Identified methodology', 'Named authors/institutions', 'Subject to peer review', 'Provisional data clearly labeled'],
  },
  {
    tier: 5,
    name: 'Unverified',
    icon: '?',
    scoreRange: '0–39',
    description: 'Social media signals, user submissions, and unverified reports. This data is included for completeness but should not be relied upon without independent verification.',
    examples: ['Social media health signals', 'User submissions', 'Unattributed reports'],
    criteria: ['Source identified but not verified', 'Data not independently confirmed', 'Subject to verification queue', 'Clearly labeled as unverified'],
  },
];

export const historicalPandemics = [
  { year: '430 BC', name: 'Plague of Athens', deaths: '75,000–100,000', description: 'Typhoid fever devastated the Athenian army during the Peloponnesian War.' },
  { year: '541', name: 'Plague of Justinian', deaths: '25–50 million', description: 'The first major bubonic plague pandemic, originating in Egypt and spreading through the Byzantine Empire.' },
  { year: '1346', name: 'Black Death', deaths: '75–200 million', description: 'The most devastating pandemic in human history, killing 30-60% of Europe\'s population.' },
  { year: '1520', name: 'Smallpox in the Americas', deaths: '56 million', description: 'European colonizers introduced smallpox to the Americas, devastating indigenous populations.' },
  { year: '1817', name: 'First Cholera Pandemic', deaths: '100,000+', description: 'Originating in the Ganges Delta, cholera spread through Asia, killing thousands.' },
  { year: '1918', name: 'Spanish Flu', deaths: '50–100 million', description: 'H1N1 influenza infected a third of the world\'s population in three devastating waves.' },
  { year: '1957', name: 'Asian Flu', deaths: '1–2 million', description: 'H2N2 influenza originated in East Asia and spread globally.' },
  { year: '1981', name: 'HIV/AIDS', deaths: '36+ million', description: 'The HIV pandemic remains one of the most significant public health challenges, though treatment has dramatically improved outcomes.' },
  { year: '2002', name: 'SARS', deaths: '774', description: 'Severe Acute Respiratory Syndrome emerged in southern China and spread to 29 countries.' },
  { year: '2009', name: 'H1N1 Pandemic', deaths: '151,700–575,400', description: 'Swine flu pandemic caused by a novel H1N1 strain.' },
  { year: '2014', name: 'Ebola Epidemic', deaths: '11,325', description: 'The West African Ebola epidemic was the largest in history.' },
  { year: '2019', name: 'COVID-19', deaths: '7+ million', description: 'SARS-CoV-2 caused a global pandemic affecting every country on Earth.' },
];
