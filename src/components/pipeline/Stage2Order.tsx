import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Download, 
  Copy, 
  Check, 
  ArrowRight, 
  PackageCheck, 
  FileSpreadsheet,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { AssuredProject } from '../../types/pipeline';

interface Stage2OrderProps {
  project: AssuredProject;
  onProceed: () => void;
}

export const Stage2Order: React.FC<Stage2OrderProps> = ({
  project,
  onProceed
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const target = project.target;

  // Format IDT Ordering Table
  const idtItems = [
    {
      name: `${target.gene}_crRNA_1`,
      sequence: target.guides[0].sequence,
      scale: '2 nmol crRNA',
      purification: 'Standard Desalt',
      type: 'Guide RNA'
    },
    {
      name: `${target.gene}_crRNA_2`,
      sequence: target.guides[1]?.sequence || 'N/A',
      scale: '2 nmol crRNA',
      purification: 'Standard Desalt',
      type: 'Guide RNA'
    },
    {
      name: `${target.gene}_ssODN_Donor`,
      sequence: target.donor.sequence.replace(/5'-|3'|-/g, ''),
      scale: '4 nmol Ultramer DNA (PTO modified)',
      purification: 'Standard Desalt',
      type: 'HDR Repair Template'
    },
    {
      name: target.primers.forwardPrimer.name,
      sequence: target.primers.forwardPrimer.sequence,
      scale: '25 nmol DNA Oligo',
      purification: 'Standard Desalt',
      type: 'PCR Primer'
    },
    {
      name: target.primers.reversePrimer.name,
      sequence: target.primers.reversePrimer.sequence,
      scale: '25 nmol DNA Oligo',
      purification: 'Standard Desalt',
      type: 'PCR Primer'
    },
    {
      name: target.primers.sequencingPrimer.name,
      sequence: target.primers.sequencingPrimer.sequence,
      scale: '25 nmol DNA Oligo',
      purification: 'Standard Desalt',
      type: 'Sanger Primer'
    }
  ];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadIdtCsv = () => {
    const headers = 'Sequence Name,Sequence,Scale,Purification,Type\n';
    const rows = idtItems.map(item => `"${item.name}","${item.sequence}","${item.scale}","${item.purification}","${item.type}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IDT_Order_${target.gene}_ASSURED_CRISPR.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Stage Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <ShoppingCart className="w-4 h-4" />
            <span>Stage 2: 1-Click Vendor Order Generator</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Zero Transcription Errors
          </span>
        </div>
        <h2 className="text-2xl font-black text-white">
          Reagent Procurement Manifest for {target.gene}
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          Instantly generate and export formatted ordering sheets for IDT, Synthego, or Sigma. All oligonucleotide ends include verified phosphorothioate (PTO) linkages, and PCR primers are pre-optimized for 150–250 bp flanking Sanger windows.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Ordering Sheet Table (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white">
                  Integrated DNA Technologies (IDT) Bulk Upload Sheet
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadIdtCsv}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-sm shadow-amber-500/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CSV</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500 text-[11px] uppercase">
                    <th className="py-2.5 px-3">Item Name</th>
                    <th className="py-2.5 px-3">Sequence (5' &gt; 3')</th>
                    <th className="py-2.5 px-3">Specification</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {idtItems.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40">
                      <td className="py-3 px-3 font-bold text-white whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="py-3 px-3 text-emerald-400 max-w-xs truncate" title={item.sequence}>
                        {item.sequence}
                      </td>
                      <td className="py-3 px-3 text-slate-400 text-[11px] whitespace-nowrap">
                        {item.scale}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => handleCopy(item.sequence, `item-${idx}`)}
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                          title="Copy sequence"
                        >
                          {copiedKey === `item-${idx}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-slate-500 pt-2">
              * Note: The ssODN sequence uses asterisks (<code className="text-cyan-400">*</code>) to denote phosphorothioate internucleotide linkages recognized directly by IDT's ordering portal.
            </p>
          </div>
        </div>

        {/* Bench Inventory Checklist & Proceed (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              <PackageCheck className="w-4 h-4 text-emerald-400" />
              <span>STAR Protocols Resource Checklist</span>
            </div>

            <div className="space-y-2.5 text-xs">
              {[
                { name: 'Alt-R S.p. HiFi Cas9 Nuclease V3', cat: 'IDT #1081060', required: '20 pmol/rxn' },
                { name: 'P3 Primary Cell 4D-Nucleofector Kit', cat: 'Lonza #V4XP-3024', required: '20 µL/cuvette' },
                { name: 'CloneR2 / Y-27632 ROCK Inhibitor', cat: 'STEMCELL #100-0691', required: '10 µM in media' },
                { name: 'StemFlex / mTeSR Plus Media', cat: 'Thermo #A3349401', required: 'Feed every 2 days' },
                { name: 'Geltrex / Matrigel hESC-Qualified', cat: 'Thermo #A1413302', required: '1:100 plate coating' },
              ].map((res, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-200">{res.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{res.cat} • {res.required}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Proceed Button */}
            <button
              onClick={onProceed}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-emerald-500 hover:opacity-95 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all mt-4"
            >
              <span>Confirm Order Placed & Setup Bench (Stage 3)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
