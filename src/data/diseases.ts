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
  images?: DiseaseImage[];
  videos?: DiseaseVideo[];
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

export interface DiseaseImage {
  url: string;
  caption: string;
  source: string;
  type: 'microscopy' | 'clinical' | 'diagram' | 'pathology';
}

export interface DiseaseVideo {
  url: string;
  title: string;
  source: string;
  duration: string;
}

export const diseases: Disease[] = [
  {
    id: '1',
    slug: 'covid-19',
    name: 'COVID-19',
    scientificName: 'Coronavirus Disease 2019',
    pathogenType: 'RNA Virus',
    pathogenDetail: 'SARS-CoV-2 - Betacoronavirus',
    icdCode: 'U07.1',
    severity: 'elevated',
    description: 'An acute respiratory illness caused by the SARS-CoV-2 virus, first identified in Wuhan, China in December 2019. The virus has caused a global pandemic affecting every country on Earth.',
    incubation: '2-14 days',
    fatalityRate: '0.5-1.0%',
    timeToDeath: '18 days',
    r0: '5.0-8.2',
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
      { name: 'Our World in Data', tier: 1, url: 'https://ourworldindata.org/coronavirus', date: '2024-01-15' },
    ],
    discoveryTimeline: [
      { date: 'Dec 2019', title: 'First cases identified', description: 'Cluster of pneumonia cases of unknown origin reported in Wuhan, Hubei Province, China Jean.', source: { name: 'WHO', tier: 1, url: 'https://www.who.int/emergencies/diseases/novel-coronavirus-2019/events-as-they-happen', date: '2019-12-31' } },
      { date: 'Jan 7, 2020', title: 'Virus isolated', description: 'Chinese authorities identify a novel coronavirus (2019-nCoV) as the causative agent.', source: { name: 'WHO', tier: 1, url: 'https://www.who.int/news/item/27-04-2020-who-timeline---covid-19', date: '2020-01-07' } },
      { date: 'Jan 11, 2020', title: 'First death reported', description: 'A 61-year-old man becomes the first known fatality in Wuhan.', source: { name: 'Wuhan Health Commission', tier: 2, url: 'https://www.who.int/news/item/27-04-2020-who-timeline---covid-19', date: '2020-01-11' } },
      { date: 'Jan 13, 2020', title: 'First case outside China', description: 'Thailand reports the first confirmed case outside of China.', source: { name: 'WHO', tier: 1, url: 'https://www.who.int/news/item/27-04-2020-who-timeline---covid-19', date: '2020-01-13' } },
      { date: 'Feb 11, 2020', title: 'Official naming', description: 'WHO names the disease COVID-19. The virus is designated SARS-CoV-2 by the ICTV.', source: { name: 'WHO', tier: 1, url: 'https://www.who.int/emergencies/diseases/novel-coronavirus-2019/technical-guidance/naming-the-coronavirus-disease-(covid-2019)-and-the-virus-that-causes-it', date: '2020-02-11' } },
      { date: 'Mar 11, 2020', title: 'Pandemic declared', description: 'WHO characterizes COVID-19 as a pandemic. 118,000 cases in 114 countries at the time of declaration.', source: { name: 'WHO', tier: 1, url: 'https://www.who.int/director-general/speeches/detail/who-director-general-s-opening-remarks-at-the-media-briefing-on-covid-19---11-march-2020', date: '2020-03-11' } },
      { date: 'Dec 11, 2020', title: 'First vaccine authorized', description: 'Pfizer-BioNTech COVID-19 vaccine receives Emergency Use Authorization from the U.S. FDA.', source: { name: 'U.S. FDA', tier: 1, url: 'https://www.fda.gov/emergency-preparedness-and-response/coronavirus-disease-2019-covid-19/covid-19-vaccines', date: '2020-12-11' } },
      { date: 'May 5, 2023', title: 'PHEIC ended', description: 'WHO declares end of COVID-19 as a Public Health Emergency of International Concern.', source: { name: 'WHO', tier: 1, url: 'https://www.who.int/news/item/05-05-2023-statement-on-the-fifteenth-meeting-of-the-international-health-regulations-(2005)-emergency-committee-regarding-the-coronavirus-disease-(covid-19)-pandemic', date: '2023-05-05' } },
    ],
    transmissionMethods: [
      { method: 'Airborne Transmission', icon: 'airborne', description: 'The virus can travel through the air in small aerosol particles and be inhaled by people nearby, especially in enclosed spaces with poor ventilation.', riskLevel: 'high' },
      { method: 'Respiratory Droplets', icon: 'droplet', description: 'Large droplets produced when an infected person coughs, sneezes, or talks can land on nearby individuals within 6 feet.', riskLevel: 'high' },
      { method: 'Surface Contact', icon: 'contact', description: 'The virus can survive on surfaces for hours to days. Contact followed by touching the face may lead to infection, though this is a minor route.', riskLevel: 'low' },
    ],
    symptoms: [
      { phase: 'Early', timeRange: 'Days 1-3', severity: 'mild', symptoms: [{ name: 'Fever', frequency: 88 }, { name: 'Dry cough', frequency: 68 }, { name: 'Fatigue', frequency: 62 }, { name: 'Loss of taste/smell', frequency: 44 }, { name: 'Headache', frequency: 38 }] },
      { phase: 'Progressive', timeRange: 'Days 3-7', severity: 'moderate', symptoms: [{ name: 'Shortness of breath', frequency: 31 }, { name: 'Body aches', frequency: 35 }, { name: 'Sore throat', frequency: 28 }, { name: 'Diarrhea', frequency: 12 }, { name: 'Conjunctivitis', frequency: 8 }] },
      { phase: 'Severe', timeRange: 'Days 7+', severity: 'severe', symptoms: [{ name: 'Pneumonia', frequency: 15 }, { name: 'ARDS', frequency: 8 }, { name: 'Organ failure', frequency: 3 }, { name: 'Cytokine storm', frequency: 5 }, { name: 'Sepsis', frequency: 4 }] },
    ],
    affectedOrgans: [
      { name: 'Lungs', system: 'Respiratory', severity: 95, description: 'Primary target. SARS-CoV-2 binds to ACE2 receptors on alveolar cells, causing inflammation and fluid buildup leading to pneumonia and ARDS.', symptoms: ['Cough', 'Shortness of breath', 'Pneumonia', 'ARDS'], longTermEffects: ['Pulmonary fibrosis', 'Reduced lung capacity', 'Chronic cough'] },
      { name: 'Heart', system: 'Cardiovascular', severity: 60, description: 'Myocardial injury observed in severe cases. Inflammation can affect heart muscle and blood vessels, leading to clotting disorders.', symptoms: ['Chest pain', 'Palpitations', 'Arrhythmia', 'Heart failure'], longTermEffects: ['Myocarditis', 'Heart failure', 'Increased cardiovascular risk'] },
      { name: 'Brain', system: 'Nervous', severity: 45, description: 'Neurological manifestations include loss of smell/taste, headaches, and in severe cases, encephalitis and stroke.', symptoms: ['Loss of smell', 'Brain fog', 'Headache', 'Confusion'], longTermEffects: ['Cognitive impairment', 'Chronic fatigue', 'Long COVID neurological symptoms'] },
      { name: 'Kidneys', system: 'Renal', severity: 35, description: 'ACE2 receptors in kidneys can be targeted. Acute kidney injury reported in severe cases.', symptoms: ['Reduced urine output', 'Fluid retention', 'Elevated creatinine'], longTermEffects: ['Chronic kidney disease'] },
      { name: 'Liver', system: 'Hepatic', severity: 25, description: 'Elevated liver enzymes observed in hospitalized patients. Direct viral infection and immune-mediated damage.', symptoms: ['Elevated enzymes', 'Jaundice'], longTermEffects: ['Persistent liver dysfunction'] },
    ],
    riskFactors: [
      { factor: 'Age over 65', icon: 'user', description: 'Risk of severe illness increases significantly with age, with those over 85 at highest risk.' },
      { factor: 'Cardiovascular disease', icon: 'heart', description: 'Pre-existing heart conditions including hypertension, coronary artery disease, and heart failure increase vulnerability.' },
      { factor: 'Diabetes', icon: 'activity', description: 'Both type 1 and type 2 diabetes are significant risk factors for severe COVID-19 outcomes.' },
      { factor: 'Immunocompromised', icon: 'shield', description: 'Weakened immune systems from disease or medications lead to prolonged infection and increased severity.' },
      { factor: 'Obesity', icon: 'scale', description: 'BMI of 30 or higher associated with increased risk of hospitalization, ICU admission, and death.' },
      { factor: 'Chronic lung disease', icon: 'wind', description: 'COPD, asthma, and interstitial lung disease increase risk of respiratory complications.' },
    ],
    preventionMeasures: ['Vaccination (primary series and boosters)', 'Mask wearing in crowded indoor settings', 'Hand hygiene with soap or sanitizer', 'Improved indoor ventilation', 'Physical distancing during surges', 'Isolation when symptomatic or positive'],
    treatmentDetails: [
      { name: 'Paxlovid', type: 'Antiviral', description: 'Nirmatrelvir/ritonavir combination. Most effective when started within 5 days of symptom onset. Inhibits viral protease.', effectiveness: 'Reduces hospitalization by 89% in high-risk patients' },
      { name: 'Remdesivir', type: 'Antiviral', description: 'IV antiviral for hospitalized patients. Inhibits viral RNA-dependent RNA polymerase.', effectiveness: 'Reduces recovery time by 5 days in hospitalized patients' },
      { name: 'Dexamethasone', type: 'Corticosteroid', description: 'Reduces inflammation and mortality in patients requiring supplemental oxygen or mechanical ventilation.', effectiveness: 'Reduces mortality by 35% in ventilated patients' },
      { name: 'Monoclonal Antibodies', type: 'Immunotherapy', description: 'Various mAb treatments targeting spike protein. Efficacy varies by variant.', effectiveness: 'Variable based on circulating variants' },
    ],
    variants: [
      { name: 'Alpha', designation: 'B.1.1.7', dateIdentified: 'Sep 2020', transmissibility: '~50% more transmissible than original', severity: 'Slightly more severe', vaccineEvasion: 'Minimal' },
      { name: 'Beta', designation: 'B.1.351', dateIdentified: 'Oct 2020', transmissibility: '~50% more transmissible', severity: 'Similar to original', vaccineEvasion: 'Moderate' },
      { name: 'Delta', designation: 'B.1.617.2', dateIdentified: 'Oct 2020', transmissibility: '~60% more than Alpha', severity: 'More severe than previous variants', vaccineEvasion: 'Moderate' },
      { name: 'Omicron', designation: 'B.1.1.529', dateIdentified: 'Nov 2021', transmissibility: '~3.5x more than Delta', severity: 'Less severe', vaccineEvasion: 'Significant' },
      { name: 'JN.1', designation: 'BA.2.86.1.1', dateIdentified: 'Aug 2023', transmissibility: 'Highly transmissible', severity: 'Similar to other Omicron', vaccineEvasion: 'Moderate' },
    ],
    images: [
      { url: 'https://www.cdc.gov/media/images/2020/coronavirus-background-cdc-2400.jpg', caption: 'SARS-CoV-2 virus particles', source: 'CDC', type: 'microscopy' },
    ],
    videos: [
      { url: 'https://www.youtube.com/watch?v=5DGwOJXSxqg', title: 'How COVID-19 attacks the body', source: 'Nucleus Medical Media', duration: '4:32' },
    ],
  },
  {
    id: '2',
    slug: 'mpox',
    name: 'Mpox',
    scientificName: 'Monkeypox',
    pathogenType: 'DNA Virus',
    pathogenDetail: 'Orthopoxvirus - Poxviridae',
    icdCode: 'B04',
    severity: 'critical',
    description: 'A zoonotic viral disease caused by the monkeypox virus, producing a smallpox-like illness with characteristic skin lesions. Two clades exist: Clade I (more severe) and Clade II (less severe).',
    incubation: '5-21 days',
    fatalityRate: '3-6%',
    timeToDeath: '14 days',
    r0: '1.2-2.4',
    transmission: ['Contact', 'Droplet', 'Fomites'],
    treatments: 'Tecovirimat, Supportive',
    vaccines: 'JYNNEOS',
    cases24h: 1245,
    deaths24h: 18,
    totalCases: 98456,
    totalDeaths: 2134,
    growthRate: 34.2,
    affectedCountries: 116,
    regions: ['Central Africa', 'West Africa', 'Europe', 'Americas'],
    sparklineData: [20, 25, 30, 35, 42, 48, 55, 62, 58, 65, 72, 78, 85, 92, 88, 95, 102, 110, 118, 125, 132, 140, 148, 155, 162, 170, 175, 180, 185, 190],
    sources: [
      { name: 'World Health Organization', tier: 1, url: 'https://www.who.int/health-topics/monkeypox', date: '2024-01-15' },
      { name: 'Africa CDC', tier: 2, url: 'https://africacdc.org/disease/monkeypox/', date: '2024-01-14' },
      { name: 'U.S. CDC', tier: 1, url: 'https://www.cdc.gov/poxvirus/mpox/', date: '2024-01-15' },
      { name: 'ECDC', tier: 1, url: 'https://www.ecdc.europa.eu/en/monkeypox', date: '2024-01-14' },
    ],
    discoveryTimeline: [
      { date: '1958', title: 'Virus first identified', description: 'Monkeypox virus first discovered in colonies of monkeys kept for research in Copenhagen, Denmark.', source: { name: 'The Lancet', tier: 1, url: 'https://www.thelancet.com/journals/laninf/article/PIIS1473-3099(22)00228-6/fulltext', date: '1958-01-01' } },
      { date: '1970', title: 'First human case', description: 'First human case recorded in a 9-month-old boy in the Democratic Republic of Congo (then Zaire).', source: { name: 'WHO', tier: 1, url: 'https://www.who.int/news-room/fact-sheets/detail/monkeypox', date: '1970-09-01' } },
      { date: '2003', title: 'First outbreak outside Africa', description: 'Outbreak in the United States linked to imported rodents from Ghana, resulting in 47 confirmed cases.', source: { name: 'CDC', tier: 1, url: 'https://www.cdc.gov/poxvirus/mpox/outbreak/us-outbreaks.html', date: '2003-06-01' } },
      { date: 'May 2022', title: 'Global outbreak begins', description: 'Cases detected outside endemic African countries, triggering global surveillance. Clade IIb spread internationally.', source: { name: 'WHO', tier: 1, url: 'https://www.who.int/emergencies/situations/monkeypox-oubreak-2022', date: '2022-05-13' } },
      { date: 'Jul 23, 2022', title: 'PHEIC declared', description: 'WHO declares monkeypox a Public Health Emergency of International Concern.', source: { name: 'WHO', tier: 1, url: 'https://www.who.int/director-general/speeches/detail/who-director-general-s-statement-on-the-press-conference-following-IHR-emergency-committee-regarding-the-multi--country-outbreak-of-monkeypox--23-july-2022', date: '2022-07-23' } },
      { date: 'Aug 2024', title: 'Clade I outbreak', description: 'New Clade Ib variant identified in DRC with sustained human-to-human transmission. WHO declares new PHEIC.', source: { name: 'Africa CDC', tier: 2, url: 'https://africacdc.org/news-item/africa-cdc-declares-mpox-a-public-health-emergency-of-continental-security/', date: '2024-08-14' } },
    ],
    transmissionMethods: [
      { method: 'Direct Contact', icon: 'contact', description: 'Close physical contact with infectious skin lesions, bodily fluids, or respiratory secretions. Includes sexual and intimate contact.', riskLevel: 'high' },
      { method: 'Respiratory Droplets', icon: 'droplet', description: 'Prolonged face-to-face contact (typically > 3 hours) can allow transmission via large respiratory droplets.', riskLevel: 'moderate' },
      { method: 'Contaminated Objects', icon: 'fomite', description: 'Contact with contaminated clothing, bedding, towels, or other fomites that have touched lesion fluid.', riskLevel: 'moderate' },
      { method: 'Mother-to-Child', icon: 'maternal', description: 'Vertical transmission during pregnancy or close contact after birth.', riskLevel: 'high' },
    ],
    symptoms: [
      { phase: 'Prodromal', timeRange: 'Days 1-3', severity: 'mild', symptoms: [{ name: 'Fever', frequency: 85 }, { name: 'Headache', frequency: 72 }, { name: 'Lymphadenopathy', frequency: 90 }, { name: 'Muscle aches', frequency: 55 }, { name: 'Fatigue', frequency: 70 }] },
      { phase: 'Eruptive', timeRange: 'Days 3-10', severity: 'moderate', symptoms: [{ name: 'Skin rash/lesions', frequency: 98 }, { name: 'Vesicles', frequency: 88 }, { name: 'Pustules', frequency: 82 }, { name: 'Pain at lesion sites', frequency: 75 }, { name: 'Pruritus', frequency: 45 }] },
      { phase: 'Resolution', timeRange: 'Days 14-28', severity: 'mild', symptoms: [{ name: 'Crusting of lesions', frequency: 95 }, { name: 'Scarring', frequency: 40 }, { name: 'Fatigue', frequency: 35 }, { name: 'Skin discoloration', frequency: 25 }] },
    ],
    affectedOrgans: [
      { name: 'Skin', system: 'Integumentary', severity: 98, description: 'Characteristic deep-seated, well-circumscribed lesions progressing through macules, papules, vesicles, pustules, and crusts.', symptoms: ['Rash', 'Lesions', 'Scarring', 'Pain'], longTermEffects: ['Permanent scarring', 'Skin discoloration', 'Pitting'] },
      { name: 'Lymph Nodes', system: 'Lymphatic', severity: 85, description: 'Lymphadenopathy is a distinguishing feature of mpox (unlike smallpox), particularly cervical, inguinal, and axillary lymph nodes.', symptoms: ['Swollen lymph nodes', 'Pain', 'Tenderness'], longTermEffects: [] },
      { name: 'Eyes', system: 'Ocular', severity: 30, description: 'Ocular involvement can occur, potentially leading to vision impairment.', symptoms: ['Conjunctivitis', 'Keratitis', 'Vision changes'], longTermEffects: ['Corneal scarring', 'Vision loss'] },
    ],
    riskFactors: [
      { factor: 'Close physical contact', icon: 'users', description: 'Intimate or prolonged skin-to-skin contact with infected individuals.' },
      { factor: 'Immunocompromised', icon: 'shield', description: 'HIV/AIDS patients (especially with low CD4 counts) at higher risk of severe disease and death.' },
      { factor: 'Children under 8', icon: 'user', description: 'Higher risk of severe complications in young children, particularly unvaccinated.' },
      { factor: 'Pregnant individuals', icon: 'heart', description: 'Risk of vertical transmission and adverse pregnancy outcomes.' },
    ],
    preventionMeasures: ['JYNNEOS vaccination for high-risk groups', 'Avoiding contact with infected individuals and their materials', 'Hand hygiene after potential exposure', 'Isolation of confirmed cases', 'Safe sexual practices', 'Contact tracing'],
    treatmentDetails: [
      { name: 'Tecovirimat (TPOXX)', type: 'Antiviral', description: 'FDA-approved antiviral that inhibits orthopoxvirus VP37 protein, preventing viral egress from cells.', effectiveness: 'Clinical trials ongoing; compassionate use shows benefit' },
      { name: 'Brincidofovir', type: 'Antiviral', description: 'Lipid conjugate of cidofovir with improved oral bioavailability.', effectiveness: 'Limited data; available for severe cases' },
      { name: 'Vaccinia Immune Globulin', type: 'Immunotherapy', description: 'Antibody preparation for severe cases or immunocompromised patients.', effectiveness: 'Used for severe complications' },
      { name: 'Supportive care', type: 'Symptomatic', description: 'Pain management, wound care, hydration, and treatment of secondary bacterial infections.', effectiveness: 'Essential for all cases' },
    ],
  },
  {
    id: '3',
    slug: 'avian-influenza-h5n1',
    name: 'Avian Influenza (H5N1)',
    scientificName: 'Highly Pathogenic Avian Influenza A(H5N1)',
    pathogenType: 'RNA Virus',
    pathogenDetail: 'Influenza A - H5N1 - Orthomyxoviridae',
    icdCode: 'J09.X1',
    severity: 'critical',
    description: 'A highly pathogenic strain of avian influenza with pandemic potential. While primarily affecting birds, sporadic human infections carry extremely high mortality. Recent spread to mammals including dairy cattle raises concern.',
    incubation: '2-7 days',
    fatalityRate: '50-60%',
    timeToDeath: '9 days',
    r0: '0.1-0.4',
    transmission: ['Animal-to-human', 'Airborne (limited)'],
    treatments: 'Oseltamivir, Supportive',
    vaccines: 'Experimental',
    cases24h: 3,
    deaths24h: 1,
    totalCases: 912,
    totalDeaths: 461,
    growthRate: 156,
    affectedCountries: 24,
    regions: ['Southeast Asia', 'North America', 'Europe', 'Middle East'],
    sparklineData: [1, 0, 0, 1, 0, 2, 1, 0, 0, 1, 2, 0, 1, 0, 0, 3, 1, 0, 2, 1, 0, 0, 1, 2, 3, 1, 2, 3, 2, 3],
    sources: [
      { name: 'World Health Organization', tier: 1, url: 'https://www.who.int/influenza/human_animal_interface/avian_influenza/en/', date: '2024-01-15' },
      { name: 'U.S. CDC', tier: 1, url: 'https://www.cdc.gov/flu/avianflu/', date: '2024-01-14' },
      { name: 'FAO', tier: 1, url: 'https://www.fao.org/animal-health/diseases/avian-influenza/', date: '2024-01-15' },
      { name: 'OIE/WOAH', tier: 1, url: 'https://www.woah.org/en/disease/avian-influenza/', date: '2024-01-14' },
    ],
    discoveryTimeline: [
      { date: '1996', title: 'First detection in poultry', description: 'H5N1 HPAI first detected in domestic geese in Guangdong Province, China.', source: { name: 'WHO', tier: 1, url: 'https://www.who.int/publications/m/item/influenza-at-the-human-animal-interface', date: '1996-01-01' } },
      { date: '1997', title: 'First human cases', description: '18 human infections in Hong Kong, 6 deaths (33% CFR). All poultry in the territory (1.5 million birds) culled.', source: { name: 'WHO', tier: 1, url: 'https://www.who.int/publications/m/item/influenza-at-the-human-animal-interface', date: '1997-12-01' } },
      { date: '2003-2004', title: 'Re-emergence', description: 'Large-scale outbreaks in poultry across East and Southeast Asia. Human cases resume with high fatality rate.', source: { name: 'WHO', tier: 1, url: 'https://www.who.int/publications/m/item/influenza-at-the-human-animal-interface', date: '2004-01-01' } },
      { date: '2005', title: 'Global spread in birds', description: 'H5N1 spreads to wild birds in Europe, Middle East, and Africa via migratory bird routes.', source: { name: 'FAO', tier: 1, url: 'https://www.fao.org/avianflu/', date: '2005-10-01' } },
      { date: '2021-2022', title: 'Clade 2.3.4.4b emergence', description: 'New highly transmissible clade spreads globally, affecting wild birds, poultry, and marine mammals.', source: { name: 'WHO', tier: 1, url: 'https://www.who.int/publications/m/item/influenza-at-the-human-animal-interface', date: '2022-01-01' } },
      { date: '2024', title: 'Spread to dairy cattle', description: 'H5N1 detected in U.S. dairy herds in multiple states, with sporadic human cases among farm workers.', source: { name: 'U.S. CDC', tier: 1, url: 'https://www.cdc.gov/flu/avianflu/avian-flu-summary.htm', date: '2024-04-01' } },
    ],
    transmissionMethods: [
      { method: 'Animal-to-Human', icon: 'vector', description: 'Direct contact with infected poultry (live or dead), their droppings, or contaminated environments. Exposure to infected mammals (cats, dairy cattle) is an emerging concern.', riskLevel: 'high' },
      { method: 'Limited Airborne', icon: 'airborne', description: 'Limited human-to-human transmission has been documented in rare cases of prolonged close contact (family clusters).', riskLevel: 'low' },
      { method: 'Environmental', icon: 'globe', description: 'Exposure to contaminated water, surfaces, or airborne particles in infected environments.', riskLevel: 'moderate' },
    ],
    symptoms: [
      { phase: 'Early', timeRange: 'Days 1-3', severity: 'moderate', symptoms: [{ name: 'High fever (>38C)', frequency: 97 }, { name: 'Cough', frequency: 83 }, { name: 'Sore throat', frequency: 65 }, { name: 'Muscle pain', frequency: 70 }, { name: 'Malaise', frequency: 85 }] },
      { phase: 'Progressive', timeRange: 'Days 3-5', severity: 'severe', symptoms: [{ name: 'Severe pneumonia', frequency: 75 }, { name: 'Respiratory distress', frequency: 60 }, { name: 'Diarrhea', frequency: 40 }, { name: 'Hemoptysis', frequency: 20 }] },
      { phase: 'Critical', timeRange: 'Days 5+', severity: 'severe', symptoms: [{ name: 'ARDS', frequency: 55 }, { name: 'Multi-organ failure', frequency: 45 }, { name: 'Septic shock', frequency: 30 }, { name: 'Encephalitis', frequency: 15 }] },
    ],
    affectedOrgans: [
      { name: 'Lungs', system: 'Respiratory', severity: 98, description: 'Severe viral pneumonia with rapid progression to ARDS. Primary replication site with massive inflammatory response.', symptoms: ['Severe cough', 'Respiratory failure', 'Bilateral infiltrates', 'Hemoptysis'], longTermEffects: ['Pulmonary fibrosis'] },
      { name: 'Liver', system: 'Hepatic', severity: 50, description: 'Elevated liver enzymes (ALT, AST) observed in most severe cases. Hepatic dysfunction can contribute to coagulopathy.', symptoms: ['Jaundice', 'Liver dysfunction', 'Coagulopathy'], longTermEffects: [] },
      { name: 'Brain', system: 'Nervous', severity: 35, description: 'Neurological manifestations including encephalitis reported in some cases. Virus can cross blood-brain barrier.', symptoms: ['Altered consciousness', 'Seizures', 'Encephalitis'], longTermEffects: ['Neurological sequelae'] },
    ],
    riskFactors: [
      { factor: 'Poultry farm workers', icon: 'bird', description: 'Direct occupational exposure to infected birds, their secretions, or contaminated environments.' },
      { factor: 'Dairy farm workers', icon: 'cow', description: 'Exposure to infected dairy cattle or unpasteurized milk.' },
      { factor: 'Live bird market visitors', icon: 'store', description: 'Exposure to environments with live or recently slaughtered infected birds.' },
      { factor: 'Veterinarians', icon: 'stethoscope', description: 'Professional exposure during examination or treatment of potentially infected animals.' },
    ],
    preventionMeasures: ['Avoid contact with sick/dead birds', 'PPE for poultry and dairy workers', 'Culling of infected flocks', 'Surveillance of bird and mammal populations', 'Pasteurization of milk products', 'Prepandemic vaccine stockpiles', 'Hand hygiene after animal contact'],
    treatmentDetails: [
      { name: 'Oseltamivir (Tamiflu)', type: 'Antiviral', description: 'Neuraminidase inhibitor. Must be started within 48 hours of symptom onset for maximum benefit. Higher doses may be needed.', effectiveness: 'Reduces mortality when given early' },
      { name: 'Peramivir', type: 'Antiviral', description: 'IV neuraminidase inhibitor for patients unable to take oral medications.', effectiveness: 'Similar to oseltamivir' },
      { name: 'Baloxavir', type: 'Antiviral', description: 'Cap-dependent endonuclease inhibitor. Single-dose oral treatment.', effectiveness: 'Under evaluation for H5N1' },
      { name: 'Intensive care', type: 'Supportive', description: 'Mechanical ventilation, ECMO for severe ARDS cases, vasopressors for shock.', effectiveness: 'Critical for survival in severe cases' },
    ],
  },
  {
    id: '4',
    slug: 'ebola',
    name: 'Ebola Virus Disease',
    scientificName: 'Ebola Hemorrhagic Fever',
    pathogenType: 'RNA Virus',
    pathogenDetail: 'Ebolavirus - Filoviridae',
    icdCode: 'A98.4',
    severity: 'watch',
    description: 'A severe, often fatal hemorrhagic fever caused by Ebola virus. Six species are known, with Zaire ebolavirus being the most lethal. Case fatality rates have ranged from 25% to 90% in past outbreaks.',
    incubation: '2-21 days',
    fatalityRate: '25-90%',
    timeToDeath: '8 days',
    r0: '1.5-2.5',
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
      { name: 'U.S. CDC', tier: 1, url: 'https://www.cdc.gov/vhf/ebola/', date: '2024-01-14' },
      { name: 'MSF', tier: 2, url: 'https://www.msf.org/ebola', date: '2024-01-13' },
    ],
    discoveryTimeline: [
      { date: '1976', title: 'First identified', description: 'Simultaneous outbreaks in Nzara, South Sudan and Yambuku, DRC (then Zaire). Named after the Ebola River near Yambuku.', source: { name: 'WHO', tier: 1, url: 'https://www.who.int/news-room/fact-sheets/detail/ebola-virus-disease', date: '1976-09-01' } },
      { date: '1989', title: 'Reston ebolavirus discovered', description: 'New species identified in primates imported to Reston, Virginia. First Ebola species found outside Africa.', source: { name: 'CDC', tier: 1, url: 'https://www.cdc.gov/vhf/ebola/history/chronology.html', date: '1989-11-01' } },
      { date: '2014-2016', title: 'West African epidemic', description: 'Largest Ebola outbreak in history. Over 28,600 cases and 11,325 deaths across Guinea, Liberia, and Sierra Leone.', source: { name: 'WHO', tier: 1, url: 'https://www.who.int/emergencies/situations/ebola-outbreak-2014-2016', date: '2016-06-01' } },
      { date: '2019', title: 'Vaccine approved', description: 'rVSV-ZEBOV (Ervebo) becomes first FDA-approved Ebola vaccine after successful trials in DRC outbreak.', source: { name: 'FDA', tier: 1, url: 'https://www.fda.gov/vaccines-blood-biologics/ervebo', date: '2019-12-19' } },
      { date: '2020', title: 'Therapeutics approved', description: 'Inmazeb and Ebanga approved by FDA as first treatments for Ebola virus disease.', source: { name: 'FDA', tier: 1, url: 'https://www.fda.gov/drugs/drug-safety-and-availability/fda-approves-treatment-ebola-virus', date: '2020-10-14' } },
    ],
    transmissionMethods: [
      { method: 'Direct Contact', icon: 'contact', description: 'Contact with blood, secretions, organs, or other bodily fluids of infected people (living or deceased).', riskLevel: 'high' },
      { method: 'Contaminated Objects', icon: 'fomite', description: 'Contact with surfaces and materials (bedding, clothing, needles) contaminated with these fluids.', riskLevel: 'moderate' },
      { method: 'Burial Practices', icon: 'ritual', description: 'Traditional burial practices involving direct contact with deceased bodies are a major transmission route.', riskLevel: 'high' },
      { method: 'Healthcare Settings', icon: 'hospital', description: 'Nosocomial transmission occurs without proper infection control measures.', riskLevel: 'high' },
    ],
    symptoms: [
      { phase: 'Early', timeRange: 'Days 1-3', severity: 'moderate', symptoms: [{ name: 'Sudden fever', frequency: 90 }, { name: 'Fatigue', frequency: 80 }, { name: 'Muscle pain', frequency: 75 }, { name: 'Headache', frequency: 70 }, { name: 'Sore throat', frequency: 50 }] },
      { phase: 'Progressive', timeRange: 'Days 3-7', severity: 'severe', symptoms: [{ name: 'Vomiting', frequency: 68 }, { name: 'Diarrhea', frequency: 66 }, { name: 'Maculopapular rash', frequency: 50 }, { name: 'Internal bleeding', frequency: 30 }, { name: 'Abdominal pain', frequency: 65 }] },
      { phase: 'Critical', timeRange: 'Days 7+', severity: 'severe', symptoms: [{ name: 'Hemorrhaging', frequency: 40 }, { name: 'Multi-organ failure', frequency: 60 }, { name: 'Shock', frequency: 50 }, { name: 'DIC', frequency: 35 }] },
    ],
    affectedOrgans: [
      { name: 'Liver', system: 'Hepatic', severity: 90, description: 'Massive hepatocyte necrosis. The liver is one of the first organs severely damaged by Ebola virus replication.', symptoms: ['Jaundice', 'Liver failure', 'Coagulopathy'], longTermEffects: ['Chronic liver damage'] },
      { name: 'Blood Vessels', system: 'Cardiovascular', severity: 85, description: 'Endothelial damage leads to vascular leakage, hemorrhagic symptoms, and disseminated intravascular coagulation.', symptoms: ['Internal bleeding', 'DIC', 'Petechiae', 'Ecchymoses'], longTermEffects: [] },
      { name: 'Immune System', system: 'Lymphatic', severity: 80, description: 'Ebola virus targets and destroys immune cells, particularly macrophages and dendritic cells, leading to immunosuppression.', symptoms: ['Lymphopenia', 'Cytokine storm'], longTermEffects: ['Prolonged immune dysfunction'] },
      { name: 'Kidneys', system: 'Renal', severity: 70, description: 'Acute kidney injury common in severe cases due to hypovolemia and direct viral effects.', symptoms: ['Oliguria', 'Renal failure'], longTermEffects: ['Chronic kidney disease'] },
    ],
    riskFactors: [
      { factor: 'Healthcare workers', icon: 'stethoscope', description: 'High exposure risk during patient care without proper PPE.' },
      { factor: 'Burial ceremony attendees', icon: 'users', description: 'Traditional burial practices involving washing and touching the deceased body.' },
      { factor: 'Family caregivers', icon: 'home', description: 'Close contact with symptomatic family members during home care.' },
      { factor: 'Hunters/bushmeat handlers', icon: 'target', description: 'Contact with potentially infected wildlife, including fruit bats and primates.' },
    ],
    preventionMeasures: ['rVSV-ZEBOV vaccination (ring vaccination strategy)', 'Strict infection control in healthcare settings', 'Safe and dignified burial practices', 'Contact tracing and monitoring', 'Community engagement and education', 'PPE for healthcare workers'],
    treatmentDetails: [
      { name: 'Inmazeb', type: 'Monoclonal antibody', description: 'FDA-approved combination of three monoclonal antibodies (atoltivimab, maftivimab, odesivimab) targeting Ebola virus glycoprotein.', effectiveness: 'Reduces mortality to 33.5% (vs 51.3% standard care)' },
      { name: 'Ebanga', type: 'Monoclonal antibody', description: 'Single monoclonal antibody (ansuvimab) targeting Ebola virus glycoprotein.', effectiveness: 'Reduces mortality to 35.1% (vs 49.4% standard care)' },
      { name: 'Supportive care', type: 'Symptomatic', description: 'IV fluids, electrolyte replacement, blood transfusions, treatment of secondary infections, oxygen therapy.', effectiveness: 'Essential for survival; reduces mortality significantly' },
    ],
  },
  {
    id: '5',
    slug: 'marburg',
    name: 'Marburg Virus Disease',
    scientificName: 'Marburg Hemorrhagic Fever',
    pathogenType: 'RNA Virus',
    pathogenDetail: 'Marburgvirus - Filoviridae',
    icdCode: 'A98.3',
    severity: 'watch',
    description: 'A highly virulent disease that causes hemorrhagic fever, caused by a virus in the same family as Ebola. The case fatality rate can be as high as 88%. Fruit bats are the natural reservoir.',
    incubation: '2-21 days',
    fatalityRate: '24-88%',
    timeToDeath: '8-9 days',
    r0: '1.4-1.8',
    transmission: ['Contact', 'Bodily Fluids'],
    treatments: 'Supportive only',
    vaccines: 'Experimental',
    cases24h: 2,
    deaths24h: 1,
    totalCases: 623,
    totalDeaths: 372,
    growthRate: 45,
    affectedCountries: 3,
    regions: ['East Africa', 'Central Africa'],
    sparklineData: [0, 0, 1, 0, 0, 1, 2, 1, 0, 0, 1, 2, 3, 2, 1, 0, 1, 2, 1, 0, 0, 1, 2, 3, 2, 1, 2, 2, 1, 2],
    sources: [
      { name: 'World Health Organization', tier: 1, url: 'https://www.who.int/health-topics/marburg-virus-disease', date: '2024-01-14' },
      { name: 'U.S. CDC', tier: 1, url: 'https://www.cdc.gov/vhf/marburg/', date: '2024-01-14' },
    ],
    discoveryTimeline: [
      { date: '1967', title: 'First identified', description: 'Simultaneous outbreaks in Marburg and Frankfurt, Germany, and Belgrade, Serbia, linked to African green monkeys imported from Uganda. 31 cases, 7 deaths.', source: { name: 'WHO', tier: 1, url: 'https://www.who.int/news-room/fact-sheets/detail/marburg-virus-disease', date: '1967-08-01' } },
      { date: '1998-2000', title: 'DRC outbreak', description: 'Outbreak among gold miners in Durba, DRC. 154 cases, 128 deaths (83% CFR).', source: { name: 'WHO', tier: 1, url: 'https://www.who.int/emergencies/disease-outbreak-news', date: '2000-01-01' } },
      { date: '2004-2005', title: 'Angola outbreak', description: 'Largest Marburg outbreak. 374 cases, 329 deaths (88% CFR) in Uige Province.', source: { name: 'WHO', tier: 1, url: 'https://www.who.int/emergencies/disease-outbreak-news', date: '2005-05-01' } },
      { date: '2023', title: 'Tanzania/Equatorial Guinea outbreaks', description: 'Separate outbreaks in both countries in early 2023.', source: { name: 'WHO', tier: 1, url: 'https://www.who.int/emergencies/disease-outbreak-news', date: '2023-03-01' } },
    ],
    transmissionMethods: [
      { method: 'Direct Contact', icon: 'contact', description: 'Contact with blood, secretions, or other bodily fluids of infected individuals (living or dead).', riskLevel: 'high' },
      { method: 'Cave/Mine Exposure', icon: 'cave', description: 'Prolonged exposure to caves or mines inhabited by Rousettus bat colonies (natural reservoir).', riskLevel: 'high' },
    ],
    symptoms: [
      { phase: 'Early', timeRange: 'Days 1-5', severity: 'moderate', symptoms: [{ name: 'High fever', frequency: 92 }, { name: 'Severe headache', frequency: 85 }, { name: 'Severe malaise', frequency: 80 }, { name: 'Muscle aches', frequency: 75 }] },
      { phase: 'Critical', timeRange: 'Days 5+', severity: 'severe', symptoms: [{ name: 'Severe hemorrhaging', frequency: 70 }, { name: 'Multi-organ failure', frequency: 65 }, { name: 'Maculopapular rash', frequency: 50 }, { name: 'Severe watery diarrhea', frequency: 80 }] },
    ],
    affectedOrgans: [
      { name: 'Liver', system: 'Hepatic', severity: 92, description: 'Severe hepatic necrosis with elevated liver enzymes and jaundice.', symptoms: ['Liver failure', 'Jaundice', 'Coagulopathy'], longTermEffects: [] },
      { name: 'Blood Vessels', system: 'Cardiovascular', severity: 88, description: 'Endothelial dysfunction leading to hemorrhage and shock.', symptoms: ['Hemorrhage', 'Shock', 'DIC'], longTermEffects: [] },
    ],
    riskFactors: [
      { factor: 'Cave/mine workers', icon: 'hard-hat', description: 'Exposure to Rousettus bat colonies in caves and mines.' },
      { factor: 'Healthcare workers', icon: 'stethoscope', description: 'Exposure to infected patients without proper PPE.' },
    ],
    preventionMeasures: ['Avoid fruit bat habitats (caves, mines)', 'Strict infection control in healthcare settings', 'Contact tracing', 'Safe burial practices', 'PPE for healthcare workers'],
    treatmentDetails: [
      { name: 'Supportive care', type: 'Symptomatic', description: 'Aggressive rehydration, blood products, and treatment of specific symptoms and complications.', effectiveness: 'Essential for survival' },
      { name: 'Experimental therapies', type: 'Investigational', description: 'Monoclonal antibodies and antivirals under development based on Ebola therapeutics.', effectiveness: 'Under investigation' },
    ],
  },
  {
    id: '6',
    slug: 'cholera',
    name: 'Cholera',
    scientificName: 'Cholera',
    pathogenType: 'Bacteria',
    pathogenDetail: 'Vibrio cholerae - O1/O139',
    icdCode: 'A00',
    severity: 'monitoring',
    description: 'An acute diarrhoeal infection caused by ingestion of food or water contaminated with Vibrio cholerae bacteria. Can kill within hours if untreated. Endemic in many developing countries.',
    incubation: '12h-5 days',
    fatalityRate: '<1% (treated)',
    timeToDeath: '2-3 days',
    r0: '1.0-2.0',
    transmission: ['Fecal-oral', 'Waterborne'],
    treatments: 'ORS, Antibiotics',
    vaccines: 'OCV',
    cases24h: 3400,
    deaths24h: 42,
    totalCases: 456000,
    totalDeaths: 3200,
    growthRate: 8.5,
    affectedCountries: 31,
    regions: ['Sub-Saharan Africa', 'South Asia', 'Caribbean', 'Middle East'],
    sparklineData: [30, 35, 40, 45, 42, 48, 55, 50, 45, 48, 52, 55, 58, 62, 58, 55, 52, 48, 45, 50, 55, 58, 52, 48, 45, 42, 45, 48, 50, 52],
    sources: [
      { name: 'World Health Organization', tier: 1, url: 'https://www.who.int/health-topics/cholera', date: '2024-01-15' },
      { name: 'U.S. CDC', tier: 1, url: 'https://www.cdc.gov/cholera/', date: '2024-01-15' },
    ],
    discoveryTimeline: [
      { date: '1817', title: 'First pandemic', description: 'First cholera pandemic began in the Ganges Delta, spreading through South and Southeast Asia.', source: { name: 'Historical records', tier: 3, url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7150208/', date: '1817-01-01' } },
      { date: '1854', title: 'John Snow investigation', description: 'John Snow traces London cholera outbreak to contaminated water pump, founding modern epidemiology.', source: { name: 'Historical records', tier: 3, url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7150208/', date: '1854-09-01' } },
      { date: '1883', title: 'Bacterium identified', description: 'Robert Koch isolates and identifies Vibrio cholerae as the causative agent.', source: { name: 'Historical records', tier: 3, url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7150208/', date: '1883-01-01' } },
      { date: '1961', title: 'Seventh pandemic begins', description: 'Current pandemic caused by El Tor biotype begins in Indonesia and spreads globally.', source: { name: 'WHO', tier: 1, url: 'https://www.who.int/news-room/fact-sheets/detail/cholera', date: '1961-01-01' } },
    ],
    transmissionMethods: [
      { method: 'Contaminated Water', icon: 'water', description: 'Primary route of infection through drinking water contaminated with feces containing V. cholerae.', riskLevel: 'high' },
      { method: 'Contaminated Food', icon: 'food', description: 'Raw or undercooked seafood, unwashed vegetables, or food washed/prepared with contaminated water.', riskLevel: 'moderate' },
    ],
    symptoms: [
      { phase: 'Onset', timeRange: 'Hours 6-24', severity: 'moderate', symptoms: [{ name: 'Profuse watery diarrhea', frequency: 95 }, { name: 'Vomiting', frequency: 80 }, { name: 'Rapid dehydration', frequency: 90 }, { name: 'Leg cramps', frequency: 40 }] },
      { phase: 'Severe', timeRange: 'Days 1-3', severity: 'severe', symptoms: [{ name: 'Severe dehydration', frequency: 75 }, { name: 'Hypovolemic shock', frequency: 40 }, { name: 'Renal failure', frequency: 20 }, { name: 'Altered consciousness', frequency: 30 }] },
    ],
    affectedOrgans: [
      { name: 'Small Intestine', system: 'Digestive', severity: 95, description: 'Cholera toxin binds to intestinal epithelial cells, causing massive secretion of chloride, bicarbonate, and water into the intestinal lumen.', symptoms: ['Rice-water stool', 'Severe dehydration'], longTermEffects: [] },
      { name: 'Kidneys', system: 'Renal', severity: 60, description: 'Acute kidney injury due to severe hypovolemia and hypotension.', symptoms: ['Oliguria', 'Anuria'], longTermEffects: ['Chronic kidney disease (rare)'] },
    ],
    riskFactors: [
      { factor: 'Lack of clean water', icon: 'droplet', description: 'Areas without safe drinking water infrastructure.' },
      { factor: 'Poor sanitation', icon: 'home', description: 'Inadequate sewage disposal and sanitation facilities.' },
      { factor: 'Displacement/conflict', icon: 'alert-triangle', description: 'Refugee camps and conflict zones with disrupted services.' },
      { factor: 'Blood type O', icon: 'activity', description: 'Individuals with blood type O are more susceptible to severe cholera.' },
    ],
    preventionMeasures: ['Clean water access and treatment', 'Proper sanitation infrastructure', 'Oral cholera vaccines (OCV)', 'Hygiene education', 'Safe food preparation', 'Rapid outbreak response'],
    treatmentDetails: [
      { name: 'Oral Rehydration Salts', type: 'Rehydration', description: 'Standard WHO ORS formula to replace lost fluids and electrolytes. Cornerstone of treatment.', effectiveness: 'Reduces mortality from >50% to <1%' },
      { name: 'IV fluids', type: 'Rehydration', description: 'Rapid IV rehydration with Ringers lactate for severe dehydration.', effectiveness: 'Essential for severe cases' },
      { name: 'Antibiotics', type: 'Antimicrobial', description: 'Azithromycin, doxycycline, or ciprofloxacin to shorten illness duration and reduce transmission.', effectiveness: 'Reduces diarrhea duration by 50%' },
      { name: 'Zinc supplementation', type: 'Supportive', description: 'Zinc tablets for children to reduce diarrhea duration and severity.', effectiveness: 'Reduces diarrhea duration by 25%' },
    ],
  },
  {
    id: '7',
    slug: 'dengue',
    name: 'Dengue',
    scientificName: 'Dengue Fever / Dengue Hemorrhagic Fever',
    pathogenType: 'RNA Virus',
    pathogenDetail: 'Dengue virus - Flaviviridae - DENV 1-4',
    icdCode: 'A90-A91',
    severity: 'elevated',
    description: 'A mosquito-borne viral disease transmitted primarily by Aedes aegypti mosquitoes. Four serotypes exist; secondary infection with a different serotype increases risk of severe disease.',
    incubation: '4-10 days',
    fatalityRate: '1-5% (severe)',
    timeToDeath: '5-7 days',
    r0: '1.5-6.0',
    transmission: ['Vector-borne (Aedes mosquitoes)'],
    treatments: 'Supportive',
    vaccines: 'Dengvaxia, Qdenga',
    cases24h: 125000,
    deaths24h: 156,
    totalCases: 5200000,
    totalDeaths: 4500,
    growthRate: 45,
    affectedCountries: 129,
    regions: ['Southeast Asia', 'Americas', 'Western Pacific', 'Africa'],
    sparklineData: [80, 95, 110, 125, 140, 155, 170, 185, 200, 190, 180, 195, 210, 225, 240, 230, 220, 235, 250, 245, 240, 255, 270, 265, 260, 275, 290, 285, 280, 295],
    sources: [
      { name: 'World Health Organization', tier: 1, url: 'https://www.who.int/health-topics/dengue-and-severe-dengue', date: '2024-01-15' },
      { name: 'U.S. CDC', tier: 1, url: 'https://www.cdc.gov/dengue/', date: '2024-01-15' },
      { name: 'PAHO', tier: 1, url: 'https://www.paho.org/en/topics/dengue', date: '2024-01-14' },
    ],
    discoveryTimeline: [
      { date: '1779', title: 'First recognized outbreak', description: 'First recognized dengue epidemic in Asia, Africa, and North America.', source: { name: 'Historical records', tier: 3, url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2870068/', date: '1779-01-01' } },
      { date: '1906', title: 'Mosquito transmission confirmed', description: 'Aedes aegypti confirmed as vector of dengue transmission.', source: { name: 'Historical records', tier: 3, url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2870068/', date: '1906-01-01' } },
      { date: '1943-1944', title: 'Virus isolated', description: 'Dengue virus first isolated by Kimura and Hotta in Japan, and independently by Sabin in Hawaii.', source: { name: 'Historical records', tier: 3, url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2870068/', date: '1943-01-01' } },
      { date: '2015', title: 'First vaccine approved', description: 'Dengvaxia becomes first dengue vaccine, approved in Mexico.', source: { name: 'WHO', tier: 1, url: 'https://www.who.int/news-room/fact-sheets/detail/dengue-and-severe-dengue', date: '2015-12-01' } },
      { date: '2024', title: 'Record outbreak', description: 'Record-breaking dengue cases globally, with 5+ million cases in Americas alone.', source: { name: 'PAHO', tier: 1, url: 'https://www.paho.org/en/documents/epidemiological-update-dengue-increase-cases-region-americas', date: '2024-01-01' } },
    ],
    transmissionMethods: [
      { method: 'Mosquito Bite', icon: 'bug', description: 'Transmission via bite of infected female Aedes aegypti (primary) or Aedes albopictus mosquitoes.', riskLevel: 'high' },
      { method: 'Maternal-Fetal', icon: 'maternal', description: 'Vertical transmission from infected mother to fetus during pregnancy.', riskLevel: 'moderate' },
    ],
    symptoms: [
      { phase: 'Febrile', timeRange: 'Days 1-7', severity: 'moderate', symptoms: [{ name: 'High fever (40C)', frequency: 95 }, { name: 'Severe headache', frequency: 80 }, { name: 'Retro-orbital pain', frequency: 70 }, { name: 'Muscle and joint pain', frequency: 85 }, { name: 'Rash', frequency: 50 }] },
      { phase: 'Critical', timeRange: 'Days 3-7', severity: 'severe', symptoms: [{ name: 'Plasma leakage', frequency: 25 }, { name: 'Hemorrhaging', frequency: 20 }, { name: 'Severe abdominal pain', frequency: 30 }, { name: 'Thrombocytopenia', frequency: 45 }] },
    ],
    affectedOrgans: [
      { name: 'Blood Vessels', system: 'Cardiovascular', severity: 80, description: 'Increased vascular permeability leads to plasma leakage, potentially causing shock.', symptoms: ['Plasma leakage', 'Hemorrhage', 'Shock'], longTermEffects: [] },
      { name: 'Liver', system: 'Hepatic', severity: 50, description: 'Hepatomegaly and elevated liver enzymes common in severe cases.', symptoms: ['Hepatomegaly', 'Elevated enzymes'], longTermEffects: [] },
    ],
    riskFactors: [
      { factor: 'Previous dengue infection', icon: 'repeat', description: 'Secondary infection with different serotype increases severe dengue risk.' },
      { factor: 'Urban residence in endemic areas', icon: 'building', description: 'Aedes mosquitoes thrive in urban environments.' },
      { factor: 'Rainy season', icon: 'cloud-rain', description: 'Increased mosquito breeding during wet months.' },
    ],
    preventionMeasures: ['Mosquito bite prevention (repellents, nets)', 'Eliminate mosquito breeding sites', 'Vaccination for eligible populations', 'Community vector control', 'Window/door screens'],
    treatmentDetails: [
      { name: 'Supportive care', type: 'Symptomatic', description: 'Rest, hydration, acetaminophen for fever. Avoid NSAIDs due to bleeding risk.', effectiveness: 'Essential for all cases' },
      { name: 'IV fluid therapy', type: 'Rehydration', description: 'Careful fluid management for severe dengue to prevent shock.', effectiveness: 'Critical for severe cases' },
      { name: 'Blood transfusion', type: 'Supportive', description: 'For severe bleeding or severely low platelet counts.', effectiveness: 'For severe complications' },
    ],
  },
  {
    id: '8',
    slug: 'tuberculosis',
    name: 'Tuberculosis',
    scientificName: 'Tuberculosis',
    pathogenType: 'Bacteria',
    pathogenDetail: 'Mycobacterium tuberculosis',
    icdCode: 'A15-A19',
    severity: 'monitoring',
    description: 'A bacterial infection primarily affecting the lungs, spread through airborne droplets. One of the top infectious disease killers worldwide. Drug-resistant forms are a major concern.',
    incubation: '2-12 weeks',
    fatalityRate: '15-45% (untreated)',
    timeToDeath: 'Months-years',
    r0: '1.0-4.0',
    transmission: ['Airborne'],
    treatments: 'Multi-drug regimens',
    vaccines: 'BCG',
    cases24h: 28000,
    deaths24h: 4100,
    totalCases: 10600000,
    totalDeaths: 1500000,
    growthRate: -2,
    affectedCountries: 190,
    regions: ['Global', 'High burden: India, Indonesia, China, Philippines, Pakistan'],
    sparklineData: [100, 102, 98, 101, 99, 97, 100, 98, 96, 99, 97, 95, 98, 96, 94, 97, 95, 93, 96, 94, 92, 95, 93, 91, 94, 92, 90, 93, 91, 89],
    sources: [
      { name: 'World Health Organization', tier: 1, url: 'https://www.who.int/health-topics/tuberculosis', date: '2024-01-15' },
      { name: 'U.S. CDC', tier: 1, url: 'https://www.cdc.gov/tb/', date: '2024-01-15' },
      { name: 'Stop TB Partnership', tier: 2, url: 'https://www.stoptb.org/', date: '2024-01-14' },
    ],
    discoveryTimeline: [
      { date: '1882', title: 'Bacterium discovered', description: 'Robert Koch identifies Mycobacterium tuberculosis as the cause of tuberculosis.', source: { name: 'Historical records', tier: 3, url: 'https://www.who.int/news-room/fact-sheets/detail/tuberculosis', date: '1882-03-24' } },
      { date: '1921', title: 'BCG vaccine developed', description: 'Albert Calmette and Camille Guerin develop the BCG vaccine from attenuated M. bovis.', source: { name: 'Historical records', tier: 3, url: 'https://www.who.int/news-room/fact-sheets/detail/tuberculosis', date: '1921-01-01' } },
      { date: '1944', title: 'Streptomycin discovered', description: 'First antibiotic effective against TB discovered by Selman Waksman.', source: { name: 'Historical records', tier: 3, url: 'https://www.who.int/news-room/fact-sheets/detail/tuberculosis', date: '1944-01-01' } },
      { date: '1993', title: 'Global emergency declared', description: 'WHO declares tuberculosis a global public health emergency.', source: { name: 'WHO', tier: 1, url: 'https://www.who.int/news-room/fact-sheets/detail/tuberculosis', date: '1993-01-01' } },
    ],
    transmissionMethods: [
      { method: 'Airborne', icon: 'airborne', description: 'Transmitted via respiratory droplet nuclei when a person with active pulmonary TB coughs, speaks, or sings.', riskLevel: 'high' },
    ],
    symptoms: [
      { phase: 'Active TB', timeRange: 'Weeks-Months', severity: 'moderate', symptoms: [{ name: 'Chronic cough (>3 weeks)', frequency: 90 }, { name: 'Hemoptysis', frequency: 30 }, { name: 'Weight loss', frequency: 70 }, { name: 'Night sweats', frequency: 60 }, { name: 'Fever', frequency: 50 }] },
    ],
    affectedOrgans: [
      { name: 'Lungs', system: 'Respiratory', severity: 95, description: 'Pulmonary TB is the most common form. Bacteria cause granuloma formation and progressive lung destruction.', symptoms: ['Chronic cough', 'Hemoptysis', 'Chest pain'], longTermEffects: ['Pulmonary fibrosis', 'Bronchiectasis', 'Reduced lung function'] },
      { name: 'Lymph Nodes', system: 'Lymphatic', severity: 40, description: 'Extrapulmonary TB can affect lymph nodes, especially cervical lymphadenopathy.', symptoms: ['Swollen lymph nodes'], longTermEffects: [] },
    ],
    riskFactors: [
      { factor: 'HIV infection', icon: 'shield', description: 'HIV is the strongest risk factor for TB; TB is the leading cause of death among HIV+ individuals.' },
      { factor: 'Malnutrition', icon: 'activity', description: 'Undernutrition weakens immune defenses against TB.' },
      { factor: 'Diabetes', icon: 'activity', description: 'Diabetes triples the risk of developing active TB.' },
      { factor: 'Close contact with TB cases', icon: 'users', description: 'Household contacts of active TB cases are at high risk.' },
    ],
    preventionMeasures: ['BCG vaccination for infants', 'Early case detection and treatment', 'Contact tracing', 'Isoniazid preventive therapy for latent TB', 'Infection control in healthcare settings', 'Improved ventilation'],
    treatmentDetails: [
      { name: 'Standard regimen', type: 'Antimicrobial', description: '6-month regimen: 2 months HRZE (isoniazid, rifampicin, pyrazinamide, ethambutol) + 4 months HR.', effectiveness: '>95% cure rate for drug-susceptible TB' },
      { name: 'MDR-TB treatment', type: 'Antimicrobial', description: 'Bedaquiline-based regimens for multidrug-resistant TB (resistant to isoniazid and rifampicin).', effectiveness: '~80% cure rate with newer regimens' },
      { name: 'XDR-TB treatment', type: 'Antimicrobial', description: 'Extended treatment for extensively drug-resistant TB. Requires specialized care.', effectiveness: '~50-60% cure rate' },
    ],
  },
  {
    id: '9',
    slug: 'malaria',
    name: 'Malaria',
    scientificName: 'Malaria',
    pathogenType: 'Parasite',
    pathogenDetail: 'Plasmodium spp. (P. falciparum most deadly)',
    icdCode: 'B50-B54',
    severity: 'elevated',
    description: 'A life-threatening disease caused by Plasmodium parasites transmitted through the bites of infected female Anopheles mosquitoes. P. falciparum causes the most severe form.',
    incubation: '7-30 days',
    fatalityRate: '0.3% (treated), up to 25% (untreated severe)',
    timeToDeath: '24-72 hours (severe)',
    r0: '1.5-100 (varies by setting)',
    transmission: ['Vector-borne (Anopheles mosquitoes)'],
    treatments: 'ACT, IV artesunate',
    vaccines: 'RTS,S/AS01, R21/Matrix-M',
    cases24h: 657000,
    deaths24h: 1700,
    totalCases: 247000000,
    totalDeaths: 619000,
    growthRate: 2,
    affectedCountries: 85,
    regions: ['Sub-Saharan Africa', 'South Asia', 'Southeast Asia', 'Americas'],
    sparklineData: [90, 92, 88, 91, 89, 87, 90, 88, 86, 89, 87, 85, 88, 86, 84, 87, 85, 83, 86, 84, 82, 85, 83, 81, 84, 82, 80, 83, 81, 79],
    sources: [
      { name: 'World Health Organization', tier: 1, url: 'https://www.who.int/health-topics/malaria', date: '2024-01-15' },
      { name: 'U.S. CDC', tier: 1, url: 'https://www.cdc.gov/malaria/', date: '2024-01-15' },
      { name: 'Malaria Atlas Project', tier: 2, url: 'https://malariaatlas.org/', date: '2024-01-14' },
    ],
    discoveryTimeline: [
      { date: '1880', title: 'Parasite discovered', description: 'Charles Laveran discovers Plasmodium parasites in blood of malaria patients.', source: { name: 'Historical records', tier: 3, url: 'https://www.who.int/news-room/fact-sheets/detail/malaria', date: '1880-01-01' } },
      { date: '1897', title: 'Mosquito transmission proven', description: 'Ronald Ross proves Anopheles mosquitoes transmit malaria.', source: { name: 'Historical records', tier: 3, url: 'https://www.who.int/news-room/fact-sheets/detail/malaria', date: '1897-01-01' } },
      { date: '2021', title: 'First vaccine approved', description: 'WHO recommends RTS,S/AS01 (Mosquirix) for children in sub-Saharan Africa.', source: { name: 'WHO', tier: 1, url: 'https://www.who.int/news/item/06-10-2021-who-recommends-groundbreaking-malaria-vaccine-for-children-at-risk', date: '2021-10-06' } },
      { date: '2023', title: 'Second vaccine approved', description: 'WHO recommends R21/Matrix-M vaccine, with higher efficacy.', source: { name: 'WHO', tier: 1, url: 'https://www.who.int/news/item/02-10-2023-who-recommends-r21-matrix-m-vaccine-for-malaria-prevention-in-updated-advice-on-immunization', date: '2023-10-02' } },
    ],
    transmissionMethods: [
      { method: 'Mosquito Bite', icon: 'bug', description: 'Female Anopheles mosquitoes inject sporozoites during blood meals, typically between dusk and dawn.', riskLevel: 'high' },
      { method: 'Blood Transfusion', icon: 'droplet', description: 'Transmission through infected blood products.', riskLevel: 'low' },
      { method: 'Congenital', icon: 'maternal', description: 'Mother-to-child transmission during pregnancy or delivery.', riskLevel: 'moderate' },
    ],
    symptoms: [
      { phase: 'Uncomplicated', timeRange: 'Days 7-14', severity: 'moderate', symptoms: [{ name: 'Cyclic fever', frequency: 90 }, { name: 'Chills', frequency: 85 }, { name: 'Sweating', frequency: 80 }, { name: 'Headache', frequency: 75 }, { name: 'Myalgia', frequency: 60 }] },
      { phase: 'Severe', timeRange: 'Variable', severity: 'severe', symptoms: [{ name: 'Cerebral malaria', frequency: 20 }, { name: 'Severe anemia', frequency: 40 }, { name: 'Respiratory distress', frequency: 25 }, { name: 'Hypoglycemia', frequency: 15 }] },
    ],
    affectedOrgans: [
      { name: 'Blood/RBCs', system: 'Hematologic', severity: 95, description: 'Parasites invade and destroy red blood cells, causing anemia and releasing toxins.', symptoms: ['Anemia', 'Jaundice', 'Splenomegaly'], longTermEffects: ['Chronic anemia', 'Splenomegaly'] },
      { name: 'Brain', system: 'Nervous', severity: 80, description: 'Cerebral malaria occurs when parasitized RBCs obstruct brain capillaries.', symptoms: ['Seizures', 'Coma', 'Altered consciousness'], longTermEffects: ['Cognitive impairment', 'Epilepsy'] },
    ],
    riskFactors: [
      { factor: 'Children under 5', icon: 'user', description: 'Children in endemic areas have highest mortality (80% of deaths).' },
      { factor: 'Pregnant women', icon: 'heart', description: 'Pregnancy increases susceptibility to severe malaria.' },
      { factor: 'Non-immune travelers', icon: 'plane', description: 'Travelers from non-endemic areas lack protective immunity.' },
      { factor: 'HIV infection', icon: 'shield', description: 'HIV increases malaria risk and severity.' },
    ],
    preventionMeasures: ['Insecticide-treated bed nets (ITNs)', 'Indoor residual spraying (IRS)', 'Chemoprophylaxis for travelers', 'Seasonal malaria chemoprevention (SMC)', 'RTS,S or R21 vaccination for children', 'Elimination of mosquito breeding sites'],
    treatmentDetails: [
      { name: 'ACT', type: 'Antimalarial', description: 'Artemisinin-based combination therapies (artemether-lumefantrine, artesunate-amodiaquine) for uncomplicated malaria.', effectiveness: '>95% cure rate for susceptible strains' },
      { name: 'IV Artesunate', type: 'Antimalarial', description: 'Injectable artesunate for severe malaria, followed by oral ACT.', effectiveness: 'Reduces mortality by 35% vs quinine' },
      { name: 'Supportive care', type: 'Symptomatic', description: 'Blood transfusion for severe anemia, anticonvulsants for cerebral malaria, glucose for hypoglycemia.', effectiveness: 'Essential for severe cases' },
    ],
  },
  {
    id: '10',
    slug: 'measles',
    name: 'Measles',
    scientificName: 'Measles',
    pathogenType: 'RNA Virus',
    pathogenDetail: 'Measles morbillivirus - Paramyxoviridae',
    icdCode: 'B05',
    severity: 'elevated',
    description: 'A highly contagious viral disease characterized by fever and distinctive rash. One of the most transmissible diseases known. Preventable by vaccination but outbreaks occur with declining coverage.',
    incubation: '10-14 days',
    fatalityRate: '0.1-0.2% (developed), 3-6% (developing)',
    timeToDeath: '7-10 days',
    r0: '12-18',
    transmission: ['Airborne', 'Droplet'],
    treatments: 'Supportive, Vitamin A',
    vaccines: 'MMR, MR',
    cases24h: 8500,
    deaths24h: 380,
    totalCases: 9000000,
    totalDeaths: 136000,
    growthRate: 18,
    affectedCountries: 45,
    regions: ['Sub-Saharan Africa', 'South Asia', 'Middle East'],
    sparklineData: [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190, 195],
    sources: [
      { name: 'World Health Organization', tier: 1, url: 'https://www.who.int/health-topics/measles', date: '2024-01-15' },
      { name: 'U.S. CDC', tier: 1, url: 'https://www.cdc.gov/measles/', date: '2024-01-15' },
    ],
    discoveryTimeline: [
      { date: '1757', title: 'Clinical differentiation', description: 'Francis Home differentiates measles from smallpox and attempts immunization.', source: { name: 'Historical records', tier: 3, url: 'https://www.who.int/news-room/fact-sheets/detail/measles', date: '1757-01-01' } },
      { date: '1954', title: 'Virus isolated', description: 'John Enders and Thomas Peebles isolate measles virus.', source: { name: 'Historical records', tier: 3, url: 'https://www.who.int/news-room/fact-sheets/detail/measles', date: '1954-01-01' } },
      { date: '1963', title: 'First vaccine licensed', description: 'First measles vaccine licensed in the United States.', source: { name: 'CDC', tier: 1, url: 'https://www.cdc.gov/measles/about/history.html', date: '1963-01-01' } },
      { date: '2000', title: 'US elimination achieved', description: 'Endemic measles transmission declared eliminated in the United States.', source: { name: 'CDC', tier: 1, url: 'https://www.cdc.gov/measles/about/history.html', date: '2000-01-01' } },
    ],
    transmissionMethods: [
      { method: 'Airborne', icon: 'airborne', description: 'Measles virus can remain airborne for up to 2 hours in enclosed spaces. Extremely contagious.', riskLevel: 'high' },
      { method: 'Respiratory Droplets', icon: 'droplet', description: 'Direct contact with respiratory droplets from infected individuals.', riskLevel: 'high' },
    ],
    symptoms: [
      { phase: 'Prodromal', timeRange: 'Days 1-4', severity: 'moderate', symptoms: [{ name: 'High fever', frequency: 95 }, { name: 'Cough', frequency: 90 }, { name: 'Runny nose', frequency: 85 }, { name: 'Conjunctivitis', frequency: 80 }, { name: 'Koplik spots', frequency: 70 }] },
      { phase: 'Exanthem', timeRange: 'Days 4-7', severity: 'moderate', symptoms: [{ name: 'Maculopapular rash', frequency: 99 }, { name: 'Very high fever', frequency: 90 }] },
    ],
    affectedOrgans: [
      { name: 'Respiratory System', system: 'Respiratory', severity: 85, description: 'Virus primarily infects respiratory epithelium. Pneumonia is the most common cause of measles deaths.', symptoms: ['Cough', 'Pneumonia', 'Otitis media'], longTermEffects: [] },
      { name: 'Brain', system: 'Nervous', severity: 40, description: 'Encephalitis occurs in 1 in 1000 cases. SSPE is a rare late complication.', symptoms: ['Encephalitis', 'Seizures'], longTermEffects: ['SSPE (subacute sclerosing panencephalitis)', 'Neurological damage'] },
      { name: 'Immune System', system: 'Lymphatic', severity: 70, description: 'Measles causes immune amnesia, erasing previously acquired immune memory.', symptoms: ['Immunosuppression'], longTermEffects: ['Increased susceptibility to other infections for 2-3 years'] },
    ],
    riskFactors: [
      { factor: 'Unvaccinated individuals', icon: 'shield', description: 'Attack rate approaches 90% in unvaccinated exposed individuals.' },
      { factor: 'Vitamin A deficiency', icon: 'activity', description: 'Increases risk of severe complications and death.' },
      { factor: 'Malnutrition', icon: 'activity', description: 'Malnourished children have higher complication rates.' },
      { factor: 'Immunocompromised', icon: 'shield', description: 'Higher risk of severe measles and complications.' },
    ],
    preventionMeasures: ['MMR vaccination (95% effective with 2 doses)', 'Maintaining high population immunity (>95%)', 'Rapid outbreak response', 'Isolation of cases', 'Post-exposure prophylaxis (vaccine or immunoglobulin)'],
    treatmentDetails: [
      { name: 'Vitamin A', type: 'Supportive', description: 'WHO recommends vitamin A supplementation for all children with measles. Reduces mortality by 50%.', effectiveness: 'Highly effective, especially in deficient populations' },
      { name: 'Supportive care', type: 'Symptomatic', description: 'Hydration, nutrition support, treatment of complications (pneumonia, otitis media).', effectiveness: 'Essential for recovery' },
    ],
  },
  {
    id: '11',
    slug: 'yellow-fever',
    name: 'Yellow Fever',
    scientificName: 'Yellow Fever',
    pathogenType: 'RNA Virus',
    pathogenDetail: 'Yellow fever virus - Flaviviridae',
    icdCode: 'A95',
    severity: 'watch',
    description: 'A mosquito-borne viral hemorrhagic fever endemic in tropical Africa and Central/South America. Named for jaundice affecting some patients. Preventable by a highly effective vaccine.',
    incubation: '3-6 days',
    fatalityRate: '20-50% (severe)',
    timeToDeath: '10-14 days',
    r0: '4-7',
    transmission: ['Vector-borne (Aedes mosquitoes)'],
    treatments: 'Supportive',
    vaccines: 'YF-VAX, 17D',
    cases24h: 250,
    deaths24h: 35,
    totalCases: 200000,
    totalDeaths: 30000,
    growthRate: 5,
    affectedCountries: 47,
    regions: ['Sub-Saharan Africa', 'South America'],
    sparklineData: [20, 22, 25, 28, 30, 28, 26, 24, 22, 25, 28, 30, 32, 30, 28, 26, 24, 26, 28, 30, 32, 34, 32, 30, 28, 30, 32, 34, 36, 35],
    sources: [
      { name: 'World Health Organization', tier: 1, url: 'https://www.who.int/health-topics/yellow-fever', date: '2024-01-15' },
      { name: 'U.S. CDC', tier: 1, url: 'https://www.cdc.gov/yellowfever/', date: '2024-01-15' },
    ],
    discoveryTimeline: [
      { date: '1881', title: 'Mosquito transmission discovered', description: 'Carlos Finlay proposes and Walter Reed confirms Aedes aegypti transmits yellow fever.', source: { name: 'Historical records', tier: 3, url: 'https://www.who.int/news-room/fact-sheets/detail/yellow-fever', date: '1881-01-01' } },
      { date: '1927', title: 'Virus isolated', description: 'Yellow fever virus isolated in West Africa.', source: { name: 'Historical records', tier: 3, url: 'https://www.who.int/news-room/fact-sheets/detail/yellow-fever', date: '1927-01-01' } },
      { date: '1937', title: 'Vaccine developed', description: 'Max Theiler develops 17D vaccine strain, later receiving Nobel Prize.', source: { name: 'Historical records', tier: 3, url: 'https://www.who.int/news-room/fact-sheets/detail/yellow-fever', date: '1937-01-01' } },
    ],
    transmissionMethods: [
      { method: 'Mosquito Bite', icon: 'bug', description: 'Transmitted by Aedes aegypti in urban areas and Haemagogus/Sabethes in jungle areas.', riskLevel: 'high' },
    ],
    symptoms: [
      { phase: 'Acute', timeRange: 'Days 1-4', severity: 'moderate', symptoms: [{ name: 'Fever', frequency: 95 }, { name: 'Headache', frequency: 80 }, { name: 'Myalgia', frequency: 70 }, { name: 'Backache', frequency: 65 }] },
      { phase: 'Toxic', timeRange: 'Days 4-10', severity: 'severe', symptoms: [{ name: 'Jaundice', frequency: 60 }, { name: 'Hemorrhage', frequency: 40 }, { name: 'Renal failure', frequency: 30 }, { name: 'Shock', frequency: 25 }] },
    ],
    affectedOrgans: [
      { name: 'Liver', system: 'Hepatic', severity: 90, description: 'Massive hepatocyte necrosis causes characteristic jaundice.', symptoms: ['Jaundice', 'Liver failure', 'Coagulopathy'], longTermEffects: [] },
      { name: 'Kidneys', system: 'Renal', severity: 70, description: 'Acute kidney injury from direct viral damage and hypoperfusion.', symptoms: ['Oliguria', 'Renal failure'], longTermEffects: [] },
    ],
    riskFactors: [
      { factor: 'Unvaccinated travelers', icon: 'plane', description: 'Travelers to endemic areas without vaccination.' },
      { factor: 'Forest workers', icon: 'tree', description: 'Exposure to sylvatic cycle in jungle areas.' },
    ],
    preventionMeasures: ['Yellow fever vaccination (lifelong protection)', 'Mosquito bite prevention', 'International Health Regulations requirements', 'Vector control'],
    treatmentDetails: [
      { name: 'Supportive care', type: 'Symptomatic', description: 'ICU care, IV fluids, treatment of bleeding, dialysis for renal failure.', effectiveness: 'Essential; no specific antiviral available' },
    ],
  },
  {
    id: '12',
    slug: 'rabies',
    name: 'Rabies',
    scientificName: 'Rabies',
    pathogenType: 'RNA Virus',
    pathogenDetail: 'Rabies lyssavirus - Rhabdoviridae',
    icdCode: 'A82',
    severity: 'monitoring',
    description: 'A fatal viral encephalitis transmitted through bites from infected mammals, primarily dogs. Nearly 100% fatal once symptoms appear, but completely preventable with post-exposure prophylaxis.',
    incubation: '1-3 months',
    fatalityRate: '~100% (symptomatic)',
    timeToDeath: '2-10 days',
    r0: 'Not applicable (direct transmission)',
    transmission: ['Animal bite', 'Saliva contact'],
    treatments: 'PEP only',
    vaccines: 'Rabies vaccine',
    cases24h: 160,
    deaths24h: 160,
    totalCases: 59000,
    totalDeaths: 59000,
    growthRate: 0,
    affectedCountries: 100,
    regions: ['Asia', 'Africa'],
    sparklineData: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    sources: [
      { name: 'World Health Organization', tier: 1, url: 'https://www.who.int/health-topics/rabies', date: '2024-01-15' },
      { name: 'U.S. CDC', tier: 1, url: 'https://www.cdc.gov/rabies/', date: '2024-01-15' },
    ],
    discoveryTimeline: [
      { date: '1885', title: 'First vaccine', description: 'Louis Pasteur administers first rabies vaccine to Joseph Meister.', source: { name: 'Historical records', tier: 3, url: 'https://www.who.int/news-room/fact-sheets/detail/rabies', date: '1885-07-06' } },
      { date: '1903', title: 'Virus identified', description: 'Adelchi Negri identifies intracellular inclusion bodies (Negri bodies) in infected neurons.', source: { name: 'Historical records', tier: 3, url: 'https://www.who.int/news-room/fact-sheets/detail/rabies', date: '1903-01-01' } },
    ],
    transmissionMethods: [
      { method: 'Animal Bite', icon: 'bite', description: 'Rabies virus in saliva enters body through bite wounds. Dogs responsible for 99% of human cases.', riskLevel: 'high' },
      { method: 'Scratches/Mucous membranes', icon: 'contact', description: 'Contact with infected saliva on broken skin or mucous membranes.', riskLevel: 'moderate' },
    ],
    symptoms: [
      { phase: 'Prodromal', timeRange: 'Days 1-4', severity: 'mild', symptoms: [{ name: 'Fever', frequency: 80 }, { name: 'Paresthesia at bite site', frequency: 70 }, { name: 'Malaise', frequency: 75 }] },
      { phase: 'Neurological', timeRange: 'Days 4-10', severity: 'severe', symptoms: [{ name: 'Hydrophobia', frequency: 80 }, { name: 'Aerophobia', frequency: 50 }, { name: 'Confusion', frequency: 90 }, { name: 'Paralysis', frequency: 40 }, { name: 'Coma', frequency: 100 }] },
    ],
    affectedOrgans: [
      { name: 'Brain', system: 'Nervous', severity: 100, description: 'Progressive fatal encephalitis. Virus travels via peripheral nerves to CNS.', symptoms: ['Encephalitis', 'Hydrophobia', 'Paralysis', 'Coma'], longTermEffects: [] },
    ],
    riskFactors: [
      { factor: 'Dog bite exposure', icon: 'dog', description: '99% of human rabies cases are transmitted by dogs.' },
      { factor: 'Veterinarians', icon: 'stethoscope', description: 'Occupational exposure to potentially rabid animals.' },
      { factor: 'Bat exposure', icon: 'bat', description: 'Major source of rabies in countries where dog rabies is controlled.' },
    ],
    preventionMeasures: ['Dog vaccination and population management', 'Pre-exposure prophylaxis for high-risk individuals', 'Immediate wound washing after exposure', 'Post-exposure prophylaxis (PEP)', 'Avoidance of stray animals'],
    treatmentDetails: [
      { name: 'Post-exposure prophylaxis', type: 'Preventive', description: 'Wound washing + rabies immunoglobulin + rabies vaccine series. Must begin before symptom onset.', effectiveness: '100% effective if administered correctly before symptoms' },
      { name: 'Milwaukee Protocol', type: 'Experimental', description: 'Induced coma with antiviral drugs. Very rarely successful (few survivors documented).', effectiveness: 'Extremely poor; most patients die regardless of treatment' },
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
    icon: '*',
    scoreRange: '90-100',
    description: 'International organizations and peer-reviewed scientific institutions with global mandates for disease surveillance. Data from these sources has been independently verified through multiple channels and is considered the benchmark for accuracy.',
    examples: ['World Health Organization', 'U.S. CDC', 'ECDC', 'The Lancet', 'NEJM', 'Nature', 'Science'],
    criteria: ['International mandate or recognition', 'Peer-reviewed methodology', 'Historical accuracy > 95%', 'Transparent data collection methods', 'Regular independent audits'],
  },
  {
    tier: 2,
    name: 'Highly Credible',
    icon: '+',
    scoreRange: '75-89',
    description: 'National health authorities of major nations and established research institutions with strong track records. Data is well-sourced and regularly updated.',
    examples: ['RKI (Germany)', 'Institut Pasteur', 'PHE (UK)', 'ProMED-mail', 'Africa CDC', 'NICD South Africa'],
    criteria: ['Government-backed authority', 'Established data infrastructure', 'Regular reporting cadence', 'Peer recognition'],
  },
  {
    tier: 3,
    name: 'Credible',
    icon: 'o',
    scoreRange: '60-74',
    description: 'Regional health authorities, major news wire services with health desks, and established NGOs. Data is generally reliable but may have delays or gaps.',
    examples: ['Reuters Health', 'STAT News', 'MSF', 'Regional health ministries', 'AP Health'],
    criteria: ['Established editorial standards', 'Named sources and attribution', 'Regular corrections policy', 'Recognized expertise'],
  },
  {
    tier: 4,
    name: 'Preliminary',
    icon: '-',
    scoreRange: '40-59',
    description: 'Preprint servers, state/provincial health departments, and preliminary research. Data should be treated as provisional and may be revised.',
    examples: ['medRxiv', 'bioRxiv', 'State health departments', 'University research teams'],
    criteria: ['Identified methodology', 'Named authors/institutions', 'Subject to peer review', 'Provisional data clearly labeled'],
  },
  {
    tier: 5,
    name: 'Unverified',
    icon: '?',
    scoreRange: '0-39',
    description: 'Social media signals, user submissions, and unverified reports. This data is included for completeness but should not be relied upon without independent verification.',
    examples: ['Social media health signals', 'User submissions', 'Unattributed reports'],
    criteria: ['Source identified but not verified', 'Data not independently confirmed', 'Subject to verification queue', 'Clearly labeled as unverified'],
  },
];

export const historicalPandemics = [
  { year: '430 BC', name: 'Plague of Athens', deaths: '75,000-100,000', description: 'Typhoid fever devastated the Athenian army during the Peloponnesian War, killing roughly 25% of the population.' },
  { year: '165 AD', name: 'Antonine Plague', deaths: '5-10 million', description: 'Likely smallpox or measles brought to Rome by soldiers returning from the Near East. Killed Emperor Marcus Aurelius.' },
  { year: '541', name: 'Plague of Justinian', deaths: '25-50 million', description: 'The first major bubonic plague pandemic, originating in Egypt and spreading through the Byzantine Empire. Killed up to 40% of Constantinople.' },
  { year: '1346', name: 'Black Death', deaths: '75-200 million', description: 'The most devastating pandemic in human history, killing 30-60% of Europes population. Caused by Yersinia pestis carried by fleas on rats.' },
  { year: '1520', name: 'Smallpox in the Americas', deaths: '56 million', description: 'European colonizers introduced smallpox to the Americas, devastating indigenous populations who had no immunity.' },
  { year: '1665', name: 'Great Plague of London', deaths: '100,000', description: 'Last major bubonic plague outbreak in England, killing roughly 15% of Londons population.' },
  { year: '1817', name: 'First Cholera Pandemic', deaths: '100,000+', description: 'Originating in the Ganges Delta, cholera spread through Asia. This began a series of seven cholera pandemics.' },
  { year: '1855', name: 'Third Plague Pandemic', deaths: '12-15 million', description: 'Bubonic plague pandemic originating in Yunnan, China. Led to discovery of plague bacillus by Yersin in 1894.' },
  { year: '1889', name: 'Russian Flu', deaths: '1 million', description: 'Global influenza pandemic originating in Russia. Some researchers now believe it may have been a coronavirus (OC43).' },
  { year: '1918', name: 'Spanish Flu', deaths: '50-100 million', description: 'H1N1 influenza infected one-third of the worlds population. More soldiers died from flu than combat in WWI.' },
  { year: '1957', name: 'Asian Flu', deaths: '1-2 million', description: 'H2N2 influenza originated in East Asia and spread globally. First pandemic with an available vaccine.' },
  { year: '1968', name: 'Hong Kong Flu', deaths: '1-4 million', description: 'H3N2 influenza pandemic. Relatively lower mortality due to cross-immunity from 1957 pandemic.' },
  { year: '1981', name: 'HIV/AIDS', deaths: '36+ million', description: 'HIV pandemic remains ongoing. Treatment advances have transformed it from fatal to chronic manageable condition.' },
  { year: '2002', name: 'SARS', deaths: '774', description: 'SARS-CoV-1 emerged in Guangdong, China and spread to 29 countries. Successfully contained through public health measures.' },
  { year: '2009', name: 'H1N1 Pandemic', deaths: '151,700-575,400', description: 'Swine flu pandemic caused by a novel H1N1 strain. Primarily affected younger populations.' },
  { year: '2012', name: 'MERS', deaths: '858', description: 'Middle East Respiratory Syndrome emerged in Saudi Arabia. High fatality rate but limited human-to-human transmission.' },
  { year: '2014', name: 'Ebola Epidemic', deaths: '11,325', description: 'West African Ebola epidemic was the largest in history. Led to development of first approved Ebola vaccines and treatments.' },
  { year: '2015', name: 'Zika Epidemic', deaths: 'Low direct mortality', description: 'Zika virus spread through Americas, causing birth defects including microcephaly when pregnant women were infected.' },
  { year: '2019', name: 'COVID-19', deaths: '7+ million', description: 'SARS-CoV-2 caused a global pandemic affecting every country. Fastest vaccine development in history (11 months).' },
];
