# PANDEMOS

Real-time global disease surveillance and outbreak monitoring platform.

## Features

- **Interactive Satellite Map**: Zoomable, real-time outbreak visualization using ESRI World Imagery
- **15+ Diseases Tracked**: COVID-19, Mpox, H5N1, Ebola, Marburg, Cholera, Dengue, Malaria, TB, HIV/AIDS, Rabies, Measles, Lassa Fever, Yellow Fever, Nipah
- **War Room**: Live outbreak monitoring with severity indicators and source credibility tiers
- **Disease Database**: Comprehensive profiles with transmission methods, symptoms by phase, affected organs, treatments
- **Educational Center**: Interactive guides on pathogens, vaccines, epidemic curves, source credibility, zoonotic diseases, AMR
- **Glossary**: 34 key epidemiology terms with expandable definitions
- **Historical Timeline**: 14 major pandemics from 430 BC to present

## Design

- Apple-inspired glass morphism UI
- Dark theme with semi-transparent components
- Backdrop blur effects throughout
- No gray components - all glass/transparent
- Monochrome icons (no emojis in UI)

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- Leaflet for interactive maps
- Framer Motion
- Zustand for state
- Recharts for data visualization

## Data Sources

Tier 1 (Gold Standard):
- World Health Organization (WHO)
- U.S. Centers for Disease Control (CDC)
- European CDC
- The Lancet, NEJM, Nature

Tier 2 (Highly Credible):
- Africa CDC
- National health authorities
- ProMED-mail

## Getting Started

```bash
npm install
npm run dev
```

## License

MIT
