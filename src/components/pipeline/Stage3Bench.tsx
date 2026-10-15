import React, { useState } from 'react';
import { 
  FlaskConical, 
  Calculator, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  Clock, 
  Sparkles,
  Info
} from 'lucide-react';
import { AssuredProject } from '../../types/pipeline';

interface Stage3BenchProps {
  project: AssuredProject;
  onUpdateProject: (updated: AssuredProject) => void;
  onProceed: () => void;
}

export const Stage3Bench: React.FC<Stage3BenchProps> = ({
  project,
  onUpdateProject,
  onProceed
}) => {
  const bench = project.bench;
  const isKnockout = project.target.targetType === 'KNOCKOUT' || !project.target.donor?.sequence || project.target.donor.sequence === 'N/A';
  const [cuvettes, setCuvettes] = useState(bench.cuvettesCount || 2);
  const [cellsPerCuvette, setCellsPerCuvette] = useState(bench.cellsPerCuvette || 500000);
  const [confluency, setConfluency] = useState(bench.cellConfluencyRecorded || 75);

  // Dynamic calculations based on STAR Protocols formula:
  // Per cuvette: 20 pmol Cas9 = ~1.0 µL (at 20 µM / 3.3 µg)
  // 40 pmol sgRNA (1:2 ratio) = ~1.5 µL (at 30 µM)
  // 100 pmol ssODN = ~1.0 µL (at 100 µM) - Omitted for NHEJ KO
  // P3 Buffer = 20 µL per cuvette
  const cas9Total = (cuvettes * 1.0).toFixed(1);
  const gRNATotal = (cuvettes * 1.5).toFixed(1);
  const ssodnTotal = isKnockout ? '0.0' : (cuvettes * 1.0).toFixed(1);
  const p3Total = cuvettes * 20;

  const handleUpdate = () => {
    onUpdateProject({
      ...project,
      bench: {
        ...bench,
        cuvettesCount: cuvettes,
        cellsPerCuvette,
        cellConfluencyRecorded: confluency,
        cas9AmountUler: Number(cas9Total),
        gRNAAmountUler: Number(gRNATotal),
        ssodnAmountUler: Number(ssodnTotal),
        isBenchCompleted: true
      }
    });
    onProceed();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <FlaskConical className="w-4 h-4" />
            <span>Stage 3: STAR Protocols Wet-Lab Bench Companion</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            MDC Berlin Validated SOP
          </span>
        </div>
        <h2 className="text-2xl font-black text-white">
          Executing the Wet-Lab Protocol for {project.target.gene}
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          Follow the day-by-day protocol to execute nucleofection, protect against p53-mediated apoptosis using ROCK inhibitor, and isolate single-cell clones via limiting dilution without needing a $150,000 automated cell picker.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Dynamic Pipetting Formulation Calculator (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
              <Calculator className="w-4 h-4" />
              <span>Pipetting Master Mix Calculator</span>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-300 flex justify-between">
                  <span>Number of Nucleofection Cuvettes:</span>
                  <span className="text-cyan-400 font-mono font-bold">{cuvettes}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={cuvettes}
                  onChange={(e) => setCuvettes(Number(e.target.value))}
                  className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 flex justify-between">
                  <span>Target Cell Density per Cuvette:</span>
                  <span className="text-cyan-400 font-mono font-bold">{cellsPerCuvette.toLocaleString()}</span>
                </label>
                <select
                  value={cellsPerCuvette}
                  onChange={(e) => setCellsPerCuvette(Number(e.target.value))}
                  className="w-full mt-1 p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200"
                >
                  <option value={300000}>300,000 cells (Conservative)</option>
                  <option value={500000}>500,000 cells (Standard STAR Protocol)</option>
                  <option value={800000}>800,000 cells (High Density)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 flex justify-between">
                  <span>Recorded hiPSC Confluency:</span>
                  <span className="text-emerald-400 font-mono font-bold">{confluency}%</span>
                </label>
                <input
                  type="range"
                  min="50"
                  max="90"
                  value={confluency}
                  onChange={(e) => setConfluency(Number(e.target.value))}
                  className="w-full accent-emerald-400 h-2 bg-slate-800 rounded-lg cursor-pointer mt-1"
                />
                <span className="text-[10px] text-slate-500">Target: 70–80% (Exponential log-phase growth)</span>
              </div>
            </div>

            {/* Formulated Volumes Output Box */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs font-mono">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-sans">
                Master Mix Pipetting Table ({cuvettes} Reactions)
              </span>

              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-300">Alt-R Cas9 HiFi V3 (20 µM):</span>
                <span className="font-bold text-cyan-400">{cas9Total} µL ({cuvettes * 20} pmol)</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-300">sgRNA (30 µM, 1:2 ratio):</span>
                <span className="font-bold text-cyan-400">{gRNATotal} µL ({cuvettes * 40} pmol)</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-300">ssODN Donor (100 µM):</span>
                <span className={`font-bold ${isKnockout ? 'text-slate-500 line-through' : 'text-emerald-400'}`}>
                  {isKnockout ? '0.0 µL (Omitted for KO)' : `${ssodnTotal} µL (${cuvettes * 100} pmol)`}
                </span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-slate-300">P3 Nucleofection Buffer:</span>
                <span className="font-bold text-white">{p3Total} µL</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 text-[11px] text-amber-200/90 leading-relaxed">
              💡 <strong>Incubation Rule:</strong> Pre-incubate Cas9 + sgRNA for 10 minutes at room temperature to allow RNP complex assembly before adding cells{!isKnockout ? ' and ssODN' : ''}.
            </div>
          </div>
        </div>

        {/* Day-by-Day Bench Timeline (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Day-by-Day Experimental Roadmap</span>
            </div>

            <div className="space-y-3">
              {[
                {
                  day: 'Day -2',
                  title: 'Thaw & Culture hiPSCs',
                  desc: 'Coat 6-well plates with Geltrex (1:100). Maintain colonies in StemFlex/mTeSR Plus. Confirm undifferentiated morphology.',
                  time: '30 min'
                },
                {
                  day: 'Day 0',
                  title: 'RNP Nucleofection & ROCKi Rescue',
                  desc: 'Harvest cells at 70-80% confluency with Accutase. Electroporate using Lonza program CB-150. Immediately plate in medium with 10 µM Y-27632 to rescue p53 anoikis.',
                  time: '2 hours'
                },
                {
                  day: 'Day 1–3',
                  title: 'Post-Electroporation Recovery',
                  desc: 'Feed with fresh medium daily. Gradually withdraw ROCK inhibitor on Day 2 as colonies stabilize.',
                  time: '15 min/day'
                },
                {
                  day: 'Day 4',
                  title: 'Frugal Single-Cell Sub-Cloning',
                  desc: 'Serially dilute cells to 5 cells/mL in CloneR2 medium. Dispense 100 µL/well into 96-well plates (0.5 cells/well average) to ensure pure monoclonality.',
                  time: '45 min'
                },
                {
                  day: 'Day 10',
                  title: 'Colony Screening & PCR',
                  desc: 'Inspect 96-well plate under microscope. Mark single round colonies. Lyse 1/3 of cells for PCR and Sanger sequencing.',
                  time: '1.5 hours'
                }
              ].map((step, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="w-16 shrink-0 font-mono text-xs font-bold text-cyan-400 bg-slate-900 px-2 py-1 rounded text-center border border-slate-800">
                    {step.day}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{step.title}</span>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        {step.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Advance Button */}
            <button
              onClick={handleUpdate}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-95 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all mt-4"
            >
              <span>Bench Protocol Completed — Proceed to Sanger QC (Stage 4)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
