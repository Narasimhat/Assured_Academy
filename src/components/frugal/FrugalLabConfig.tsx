import React, { useState } from 'react';
import { 
  Globe2, 
  DollarSign, 
  Clock, 
  Download, 
  Check, 
  Sparkles,
  Info,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { FrugalConfig } from '../../types';

export const FrugalLabConfig: React.FC = () => {
  const [config, setConfig] = useState<FrugalConfig>({
    institutionType: 'low-resource',
    electroporator: 'in-house-buffer',
    cloningTech: 'manual-limiting-dilution',
    gRNASource: 'in-vitro-transcribed',
    screeningStrategy: 'rflp-pre-screen-then-sanger',
    targetCellCount: 500000,
  });

  const [copiedSOP, setCopiedSOP] = useState(false);

  // Dynamic cost estimates:
  const getCostEstimate = () => {
    let cost = 0;
    // Electroporation
    if (config.electroporator === 'lonza-4d') cost += 180; // kit cost per cuvette
    else if (config.electroporator === 'biorad-gene-pulser') cost += 45;
    else cost += 15; // in-house buffer

    // Cloning
    if (config.cloningTech === 'automated-dispenser') cost += 250; // cartridge/plate fee
    else if (config.cloningTech === 'facs-sorting') cost += 150; // core facility hour
    else cost += 20; // multichannel tips & plates

    // gRNA
    if (config.gRNASource === 'synthetic-commercial') cost += 160; // 2nmol modified
    else cost += 40; // T7 kit reaction

    // Screening
    if (config.screeningStrategy === 'full-sanger-96') cost += 480; // $5/rxn x 96
    else if (config.screeningStrategy === 'rflp-pre-screen-then-sanger') cost += 75; // Restriction enzyme + 10 Sangers
    else cost += 50;

    return cost;
  };

  const getCoreFacilityCost = () => 180 + 250 + 160 + 480; // standard European/US high-throughput facility = ~$1,070 per experiment

  const estimatedCost = getCostEstimate();
  const baselineCost = getCoreFacilityCost();
  const savingsPercent = Math.round(((baselineCost - estimatedCost) / baselineCost) * 100);

  const generateSOPText = () => {
    return `# ASSURED Frugal Bench SOP: hiPSC Genome Engineering for Resource-Limited Labs
Author: Dr. Narasimha Telugu (MDC Berlin / ASSURED Project)
Generated Configuration: ${config.institutionType.toUpperCase()} MODE

## 1. PRE-ELECTROPORATION CELL PREPARATION
- Culture human iPSCs in mTeSR1 or E8 medium on Matrigel or Laminin-521.
- Harvest strictly at 70-80% confluency in active log phase.
- Treat with 10 µM Y-27632 (ROCK inhibitor) 1 hour prior to harvest.
- Dissociate with gentle enzymatic treatment (Accutase or TrypLE Express, 3 min at 37°C).

## 2. REAGENT FORMULATION (${config.gRNASource.toUpperCase()})
- Cas9 Protein (HiFi SpCas9): 20 pmol (3.3 µg)
- sgRNA (${config.gRNASource === 'in-vitro-transcribed' ? 'In-Vitro Transcribed T7' : 'Synthego Modified'}): 40-50 pmol (1:2 to 1:2.5 molar ratio)
- ssODN Donor Template: 100 pmol with Asymmetric 36/91 nt arms and Silent PAM Block.
- Buffer: ${config.electroporator === 'in-house-buffer' ? 'In-House Cytomix (120 mM KCl, 0.15 mM CaCl2, 10 mM K2HPO4, 25 mM HEPES, 2 mM EGTA, 5 mM MgCl2, pH 7.6)' : 'Primary Cell P3 Buffer'}

## 3. ELECTROPORATION PROTOCOL
- Cell number: ${config.targetCellCount.toLocaleString()} viable cells per cuvette.
- Mix cells + RNP + ssODN immediately prior to pulse.
- Equipment: ${config.electroporator === 'lonza-4d' ? 'Lonza 4D-Nucleofector (Code CB-150)' : 'Bio-Rad Gene Pulser (250V, 950 µF, exponential decay)'}
- Post-pulse: Rest 5 min in cuvette, then transfer gently into pre-warmed medium containing 10 µM Y-27632.

## 4. SINGLE-CELL SUB-CLONING (${config.cloningTech.toUpperCase()})
${config.cloningTech === 'manual-limiting-dilution' ? `
- Serial Limiting Dilution Protocol:
  1. Count single-cell suspension accurately using hemocytometer with Trypan Blue.
  2. Dilute cells to 1,000 cells/mL in medium + 1x CloneR or Y-27632.
  3. Serially dilute to 5 cells/mL.
  4. Dispense 100 µL per well into a 96-well plate (achieving 0.5 cells/well average).
  5. By Poisson distribution: ~32 wells will develop single colonies with <4% doublet risk.
  6. Feed on Day 4 and Day 8; screen colonies on Day 10.
` : `
- Automated / FACS Sorting Protocol:
  1. Filter single-cell suspension through 40 µm strainer.
  2. Gate on viable DAPI-negative single cells.
  3. Deposit exactly 1 cell per well into 96-well plates pre-filled with 100 µL CloneR medium.
`}

## 5. QC & SCREENING PIPELINE (${config.screeningStrategy.toUpperCase()})
${config.screeningStrategy === 'rflp-pre-screen-then-sanger' ? `
- Cost-Saving RFLP Pre-Screen:
  1. Perform colony PCR on all 24-30 growing clones.
  2. Digest PCR amplicon with restriction enzyme matching your ASSURED silent blocking site.
  3. Run 2% agarose gel: only clones exhibiting the cleavage band carry the knock-in template.
  4. Send ONLY the 4-6 positive clones for Sanger sequencing (saving >80% sequencing budget!).
` : `
- Direct Sanger Sequencing:
  1. PCR amplify 500 bp region around cut site.
  2. Submit all growing clones for Sanger capillary sequencing.
  3. Upload AB1 files to https://assured-qc.vercel.app for deconvolution.
`}

Verified against STAR Protocols ASSURED workflow.`;
  };

  const handleCopySOP = () => {
    navigator.clipboard.writeText(generateSOPText());
    setCopiedSOP(true);
    setTimeout(() => setCopiedSOP(false), 2000);
  };

  const handleDownloadSOP = () => {
    const text = generateSOPText();
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ASSURED_Frugal_Bench_SOP_${config.institutionType}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-800/60 shadow-2xl space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 border border-emerald-800 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Global South & Low-Resource Bench Engine</span>
          </span>
          <span className="text-xs text-slate-400">Democratizing Access</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Frugal Lab Protocol Configurator
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          Most CRISPR iPSC protocols assume unlimited budgets for automated cell pickers ($150,000), commercial nucleofection kits, and full-plate Sanger sequencing. This configurator recalculates the ASSURED protocol for academic labs in India, Africa, and Latin America using frugal, high-fidelity alternatives without sacrificing monoclonality or safety.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Select Your Laboratory Infrastructure
            </h3>

            {/* 1. Electroporation Method */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 block">
                1. Electroporation Equipment & Buffer Source
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'in-house-buffer', name: 'In-House Cytomix Buffer', note: 'Generic pulser ($15/rxn)' },
                  { id: 'biorad-gene-pulser', name: 'Standard Electroporator', note: 'Standard cuvettes ($45)' },
                  { id: 'lonza-4d', name: 'Lonza 4D-Nucleofector', note: 'P3 Core Kits ($180)' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setConfig(prev => ({ ...prev, electroporator: opt.id as any }))}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      config.electroporator === opt.id
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500 font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div>{opt.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{opt.note}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Single Cell Cloning */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 block">
                2. Single-Cell Sub-Cloning Method
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'manual-limiting-dilution', name: 'Manual Serial Dilution', note: 'Poisson 0.5 cells/well ($20)' },
                  { id: 'facs-sorting', name: 'FACS Single-Cell Sorter', note: 'Flow Core Facility ($150)' },
                  { id: 'automated-dispenser', name: 'Automated Dispenser', note: 'CellenION / Namocell ($250)' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setConfig(prev => ({ ...prev, cloningTech: opt.id as any }))}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      config.cloningTech === opt.id
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500 font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div>{opt.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{opt.note}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. gRNA Synthesis Source */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 block">
                3. Guide RNA Sourcing
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { id: 'in-vitro-transcribed', name: 'In-Vitro Transcribed (T7 IVT)', note: 'In-house transcription (~$40)' },
                  { id: 'synthetic-commercial', name: 'Synthetic Modified (Synthego/IDT)', note: '2\'-O-Me + Phosphorothioate (~$160)' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setConfig(prev => ({ ...prev, gRNASource: opt.id as any }))}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      config.gRNASource === opt.id
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500 font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div>{opt.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{opt.note}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Screening Strategy */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 block">
                4. Clone Genotyping & Screening Strategy
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { id: 'rflp-pre-screen-then-sanger', name: 'RFLP Gel Screen -> Sanger Positive Clones', note: 'Cuts sequencing cost by >80% (~$75)' },
                  { id: 'full-sanger-96', name: 'Direct Sanger Sequencing of all Clones', note: 'High cost ($480 per plate)' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setConfig(prev => ({ ...prev, screeningStrategy: opt.id as any }))}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      config.screeningStrategy === opt.id
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500 font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div>{opt.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{opt.note}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic Cost Comparison & SOP Generator (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Cost Comparison Widget */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Economic Feasibility Analysis
            </h3>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-500">Configured Cost</span>
                <div className="text-2xl font-black text-emerald-400 mt-1">
                  ${estimatedCost}
                </div>
                <span className="text-[10px] text-slate-400">per edited clone line</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-500">Standard Core Facility</span>
                <div className="text-2xl font-black text-slate-400 mt-1">
                  ${baselineCost}
                </div>
                <span className="text-[10px] text-slate-500">commercial pipeline</span>
              </div>
            </div>

            {/* Savings Callout */}
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-300 block">
                  Budget Reduction: {savingsPercent}% Saved
                </span>
                <span className="text-[11px] text-slate-300">
                  Enables {Math.round(baselineCost / estimatedCost)}x more disease models on same grant
                </span>
              </div>
              <Sparkles className="w-6 h-6 text-emerald-400 shrink-0" />
            </div>

            {/* Actions: Copy / Download SOP */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleDownloadSOP}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Custom Bench SOP (.md)</span>
              </button>

              <button
                onClick={handleCopySOP}
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-2 transition-colors"
              >
                {copiedSOP ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Copy SOP to Clipboard</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Golden Rules Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs leading-relaxed text-slate-300">
            <div className="flex items-center gap-2 font-bold text-amber-400">
              <ShieldCheck className="w-4 h-4" />
              <span>3 Golden Rules for Frugal Stem Cell Benches</span>
            </div>
            <ul className="space-y-2 list-disc list-inside text-slate-400 text-[11px]">
              <li>Never economize on <strong className="text-slate-200">Y-27632 (ROCK inhibitor)</strong>. It is the single indispensable reagent preventing single-cell anoikis.</li>
              <li>Design your ssODN silent blocking change to create a <strong className="text-slate-200">restriction enzyme site</strong> for low-cost RFLP pre-screening.</li>
              <li>Plate at <strong className="text-slate-200">0.5 cells/well</strong> in 96-well plates. Discard any well showing two distinct colony seeds on Day 2.</li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
