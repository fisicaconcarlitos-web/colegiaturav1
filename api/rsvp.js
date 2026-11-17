// Servidor Vercel: envía respuestas a Google Apps Script sin exponer su URL en el HTML.
const DEFAULT_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyD73sT_YoAxQRM08WgbLP0EEElxD42pA0DHLAuj-Ct3UMRNs8kWbt46WFd25UpBtsQow/exec';
module.exports = async function handler(req,res) {
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST')return res.status(405).json({ok:false,error:'Método no permitido'});
  const choice=req.body?.choice;
  if(!['si','no'].includes(choice))return res.status(400).json({ok:false,error:'Respuesta inválida'});
  const url=process.env.GOOGLE_SCRIPT_URL || DEFAULT_SCRIPT_URL;
  try {
    const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),12000);
    let upstream;
    try{upstream=await fetch(url,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({invitacion:'danery-colegiatura-2026',respuesta:choice==='si'?'Sí':'No'}),signal:controller.signal,redirect:'follow'});}finally{clearTimeout(timer)}
    const body=await upstream.text();let data;
    try{data=JSON.parse(body)}catch{throw new Error('Apps Script no devolvió JSON válido')}
    if(!upstream.ok||data.ok!==true)throw new Error(data.error||'Google Sheets no confirmó el guardado');
    return res.status(200).json({ok:true});
  }catch(e){console.error('RSVP:',e.message);return res.status(502).json({ok:false,error:'No se pudo registrar la respuesta en Google Sheets'})}
};
