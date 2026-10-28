import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
const root=path.resolve('dist');
const types={'.html':'text/html; charset=utf-8','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.ico':'image/x-icon','.json':'application/json'};
http.createServer(async(req,res)=>{try{
 const url=new URL(req.url,'http://localhost');const base=(process.env.PAGES_BASE_PATH||'/').replace(/\/$/,'');const pathname=base&&url.pathname.startsWith(base+'/')?url.pathname.slice(base.length):url.pathname;const filename=path.resolve(root,'.'+decodeURIComponent(pathname));
 if(filename!==root&&!filename.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 let target=filename,status=200;
 try{if((await stat(target)).isDirectory()){if(!url.pathname.endsWith('/')){res.writeHead(301,{Location:url.pathname+'/'+url.search});res.end();return;}target=path.join(target,'index.html');}await stat(target);}catch{target=path.join(root,'404.html');status=404;}
 let body=await readFile(target);const type=types[path.extname(target)]??'application/octet-stream';const headers={'Content-Type':type};
 if(/text|javascript|json|xml|svg/.test(type)&&req.headers['accept-encoding']?.includes('gzip')){body=gzipSync(body);headers['Content-Encoding']='gzip';headers.Vary='Accept-Encoding';}
 res.writeHead(status,headers);res.end(req.method==='HEAD'?undefined:body);
}catch{res.writeHead(500);res.end('Static preview failed');}}).listen(Number(process.env.PORT??4322),'0.0.0.0',()=>console.log('Static site listening on '+(process.env.PORT??4322)));
