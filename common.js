/* ── AnimeStream shared core (used by every page) ──
 * API: jimov-api (TioAnime backend) */
const API = 'https://jimov-api.vercel.app';
const GENRES = ['accion', 'artes-marciales', 'aventura', 'carreras', 'ciencia-ficcion', 'comedia', 'demencia', 'demonios', 'deportes', 'drama', 'ecchi', 'escolares', 'espacial', 'fantasia', 'harem', 'historico', 'infantil', 'josei', 'juegos', 'magia', 'mecha', 'militar', 'misterio', 'musica', 'parodia', 'policia', 'psicologico', 'recuentos-de-la-vida', 'romance', 'samurai', 'seinen', 'shoujo', 'shounen', 'sobrenatural', 'superpoderes', 'suspenso', 'terror', 'vampiros', 'yaoi', 'yuri'];

async function req(path, retries) {
  retries = retries === undefined ? 2 : retries;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 15000);
      const r = await fetch(API + path, { signal: ctrl.signal });
      clearTimeout(t);
      if (!r.ok) { if (attempt < retries) { await new Promise(res => setTimeout(res, 900)); continue } return null }
      return await r.json();
    } catch {
      if (attempt < retries) { await new Promise(res => setTimeout(res, 900)); continue }
      return null;
    }
  }
  return null;
}
function slugFromUrl(url) { if (!url) return ''; const parts = url.split('/'); return parts[parts.length - 1] }
function animeSlugFromEpisodeUrl(url) { return slugFromUrl(url).replace(/-\d+$/, '') }

