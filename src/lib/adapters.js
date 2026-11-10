// src/lib/adapters.js
window.Adapters = {
  // Asegura que cualquier URL de MyAnimeList u otro CDN cargue en su máxima resolución disponible
  upgradeImageUrl(url = '') {
    if (!url) return '';
    return String(url)
      .replace(/\/r\/\d+x\d+\//, '/')
      .replace(/(\.jpg|\.webp|\.png)\?.*$/i, '$1');
  },

  formatScore(rawScore) {
    if (rawScore === undefined || rawScore === null || rawScore === '') return '';
    const cleaned = String(rawScore).replace(/[^0-9.]/g, '');
    const n = parseFloat(cleaned);
    if (isNaN(n) || n <= 0) return '';
    if (n > 5) return (n / 2).toFixed(1);
    return n.toFixed(1);
  },

  formatVotes(rawVotes) {
    if (rawVotes === undefined || rawVotes === null || rawVotes === '') return '';
    if (typeof rawVotes === 'string' && rawVotes.toUpperCase().includes('K')) return rawVotes;
    const cleaned = String(rawVotes).replace(/[^0-9]/g, '');
    const n = parseInt(cleaned, 10);
    if (isNaN(n) || n <= 0) return '';
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return String(n);
  },

  renderStarsHTML(scoreOut5, sizeClass = 'w-3.5 h-3.5') {
    const val = parseFloat(scoreOut5) || 4.8;
    let html = '';
    for (let i = 1; i <= 5; i++) {
      if (val >= i - 0.2) {
        html += `<svg class="${sizeClass} text-brand fill-current inline-block" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
      } else if (val >= i - 0.7) {
        html += `<svg class="${sizeClass} text-brand inline-block" viewBox="0 0 24 24"><defs><linearGradient id="halfStar"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><path fill="url(#halfStar)" stroke="currentColor" stroke-width="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
      } else {
        html += `<svg class="${sizeClass} text-[#595B61] inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
      }
    }
    return html;
  },

  normalizeLatestEpisode(item, idx = 0) {
    const rawSlug = item.slug || `anime-${idx}`;
    const animeSlug = rawSlug.replace(/-\d+$/, '').replace(/-episodio-\d+$/i, '');
    const epNumber = Number(item.number ?? 1);
    const hoursAgo = idx === 0 ? '39 minutes ago' : `${idx + 2} hours ago`;
    const cover = this.upgradeImageUrl(item.cover || item.image || item.poster || '');
    const bannerHD = this.upgradeImageUrl(item.bannerHD || item.banner || item.backdrop || item.thumbnail || '');

    return {
      id: `${animeSlug}-${epNumber}`,
      slug: animeSlug,
      animeSlug,
      episodeSlug: rawSlug,
      title: item.title || animeSlug.replace(/-/g, ' '),
      episodeNumber: epNumber,
      cover,
      posterHD: cover,
      bannerHD,
      episodeThumb: bannerHD || cover,
      synopsis: item.synopsis || item.description || '',
      rating: this.formatScore(item.rating || item.score),
      votes: this.formatVotes(item.votes || item.scored_by),
      genres: Array.isArray(item.genres) ? item.genres : [],
      seasonsCount: 1,
      episodesCount: item.episodes_count || epNumber,
      timeAgo: hoursAgo,
      url: item.url || ''
    };
  },

  normalizeMediaItem(item, idx = 0) {
    const slug = (item.slug || `series-${idx}`).replace(/-\d+$/, '');
    const timeLabels = ['39 minutes ago', '19 hours ago', '19 hours ago', '20 hours ago', '21 hours ago', '21 hours ago', '2 days ago', '2 days ago'];
    const cover = this.upgradeImageUrl(item.cover || item.poster || item.image || '');
    const bannerHD = this.upgradeImageUrl(item.bannerHD || item.banner || item.backdrop || '');

    return {
      slug,
      title: item.title || item.name || slug.replace(/-/g, ' '),
      cover,
      posterHD: cover,
      bannerHD,
      synopsis: item.synopsis || item.description || '',
      type: item.type || 'TV Anime',
      rating: this.formatScore(item.rating || item.score),
      votes: this.formatVotes(item.votes || item.scored_by),
      genres: Array.isArray(item.genres) ? item.genres : [],
      seasonsCount: 1,
      episodesCount: item.episodes_count || item.episodes || '',
      timeAgo: timeLabels[idx % timeLabels.length],
      url: item.url || ''
    };
  },

  normalizeAnimeDetails(payload, requestedSlug) {
    const d = payload?.data || payload || {};
    const slug = d.slug || requestedSlug;
    const rawEpisodes = Array.isArray(d.episodes) ? d.episodes : [];
    const realSynopsis = d.synopsis || d.description || '';
    const cover = this.upgradeImageUrl(d.cover || '');
    const bannerHD = this.upgradeImageUrl(d.bannerHD || d.banner || d.backdrop || '');

    const episodes = rawEpisodes.map((ep, idx) => {
      const num = Number(ep.number ?? (idx + 1));
      return {
        number: num,
        slug: ep.slug || `${slug}-${num}`,
        title: ep.title || `Episode ${num}`,
        cover: this.upgradeImageUrl(ep.image || ep.cover || bannerHD || cover || ''),
        duration: ep.duration || '23m',
        releaseDate: ep.aired || d.start_date || '',
        synopsis: ep.synopsis || realSynopsis,
        url: ep.url || ''
      };
    }).sort((a, b) => a.number - b.number);

    return {
      slug,
      malId: d.malId || d.mal_id || null,
      title: d.title || slug.replace(/-/g, ' '),
      alternativeTitles: Array.isArray(d.alternative_titles) ? d.alternative_titles : [],
      status: d.status || 'En Emisión',
      rating: this.formatScore(d.rating || d.score),
      votes: this.formatVotes(d.votes || d.scored_by),
      type: d.type || 'TV',
      cover,
      posterHD: cover,
      bannerHD,
      synopsis: realSynopsis,
      genres: Array.isArray(d.genres) && d.genres.length ? d.genres : ['Anime'],
      year: d.year || 2026,
      startDate: d.start_date || '',
      mature: Boolean(d.mature ?? true),
      nextAiringEpisode: d.next_airing_episode || null,
      seasonsCount: 1,
      episodesCount: episodes.length || d.episodes_count || 12,
      episodes: episodes.length ? episodes : Array.from({ length: 12 }, (_, i) => ({
        number: i + 1,
        slug: `${slug}-${i + 1}`,
        title: `Episode ${i + 1}`,
        cover: bannerHD || cover || '',
        duration: '23m',
        releaseDate: d.start_date || '',
        synopsis: realSynopsis
      })),
      related: Array.isArray(d.related) ? d.related : []
    };
  },

  normalizeEpisodeServers(payload, slug, episodeNumber) {
    const d = payload?.data || payload || {};
    const rawEmbeds = Array.isArray(d.embeds) ? d.embeds : (Array.isArray(d.servers) ? d.servers : []);
    const rawDownloads = Array.isArray(d.downloads) ? d.downloads : [];

    const embeds = rawEmbeds
      .filter(e => e && (e.url || e.embed))
      .map((e, i) => ({
        id: `emb-${i}`,
        name: e.name || e.server || `Server ${i + 1}`,
        url: e.url || e.embed || '',
        type: (e.type || e.lang || 'SUB').toUpperCase(),
        isDirectVideo: /\.(mp4|m3u8)(\?.*)?$/i.test(e.url || '')
      }));

    const downloads = rawDownloads.map((dl, i) => ({
      name: dl.name || dl.server || `Download ${i + 1}`,
      url: dl.url || '#',
      type: (dl.type || 'SUB').toUpperCase()
    }));

    return {
      slug,
      title: d.title || `Episode ${episodeNumber}`,
      number: Number(d.number ?? episodeNumber),
      embeds,
      downloads
    };
  }
};