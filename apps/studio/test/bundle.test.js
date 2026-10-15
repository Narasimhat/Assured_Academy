import test from 'node:test';
import assert from 'node:assert/strict';
import JSZip from 'jszip';
import {createProject} from '../src/lib/project.js';
import {exportBundle,importBundle} from '../src/lib/storage.js';
import {checkZipLimits} from '../src/lib/zipLimits.js';
test('portable bundle restores reference, selections, notes, and original trace bytes',async()=>{
 const p=createProject();p.input.gene='APOE';p.experiment.notes='One guide, one donor.';
 const files=[{name:'parental.ab1',buffer:Uint8Array.from([65,66,73,70,4,5]).buffer}];
 const bundle=await exportBundle(p,files);const restored=await importBundle(bundle);
 assert.deepEqual(restored.project,p);assert.deepEqual(restored.files,files);
});
test('unknown versions, missing projects, unsupported trace entries, and unsafe expanded sizes are rejected',async()=>{
 const missing=new JSZip();missing.file('notes.txt','not a project');await assert.rejects(()=>importBundle(awaitBlob(missing)),/project.json/);
 const invalid=new JSZip();invalid.file('project.json',JSON.stringify({schema:'assured-studio/99'}));await assert.rejects(()=>importBundle(awaitBlob(invalid)),/supported/);
 const zip=new JSZip();zip.file('project.json',JSON.stringify(createProject()));zip.file('traces/foreign.exe','binary');await assert.rejects(()=>importBundle(awaitBlob(zip)),/Unsupported/);
 const bytes=await zip.generateAsync({type:'uint8array'});const view=new DataView(bytes.buffer);let central=-1;for(let i=0;i<bytes.length-46;i++){if(view.getUint32(i,true)===0x02014b50){central=i;break;}}view.setUint32(central+24,0xffffffff,true);assert.throws(()=>checkZipLimits(bytes.buffer),/limits/);
});
function awaitBlob(zip){return {size:100,arrayBuffer:async()=>{const x=await zip.generateAsync({type:'uint8array'});return x.buffer;}};}
