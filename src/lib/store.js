// src/lib/store.js

window.BRAND_CONFIG = {
  name: 'Anime5tream',
  logoUrl: 'https://i.imgur.com/ZkZavVo.png',
  defaultAccent: '#F47521',
  accents: [
    { name: 'Anime5tream Orange', hex: '#F47521', hover: '#ff8533' },
    { name: 'Hime Cyan', hex: '#2ABDBB', hover: '#3cd2d0' },
    { name: 'Shinobi Purple', hex: '#9B51E0', hover: '#b066f5' },
    { name: 'Crimson Red', hex: '#E50914', hover: '#ff1f29' },
    { name: 'Emerald Green', hex: '#10B981', hover: '#26d498' },
    { name: 'Sakura Pink', hex: '#EC4899', hover: '#f763ae' }
  ],

  adventureBackgrounds: [
    {
      character: "Frieren (Beyond Journey's End)",
      url: 'https://4kwallpapers.com/images/walls/thumbs_3t/25925.jpg',
      fallback: 'https://images5.alphacoders.com/140/thumb-1920-1405526.png'
    },
    {
      character: 'Kana Arima (Oshi no Ko)',
      url: 'https://images5.alphacoders.com/133/thumb-1920-1330066.jpeg',
      fallback: 'https://images8.alphacoders.com/131/thumb-1920-1318321.jpeg'
    },
    {
      character: "Kanna Kamui (Miss Kobayashi's Dragon Maid)",
      url: 'https://images7.alphacoders.com/819/thumb-1920-819217.png',
      fallback: 'https://images6.alphacoders.com/139/thumb-1920-1395008.png'
    },
    {
      character: 'Zero Two (DARLING in the FRANXX)',
      url: 'https://images2.alphacoders.com/906/thumb-1920-906035.png',
      fallback: 'https://images7.alphacoders.com/906/thumb-1920-906037.png'
    },
    {
      character: 'Power (Chainsaw Man)',
      url: 'https://images2.alphacoders.com/133/thumb-1920-1336096.png',
      fallback: 'https://images2.alphacoders.com/133/thumb-1920-1336096.png'
    },
    {
      character: 'Makima (Chainsaw Man)',
      url: 'https://images4.alphacoders.com/133/thumb-1920-1336102.png',
      fallback: 'https://images4.alphacoders.com/133/thumb-1920-1336102.png'
    },
    {
      character: 'Reze (Chainsaw Man: Reze Arc)',
      url: 'https://images6.alphacoders.com/140/thumb-1920-1403573.png',
      fallback: 'https://images2.alphacoders.com/134/thumb-1920-1344847.png'
    }
  ],

  avatars: [
    { name: 'Power (Chainsaw Man)', url: 'https://cdn.myanimelist.net/images/characters/7/494969.jpg' },
    { name: 'Zero Two (Darling in the FranXX)', url: 'https://cdn.myanimelist.net/images/characters/10/352557.jpg' },
    { name: 'Makima (Chainsaw Man)', url: 'https://cdn.myanimelist.net/images/characters/4/489561.jpg' },
    { name: 'Reze (Chainsaw Man)', url: 'https://cdn.myanimelist.net/images/characters/14/412779.jpg' },
    { name: "Frieren (Beyond Journey's End)", url: 'https://cdn.myanimelist.net/images/characters/7/525105.jpg' },
    { name: 'Kana Arima (Oshi no Ko)', url: 'https://cdn.myanimelist.net/images/characters/6/503733.jpg' },
    { name: "Kanna Kamui (Kobayashi's Dragon Maid)", url: 'https://cdn.myanimelist.net/images/characters/2/322173.jpg' },
    { name: 'Marin Kitagawa (My Dress-Up Darling)', url: 'https://cdn.myanimelist.net/images/characters/10/459773.jpg' },
    { name: 'Nezuko Kamado (Demon Slayer)', url: 'https://cdn.myanimelist.net/images/characters/2/378254.jpg' },
    { name: 'Rem (Re:Zero)', url: 'https://cdn.myanimelist.net/images/characters/9/311327.jpg' },
    { name: 'Mikasa Ackerman (Attack on Titan)', url: 'https://cdn.myanimelist.net/images/characters/9/215563.jpg' },
    { name: 'Megumin (KonoSuba)', url: 'https://cdn.myanimelist.net/images/characters/14/349249.jpg' },
    { name: 'Kaguya Shinomiya (Love is War)', url: 'https://cdn.myanimelist.net/images/characters/2/504723.jpg' },
    { name: 'Kurisu Makise (Steins;Gate)', url: 'https://cdn.myanimelist.net/images/characters/10/310993.jpg' },
    { name: 'Asuna Yuuki (Sword Art Online)', url: 'https://cdn.myanimelist.net/images/characters/15/262053.jpg' }
  ]
};

