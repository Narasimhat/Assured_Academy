import { createProject, validateProject } from './project.js';
import { checkZipLimits } from './zipLimits.js';
const DB='assured-studio-v1';
function open(){return new Promise((resolve,reject)=>{const req=indexedDB.open(DB,1);req.onupgradeneeded=()=>req.result.createObjectStore('workspace');req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});}
export async function readWorkspace() {
 const db=await open();
 try{return await new Promise((resolve,reject)=>{const req=db.transaction('workspace').objectStore('workspace').get('current');req.onsuccess=()=>resolve(req.result?{project:validateProject(req.result.project),files:req.result.files||[]}:null);req.onerror=()=>reject(req.error);});}finally{db.close();}
}
export async function saveWorkspace(project,files) {
 const db=await open();
 try{await new Promise((resolve,reject)=>{const tx=db.transaction('workspace','readwrite');tx.objectStore('workspace').put({project,files},'current');tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('Save aborted'));});}finally{db.close();}
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
