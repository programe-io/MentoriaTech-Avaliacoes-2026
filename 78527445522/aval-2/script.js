(function () {
  "use strict";

  /* ---------- Armazenamento (só neste navegador) ---------- */
  const store = {
    get(k, f) { try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : f; } catch (e) { return f; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }
  };
  const K = { me: "ft.me", posts: "ft.posts", likes: "ft.likes", comments: "ft.comments", follows: "ft.follows", seen: "ft.seen" };

  /* ---------- Utilitários ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const app = $("#app");

  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  const plain = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const slugify = (s) => plain(s).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "aluno";

  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function ago(ts) {
    const s = (Date.now() - ts) / 1000;
    if (s < 60) return "agora";
    if (s < 3600) return `há ${Math.floor(s / 60)} min`;
    if (s < 86400) return `há ${Math.floor(s / 3600)} h`;
    const d = Math.floor(s / 86400);
    if (d < 7) return `há ${d} d`;
    return `há ${Math.floor(d / 7)} sem`;
  }

  let toastT;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove("show"), 2200);
  }

  /* ---------- Alunos ---------- */
  const AV_COLORS = [
    ["#0d9488", "#5eead4"], ["#4f46e5", "#a5b4fc"], ["#db2777", "#f9a8d4"], ["#ea580c", "#fdba74"],
    ["#0284c7", "#7dd3fc"], ["#65a30d", "#bef264"], ["#9333ea", "#d8b4fe"], ["#b45309", "#fcd34d"]
  ];

  const STUDENTS = (() => {
    const used = new Set();
    return ALUNOS.map((nome, i) => {
      let slug = slugify(nome), n = 2;
      const base = slug;
      while (used.has(slug)) slug = `${base}-${n++}`;
      used.add(slug);
      const [a, b] = AV_COLORS[hash(slug) % AV_COLORS.length];
      return { nome: nome.trim(), slug, handle: slug.replace(/-/g, "."), numero: i + 1, grad: `linear-gradient(135deg, ${a}, ${b})` };
    });
  })();
  const bySlug = (s) => STUDENTS.find((x) => x.slug === s);

  function initials(nome) {
    const p = nome.split(/\s+/).filter((w) => /^\p{L}/u.test(w));
    if (!p.length) return "?";
    return p.length === 1 ? p[0].slice(0, 2).toUpperCase() : (p[0][0] + p[1][0]).toUpperCase();
  }

  function av(s, size = "") {
    if (!s) return `<span class="av ${size} ghost"><svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg></span>`;
    return `<span class="av ${size}" style="background:${s.grad}" aria-hidden="true">${esc(initials(s.nome))}</span>`;
  }

  /* ---------- Usuário atual ---------- */
  let me = bySlug(store.get(K.me, "")) || null;
  let afterChoose = null;

  function requireMe(cb) {
    if (me) return cb();
    afterChoose = cb;
    openWho();
  }

  /* ---------- Artes geradas (as "fotos" de exemplo) ---------- */
  const PALETTES = [
    ["#ffb4a2", "#e5989b", "#b5838d", "#6d6875", "#ffcdb2"],
    ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"],
    ["#003049", "#d62828", "#f77f00", "#fcbf49", "#eae2b7"],
    ["#22223b", "#4a4e69", "#9a8c98", "#c9ada7", "#f2e9e4"],
    ["#0b132b", "#1c2541", "#3a506b", "#5bc0be", "#6fffe9"],
    ["#606c38", "#283618", "#dda15e", "#bc6c25", "#fefae0"],
    ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"],
    ["#a8dadc", "#457b9d", "#1d3557", "#e63946", "#f1faee"]
  ];
  const ART_TYPES = 6;
  let artUid = 0;

  function artSVG(type, seed) {
    const r = rng(seed);
    const P = PALETTES[Math.floor(r() * PALETTES.length)];
    const id = "g" + (++artUid);
    const pick = (n = 5) => P[Math.floor(r() * n)];
    let s = "";

    if (type === 0) { // pôr do sol
      s += `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P[4]}"/><stop offset="1" stop-color="${P[2]}"/></linearGradient></defs>`;
      s += `<rect width="400" height="400" fill="url(#${id})"/>`;
      s += `<circle cx="${(90 + r() * 220).toFixed(0)}" cy="${(130 + r() * 80).toFixed(0)}" r="${(50 + r() * 30).toFixed(0)}" fill="${P[3]}" opacity=".95"/>`;
      for (let k = 0; k < 3; k++) {
        const base = 250 + k * 45;
        let pts = `0,400 0,${base}`;
        for (let x = 0; x <= 400; x += 50) pts += ` ${x},${(base - r() * 80).toFixed(0)}`;
        pts += " 400,400";
        s += `<polygon points="${pts}" fill="${P[k % 3 === 0 ? 0 : k % 3 === 1 ? 1 : 0]}" opacity="${(0.55 + k * 0.2).toFixed(2)}"/>`;
      }
    } else if (type === 1) { // ondas
      s += `<rect width="400" height="400" fill="${P[4]}"/>`;
      for (let k = 0; k < 7; k++) {
        const y = 60 + k * 50, amp = 10 + r() * 25, ph = r() * 6.28, f = 0.01 + r() * 0.02;
        let d = `M0 ${y}`;
        for (let x = 0; x <= 400; x += 10) d += ` L${x} ${(y + Math.sin(x * f + ph) * amp).toFixed(1)}`;
        d += " L400 400 L0 400Z";
        s += `<path d="${d}" fill="${P[k % 4]}" opacity=".92"/>`;
      }
    } else if (type === 2) { // bolhas
      s += `<rect width="400" height="400" fill="${P[4]}"/>`;
      for (let k = 0; k < 7; k++) {
        s += `<circle cx="${(r() * 400).toFixed(0)}" cy="${(r() * 400).toFixed(0)}" r="${(50 + r() * 120).toFixed(0)}" fill="${P[k % 4]}" opacity=".8"/>`;
      }
    } else if (type === 3) { // geometria
      for (let gx = 0; gx < 4; gx++) for (let gy = 0; gy < 4; gy++) {
        const x = gx * 100, y = gy * 100, bg = pick(), fg = pick(), t = Math.floor(r() * 4);
        s += `<rect x="${x}" y="${y}" width="100" height="100" fill="${bg}"/>`;
        if (t === 0) s += `<circle cx="${x + 50}" cy="${y + 50}" r="38" fill="${fg}"/>`;
        else if (t === 1) s += `<path d="M${x} ${y} H${x + 100} A100 100 0 0 1 ${x} ${y + 100} Z" fill="${fg}"/>`;
        else if (t === 2) s += `<path d="M${x} ${y + 100} A50 50 0 0 1 ${x + 100} ${y + 100} Z" fill="${fg}"/>`;
        else s += `<path d="M${x} ${y + 100} L${x + 50} ${y + 10} L${x + 100} ${y + 100} Z" fill="${fg}"/>`;
      }
    } else if (type === 4) { // listras
      s += `<rect width="400" height="400" fill="${P[4]}"/><g transform="rotate(${(r() * 90 - 45).toFixed(0)} 200 200)">`;
      for (let x = -300, k = 0; x < 700; x += 44, k++) s += `<rect x="${x}" y="-300" width="22" height="1000" fill="${P[k % 4]}"/>`;
      s += `</g><circle cx="200" cy="200" r="${(70 + r() * 40).toFixed(0)}" fill="${P[4]}" stroke="${P[0]}" stroke-width="10"/>`;
    } else { // noite
      s += `<rect width="400" height="400" fill="#141a3a"/>`;
      for (let k = 0; k < 70; k++) s += `<circle cx="${(r() * 400).toFixed(0)}" cy="${(r() * 260).toFixed(0)}" r="${(0.6 + r() * 1.8).toFixed(1)}" fill="#fff" opacity="${(0.4 + r() * 0.6).toFixed(2)}"/>`;
      const mx = 80 + r() * 240, my = 80 + r() * 60;
      s += `<circle cx="${mx.toFixed(0)}" cy="${my.toFixed(0)}" r="42" fill="#f6f1d5"/><circle cx="${(mx + 18).toFixed(0)}" cy="${(my - 10).toFixed(0)}" r="38" fill="#141a3a"/>`;
      let pts = "0,400 0,300";
      for (let x = 0; x <= 400; x += 40) pts += ` ${x},${(290 - r() * 50).toFixed(0)}`;
      s += `<polygon points="${pts} 400,400" fill="${P[1]}"/>`;
      pts = "0,400 0,340";
      for (let x = 0; x <= 400; x += 40) pts += ` ${x},${(340 - r() * 30).toFixed(0)}`;
      s += `<polygon points="${pts} 400,400" fill="${P[2]}"/>`;
    }
    return `<svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Arte">${s}</svg>`;
  }

  const CAPTIONS = [
    ["Fim de tarde 🌅", "O céu de hoje em formas", "Pôr do sol em cores"],
    ["Ondas 🌊", "Mar de cores", "Dia de praia na imaginação"],
    ["Bolhas de cor 🫧", "Paleta do dia 🎨", "Experimentando cores"],
    ["Geometria 📐", "Quadrados e círculos", "Arte em grade"],
    ["Listras ✨", "Tudo na diagonal", "Cores em linha"],
    ["Noite estrelada ✨", "Boa noite 🌙", "Céu do interior"]
  ];

  function media(post) {
    if (post.img) return `<img src="${post.img}" alt="Foto de ${esc(bySlug(post.author).nome)}" />`;
    return artSVG(post.art.type, post.art.seed);
  }

  /* ---------- Posts ---------- */
  const NOW = Date.now();
  const HOUR = 3600e3;

  const SEED_POSTS = STUDENTS.flatMap((s) => {
    const h = hash(s.slug);
    return [0, 1, 2].map((k) => {
      const type = (h + k * 2) % ART_TYPES;
      const caps = CAPTIONS[type];
      return {
        id: `s-${s.slug}-${k}`,
        author: s.slug,
        art: { type, seed: hash(s.slug + "#" + k) },
        caption: caps[(h >> (k + 3)) % caps.length],
        ts: NOW - ((k * 72) + (h % 60) + 1) * HOUR
      };
    });
  });

  const localPosts = () => store.get(K.posts, []);
  function allPosts() {
    return [...localPosts(), ...SEED_POSTS].filter((p) => bySlug(p.author)).sort((a, b) => b.ts - a.ts);
  }
  const findPost = (id) => allPosts().find((p) => p.id === id);
  const postsOf = (slug) => allPosts().filter((p) => p.author === slug);

  /* ---------- Curtidas, comentários, seguir ---------- */
  const likesOf = (id) => store.get(K.likes, {})[id] || [];
  const commentsOf = (id) => store.get(K.comments, {})[id] || [];
  const follows = () => store.get(K.follows, {});
  const isFollowing = (a, b) => (follows()[a] || []).includes(b);
  const followersCount = (slug) => Object.values(follows()).filter((arr) => arr.includes(slug)).length;
  const followingCount = (slug) => (follows()[slug] || []).length;

  function setLike(id, on) {
    const all = store.get(K.likes, {});
    const arr = new Set(all[id] || []);
    on ? arr.add(me.slug) : arr.delete(me.slug);
    all[id] = [...arr];
    store.set(K.likes, all);
  }

  function likesText(id) {
    const arr = likesOf(id);
    const n = arr.length;
    if (!n) return `<span class="muted" style="font-weight:400">Seja o primeiro a curtir</span>`;
    if (me && arr.includes(me.slug)) return n === 1 ? "Curtido por você" : `Curtido por você e mais ${n - 1}`;
    return `${n} ${n === 1 ? "curtida" : "curtidas"}`;
  }

  /* ---------- Ícones ---------- */
  const IC = {
    heart: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 20.5s-7.5-4.6-9.2-9.3C1.6 7.8 3.8 4.5 7.2 4.5c2 0 3.5 1.1 4.8 2.8 1.3-1.7 2.8-2.8 4.8-2.8 3.4 0 5.6 3.3 4.4 6.7-1.7 4.7-9.2 9.3-9.2 9.3z"/></svg>`,
    heartFill: `<svg viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.6-9.2-9.3C1.6 7.8 3.8 4.5 7.2 4.5c2 0 3.5 1.1 4.8 2.8 1.3-1.7 2.8-2.8 4.8-2.8 3.4 0 5.6 3.3 4.4 6.7-1.7 4.7-9.2 9.3-9.2 9.3z"/></svg>`,
    comment: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.6-4.3A8.5 8.5 0 1 1 20.5 11.5z"/></svg>`,
    share: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M21 3 10 14M21 3l-7 18-4-7-7-4z"/></svg>`,
    trash: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>`,
    grid: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="3" y="3" width="18" height="18"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>`,
    back: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="m15 6-6 6 6 6"/></svg>`,
    x: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>`
  };

  /* ---------- Post ---------- */
  function commentsHTML(post, full) {
    const list = commentsOf(post.id);
    const shown = full ? list : list.slice(-2);
    let html = "";
    if (!full && list.length > 2) html += `<a class="view-all" href="#p-${post.id}">Ver todos os ${list.length} comentários</a>`;
    html += shown.map((c) => {
      const a = bySlug(c.author);
      const mine = me && c.author === me.slug;
      return `<div class="comment-row"><b>${a ? `<a href="#perfil-${a.slug}">${esc(a.handle)}</a>` : "aluno"}</b><span>${esc(c.text)}</span>${mine ? `<button class="del" type="button" data-del-comment="${post.id}" data-cid="${c.id}">apagar</button>` : ""}</div>`;
    }).join("");
    return html;
  }

  function postHTML(post, full = false) {
    const a = bySlug(post.author);
    const liked = me && likesOf(post.id).includes(me.slug);
    const mine = me && post.author === me.slug && post.id.startsWith("u-");
    return `
      <article class="post" data-post="${post.id}" data-full="${full ? 1 : 0}">
        <header class="post-head">
          <a href="#perfil-${a.slug}">${av(a)}</a>
          <div class="who">
            <a href="#perfil-${a.slug}">${esc(a.handle)}</a>
            <span class="time">${esc(a.nome)} · ${ago(post.ts)}</span>
          </div>
          ${mine ? `<button class="icon-btn menu" type="button" data-delete="${post.id}" aria-label="Excluir post">${IC.trash}</button>` : ""}
        </header>
        <div class="media" data-media="${post.id}">
          ${media(post)}
          <div class="heart-burst">${IC.heartFill}</div>
        </div>
        <div class="actions">
          <button class="icon-btn like-btn ${liked ? "on" : ""}" type="button" data-like="${post.id}" aria-label="Curtir" aria-pressed="${!!liked}">${IC.heart}</button>
          <a class="icon-btn" href="#p-${post.id}" aria-label="Comentar">${IC.comment}</a>
          <button class="icon-btn" type="button" data-share="${post.id}" aria-label="Copiar link">${IC.share}</button>
        </div>
        <div class="likes-line">${likesText(post.id)}</div>
        ${post.caption ? `<div class="caption"><b><a href="#perfil-${a.slug}">${esc(a.handle)}</a></b>${esc(post.caption)}</div>` : ""}
        <div class="comments-preview">${commentsHTML(post, full)}</div>
        <form class="add-comment" data-comment="${post.id}">
          <input maxlength="300" placeholder="Adicione um comentário…" aria-label="Adicione um comentário" />
          <button type="submit" disabled>Publicar</button>
        </form>
      </article>`;
  }

  function refreshPost(id) {
    const post = findPost(id);
    $$(`[data-post="${id}"]`).forEach((el) => {
      const full = el.dataset.full === "1";
      const liked = me && likesOf(id).includes(me.slug);
      const btn = $(".like-btn", el);
      btn.classList.toggle("on", !!liked);
      btn.setAttribute("aria-pressed", String(!!liked));
      $(".likes-line", el).innerHTML = likesText(id);
      $(".comments-preview", el).innerHTML = commentsHTML(post, full);
    });
  }

  /* ---------- Stories (barra) ---------- */
  function storyOrder() {
    const list = STUDENTS.filter((s) => postsOf(s.slug).length);
    if (me) {
      const i = list.findIndex((s) => s.slug === me.slug);
      if (i > 0) list.unshift(list.splice(i, 1)[0]);
    }
    return list;
  }

  function storiesBarHTML() {
    const seen = new Set(store.get(K.seen, []));
    return `<div class="stories" aria-label="Stories">${storyOrder().map((s, i) => `
      <button class="story-item" type="button" data-story="${i}" aria-label="Ver story de ${esc(s.nome)}">
        <span class="ring ${seen.has(s.slug) ? "seen" : ""}">${av(s, "s56")}</span>
        <span class="name">${me && s.slug === me.slug ? "Seu story" : esc(s.handle)}</span>
      </button>`).join("")}</div>`;
  }

  /* ---------- Página inicial ---------- */
  const PAGE = 8;
  let feedShown = PAGE;
  let feedObserver = null;

  function renderHome() {
    feedShown = PAGE;
    const suggestions = STUDENTS
      .filter((s) => (!me || (s.slug !== me.slug && !isFollowing(me.slug, s.slug))))
      .sort((a, b) => hash(a.slug + new Date().toDateString()) - hash(b.slug + new Date().toDateString()))
      .slice(0, 6);

    app.innerHTML = `
      <div class="home">
        <div class="col">
          ${storiesBarHTML()}
          <div id="feed"></div>
          <div class="load-more" id="load-more"></div>
        </div>
        <aside class="side">
          <div class="me-card">
            ${me ? `<a href="#perfil-${me.slug}">${av(me, "s56")}</a>` : av(null, "s56")}
            <div class="info">
              ${me ? `<b><a href="#perfil-${me.slug}">${esc(me.handle)}</a></b><span class="muted">${esc(me.nome)}</span>` : `<b>Você não escolheu seu perfil</b><span class="muted">Escolha para curtir e comentar</span>`}
            </div>
            <button class="link-btn" type="button" data-open-who>${me ? "Trocar" : "Escolher"}</button>
          </div>
          <h4><span>Colegas da turma</span><a href="#buscar" class="link-btn" style="color:var(--text)">Ver todos</a></h4>
          ${suggestions.map((s) => userRowHTML(s, true)).join("")}
          <p class="side-foot">Fototurma · ${STUDENTS.length} alunos · feito com HTML, CSS e JavaScript</p>
        </aside>
      </div>`;

    renderFeed();
  }

  function renderFeed() {
    const posts = allPosts();
    const feed = $("#feed");
    if (!feed) return;
    feed.innerHTML = posts.slice(0, feedShown).map((p) => postHTML(p)).join("");
    const more = $("#load-more");
    if (feedShown < posts.length) {
      more.innerHTML = `<button class="btn" type="button" data-more>Carregar mais</button>`;
      if (feedObserver) feedObserver.disconnect();
      if ("IntersectionObserver" in window) {
        feedObserver = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) loadMore();
        }, { rootMargin: "600px" });
        feedObserver.observe(more);
      }
    } else {
      more.innerHTML = `<p class="muted">Você viu todas as ${posts.length} publicações 🎉</p>`;
      if (feedObserver) feedObserver.disconnect();
    }
  }

  function loadMore() {
    const feed = $("#feed");
    if (!feed) return;
    const posts = allPosts();
    const next = posts.slice(feedShown, feedShown + PAGE);
    if (!next.length) return;
    feed.insertAdjacentHTML("beforeend", next.map((p) => postHTML(p)).join(""));
    feedShown += next.length;
    if (feedShown >= posts.length) {
      $("#load-more").innerHTML = `<p class="muted">Você viu todas as ${posts.length} publicações 🎉</p>`;
      if (feedObserver) feedObserver.disconnect();
    }
  }

  function userRowHTML(s, withFollow) {
    const followBtn = withFollow && (!me || s.slug !== me.slug)
      ? `<button class="link-btn" type="button" data-follow="${s.slug}">${me && isFollowing(me.slug, s.slug) ? `<span class="muted">Seguindo</span>` : "Seguir"}</button>`
      : "";
    return `
      <div class="user-row">
        <a href="#perfil-${s.slug}">${av(s, "s44")}</a>
        <a class="info" href="#perfil-${s.slug}"><b>${esc(s.handle)}</b><span>${esc(s.nome)}</span></a>
        ${followBtn}
      </div>`;
  }

  /* ---------- Buscar ---------- */
  function renderSearch(q = "") {
    app.innerHTML = `
      <div class="narrow">
        <label class="search-big">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          <input id="search" type="search" placeholder="Pesquisar aluno" aria-label="Pesquisar aluno" value="${esc(q)}" />
        </label>
        <div class="list-card" id="results"></div>
      </div>`;
    const input = $("#search");
    const draw = () => {
      const t = plain(input.value.trim());
      const list = STUDENTS.filter((s) => !t || plain(s.nome).includes(t) || s.handle.includes(t));
      $("#results").innerHTML = list.length ? list.map((s) => userRowHTML(s, true)).join("") : `<p class="empty">Nenhum aluno encontrado.</p>`;
    };
    input.addEventListener("input", draw);
    draw();
    if (q) input.focus();
  }

  /* ---------- Perfil ---------- */
  function renderProfile(slug) {
    const s = bySlug(slug);
    if (!s) return renderNotFound();
    const posts = postsOf(slug);
    const isMe = me && me.slug === slug;
    const following = me && isFollowing(me.slug, slug);
    const likeCount = (id) => likesOf(id).length;
    const comCount = (id) => commentsOf(id).length;

    app.innerHTML = `
      <section class="profile-head">
        <div class="pic">${av(s, "s150")}</div>
        <div>
          <div class="row1">
            <h2>${esc(s.handle)}</h2>
            ${isMe
              ? `<a class="btn small" href="#novo">Novo post</a><button class="btn small" type="button" data-open-who>Trocar perfil</button>`
              : `<button class="btn small ${following ? "" : "primary"}" type="button" data-follow="${s.slug}">${following ? "Seguindo" : "Seguir"}</button>`}
          </div>
          <div class="pstats">
            <span><b>${posts.length}</b> ${posts.length === 1 ? "publicação" : "publicações"}</span>
            <span><b>${followersCount(slug)}</b> ${followersCount(slug) === 1 ? "seguidor" : "seguidores"}</span>
            <span><b>${followingCount(slug)}</b> seguindo</span>
          </div>
          <div class="pname">${esc(s.nome)}</div>
          <div class="muted">Aluno nº ${s.numero} da turma</div>
        </div>
      </section>
      <div class="ptabs"><span>${IC.grid} Publicações</span></div>
      ${posts.length ? `<div class="pgrid">${posts.map((p) => `
        <a class="tile" href="#p-${p.id}" aria-label="Abrir publicação">
          ${media(p)}
          <span class="ov"><span>♥ ${likeCount(p.id)}</span><span>💬 ${comCount(p.id)}</span></span>
        </a>`).join("")}</div>` : `<p class="empty">Ainda não há publicações.</p>`}`;
  }

  /* ---------- Post sozinho ---------- */
  function renderPostPage(id) {
    const post = findPost(id);
    if (!post) return renderNotFound();
    app.innerHTML = `
      <div style="max-width:470px;margin:0 auto">
        <a class="back" href="#perfil-${post.author}">${IC.back} Perfil de ${esc(bySlug(post.author).nome)}</a>
        ${postHTML(post, true)}
      </div>`;
  }

  /* ---------- Novo post ---------- */
  function renderCreate() {
    if (!me) {
      app.innerHTML = `
        <div class="narrow" style="text-align:center;padding-top:60px">
          ${av(null, "s150")}
          <h2>Quem vai publicar?</h2>
          <p class="muted">Escolha seu nome na lista da turma para criar uma publicação.</p>
          <button class="btn primary" type="button" data-open-who>Escolher meu nome</button>
        </div>`;
      return;
    }

    let draft = { img: null, art: { type: Math.floor(Math.random() * ART_TYPES), seed: Math.floor(Math.random() * 1e9) } };

    app.innerHTML = `
      <div style="max-width:860px;margin:0 auto">
        <div class="create">
          <div class="create-head">Criar nova publicação</div>
          <div class="create-body">
            <div class="media" id="draft-media"></div>
            <div class="create-side">
              <div class="user-row" style="padding:0">${av(me, "s44")}<div class="info"><b>${esc(me.handle)}</b><span>${esc(me.nome)}</span></div></div>
              <div class="create-btns">
                <label class="btn" for="file">📷 Escolher foto</label>
                <input class="file-input" id="file" type="file" accept="image/*" />
                <button class="btn" type="button" id="new-art">🎨 Gerar arte</button>
              </div>
              <textarea id="caption" maxlength="500" placeholder="Escreva uma legenda…" aria-label="Legenda"></textarea>
              <p class="error" id="err"></p>
              <button class="btn primary" type="button" id="publish">Compartilhar</button>
              <p class="muted" style="font-size:12px;margin:0">As publicações ficam salvas apenas neste navegador.</p>
            </div>
          </div>
        </div>
      </div>`;

    const draw = () => {
      $("#draft-media").innerHTML = draft.img ? `<img src="${draft.img}" alt="Foto escolhida" />` : artSVG(draft.art.type, draft.art.seed);
    };
    draw();

    $("#new-art").addEventListener("click", () => {
      draft = { img: null, art: { type: Math.floor(Math.random() * ART_TYPES), seed: Math.floor(Math.random() * 1e9) } };
      draw();
    });

    $("#file").addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      $("#err").textContent = "";
      squareImage(file, 900)
        .then((url) => { draft = { img: url, art: null }; draw(); })
        .catch(() => { $("#err").textContent = "Não foi possível abrir essa imagem."; });
    });

    $("#publish").addEventListener("click", () => {
      const post = {
        id: "u-" + Date.now(),
        author: me.slug,
        caption: $("#caption").value.trim(),
        ts: Date.now(),
        ...(draft.img ? { img: draft.img } : { art: draft.art })
      };
      const posts = localPosts();
      posts.push(post);
      if (!store.set(K.posts, posts)) {
        $("#err").textContent = "Não coube no armazenamento deste navegador. Tente uma foto menor ou apague publicações antigas.";
        return;
      }
      toast("Publicação compartilhada!");
      location.hash = `#perfil-${me.slug}`;
    });
  }

  function squareImage(file, size) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        const img = new Image();
        img.onerror = reject;
        img.onload = () => {
          const side = Math.min(img.width, img.height);
          const sx = (img.width - side) / 2, sy = (img.height - side) / 2;
          const out = Math.min(size, side);
          const c = document.createElement("canvas");
          c.width = c.height = out;
          c.getContext("2d").drawImage(img, sx, sy, side, side, 0, 0, out, out);
          resolve(c.toDataURL("image/jpeg", 0.8));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function renderNotFound() {
    app.innerHTML = `<div class="empty"><h2 style="color:var(--text)">Página não encontrada</h2><p>Este link não existe ou a publicação foi removida.</p><a class="btn primary" href="#inicio">Voltar ao início</a></div>`;
  }

  /* ---------- "Quem é você?" ---------- */
  function openWho() {
    const ov = $("#who");
    ov.classList.add("open");
    const input = $("#who-search");
    input.value = "";
    drawWho();
    setTimeout(() => input.focus(), 30);
  }
  function closeWho() {
    $("#who").classList.remove("open");
    afterChoose = null;
  }
  function drawWho() {
    const t = plain($("#who-search").value.trim());
    const list = STUDENTS.filter((s) => !t || plain(s.nome).includes(t));
    $("#who-list").innerHTML = list.map((s) => `
      <button class="user-row" type="button" data-choose="${s.slug}">
        ${av(s, "s44")}
        <span class="info"><b>${esc(s.nome)}</b><span>@${esc(s.handle)}</span></span>
        ${me && me.slug === s.slug ? `<span class="link-btn">atual</span>` : ""}
      </button>`).join("") || `<p class="empty">Nenhum nome encontrado.</p>`;
  }
  $("#who-search").addEventListener("input", drawWho);
  $("#who").addEventListener("click", (e) => {
    if (e.target === e.currentTarget || e.target.closest("[data-close-who]")) return closeWho();
    const b = e.target.closest("[data-choose]");
    if (!b) return;
    me = bySlug(b.dataset.choose);
    store.set(K.me, me.slug);
    const cb = afterChoose;
    afterChoose = null;
    $("#who").classList.remove("open");
    drawMeButtons();
    toast(`Olá, ${me.nome.split(" ")[0]}!`);
    if (cb) cb(); else router();
  });

  function drawMeButtons() {
    const html = me ? av(me, "s24") : av(null, "s24");
    $("#top-me").innerHTML = html;
    $("#bottom-me").innerHTML = html;
  }
  const goMe = () => (me ? (location.hash = `#perfil-${me.slug}`) : openWho());
  $("#top-me").addEventListener("click", goMe);
  $("#bottom-me").addEventListener("click", goMe);

  /* ---------- Visualizador de stories ---------- */
  const STORY_MS = 4500;
  const story = { list: [], si: 0, pi: 0, start: 0, raf: 0 };

  function storyPosts(s) {
    return postsOf(s.slug).slice(0, 3).reverse();
  }

  function openStory(i) {
    story.list = storyOrder();
    story.si = i;
    story.pi = 0;
    $("#story").classList.add("open");
    document.body.style.overflow = "hidden";
    showStory();
  }

  function closeStory() {
    cancelAnimationFrame(story.raf);
    $("#story").classList.remove("open");
    document.body.style.overflow = "";
    const bar = $(".stories");
    if (bar) bar.outerHTML = storiesBarHTML();
  }

  function showStory() {
    const s = story.list[story.si];
    if (!s) return closeStory();
    const posts = storyPosts(s);
    const p = posts[story.pi];
    const seen = new Set(store.get(K.seen, []));
    seen.add(s.slug);
    store.set(K.seen, [...seen]);

    $("#story-frame").innerHTML = `
      <div class="story-bars">${posts.map((_, k) => `<div><i style="width:${k < story.pi ? 100 : 0}%"></i></div>`).join("")}</div>
      <div class="story-top">
        ${av(s, "s32")}
        <a href="#perfil-${s.slug}" data-story-close><b>${esc(s.handle)}</b></a>
        <span class="t">${ago(p.ts)}</span>
        <button class="x" type="button" data-story-close aria-label="Fechar">${IC.x}</button>
      </div>
      <div class="media">${media(p)}</div>
      ${p.caption ? `<div class="story-cap">${esc(p.caption)}</div>` : ""}
      <button class="story-tap l" type="button" data-story-nav="-1" aria-label="Anterior"></button>
      <button class="story-tap r" type="button" data-story-nav="1" aria-label="Próximo"></button>`;

    cancelAnimationFrame(story.raf);
    story.start = performance.now();
    const bar = $$(".story-bars i")[story.pi];
    const tick = (t) => {
      const k = Math.min(1, (t - story.start) / STORY_MS);
      if (bar) bar.style.width = (k * 100) + "%";
      if (k >= 1) return storyStep(1);
      story.raf = requestAnimationFrame(tick);
    };
    story.raf = requestAnimationFrame(tick);
  }

  function storyStep(dir) {
    const posts = storyPosts(story.list[story.si]);
    if (dir > 0) {
      if (story.pi < posts.length - 1) story.pi++;
      else { story.si++; story.pi = 0; }
    } else {
      if (story.pi > 0) story.pi--;
      else if (story.si > 0) { story.si--; story.pi = storyPosts(story.list[story.si]).length - 1; }
      else story.pi = 0;
    }
    if (story.si >= story.list.length) return closeStory();
    showStory();
  }

  $("#story").addEventListener("click", (e) => {
    if (e.target.closest("[data-story-close]")) return closeStory();
    const nav = e.target.closest("[data-story-nav]");
    if (nav) return storyStep(Number(nav.dataset.storyNav));
    if (e.target === e.currentTarget) closeStory();
  });

  document.addEventListener("keydown", (e) => {
    if ($("#story").classList.contains("open")) {
      if (e.key === "Escape") closeStory();
      if (e.key === "ArrowRight") storyStep(1);
      if (e.key === "ArrowLeft") storyStep(-1);
    } else if ($("#who").classList.contains("open") && e.key === "Escape") {
      closeWho();
    }
  });

  /* ---------- Ações (delegação de eventos) ---------- */
  let lastTap = { id: null, t: 0 };

  function doLike(id, forceOn) {
    requireMe(() => {
      const liked = likesOf(id).includes(me.slug);
      const on = forceOn ? true : !liked;
      if (on !== liked) setLike(id, on);
      refreshPost(id);
    });
  }

  app.addEventListener("click", (e) => {
    const t = e.target;

    const m = t.closest("[data-media]");
    if (m) {
      const id = m.dataset.media;
      const now = Date.now();
      if (lastTap.id === id && now - lastTap.t < 350) {
        const burst = $(".heart-burst", m);
        burst.classList.remove("go");
        void burst.offsetWidth;
        burst.classList.add("go");
        doLike(id, true);
        lastTap = { id: null, t: 0 };
      } else {
        lastTap = { id, t: now };
      }
      return;
    }

    const like = t.closest("[data-like]");
    if (like) return doLike(like.dataset.like);

    const share = t.closest("[data-share]");
    if (share) {
      const url = location.href.split("#")[0] + "#p-" + share.dataset.share;
      navigator.clipboard.writeText(url).then(() => toast("Link copiado!"), () => toast("Não foi possível copiar o link."));
      return;
    }

    const storyBtn = t.closest("[data-story]");
    if (storyBtn) return openStory(Number(storyBtn.dataset.story));

    const follow = t.closest("[data-follow]");
    if (follow) {
      const target = follow.dataset.follow;
      return requireMe(() => {
        if (target === me.slug) return;
        const all = follows();
        const set = new Set(all[me.slug] || []);
        set.has(target) ? set.delete(target) : set.add(target);
        all[me.slug] = [...set];
        store.set(K.follows, all);
        router(true);
      });
    }

    if (t.closest("[data-open-who]")) return openWho();
    if (t.closest("[data-more]")) return loadMore();

    const del = t.closest("[data-delete]");
    if (del) {
      if (del.dataset.armed) {
        store.set(K.posts, localPosts().filter((p) => p.id !== del.dataset.delete));
        toast("Publicação excluída.");
        if (location.hash.startsWith("#p-")) location.hash = `#perfil-${me.slug}`;
        else router(true);
      } else {
        del.dataset.armed = "1";
        toast("Toque na lixeira de novo para excluir.");
        setTimeout(() => delete del.dataset.armed, 3000);
      }
      return;
    }

    const dc = t.closest("[data-del-comment]");
    if (dc) {
      const id = dc.dataset.delComment;
      const all = store.get(K.comments, {});
      all[id] = (all[id] || []).filter((c) => String(c.id) !== dc.dataset.cid);
      store.set(K.comments, all);
      refreshPost(id);
    }
  });

  app.addEventListener("input", (e) => {
    const form = e.target.closest("[data-comment]");
    if (form) $("button", form).disabled = !e.target.value.trim();
  });

  app.addEventListener("submit", (e) => {
    const form = e.target.closest("[data-comment]");
    if (!form) return;
    e.preventDefault();
    const input = $("input", form);
    const text = input.value.trim();
    if (!text) return;
    const id = form.dataset.comment;
    requireMe(() => {
      const all = store.get(K.comments, {});
      all[id] = [...(all[id] || []), { id: Date.now(), author: me.slug, text, ts: Date.now() }];
      if (!store.set(K.comments, all)) return toast("Não foi possível salvar o comentário.");
      input.value = "";
      $("button", form).disabled = true;
      refreshPost(id);
    });
  });

  /* ---------- Busca do topo ---------- */
  $("#top-search").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const q = e.target.value;
      e.target.value = "";
      if (location.hash === "#buscar") renderSearch(q);
      else { pendingQuery = q; location.hash = "#buscar"; }
    }
  });
  let pendingQuery = "";

  /* ---------- Rotas ---------- */
  function setNav(name) {
    $$("[data-nav]").forEach((a) => a.classList.toggle("active", a.dataset.nav === name));
  }

  function router(keepScroll) {
    const h = location.hash.replace(/^#/, "") || "inicio";
    const y = window.scrollY;
    if (feedObserver) feedObserver.disconnect();

    if (h.startsWith("perfil-")) { setNav(null); renderProfile(h.slice(7)); }
    else if (h.startsWith("p-")) { setNav(null); renderPostPage(h.slice(2)); }
    else if (h === "buscar") { setNav("buscar"); renderSearch(pendingQuery); pendingQuery = ""; }
    else if (h === "novo") { setNav("novo"); renderCreate(); }
    else if (h === "inicio") { setNav("inicio"); renderHome(); }
    else { setNav(null); renderNotFound(); }

    if (keepScroll === true) window.scrollTo(0, y);
    else { window.scrollTo(0, 0); app.focus({ preventScroll: true }); }
  }

  drawMeButtons();
  window.addEventListener("hashchange", () => router());
  router();
})();