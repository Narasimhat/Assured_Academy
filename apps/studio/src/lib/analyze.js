import { parseAbif } from '../../vendor/qc/src/abif.js';
import { planDesign, analyseSample } from '../../vendor/qc/src/batch.js';
import { decide } from '../../vendor/qc/src/decision.js';
import { withRecommendations } from '../../vendor/qc/src/recommend.js';
import { validateDesignSpec } from '../../vendor/qc/src/designSpec.js';
import { autoPair } from '../../vendor/qc/src/sheet.js';
import { ENGINE_VERSIONS, pairsReady } from './project.js';
export function suggestPairs(files) {
 const names=files.map(x=>x.name);
 if(new Set(names).size!==names.length) throw new Error('Duplicate filenames were found. Rename them before adding traces.');
 const paired=autoPair(names);
 return {pairs:paired.pairs.map(x=>({sample:x.sample,control:x.control[0]||'',edited:x.edited[0]||'',confirmed:false,reason:x.reason,confidence:x.confidence})),problems:[...paired.problems,...paired.unpaired.map(x=>`${x.name}: ${x.reason}`)]};
}
const digest=async(buffer)=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',buffer)),x=>x.toString(16).padStart(2,'0')).join('');
export async function analyzeProject(project,files,onProgress=()=>{}) {
 if(!pairsReady(project,files)) throw new Error('Confirm a unique control/edited pairing and sample name for every row.');
 const validation=validateDesignSpec(project.qcSpec);
 if(!validation.ok) throw new Error(validation.errors.join(' '));
 if(!['snp','knockout','deletion'].includes(project.qcSpec.design.editKind)) throw new Error('This workspace currently analyzes point mutations and knockouts. Large-insert junction analysis is not yet integrated.');
 const byName=new Map(files.map(x=>[x.name,x]));
 const workflow=project.qcSpec.design.editKind==='snp'?'snp':project.qcSpec.guides.length>1?'deletion':'knockout';
 const results=[];const hashes={};
 for(const file of files) hashes[file.name]=await digest(file.buffer);
 const specHash=await digest(new TextEncoder().encode(JSON.stringify(project.qcSpec)));
 for(const [i,pair] of project.pairs.entries()) {
  onProgress({done:i,total:project.pairs.length,name:pair.sample});
  try {
   const control=parseAbif(byName.get(pair.control).buffer,pair.control);
   const edited=parseAbif(byName.get(pair.edited).buffer,pair.edited);
   const plan=planDesign({designSpec:project.qcSpec,control});
   if(plan.error) throw new Error(plan.error);
   const result=analyseSample({name:pair.sample,spec:plan.spec,control,edited,sampleType:project.sampleType,options:{codingInput:plan.codingInput||null}});
   const decision=decide(workflow,result,{goal:project.goal});
   // Trace fractions for a pool do not establish a single clone genotype.
   if(project.sampleType==='pool' && decision.decision==='accept') {
    decision.decision='hold';decision.reasons=[...(decision.reasons||[]),'Pool composition does not establish a clonal genotype.'];decision.next='Isolate clones and sequence them before making a clone acceptance decision.';
   }
   results.push({...result,name:pair.sample,decision,sampleType:project.sampleType,workflow,warnings:[...(plan.warnings||[]),...(result.warnings||[])],inputs:{controls:[{file:pair.control,sha256:hashes[pair.control]}],edited:[{file:pair.edited,sha256:hashes[pair.edited]}]}});
  } catch(error) {
   results.push({name:pair.sample,ok:false,error:error.message,warnings:[],decision:{decision:'re-sequence',reasons:[error.message],next:'Check the input files and control pairing, then analyze again.'}});
  }
 }
 onProgress({done:results.length,total:results.length,name:''});
 const ranked=project.sampleType==='clone'?withRecommendations(results):results;
 return {results:ranked,workflow,sampleType:project.sampleType,dataOrigin:project.dataOrigin||'user',goal:project.goal,finishedAt:new Date().toISOString(),engineVersions:ENGINE_VERSIONS,specHash,hashes,notes:validation.warnings};
}
