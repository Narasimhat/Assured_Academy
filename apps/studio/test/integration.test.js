import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createProject,updateInput,setSelectedPair,pairsReady,validateProject} from '../src/lib/project.js';
import {designProject,validatedSpec} from '../src/lib/engine.js';
import {analyzeProject,suggestPairs} from '../src/lib/analyze.js';
import {projectReport} from '../src/lib/report.js';
import {runDesign,summarizeProcurementReadiness} from '../vendor/design/assured-crispr-designer/src/designEngine.js';
import {parseAbif} from '../vendor/qc/src/abif.js';
import {analyseSample} from '../vendor/qc/src/batch.js';
const ref=fs.readFileSync(new URL('../public/examples/apoe-reference.gb',import.meta.url),'utf8');
const input={gene:'APOE',mutation:'R176C',type:'pm',delivery:'rnp',cellLine:'BIHi005-a',reference:{name:'NG_007084.2',text:ref}};
const design=designProject(input);
const file=name=>({name,buffer:Uint8Array.from(fs.readFileSync(new URL('../public/examples/'+name,import.meta.url))).buffer});
const files=['APOE_WT.ab1','APOE_A01.ab1','APOE_A02.ab1','APOE_A03.ab1'].map(file);
const fixture=JSON.parse(fs.readFileSync(new URL('../public/examples/apoe-qc.design.json',import.meta.url),'utf8'));
function qcProject(){const p=createProject();p.qcSpec=fixture;p.pairs=files.slice(1).map((f,i)=>({sample:`A0${i+1}`,control:files[0].name,edited:f.name,confirmed:true}));return p;}
test('native design output and readiness are preserved against the pinned engine',()=>{
 const native=runDesign('pm',ref,'R176C','',400,{expectedGene:'APOE',deliveryMethod:'rnp'});
 assert.deepEqual(design.result.gs,native.gs);assert.deepEqual(design.result.os,native.os);
 assert.equal(design.readiness.status,summarizeProcurementReadiness(native).status);
 assert.equal(design.reference.gene,'APOE');assert.equal(design.reference.transcript,'NM_000041.4');
 assert.ok(design.readiness.notes.some(x=>x.includes('TOMM40')));
});
test('each alternative exports only its guide and matched donor, with valid coding and markers',()=>{
 assert.equal(design.pairs.length,2);
 for(const pair of design.pairs){assert.equal(pair.spec.guides.length,1);assert.equal(pair.spec.donors.length,1);assert.equal(pair.spec.guides[0].spacer,pair.guide.sp);assert.equal(pair.spec.donors[0].guide,1);assert.equal(pair.spec.donors[0].orderSequence,pair.donor.od);assert.equal(validatedSpec(pair.spec),pair.spec);assert.ok(pair.spec.markers.some(m=>m.role==='intended'));assert.ok(pair.spec.coding);}
 assert.notDeepEqual(design.pairs[0].spec.markers,design.pairs[1].spec.markers);
});
test('mutation and reference edits invalidate derived designs and QC; selecting an alternative invalidates QC',()=>{
 const p={...createProject(),input,design,qc:{results:[]}};const selected=setSelectedPair(p,0);assert.equal(selected.qc,null);
 const changed=updateInput({...selected,qc:{results:[]}}, {mutation:'R154S'});assert.equal(changed.qc,null);assert.equal(changed.design,null);assert.equal(changed.qcSpec,null);
 assert.throws(()=>setSelectedPair(p,100));
});
test('pairing rejects duplicate filenames, unchecked pairs, duplicate samples, and self controls',()=>{
 assert.throws(()=>suggestPairs([files[0],files[0]]),/Duplicate/);
 const p=qcProject();assert.equal(pairsReady(p,files),true);
 p.pairs[0].confirmed=false;assert.equal(pairsReady(p,files),false);p.pairs[0].confirmed=true;
 p.pairs[1].sample=p.pairs[0].sample;assert.equal(pairsReady(p,files),false);
 p.pairs[1].sample='unique';p.pairs[0].control=p.pairs[0].edited;assert.equal(pairsReady(p,files),false);
});
test('simulated clone outcomes match native analysis and preserve input hashes, confidence, and intervals',async()=>{
 const p=qcProject();const got=await analyzeProject(p,files);assert.equal(got.results.length,3);
 assert.equal(got.results[0].decision.decision,'accept');assert.equal(got.results[1].decision.decision,'hold');assert.notEqual(got.results[2].decision.decision,'accept');
 const native=analyseSample({name:'A01',spec:fixture,control:parseAbif(files[0].buffer,'ctrl'),edited:parseAbif(files[1].buffer,'edit'),sampleType:'clone',options:{}});
 assert.deepEqual(got.results[0].summary,native.summary);assert.deepEqual(got.results[0].intervals,native.intervals);
 assert.equal(got.results[0].inputs.edited[0].sha256.length,64);assert.equal(got.specHash.length,64);
});
test('failed samples remain visible and a pool cannot be accepted as a clone',async()=>{
 const p=qcProject();const broken=[files[0],{...files[1],buffer:new ArrayBuffer(12)},files[2],files[3]];const outcome=await analyzeProject(p,broken);
 assert.equal(outcome.results.length,3);assert.equal(outcome.results[0].ok,false);assert.equal(outcome.results[0].decision.decision,'re-sequence');
 p.sampleType='pool';const pool=await analyzeProject(p,files);assert.ok(pool.results.every(r=>r.decision.decision!=='accept'));
});
test('invalid imported project and incompatible handoff are rejected; report content is escaped',()=>{
 assert.throws(()=>validateProject({schema:'assured-studio/99'}));
 assert.throws(()=>validatedSpec({...fixture,schema:'invalid'}));
 const p=qcProject();p.title='<script>alert(1)</script>';p.experiment.notes='<img src=x onerror=alert(1)>';
 const html=projectReport(p);assert.ok(!html.includes('<script>'));assert.ok(!html.includes('<img src=x'));assert.ok(html.includes('&lt;script&gt;'));
});
test('knockout handoff retains a native two-guide deletion model',()=>{
 const gb=fs.readFileSync(new URL('../vendor/design/assured-crispr-designer/test/fixtures/nr2f2-ng016753.gb',import.meta.url),'utf8');
 const ko=designProject({...input,gene:'NR2F2',mutation:'',type:'ko',reference:{name:'NR2F2',text:gb}});
 assert.equal(ko.pairs.length,1);assert.equal(ko.pairs[0].spec.design.type,'ko');assert.ok(ko.pairs[0].spec.guides.length>=1);validatedSpec(ko.pairs[0].spec);
});
test('the guided example carries the exact selected donor into simulated-read QC',async()=>{
 for(const [index,pair] of design.pairs.entries()){
  const directory=`../public/examples/pair-${index+1}/`;
  const exported=JSON.parse(fs.readFileSync(new URL(directory+'design.json',import.meta.url),'utf8'));
  assert.deepEqual(exported,pair.spec);
  const traces=['APOE_WT.ab1','APOE_A01.ab1','APOE_A02.ab1','APOE_A03.ab1'].map(name=>({name,buffer:Uint8Array.from(fs.readFileSync(new URL(directory+name,import.meta.url))).buffer}));
  const project=qcProject();project.qcSpec=pair.spec;project.dataOrigin='simulated';
  const result=await analyzeProject(project,traces);
  assert.equal(result.dataOrigin,'simulated');assert.equal(result.results[0].decision.decision,'accept');assert.ok(['hold','re-sequence'].includes(result.results[1].decision.decision));assert.ok(Math.abs(result.results[1].summary.intendedEditPct-50)<5);assert.notEqual(result.results[2].decision.decision,'accept');
 }
});
test('knockout reports expose the sequence proxy instead of a nonexistent SNP score',()=>{
 const p=qcProject();p.qc={workflow:'knockout',finishedAt:new Date().toISOString(),results:[{name:'clone1',summary:{koScorePct:93,intendedEditPct:0},decision:{decision:'hold',next:'Confirm protein.'},confidence:{tier:'moderate'}}]};
 const html=projectReport(p);assert.ok(html.includes('KO sequence proxy'));assert.ok(html.includes('93.0%'));assert.ok(!html.includes('<th>Intended edit</th>'));
});