window.I18N = {
  en: {
    home: 'Home',
    browse: 'Browse',
    myLists: 'Watchlist',
    account: 'Account',
    new: 'New',
    popular: 'Popular',
    simulcast: 'Simulcast',
    categories: 'Categories',
    topPicks: 'Top Picks for You',
    simulcastSeason: 'October 2026 Simulcasts',
    simulcastSub: 'Find the best new and continuing simulcasts here!',
    continueWatching: 'Continue Watching',
    viewHistory: 'View History',
    newEpisodes: 'New Episodes',
    viewAll: 'View All',
    startWatching: 'START WATCHING',
    whoAdventure: "Who's going on an adventure?",
    addNew: 'Add New',
    manageProfiles: 'MANAGE PROFILES',
    logOut: 'Log Out',
    switchProfile: 'Switch Profile',
    settings: 'Settings',
    watchlist: 'Watchlist',
    history: 'History',
    accountSettings: 'Account Settings',
    newlyAdded: 'Newly Added Anime',
    last24h: 'Last 24 Hours',
    pastWeek: 'This Past Week',
    simulcastHeader: 'Simulcast Season',
    nextEpisode: 'NEXT EPISODE',
    prevEpisode: 'PREVIOUS EPISODE',
    moreEpisodes: 'MORE EPISODES',
    moreDetails: 'MORE DETAILS',
    fewerDetails: 'FEWER DETAILS',
    showMore: 'SHOW MORE',
    showLess: 'SHOW LESS',
    myListShort: 'MY LIST',
    shareShort: 'SHARE',
    seasons: 'Season',
    episodes: 'Episodes',
    footerNav: 'Navigation',
    footerConnect: 'Connect With Us',
    footerAccount: 'Account',
    browsePopular: 'Browse Popular',
    browseSimulcasts: 'Browse Simulcasts',
    themeAndColor: 'Theme & Brand Color',
    profileAndAvatar: 'Profile & Avatar'
  },
  es: {
    home: 'Inicio',
    browse: 'Explorar',
    myLists: 'Favoritos',
    account: 'Cuenta',
    new: 'Nuevos',
    popular: 'Populares',
    simulcast: 'En Emisión',
    categories: 'Categorías',
    topPicks: 'Recomendados para ti',
    simulcastSeason: 'Simulcasts de Octubre 2026',
    simulcastSub: '¡Encuentra aquí los mejores estrenos y series en emisión!',
    continueWatching: 'Continuar viendo',
    viewHistory: 'Ver Historial',
    newEpisodes: 'Nuevos Episodios',
    viewAll: 'Ver Todo',
    startWatching: 'COMENZAR A VER',
    whoAdventure: '¿Quién se va de aventura?',
    addNew: 'Añadir Perfil',
    manageProfiles: 'ADMINISTRAR PERFILES',
    logOut: 'Cerrar Sesión',
    switchProfile: 'Cambiar de Perfil',
    settings: 'Ajustes',
    watchlist: 'Watchlist (Favoritos)',
    history: 'Historial',
    accountSettings: 'Ajustes de la Cuenta',
    newlyAdded: 'Animes Recién Agregados',
    last24h: 'Últimas 24 Horas',
    pastWeek: 'Esta Última Semana',
    simulcastHeader: 'Temporada en Emisión',
    nextEpisode: 'SIGUIENTE EPISODIO',
    prevEpisode: 'EPISODIO ANTERIOR',
    moreEpisodes: 'MÁS EPISODIOS',
    moreDetails: 'MÁS DETALLES',
    fewerDetails: 'MENOS DETALLES',
    showMore: 'MOSTRAR MÁS',
    showLess: 'MOSTRAR MENOS',
    myListShort: 'MI LISTA',
    shareShort: 'COMPARTIR',
    seasons: 'Temporada',
    episodes: 'Episodios',
    footerNav: 'Navegación',
    footerConnect: 'Conéctate con nosotros',
    footerAccount: 'Cuenta',
    browsePopular: 'Explorar lo más popular',
    browseSimulcasts: 'Explorar Simulcasts',
    themeAndColor: 'Tema y Color Principal',
    profileAndAvatar: 'Perfil y Avatar'
  }
};

const STORAGE_KEY = 'astr_final';

const defaultState = {
  theme: 'dark',
  accentColor: '#F47521',
  activeProfileId: 'invitado',
  profileSelectedThisSession: false,
  profiles: [
    {
      id: 'invitado',
      name: 'Invitado',
      avatar: window.BRAND_CONFIG.avatars[0].url,
      displayLanguage: 'Español (América Latina)',
      audioLanguage: 'Japanese',
      preferAudioDescriptions: false,
      subtitleLanguage: 'Español (América Latina)',
      preferClosedCaptions: false,
      matureContent: 'Ages 18 and up'
    }
  ],
  watchlist: { invitado: [] },
  history: { invitado: [] },
  reactions: {}
};

