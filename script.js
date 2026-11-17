const $ = id => document.getElementById(id);
const scenes = ['intro', 'invite', 'result'];
let moved = 0, busy = false, submitted = false;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function show(id) {
  scenes.forEach(x => $(x).classList.toggle('active', x === id));
  window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' });
  if (id === 'invite') {
    requestAnimationFrame(() => document.querySelectorAll('#invite .detail > div').forEach((el,i) => {
      el.style.animationDelay = `${i * 130 + 160}ms`;
      el.classList.add('reveal-in');
    }));
  }
}
function updateCountdown() {
  const ceremony = new Date('2026-11-25T19:00:00-05:00').getTime();
  const delta = ceremony - Date.now();
  if (delta <= 0) {
    $('days-left').textContent = '✧';
    $('countdown-label').textContent = 'UN MOMENTO PARA RECORDAR';
    return;
  }
  $('days-left').textContent = Math.ceil(delta / 86400000);
}
updateCountdown();
function dodge() {
  if (busy || moved >= 4) return;
  const offsets = [[-10,-7],[10,7],[-8,7],[8,-6]];
  const [dx,dy] = offsets[moved++];
  $('no').style.transform = `translate(${dx}px,${dy}px)`;
  $('hint').textContent = ['¿Segura? ♡', 'Este botón es un poquito tímido ✧', '¿Una oportunidad más?','Puedes elegir libremente ♡'][moved-1];
  if (moved >= 4) $('no').style.transform = '';
}
function celebrate() {
  if (reduced) return;
  const layer = $('petals'); layer.replaceChildren();
  const colors = ['#91a996','#c7bba8','#e2d9c8','#7f9a89'];
  for(let i=0;i<30;i++){
    const p=document.createElement('i');
    p.style.setProperty('--x', `${Math.random()*100}%`);
    p.style.setProperty('--dx', `${(Math.random()-.5)*240}px`);
    p.style.setProperty('--delay', `${Math.random()*.7}s`);
    p.style.setProperty('--duration', `${2.4+Math.random()*1.8}s`);
    p.style.background=colors[i%colors.length];
    layer.appendChild(p);
  }
  setTimeout(()=>layer.replaceChildren(),5300);
}
async function answer(choice) {
  if(busy)return;
  busy=true;
  $('yes').disabled=true; $('no').disabled=true;
  $('no').style.transform='';
  const positive=choice==='si';
  $('result-icon').textContent=positive?'♡':'✉';
  $('result-title').textContent=positive?'¡Qué alegría, Dánery!':'Gracias por responder, Dánery';
  $('result-message').textContent=positive?'Me hace muy feliz saber que me acompañarás en un día tan importante. ¡Nos vemos el 25 de noviembre!':'Gracias por tomarte un momento para leer esta invitación. Quería compartir contigo esta alegría.';
  $('save-status').textContent='Guardando tu respuesta…';
  show('result');
  if(positive)celebrate();
  try {
    const r=await fetch('/api/rsvp',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({choice})});
    const data=await r.json();
    if(!r.ok||data.ok!==true)throw new Error(data.error||'No se pudo guardar');
    submitted=true;
    $('save-status').textContent='Tu respuesta quedó registrada correctamente. ♡';
  } catch(err) {
    $('save-status').textContent='No se pudo guardar tu respuesta. Vuelve a la invitación para intentarlo otra vez.';
  } finally { busy=false; $('yes').disabled=false; $('no').disabled=false; }
}
$('open').addEventListener('click',()=>show('invite'));
$('yes').addEventListener('click',()=>answer('si'));
$('no').addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')dodge()});
$('no').addEventListener('touchstart',e=>{if(moved<4){e.preventDefault();dodge()}},{passive:false});
$('no').addEventListener('click',()=>{if(moved<4)dodge();else answer('no')});
$('back').addEventListener('click',()=>{moved=0;$('hint').textContent='';$('no').style.transform='';show('invite')});
