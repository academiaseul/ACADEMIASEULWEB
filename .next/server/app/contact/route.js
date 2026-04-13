"use strict";(()=>{var e={};e.id=997,e.ids=[997],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6005:e=>{e.exports=require("node:crypto")},9252:(e,t,o)=>{o.r(t),o.d(t,{originalPathname:()=>f,patchFetch:()=>m,requestAsyncStorage:()=>x,routeModule:()=>l,serverHooks:()=>u,staticGenerationAsyncStorage:()=>c});var r={};o.r(r),o.d(r,{POST:()=>p});var d=o(9303),a=o(8716),i=o(670),n=o(7070);let s=new(o(2591)).R(process.env.RESEND_API_KEY);async function p(e){try{let{nombre:t,email:o,telefono:r,nivel:d,interes:a,mensaje:i}=await e.json();if(!t||!o)return n.NextResponse.json({error:"Nombre y email son requeridos"},{status:400});return await s.emails.send({from:"Academia Se\xfal <noreply@academiaseul.com>",to:"hola.academiaseul@gmail.com",subject:`Nueva consulta de ${t} — Academia Se\xfal`,html:`
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 8px;">
          <div style="background: #C8001E; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 22px;">Nueva consulta — Academia Se\xfal</h1>
          </div>
          <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #eee;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 12px 8px; color: #888; font-size: 13px; width: 140px;">Nombre</td>
                <td style="padding: 12px 8px; color: #111; font-weight: 600;">${t}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 12px 8px; color: #888; font-size: 13px;">Email</td>
                <td style="padding: 12px 8px; color: #111; font-weight: 600;">${o}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 12px 8px; color: #888; font-size: 13px;">Tel\xe9fono</td>
                <td style="padding: 12px 8px; color: #111; font-weight: 600;">${r||"No indicado"}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 12px 8px; color: #888; font-size: 13px;">Nivel actual</td>
                <td style="padding: 12px 8px; color: #111; font-weight: 600;">${d||"No indicado"}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 12px 8px; color: #888; font-size: 13px;">Inter\xe9s</td>
                <td style="padding: 12px 8px; color: #111; font-weight: 600;">${a||"No indicado"}</td>
              </tr>
              <tr>
                <td style="padding: 12px 8px; color: #888; font-size: 13px;">Mensaje</td>
                <td style="padding: 12px 8px; color: #111;">${i||"Sin mensaje adicional"}</td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding: 16px; background: #fff5f5; border-radius: 6px; border-left: 4px solid #C8001E;">
              <p style="margin: 0; color: #C8001E; font-weight: 600; font-size: 14px;">
                \xa1Responde en menos de 24 horas para maximizar la conversi\xf3n!
              </p>
            </div>
          </div>
          <p style="text-align: center; color: #bbb; font-size: 12px; margin-top: 16px;">
            Academia Se\xfal \xb7 Santiago de Chile \xb7 hola.academiaseul@gmail.com
          </p>
        </div>
      `}),n.NextResponse.json({success:!0})}catch(e){return console.error("Error sending email:",e),n.NextResponse.json({error:"Error al enviar el mensaje"},{status:500})}}let l=new d.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/contact/route",pathname:"/contact",filename:"route",bundlePath:"app/contact/route"},resolvedPagePath:"C:\\Users\\Chingu\\Desktop\\ACADEMIASEULWEB\\app\\contact\\route.ts",nextConfigOutput:"standalone",userland:r}),{requestAsyncStorage:x,staticGenerationAsyncStorage:c,serverHooks:u}=l,f="/contact/route";function m(){return(0,i.patchFetch)({serverHooks:u,staticGenerationAsyncStorage:c})}}};var t=require("../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),r=t.X(0,[276,475],()=>o(9252));module.exports=r})();