window.Store = {
  getState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return JSON.parse(JSON.stringify(defaultState));
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed.profiles) || !parsed.profiles.length) {
        parsed.profiles = JSON.parse(JSON.stringify(defaultState.profiles));
      }
      if (!parsed.reactions) parsed.reactions = {};
      const validUrls = window.BRAND_CONFIG.avatars.map(a => a.url);
      parsed.profiles.forEach(p => {
        if (!p.avatar || p.avatar.includes('422168') || p.avatar.includes('310307') || p.avatar.includes('531267') || p.avatar.includes('533267')) {
          p.avatar = validUrls[0];
        }
      });
      return { ...JSON.parse(JSON.stringify(defaultState)), ...parsed };
    } catch {
      return JSON.parse(JSON.stringify(defaultState));
    }
  },

  saveState(nextState) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    this.applyTheme(nextState);
  },

  getActiveProfile() {
    const s = this.getState();
    return s.profiles.find(p => p.id === s.activeProfileId) || s.profiles[0];
  },

  getLangCode() {
    const p = this.getActiveProfile();
    return (p.displayLanguage || '').toLowerCase().includes('english') ? 'en' : 'es';
  },

  t(key) {
    const code = this.getLangCode();
    return window.I18N[code]?.[key] || window.I18N.en[key] || key;
  },

  getRandomAdventureBackground() {
    const list = window.BRAND_CONFIG.adventureBackgrounds;
    const lastIdx = parseInt(sessionStorage.getItem('as_last_adv_bg') || '-1', 10);
    let idx = Math.floor(Math.random() * list.length);
    if (list.length > 1 && idx === lastIdx) {
      idx = (idx + 1) % list.length;
    }
    sessionStorage.setItem('as_last_adv_bg', String(idx));
    return list[idx];
  },

  getEpisodeReaction(slug, epNumber) {
    const s = this.getState();
    const key = `${slug}::${epNumber}`;
    if (!s.reactions[key]) {
      const seed = (slug.length * 17) + (Number(epNumber) * 31);
      s.reactions[key] = {
        vote: null,
        likes: 120 + (seed % 850),
        dislikes: 4 + (seed % 19)
      };
      this.saveState(s);
    }
    return s.reactions[key];
  },

  toggleEpisodeReaction(slug, epNumber, type) {
    const s = this.getState();
    const key = `${slug}::${epNumber}`;
    const current = this.getEpisodeReaction(slug, epNumber);

    if (current.vote === type) {
      if (type === 'like') current.likes = Math.max(0, current.likes - 1);
      if (type === 'dislike') current.dislikes = Math.max(0, current.dislikes - 1);
      current.vote = null;
    } else {
      if (current.vote === 'like') current.likes = Math.max(0, current.likes - 1);
      if (current.vote === 'dislike') current.dislikes = Math.max(0, current.dislikes - 1);
      if (type === 'like') current.likes += 1;
      if (type === 'dislike') current.dislikes += 1;
      current.vote = type;
    }

    s.reactions[key] = current;
    this.saveState(s);
    return current;
  },

  setActiveProfile(id) {
    const s = this.getState();
    s.activeProfileId = id;
    s.profileSelectedThisSession = true;
    if (!s.watchlist[id]) s.watchlist[id] = [];
    if (!s.history[id]) s.history[id] = [];
    this.saveState(s);
  },

  addProfile(name, avatarUrl) {
    const s = this.getState();
    const id = 'p_' + Date.now();
    const nextAvatar = avatarUrl || window.BRAND_CONFIG.avatars[s.profiles.length % window.BRAND_CONFIG.avatars.length].url;
    s.profiles.push({
      id,
      name: name || 'Invitado 2',
      avatar: nextAvatar,
      displayLanguage: 'Español (América Latina)',
      audioLanguage: 'Japanese',
      preferAudioDescriptions: false,
      subtitleLanguage: 'Español (América Latina)',
      preferClosedCaptions: false,
      matureContent: 'Ages 18 and up'
    });
    s.watchlist[id] = [];
    s.history[id] = [];
    s.activeProfileId = id;
    s.profileSelectedThisSession = true;
    this.saveState(s);
  },

  deleteProfile(id) {
    const s = this.getState();
    if (s.profiles.length <= 1) return;
    s.profiles = s.profiles.filter(p => p.id !== id);
    delete s.watchlist[id];
    delete s.history[id];
    if (s.activeProfileId === id) {
      s.activeProfileId = s.profiles[0].id;
    }
    this.saveState(s);
  },

  updateActiveProfile(patch) {
    const s = this.getState();
    const idx = s.profiles.findIndex(p => p.id === s.activeProfileId);
    if (idx !== -1) {
      s.profiles[idx] = { ...s.profiles[idx], ...patch };
      this.saveState(s);
    }
  },

  setTheme(theme) {
    const s = this.getState();
    s.theme = theme;
    this.saveState(s);
  },

  setAccentColor(hex) {
    const s = this.getState();
    s.accentColor = hex;
    this.saveState(s);
  },

  getWatchlist() {
    const s = this.getState();
    return s.watchlist[s.activeProfileId] || [];
  },

  isInWatchlist(slug) {
    return this.getWatchlist().some(i => i.slug === slug);
  },

  toggleWatchlist(item) {
    const s = this.getState();
    const pid = s.activeProfileId;
    const list = s.watchlist[pid] || [];
    const exists = list.some(i => i.slug === item.slug);
    if (exists) {
      s.watchlist[pid] = list.filter(i => i.slug !== item.slug);
    } else {
      s.watchlist[pid] = [
        {
          slug: item.slug,
          title: item.title,
          cover: item.posterHD || item.cover || item.poster || item.image,
          addedAt: new Date().toISOString()
        },
        ...list
      ];
    }
    this.saveState(s);
    return !exists;
  },

  clearWatchlist() {
    const s = this.getState();
    s.watchlist[s.activeProfileId] = [];
    this.saveState(s);
  },

  getHistory() {
    const s = this.getState();
    return s.history[s.activeProfileId] || [];
  },

  addToHistory(entry) {
    const s = this.getState();
    const pid = s.activeProfileId;
    const list = s.history[pid] || [];
    const key = `${entry.slug}::${entry.episodeNumber}`;
    const filtered = list.filter(i => `${i.slug}::${i.episodeNumber}` !== key);
    s.history[pid] = [
      {
        slug: entry.slug,
        animeTitle: entry.animeTitle,
        episodeNumber: Number(entry.episodeNumber),
        episodeTitle: entry.episodeTitle,
        cover: entry.cover,
        watchedAt: new Date().toISOString()
      },
      ...filtered
    ];
    this.saveState(s);
  },

  clearHistory() {
    const s = this.getState();
    s.history[s.activeProfileId] = [];
    this.saveState(s);
  },

  getStats() {
    const h = this.getHistory();
    const w = this.getWatchlist();
    const uniqueAnimes = new Set(h.map(x => x.slug));
    return {
      animesWatched: uniqueAnimes.size,
      episodesWatched: h.length,
      minutesWatched: h.length * 24,
      watchlistCount: w.length
    };
  },

  applyTheme(customState) {
    const s = customState || this.getState();
    const root = document.documentElement;
    const found = window.BRAND_CONFIG.accents.find(a => a.hex === s.accentColor);
    root.style.setProperty('--brand-color', s.accentColor || window.BRAND_CONFIG.defaultAccent);
    root.style.setProperty('--brand-hover', found ? found.hover : s.accentColor);

    let mode = s.theme;
    if (mode === 'system') {
      mode = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    if (mode === 'light') root.classList.add('light-theme');
    else root.classList.remove('light-theme');
  }
};

