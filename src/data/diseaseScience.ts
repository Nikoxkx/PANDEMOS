// Comprehensive scientific data for diseases

export interface MolecularMechanism {
  name: string;
  description: string;
  details: string[];
}

export interface CellularPathway {
  step: number;
  title: string;
  description: string;
  molecules: string[];
  duration?: string;
}

export interface ViralStructure {
  component: string;
  function: string;
  targetable: boolean;
}

export interface ImmuneResponse {
  phase: string;
  timing: string;
  description: string;
  keyPlayers: string[];
}

export interface DiseaseScience {
  diseaseSlug: string;
  
  // Molecular biology
  viralStructure?: ViralStructure[];
  genomeType?: string;
  genomeSize?: string;
  mutationRate?: string;
  
  // Cellular entry mechanism  
  cellEntry: {
    receptor: string;
    coreceptors?: string[];
    entryMechanism: string;
    pathway: CellularPathway[];
  };
  
  // Pathophysiology
  pathophysiology: {
    primaryTarget: string;
    cellularEffects: string[];
    tissueEffects: string[];
    systemicEffects: string[];
  };
  
  // Immune response
  immuneResponse: ImmuneResponse[];
  
  // Cytopathic effects
  cytopathicEffects: string[];
  
  // Molecular targets for treatment
  drugTargets: {
    target: string;
    mechanism: string;
    drugs: string[];
  }[];
}

