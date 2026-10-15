import React, { useState } from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  Terminal, 
  Download, 
  Check, 
  FileCode, 
  Layers, 
  ArrowRight,
  Database
} from 'lucide-react';
import { SAMPLE_DATASETS } from '../../data/sampleDatasets';

export const ToolLaunchpad: React.FC = () => {
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  const handleDownload = (filename: string, content: string, id: string) => {
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadedId(id);
    setTimeout(() => setDownloadedId(null), 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-slate-900 border border-blue-800/60 shadow-2xl space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950 border border-blue-800 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Unified Production Suite</span>
          </span>
          <span className="text-xs text-slate-400">STAR Protocols Ecosystem</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          ASSURED Ecosystem Hub
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          Connect directly to your production tools deployed on Vercel or run them locally inside this cloned workspace. Download pre-configured design files and simulated Sanger traces from the fixtures test suite to immediately test deconvolution algorithms.
        </p>
      </div>

      {/* Production Web Tools Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Tool 1: ASSURED CRISPR Designer */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6 hover:border-cyan-500/50 transition-all group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-black">
                AC
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/60 font-semibold">
                Design Engine
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                ASSURED CRISPR Designer
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Genome editing design, dual-guide selection, asymmetric ssODN donor formulation, silent PAM blocking, splice site screening, and vendor ordering exports in one clean workspace.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5 font-mono text-xs">
              <div className="text-[10px] text-slate-500 uppercase font-bold">Local Terminal Runner</div>
              <div className="text-cyan-300 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                <span>npm run dev:design</span>
              </div>
            </div>
          </div>

          <a
            href="https://assured-crispr-design.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
          >
            <span>Launch Live Tool (assured-crispr-design.vercel.app)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Tool 2: Assured QC */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6 hover:border-purple-500/50 transition-all group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 font-black">
                QC
              </div>
              <span className="text-[10px] font-mono text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-800/60 font-semibold">
                Trace Deconvolution
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                Assured QC
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Client-side Sanger chromatogram (.ab1) reading, non-negative least squares (NNLS) trace deconvolution, knockout indel calling, and homozygous knock-in clone classification.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5 font-mono text-xs">
              <div className="text-[10px] text-slate-500 uppercase font-bold">Local Terminal Runner</div>
              <div className="text-purple-300 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                <span>npm run dev:qc</span>
              </div>
            </div>
          </div>

          <a
            href="https://assured-qc.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-purple-500 hover:bg-purple-400 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all"
          >
            <span>Launch Live Tool (assured-qc.vercel.app)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

      {/* Fixture Test Datasets for Students & Researchers */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
              <Database className="w-4 h-4" />
              <span>Training Datasets & Cloned Fixtures</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              Download Pre-Packaged Bench Test Files
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Source: Local fixtures in <code className="text-cyan-300 font-mono">Assured_QC/fixtures/</code>. Drop these files straight into Assured QC!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SAMPLE_DATASETS.map(ds => {
            const isDownloaded = downloadedId === ds.id;

            return (
              <div
                key={ds.id}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-cyan-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {ds.category}
                    </span>
                    <FileCode className="w-4 h-4 text-slate-600" />
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug">
                    {ds.name}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {ds.description}
                  </p>
                </div>

                <button
                  onClick={() => handleDownload(ds.downloadFilename, ds.payloadText || '{}', ds.id)}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    isDownloaded
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200'
                  }`}
                >
                  {isDownloaded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Downloaded!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Download {ds.downloadFilename}</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Quick Instructions */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-400 leading-relaxed flex items-start gap-3">
          <Layers className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-200">How to practice in Assured QC:</strong> Download the <code className="text-cyan-300 font-mono">apoe_r176c_snp.design.json</code> above, open <a href="https://assured-qc.vercel.app" target="_blank" rel="noreferrer" className="text-cyan-400 underline">Assured QC</a>, drag-and-drop the design file alongside any AB1 trace from <code className="text-cyan-300 font-mono">Assured_QC/fixtures/sim/</code>, and observe instant deconvolution with 0% cloud upload.
          </div>
        </div>
      </div>

    </div>
  );
};
