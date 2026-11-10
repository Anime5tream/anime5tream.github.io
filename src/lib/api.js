// src/lib/api.js
window.API_BASE = 'https://animeav1.ahmedrangel.com';
window.KITSU_BASE = 'https://kitsu.io/api/edge';

const META_CACHE_KEY = 'cr_av1_exact_posters_v5';

function getMetaCache() {
  try {
    return JSON.parse(localStorage.getItem(META_CACHE_KEY) || '{}');
  } catch {
    return {};
  }
}

function setMetaCache(slug, data) {
  try {
    const cache = getMetaCache();
    cache[slug] = data;
    localStorage.setItem(META_CACHE_KEY, JSON.stringify(cache));
  } catch (_) {}
}

const FALLBACK_CATALOG = [
  {
    slug: 'sword-art-online',
    title: 'Sword Art Online',
    cover: 'https://cdn.myanimelist.net/images/anime/11/39717l.jpg',
    bannerHD: 'https://i.ytimg.com/vi/6ohYYtxfDCg/maxresdefault.jpg',
    synopsis: 'Ever since the release of the innovative NerveGear, gamers from all around the globe have been given the opportunity to experience a completely immersive virtual reality. Sword Art Online (SAO), one of the most recent games on the console, offers a gateway into the wondrous world of Aincrad.',
    type: 'tv-anime',
    genres: ['Action', 'Adventure', 'Fantasy', 'Romance'],
    rating: '4.7',
    votes: '2.2M',
    episodes_count: 25,
    mature: true
  },
  {
    slug: 'chainsaw-man',
    title: 'Chainsaw Man',
    cover: 'https://cdn.myanimelist.net/images/anime/1806/126216l.jpg',
    bannerHD: 'https://i.ytimg.com/vi/q15CRdE5Bv0/maxresdefault.jpg',
    synopsis: 'Denji is robbed of a normal teenage life, left with nothing but his deadbeat father\'s overwhelming debt. His only companion is his pet, the chainsaw devil Pochita, with whom he slays devils for money that inevitably ends up in the yakuza\'s pockets.',
    type: 'tv-anime',
    genres: ['Action', 'Fantasy'],
    rating: '4.9',
    votes: '1.6M',
    episodes_count: 12,
    mature: true
  },
  {
    slug: 'jujutsu-kaisen',
    title: 'Jujutsu Kaisen',
    cover: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
    bannerHD: 'https://i.ytimg.com/vi/4A_X-Dvl0ws/maxresdefault.jpg',
    synopsis: 'Idly indulging in baseless paranormal activities with the Occult Club, high schooler Yuuji Itadori spends his days at either the clubroom or the hospital, where he visits his bedridden grandfather.',
    type: 'tv-anime',
    genres: ['Action', 'Supernatural'],
    rating: '4.9',
    votes: '2.1M',
    episodes_count: 24,
    mature: true
  },
  {
    slug: 'darling-in-the-franxx',
    title: 'DARLING in the FRANXX',
    cover: 'https://cdn.myanimelist.net/images/anime/1614/90408l.jpg',
    bannerHD: 'https://images2.alphacoders.com/906/thumb-1920-906035.png',
    synopsis: 'In the distant future, humanity has been driven to near-extinction by giant beasts known as Klaxosaurs, forcing the surviving humans to take refuge in massive fortress cities called Plantations.',
    type: 'tv-anime',
    genres: ['Action', 'Drama', 'Romance', 'Sci-Fi'],
    rating: '4.6',
    votes: '1.1M',
    episodes_count: 24,
    mature: true
  },
  {
    slug: 'solo-leveling',
    title: 'Solo Leveling',
    cover: 'https://cdn.myanimelist.net/images/anime/1926/140799l.jpg',
    bannerHD: 'https://i.ytimg.com/vi/bssSj4cKsrI/maxresdefault.jpg',
    synopsis: 'Ten years ago, "the Gate" appeared and connected the real world with the realm of magic and monsters. To combat these vile beasts, ordinary people received superhuman powers and became known as "Hunters."',
    type: 'tv-anime',
    genres: ['Action', 'Adventure', 'Fantasy'],
    rating: '4.9',
    votes: '895K',
    episodes_count: 12,
    mature: true
  },
  {
    slug: 'sousou-no-frieren',
    title: "Frieren: Beyond Journey's End",
    cover: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg',
    bannerHD: 'https://4kwallpapers.com/images/walls/thumbs_3t/25925.jpg',
    synopsis: 'During their decade-long quest to defeat the Demon King, the members of the hero\'s party—Himmel himself, the priest Heiter, the dwarf warrior Eisen, and the elven mage Frieren—forge bonds through adventures and battles.',
    type: 'tv-anime',
    genres: ['Adventure', 'Drama', 'Fantasy'],
    rating: '4.9',
    votes: '920K',
    episodes_count: 28,
    mature: false
  }
];

