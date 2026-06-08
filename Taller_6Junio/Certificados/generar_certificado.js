// node make.js "Nombre Español" "이름 코리안" /out.pdf
const chromium=require('@sparticuz/chromium').default;const {chromium:pw}=require('playwright-core');const fs=require('fs');
(async()=>{
 const name=process.argv[2]||'NOMBRE APELLIDO', kr=process.argv[3]||'', out=process.argv[4]||'/tmp/certb/out.pdf';
 const exe=await chromium.executablePath();const b=await pw.launch({executablePath:exe,args:chromium.args});
 const page=await b.newPage({viewport:{width:1123,height:794},deviceScaleFactor:2});
 let html=fs.readFileSync('/tmp/certb/cert.html','utf8').replace('{{NOMBRE}}',name).replace('{{NOMBRE_KR}}',kr);
 fs.writeFileSync('/tmp/certb/_r.html',html);
 await page.goto('file:///tmp/certb/_r.html');await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(250);
 await page.screenshot({path:'/tmp/certb/_flat.png'});
 await b.close();console.log('ok');
})().catch(e=>{console.error(e.message);process.exit(1);});
