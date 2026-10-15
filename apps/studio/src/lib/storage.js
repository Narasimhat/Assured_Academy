import { createProject, validateProject } from './project.js';
import { checkZipLimits } from './zipLimits.js';
const DB='assured-studio-v1';
function summary(project) { return {id:project.id,title:project.title,updatedAt:project.updatedAt,gene:project.input.gene,type:project.input.type,isExample:project.isExample,dataOrigin:project.dataOrigin,status:project.qc?'Evidence available':project.qcSpec?'Design available':'Question in progress',samples:project.qc?.results?.length||0}; }
export function hasProjectContent(project,files=[]) { return Boolean(files.length||project.importedProjectId||project.input.cellLine||project.input.mutation||project.input.type!=='pm'||project.input.delivery!=='rnp'||project.input.gene||project.input.reference||project.qcSpec||project.qc||project.experiment.notes||project.title!=='Untitled exploration'); }
function open(){return new Promise((resolve,reject)=>{
 const req=indexedDB.open(DB,2);
 req.onupgradeneeded=()=>{
  const db=req.result;
  if(!db.objectStoreNames.contains('workspace'))db.createObjectStore('workspace');
  if(!db.objectStoreNames.contains('projects'))db.createObjectStore('projects');
  if(!db.objectStoreNames.contains('catalog'))db.createObjectStore('catalog');
  const old=req.transaction.objectStore('workspace').get('current');
  old.onsuccess=()=>{if(old.result?.project?.id&&hasProjectContent(old.result.project,old.result.files||[])){req.transaction.objectStore('projects').put(old.result,old.result.project.id);req.transaction.objectStore('catalog').put(summary(old.result.project),old.result.project.id);}};
 };
 req.onsuccess=()=>{req.result.onversionchange=()=>req.result.close();resolve(req.result);};req.onerror=()=>reject(req.error);
 req.onblocked=()=>reject(new Error('Close other Assured tabs, then reload to upgrade your local project library.'));
});}
async function readRecord(store,key) {
 const db=await open();try{return await new Promise((resolve,reject)=>{const req=db.transaction(store).objectStore(store).get(key);req.onsuccess=()=>resolve(req.result?{project:validateProject(req.result.project),files:req.result.files||[]}:null);req.onerror=()=>reject(req.error);});}finally{db.close();}
}
export function readWorkspace(){return readRecord('workspace','current');}
export function readProject(id){return readRecord('projects',id);}
export async function listProjects(){
 const db=await open();try{return await new Promise((resolve,reject)=>{const req=db.transaction('catalog').objectStore('catalog').getAll();req.onsuccess=()=>resolve(req.result.sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt)));req.onerror=()=>reject(req.error);});}finally{db.close();}
}
let saving=Promise.resolve();
export function saveWorkspace(project,files) {
 // Snapshot at invocation and serialize saves so an older write cannot replace newer work.
 const record=structuredClone({project,files});
 const write=async()=>{const db=await open();try{await new Promise((resolve,reject)=>{
  const tx=db.transaction(['workspace','projects','catalog'],'readwrite');
  tx.objectStore('workspace').put(record,'current');
  if(hasProjectContent(record.project,record.files)){tx.objectStore('projects').put(record,record.project.id);tx.objectStore('catalog').put(summary(record.project),record.project.id);}
  tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('Save aborted'));
 });}finally{db.close();}};
 const next=saving.then(write,write);saving=next.catch(()=>{});return next;
}
export async function exportBundle(project,files) {
 const {default:JSZip}=await import('jszip');
 const zip=new JSZip();
 zip.file('project.json',JSON.stringify(project,null,2));
 for(const file of files) zip.file(`traces/${file.name}`,file.buffer);
 zip.file('ABOUT.txt','Assured Studio local project. Contains reference, design, experiment notes, QC results, and any attached raw traces. Treat as research data. Example traces are simulated.\n');
 return zip.generateAsync({type:'blob',compression:'DEFLATE'});
}
export async function importBundle(file) {
 if(file.size>100*1024*1024)throw new Error('Project exceeds the 100 MB import limit.');
 const {default:JSZip}=await import('jszip');
 const buffer=await file.arrayBuffer();checkZipLimits(buffer);
 const zip=await JSZip.loadAsync(buffer);
 if(!zip.file('project.json'))throw new Error('No project.json was found in this bundle.');
 const projectText=await zip.file('project.json').async('string');
 if(projectText.length>30000000)throw new Error('Project record is too large.');
 const project=validateProject(JSON.parse(projectText));
 // Loaded evidence must carry the same pinned engine identity; never quietly upgrade it.
 const files=[];let total=projectText.length;
 const entries=Object.values(zip.files).filter(x=>!x.dir&&x.name.startsWith('traces/'));
 if(entries.length>200)throw new Error('Project contains more than 200 traces.');
 for(const entry of entries){
  const name=entry.name.slice(7);
  if(!/^[^/\\]+\.(ab1|abi)$/i.test(name))throw new Error('Unsupported trace filename in bundle.');
  const buffer=await entry.async('arraybuffer');total+=buffer.byteLength;
  if(total>150*1024*1024)throw new Error('Expanded project exceeds 150 MB.');
  files.push({name,buffer});
 }
 if(new Set(files.map(f=>f.name)).size!==files.length)throw new Error('Project contains duplicate trace filenames.');
 return {project,files};
}
export function download(name,data,type='application/json'){
 const blob=data instanceof Blob?data:new Blob([typeof data==='string'?data:JSON.stringify(data,null,2)],{type});
 const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),15000);
}
export {createProject};