async function smartFetch(url, options = {}) {
  try {
    const res = await fetch(url, options);
    if (res.ok) return await res.json();
  } catch (_) {}

  if (!options.method || options.method.toUpperCase() === 'GET') {
    try {
      const ao = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      const resAo = await fetch(ao);
      if (resAo.ok) return await resAo.json();
    } catch (_) {}
  }

  const cp = `https://corsproxy.io/?${encodeURIComponent(url)}`;
  const resCp = await fetch(cp, options);
  if (!resCp.ok) throw new Error(`HTTP ${resCp.status}`);
  return await resCp.json();
}

function extractMediaArray(json) {
  if (Array.isArray(json?.data?.media)) return json.data.media;
  if (Array.isArray(json?.data)) return json.data;
  if (Array.isArray(json?.media)) return json.media;
  if (Array.isArray(json)) return json;
  return [];
}

async function fetchKitsuBannerOnly(titleOrSlug) {
  if (!titleOrSlug) return null;
  const cleanQuery = String(titleOrSlug)
    .replace(/-\d+$/, '')
    .replace(/-/g, ' ')
    .replace(/\s*\(TV\)\s*/i, '')
    .trim();

  try {
    const url = `${window.KITSU_BASE}/anime?filter[text]=${encodeURIComponent(cleanQuery)}&page[limit]=1`;
    const res = await fetch(url, {
      headers: { 'Accept': 'application/vnd.api+json' }
    });
    if (!res.ok) return null;
    const json = await res.json();
    const attr = json?.data?.[0]?.attributes;
    if (!attr) return null;

    const ytWide = attr.youtubeVideoId
      ? `https://i.ytimg.com/vi/${attr.youtubeVideoId}/maxresdefault.jpg`
      : '';

    const kitsuCoverWide =
      attr.coverImage?.original ||
      attr.coverImage?.large ||
      '';

    return {
      bannerHD: kitsuCoverWide || ytWide,
      rating: attr.averageRating ? (parseFloat(attr.averageRating) / 20).toFixed(1) : '',
      votes: window.Adapters.formatVotes(attr.userCount || '')
    };
  } catch (_) {
    return null;
  }
}

