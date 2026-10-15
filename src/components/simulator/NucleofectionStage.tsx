import React, { useState } from 'react';
import { 
  Zap, 
  ShieldAlert, 
  CheckCircle2, 
  RotateCcw, 
  ArrowRight,
  Sparkles,
  Dna
} from 'lucide-react';
import { VirtualLabState } from '../../types';

interface NucleofectionStageProps {
  labState: VirtualLabState;
  updateLabState: (updates: Partial<VirtualLabState>) => void;
  onProceed: () => void;
}

export const NucleofectionStage: React.FC<NucleofectionStageProps> = ({
  labState,
  updateLabState,
  onProceed
}) => {
  const [isPulsing, setIsPulsing] = useState(false);
  const [pulseCompleted, setPulseCompleted] = useState(labState.hasRunElectroporation);

  const handlePulse = () => {
    setIsPulsing(true);
    setTimeout(() => {
      setIsPulsing(false);
      setPulseCompleted(true);
      updateLabState({ hasRunElectroporation: true });
    }, 1200);
  };

  const handleResetPulse = () => {
    setPulseCompleted(false);
    updateLabState({ hasRunElectroporation: false });
  };

  // Calculations based on choices:
  const isRockInhibitorPresent = labState.usedRockInhibitor;
  const isRatioGood = labState.rnpRatio === '1:2' || labState.rnpRatio === '1:3';
  const isProgramGood = labState.electroporationProgram === 'CB-150';

  const viability = !isRockInhibitorPresent 
    ? 4 
    : isProgramGood 
    ? 84 
    : 45;

  const editingEfficiency = !isRockInhibitorPresent 
    ? 1 
    : isRatioGood 
    ? 38 
    : 16;

  return (
    <div className="space-y-6">
      
      {/* Intro Header */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
          <Zap className="w-4 h-4" />
          <span>Stage 2: RNP Assembly & Nucleofection Pulse</span>
        </div>
        <h3 className="text-lg font-bold text-white">
          Formulate Cas9-sgRNA RNP Complex & Electroporate
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Pre-complex SpCas9 protein with modified synthetic sgRNA to form ribonucleoprotein (RNP) complexes before adding the ssODN repair template. Set voltage pulse parameters and supplement recovery media to counter p53 apoptosis and anoikis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Parameters Form (6 cols) */}
        <div className="md:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Reaction Formulation
            </h4>

            {/* RNP Molar Ratio */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 flex justify-between">
                <span>Cas9 Protein : sgRNA Molar Ratio</span>
                <span className="text-cyan-400">{labState.rnpRatio}</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['1:1', '1:2', '1:3', '1:5'] as const).map(ratio => (
                  <button
                    key={ratio}
                    disabled={pulseCompleted}
                    onClick={() => updateLabState({ rnpRatio: ratio })}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                      labState.rnpRatio === ratio
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                        : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500">
                * 1:2 to 1:3 guarantees 100% saturation of Cas9 protein, leaving no uncomplexed nuclease.
              </p>
            </div>

            {/* Pulse Program */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 flex justify-between">
                <span>4D-Nucleofector Pulse Code</span>
                <span className="text-cyan-400 font-mono">{labState.electroporationProgram}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  disabled={pulseCompleted}
                  onClick={() => updateLabState({ electroporationProgram: 'CB-150' })}
                  className={`p-3 text-left rounded-xl border text-xs transition-all ${
                    labState.electroporationProgram === 'CB-150'
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-200'
                      : 'bg-slate-800/60 border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="font-bold">CB-150 (Standard)</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">High survival, balanced HDR</div>
                </button>
                <button
                  disabled={pulseCompleted}
                  onClick={() => updateLabState({ electroporationProgram: 'CA-137' })}
                  className={`p-3 text-left rounded-xl border text-xs transition-all ${
                    labState.electroporationProgram === 'CA-137'
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-200'
                      : 'bg-slate-800/60 border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="font-bold">CA-137 (High Cut)</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Max cut rate, lower survival</div>
                </button>
              </div>
            </div>

            {/* CRITICAL STEP: ROCK Inhibitor Toggle */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">
                    ROCK Inhibitor Rescue (Y-27632 / CloneR)
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Pre- and post-electroporation media supplementation
                  </span>
                </div>
                <input
                  type="checkbox"
                  disabled={pulseCompleted}
                  checked={labState.usedRockInhibitor}
                  onChange={(e) => updateLabState({ usedRockInhibitor: e.target.checked })}
                  className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                />
              </div>
              <p className="text-[11px] text-amber-300/80">
                ⚠️ Critical MDC Step: Human iPSCs undergo fatal anoikis upon single-cell dissociation. Skipping Y-27632 triggers &gt;95% cell death within 24 hours.
              </p>
            </div>

            {/* ssODN Architecture Display */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs flex items-center gap-2 text-slate-400">
              <Dna className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>ssODN includes: <strong className="text-emerald-400">Silent PAM Block</strong> + <strong className="text-cyan-400">Asymmetric 36/91 nt arms</strong></span>
            </div>

            {/* Action Trigger */}
            {!pulseCompleted ? (
              <button
                disabled={isPulsing}
                onClick={handlePulse}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
                  isPulsing 
                    ? 'bg-amber-400 text-slate-950 animate-pulse' 
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-95 text-slate-950 shadow-cyan-500/20'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>{isPulsing ? 'Delivering CB-150 Voltage Pulse...' : 'Deliver Electroporation Pulse'}</span>
              </button>
            ) : (
              <button
                onClick={handleResetPulse}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reconfigure & Retest Pulse</span>
              </button>
            )}

          </div>
        </div>

        {/* Pulse Chamber Visualizer & Diagnostics (6 cols) */}
        <div className="md:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center relative overflow-hidden min-h-[300px] flex flex-col items-center justify-center">
            
            {/* Cuvette Glow Graphic */}
            <div className="relative my-4">
              <div className={`w-28 h-40 rounded-xl border-4 transition-all duration-300 flex flex-col items-center justify-end p-2 ${
                isPulsing 
                  ? 'border-cyan-300 bg-cyan-400/30 shadow-[0_0_60px_rgba(34,211,238,0.8)] scale-105' 
                  : pulseCompleted 
                  ? 'border-slate-700 bg-slate-900/80' 
                  : 'border-slate-800 bg-slate-900/40'
              }`}>
                {/* Cuvette Aluminum Electrodes */}
                <div className="absolute top-2 left-1 bottom-2 w-2 bg-slate-400 rounded-sm"></div>
                <div className="absolute top-2 right-1 bottom-2 w-2 bg-slate-400 rounded-sm"></div>
                
                {/* Cell suspension fluid */}
                <div className={`w-full rounded-b-lg transition-all duration-500 ${
                  isPulsing 
                    ? 'h-24 bg-cyan-400/80 animate-ping' 
                    : pulseCompleted 
                    ? isRockInhibitorPresent ? 'h-24 bg-emerald-500/40' : 'h-24 bg-rose-500/40'
                    : 'h-24 bg-cyan-600/30'
                }`} />
              </div>
            </div>

            <div className="text-xs font-mono text-slate-400">
              {isPulsing ? '⚡ VOLTAGE DISCHARGE: 500V / 20ms' : pulseCompleted ? 'PULSE DELIVERED' : 'Awaiting Electroporation'}
            </div>
          </div>

          {/* Results Analysis */}
          {pulseCompleted && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 animate-in fade-in">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[11px] text-slate-400 uppercase font-bold">Post-Pulse Viability</div>
                  <div className={`text-2xl font-black mt-1 ${viability > 50 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {viability}%
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[11px] text-slate-400 uppercase font-bold">Estimated HDR Rate</div>
                  <div className={`text-2xl font-black mt-1 ${editingEfficiency > 20 ? 'text-cyan-400' : 'text-amber-400'}`}>
                    {editingEfficiency}%
                  </div>
                </div>
              </div>

              {/* Diagnosis */}
              {!isRockInhibitorPresent ? (
                <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800 text-xs text-rose-200 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-rose-400">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Catastrophic Apoptosis (Anoikis)</span>
                  </div>
                  <p>
                    Because Y-27632 (ROCK inhibitor) was omitted, single-cell dissociation followed by electric shock triggered irreversible caspase-3 cascade. Over 95% of cells have died. Toggle ROCK inhibitor and retry!
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-200 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>High Viability & Target Cleavage</span>
                  </div>
                  <p>
                    Cells protected by Y-27632 are viable and dividing. RNP complex has cleaved the target genomic locus. Ready to plate for monoclonal sub-cloning!
                  </p>
                </div>
              )}

              {isRockInhibitorPresent && (
                <button
                  onClick={onProceed}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-95 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
                >
                  <span>Advance to 96-Well Sub-Cloning (Stage 3)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
