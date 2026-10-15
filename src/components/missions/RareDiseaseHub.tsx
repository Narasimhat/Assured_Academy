import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ExternalLink, 
  Dna, 
  FlaskConical, 
  Binary, 
  Copy, 
  Check, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { RARE_DISEASE_MISSIONS } from '../../data/rareDiseases';
import { RareDiseaseMission } from '../../types';

interface RareDiseaseHubProps {
  onSelectMissionForLab: (mission: RareDiseaseMission) => void;
}

export const RareDiseaseHub: React.FC<RareDiseaseHubProps> = ({ onSelectMissionForLab }) => {
  const [selectedMissionId, setSelectedMissionId] = useState(RARE_DISEASE_MISSIONS[0].id);
  const [copiedSeq, setCopiedSeq] = useState<string | null>(null);

  const activeMission = RARE_DISEASE_MISSIONS.find(m => m.id === selectedMissionId) || RARE_DISEASE_MISSIONS[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSeq(id);
    setTimeout(() => setCopiedSeq(null), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-900 border border-purple-800/60 shadow-2xl space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-950 border border-purple-800 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Clinical Genetics to Isogenic Rescue</span>
          </span>
          <span className="text-xs text-slate-400">Rare Disease Sandbox</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Rare Disease Engineering Missions
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          Apply the ASSURED workflow to clinical pathogenic variants. Walk through real patient point mutations, examine dual-guide cut topologies, copy validated ssODN sequences with silent PAM blocking, and practice genotype calling.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Missions Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Clinical Targets
          </h3>

          {RARE_DISEASE_MISSIONS.map(m => {
            const isSelected = m.id === selectedMissionId;

            return (
              <div
                key={m.id}
                onClick={() => setSelectedMissionId(m.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-purple-500 shadow-lg shadow-purple-950/40 ring-1 ring-purple-500'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-extrabold text-white text-sm">{m.gene}</span>
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-800/60">
                    {m.strategy}
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-slate-200">
                  {m.diseaseName}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 font-mono">
                  {m.proteinChange} • {m.inheritance}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mission Dossier & Design Specs (8 cols) */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          
          {/* Mission Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-purple-400 uppercase tracking-wider block">
                Target Dossier: {activeMission.genomicCoord}
              </span>
              <h2 className="text-2xl font-black text-white mt-1">
                {activeMission.diseaseName}
              </h2>
              <p className="text-sm text-slate-400 font-mono mt-0.5">
                Gene: <strong className="text-white">{activeMission.gene}</strong> | Mutation: <strong className="text-cyan-400">{activeMission.proteinChange}</strong> ({activeMission.refAllele} &gt; {activeMission.altAllele})
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelectMissionForLab(activeMission)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition-all"
              >
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Simulate in Lab</span>
              </button>
            </div>
          </div>

          {/* Clinical Phenotype Summary */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs leading-relaxed">
            <span className="font-bold text-slate-300 uppercase tracking-wider block text-[11px]">
              Pathophysiology & Cellular Model
            </span>
            <p className="text-slate-300">
              {activeMission.phenotypeDescription}
            </p>
          </div>

          {/* Recommended Dual Guides */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              ASSURED Guide RNA Pair (Dual-Guide Strategy)
            </span>
            <div className="space-y-2">
              {activeMission.recommendedGuides.map((g, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
                  <div>
                    <span className="font-bold text-cyan-400 mr-2">{g.name}</span>
                    <span className="text-slate-300 tracking-wider">{g.sequence}</span>
                    <span className="text-amber-400 font-bold ml-2">[{g.pam}]</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span>Cut: {g.cutDist} bp from edit</span>
                    <button
                      onClick={() => handleCopy(g.sequence, `guide-${idx}`)}
                      className="text-slate-500 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
                      title="Copy guide sequence"
                    >
                      {copiedSeq === `guide-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Asymmetric ssODN Template with Silent Blocks */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Validated Asymmetric ssODN Donor
              </span>
              <button
                onClick={() => handleCopy(activeMission.ssodnTemplate, 'ssodn')}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
              >
                {copiedSeq === 'ssodn' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSeq === 'ssodn' ? 'Copied Donor!' : 'Copy Oligo Sequence'}</span>
              </button>
            </div>
            
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 break-all leading-relaxed">
              {activeMission.ssodnTemplate}
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/50 text-xs text-emerald-200">
              <span className="font-bold block mb-1">Silent Blocking Changes Incorporated:</span>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-emerald-300/90">
                {activeMission.silentChanges.map((change, idx) => (
                  <li key={idx}>{change}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Tool Navigation */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <a
              href="https://assured-crispr-design.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20 transition-all"
            >
              <span>Open in ASSURED Designer</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://assured-qc.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 shadow-md shadow-purple-500/20 transition-all"
            >
              <span>Test Clone Deconvolution in Assured QC</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