window.Api = {

  async getRealCardMetadata(slug, fallbackTitle = '') {
    const cleanSlug = (slug || '').replace(/-\d+$/, '').replace(/-episodio-\d+$/i, '');
    const cached = getMetaCache()[cleanSlug];
    if (cached && cached.posterHD && cached.synopsis) return cached;

    let av1Details = null;
    try {
      const json = await smartFetch(`${window.API_BASE}/api/anime/${encodeURIComponent(cleanSlug)}`);
      if (json?.data || json?.title) {
        av1Details = window.Adapters.normalizeAnimeDetails(json, cleanSlug);
      }
    } catch (_) {}


    const exactPoster = av1Details?.cover || '';

    const merged = {
      slug: cleanSlug,
      title: av1Details?.title || fallbackTitle || cleanSlug.replace(/-/g, ' '),
      synopsis: av1Details?.synopsis || 'Sin descripción disponible.',
      rating: (av1Details?.rating && av1Details.rating !== '0.0') ? av1Details.rating : '4.8',
      votes: (av1Details?.votes && av1Details.votes !== '0') ? av1Details.votes : '18.5K',
      genres: av1Details?.genres?.length ? av1Details.genres : ['Anime'],
      seasonsCount: 1,
      episodesCount: av1Details?.episodes?.length || 12,
      cover: exactPoster,
      posterHD: exactPoster,
      bannerHD: ''
    };

    if (exactPoster) {
      setMetaCache(cleanSlug, merged);
    }
    return merged;
  },

 
  async getLatestEpisodes() {
    try {
      const json = await smartFetch(`${window.API_BASE}/api/list/latest-episodes`);
      const arr = extractMediaArray(json);
      if (!arr.length) throw new Error('Empty latest episodes');

      const cache = getMetaCache();

      const normalized = arr.map((item, i) => {
        const ep = window.Adapters.normalizeLatestEpisode(item, i);

        const chapterPreview16x9 = ep.cover;
        ep.episodeThumb = chapterPreview16x9;
        ep.bannerHD = chapterPreview16x9;

        const cached = cache[ep.animeSlug];
        if (cached && cached.posterHD) {
          ep.cover = cached.posterHD;
          ep.posterHD = cached.posterHD;
          ep.synopsis = cached.synopsis || ep.synopsis;
          ep.genres = cached.genres || ep.genres;
          ep.rating = cached.rating || ep.rating;
          ep.votes = cached.votes || ep.votes;
        }
        return ep;
      });

      await Promise.all(normalized.slice(0, 6).map(async (ep) => {
        const [meta, kitsuBanner] = await Promise.all([
          this.getRealCardMetadata(ep.animeSlug, ep.title),
          fetchKitsuBannerOnly(ep.title)
        ]);
        if (meta) {
          ep.synopsis = meta.synopsis;
          ep.rating = meta.rating;
          ep.votes = meta.votes;
          ep.genres = meta.genres;
          ep.episodesCount = meta.episodesCount;
          if (meta.posterHD) {
            ep.cover = meta.posterHD;   
            ep.posterHD = meta.posterHD;
          }
        }

        if (kitsuBanner?.bannerHD) {
          ep.bannerHD = kitsuBanner.bannerHD;
        }
      }));

      Promise.all(normalized.slice(6, 18).map(async (ep) => {
        const meta = await this.getRealCardMetadata(ep.animeSlug, ep.title);
        if (meta && meta.posterHD) {
          ep.cover = meta.posterHD;
          ep.posterHD = meta.posterHD;
        }
      })).catch(() => {});

      return normalized;
    } catch (e) {
      console.warn('[Fallback] getLatestEpisodes:', e.message);
      return FALLBACK_CATALOG.map((m, i) => window.Adapters.normalizeLatestEpisode({ ...m, number: i + 1 }, i));
    }
  },

  async searchByFilter({ types = [], genres = [], statuses = [], order = 'default', page = 1 } = {}) {
    try {
      const catalogUrl = new URL('https://animeav1.com/catalogo');
      if (genres.length) catalogUrl.searchParams.set('genre', genres[0]);
      if (types.length) catalogUrl.searchParams.set('category', types[0]);
      if (statuses.length) catalogUrl.searchParams.set('status', statuses[0]);
      if (order && order !== 'default') catalogUrl.searchParams.set('order', order);
      if (page > 1) catalogUrl.searchParams.set('page', String(page));

      let json;
      try {
        const postUrl = new URL(`${window.API_BASE}/api/search/by-filter`);
        if (order) postUrl.searchParams.set('order', order);
        if (page) postUrl.searchParams.set('page', String(page));
        const body = {};
        if (types.length) body.types = types;
        if (genres.length) body.genres = genres;
        if (statuses.length) body.statuses = statuses;

        json = await smartFetch(postUrl.toString(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
      } catch (_) {
        const byUrlEndpoint = `${window.API_BASE}/api/search/by-url?url=${encodeURIComponent(catalogUrl.toString())}`;
        json = await smartFetch(byUrlEndpoint);
      }

      let media = extractMediaArray(json);
      if (!media.length) {
        const byUrlEndpoint = `${window.API_BASE}/api/search/by-url?url=${encodeURIComponent(catalogUrl.toString())}`;
        json = await smartFetch(byUrlEndpoint);
        media = extractMediaArray(json);
      }

      if (!media.length) {
        const latest = await this.getLatestEpisodes();
        media = latest;
      }

      return {
        currentPage: json?.data?.currentPage || page,
        hasNextPage: Boolean(json?.data?.hasNextPage ?? (media.length >= 12)),
        foundPages: json?.data?.foundPages || 5,
        media: media.map((m, i) => window.Adapters.normalizeMediaItem(m, i))
      };
    } catch (e) {
      console.warn('[Fallback] searchByFilter:', e.message);
      return {
        currentPage: page,
        hasNextPage: false,
        foundPages: 1,
        media: FALLBACK_CATALOG.map((m, i) => window.Adapters.normalizeMediaItem(m, i))
      };
    }
  },

  async search(query = '', page = 1) {
    try {
      const url = new URL(`${window.API_BASE}/api/search`);
      url.searchParams.set('query', query);
      url.searchParams.set('page', String(page));

      const json = await smartFetch(url.toString());
      const media = extractMediaArray(json);
      if (!media.length) throw new Error('No search results from API');
      return {
        currentPage: json?.data?.currentPage || page,
        hasNextPage: Boolean(json?.data?.hasNextPage),
        foundPages: json?.data?.foundPages || 1,
        media: media.map((m, i) => window.Adapters.normalizeMediaItem(m, i))
      };
    } catch (e) {
      console.warn('[Fallback] search:', e.message);
      const q = query.toLowerCase();
      const filtered = FALLBACK_CATALOG.filter(m => m.title.toLowerCase().includes(q) || m.slug.includes(q));
      const finalArr = filtered.length ? filtered : FALLBACK_CATALOG;
      return {
        currentPage: 1,
        hasNextPage: false,
        foundPages: 1,
        media: finalArr.map((m, i) => window.Adapters.normalizeMediaItem(m, i))
      };
    }
  },

  async getAnimeDetails(slug) {
    const cleanSlug = slug.replace(/-\d+$/, '').replace(/-episodio-\d+$/i, '');
    try {
      const json = await smartFetch(`${window.API_BASE}/api/anime/${encodeURIComponent(cleanSlug)}`);
      if (!json?.data && !json?.title) throw new Error('Invalid anime details');
      const details = window.Adapters.normalizeAnimeDetails(json, cleanSlug);

      const kitsu = await fetchKitsuBannerOnly(details.title || cleanSlug);
      if (kitsu) {
        if ((!details.rating || details.rating === '0.0') && kitsu.rating) details.rating = kitsu.rating;
        if ((!details.votes || details.votes === '0') && kitsu.votes) details.votes = kitsu.votes;
        if (kitsu.bannerHD) details.bannerHD = kitsu.bannerHD;
      }

      setMetaCache(cleanSlug, {
        slug: cleanSlug,
        title: details.title,
        synopsis: details.synopsis,
        rating: details.rating || '4.8',
        votes: details.votes || '24.5K',
        genres: details.genres,
        seasonsCount: 1,
        episodesCount: details.episodes.length,
        cover: details.cover,
        posterHD: details.cover,
        bannerHD: details.bannerHD || ''
      });

      return details;
    } catch (e) {
      console.warn('[Fallback] getAnimeDetails:', e.message);
      const found = FALLBACK_CATALOG.find(m => m.slug === cleanSlug) || FALLBACK_CATALOG[0];
      return window.Adapters.normalizeAnimeDetails({ data: found }, cleanSlug);
    }
  },

  async getEpisodeServers(slug, episode) {
    const cleanSlug = slug.replace(/-\d+$/, '').replace(/-episodio-\d+$/i, '');
    try {
      const json = await smartFetch(`${window.API_BASE}/api/anime/${encodeURIComponent(cleanSlug)}/${encodeURIComponent(episode)}`);
      const norm = window.Adapters.normalizeEpisodeServers(json, cleanSlug, episode);
      norm.embeds.push({
        id: 'cr-native-html5',
        name: 'Anime5tream Custom Player (HTML5 Demo)',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        type: 'SUB',
        isDirectVideo: true
      });
      return norm;
    } catch (e) {
      console.warn('[Fallback] getEpisodeServers:', e.message);
      return window.Adapters.normalizeEpisodeServers({
        data: {
          title: `Episode ${episode}`,
          number: episode,
          embeds: [
            {
              name: 'Anime5tream Custom Player (HTML5)',
              url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              type: 'SUB'
            }
          ],
          downloads: []
        }
      }, cleanSlug, episode);
    }
  }
};