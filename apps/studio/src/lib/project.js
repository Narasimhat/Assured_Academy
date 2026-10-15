export const PROJECT_SCHEMA = 'assured-studio/1';
export const ENGINE_VERSIONS = {design:'820b19654aa5393e051100a03c6ac69e351791ae',qc:'462d24668cf19af59b4a3902582c6efb4168d290'};
export function createProject() {
 return {schema:PROJECT_SCHEMA,id:globalThis.crypto.randomUUID(),createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),title:'Untitled exploration',isExample:false,dataOrigin:'user',input:{gene:'',mutation:'',cellLine:'',delivery:'rnp',type:'pm',reference:null},design:null,selectedPair:0,qcSpec:null,qcOrigin:null,pairs:[],sampleType:'clone',goal:'homozygous',qc:null,experiment:{notes:'',parentalVerified:false,specificityVerified:false},engineVersions:ENGINE_VERSIONS};
}
export function validateProject(p) {
 if (!p || p.schema!==PROJECT_SCHEMA) throw new Error('This is not a supported Assured Studio project.');
 if (!p.id || typeof p.id!=='string' || !p.input || typeof p.input.gene!=='string' || !['pm','ko'].includes(p.input.type)) throw new Error('The project has invalid inputs.');
 for (const k of ['mutation','cellLine','delivery']) if(typeof p.input[k]!=='string') throw new Error(`Invalid project field: ${k}`);
 if (!['clone','pool'].includes(p.sampleType) || !['homozygous','any'].includes(p.goal)) throw new Error('Invalid sample type or acceptance goal.');
 if (p.input.reference && (typeof p.input.reference.text!=='string' || p.input.reference.text.length>2000000)) throw new Error('The reference is invalid or exceeds 2 MB.');
 if (!Array.isArray(p.pairs) || p.pairs.length>500) throw new Error('Invalid trace pairing table.');
 for(const pair of p.pairs) if(typeof pair.sample!=='string' || typeof pair.control!=='string' || typeof pair.edited!=='string') throw new Error('Invalid trace pairing row.');
 if (!p.experiment || typeof p.experiment.notes!=='string') throw new Error('Invalid experiment record.');
 if(p.design){
  if(!Array.isArray(p.design.pairs)||!p.design.pairs.length||p.design.pairs.length>10||!p.design.result||!p.design.reference||!p.design.readiness||!Array.isArray(p.design.readiness.notes)||p.design.readiness.notes.some(x=>typeof x!=='string'))throw new Error('Invalid saved design.');
  if(!Number.isInteger(p.selectedPair)||!p.design.pairs[p.selectedPair])throw new Error('Invalid selected design alternative.');
  for(const pair of p.design.pairs){if(!pair.spec||typeof pair.label!=='string')throw new Error('Invalid design alternative.');if(pair.donor&&(!Array.isArray(pair.donor.silentMutations)||typeof pair.donor.od!=='string'))throw new Error('Invalid matched donor.');}
 }
 if(p.qc && (!Array.isArray(p.qc.results)||p.qc.results.length>500)) throw new Error('Invalid QC results.');
 return p;
}
export function updateInput(project, patch) {
 return {...project,input:{...project.input,...patch},design:null,qcSpec:null,qcOrigin:null,qc:null,selectedPair:0,isExample:false,experiment:{...project.experiment,parentalVerified:false,specificityVerified:false}};
}
export function setSelectedPair(project,index) {
 if (!project.design?.pairs[index]) throw new Error('Choose an available guide–donor pair.');
 return {...project,selectedPair:index,qcSpec:project.design.pairs[index].spec,qcOrigin:'design',qc:null,pairs:project.pairs.map(row=>({...row,confirmed:false}))};
}
export function updatePair(project,index,patch) {
 return {...project,pairs:project.pairs.map((row,i)=>i===index?{...row,...patch,confirmed:false}:row),qc:null};
}
export function projectStatus(p) {
 if (p.qc) return 'Results available';
 if (p.qcSpec) return p.design?'Design needs review':'Ready to pair reads';
 if (p.input.reference) return 'Reference added';
 return 'Start exploring';
}
export function pairsReady(p,files) {
 if (!p.qcSpec || !p.pairs.length) return false;
 const names=new Set(files.map(f=>f.name));
 return p.pairs.every(x=>x.confirmed && x.sample.trim() && x.control && x.edited && x.control!==x.edited && names.has(x.control) && names.has(x.edited)) && new Set(p.pairs.map(x=>x.sample.trim())).size===p.pairs.length && new Set(p.pairs.map(x=>x.edited)).size===p.pairs.length;
}
