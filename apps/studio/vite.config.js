import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const ncbi = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';
async function getJson(url) {
 const res = await fetch(url, {signal: AbortSignal.timeout(15000)});
 if (!res.ok) throw new Error(`NCBI returned ${res.status}. Try again or upload a GenBank file.`);
 return res.json();
}
function referenceApi() {
 const middleware = async (req, res, next) => {
  const url = new URL(req.url, 'http://localhost');
  if (!url.pathname.startsWith('/api/reference')) return next();
  res.setHeader('Cache-Control','no-store');res.setHeader('Content-Type','application/json');
  try {
   if (req.method !== 'GET') {res.statusCode=405;return res.end(JSON.stringify({error:'Use GET.'}));}
   if (url.pathname === '/api/reference/search') {
    const gene = (url.searchParams.get('gene') || '').trim();
    if (!/^[A-Za-z0-9-]{1,30}$/.test(gene)) throw new Error('Enter a human gene symbol, for example APOE.');
    const term = `${gene}[Gene Name] AND Homo sapiens[Organism] AND refseqgene[filter]`;
    const search = await getJson(`${ncbi}esearch.fcgi?db=nuccore&retmode=json&retmax=8&term=${encodeURIComponent(term)}`);
    const ids = search.esearchresult?.idlist || [];
    if (!ids.length) return res.end(JSON.stringify({records:[]}));
    const summary = await getJson(`${ncbi}esummary.fcgi?db=nuccore&retmode=json&id=${ids.join(',')}`);
    const records = ids.map(id=>summary.result?.[id]).filter(x=>x?.accessionversion?.startsWith('NG_')).map(x=>({accession:x.accessionversion,title:x.title}));
    return res.end(JSON.stringify({records}));
   }
   if (url.pathname === '/api/reference') {
    const accession = url.searchParams.get('accession') || '';
    if (!/^NG_\d{6,9}\.\d{1,3}$/.test(accession)) throw new Error('Choose a versioned RefSeqGene accession.');
    const sourceUrl = `${ncbi}efetch.fcgi?db=nuccore&id=${accession}&rettype=gbwithparts&retmode=text`;
    const response = await fetch(sourceUrl,{signal:AbortSignal.timeout(20000)});
    if (!response.ok) throw new Error('Reference download failed. Upload a GenBank file instead.');
    const text=await response.text();
    if (text.length>2000000 || !text.startsWith('LOCUS')) throw new Error('Reference is unavailable or too large; upload a smaller annotated gene record.');
    return res.end(JSON.stringify({text,accession,sourceUrl}));
   }
   res.statusCode=404;res.end(JSON.stringify({error:'Reference endpoint not found.'}));
  } catch(error) {res.statusCode=400;res.end(JSON.stringify({error:error.message}));}
 };
 return {name:'assured-reference',configureServer(s){s.middlewares.use(middleware)},configurePreviewServer(s){s.middlewares.use(middleware)}};
}
export default defineConfig({plugins:[react(),referenceApi()],css:{postcss:{plugins:[]}},build:{chunkSizeWarningLimit:750},server:{fs:{strict:true}}});