export const diseaseScience: Record<string, DiseaseScience> = {
  'covid-19': {
    diseaseSlug: 'covid-19',
    
    viralStructure: [
      { component: 'Spike (S) Protein', function: 'Receptor binding and membrane fusion via ACE2. The S protein is a homotrimer with S1 (receptor binding) and S2 (membrane fusion) subunits.', targetable: true },
      { component: 'Envelope (E) Protein', function: 'Viral assembly, budding, and ion channel activity. Critical for pathogenesis.', targetable: true },
      { component: 'Membrane (M) Protein', function: 'Most abundant structural protein. Shapes the viral envelope and interacts with other structural proteins.', targetable: false },
      { component: 'Nucleocapsid (N) Protein', function: 'Packages the RNA genome into a helical ribonucleoprotein complex. Involved in viral replication.', targetable: true },
      { component: 'RNA-dependent RNA polymerase (RdRp)', function: 'Replicates the viral genome. Encoded by nsp12. Target of remdesivir.', targetable: true },
      { component: 'Main Protease (Mpro/3CLpro)', function: 'Cleaves viral polyproteins into functional proteins. Target of Paxlovid.', targetable: true },
      { component: 'Papain-like Protease (PLpro)', function: 'Processes viral polyproteins and antagonizes host innate immunity.', targetable: true },
    ],
    
    genomeType: 'Positive-sense single-stranded RNA (+ssRNA)',
    genomeSize: '~29.9 kb (largest known RNA virus genome)',
    mutationRate: '~1-2 substitutions per month (relatively low for RNA virus due to proofreading exonuclease)',
    
    cellEntry: {
      receptor: 'ACE2 (Angiotensin-Converting Enzyme 2)',
      coreceptors: ['TMPRSS2', 'Furin', 'Cathepsin L'],
      entryMechanism: 'Receptor-mediated endocytosis or direct membrane fusion',
      pathway: [
        {
          step: 1,
          title: 'Spike Protein Binding',
          description: 'The receptor-binding domain (RBD) of the S1 subunit binds to ACE2 with high affinity (Kd ~15 nM). The RBD alternates between "up" (receptor-accessible) and "down" (receptor-inaccessible) conformations.',
          molecules: ['Spike S1 subunit', 'RBD', 'ACE2'],
        },
        {
          step: 2,
          title: 'S1/S2 Cleavage',
          description: 'Furin cleaves the spike protein at the S1/S2 boundary (polybasic RRAR↓S site unique to SARS-CoV-2). This pre-cleavage during viral maturation enhances infectivity.',
          molecules: ['Furin', 'Spike protein'],
        },
        {
          step: 3,
          title: 'S2′ Cleavage & Fusion Activation',
          description: 'TMPRSS2 cleaves the S2′ site at the cell surface, exposing the fusion peptide. Alternatively, cathepsin L cleaves S2′ in endosomes after receptor-mediated endocytosis.',
          molecules: ['TMPRSS2', 'Cathepsin L', 'S2 subunit'],
        },
        {
          step: 4,
          title: 'Membrane Fusion',
          description: 'The exposed fusion peptide inserts into the host membrane. HR1 and HR2 domains form a 6-helix bundle (6-HB), driving membrane fusion and creating a fusion pore.',
          molecules: ['Fusion peptide', 'HR1', 'HR2'],
        },
        {
          step: 5,
          title: 'Genome Release',
          description: 'The viral +ssRNA genome is released into the cytoplasm. Host ribosomes immediately begin translating ORF1a and ORF1ab into polyproteins pp1a and pp1ab.',
          molecules: ['Viral RNA', 'Host ribosomes'],
        },
      ],
    },
    
    pathophysiology: {
      primaryTarget: 'Type II alveolar epithelial cells (pneumocytes)',
      cellularEffects: [
        'Viral replication induces ER stress and unfolded protein response (UPR)',
        'Inhibition of host protein synthesis through nsp1-mediated mRNA degradation',
        'Mitochondrial dysfunction and ROS production',
        'Pyroptosis and necrosis of infected cells releasing DAMPs',
        'Downregulation of ACE2 leading to angiotensin II accumulation',
        'Disruption of tight junctions and epithelial barrier function',
      ],
      tissueEffects: [
        'Diffuse alveolar damage (DAD) with hyaline membrane formation',
        'Pulmonary edema and impaired gas exchange',
        'Microthrombi formation in pulmonary vasculature',
        'Endothelial dysfunction (endotheliitis)',
        'Myocardial inflammation and injury',
        'Neuroinvasion via olfactory bulb and blood-brain barrier',
      ],
      systemicEffects: [
        'Cytokine release syndrome ("cytokine storm") with elevated IL-6, IL-1β, TNF-α',
        'Coagulopathy with elevated D-dimer and fibrinogen',
        'Lymphopenia with T cell exhaustion',
        'Multi-organ dysfunction syndrome (MODS)',
        'Acute kidney injury (AKI) in severe cases',
        'Dysautonomia and long-term neurological sequelae',
      ],
    },
    
    immuneResponse: [
      {
        phase: 'Innate Response (0-7 days)',
        timing: 'Hours to days post-infection',
        description: 'Pattern recognition receptors (TLR3, TLR7, RIG-I, MDA5) detect viral RNA and trigger type I/III interferon production. However, SARS-CoV-2 actively suppresses IFN signaling through multiple mechanisms.',
        keyPlayers: ['Type I/III IFNs', 'NK cells', 'Macrophages', 'Neutrophils', 'Complement'],
      },
      {
        phase: 'Adaptive Response (7-14 days)',
        timing: '1-2 weeks post-symptom onset',
        description: 'T cells recognize viral peptides presented on MHC. CD8+ cytotoxic T cells kill infected cells. CD4+ helper T cells coordinate immune response and support B cell activation.',
        keyPlayers: ['CD4+ T cells', 'CD8+ T cells', 'Dendritic cells', 'B cells'],
      },
      {
        phase: 'Antibody Production (10-21 days)',
        timing: '10-14 days for IgM, 14-21 days for IgG',
        description: 'Neutralizing antibodies target the RBD and NTD of the spike protein. IgA provides mucosal immunity. Memory B cells and long-lived plasma cells provide lasting immunity.',
        keyPlayers: ['IgM', 'IgG', 'IgA', 'Neutralizing antibodies', 'Memory B cells'],
      },
      {
        phase: 'Resolution or Hyperinflammation',
        timing: '2-3 weeks',
        description: 'Successful resolution involves viral clearance and tissue repair. In severe cases, dysregulated inflammation leads to ARDS, cytokine storm, and multi-organ failure.',
        keyPlayers: ['Regulatory T cells', 'Anti-inflammatory cytokines', 'Tissue repair factors'],
      },
    ],
    
    cytopathicEffects: [
      'Syncytia formation (multinucleated giant cells) via spike-mediated cell-cell fusion',
      'Double-membrane vesicle (DMV) formation as viral replication organelles',
      'Golgi fragmentation and ER stress',
      'Apoptosis and necrosis of infected cells',
      'Release of damage-associated molecular patterns (DAMPs)',
    ],
    
    drugTargets: [
      {
        target: 'Main Protease (Mpro/3CLpro)',
        mechanism: 'Inhibits cleavage of viral polyproteins, blocking viral replication',
        drugs: ['Nirmatrelvir (Paxlovid component)', 'Ensitrelvir'],
      },
      {
        target: 'RNA-dependent RNA polymerase (RdRp)',
        mechanism: 'Nucleoside analog incorporation causes chain termination or mutagenesis',
        drugs: ['Remdesivir', 'Molnupiravir'],
      },
      {
        target: 'Spike Protein / RBD',
        mechanism: 'Neutralizing antibodies block ACE2 binding and viral entry',
        drugs: ['Sotrovimab', 'Bebtelovimab', 'Tixagevimab/cilgavimab (Evusheld)'],
      },
      {
        target: 'TMPRSS2',
        mechanism: 'Serine protease inhibitor blocks S2′ cleavage and fusion',
        drugs: ['Camostat mesylate', 'Nafamostat'],
      },
      {
        target: 'Host Inflammation',
        mechanism: 'Corticosteroids reduce hyperinflammation in severe disease',
        drugs: ['Dexamethasone', 'Tocilizumab (IL-6 inhibitor)', 'Baricitinib (JAK inhibitor)'],
      },
    ],
  },

  'mpox': {
    diseaseSlug: 'mpox',
    
    viralStructure: [
      { component: 'Double-stranded DNA genome', function: 'Linear dsDNA genome (~197 kb) with hairpin termini. Encodes ~200 genes.', targetable: false },
      { component: 'Lateral bodies', function: 'Unknown function, contain enzymes and early transcription factors.', targetable: false },
      { component: 'Core', function: 'Contains the viral genome and enzymes for early transcription.', targetable: false },
      { component: 'Outer membrane', function: 'Contains viral entry/fusion proteins. Target of neutralizing antibodies.', targetable: true },
      { component: 'VP37 protein', function: 'Essential for virion wrapping and egress. Target of tecovirimat.', targetable: true },
    ],
    
    genomeType: 'Double-stranded DNA (dsDNA)',
    genomeSize: '~197 kb',
    mutationRate: 'Low (~1-2 × 10⁻⁵ substitutions/site/year, but accelerated APOBEC3-driven mutations in recent outbreak)',
    
    cellEntry: {
      receptor: 'Multiple glycosaminoglycans (GAGs) and other surface molecules',
      entryMechanism: 'Macropinocytosis or plasma membrane fusion',
      pathway: [
        {
          step: 1,
          title: 'Attachment',
          description: 'Mature virions (MV) attach to cells via glycosaminoglycans and laminin. The virus uses multiple entry pathways.',
          molecules: ['GAGs', 'Laminin', 'Entry/fusion complex (EFC)'],
        },
        {
          step: 2,
          title: 'Membrane Fusion',
          description: 'The entry/fusion complex (11-12 proteins) mediates pH-dependent fusion in endosomes or pH-independent fusion at plasma membrane.',
          molecules: ['A16', 'A21', 'A28', 'G3', 'G9', 'H2', 'J5', 'L5', 'O3'],
        },
        {
          step: 3,
          title: 'Core Release',
          description: 'Fusion releases the viral core into the cytoplasm. Unlike most DNA viruses, poxviruses replicate entirely in the cytoplasm.',
          molecules: ['Viral core', 'Early transcription factors'],
        },
        {
          step: 4,
          title: 'Cytoplasmic Replication',
          description: 'Early genes are transcribed by virion-packaged RNA polymerase. DNA replication occurs in cytoplasmic "viral factories."',
          molecules: ['Viral RNA polymerase', 'DNA polymerase', 'Helicase-primase'],
        },
      ],
    },
    
    pathophysiology: {
      primaryTarget: 'Keratinocytes and dermal cells',
      cellularEffects: [
        'Cytoplasmic viral factories sequester cellular resources',
        'Expression of immunomodulatory proteins that inhibit IFN, complement, and apoptosis',
        'Ballooning degeneration of infected keratinocytes',
        'Acantholysis (loss of cell-cell adhesion)',
      ],
      tissueEffects: [
        'Characteristic deep-seated, well-circumscribed skin lesions',
        'Lesion progression: macule → papule → vesicle → pustule → crust',
        'Lymphadenopathy (distinguishing feature from smallpox)',
        'Mucosal lesions in oropharynx and anogenital region',
      ],
      systemicEffects: [
        'Viremia with spread to multiple organ systems',
        'Fever, malaise, and headache during prodrome',
        'Secondary bacterial infections of skin lesions',
        'Rare: encephalitis, pneumonitis, keratitis',
      ],
    },
    
    immuneResponse: [
      {
        phase: 'Innate Response',
        timing: 'Hours post-infection',
        description: 'NK cells and macrophages provide early defense. The virus encodes numerous proteins that antagonize innate immunity.',
        keyPlayers: ['NK cells', 'Macrophages', 'Complement', 'Type I IFN'],
      },
      {
        phase: 'T Cell Response',
        timing: '5-10 days',
        description: 'CD8+ T cells are critical for viral clearance. CD4+ T cells provide help and cytokine production.',
        keyPlayers: ['CD8+ CTLs', 'CD4+ Th1 cells', 'Memory T cells'],
      },
      {
        phase: 'Antibody Response',
        timing: '1-2 weeks',
        description: 'Neutralizing antibodies target the mature virion (MV) and extracellular enveloped virion (EV) forms.',
        keyPlayers: ['Neutralizing IgG', 'Complement-fixing antibodies'],
      },
    ],
    
    cytopathicEffects: [
      'Type A inclusion bodies (Guarnieri bodies) in cytoplasm',
      'Ballooning degeneration of keratinocytes',
      'Multinucleated giant cell formation',
      'Cell lysis and tissue necrosis',
    ],
    
    drugTargets: [
      {
        target: 'VP37 protein',
        mechanism: 'Inhibits virion wrapping and egress from infected cells',
        drugs: ['Tecovirimat (TPOXX)'],
      },
      {
        target: 'Viral DNA polymerase',
        mechanism: 'Nucleotide analog incorporation blocks DNA replication',
        drugs: ['Cidofovir', 'Brincidofovir'],
      },
      {
        target: 'Vaccinia immune globulin (VIG)',
        mechanism: 'Passive immunization with anti-orthopoxvirus antibodies',
        drugs: ['VIG-IV'],
      },
    ],
  },

  'avian-influenza-h5n1': {
    diseaseSlug: 'avian-influenza-h5n1',
    
    viralStructure: [
      { component: 'Hemagglutinin (HA/H5)', function: 'Receptor binding (sialic acid) and membrane fusion. Determines host tropism. Target of neutralizing antibodies.', targetable: true },
      { component: 'Neuraminidase (NA/N1)', function: 'Cleaves sialic acid to release virions. Target of oseltamivir and zanamivir.', targetable: true },
      { component: 'M2 ion channel', function: 'Proton channel for uncoating. Target of amantadine (but H5N1 usually resistant).', targetable: true },
      { component: 'RNA polymerase complex', function: 'PB1, PB2, PA subunits replicate and transcribe the segmented genome.', targetable: true },
      { component: 'Nucleoprotein (NP)', function: 'Encapsidates viral RNA segments.', targetable: false },
      { component: 'NS1 protein', function: 'Antagonizes host IFN response. Major virulence factor.', targetable: false },
      { component: 'PB1-F2', function: 'Pro-apoptotic protein contributing to pathogenicity.', targetable: false },
    ],
    
    genomeType: 'Negative-sense single-stranded RNA (-ssRNA), 8 segments',
    genomeSize: '~13.5 kb total (8 segments)',
    mutationRate: 'High (~10⁻³ substitutions/site/year). Antigenic drift via point mutations. Antigenic shift via reassortment.',
    
    cellEntry: {
      receptor: 'α2,3-linked sialic acid (avian-type receptor, found in human lower respiratory tract)',
      coreceptors: ['Host proteases for HA cleavage'],
      entryMechanism: 'Receptor-mediated endocytosis followed by pH-triggered membrane fusion',
      pathway: [
        {
          step: 1,
          title: 'HA Binding',
          description: 'Hemagglutinin binds to sialic acid receptors. H5N1 preferentially binds α2,3-linked sialic acids (avian-type), found in human lower respiratory tract, explaining severe pneumonia.',
          molecules: ['Hemagglutinin (HA)', 'α2,3-sialic acid'],
        },
        {
          step: 2,
          title: 'Endocytosis',
          description: 'Virus is internalized via clathrin-mediated endocytosis. The endosome acidifies as it matures.',
          molecules: ['Clathrin', 'Endosomal proton pumps'],
        },
        {
          step: 3,
          title: 'HA Cleavage & Activation',
          description: 'H5N1 HA contains a polybasic cleavage site (PQRERRRKKR↓G) cleaved by ubiquitous furin-like proteases. This enables systemic spread (key virulence factor).',
          molecules: ['Furin', 'PC5/6'],
        },
        {
          step: 4,
          title: 'Membrane Fusion',
          description: 'Low pH triggers conformational change in HA2, exposing fusion peptide. The viral and endosomal membranes fuse.',
          molecules: ['HA2 fusion peptide', 'Endosomal membrane'],
        },
        {
          step: 5,
          title: 'Uncoating',
          description: 'M2 ion channel allows protons into virion, disrupting M1-RNP interactions. vRNPs are released into cytoplasm.',
          molecules: ['M2 ion channel', 'M1 matrix protein'],
        },
        {
          step: 6,
          title: 'Nuclear Import',
          description: 'vRNPs are imported into nucleus where viral RNA polymerase performs transcription and replication.',
          molecules: ['Importins', 'vRNP', 'Viral RNA polymerase'],
        },
      ],
    },
    
    pathophysiology: {
      primaryTarget: 'Type II alveolar cells and alveolar macrophages',
      cellularEffects: [
        'High replication efficiency in lower respiratory tract',
        'NS1 protein blocks IFN production and PKR activation',
        'PB1-F2 induces mitochondrial-mediated apoptosis',
        'Aberrant cytokine production by infected macrophages',
      ],
      tissueEffects: [
        'Severe viral pneumonia with diffuse alveolar damage',
        'Hemorrhagic inflammation and edema',
        'Rapid progression to ARDS',
        'Extrapulmonary spread to brain, liver, intestines',
      ],
      systemicEffects: [
        'Hypercytokinemia ("cytokine storm") with markedly elevated IL-6, IL-8, IFN-γ, MCP-1',
        'Hemophagocytic lymphohistiocytosis (HLH)-like syndrome',
        'Multi-organ failure',
        'Disseminated intravascular coagulation (DIC)',
        'Lymphopenia and leukopenia',
      ],
    },
    
    immuneResponse: [
      {
        phase: 'Innate Response',
        timing: '0-3 days',
        description: 'Robust but dysregulated innate response. Excessive pro-inflammatory cytokine production (IL-6, TNF-α, IL-1β) contributes to pathology.',
        keyPlayers: ['Alveolar macrophages', 'Type I/III IFN', 'NK cells'],
      },
      {
        phase: 'Adaptive Response',
        timing: '5-7 days',
        description: 'T cell response is often insufficient to clear virus before severe damage occurs. CD8+ T cells target internal proteins (NP, M1).',
        keyPlayers: ['CD8+ T cells', 'CD4+ T cells', 'Dendritic cells'],
      },
      {
        phase: 'Antibody Response',
        timing: '7-14 days',
        description: 'Neutralizing antibodies against HA and NA. Cross-reactive antibodies from seasonal flu provide limited protection.',
        keyPlayers: ['HA-specific antibodies', 'NA-specific antibodies'],
      },
    ],
    
    cytopathicEffects: [
      'Apoptosis of infected epithelial cells and macrophages',
      'Detachment of ciliated epithelium',
      'Hemorrhagic necrosis of respiratory epithelium',
      'Neuronal necrosis in CNS infections',
    ],
    
    drugTargets: [
      {
        target: 'Neuraminidase (NA)',
        mechanism: 'Inhibits viral release from infected cells',
        drugs: ['Oseltamivir (Tamiflu)', 'Zanamivir (Relenza)', 'Peramivir'],
      },
      {
        target: 'Viral RNA polymerase (PA endonuclease)',
        mechanism: 'Inhibits cap-snatching required for viral mRNA synthesis',
        drugs: ['Baloxavir marboxil (Xofluza)'],
      },
      {
        target: 'M2 ion channel',
        mechanism: 'Blocks viral uncoating (note: most H5N1 strains are resistant)',
        drugs: ['Amantadine', 'Rimantadine'],
      },
    ],
  },

  'ebola': {
    diseaseSlug: 'ebola',
    
    viralStructure: [
      { component: 'Glycoprotein (GP)', function: 'Sole surface protein. Mediates receptor binding and membrane fusion. Major target of neutralizing antibodies.', targetable: true },
      { component: 'VP40', function: 'Matrix protein. Essential for virion assembly and budding. Most abundant protein.', targetable: false },
      { component: 'VP24', function: 'Secondary matrix protein. Potent IFN antagonist by blocking nuclear import of phospho-STAT1.', targetable: false },
      { component: 'VP35', function: 'Polymerase cofactor and IFN antagonist. Sequesters dsRNA to prevent PRR activation.', targetable: false },
      { component: 'NP', function: 'Nucleoprotein. Encapsidates the RNA genome.', targetable: false },
      { component: 'L protein', function: 'RNA-dependent RNA polymerase. Essential for genome replication and transcription.', targetable: true },
    ],
    
    genomeType: 'Negative-sense single-stranded RNA (-ssRNA)',
    genomeSize: '~19 kb',
    mutationRate: '~1-2 × 10⁻³ substitutions/site/year',
    
    cellEntry: {
      receptor: 'Niemann-Pick C1 (NPC1) in endolysosome (essential), TIM-1 and others for attachment',
      entryMechanism: 'Macropinocytosis followed by cathepsin-mediated GP processing and NPC1-dependent fusion',
      pathway: [
        {
          step: 1,
          title: 'Attachment',
          description: 'GP binds to attachment factors including TIM-1 (T-cell immunoglobulin and mucin domain 1), phosphatidylserine receptors, and C-type lectins.',
          molecules: ['GP', 'TIM-1', 'DC-SIGN', 'Axl'],
        },
        {
          step: 2,
          title: 'Macropinocytosis',
          description: 'Virus triggers actin-dependent macropinocytosis. Virions are internalized into large macropinosomes that mature into endolysosomes.',
          molecules: ['Actin', 'Rho GTPases', 'PI3K'],
        },
        {
          step: 3,
          title: 'GP Processing',
          description: 'In the acidic endolysosome, cathepsins B and L cleave GP, removing the mucin-like domain and exposing the receptor-binding site.',
          molecules: ['Cathepsin B', 'Cathepsin L'],
        },
        {
          step: 4,
          title: 'NPC1 Binding & Fusion',
          description: 'Processed GP binds to NPC1 cholesterol transporter in endolysosomal membrane. This triggers conformational changes leading to membrane fusion.',
          molecules: ['NPC1', 'Processed GP'],
        },
        {
          step: 5,
          title: 'Genome Release',
          description: 'Fusion releases the viral ribonucleoprotein complex into the cytoplasm where replication occurs.',
          molecules: ['Viral RNP', 'L polymerase'],
        },
      ],
    },
    
    pathophysiology: {
      primaryTarget: 'Monocytes, macrophages, and dendritic cells',
      cellularEffects: [
        'Productive infection of macrophages and dendritic cells',
        'Release of pro-inflammatory cytokines and chemokines',
        'Inhibition of IFN signaling by VP24 and VP35',
        'Infected dendritic cells fail to mature and activate T cells',
        'Shedding of soluble GP that acts as antibody decoy',
      ],
      tissueEffects: [
        'Focal necrosis in liver, spleen, kidneys, gonads',
        'Massive hepatocyte necrosis with elevated transaminases',
        'Lymphoid depletion and lymphocyte apoptosis (bystander)',
        'Endothelial dysfunction and increased vascular permeability',
        'Disseminated intravascular coagulation (DIC)',
      ],
      systemicEffects: [
        'Hypercytokinemia with elevated TNF-α, IL-1β, IL-6, IL-8, MCP-1',
        'Vascular leak syndrome with hypovolemic shock',
        'Hemorrhagic manifestations (petechiae, ecchymoses, mucosal bleeding)',
        'Multi-organ failure',
        'Massive fluid and electrolyte loss',
      ],
    },
    
    immuneResponse: [
      {
        phase: 'Suppressed Innate Response',
        timing: '0-5 days',
        description: 'VP24 and VP35 potently suppress IFN production and signaling. The virus replicates rapidly before adaptive immunity can develop.',
        keyPlayers: ['Type I IFN (suppressed)', 'Infected macrophages', 'NK cells'],
      },
      {
        phase: 'Adaptive Response (often delayed)',
        timing: '7-14 days',
        description: 'T and B cell responses are often too late to prevent death in fatal cases. Survivors develop robust T cell immunity.',
        keyPlayers: ['CD8+ T cells', 'CD4+ T cells', 'B cells'],
      },
      {
        phase: 'Lymphocyte Apoptosis',
        timing: 'Throughout infection',
        description: 'Bystander apoptosis of lymphocytes (not directly infected) contributes to immunosuppression and poor outcomes.',
        keyPlayers: ['T cells', 'NK cells', 'B cells'],
      },
    ],
    
    cytopathicEffects: [
      'Cytoplasmic inclusion bodies',
      'Cell rounding and detachment',
      'Apoptosis and necrosis',
      'Syncytia formation (limited)',
    ],
    
    drugTargets: [
      {
        target: 'Glycoprotein (GP)',
        mechanism: 'Neutralizing antibodies block receptor binding and/or membrane fusion',
        drugs: ['Inmazeb (atoltivimab + maftivimab + odesivimab)', 'Ebanga (ansuvimab)'],
      },
      {
        target: 'Viral RNA polymerase',
        mechanism: 'Nucleotide analog inhibits genome replication',
        drugs: ['Remdesivir (originally developed for Ebola)'],
      },
    ],
  },
};

