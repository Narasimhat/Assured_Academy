# ASSURED Academy 🧬

> **Democratizing Human Pluripotent Stem Cell (hiPSC) Genome Engineering & Rare Disease Modeling**

[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Overview

**ASSURED Academy** is an open-access interactive learning platform, virtual wet-lab simulator, and protocol configurator designed to bridge the gap between computational CRISPR design and real-world stem cell bench execution.

Developed based on the **STAR Protocols ASSURED CRISPR workflow** from the **Max Delbrück Center for Molecular Medicine (MDC)** in Berlin, this platform is specifically tailored to empower students, clinicians, and researchers in underrepresented regions (India, Africa, Latin America, and globally).

It unites Dr. Narasimha Telugu's two live computational platforms into a complete end-to-end training and discovery ecosystem:
- [ASSURED CRISPR Designer](https://assured-crispr-design.vercel.app)
- [Assured QC (Sanger Trace Deconvolution)](https://assured-qc.vercel.app)

---

## Key Modules

### 1. 🎓 Interactive Curriculum Tracks (Khan Academy Style)
- **Track 1: From Patient to Pluripotency**: Somatic sourcing (PBMCs vs fibroblasts), non-integrating Sendai viral reprogramming, colony morphology dynamics, and trilineage/karyotype QC.
- **Track 2: The ASSURED Design Methodology**: Understanding p53-mediated double-strand break apoptosis, dual-guide selection, asymmetric ssODN donor kinetics (36/91 nt arms), and silent PAM/seed blocking mutations to prevent re-cutting.
- **Track 3: The Virtual Wet-Lab & Frugal Bench**: 70–80% exponential confluency checks, RNP assembly, nucleofection pulse parameters, and Y-27632 (ROCK inhibitor) anoikis rescue.
- **Track 4: Sanger QC & Deconvolution**: Capillary electrophoresis basics, mathematical deconvolution of mixed traces, and calling true homozygous knock-in clones vs compound heterozygotes and indels.

### 2. 🧪 Interactive Virtual Wet-Lab Simulator
- **Stage 1 (Confluency QC)**: Phase-contrast microscopy viewfinder with dynamic cell density slider.
- **Stage 2 (Nucleofection)**: RNP molar formulation and voltage pulse simulation with live viability and anoikis feedback.
- **Stage 3 (96-Well Sub-Cloning)**: Monoclonal colony screening comparing automated cell dispensers with frugal serial limiting dilution (0.5 cells/well).
- **Stage 4 (Sanger QC Bench)**: 4-color electrophoretic trace inspection to assign biological zygosity.

### 3. 🌍 Frugal Lab Protocol Configurator
- Recalculates reagent volumes and protocols for laboratories in low-resource environments.
- Replaces $150k automated cell dispensers with manual serial limiting dilution.
- Incorporates RFLP restriction enzyme pre-screening before Sanger sequencing, reducing project sequencing costs by **>75%**.
- Generates downloadable, printable Markdown Standard Operating Procedures (SOPs).

### 4. 🧬 Rare Disease Missions
- Curated clinical cases:
  - *HBB* p.Glu6Val (Sickle Cell Anemia)
  - *APOE* p.Arg176Cys (Alzheimer / Neurodegeneration)
  - *CACNB2* p.Ser426Leu (Brugada Syndrome Arrhythmia)
  - *CEP83* p.Gln261* (Renal Ciliopathy / Nephronophthisis)
- Complete with validated guide pairs, asymmetric ssODN templates with silent PAM blocks, and pre-packaged test fixtures.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (v9 or higher)

### Installation
```bash
# Clone the repository
git clone https://github.com/Narasimhat/Assured_Academy.git

# Enter project directory
cd Assured_Academy

# Install dependencies
npm install

# Start development server
npm run dev
```

### Local Multi-Tool Runners
```bash
# Run Assured QC locally
npm run dev:qc

# Run Assured CRISPR Designer locally
npm run dev:design
```

### Production Build
```bash
npm run build
npm run preview
```

---

## Author & Citation
- **Dr. Narasimha Telugu** — Max Delbrück Center for Molecular Medicine (MDC), Berlin.
- [Google Scholar Profile](https://scholar.google.com/citations?user=nN8TOfMAAAAJ&hl=en)
- Protocol reference: *ASSURED-optimized CRISPR protocol for knockout and SNP knock-in in human pluripotent stem cells*, STAR Protocols.
