import test from 'node:test';
import assert from 'node:assert/strict';
import {createReferenceHandler} from '../../apps/studio/server/reference-api.mjs';
async function call(handler,url,method='GET'){
 const result={headers:{},setHeader(k,v){this.headers[k]=v;},end(text){this.body=JSON.parse(text);}};
 await handler({url,method},result);return result;
}
test('search constrains NCBI requests and returns versioned RefSeqGene choices',async()=>{
 const urls=[];const handler=createReferenceHandler({fetchImpl:async url=>{urls.push(url);return {ok:true,json:async()=>urls.length===1?{esearchresult:{idlist:['123','456']}}:{result:{123:{accessionversion:'NG_007084.2',title:'APOE'},456:{accessionversion:'NM_000041.4',title:'transcript'}}}};}});
 const res=await call(handler,'/api/reference?gene=apoe');assert.equal(res.statusCode,200);assert.deepEqual(res.body.records,[{accession:'NG_007084.2',title:'APOE'}]);assert.ok(urls.every(u=>u.startsWith('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/')));assert.match(decodeURIComponent(urls[0]),/APOE\[Gene Name\].*Homo sapiens/);
});
test('invalid inputs and methods do not trigger network calls',async()=>{
 const handler=createReferenceHandler({fetchImpl:async()=>{throw Error('Unexpected network call');}});
 for(const url of ['/api/reference?gene=https://example.com','/api/reference?accession=NM_000041.4'])assert.equal((await call(handler,url)).statusCode,400);
 assert.equal((await call(handler,'/api/reference?gene=APOE','POST')).statusCode,405);
});
test('empty searches, upstream failures and bad references remain explicit',async()=>{
 assert.deepEqual((await call(createReferenceHandler({fetchImpl:async()=>({ok:true,json:async()=>({esearchresult:{idlist:[]}})})}),'/api/reference?gene=NORESULT')).body,{records:[]});
 const failed=await call(createReferenceHandler({fetchImpl:async()=>({ok:false,status:429})}),'/api/reference?gene=APOE');assert.equal(failed.statusCode,502);assert.match(failed.body.error,/429/);
 const bad=await call(createReferenceHandler({fetchImpl:async()=>({ok:true,headers:new Headers(),text:async()=>'<html>Unavailable</html>'})}),'/api/reference?accession=NG_007084.2');assert.equal(bad.statusCode,400);
});
test('download returns annotated reference text and its source URL',async()=>{
 const text='LOCUS       APOE\nFEATURES             Location/Qualifiers\nORIGIN\n//';
 const res=await call(createReferenceHandler({fetchImpl:async()=>({ok:true,headers:new Headers(),text:async()=>text})}),'/api/reference?accession=NG_007084.2');assert.equal(res.statusCode,200);assert.equal(res.body.text,text);assert.equal(res.body.accession,'NG_007084.2');assert.equal(res.headers['Cache-Control'],'no-store');
});
