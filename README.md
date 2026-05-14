# PANDEMOS

A real-time disease surveillance and educational platform for pandemic preparedness.

## Features

### War Room - Global Disease Monitoring
- Interactive world map with real-time outbreak data
- Filter by disease type and severity level
- Detailed outbreak information with source attribution
- Timeline scrubber for historical data visualization

### Disease Catalog
- Comprehensive database of infectious diseases including:
  - COVID-19, Mpox, H5N1 Avian Influenza, Ebola, Marburg
  - Cholera, Dengue, Yellow Fever, Measles, Plague
  - Tuberculosis, Malaria, HIV/AIDS, Hepatitis, Rabies
  - And many more...
- Each disease page includes:
  - Quick facts (pathogen type, R0, fatality rate, transmission)
  - Body systems affected with detailed pathophysiology
  - Symptom progression phases
  - Discovery timeline with historical context
  - Treatment and vaccine information
  - Links to official sources

### Educational Center (Learn)
- Interactive guides on:
  - Understanding Pathogens (viruses, bacteria, fungi, parasites)
  - How Vaccines Work (mRNA, viral vector, inactivated, live attenuated)
  - Reading Epidemic Curves (R0, curve shapes, lag indicators)
  - Source Credibility (evaluating health information)
  - Zoonotic Diseases (spillover events, reservoir hosts)
  - Antimicrobial Resistance (the silent pandemic)
- Interactive historical pandemic timeline
- Comprehensive glossary of epidemiology terms

### Sources & Credibility
- 5-tier credibility rating system
- Direct links to all data sources including:
  - WHO, CDC, ECDC, Africa CDC, PAHO
  - The Lancet, NEJM, Nature, Science, JAMA
  - GISAID, Nextstrain, Our World in Data
  - MSF, UNICEF, GAVI

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **Maps**: Custom SVG map with NASA satellite imagery background
- **State Management**: Zustand

## Design

The site features an Apple-inspired glass morphism design with:
- Semi-transparent backgrounds with backdrop blur
- Clean typography and consistent spacing
- Dark/light mode support
- Responsive design for all screen sizes

## Data Sources

All data is aggregated from official public health sources:
- World Health Organization (WHO)
- U.S. Centers for Disease Control (CDC)
- European Centre for Disease Prevention and Control (ECDC)
- Africa Centres for Disease Control and Prevention
- National health ministries worldwide
- Peer-reviewed medical journals

## Disclaimer

PANDEMOS is for **educational purposes only** and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified health providers with questions regarding medical conditions.

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## License

MIT

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.