test('knockout exercise recovers the known deletion mixtures without claiming functional evidence',async()=>{
 const dir=new URL('../public/examples/knockout/',import.meta.url);
 const spec=JSON.parse(fs.readFileSync(new URL('design.json',dir),'utf8'));
 const expected=designProject({...input,type:'ko',mutation:''});assert.deepEqual(spec,expected.pairs[0].spec);
 const names=['APOE_WT.ab1','APOE_A01.ab1','APOE_A02.ab1','APOE_A03.ab1'];
 const reads=names.map(name=>({name,buffer:Uint8Array.from(fs.readFileSync(new URL(name,dir))).buffer}));
 const p=createProject();p.qcSpec=spec;p.dataOrigin='simulated';p.isExample=true;p.input.type='ko';
 p.pairs=names.slice(1).map((edited,i)=>({sample:'KO_'+i,edited,control:names[0],confirmed:true}));
 const out=await analyzeProject(p,reads);assert.equal(out.dataOrigin,'simulated');
 for(const [i,r]of out.results.entries()){assert.equal(r.ok,true);assert.ok(Math.abs(r.summary.editedPct-[100,50,20][i])<5);assert.ok(r.summary.betweenCutsPct>=[95,45,15][i]);assert.equal(r.summary.functionalKoPct,0);assert.ok(r.summary.functionalUncertainPct>=r.summary.editedPct-5);}
});
