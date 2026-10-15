import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';import {createHash} from 'node:crypto';
const manifest=JSON.parse(fs.readFileSync(new URL('../vendor/SHA256SUMS.json',import.meta.url),'utf8'));
const root=fileURLToPath(new URL('..',import.meta.url));const changed=[];
for(const [name,hash] of Object.entries(manifest)){const file=path.join(root,name);if(!fs.existsSync(file)||createHash('sha256').update(fs.readFileSync(file)).digest('hex')!==hash)changed.push(name);}
if(changed.length){console.error('Vendor source changed:',changed.join('\n'));process.exitCode=1;}else console.log(`Verified ${Object.keys(manifest).length} pinned source files.`);