window.renderPosterCardHTML = function(anime, idx = 0, showTimeAgo = false) {
  const cleanSlug = (anime.animeSlug || anime.slug || '').replace(/-\d+$/, '');
  const inList = window.Store.isInWatchlist(cleanSlug);
  const delay = Math.min(idx * 35, 350);
  const safeTitle = (anime.title || '').replace(/"/g, '&quot;');
  const posterUrl = anime.posterHD || anime.cover || '';
  const safeCover = posterUrl.replace(/"/g, '&quot;');
  const initialRating = anime.rating || '';
  const initialStars = initialRating ? window.Adapters.renderStarsHTML(initialRating, 'w-3.5 h-3.5') : window.Adapters.renderStarsHTML(4.8, 'w-3.5 h-3.5');

  return `
    <div class="cr-poster-card animate-card-in group select-none" data-anime-slug="${cleanSlug}" data-anime-title="${safeTitle}" style="animation-delay: ${delay}ms">
      <a href="series.html?slug=${encodeURIComponent(cleanSlug)}" class="block">
        <div class="aspect-[2/3] bg-[#141519] overflow-hidden relative">
          <img src="${safeCover}" alt="${safeTitle}" class="js-card-poster-img w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ${inList ? `<div class="absolute top-0 right-0 w-0 h-0 border-t-[26px] border-t-brand border-l-[26px] border-l-transparent"></div>` : ''}
        </div>
        <h3 class="text-xs sm:text-sm font-bold mt-2 line-clamp-2 text-cr-primary">${anime.title}</h3>
        ${showTimeAgo && anime.timeAgo ? `<p class="text-[11px] text-cr-secondary mt-0.5">${anime.timeAgo}</p>` : ''}
        <p class="text-[11px] sm:text-xs text-cr-secondary mt-0.5">Sub | Dub</p>
      </a>

      <div class="cr-poster-hover absolute inset-0 p-4 flex flex-col justify-between text-white">
        <a href="series.html?slug=${encodeURIComponent(cleanSlug)}" class="block flex-1 overflow-hidden">
          <h4 class="font-black text-xs uppercase tracking-wide line-clamp-2">${anime.title}</h4>

          <div class="flex items-center gap-1.5 text-xs text-[#DADADA] font-bold mt-2">
            <span class="js-card-rating text-white">${initialRating || '...'}</span>
            <span class="js-card-stars flex items-center gap-0.5">${initialStars}</span>
            <span class="js-card-votes text-[#A0A0A0]">${anime.votes ? `(${anime.votes})` : ''}</span>
          </div>

          <div class="text-xs text-[#A0A0A0] mt-1.5 font-semibold">
            <div>1 ${window.Store.t('seasons')}</div>
            <div class="js-card-eps">${anime.episodesCount ? `${anime.episodesCount} ${window.Store.t('episodes')}` : ''}</div>
          </div>

          <p class="js-card-synopsis text-xs text-[#E2E2E2] mt-2.5 line-clamp-5 leading-relaxed">
            ${anime.synopsis || 'Cargando sinopsis...'}
          </p>
        </a>

        <div class="flex items-center gap-4 pt-3 text-brand">
          <a href="watch.html?slug=${encodeURIComponent(cleanSlug)}&ep=1" class="hover:scale-110 transition-transform" title="Play E1">
            <i data-lucide="play" class="w-5 h-5"></i>
          </a>
          <button type="button" data-fav-slug="${cleanSlug}" data-fav-title="${safeTitle}" data-fav-cover="${safeCover}" class="card-quick-fav hover:scale-110 transition-transform" title="Watchlist">
            <i data-lucide="bookmark" class="w-5 h-5 ${inList ? 'fill-current' : ''}"></i>
          </button>
          <a href="series.html?slug=${encodeURIComponent(cleanSlug)}" class="hover:scale-110 transition-transform" title="Details">
            <i data-lucide="plus" class="w-5 h-5"></i>
          </a>
        </div>
      </div>
    </div>
  `;
};

window.bindPosterCardEvents = function(container, onUpdate) {
  if (!container) return;

  container.querySelectorAll('.card-quick-fav').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.Store.toggleWatchlist({
        slug: btn.dataset.favSlug,
        title: btn.dataset.favTitle,
        cover: btn.dataset.favCover
      });
      if (typeof onUpdate === 'function') onUpdate();
    });
  });

  const hydrateCard = async (card) => {
    if (card.dataset.hydrated === '1') return;
    card.dataset.hydrated = '1';
    const slug = card.dataset.animeSlug;
    const title = card.dataset.animeTitle;
    const meta = await window.Api.getRealCardMetadata(slug, title);
    if (!meta) return;

    const posterImgEl = card.querySelector('.js-card-poster-img');
    const favBtnEl = card.querySelector('.card-quick-fav');
    const ratingEl = card.querySelector('.js-card-rating');
    const starsEl = card.querySelector('.js-card-stars');
    const votesEl = card.querySelector('.js-card-votes');
    const epsEl = card.querySelector('.js-card-eps');
    const synEl = card.querySelector('.js-card-synopsis');

    // Si la tarjeta tenía una miniatura de episodio, la reemplaza por la carátula vertical oficial (posterHD)
    if (posterImgEl && meta.posterHD) {
      posterImgEl.src = meta.posterHD;
      if (favBtnEl) favBtnEl.dataset.favCover = meta.posterHD;
    }
    if (ratingEl && meta.rating) ratingEl.textContent = meta.rating;
    if (starsEl && meta.rating) starsEl.innerHTML = window.Adapters.renderStarsHTML(meta.rating, 'w-3.5 h-3.5');
    if (votesEl && meta.votes) votesEl.textContent = `(${meta.votes})`;
    if (epsEl && meta.episodesCount) epsEl.textContent = `${meta.episodesCount} ${window.Store.t('episodes')}`;
    if (synEl && meta.synopsis) synEl.textContent = meta.synopsis;
  };

  const cards = Array.from(container.querySelectorAll('.cr-poster-card'));
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => hydrateCard(card), { once: true });
  });

  cards.slice(0, 18).forEach((card, i) => {
    setTimeout(() => hydrateCard(card), i * 80);
  });
};