// Detailed organ pathology information
export interface OrganPathology {
  organName: string;
  normalFunction: string;
  cellTypes: string[];
  diseaseEffects: {
    diseaseSlug: string;
    mechanism: string;
    cellularDamage: string[];
    histopathology: string[];
    clinicalManifestations: string[];
    longTermSequelae: string[];
    imagingFindings?: string[];
  }[];
}

export const organPathology: OrganPathology[] = [
  {
    organName: 'Lungs',
    normalFunction: 'Gas exchange - oxygen uptake and carbon dioxide elimination. The alveolar-capillary membrane (~70 m² surface area) facilitates diffusion.',
    cellTypes: ['Type I alveolar cells (gas exchange)', 'Type II alveolar cells (surfactant production)', 'Alveolar macrophages', 'Ciliated bronchial epithelium', 'Club cells', 'Pulmonary endothelium'],
    diseaseEffects: [
      {
        diseaseSlug: 'covid-19',
        mechanism: 'SARS-CoV-2 enters via ACE2 receptors highly expressed on Type II pneumocytes. Viral replication triggers inflammatory cascade with neutrophil infiltration, cytokine release, and diffuse alveolar damage.',
        cellularDamage: [
          'Type II pneumocyte necrosis and desquamation',
          'Loss of surfactant production leading to alveolar collapse',
          'Endothelial injury with increased permeability',
          'Neutrophil extracellular trap (NET) formation',
          'Intra-alveolar fibrin deposition',
        ],
        histopathology: [
          'Diffuse alveolar damage (DAD) - exudative and organizing phases',
          'Hyaline membrane formation',
          'Type II pneumocyte hyperplasia (attempted repair)',
          'Interstitial and intra-alveolar edema',
          'Microthrombi in pulmonary vessels',
          'Multinucleated syncytial cells',
        ],
        clinicalManifestations: [
          'Progressive hypoxemia (often "silent")',
          'Bilateral ground-glass opacities on CT',
          'ARDS in severe cases',
          'Pulmonary embolism',
          'Superimposed bacterial pneumonia',
        ],
        longTermSequelae: [
          'Pulmonary fibrosis',
          'Reduced diffusion capacity (DLCO)',
          'Chronic dyspnea and exercise intolerance',
          'Pulmonary vascular remodeling',
        ],
        imagingFindings: [
          'Ground-glass opacities (bilateral, peripheral)',
          'Crazy paving pattern',
          'Consolidation in severe/later disease',
          'Interstitial thickening',
          'Traction bronchiectasis (chronic)',
        ],
      },
      {
        diseaseSlug: 'avian-influenza-h5n1',
        mechanism: 'H5N1 preferentially binds α2,3-sialic acid receptors abundant in lower respiratory tract. The polybasic HA cleavage site enables systemic spread. Hypercytokinemia causes severe tissue damage.',
        cellularDamage: [
          'Massive epithelial cell death (Type I and II)',
          'Alveolar macrophage depletion',
          'Hemorrhagic necrosis',
          'Rapid loss of barrier function',
        ],
        histopathology: [
          'Severe hemorrhagic pneumonia',
          'Extensive alveolar damage and necrosis',
          'Hemophagocytosis in alveolar spaces',
          'Fibrinous exudates',
          'Vasculitis',
        ],
        clinicalManifestations: [
          'Rapid onset severe pneumonia',
          'Refractory hypoxemia',
          'ARDS within days of symptom onset',
          'Hemoptysis',
          'Multi-lobar involvement',
        ],
        longTermSequelae: [
          'Pulmonary fibrosis (in survivors)',
          'Chronic respiratory insufficiency',
          'Bronchiectasis',
        ],
      },
    ],
  },
  {
    organName: 'Heart',
    normalFunction: 'Pumps blood through systemic and pulmonary circulation. The myocardium contracts ~100,000 times daily, requiring continuous oxygen supply via coronary arteries.',
    cellTypes: ['Cardiomyocytes', 'Cardiac fibroblasts', 'Coronary endothelium', 'Conduction system cells', 'Cardiac pericytes'],
    diseaseEffects: [
      {
        diseaseSlug: 'covid-19',
        mechanism: 'Myocardial injury occurs through multiple mechanisms: direct viral infection via ACE2 on cardiomyocytes, cytokine-mediated damage, microvascular thrombosis, and hypoxia-induced injury. ACE2 downregulation leads to angiotensin II accumulation.',
        cellularDamage: [
          'Cardiomyocyte necrosis and apoptosis',
          'Endothelial dysfunction and activation',
          'Coronary microvascular thrombosis',
          'Mitochondrial dysfunction',
          'Inflammatory infiltrates (T cells, macrophages)',
        ],
        histopathology: [
          'Lymphocytic myocarditis',
          'Interstitial edema',
          'Focal myocyte necrosis',
          'Microvascular thrombi',
          'Pericarditis (some cases)',
        ],
        clinicalManifestations: [
          'Elevated troponin (up to 30% of hospitalized patients)',
          'Arrhythmias (AF, VT, bradycardia)',
          'Heart failure / cardiomyopathy',
          'Takotsubo syndrome',
          'Acute coronary syndrome',
        ],
        longTermSequelae: [
          'Persistent myocardial inflammation',
          'Post-COVID cardiomyopathy',
          'Increased risk of heart failure',
          'Palpitations and dysautonomia',
        ],
      },
      {
        diseaseSlug: 'ebola',
        mechanism: 'Ebola GP can bind to cardiac endothelium. Cytokine storm and DIC cause microvascular damage. Hypovolemic shock from vascular leak syndrome strains the heart.',
        cellularDamage: [
          'Endothelial injury and activation',
          'Microvascular thrombosis',
          'Myocardial depression from inflammatory mediators',
        ],
        histopathology: [
          'Interstitial edema',
          'Fibrin microthrombi',
          'Minimal direct viral involvement (heart relatively spared)',
        ],
        clinicalManifestations: [
          'Hypotension and shock',
          'Myocardial depression',
          'Arrhythmias',
          'ECG abnormalities',
        ],
        longTermSequelae: [
          'Most survivors recover cardiac function',
          'Persistent palpitations in some',
        ],
      },
    ],
  },
  {
    organName: 'Brain',
    normalFunction: 'Central command center for all bodily functions. Contains ~86 billion neurons forming complex networks for cognition, sensation, motor control, and autonomic regulation.',
    cellTypes: ['Neurons', 'Astrocytes', 'Microglia', 'Oligodendrocytes', 'Brain endothelium (BBB)', 'Ependymal cells'],
    diseaseEffects: [
      {
        diseaseSlug: 'covid-19',
        mechanism: 'Neurological involvement through: 1) Direct infection via ACE2 (olfactory epithelium, endothelium), 2) Parainfectious autoimmunity, 3) Cytokine-mediated neuroinflammation, 4) Coagulopathy causing stroke, 5) Hypoxic injury.',
        cellularDamage: [
          'Olfactory neuron infection and loss',
          'Microglial activation',
          'Astrocyte reactivity',
          'Blood-brain barrier disruption',
          'Neuronal injury (hypoxia, inflammation)',
        ],
        histopathology: [
          'Microglial nodules',
          'Hypoxic-ischemic changes',
          'Microthrombi',
          'Perivascular inflammation',
          'Olfactory bulb inflammation (some cases)',
        ],
        clinicalManifestations: [
          'Anosmia/hyposmia (60-80%)',
          'Ageusia/dysgeusia',
          'Headache',
          'Stroke (ischemic > hemorrhagic)',
          'Encephalopathy/delirium',
          'Guillain-Barré syndrome (rare)',
          'Brain fog (cognitive dysfunction)',
        ],
        longTermSequelae: [
          'Persistent anosmia/parosmia',
          'Cognitive impairment ("brain fog")',
          'Fatigue',
          'Anxiety and depression',
          'Dysautonomia (POTS)',
        ],
      },
    ],
  },
  {
    organName: 'Liver',
    normalFunction: 'Metabolic hub - synthesizes proteins (albumin, clotting factors), metabolizes drugs/toxins, produces bile, stores glycogen, regulates lipids. Receives dual blood supply (hepatic artery, portal vein).',
    cellTypes: ['Hepatocytes', 'Kupffer cells (liver macrophages)', 'Hepatic stellate cells', 'Sinusoidal endothelium', 'Cholangiocytes'],
    diseaseEffects: [
      {
        diseaseSlug: 'ebola',
        mechanism: 'The liver is a primary target of Ebola virus. Kupffer cells are early infection targets, leading to cytokine release. Hepatocytes are subsequently infected with massive necrosis.',
        cellularDamage: [
          'Kupffer cell infection and death',
          'Massive hepatocyte necrosis',
          'Sinusoidal congestion',
          'Loss of synthetic function',
        ],
        histopathology: [
          'Focal to confluent hepatocyte necrosis',
          'Councilman bodies (apoptotic hepatocytes)',
          'Cytoplasmic inclusion bodies',
          'Kupffer cell hypertrophy',
          'Minimal inflammatory infiltrate',
          'Microvesicular steatosis',
        ],
        clinicalManifestations: [
          'Markedly elevated AST, ALT (often >1000 U/L)',
          'Coagulopathy (decreased clotting factor synthesis)',
          'Jaundice',
          'Hepatic encephalopathy (severe cases)',
        ],
        longTermSequelae: [
          'Most survivors recover liver function',
          'Persistent hepatitis in some',
        ],
      },
      {
        diseaseSlug: 'covid-19',
        mechanism: 'Liver injury from drug toxicity, hypoxia/shock, cytokine-mediated damage, and possible direct viral infection (cholangiocytes express ACE2). Usually mild unless pre-existing liver disease.',
        cellularDamage: [
          'Hepatocyte injury (usually mild)',
          'Cholangiocyte damage',
          'Kupffer cell activation',
        ],
        histopathology: [
          'Mild lobular hepatitis',
          'Microvesicular steatosis',
          'Sinusoidal congestion',
          'Portal inflammation (mild)',
        ],
        clinicalManifestations: [
          'Elevated AST, ALT (usually <5x ULN)',
          'Cholestasis pattern in some',
          'Acute liver failure rare',
        ],
        longTermSequelae: [
          'Usually complete recovery',
          'Rare persistent enzyme elevation',
        ],
      },
    ],
  },
  {
    organName: 'Kidneys',
    normalFunction: 'Filter blood to remove waste, regulate fluid/electrolyte balance, control blood pressure (RAAS), produce erythropoietin, activate vitamin D. Each kidney contains ~1 million nephrons.',
    cellTypes: ['Podocytes', 'Proximal tubular cells', 'Distal tubular cells', 'Collecting duct cells', 'Glomerular endothelium', 'Mesangial cells', 'Juxtaglomerular cells'],
    diseaseEffects: [
      {
        diseaseSlug: 'covid-19',
        mechanism: 'AKI occurs in 20-40% of hospitalized patients. Mechanisms include: 1) Direct viral infection (ACE2 on proximal tubules), 2) Cytokine-mediated injury, 3) Hemodynamic (sepsis, hypoxia), 4) Drug nephrotoxicity, 5) Coagulopathy/microthrombi.',
        cellularDamage: [
          'Proximal tubular necrosis',
          'Podocyte injury',
          'Endothelial dysfunction',
          'Microthrombi in glomerular capillaries',
        ],
        histopathology: [
          'Acute tubular necrosis (ATN)',
          'Collapsing glomerulopathy (APOL1 risk)',
          'Thrombotic microangiopathy',
          'Viral inclusions in tubular cells (some cases)',
          'Pigmented casts (rhabdomyolysis)',
        ],
        clinicalManifestations: [
          'Elevated creatinine, BUN',
          'Oliguria or polyuria',
          'Proteinuria',
          'Hematuria',
          'Need for renal replacement therapy (~5% severe COVID)',
        ],
        longTermSequelae: [
          'Chronic kidney disease progression',
          'Persistent proteinuria',
          'End-stage renal disease (rare)',
        ],
      },
    ],
  },
  {
    organName: 'Skin',
    normalFunction: 'Barrier protection, thermoregulation, sensation, vitamin D synthesis, immune defense. Largest organ by surface area (~2 m²).',
    cellTypes: ['Keratinocytes', 'Melanocytes', 'Langerhans cells', 'Merkel cells', 'Dermal fibroblasts', 'Adipocytes (hypodermis)'],
    diseaseEffects: [
      {
        diseaseSlug: 'mpox',
        mechanism: 'Virus spreads via viremia to skin. Replication in keratinocytes causes characteristic lesion progression. The deep-seated lesions reflect dermal involvement.',
        cellularDamage: [
          'Keratinocyte infection and ballooning degeneration',
          'Acantholysis (loss of cell-cell adhesion)',
          'Dermal necrosis',
          'Langerhans cell infection',
        ],
        histopathology: [
          'Epidermal hyperplasia and spongiosis',
          'Ballooning degeneration of keratinocytes',
          'Eosinophilic cytoplasmic inclusions (Guarnieri bodies)',
          'Multinucleated giant cells',
          'Dermal edema and inflammation',
          'Hemorrhagic necrosis (severe)',
        ],
        clinicalManifestations: [
          'Synchronous, deep-seated lesions',
          'Lesion evolution: macule → papule → vesicle → pustule → crust',
          'Centrifugal distribution (face, extremities)',
          'Palms and soles often involved',
          'Mucosal lesions (oral, genital)',
          'Severe pain at lesion sites',
        ],
        longTermSequelae: [
          'Permanent scarring (pockmarks)',
          'Skin depigmentation or hyperpigmentation',
          'Keloid formation',
        ],
      },
    ],
  },
];
