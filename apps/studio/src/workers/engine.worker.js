import { designProject } from '../lib/engine.js';
import { analyzeProject } from '../lib/analyze.js';
self.onmessage=async({data})=>{
 try {
  const value=data.kind==='design'?designProject(data.input):await analyzeProject(data.project,data.files,progress=>self.postMessage({progress}));
  if(data.kind==='design')value.reference.sha256=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(data.input.reference.text))),x=>x.toString(16).padStart(2,'0')).join('');
  self.postMessage({value});
 } catch(error) {self.postMessage({error:error.message});}
};