function normKey(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

function tokenize(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function matchesQuery(name, query) {
  const t = tokenize(name);
  const q = tokenize(query);
  if (!q.length) return true;
  if (q.length > t.length) return false;

  let exactMatch = true;
  for (let i = 0; i < q.length; i++) {
    if (i >= t.length || t[i] !== q[i]) { exactMatch = false; break; }
  }
  if (exactMatch) return true;

  let startsWithMatch = true;
  for (let i = 0; i < q.length; i++) {
    if (i >= t.length || !t[i].startsWith(q[i])) { startsWithMatch = false; break; }
  }
  if (startsWithMatch) return true;

  for (let i = 0; i <= t.length - q.length; i++) {
    let ok = true;
    for (let j = 0; j < q.length; j++) {
      if (!t[i + j].startsWith(q[j])) { ok = false; break; }
    }
    if (ok) return true;
  }

  return false;
}

let _catalogCache = null, _catalogPromise = null;
async function getCatalogPool() {
  if (_catalogCache) return _catalogCache;
  if (_catalogPromise) return _catalogPromise;
  _catalogPromise = (async () => {
    const [eps, animes, movies, ovas, onas] = await Promise.all([
      req('/anime/tioanime/last/episodes'),
      req('/anime/tioanime/last/animes'),
      req('/anime/tioanime/last/movies'),
      req('/anime/tioanime/last/ovas'),
      req('/anime/tioanime/last/onas'),
    ]);
    const seen = new Set(), out = [];
    const addEp = list => {
      (Array.isArray(list) ? list : []).forEach(ep => {
        const slug = animeSlugFromEpisodeUrl(ep.url);
        if (!slug || seen.has(slug)) return;
        seen.add(slug);
        out.push({ name: ep.name, slug, image: (ep.thumbnail && ep.thumbnail.url) || '' });
      });
    };
    const addAnime = list => {
      (Array.isArray(list) ? list : []).forEach(a => {
        const slug = slugFromUrl(a.url);
        if (!slug || seen.has(slug)) return;
        seen.add(slug);
        const img = (a.image && typeof a.image === 'object') ? (a.image.url || a.image.banner || '') : (a.image || '');
        out.push({ name: a.name, slug, image: img });
      });
    };
    addEp(eps);
    addAnime(animes); addAnime(movies); addAnime(ovas); addAnime(onas);
    _catalogCache = out;
    return out;
  })();
  return _catalogPromise;
}

let _detailedPoolCache = null, _detailedPoolPromise = null;
async function getCatalogPoolDetailed() {
  if (_detailedPoolCache) return _detailedPoolCache;
  if (_detailedPoolPromise) return _detailedPoolPromise;
  _detailedPoolPromise = (async () => {
    const pool = (await getCatalogPool()).slice(0, 90);
    const out = [];
    const BATCH = 8;
    for (let i = 0; i < pool.length; i += BATCH) {
      const chunk = pool.slice(i, i + BATCH);
      const results = await Promise.all(chunk.map(async a => {
        const d = await req('/anime/tioanime/name/' + a.slug, 1);
        const st = animeStatusInfo(d);
        return { ...a, genres: (d && Array.isArray(d.genres)) ? d.genres : [], type: d ? typeLabel(d.type) : null, statusLabel: st.label, onAir: st.onAir, finished: st.finished };
      }));
      out.push(...results);
    }
    _detailedPoolCache = out;
    return out;
  })();
  return _detailedPoolPromise;
}

function animeStatusInfo(d) {
  if (!d) return { label: null, onAir: false, finished: false };
  if (typeof d.status === 'boolean') return { label: d.status ? 'Finalizado' : 'En emision', onAir: !d.status, finished: d.status };
  if (typeof d.status === 'string' && d.status) return { label: d.status, onAir: /emision/i.test(d.status), finished: /final/i.test(d.status) };
  return { label: null, onAir: false, finished: false };
}

function genreMatches(animeGenres, slug) {
  const target = normKey(slug);
  return (animeGenres || []).some(g => { const ng = normKey(g); return ng === target || ng.includes(target) || target.includes(ng) });
}

const S = {
  favs: JSON.parse(localStorage.getItem('as_favs') || '{}'),
  watched: JSON.parse(localStorage.getItem('as_watched') || '{}'),
  hist: JSON.parse(localStorage.getItem('as_hist') || '[]'),
  prof: JSON.parse(localStorage.getItem('as_prof') || '{}'),
};
function persist() {
  localStorage.setItem('as_favs', JSON.stringify(S.favs));
  localStorage.setItem('as_watched', JSON.stringify(S.watched));
  localStorage.setItem('as_hist', JSON.stringify(S.hist));
  localStorage.setItem('as_prof', JSON.stringify(S.prof));
}

const RANKS = [
  { min: 0, label: 'Recien llegado' },
  { min: 10, label: 'Espectador' },
  { min: 30, label: 'Casuall' },
  { min: 75, label: 'Veterano' },
  { min: 150, label: 'Maestro' },
  { min: 300, label: 'Leyenda' },
];
function computeRank() {
  const eps = Object.keys(S.watched).length;
  let idx = 0;
  for (let i = 0; i < RANKS.length; i++) { if (eps >= RANKS[i].min) idx = i; }
  const rank = RANKS[idx], next = RANKS[idx + 1];
  let progress = 100, nextLabel = 'Rango maximo alcanzado';
  if (next) {
    const span = next.min - rank.min;
    progress = Math.min(100, Math.max(0, Math.round(((eps - rank.min) / span) * 100)));
    nextLabel = (next.min - eps) + ' episodios para ' + next.label;
  }
  return { rank, next, progress, nextLabel, eps };
}
function renderAva() {
  const p = S.prof, ini = (p.uname || 'U').charAt(0).toUpperCase(), r = computeRank();
  const sbUname = document.getElementById('sb-uname'), sbRole = document.getElementById('sb-role'), sbAva = document.getElementById('sb-ava');
  if (sbUname) sbUname.textContent = p.uname || 'Mi perfil';
  if (sbRole) sbRole.textContent = r.rank.label;
  if (sbAva) sbAva.innerHTML = p.ava ? '<img src="' + p.ava + '" alt="">' : '<span>' + ini + '</span>';
  const tbAva = document.getElementById('topbar-avatar');
  if (tbAva) tbAva.innerHTML = p.ava ? '<img src="' + p.ava + '" alt="">' : '<span id="topbar-ini">' + ini + '</span>';
}

function toggleSb() { document.getElementById('sidebar').classList.toggle('open'); document.getElementById('sb-ov').classList.toggle('open') }
function closeSb() { document.getElementById('sidebar').classList.remove('open'); document.getElementById('sb-ov').classList.remove('open') }

function setMeta(title, desc) {
  document.title = title;
  const set = (sel, attr, val) => { const el = document.head.querySelector(sel); if (el) el.setAttribute(attr, val) };
  set('meta[property="og:title"]', 'content', title);
  set('meta[name="twitter:title"]', 'content', title);
  if (desc) {
    set('meta[name="description"]', 'content', desc);
    set('meta[property="og:description"]', 'content', desc);
    set('meta[name="twitter:description"]', 'content', desc);
  }
  set('meta[property="og:url"]', 'content', location.href);
}

function toast(msg, type) {
  type = type || 'inf';
  const t = document.createElement('div'); t.className = 'toast ' + type; t.innerHTML = '<span>' + msg + '</span>';
  const box = document.getElementById('toast-box'); if (!box) return;
  box.appendChild(t); setTimeout(() => t.remove(), 3000);
}

function safeStr(s) { return (s || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;') }
function proxyImg(url) { if (!url) return ''; if (!/^https?:\/\//i.test(url)) return url; return 'https://wsrv.nl/?url=' + encodeURIComponent(url.replace(/^https?:\/\//i, '')) }
function mkImg(url, cls, alt) { const p = proxyImg(url); if (!p) return '<div class="' + cls + ' img-ph"></div>'; return '<img src="' + p + '" class="' + cls + '" alt="' + (alt || '') + '" loading="lazy" referrerpolicy="no-referrer" onerror="this.replaceWith(Object.assign(document.createElement(\'div\'),{className:this.className+\' img-ph\'}))">' }
function typeLabel(t) { if (!t || t === 'Null') return null; return t }
function typeBadge(type) { const l = typeLabel(type); if (!l) return ''; return '<div class="ac-type">' + l.toUpperCase() + '</div>' }
function favSvg(on) { return '<svg width="12" height="12" viewBox="0 0 24 24" fill="' + (on ? 'var(--accent2)' : 'none') + '" stroke="' + (on ? 'var(--accent2)' : 'currentColor') + '" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>' }
function playSvg(sz) { sz = sz || 16; return '<svg width="' + sz + '" height="' + sz + '" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>' }

function playerLink(epUrl, num) { return 'player.html?ep=' + encodeURIComponent(epUrl) + '&num=' + num }
function detailLink(slug) { return 'detail.html?slug=' + encodeURIComponent(slug) }

function toggleFav(slug, title, coverUrl, ev) {
  if (ev) { ev.preventDefault(); ev.stopPropagation(); }
  if (S.favs[slug]) { delete S.favs[slug]; toast('Quitado de favoritos', 'inf'); }
  else { S.favs[slug] = { slug, title, cover: coverUrl, addedAt: Date.now() }; toast('Agregado a favoritos', 'ok'); }
  persist(); syncFavBtns(slug);
  if (typeof onFavToggled === 'function') onFavToggled(slug);
}
function syncFavBtns(slug) {
  const on = !!S.favs[slug];
  document.querySelectorAll('.fav-pin[data-slug="' + slug + '"]').forEach(b => { b.classList.toggle('on', on); b.innerHTML = favSvg(on) });
}
function isWatched(slug, num) { return !!S.watched[slug + '-' + num] }
function markWatched(slug, title, num, img) {
  const key = slug + '-' + num; if (S.watched[key]) return;
  S.watched[key] = { slug, title, number: num, ts: Date.now(), cover: img };
  S.hist.unshift({ slug, title, number: num, ts: Date.now(), cover: img });
  if (S.hist.length > 400) S.hist.pop();
  persist();
}

function posterBlock(imgUrl, name, slug, type, extraBadge) {
  const on = !!S.favs[slug];
  return '<div class="ac-poster-wrap">' + mkImg(imgUrl, 'ac-poster', name) + typeBadge(type) +
    '<button class="fav-pin ' + (on ? 'on' : '') + '" data-slug="' + slug + '" onclick="toggleFav(\'' + slug + '\',\'' + safeStr(name) + '\',\'' + safeStr(imgUrl) + '\',event)">' + favSvg(on) + '</button>' +
    (extraBadge || '') + '</div>';
}

function animeCard(a) {
  const slug = slugFromUrl(a.url), imgUrl = (a.image && a.image.url) || a.image || '';
  return '<a class="ac" href="' + detailLink(slug) + '">' + posterBlock(imgUrl, a.name, slug, a.type) +
    '<div class="ac-body"><div class="ac-title">' + (a.name || 'Sin titulo') + '</div><div class="ac-meta">' + (typeLabel(a.type) || '') + '</div></div></a>';
}

function poolAnimeCard(a) {
  return '<a class="ac" href="' + detailLink(a.slug) + '">' + posterBlock(a.image, a.name, a.slug, a.type) +
    '<div class="ac-body"><div class="ac-title">' + (a.name || 'Sin titulo') + '</div>' + (a.statusLabel ? '<div class="ac-meta">' + a.statusLabel + '</div>' : '') + '</div></a>';
}

function sortServers(servers) {
  function p(s) { const n = (s.name || '').toLowerCase(); if (n.includes('mega')) return 0; if (n.includes('vidguard') || n.includes('voe')) return 1; return 2; }
  return servers.slice().sort((a, b) => p(a) - p(b));
}
function buildIframe(srv) {
  if (!srv || !srv.url) return '<div class="player-blocker"><svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><polygon points="5,3 19,12 5,21"/></svg><span>Servidor no disponible</span></div>';
  return '<iframe src="' + srv.url + '" allowfullscreen allow="autoplay; fullscreen *; encrypted-media; picture-in-picture" referrerpolicy="no-referrer" scrolling="no" frameborder="0"></iframe>';
}

function initTopbarSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;
  let sTmt;

  input.addEventListener('input', function () {
    clearTimeout(sTmt);
    const q = this.value.trim();
    const drop = document.getElementById('sdrop');

    if (!q) {
      drop.classList.remove('open');
      return;
    }

    sTmt = setTimeout(async () => {
      drop.innerHTML = '<div style="padding:14px;text-align:center"><div class="spin" style="width:18px;height:18px;margin:0 auto"></div></div>';
      drop.classList.add('open');

      const searchQuery = q.replace(/[:;]/g, ' ').replace(/\s+/g, ' ').trim();
      const d = await req('/anime/tioanime/filter?title=' + encodeURIComponent(searchQuery));
      let items = (d && Array.isArray(d.results)) ? d.results : [];

      if (items.length === 0 && q !== searchQuery) {
        const fallbackQuery = q.replace(/[^a-zA-Z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
        if (fallbackQuery !== searchQuery) {
          const d2 = await req('/anime/tioanime/filter?title=' + encodeURIComponent(fallbackQuery));
          items = (d2 && Array.isArray(d2.results)) ? d2.results : [];
        }
      }

      if (items.length > 0) {
        items = items.filter(a => matchesQuery(a.name, q));
      }

      if (!items.length) {
        const pool = await getCatalogPool();
        items = pool.filter(a => matchesQuery(a.name, q)).slice(0, 7);
      }

      if (!items.length) {
        drop.innerHTML = '<div style="padding:13px 14px;font-size:12.5px;color:var(--text3)">Sin resultados.</div>';
        return;
      }

      drop.innerHTML = items.slice(0, 7).map(a => {
        const slug = a.url ? slugFromUrl(a.url) : a.slug;
        const name = a.name || 'Sin titulo';
        const imgUrl = (a.image && a.image.url) || a.image || '';
        const type = a.type ? typeLabel(a.type) : '';

        return '<a class="sd-item" href="' + detailLink(slug) + '">' +
          mkImg(imgUrl, 'sd-img', name) +
          '<div><div class="sd-title">' + name + '</div>' +
          (type ? '<div class="sd-meta">' + type + '</div>' : '') +
          '</div></a>';
      }).join('');
    }, 380);
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.search-wrap')) {
      document.getElementById('sdrop').classList.remove('open');
    }
  });
}

function initShell() {
  const ov = document.getElementById('sb-ov'); if (ov) ov.addEventListener('click', closeSb);
  initTopbarSearch();
  getCatalogPool();
  renderAva();
}
document.addEventListener('DOMContentLoaded', initShell);