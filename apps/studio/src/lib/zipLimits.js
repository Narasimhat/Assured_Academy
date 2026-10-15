// Inspect ZIP central-directory sizes before asking JSZip to inflate local project data.
// ZIP64, encrypted archives, and multi-disk archives are deliberately unsupported.
export function checkZipLimits(buffer) {
 const v=new DataView(buffer);const len=v.byteLength;
 let end=-1;
 for(let i=len-22;i>=Math.max(0,len-65557);i--){if(v.getUint32(i,true)===0x06054b50 && i+22+v.getUint16(i+20,true)===len){end=i;break;}}
 if(end<0)throw new Error('This is not a supported ZIP project.');
 if(v.getUint16(end+4,true)||v.getUint16(end+6,true))throw new Error('Multi-disk project archives are unsupported.');
 const count=v.getUint16(end+10,true),offset=v.getUint32(end+16,true),size=v.getUint32(end+12,true);
 if(count>202||count===65535||offset===0xffffffff||size===0xffffffff||offset+size>end)throw new Error('Archive exceeds supported project limits.');
 let p=offset,total=0;
 for(let i=0;i<count;i++){
  if(p+46>end||v.getUint32(p,true)!==0x02014b50)throw new Error('Invalid ZIP directory.');
  if(v.getUint16(p+8,true)&1)throw new Error('Encrypted project archives are unsupported.');
  const expanded=v.getUint32(p+24,true);total+=expanded;
  if(expanded===0xffffffff||expanded>30000000||total>150*1024*1024)throw new Error('Expanded project exceeds supported limits.');
  p+=46+v.getUint16(p+28,true)+v.getUint16(p+30,true)+v.getUint16(p+32,true);
  if(p>offset+size)throw new Error('Invalid ZIP entry size.');
 }
 if(p!==offset+size)throw new Error('Invalid ZIP directory size.');
 return {files:count,total};
}
