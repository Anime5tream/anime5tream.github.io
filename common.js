/* ── AnimeStream shared core (used by every page) ──
 * API: jimov-api (TioAnime backend)
 * GET /anime/tioanime/name/:name        -> anime detail. episodes[].servers is ALWAYS [] (upstream limitation).
 * GET /anime/tioanime/episode/:episode  -> real servers array for one episode. Must be fetched on demand.
 * GET /anime/tioanime/last/:option      -> option = episodes|animes|movies|ovas|onas
 * GET /anime/tioanime/filter?...        -> title,gen[],begin_year,end_year,type,status,sort
 */
const API='https://jimov-api.vercel.app';
const GENRES=['accion','artes-marciales','aventura','carreras','ciencia-ficcion','comedia','demencia','demonios','deportes','drama','ecchi','escolares','espacial','fantasia','harem','historico','infantil','josei','juegos','magia','mecha','militar','misterio','musica','parodia','policia','psicologico','recuentos-de-la-vida','romance','samurai','seinen','shoujo','shounen','sobrenatural','superpoderes','suspenso','terror','vampiros','yaoi','yuri'];

async function req(path,retries){
  retries=retries===undefined?2:retries;
  for(let attempt=0;attempt<=retries;attempt++){
    try{
      const ctrl=new AbortController();
      const t=setTimeout(()=>ctrl.abort(),15000);
      const r=await fetch(API+path,{signal:ctrl.signal});
      clearTimeout(t);
      if(!r.ok){if(attempt<retries){await new Promise(res=>setTimeout(res,900));continue}return null}
      return await r.json();
    }catch{
      if(attempt<retries){await new Promise(res=>setTimeout(res,900));continue}
      return null;
    }
  }
  return null;
}
function slugFromUrl(url){if(!url)return'';const parts=url.split('/');return parts[parts.length-1]}
function animeSlugFromEpisodeUrl(url){return slugFromUrl(url).replace(/-\d+$/,'')}

/* ── STATE (shared across pages via localStorage) ── */
const S={
  favs:JSON.parse(localStorage.getItem('as_favs')||'{}'),
  watched:JSON.parse(localStorage.getItem('as_watched')||'{}'),
  hist:JSON.parse(localStorage.getItem('as_hist')||'[]'),
};
function persist(){
  localStorage.setItem('as_favs',JSON.stringify(S.favs));
  localStorage.setItem('as_watched',JSON.stringify(S.watched));
  localStorage.setItem('as_hist',JSON.stringify(S.hist));
}

/* ── SHELL (sidebar / topbar) ── */
function toggleSb(){document.getElementById('sidebar').classList.toggle('open');document.getElementById('sb-ov').classList.toggle('open')}
function closeSb(){document.getElementById('sidebar').classList.remove('open');document.getElementById('sb-ov').classList.remove('open')}

/* ── META (titulo/og/twitter dinamicos por pagina) ──
 * OJO: esto es un sitio estatico (GitHub Pages), no hay server-side rendering.
 * Bots de WhatsApp/Discord/Telegram NO ejecutan JS, asi que el preview que compartis
 * va a mostrar el og:title/og:description ESTATICOS del <head> ("AnimeStream"), no el
 * nombre del capitulo. Esto solo actualiza la pestaña del navegador y el <head> en vivo
 * (util para el titulo de la pestaña y para compartir el link ya con la pagina abierta
 * en herramientas que si leen el DOM). Para previews reales por episodio hace falta un
 * backend/SSR (ej. un pequeño endpoint que genere el HTML con meta tags por slug). */
function setMeta(title,desc){
  document.title=title;
  const set=(sel,attr,val)=>{const el=document.head.querySelector(sel);if(el)el.setAttribute(attr,val)};
  set('meta[property="og:title"]','content',title);
  set('meta[name="twitter:title"]','content',title);
  if(desc){
    set('meta[name="description"]','content',desc);
    set('meta[property="og:description"]','content',desc);
    set('meta[name="twitter:description"]','content',desc);
  }
  set('meta[property="og:url"]','content',location.href);
}

/* ── TOAST ── */
function toast(msg,type){
  type=type||'inf';
  const t=document.createElement('div');t.className='toast '+type;t.innerHTML='<span>'+msg+'</span>';
  const box=document.getElementById('toast-box');if(!box)return;
  box.appendChild(t);setTimeout(()=>t.remove(),3000);
}

