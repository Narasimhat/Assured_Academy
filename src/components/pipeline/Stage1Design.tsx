import React, { useState } from 'react';
import { 
  Dna, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Info,
  ExternalLink
} from 'lucide-react';
import { AssuredProject } from '../../types/pipeline';

interface Stage1DesignProps {
  project: AssuredProject;
  onUpdateProject: (updated: AssuredProject) => void;
  onProceed: () => void;
}

export const Stage1Design: React.FC<Stage1DesignProps> = ({
  project,
  onProceed
}) => {
  const [activeGuideId, setActiveGuideId] = useState(project.target.guides[0]?.id || 'g1');
  const [showSilentBlocks, setShowSilentBlocks] = useState(true);

  const target = project.target;
  const activeGuide = target.guides.find(g => g.id === activeGuideId) || target.guides[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Stage Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <Dna className="w-4 h-4" />
            <span>Stage 1: Guided ASSURED CRISPR Design</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {target.assembly} • {target.chromosome}
          </span>
        </div>
        <h2 className="text-2xl font-black text-white">
          {target.gene}: {target.diseaseName} ({target.aminoAcidChange})
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          The ASSURED methodology pairs high-fidelity dual gRNAs with an <strong>asymmetric single-stranded donor template (ssODN)</strong> containing synonymous (silent) mutations that permanently abolish the PAM motif without altering the amino acid sequence or splice junctions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Interactive Sequence Track (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Visual Genomic DNA & Guide Track */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider">
                Target Genomic Locus ({target.genomicCoordinate})
              </span>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1 text-rose-400">
                  <span className="w-2.5 h-2.5 rounded bg-rose-500 inline-block"></span>
                  <span>Target Mutation</span>
                </span>
                <span className="flex items-center gap-1 text-cyan-400">
                  <span className="w-2.5 h-2.5 rounded bg-cyan-500 inline-block"></span>
                  <span>gRNA Binding</span>
                </span>
                <span className="flex items-center gap-1 text-amber-400">
                  <span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block"></span>
                  <span>PAM (NGG)</span>
                </span>
              </div>
            </div>

            {/* DNA Strands Graphic */}
            <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 font-mono text-xs overflow-x-auto space-y-2">
              <div className="flex items-center gap-3 text-slate-400">
                <span className="w-24 shrink-0 font-bold text-slate-500">Sense 5'-3':</span>
                <span className="text-slate-200 tracking-wider">
                  ...ACACTGAGTGAGCTGCACTGTGACAAGCTGCACGTGGAT<span className="bg-rose-500/20 text-rose-300 px-1 font-bold rounded ring-1 ring-rose-500">{target.refAllele}</span>CTGAGAACTTCAGGCTCCTGGGCAACGTGCT...
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <span className="w-24 shrink-0 font-bold text-slate-500">Antisense 3'-5':</span>
                <span className="text-slate-400 tracking-wider">
                  ...TGTGACTCACTCGACGTGACACTGTTCGACGTGCACCTAG<span className="text-slate-500 px-1 font-bold">T</span>GACTCTTGAAGTCCGAGGACCCGTTGCACGA...
                </span>
              </div>

              {/* Cas9 Cleavage Marker */}
              <div className="pt-2 flex items-center gap-3 text-[11px] text-cyan-400">
                <span className="w-24 shrink-0 font-bold text-cyan-500">Active Guide:</span>
                <span>
                  ✂️ Cuts <strong>{activeGuide.cutDistanceToEdit} bp</strong> from mutation | Strand: <strong>{activeGuide.strand}</strong> | PAM: <strong>{activeGuide.pam}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Asymmetric ssODN Architecture */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  ASSURED Asymmetric ssODN Architecture
                </span>
                <h4 className="text-sm font-bold text-white mt-0.5">
                  {target.donor.name} ({target.donor.totalLength} nt)
                </h4>
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={showSilentBlocks}
                  onChange={(e) => setShowSilentBlocks(e.target.checked)}
                  className="w-4 h-4 accent-cyan-500 rounded"
                />
                <span>Highlight Silent Blocks</span>
              </label>
            </div>

            {/* Asymmetry Visualization Bar */}
            <div className="space-y-1.5">
              <div className="flex h-5 w-full rounded-lg overflow-hidden text-[10px] font-bold text-slate-950 text-center">
                <div 
                  style={{ width: `${(target.donor.arm5Length / target.donor.totalLength) * 100}%` }}
                  className="bg-cyan-400 flex items-center justify-center"
                >
                  5' Arm ({target.donor.arm5Length} nt)
                </div>
                <div className="w-12 bg-amber-400 flex items-center justify-center font-black">
                  EDIT
                </div>
                <div 
                  style={{ width: `${(target.donor.arm3Length / target.donor.totalLength) * 100}%` }}
                  className="bg-emerald-400 flex items-center justify-center"
                >
                  3' Arm ({target.donor.arm3Length} nt)
                </div>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>5'-PTO Protected (A*G*)</span>
                <span>Asymmetric Release Kinetics</span>
                <span>3'-PTO Protected (*G*A)-3'</span>
              </div>
            </div>

            {/* Oligo Sequence */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-300 break-all leading-relaxed">
              {target.donor.sequence}
            </div>

            {/* Silent Changes Verification */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                <span className="font-bold text-amber-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Silent PAM Shield:</span>
                </span>
                <span className="text-slate-300 block">{target.donor.silentPamBlock}</span>
                <span className="text-[10px] text-slate-500 block">Prevents Cas9 re-cutting repaired allele</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Splice & Codon Check:</span>
                </span>
                <span className="text-slate-300 block">Zero cryptic splice donor/acceptors</span>
                <span className="text-[10px] text-slate-500 block">Native reading frame & amino acid preserved</span>
              </div>
            </div>
          </div>

        </div>

        {/* Dual Guide Selector & Lock In (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Dual-Guide RNA Candidate Pair
            </h4>

            {target.guides.map(g => {
              const isSelected = g.id === activeGuideId;

              return (
                <div
                  key={g.id}
                  onClick={() => setActiveGuideId(g.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-950 border-cyan-500 ring-1 ring-cyan-500 shadow-lg shadow-cyan-950/40'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-white">{g.name}</span>
                    <span className="font-mono text-cyan-400 font-bold bg-cyan-950 px-2 py-0.5 rounded text-[10px]">
                      {g.strand} strand
                    </span>
                  </div>
                  <div className="font-mono text-xs text-slate-300 my-1 tracking-wider">
                    {g.sequence} <span className="text-amber-400 font-bold">[{g.pam}]</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                    <span>Cut distance: <strong className="text-white">{g.cutDistanceToEdit} bp</strong></span>
                    <span>Score: <strong className="text-emerald-400">{g.efficiencyScore}/100</strong></span>
                  </div>
                </div>
              );
            })}

            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-slate-300 leading-relaxed flex items-start gap-2">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                Dual-guide redundancy guarantees that if Guide 1 has local chromatin resistance, Guide 2 provides an immediate validated fallback.
              </span>
            </div>

            {/* External Tool Reference */}
            <div className="pt-2 text-center">
              <a
                href="https://assured-crispr-design.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-slate-400 hover:text-cyan-400 flex items-center justify-center gap-1 transition-colors"
              >
                <span>Need advanced custom CFD scoring? Open standalone Designer</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Lock In Button */}
            <button
              onClick={onProceed}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-emerald-500 hover:opacity-95 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all mt-4"
            >
              <span>Lock Design & Proceed to Order (Stage 2)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
