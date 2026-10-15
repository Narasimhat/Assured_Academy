// Recreate exact design handoffs for the two native APOE worked-example alternatives.
import fs from 'node:fs';
import {designProject} from '../src/lib/engine.js';
const design=designProject({gene:'APOE',mutation:'R176C',type:'pm',delivery:'rnp',reference:{text:fs.readFileSync('public/examples/apoe-reference.gb','utf8')}});
for(const [i,pair] of design.pairs.entries()){
 const dir=`public/examples/pair-${i+1}`;fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(`${dir}/design.json`,JSON.stringify(pair.spec,null,2)+'\n');
}
