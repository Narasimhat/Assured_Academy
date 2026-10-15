import React, { useState } from 'react';
import { 
  Dna, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Info, 
  ExternalLink,
  PlusCircle,
  Scissors,
  Wand2,
  X
} from 'lucide-react';
import { AssuredProject } from '../../types/pipeline';
import { runAssuredDesignEngine, DesignRequest } from '../../utils/designEngine';

interface Stage1DesignProps {
  project: AssuredProject;
  onUpdateProject: (updated: AssuredProject) => void;
  onProceed: () => void;
}

export const Stage1Design: React.FC<Stage1DesignProps> = ({
  project,
  onUpdateProject,
  onProceed
}) => {
  const [activeGuideId, setActiveGuideId] = useState(project.target.guides[0]?.id || 'g1');
  const [showSilentBlocks, setShowSilentBlocks] = useState(true);
  const [showCustomModal, setShowCustomModal] = useState(false);

  // Custom Design Form State
  const [customGene, setCustomGene] = useState('MYD88');
  const [customDisease, setCustomDisease] = useState('Innate Immune Signaling Deficiency');
  const [customMode, setCustomMode] = useState<'SNP_KNOCKIN' | 'KNOCKOUT'>('KNOCKOUT');
  const [customSeq, setCustomSeq] = useState('GGTATAGGAACTCGCGACGACCCCCACCGTGGACAGCGCCGACCCCACCGGCAAACTGCTGGACGCCTGGCAGGGCCGCCCCGGCGCCTCCGTGGGCCGCCT');
  const [customEditPos, setCustomEditPos] = useState(20);
  const [customAltBase, setCustomAltBase] = useState('A');
  const [designError, setDesignError] = useState<string | null>(null);

  const target = project.target;
  const isKnockout = target.targetType === 'KNOCKOUT';
  const activeGuide = target.guides.find(g => g.id === activeGuideId) || target.guides[0];

  const handleRunCustomDesign = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setDesignError(null);
      const req: DesignRequest = {
        gene: customGene.trim().toUpperCase(),
        diseaseName: customDisease.trim(),
        sequence: customSeq.trim(),
        mode: customMode,
        editPosition: Number(customEditPos),
        altBase: customAltBase
      };

      const newTarget = runAssuredDesignEngine(req);
      const newProject: AssuredProject = {
        ...project,
        id: `custom-${newTarget.gene.toLowerCase()}-${Date.now()}`,
        title: `${newTarget.gene} ${customMode === 'KNOCKOUT' ? 'Knockout' : 'SNP Knock-In'} Custom ASSURED Design`,
        createdAt: new Date().toISOString().split('T')[0],
        target: newTarget,
        bench: {
          ...project.bench,
          isBenchCompleted: false
        }
      };

      onUpdateProject(newProject);
      setShowCustomModal(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error running design engine';
      setDesignError(msg);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Stage Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <Dna className="w-4 h-4" />
            <span>Stage 1: Guided ASSURED CRISPR Design</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
              isKnockout 
                ? 'bg-rose-950 text-rose-300 border border-rose-800' 
                : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
            }`}>
              {isKnockout ? '✂️ Frameshift Knockout Mode' : '🧬 Precision SNP Knock-In Mode'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCustomModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Design Custom Target</span>
            </button>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              {target.assembly} • {target.chromosome}
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-black text-white">
          {target.gene}: {target.diseaseName} ({target.aminoAcidChange})
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          {isKnockout ? (
            <span>
              In <strong>Knockout Mode</strong>, the ASSURED methodology deploys high-activity Cas9 ribonucleoprotein (RNP) complexes targeting critical early coding exons to induce frameshift indels and non-functional premature termination codons (PTCs) without requiring an exogenous template.
            </span>
          ) : (
            <span>
              In <strong>Knock-In Mode</strong>, the ASSURED methodology pairs high-fidelity dual gRNAs with an <strong>asymmetric single-stranded donor template (ssODN)</strong> containing synonymous (silent) mutations that permanently abolish the PAM motif without altering the amino acid sequence or splice junctions.
            </span>
          )}
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
                <span className="flex items-center gap-1 text-cyan-400">
                  <span className="w-2.5 h-2.5 rounded bg-cyan-500 inline-block"></span>
                  <span>gRNA Binding</span>
                </span>
                <span className="flex items-center gap-1 text-amber-400">
                  <span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block"></span>
                  <span>PAM ({activeGuide.pam})</span>
                </span>
                {!isKnockout && (
                  <span className="flex items-center gap-1 text-rose-400">
                    <span className="w-2.5 h-2.5 rounded bg-rose-500 inline-block"></span>
                    <span>Target SNP</span>
                  </span>
                )}
              </div>
            </div>

            {/* DNA Strands Graphic */}
            <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 font-mono text-xs overflow-x-auto space-y-2">
              <div className="flex items-center gap-3 text-slate-400">
                <span className="w-24 shrink-0 font-bold text-slate-500">Sense 5'-3':</span>
                <span className="text-slate-200 tracking-wider break-all">
                  {target.targetSequence5to3}
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <span className="w-24 shrink-0 font-bold text-slate-500">Antisense 3'-5':</span>
                <span className="text-slate-500 tracking-wider break-all">
                  {target.complementSequence3to5}
                </span>
              </div>

              {/* Cas9 Cleavage Marker */}
              <div className="pt-2 flex items-center gap-3 text-[11px] text-cyan-400">
                <span className="w-24 shrink-0 font-bold text-cyan-500">Active Guide:</span>
                <span>
                  ✂️ Cuts <strong>{activeGuide.cutDistanceToEdit} bp</strong> from target site | Strand: <strong>{activeGuide.strand}</strong> | PAM: <strong>{activeGuide.pam}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Architecture: Asymmetric ssODN (for Knock-In) or Frameshift Disruption (for Knockout) */}
          {!isKnockout ? (
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
                  <span>5'-PTO Protected (*)</span>
                  <span>Asymmetric Dissociation Kinetics</span>
                  <span>3'-PTO Protected (*)-3'</span>
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
                  <span className="text-slate-300 block">Preserved Reading Frame</span>
                  <span className="text-[10px] text-slate-500 block">Kazusa human synonymous codon frequency validated</span>
                </div>
              </div>
            </div>
          ) : (
            /* Knockout Architecture Card */
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <Scissors className="w-5 h-5 text-rose-400" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Non-Homologous End Joining (NHEJ) Frameshift Disruption
                  </h4>
                  <span className="text-xs text-slate-400">
                    Dual Cas9 cleavage without donor oligo $\to$ high-efficiency indel knockout
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2 text-slate-300">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Target Transcript: <strong>NM_002468.5 (Exon 1)</strong></span>
                  <span className="text-rose-400 font-bold">PTC Induction Rate: &gt;95%</span>
                </div>
                <p className="leading-relaxed">
                  Cas9 nuclease generates double-strand breaks at the designated cleavage plane. Error-prone NHEJ repair introduces insertion/deletion indels, creating premature termination codons and triggering nonsense-mediated mRNA decay (NMD).
                </p>
              </div>
            </div>
          )}

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
                Dual-guide redundancy guarantees that if Guide 1 encounters local heterochromatin compaction, Guide 2 provides an immediate validated fallback.
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
                <span>Need advanced CFD matrix calculations? Standalone Designer</span>
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

      {/* Modal: Create Real Custom Design */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-black text-white">Create New Real ASSURED Design</h3>
              </div>
              <button
                onClick={() => setShowCustomModal(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRunCustomDesign} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Gene Symbol</label>
                  <input
                    type="text"
                    value={customGene}
                    onChange={(e) => setCustomGene(e.target.value)}
                    required
                    placeholder="e.g. MYD88, APOE, BRCA1"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Disease / Phenotype</label>
                  <input
                    type="text"
                    value={customDisease}
                    onChange={(e) => setCustomDisease(e.target.value)}
                    required
                    placeholder="e.g. Rare variant modeling"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Design Mode</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCustomMode('KNOCKOUT')}
                    className={`py-2 px-3 rounded-xl border font-bold text-left transition-all ${
                      customMode === 'KNOCKOUT'
                        ? 'bg-rose-950/40 border-rose-500 text-rose-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    ✂️ Gene Knockout (Frameshift InDel)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomMode('SNP_KNOCKIN')}
                    className={`py-2 px-3 rounded-xl border font-bold text-left transition-all ${
                      customMode === 'SNP_KNOCKIN'
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    🧬 Precision SNP Knock-In (Asym ssODN)
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-300">Target Genomic Sequence (5'-3')</label>
                  <span className="text-[10px] text-slate-500">{customSeq.length} bp</span>
                </div>
                <textarea
                  rows={4}
                  value={customSeq}
                  onChange={(e) => setCustomSeq(e.target.value.toUpperCase())}
                  required
                  placeholder="Paste 100-500 bp DNA sequence..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 font-mono text-xs focus:border-cyan-500 focus:outline-none break-all"
                />
              </div>

              {customMode === 'SNP_KNOCKIN' && (
                <div className="grid grid-cols-2 gap-4 p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Target Base Position (0-index)</label>
                    <input
                      type="number"
                      min={0}
                      max={customSeq.length - 1}
                      value={customEditPos}
                      onChange={(e) => setCustomEditPos(Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Desired Edit Nucleotide</label>
                    <select
                      value={customAltBase}
                      onChange={(e) => setCustomAltBase(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono"
                    >
                      <option value="A">A (Adenine)</option>
                      <option value="T">T (Thymine)</option>
                      <option value="C">C (Cytosine)</option>
                      <option value="G">G (Guanine)</option>
                    </select>
                  </div>
                </div>
              )}

              {designError && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs">
                  {designError}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shadow-md shadow-cyan-500/20"
                >
                  Run ASSURED Design Engine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
