import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Upload, 
  ZoomIn, 
  ZoomOut, 
  Sliders, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  ExternalLink,
  Layers,
  FileCheck2
} from 'lucide-react';
import { AssuredProject, QCCloneResult } from '../../types/pipeline';
import { parseAbif, generateSyntheticTrace, AbifTrace } from '../../utils/abifParser';

interface Stage4QCProps {
  project: AssuredProject;
  onUpdateProject: (updated: AssuredProject) => void;
  onProceed: () => void;
}

export const Stage4QC: React.FC<Stage4QCProps> = ({
  project,
  onProceed
}) => {
  const clones = project.clones || [];
  const [selectedCloneId, setSelectedCloneId] = useState<string>(clones[0]?.cloneId || 'HBB-B3');
  const [activeTrace, setActiveTrace] = useState<AbifTrace | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1.2);
  const [visibleChannels, setVisibleChannels] = useState({ A: true, C: true, G: true, T: true });
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedWellHover, setSelectedWellHover] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const selectedClone = clones.find(c => c.cloneId === selectedCloneId) || clones[0];

  // Load trace when clone changes
  useEffect(() => {
    if (!selectedClone) return;
    const isHet = selectedClone.status === 'HETEROZYGOUS_KI';
    const trace = generateSyntheticTrace(selectedClone.chromatogramSequence, isHet);
    setActiveTrace(trace);
  }, [selectedCloneId]);

  // Handle uploaded .ab1 file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const buffer = event.target?.result as ArrayBuffer;
        const parsed = parseAbif(buffer, file.name);
        setActiveTrace(parsed);
        setUploadError(null);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown parsing error';
        setUploadError(`Failed to parse .ab1 trace: ${message}`);
      }
    };
    reader.onerror = () => {
      setUploadError('Error reading uploaded file.');
    };
    reader.readAsArrayBuffer(file);
  };

  // Render chromatogram onto canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !activeTrace) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Background grid
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x < width; x += 40) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += 30) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();

    const baselineY = height - 35;
    const maxSignal = 2000;
    const scaleY = (height - 65) / maxSignal;
    const samplesCount = activeTrace.samples;
    const scaleX = (width / samplesCount) * zoomLevel;

    // Plot individual base channels
    const channelColors: { [key: string]: string } = {
      A: '#10b981', // Emerald green
      C: '#0ea5e9', // Cyan / Sky blue
      G: '#f59e0b', // Amber
      T: '#ef4444', // Red
    };

    (['A', 'C', 'G', 'T'] as const).forEach(base => {
      if (!visibleChannels[base]) return;
      const data = activeTrace.channels[base];
      if (!data) return;

      ctx.strokeStyle = channelColors[base];
      ctx.lineWidth = 1.8;
      ctx.beginPath();

      for (let i = 0; i < data.length; i++) {
        const x = i * scaleX;
        const rawY = data[i] || 0;
        const y = baselineY - Math.min(rawY * scaleY, height - 50);

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    });

    // Render Peak Locations & Base Letters
    ctx.font = 'bold 12px ui-monospace, monospace';
    ctx.textAlign = 'center';

    activeTrace.peakLocations.forEach((loc, idx) => {
      const x = loc * scaleX;
      if (x < 0 || x > width) return;

      const base = activeTrace.calls[idx] || '';
      ctx.fillStyle = channelColors[base] || '#94a3b8';

      // Draw faint vertical alignment tick
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, 25);
      ctx.lineTo(x, baselineY);
      ctx.stroke();

      // Draw base letter
      ctx.fillText(base, x, baselineY + 18);
    });

    // Highlight Edit Window Marker
    const targetIdx = 12; // Middle of target window
    const targetX = (activeTrace.peakLocations[targetIdx] || 150) * scaleX;
    
    // Highlight box around edit
    ctx.fillStyle = 'rgba(244, 63, 94, 0.12)';
    ctx.fillRect(targetX - 25, 10, 50, height - 30);
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(targetX - 25, 10, 50, height - 30);
    ctx.setLineDash([]);

    ctx.fillStyle = '#f43f5e';
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText('TARGET EDIT', targetX, 22);

  }, [activeTrace, zoomLevel, visibleChannels]);

  // Status traffic light styling helper
  const getStatusBadge = (status: QCCloneResult['status']) => {
    switch (status) {
      case 'HOMOZYGOUS_KI':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>🟢 Homozygous Knock-In (Biallelic HDR)</span>
          </span>
        );
      case 'HETEROZYGOUS_KI':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>🟡 Heterozygous Knock-In (Monoallelic)</span>
          </span>
        );
      case 'INDEL_KO':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40">
            <XCircle className="w-3.5 h-3.5 text-rose-400" />
            <span>🔴 Indel Knockout (NHEJ Frameshift)</span>
          </span>
        );
      case 'WT_ESCAPEE':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-500/20 text-slate-300 border border-slate-500/40">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            <span>⚪ Unedited Wild-Type Escapee</span>
          </span>
        );
    }
  };

  // 96-well grid rows & cols
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const cols = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Stage Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <Activity className="w-4 h-4" />
            <span>Stage 4: Automated Sanger Deconvolution & Zygosity Calling</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Powered by ASSURED-QC Engine
          </span>
        </div>
        <h2 className="text-2xl font-black text-white">
          Clonal Genotype Validation for {project.target.gene}
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          Directly deconvolutes 4-channel Sanger sequencing traces to quantify <strong>HDR Knock-In %</strong>, <strong>Indel %</strong>, and <strong>Wild-Type %</strong>. Automatically verifies synonymous PAM blocking to ensure stable isogenic cell lines without mosaicism.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Chromatogram Visualizer & Deconvolution (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Clone Selection Chips & Upload Bar */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Screened Clones:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {clones.map(clone => {
                  const isSelected = clone.cloneId === selectedCloneId;
                  const colorMap = {
                    HOMOZYGOUS_KI: 'border-emerald-500 text-emerald-300 bg-emerald-950/40',
                    HETEROZYGOUS_KI: 'border-amber-500 text-amber-300 bg-amber-950/40',
                    INDEL_KO: 'border-rose-500 text-rose-300 bg-rose-950/40',
                    WT_ESCAPEE: 'border-slate-600 text-slate-300 bg-slate-900'
                  };

                  return (
                    <button
                      key={clone.cloneId}
                      onClick={() => setSelectedCloneId(clone.cloneId)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        isSelected 
                          ? `${colorMap[clone.status]} ring-2 ring-emerald-500 shadow-md` 
                          : 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
                      }`}
                    >
                      <span>Well {clone.wellId} ({clone.cloneId})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom .ab1 File Upload Button */}
            <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5 text-cyan-400" />
              <span>Load .ab1 Trace</span>
              <input
                type="file"
                accept=".ab1,.ab"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>

          {uploadError && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300">
              {uploadError}
            </div>
          )}

          {/* Chromatogram Electropherogram Canvas */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Electropherogram Chromatogram
                </span>
                <span className="text-sm font-bold text-white">
                  {selectedClone.cloneId} (Well {selectedClone.wellId}) — Target Locus Trace
                </span>
              </div>

              {/* Channel Toggles & Zoom */}
              <div className="flex items-center gap-4 text-xs font-mono">
                {/* Channel Color Pills */}
                <div className="flex items-center gap-2">
                  {(['A', 'C', 'G', 'T'] as const).map(ch => {
                    const colors = {
                      A: 'text-emerald-400 border-emerald-500/50',
                      C: 'text-sky-400 border-sky-500/50',
                      G: 'text-amber-400 border-amber-500/50',
                      T: 'text-rose-400 border-rose-500/50'
                    };
                    return (
                      <button
                        key={ch}
                        onClick={() => setVisibleChannels(prev => ({ ...prev, [ch]: !prev[ch] }))}
                        className={`w-6 h-6 rounded-md font-bold text-xs flex items-center justify-center border transition-all ${
                          visibleChannels[ch] ? `${colors[ch]} bg-slate-900` : 'opacity-30 text-slate-600 border-slate-800'
                        }`}
                        title={`Toggle channel ${ch}`}
                      >
                        {ch}
                      </button>
                    );
                  })}
                </div>

                {/* Zoom Buttons */}
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                  <button 
                    onClick={() => setZoomLevel(prev => Math.max(0.6, prev - 0.2))}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] text-slate-400 px-1 font-bold">{zoomLevel.toFixed(1)}x</span>
                  <button 
                    onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.2))}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Canvas */}
            <div className="relative rounded-xl overflow-hidden border border-slate-800/80 bg-slate-950">
              <canvas
                ref={canvasRef}
                width={780}
                height={230}
                className="w-full h-auto block"
              />
            </div>

            {/* Allele Alignment Comparison */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 text-[11px] pb-1 border-b border-slate-800">
                <span className="font-bold text-slate-400 uppercase">Sequence Alignment Window</span>
                <span className="text-cyan-400 font-bold">Base Position: 5,227,002 (Exon 1)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-20 text-slate-500 font-bold shrink-0">WT Target:</span>
                <span className="tracking-widest text-slate-300">
                  ACCTGAC<span className="bg-rose-500/20 text-rose-300 px-1 font-bold rounded">T</span>CCT<span className="text-amber-400 font-bold">GTG</span>GAGAAGTCT
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-20 text-emerald-400 font-bold shrink-0">Clonal Edit:</span>
                <span className="tracking-widest text-emerald-300">
                  ACCTGAC<span className="bg-emerald-500/20 text-emerald-300 px-1 font-bold rounded">A</span>CCT<span className="text-cyan-400 font-bold">GAG</span>GAGAAGTCT
                </span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-slate-500 pt-1">
                <span className="w-20 shrink-0">Annotation:</span>
                <span>
                  Position 8: <strong className="text-rose-400">T &gt; A (rs334 reversion)</strong> | Positions 12-14: <strong className="text-cyan-400">TGG &gt; TGA Silent PAM Lock</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Deconvolution Decomposition Breakdown */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Allelic Deconvolution Decomposition
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
                <div className="text-xs text-slate-400 font-semibold">HDR Knock-In</div>
                <div className="text-2xl font-black text-emerald-400">{selectedClone.hdrPercentage}%</div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                  <div 
                    className="bg-emerald-400 h-full rounded-full" 
                    style={{ width: `${selectedClone.hdrPercentage}%` }}
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
                <div className="text-xs text-slate-400 font-semibold">Indel Frequency</div>
                <div className="text-2xl font-black text-rose-400">{selectedClone.indelPercentage}%</div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                  <div 
                    className="bg-rose-400 h-full rounded-full" 
                    style={{ width: `${selectedClone.indelPercentage}%` }}
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
                <div className="text-xs text-slate-400 font-semibold">Unedited WT</div>
                <div className="text-2xl font-black text-slate-300">{selectedClone.wtPercentage}%</div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                  <div 
                    className="bg-slate-400 h-full rounded-full" 
                    style={{ width: `${selectedClone.wtPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Traffic Light QC Verdict & 96-Well Screen (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Verdict Box */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              QC Zygosity Verdict
            </h4>

            <div>
              {getStatusBadge(selectedClone.status)}
              <h3 className="text-lg font-black text-white mt-2">
                {selectedClone.statusLabel}
              </h3>
            </div>

            {/* Silent Block Status */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">Silent PAM Shield:</span>
                {selectedClone.silentBlockVerified ? (
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>VERIFIED</span>
                  </span>
                ) : (
                  <span className="font-bold text-rose-400 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>ABSENT</span>
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500">
                {selectedClone.silentBlockVerified 
                  ? 'Both alleles harbor the synonymous mutation. Cas9 is fully prevented from re-cutting.' 
                  : 'Target site remains vulnerable to secondary Cas9 cleavage.'}
              </p>
            </div>

            {/* Expansion Recommendation */}
            <div className={`p-4 rounded-xl border text-xs space-y-1 ${
              selectedClone.isRecommendedForExpansion
                ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-200'
                : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}>
              <div className="font-bold flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <span>Cell Banking Decision:</span>
              </div>
              <div>
                {selectedClone.isRecommendedForExpansion 
                  ? 'RECOMMENDED FOR EXPANSION. Passages 1-3 can be harvested for master cell bank freezing.'
                  : 'DO NOT EXPAND for isogenic rescue. Reserved as negative/heterozygous control.'}
              </div>
            </div>

            {/* External Tool Reference */}
            <div className="pt-1 text-center">
              <a
                href="https://assured-qc.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-slate-400 hover:text-emerald-400 flex items-center justify-center gap-1 transition-colors"
              >
                <span>Open Standalone ASSURED-QC web application</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* 96-Well Plate Screening Heatmap */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>96-Well Sub-Cloning Map</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {selectedWellHover ? `Well ${selectedWellHover}` : '0.5 cells/well'}
              </span>
            </div>

            {/* Mini 96-Well Grid */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="grid grid-cols-12 gap-1">
                {rows.flatMap(r => 
                  cols.map(c => {
                    const wellName = `${r}${c}`;
                    const matchedClone = clones.find(cl => cl.wellId === wellName);

                    let bgClass = 'bg-slate-800/40 hover:bg-slate-700';
                    if (matchedClone?.status === 'HOMOZYGOUS_KI') bgClass = 'bg-emerald-500 animate-pulse';
                    else if (matchedClone?.status === 'HETEROZYGOUS_KI') bgClass = 'bg-amber-500';
                    else if (matchedClone?.status === 'INDEL_KO') bgClass = 'bg-rose-500';
                    else if (matchedClone?.status === 'WT_ESCAPEE') bgClass = 'bg-slate-400';

                    return (
                      <div
                        key={wellName}
                        onMouseEnter={() => setSelectedWellHover(wellName)}
                        onMouseLeave={() => setSelectedWellHover(null)}
                        onClick={() => {
                          if (matchedClone) setSelectedCloneId(matchedClone.cloneId);
                        }}
                        className={`w-full aspect-square rounded-full cursor-pointer transition-transform hover:scale-125 ${bgClass} ${
                          selectedClone.wellId === wellName ? 'ring-2 ring-white scale-110' : ''
                        }`}
                        title={matchedClone ? `${wellName}: ${matchedClone.statusLabel}` : wellName}
                      />
                    );
                  })
                )}
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-400 pt-3 border-t border-slate-800/60 mt-3">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                  <span>Homozygous KI (B3)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                  <span>Het KI (C7)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
                  <span>Indel KO (D2)</span>
                </span>
              </div>
            </div>

            {/* Advance to Publication Figure */}
            <button
              onClick={onProceed}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-cyan-500 hover:opacity-95 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all mt-3"
            >
              <span>QC Confirmed — Generate Publication Figure (Stage 5)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
