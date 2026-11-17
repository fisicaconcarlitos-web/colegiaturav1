const $=id=>document.getElementById(id);
let moved=0,responded=false;
const scenes=['intro','invite','result'];
function show(id){scenes.forEach(x=>$(x).classList.toggle('active',x===id));window.scrollTo({top:0,behavior:'smooth'});}
function dodge(){
  if(responded||moved>=4)return;
  const b=$('no');
  // Se mueve dentro de su propia zona de botones, nunca a otra parte de la pantalla.
  const offsets=[[-13,-8],[15,8],[-9,9],[12,-7]];
  const [dx,dy]=offsets[moved];
  b.style.transform=`translate(${dx}px, ${dy}px)`;
  moved++;
  $('hint').textContent=['¿Segura? 😄','¡Ese botón es tímido!','Creo que quiere otra oportunidad ✨','Puedes elegir libremente ♡'][moved-1];
  if(moved>=4){b.style.transform='';}
}
async function answer(choice){if(responded)return;responded=true;const b=$('no');b.style.transform='';$('result-icon').textContent=choice==='si'?'♡':'✉';$('result-title').textContent=choice==='si'?'¡Qué alegría, Dánery!':'Gracias por responder, Dánery';$('result-message').textContent=choice==='si'?'Me hace muy feliz saber que me acompañarás en un día tan importante. ¡Nos vemos el 25 de noviembre!':'Entiendo perfectamente. Gracias por tomarte un momento para leer esta invitación; quería compartir contigo esta alegría.';$('save-status').textContent='Guardando tu respuesta…';show('result');try{const r=await fetch('/api/rsvp',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({choice})});const data=await r.json();if(!r.ok||!data.ok)throw Error(data.error||'No se pudo guardar');$('save-status').textContent='Tu respuesta quedó registrada correctamente. ♡';}catch(e){$('save-status').textContent='No se pudo guardar la respuesta. Puedes volver e intentarlo otra vez.';}}
$('open').onclick=()=>show('invite');$('yes').onclick=()=>answer('si');$('no').addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')dodge()});$('no').addEventListener('touchstart',e=>{if(moved<4){e.preventDefault();dodge()}},{passive:false});$('no').onclick=()=>{if(moved<4)dodge();else answer('no')};$('back').onclick=()=>{responded=false;show('invite')};
