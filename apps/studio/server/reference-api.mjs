const ncbi='https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';
export function createReferenceHandler({fetchImpl=globalThis.fetch}={}) {
 async function request(url,timeout=15000){
  const response=await fetchImpl(url,{signal:AbortSignal.timeout(timeout)});
  if(!response.ok)throw new Error(`NCBI returned ${response.status}. Please try again or upload a GenBank file.`);
  return response;
 }
 return async function referenceHandler(req,res){
  const url=new URL(req.url,'http://localhost');
  res.setHeader('Cache-Control','no-store');res.setHeader('Content-Type','application/json');
  const send=(status,body)=>{res.statusCode=status;res.end(JSON.stringify(body));};
  try{
   if(req.method!=='GET')return send(405,{error:'Use GET.'});
   const search=url.pathname==='/api/reference/search'||url.pathname==='/api/reference'&&url.searchParams.has('gene');
   if(search){
    const gene=(url.searchParams.get('gene')||'').trim().toUpperCase();
    if(!/^[A-Z0-9-]{1,30}$/.test(gene))return send(400,{error:'Enter a human gene symbol, for example APOE.'});
    const term=`${gene}[Gene Name] AND Homo sapiens[Organism] AND refseqgene[filter]`;
    const data=await(await request(`${ncbi}esearch.fcgi?db=nuccore&retmode=json&retmax=8&term=${encodeURIComponent(term)}`)).json();
    const ids=(data.esearchresult?.idlist||[]).filter(id=>/^\d+$/.test(id));
    if(!ids.length)return send(200,{records:[]});
    const summary=await(await request(`${ncbi}esummary.fcgi?db=nuccore&retmode=json&id=${ids.join(',')}`)).json();
    const records=ids.map(id=>summary.result?.[id]).filter(x=>/^NG_\d{6,9}\.\d{1,3}$/.test(x?.accessionversion||'')).map(x=>({accession:x.accessionversion,title:x.title}));
    return send(200,{records});
   }
   if(url.pathname==='/api/reference'){
    const accession=url.searchParams.get('accession')||'';
    if(!/^NG_\d{6,9}\.\d{1,3}$/.test(accession))return send(400,{error:'Choose a versioned RefSeqGene accession.'});
    const sourceUrl=`${ncbi}efetch.fcgi?db=nuccore&id=${accession}&rettype=gbwithparts&retmode=text`;
    const response=await request(sourceUrl,20000);
    if(Number(response.headers?.get('content-length'))>2000000)return send(400,{error:'Reference is too large. Upload a smaller annotated gene record.'});
    const text=await response.text();
    if(text.length>2000000||!/^LOCUS\s/m.test(text)||!text.includes('FEATURES'))return send(400,{error:'An annotated reference is unavailable or too large. Upload a smaller annotated gene record.'});
    return send(200,{text,accession,sourceUrl});
   }
   return send(404,{error:'Reference endpoint not found.'});
  }catch(error){return send(502,{error:error.name==='TimeoutError'?'NCBI took too long to respond. Try again or upload a GenBank file.':error.message});}
 };
}
export function referenceApi(){
 const handler=createReferenceHandler();
 const middleware=(req,res,next)=>{const path=new URL(req.url,'http://localhost').pathname;return path==='/api/reference'||path==='/api/reference/search'?handler(req,res):next();};
 return {name:'assured-reference',configureServer(server){server.middlewares.use(middleware);},configurePreviewServer(server){server.middlewares.use(middleware);}};
}
