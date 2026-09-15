# GIIN — Global Integrity Intelligence Network

**A real-time financial intelligence and OSINT platform for exposing public procurement fraud, shell company networks, and corruption risk before the money disappears.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-active%20development-orange.svg)]()

---

## Screenshot

![GIIN Overview Dashboard]
<img width="1362" height="637" alt="image" src="https://github.com/user-attachments/assets/26139c29-3e47-42cf-b599-a8c9e3a38a23" />

*National intelligence overview — flagged capital, satellite discrepancies, shell-layer detection, and live risk scoring in one command center.*

---

## Overview

Corruption rarely announces itself. It hides in split payments, inflated progress reports, and ownership structures deliberately built to obscure who really benefits. **GIIN** was built to pull that trail into the light.

It's a dark, command-center-style intelligence dashboard for anti-corruption agencies, financial intelligence units (FIUs), investigative journalists, and public audit bodies — unifying procurement auditing, financial flow tracing, entity network mapping, and satellite-based ground-truth verification into a single investigative workspace.

At its core, GIIN answers one question investigators ask every day: **does the paper trail match physical and financial reality?**

## Key Capabilities

- **Shell Company Network Detection** — Unravels layered ownership, familial ties, and beneficial owners connecting public officials to the contractors winning their tenders.
- **Financial Fraud & Structuring Detection** — Surfaces split transactions designed to dodge audit thresholds, duplicate invoices, and circular payment loops that terminate in offshore accounts.
- **Satellite-Verified Ground Truth** — Compares claimed project completion against satellite imagery to catch phantom construction and inflated progress reports.
- **Predictive Risk Engine** — Flags corruption risk 30–60 days ahead of time using behavioral signals: unusual approval speed, shifting travel patterns, and sudden offshore activity.
- **Case & Investigation Management** — A digital war room for building cases, organizing evidence, tracking investigative progress, and assigning personnel.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Custom CSS — dark "command center" design system |
| Network Graphs | D3.js |
| Mapping / GIS | Leaflet + React-Leaflet |
| Charts & Analytics | Recharts |
| Icons | Lucide React |

## Project Structure

```
giin/
├── public/                  # Static assets & SVG icons
├── src/
│   ├── assets/               # Logos & graphic media
│   ├── components/
│   │   ├── NavSidebar.jsx    # Sidebar navigation & module switcher
│   │   └── TopBar.jsx        # Header: search, breadcrumbs, alerts, profile
│   ├── data/
│   │   └── mockData.js       # Mock dataset (alerts, contracts, networks, investigations)
│   ├── App.jsx                # Application shell
│   ├── App.css
│   ├── index.css              # Design system, tokens & animations
│   └── main.jsx                # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Modules

| # | Module | What it does |
|---|---|---|
| 1 | **Overview** | National dashboard surfacing top-level risk metrics and a live anomaly feed |
| 2 | **Procurement Contracts** | Audits tenders for vendor concentration and suspicious approval-time anomalies |
| 3 | **Financial Flow Intelligence** | Traces fund movement and flags structuring or circular routing |
| 4 | **Entity Network Graph** | Interactive graph linking officials, vendors, and shell entities |
| 5 | **Satellite Verification** | Compares claimed vs. satellite-verified project completion |
| 6 | **Predictive Risk Engine** | ML-driven early-warning forecasting for emerging risk |
| 7 | **Active Investigations** | Case management workspace for active probes |

## Risk Tiering

| Tier | Score | Signals |
|---|---|---|
| 🔴 Critical | 80–100 | Confirmed shell network, severe satellite variance, offshore routing |
| 🟠 High | 60–79 | Transaction structuring, related-party vendors, rapid-fire approvals |
| 🟡 Medium | 40–59 | Ghost worker indicators, mild delays, duplicate invoice attempts |
| 🟢 Low | 0–39 | Routine transactions with minor administrative flags |

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

## Roadmap / Status

GIIN currently runs on a mock dataset for demonstration and UI development. Planned next steps include live integrations with:

- Public procurement registries
- Banking / financial transaction feeds
- Satellite imagery providers (e.g., Sentinel, Planet Labs)
- Corporate registries for beneficial ownership verification

## Contributing

Issues and pull requests are welcome. If you're extending a module (e.g., wiring in a real data source), please open an issue first to discuss scope.

## License

MIT