window.initSharedLayout = function(activeTab = '') {
  window.Store.applyTheme();
  const profile = window.Store.getActiveProfile();
  const t = (k) => window.Store.t(k);
  const path = window.location.pathname.toLowerCase();
  const isHome = path.endsWith('index.html') || path.endsWith('/') || path === '';
  const isPrefs = path.endsWith('preferences.html');
  const isSearch = path.endsWith('search.html');

  const headerEl = document.getElementById('cr-header');
  if (!headerEl) return;

  headerEl.innerHTML = `
    <div class="w-full h-[56px] md:h-[60px] bg-[#23252B] text-white px-3 md:px-8 flex items-center justify-between select-none relative z-50">
      <div class="flex items-center gap-3 md:gap-6 h-full">
        <button id="cr-mobile-menu-btn" class="md:hidden p-2 -ml-1 text-[#DADADA] hover:text-white" aria-label="Menu">
          <i data-lucide="menu" class="w-6 h-6"></i>
        </button>

        <a href="index.html" class="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
          <img src="${window.BRAND_CONFIG.logoUrl}" alt="Logo" class="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover shrink-0 shadow-md" />
          <span class="hidden md:inline font-bold text-xl tracking-tight text-brand">${window.BRAND_CONFIG.name}</span>
        </a>

        <nav class="hidden md:flex items-center h-full text-sm font-semibold text-[#DADADA]">
          <a href="search.html?view=new" class="px-4 h-full flex items-center hover:bg-[#141519] hover:text-white transition-colors ${activeTab === 'new' ? 'text-white bg-[#141519]' : ''}">${t('new')}</a>
          <a href="search.html?view=popular&order=popular" class="px-4 h-full flex items-center hover:bg-[#141519] hover:text-white transition-colors ${activeTab === 'popular' ? 'text-white bg-[#141519]' : ''}">${t('popular')}</a>
          <a href="search.html?view=simulcast&status=emision" class="px-4 h-full flex items-center hover:bg-[#141519] hover:text-white transition-colors ${activeTab === 'simulcast' ? 'text-white bg-[#141519]' : ''}">${t('simulcast')}</a>

          <div class="relative h-full flex items-center group">
            <button class="px-4 h-full flex items-center gap-1.5 hover:bg-[#141519] hover:text-white transition-colors">
              <span>${t('categories')}</span>
              <i data-lucide="chevron-down" class="w-4 h-4 transition-transform group-hover:rotate-180"></i>
            </button>
            <div class="hidden group-hover:grid grid-cols-2 gap-2 w-80 p-4 bg-[#141519] border border-[#2B2E36] absolute top-[60px] left-0 shadow-2xl text-xs font-bold z-50">
              <a href="search.html?genre=accion" class="p-2 hover:bg-[#23252B] hover:text-brand rounded transition-colors">Acción / Action</a>
              <a href="search.html?genre=aventura" class="p-2 hover:bg-[#23252B] hover:text-brand rounded transition-colors">Aventura / Adventure</a>
              <a href="search.html?genre=comedia" class="p-2 hover:bg-[#23252B] hover:text-brand rounded transition-colors">Comedia / Comedy</a>
              <a href="search.html?genre=drama" class="p-2 hover:bg-[#23252B] hover:text-brand rounded transition-colors">Drama</a>
              <a href="search.html?genre=fantasia" class="p-2 hover:bg-[#23252B] hover:text-brand rounded transition-colors">Fantasía / Fantasy</a>
              <a href="search.html?genre=ciencia-ficcion" class="p-2 hover:bg-[#23252B] hover:text-brand rounded transition-colors">Sci-Fi / Ciencia Ficción</a>
              <a href="search.html?genre=romance" class="p-2 hover:bg-[#23252B] hover:text-brand rounded transition-colors">Romance</a>
              <a href="search.html?genre=deportes" class="p-2 hover:bg-[#23252B] hover:text-brand rounded transition-colors">Deportes / Sports</a>
            </div>
          </div>
        </nav>
      </div>

      <div class="flex items-center h-full">
        <button id="quick-lang-toggle" class="hidden md:flex px-3 h-full items-center text-xs font-black uppercase text-[#DADADA] hover:text-brand hover:bg-[#141519] transition-colors" title="Switch Language ES/EN">
          ${window.Store.getLangCode().toUpperCase()}
        </button>

        <a href="search.html" class="px-3.5 h-full flex items-center hover:bg-[#141519] transition-colors" title="Search">
          <i data-lucide="search" class="w-5 h-5 text-[#DADADA]"></i>
        </a>
        <a href="preferences.html?tab=watchlist" class="hidden md:flex px-3.5 h-full items-center hover:bg-[#141519] transition-colors" title="Watchlist">
          <i data-lucide="bookmark" class="w-5 h-5 text-[#DADADA]"></i>
        </a>

        <button id="cr-drawer-btn" class="px-2.5 md:px-3.5 h-full flex items-center gap-1.5 hover:bg-[#141519] transition-colors relative">
          <img src="${profile.avatar}" alt="${profile.name}" class="w-8 h-8 rounded-full object-cover bg-black" />
          <i data-lucide="chevron-down" class="w-4 h-4 text-[#DADADA]"></i>
        </button>
      </div>
    </div>

    <!-- Drawer Izquierdo Móvil -->
    <div id="cr-left-backdrop" class="hidden fixed inset-0 bg-black/60 z-40"></div>
    <aside id="cr-left-drawer" class="cr-left-drawer fixed top-[56px] md:top-[60px] left-0 bottom-0 w-full sm:w-[300px] bg-[#141519] text-white border-r border-[#2B2E36] z-50 flex flex-col justify-between overflow-y-auto shadow-2xl md:hidden">
      <div class="py-3">
        <div class="px-5 py-2 text-[11px] font-black uppercase tracking-widest text-[#A0A0A0]">${t('browse')}</div>
        <a href="search.html?view=popular&order=popular" class="px-5 py-3.5 flex items-center justify-between font-bold text-sm hover:bg-[#23252B]">
          <span>${t('popular')}</span>
          <i data-lucide="flame" class="w-4 h-4 text-brand"></i>
        </a>
        <a href="search.html?view=new" class="px-5 py-3.5 flex items-center justify-between font-bold text-sm hover:bg-[#23252B]">
          <span>${t('new')}</span>
          <i data-lucide="sparkles" class="w-4 h-4 text-brand"></i>
        </a>
        <a href="search.html?view=simulcast&status=emision" class="px-5 py-3.5 flex items-center justify-between font-bold text-sm hover:bg-[#23252B]">
          <span>${t('simulcast')}</span>
          <i data-lucide="radio" class="w-4 h-4 text-brand"></i>
        </a>

        <div class="mt-3 pt-3 border-t border-[#2B2E36]">
          <button id="mobile-cat-accordion-btn" class="w-full px-5 py-3 flex items-center justify-between font-bold text-sm text-brand">
            <span>${t('categories')}</span>
            <i data-lucide="chevron-down" class="w-4 h-4"></i>
          </button>
          <div id="mobile-cat-list" class="grid grid-cols-1 bg-[#0B0C0F] py-1 text-xs font-semibold text-[#DADADA]">
            <a href="search.html?genre=accion" class="px-7 py-2.5 hover:text-brand">Acción / Action</a>
            <a href="search.html?genre=aventura" class="px-7 py-2.5 hover:text-brand">Aventura / Adventure</a>
            <a href="search.html?genre=comedia" class="px-7 py-2.5 hover:text-brand">Comedia / Comedy</a>
            <a href="search.html?genre=drama" class="px-7 py-2.5 hover:text-brand">Drama</a>
            <a href="search.html?genre=fantasia" class="px-7 py-2.5 hover:text-brand">Fantasía / Fantasy</a>
            <a href="search.html?genre=ciencia-ficcion" class="px-7 py-2.5 hover:text-brand">Sci-Fi / Ciencia Ficción</a>
            <a href="search.html?genre=romance" class="px-7 py-2.5 hover:text-brand">Romance</a>
            <a href="search.html?genre=deportes" class="px-7 py-2.5 hover:text-brand">Deportes / Sports</a>
          </div>
        </div>
      </div>

      <div class="p-4 border-t border-[#2B2E36] text-xs text-[#A0A0A0] flex items-center justify-between">
        <button id="mobile-lang-toggle" class="px-3 py-1.5 bg-[#23252B] text-white font-bold rounded flex items-center gap-1.5">
          <i data-lucide="globe" class="w-3.5 h-3.5 text-brand"></i>
          <span>${window.Store.getLangCode().toUpperCase()}</span>
        </button>
        <span class="text-brand font-bold">© AnimeStream</span>
      </div>
    </aside>

    <!-- Drawer Derecho de Perfil -->
    <div id="cr-profile-backdrop" class="hidden fixed inset-0 bg-black/60 z-40 transition-opacity"></div>
    <aside id="cr-profile-drawer" class="cr-drawer-panel fixed top-[56px] md:top-[60px] right-0 bottom-0 w-full md:w-[340px] bg-[#141519] text-white md:border-l border-[#2B2E36] z-50 flex flex-col justify-between overflow-y-auto shadow-2xl">
      <div>
        <div class="p-5 border-b border-[#2B2E36]">
          <div class="flex items-center justify-between">
            <a href="preferences.html?tab=profile" class="flex items-center gap-4 group">
              <img src="${profile.avatar}" alt="${profile.name}" class="w-14 h-14 rounded-full object-cover group-hover:ring-2 group-hover:ring-brand transition" />
              <span class="font-bold text-lg group-hover:text-brand transition-colors">${profile.name}</span>
            </a>
            <button id="drawer-edit-name-toggle" class="p-2 text-[#DADADA] hover:text-white" title="Edit Profile Name">
              <i data-lucide="pencil" class="w-5 h-5"></i>
            </button>
          </div>

          <form id="drawer-inline-form" class="hidden mt-3 flex gap-2">
            <input id="drawer-inline-input" type="text" value="${profile.name}" class="flex-1 bg-[#23252B] border border-[#3E4149] px-3 py-1.5 text-sm text-white focus:outline-none focus:border-brand" />
            <button type="submit" class="bg-brand text-black font-bold text-xs px-3 py-1.5 uppercase">OK</button>
          </form>
        </div>

        <div class="py-2 border-b border-[#2B2E36] text-sm font-semibold">
          <button id="drawer-switch-profile" class="w-full px-5 py-3.5 flex items-center gap-4 hover:bg-[#23252B] transition-colors text-left">
            <i data-lucide="arrow-left-right" class="w-5 h-5 text-[#DADADA]"></i>
            <span>${t('switchProfile')}</span>
          </button>
          <a href="preferences.html" class="w-full px-5 py-3.5 flex items-center gap-4 hover:bg-[#23252B] transition-colors">
            <i data-lucide="settings" class="w-5 h-5 text-[#DADADA]"></i>
            <span>${t('settings')}</span>
          </a>
        </div>

        <div class="py-2 text-sm font-semibold">
          <a href="preferences.html?tab=watchlist" class="w-full px-5 py-3.5 flex items-center gap-4 hover:bg-[#23252B] transition-colors">
            <i data-lucide="bookmark" class="w-5 h-5 text-[#DADADA]"></i>
            <span>${t('watchlist')}</span>
          </a>
          <a href="preferences.html?tab=history" class="w-full px-5 py-3.5 flex items-center gap-4 hover:bg-[#23252B] transition-colors">
            <i data-lucide="history" class="w-5 h-5 text-[#DADADA]"></i>
            <span>${t('history')}</span>
          </a>
        </div>
      </div>

      <div class="p-2 border-t border-[#2B2E36] text-sm font-semibold">
        <button id="drawer-logout-btn" class="w-full px-5 py-3.5 flex items-center gap-4 hover:bg-[#23252B] transition-colors text-left">
          <i data-lucide="log-out" class="w-5 h-5 text-[#DADADA]"></i>
          <span>${t('logOut')}</span>
        </button>
      </div>
    </aside>

    <!-- Bottom Tab Bar Fija para Teléfonos (< 768px) -->
    <nav class="cr-bottom-nav md:hidden fixed bottom-0 inset-x-0 bg-[#141519]/95 backdrop-blur border-t border-[#2B2E36] z-40 grid grid-cols-5 h-[58px] text-[10px] font-bold">
      <a href="index.html" class="flex flex-col items-center justify-center gap-1 ${isHome ? 'text-brand' : 'text-[#A0A0A0] hover:text-white'}">
        <i data-lucide="home" class="w-5 h-5"></i>
        <span>${t('home')}</span>
      </a>
      <a href="preferences.html?tab=watchlist" class="flex flex-col items-center justify-center gap-1 ${isPrefs && window.location.search.includes('watchlist') ? 'text-brand' : 'text-[#A0A0A0] hover:text-white'}">
        <i data-lucide="bookmark" class="w-5 h-5"></i>
        <span>${t('myLists')}</span>
      </a>
      <a href="search.html" class="flex flex-col items-center justify-center gap-1 ${isSearch && activeTab !== 'simulcast' ? 'text-brand' : 'text-[#A0A0A0] hover:text-white'}">
        <i data-lucide="compass" class="w-5 h-5"></i>
        <span>${t('browse')}</span>
      </a>
      <a href="search.html?view=simulcast&status=emision" class="flex flex-col items-center justify-center gap-1 ${activeTab === 'simulcast' ? 'text-brand' : 'text-[#A0A0A0] hover:text-white'}">
        <i data-lucide="sparkles" class="w-5 h-5"></i>
        <span>${t('simulcast')}</span>
      </a>
      <a href="preferences.html" class="flex flex-col items-center justify-center gap-1 ${isPrefs && !window.location.search.includes('watchlist') ? 'text-brand' : 'text-[#A0A0A0] hover:text-white'}">
        <img src="${profile.avatar}" class="w-5 h-5 rounded-full object-cover ${isPrefs ? 'ring-1 ring-brand' : ''}" />
        <span>${t('account')}</span>
      </a>
    </nav>
  `;

  let footerEl = document.getElementById('cr-footer');
  if (!footerEl) {
    footerEl = document.createElement('footer');
    footerEl.id = 'cr-footer';
    document.body.appendChild(footerEl);
  }

  footerEl.className = 'cr-footer-bg border-t border-[#2B2E36] text-[#A0A0A0] text-sm pt-12 pb-28 md:pb-14 px-6 md:px-12 select-none mt-auto';
  footerEl.innerHTML = `
    <div class="max-w-[1280px] mx-auto">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-10 border-b border-[#2B2E36]">
        <div>
          <h4 class="text-white font-bold text-sm mb-4">${t('footerNav')}</h4>
          <ul class="space-y-2.5 text-xs font-semibold">
            <li><a href="search.html?view=popular&order=popular" class="hover:text-white transition-colors">${t('browsePopular')}</a></li>
            <li><a href="search.html?view=simulcast&status=emision" class="hover:text-white transition-colors">${t('browseSimulcasts')}</a></li>
            <li><a href="search.html?view=new" class="hover:text-white transition-colors">${t('new')}</a></li>
            <li><a href="search.html" class="hover:text-white transition-colors">${t('browse')}</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-bold text-sm mb-4">${t('footerAccount')}</h4>
          <ul class="space-y-2.5 text-xs font-semibold">
            <li><a href="index.html?switchProfile=1" class="hover:text-white transition-colors">${t('switchProfile')}</a></li>
            <li><a href="preferences.html?tab=watchlist" class="hover:text-white transition-colors">${t('watchlist')}</a></li>
            <li><a href="preferences.html?tab=history" class="hover:text-white transition-colors">${t('history')}</a></li>
            <li><a href="preferences.html?tab=profile" class="hover:text-white transition-colors">${t('profileAndAvatar')}</a></li>
            <li><a href="preferences.html?tab=theme" class="hover:text-white transition-colors">${t('themeAndColor')}</a></li>
            <li><a href="preferences.html" class="hover:text-white transition-colors">${t('settings')}</a></li>
          </ul>
        </div>
      </div>

      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div class="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 text-center sm:text-left">
          <span class="font-black tracking-widest text-white text-sm">ANIME5TREAM</span>
          <span class="hidden sm:inline text-[#3E4149]">|</span>
          <span>© Anime5tream, LLC</span>
        </div>

        <div class="flex items-center gap-3">
          <button id="footer-lang-select" class="px-4 py-2 bg-[#23252B] hover:bg-[#2B2E36] text-white font-bold text-xs flex items-center gap-2 border border-[#3E4149] transition-colors">
            <i data-lucide="globe" class="w-4 h-4 text-brand"></i>
            <span>${profile.displayLanguage}</span>
            <i data-lucide="chevron-up" class="w-3.5 h-3.5 text-[#A0A0A0]"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();

  const drawerBtn = document.getElementById('cr-drawer-btn');
  const drawer = document.getElementById('cr-profile-drawer');
  const backdrop = document.getElementById('cr-profile-backdrop');
  const editToggle = document.getElementById('drawer-edit-name-toggle');
  const editForm = document.getElementById('drawer-inline-form');
  const editInput = document.getElementById('drawer-inline-input');

  const leftBtn = document.getElementById('cr-mobile-menu-btn');
  const leftDrawer = document.getElementById('cr-left-drawer');
  const leftBackdrop = document.getElementById('cr-left-backdrop');

  const closeAllDrawers = () => {
    drawer?.classList.remove('open');
    backdrop?.classList.add('hidden');
    leftDrawer?.classList.remove('open');
    leftBackdrop?.classList.add('hidden');
  };

  drawerBtn?.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    closeAllDrawers();
    if (!isOpen) {
      drawer.classList.add('open');
      backdrop.classList.remove('hidden');
    }
  });

  leftBtn?.addEventListener('click', () => {
    const isOpen = leftDrawer.classList.contains('open');
    closeAllDrawers();
    if (!isOpen) {
      leftDrawer.classList.add('open');
      leftBackdrop.classList.remove('hidden');
    }
  });

  backdrop?.addEventListener('click', closeAllDrawers);
  leftBackdrop?.addEventListener('click', closeAllDrawers);

  document.getElementById('mobile-cat-accordion-btn')?.addEventListener('click', () => {
    document.getElementById('mobile-cat-list')?.classList.toggle('hidden');
  });

  const switchSiteLang = () => {
    const nextLang = window.Store.getLangCode() === 'en' ? 'Español (América Latina)' : 'English (US)';
    window.Store.updateActiveProfile({ displayLanguage: nextLang });
    window.location.reload();
  };

  document.getElementById('quick-lang-toggle')?.addEventListener('click', switchSiteLang);
  document.getElementById('mobile-lang-toggle')?.addEventListener('click', switchSiteLang);
  document.getElementById('footer-lang-select')?.addEventListener('click', switchSiteLang);

  editToggle?.addEventListener('click', () => {
    editForm.classList.toggle('hidden');
    editInput.focus();
  });

  editForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = editInput.value.trim();
    if (val) {
      window.Store.updateActiveProfile({ name: val });
      window.initSharedLayout(activeTab);
    }
  });

  const goSwitchProfile = () => {
    const s = window.Store.getState();
    s.profileSelectedThisSession = false;
    window.Store.saveState(s);
    window.location.href = 'index.html?switchProfile=1';
  };

  document.getElementById('drawer-switch-profile')?.addEventListener('click', goSwitchProfile);
  document.getElementById('drawer-logout-btn')?.addEventListener('click', goSwitchProfile);
};