/* ── HELPERS ── */
function safeStr(s){return(s||'').replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/"/g,'&quot;')}
/* TioAnime bloquea hotlinking por Referer -> las <img> cross-origin devuelven 403.
   Se proxyea via wsrv.nl (fetch server-side, sin Referer del navegador). */
function proxyImg(url){if(!url)return'';if(!/^https?:\/\//i.test(url))return url;return'https://wsrv.nl/?url='+encodeURIComponent(url.replace(/^https?:\/\//i,''))}
function mkImg(url,cls,alt){const p=proxyImg(url);if(!p)return'<div class="'+cls+' img-ph"></div>';return'<img src="'+p+'" class="'+cls+'" alt="'+(alt||'')+'" loading="lazy" referrerpolicy="no-referrer" onerror="this.replaceWith(Object.assign(document.createElement(\'div\'),{className:this.className+\' img-ph\'}))">'}
function typeLabel(t){if(!t||t==='Null')return null;return t}
function typeBadge(type){const l=typeLabel(type);if(!l)return'';return'<div class="ac-type">'+l.toUpperCase()+'</div>'}
function favSvg(on){return'<svg width="12" height="12" viewBox="0 0 24 24" fill="'+(on?'var(--accent2)':'none')+'" stroke="'+(on?'var(--accent2)':'currentColor')+'" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>'}
function playSvg(sz){sz=sz||16;return'<svg width="'+sz+'" height="'+sz+'" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>'}

/* Build a link to the episode player page for a given raw episode url from the API */
function playerLink(epUrl,num){return'player.html?ep='+encodeURIComponent(epUrl)+'&num='+num}
function detailLink(slug){return'detail.html?slug='+encodeURIComponent(slug)}

/* ── FAV / WATCHED ── */
function toggleFav(slug,title,coverUrl,ev){
  if(ev)ev.stopPropagation();
  if(S.favs[slug]){delete S.favs[slug];toast('Quitado de favoritos','inf');}
  else{S.favs[slug]={slug,title,cover:coverUrl,addedAt:Date.now()};toast('Agregado a favoritos','ok');}
  persist();syncFavBtns(slug);
  if(typeof onFavToggled==='function')onFavToggled(slug);
}
function syncFavBtns(slug){
  const on=!!S.favs[slug];
  document.querySelectorAll('.fav-pin[data-slug="'+slug+'"]').forEach(b=>{b.classList.toggle('on',on);b.innerHTML=favSvg(on)});
}
function isWatched(slug,num){return!!S.watched[slug+'-'+num]}
function markWatched(slug,title,num,img){
  const key=slug+'-'+num;if(S.watched[key])return;
  S.watched[key]={slug,title,number:num,ts:Date.now(),cover:img};
  S.hist.unshift({slug,title,number:num,ts:Date.now(),cover:img});
  if(S.hist.length>400)S.hist.pop();
  persist();
}

/* ── ANIME CARD (used on home/explore/onair/favorites) ── */
function animeCard(a){
  const slug=slugFromUrl(a.url),on=!!S.favs[slug],imgUrl=(a.image&&a.image.url)||a.image||'';
  return'<a class="ac" href="'+detailLink(slug)+'">'+mkImg(imgUrl,'ac-poster',a.name)+typeBadge(a.type)+
    '<button class="fav-pin '+(on?'on':'')+'" data-slug="'+slug+'" onclick="toggleFav(\''+slug+'\',\''+safeStr(a.name)+'\',\''+safeStr(imgUrl)+'\',event)">'+favSvg(on)+'</button>'+
    '<div class="ac-body"><div class="ac-title">'+(a.name||'Sin titulo')+'</div><div class="ac-meta">'+(typeLabel(a.type)||'')+'</div></div></a>';
}

/* ── SERVER PRIORITY (mega tends to be most reliable/least ad-heavy) ── */
function sortServers(servers){
  function p(s){const n=(s.name||'').toLowerCase();if(n.includes('mega'))return 0;if(n.includes('vidguard')||n.includes('voe'))return 1;return 2;}
  return servers.slice().sort((a,b)=>p(a)-p(b));
}
function buildIframe(srv){
  if(!srv||!srv.url)return'<div class="player-blocker"><svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><polygon points="5,3 19,12 5,21"/></svg><span>Servidor no disponible</span></div>';
  return'<iframe src="'+srv.url+'" allowfullscreen allow="autoplay; fullscreen *; encrypted-media; picture-in-picture" referrerpolicy="no-referrer" scrolling="no" frameborder="0"></iframe>';
}

/* ── TOPBAR SEARCH (present on every page) ── */
function initTopbarSearch(){
  const input=document.getElementById('search-input');if(!input)return;
  let sTmt;
  input.addEventListener('input',function(){
    clearTimeout(sTmt);const q=this.value.trim(),drop=document.getElementById('sdrop');
    if(!q){drop.classList.remove('open');return;}
    sTmt=setTimeout(async()=>{
      drop.innerHTML='<div style="padding:14px;text-align:center"><div class="spin" style="width:18px;height:18px;margin:0 auto"></div></div>';
      drop.classList.add('open');
      const d=await req('/anime/tioanime/filter?title='+encodeURIComponent(q));
      const items=(d&&Array.isArray(d.results))?d.results:[];
      if(!items.length){drop.innerHTML='<div style="padding:13px 14px;font-size:12.5px;color:var(--text3)">Sin resultados.</div>';return;}
      drop.innerHTML=items.slice(0,7).map(a=>{const slug=slugFromUrl(a.url),imgUrl=(a.image&&a.image.url)||a.image||'';return'<a class="sd-item" href="'+detailLink(slug)+'">'+mkImg(imgUrl,'sd-img',a.name)+'<div><div class="sd-title">'+(a.name||'Sin titulo')+'</div><div class="sd-meta">'+(typeLabel(a.type)||'')+'</div></div></a>';}).join('');
    },380);
  });
  document.addEventListener('click',e=>{if(!e.target.closest('.search-wrap'))document.getElementById('sdrop').classList.remove('open')});
}

/* Called on every page once the DOM shell is present */
function initShell(){
  const ov=document.getElementById('sb-ov');if(ov)ov.addEventListener('click',closeSb);
  initTopbarSearch();
}
document.addEventListener('DOMContentLoaded',initShell);
