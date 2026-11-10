// Original, reproducible pixel art for the bat pet (issue #973).
// Run: node scripts/generate-bat.mjs (no dependencies).
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const media = join(dirname(dirname(fileURLToPath(import.meta.url))), 'media', 'bat');
const size = 32, scale = 4;
const colors = [[0,0,0,0],[25,19,41,255],[47,35,76,255],[91,61,126,255],[143,93,159,255],[255,250,244,255],[239,135,178,255],[46,216,81,255],[201,255,212,255]];
function asciiBytes(s){return [...s].map(c=>c.charCodeAt(0))}

function makeCanvas(){
 const pixels=new Uint8Array(size*size);
 function put(x,y,color){x=Math.round(x);y=Math.round(y);if(x>0&&y>0&&x<size-1&&y<size-1)pixels[y*size+x]=color}
 function ellipse(cx,cy,rx,ry,color){for(let y=Math.ceil(cy-ry);y<=Math.floor(cy+ry);y++)for(let x=Math.ceil(cx-rx);x<=Math.floor(cx+rx);x++)if((x-cx)**2/rx**2+(y-cy)**2/ry**2<=1)put(x,y,color)}
 function polygon(vertices,color){for(let y=1;y<size-1;y++)for(let x=1;x<size-1;x++){let inside=false;for(let a=0,b=vertices.length-1;a<vertices.length;b=a++){const [xi,yi]=vertices[a],[xj,yj]=vertices[b];if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)inside=!inside}if(inside)put(x,y,color)}}
 return {pixels,put,ellipse,polygon}
}

function draw(state,tick){
 const c=makeCanvas();const {put,ellipse,polygon}=c;
 const bob=state==='run'?[0,-2,-1,-2][tick]:state==='walk_fast'?[0,-1,0,-1][tick]:state==='walk'?[0,0,-1,0][tick]:[0,-1,0,-1][tick];
 const spread=state==='run'?[8,12,10,12][tick]:state==='walk_fast'?[7,10,8,10][tick]:state==='swipe'?[6,6,11,11][tick]:state==='walk'?[6,8,6,8][tick]:[7,8,7,8][tick];
 const lift=state==='run'?[0,3,1,3][tick]:state==='swipe'?[0,1,5,4][tick]:[1,2,3,2][tick];
 const y=n=>n+bob;
 polygon([[13,y(18)],[13-spread,y(14-lift)],[13-spread+1,y(21-lift)],[9,y(20)],[8,y(24)],[12,y(21)]],1);
 polygon([[13,y(18)],[13-spread+1,y(15-lift)],[13-spread+2,y(20-lift)],[9,y(19)],[10,y(22)],[13,y(20)]],3);
 polygon([[18,y(18)],[18+spread,y(14-lift)],[18+spread-1,y(21-lift)],[22,y(20)],[23,y(24)],[19,y(21)]],1);
 polygon([[18,y(18)],[18+spread-1,y(15-lift)],[18+spread-2,y(20-lift)],[22,y(19)],[21,y(22)],[18,y(20)]],3);
 put(13-spread+3,y(18-lift),4);put(18+spread-3,y(18-lift),4);put(10,y(19),4);put(21,y(19),4);
 put(13,y(28),1);put(14,y(29),1);put(17,y(28),1);put(18,y(29),1);
 ellipse(15.5,y(22),5.5,7,1);ellipse(15.5,y(22),4.5,6,2);
 polygon([[10,y(15)],[11,y(7)],[16,y(13)]],1);
 polygon([[21,y(15)],[20,y(7)],[15,y(13)]],1);
 polygon([[12,y(12)],[12,y(9)],[15,y(13)]],6);
 polygon([[19,y(12)],[19,y(9)],[16,y(13)]],6);
 ellipse(15.5,y(16),5.5,5,1);ellipse(15.5,y(16),4.5,4,2);
 if(state==='idle'&&tick===3){put(13,y(16),5);put(14,y(16),5);put(17,y(16),5);put(18,y(16),5)}
 else{ellipse(13.5,y(16),1.3,1.6,5);ellipse(17.5,y(16),1.3,1.6,5);put(14,y(16),1);put(18,y(16),1)}
 put(15,y(19),6);put(16,y(19),6);put(14,y(21),4);put(17,y(21),4);
 if(state==='with_ball'){ellipse(20,y(25),4.2,4.2,1);ellipse(20,y(25),3.4,3.4,7);put(19,y(23),8);put(18,y(24),8);put(17,y(26),2);put(18,y(27),2)}
 return c.pixels
}

