import { spawnSync } from 'node:child_process';
import { cp, mkdir } from 'node:fs/promises';
function run(args, env = {}) {
 const r = spawnSync('npm', args, {stdio:'inherit', env:{...process.env,...env}});
 if (r.status !== 0) process.exit(r.status || 1);
}
const studioOnly = process.argv.includes('--studio-only');
if (!studioOnly) run(['run','build:academy']);
run(['run','build','--workspace=apps/studio','--','--base=/studio/'], {VITE_REFERENCE_LOOKUP:'false',VITE_ACADEMY_HOME:'/'});
if (studioOnly) process.exit(0);
await mkdir('dist/studio',{recursive:true});
await cp('apps/studio/dist','dist/studio',{recursive:true});
console.log('Built Academy and Studio together at / and /studio/.');
