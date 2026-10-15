export function runWorker(payload,onProgress,signal) {
 return new Promise((resolve,reject)=>{
  const worker=new Worker(new URL('../workers/engine.worker.js',import.meta.url),{type:'module'});
  const finish=(value,error)=>{worker.terminate();signal?.removeEventListener('abort',cancel);error?reject(error):resolve(value);};
  const cancel=()=>finish(null,new Error('Analysis canceled. Your inputs are preserved.'));
  if(signal?.aborted){cancel();return;}
  signal?.addEventListener('abort',cancel,{once:true});
  worker.onmessage=({data})=>{if(data.progress)onProgress?.(data.progress);else finish(data.value,data.error?new Error(data.error):null);};
  worker.onerror=(event)=>finish(null,new Error(event.message||'The analysis worker stopped.'));
  worker.postMessage(payload);
 });
}