function pack(...parts){const length=parts.reduce((n,a)=>n+a.length,0),output=new Uint8Array(length);let offset=0;for(const part of parts){output.set(part,offset);offset+=part.length}return output}

function word16(number){return [number&255,(number>>8)&255]}

function word32(number){return[(number>>>24)&255,(number>>>16)&255,(number>>>8)&255,number&255]}

function lzw(indices,minBits=4){
 const clear=1<<minBits,end=clear+1;let dictionary=new Map(),next=end+1,bits=minBits+1;
 const encoded=[];let value=0,count=0;
 function emit(code){value|=code<<count;count+=bits;while(count>=8){encoded.push(value&255);value>>>=8;count-=8}}
 function getCode(word){return word.indexOf(',')<0?+word:dictionary.get(word)}
 emit(clear);let word=String(indices[0]);
 for(let i=1;i<indices.length;i++){
  const k=indices[i],key=`${word},${k}`;
  if(dictionary.has(key)){word=key;continue}
  emit(getCode(word));
  if(next<4096){dictionary.set(key,next++);if(next>(1<<bits)&&bits<12)bits++}
  else{emit(clear);dictionary=new Map();next=end+1;bits=minBits+1}
  word=String(k)
 }
 emit(getCode(word));emit(end);if(count>0)encoded.push(value&255);
 const chunks=[];for(let start=0;start<encoded.length;start+=255){const block=encoded.slice(start,start+255);chunks.push([block.length,...block])}
 return chunks.flat().concat(0)
}

function gif(frames){
 const width=size*scale;
 const bytes=[...asciiBytes('GIF89a'),...word16(width),...word16(width),0xF3,0,0,...colors.flatMap(c=>c.slice(0,3)),...Array(16-colors.length).fill(0).flatMap(()=>[0,0,0]),0x21,0xFF,0x0B,...asciiBytes('NETSCAPE2.0'),3,1,0,0,0];
 for(const [i,pixels] of frames.entries()){
  const indexes=new Uint8Array(width*width);
  for(let y=0;y<width;y++)for(let x=0;x<width;x++)indexes[y*width+x]=pixels[Math.floor(y/scale)*size+Math.floor(x/scale)];
  bytes.push(0x21,0xF9,4,9,...word16(i%2?13:12),0,0);
  bytes.push(0x2C,...word16(0),...word16(0),...word16(width),...word16(width),0);
  bytes.push(4,...lzw(indexes))
 }
 bytes.push(0x3B);
 return Uint8Array.from(bytes)
}

function crc32(bytes){let crc=0xFFFFFFFF;for(const b of bytes){crc^=b;for(let k=0;k<8;k++)crc=(crc>>>1)^(crc&1?0xEDB88320:0)}return(crc^0xFFFFFFFF)>>>0}

function adler32(bytes){let a=1,b=0;for(const x of bytes){a=(a+x)%65521;b=(b+a)%65521}return((b<<16)|a)>>>0}

function chunk(type,data){const header=Uint8Array.from(asciiBytes(type)),body=pack(header,data);return Uint8Array.from([...word32(data.length),...body,...word32(crc32(body))])}

function png(pixels){
 const scanlines=[];for(let y=0;y<size;y++){scanlines.push(0);for(let x=0;x<size;x++)scanlines.push(...colors[pixels[y*size+x]])}
 const raw=Uint8Array.from(scanlines),stream=[0x78,0x01];
 for(let start=0;start<raw.length;start+=65535){const part=raw.slice(start,start+65535),final=start+part.length===raw.length;stream.push(final?1:0,...word16(part.length),...word16(~part.length&65535),...part)}
 stream.push(...word32(adler32(raw)));
 return pack(Uint8Array.from([137,80,78,71,13,10,26,10]),chunk('IHDR',Uint8Array.from([...word32(size),...word32(size),8,6,0,0,0])),chunk('IDAT',Uint8Array.from(stream)),chunk('IEND',new Uint8Array()))
}
mkdirSync(media, {recursive:true});
for (const state of ["idle","walk","walk_fast","run","swipe","with_ball"]) {
  writeFileSync(join(media, 'black_' + state + '_8fps.gif'),
    gif([0,1,2,3].map(t => draw(state,t))));
}
writeFileSync(join(media, 'icon.png'), png(draw('idle',0)));
console.log('Generated six 8fps bat GIFs and a PNG icon.');
