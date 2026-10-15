import React from 'react';
import { ArrowRight, BookOpen, FlaskConical, Workflow, FolderOpen } from 'lucide-react';
import { TabType } from '../../types';

export function ExplorerHome({ onNavigate }: { onNavigate: (tab: TabType) => void }) {
  return <div className="space-y-8">
    <section className="rounded-3xl border border-cyan-800/60 bg-gradient-to-br from-cyan-950 via-slate-900 to-slate-950 p-6 sm:p-12">
      <p className="text-sm font-semibold text-cyan-300">ASSURED Academy + Studio · Development preview</p>
      <h1 className="mt-4 max-w-3xl text-3xl sm:text-5xl font-bold tracking-tight leading-tight">Your first question. Your next discovery.</h1>
      <p className="mt-5 max-w-2xl text-slate-300 text-lg">Learn the ideas behind genome engineering, practice with examples, or bring your own design and Sanger traces into one connected workspace.</p>
      <a href="/studio/" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 font-bold text-slate-950 hover:bg-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">Open Assured Studio <ArrowRight size={18}/></a>
    </section>
    <section aria-label="Choose your starting point" className="grid gap-5 md:grid-cols-3">
      <article className="rounded-2xl border border-slate-700 bg-slate-900 p-6"><BookOpen className="text-cyan-300"/><h2 className="mt-4 text-xl font-bold">Learn the foundations</h2><p className="mt-3 text-slate-300">Start with short lessons on reference sequences, editing strategies and what a trace can tell you.</p><button onClick={() => onNavigate('academy')} className="mt-5 inline-flex items-center gap-2 text-cyan-300 font-semibold">Explore lessons <ArrowRight size={16}/></button></article>
      <article className="rounded-2xl border border-slate-700 bg-slate-900 p-6"><FlaskConical className="text-amber-300"/><h2 className="mt-4 text-xl font-bold">Practice a project</h2><p className="mt-3 text-slate-300">Walk through the teaching workbench and virtual bench. Presets and simulations are learning material.</p><button onClick={() => onNavigate('workbench')} className="mt-5 inline-flex items-center gap-2 text-amber-300 font-semibold">Try the teaching workbench <ArrowRight size={16}/></button></article>
      <article className="rounded-2xl border border-slate-700 bg-slate-900 p-6"><Workflow className="text-emerald-300"/><h2 className="mt-4 text-xl font-bold">Work with your own data</h2><p className="mt-3 text-slate-300">Connect a reference and expected edit, confirm matched controls, then review QC results and their uncertainty.</p><a href="/studio/" className="mt-5 inline-flex items-center gap-2 text-emerald-300 font-semibold">Start in Studio <ArrowRight size={16}/></a></article>
    </section>
    <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6 sm:flex items-start gap-4"><FolderOpen className="text-cyan-300 shrink-0"/><div><h2 className="text-xl font-bold">Already have results?</h2><p className="mt-2 text-slate-300">Open Studio, choose <strong>Open project</strong>, and select your <code>.assured.zip</code> file. It restores the design, traces, notes and saved results. Export a copy before clearing browser storage.</p><p className="mt-3 text-sm text-slate-400">Project data stays in this browser unless you export it. No account is required. Sequence-based calls do not establish functional effects or exclude allele dropout.</p></div></section>
  </div>;
}
