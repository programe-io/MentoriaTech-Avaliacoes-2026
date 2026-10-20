(function () {
  "use strict";

  /* ---------------- Helpers ---------------- */
  const $ = (sel, root = document) => root.querySelector(sel);

  const esc = (str) =>
    String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));

  const ic = (paths, extra = "") =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ` +
    `stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra}>${paths}</svg>`;

  const ICONS = {
    reply: ic('<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>'),
    retweet: ic('<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>'),
    like: ic('<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>'),
    bookmark: ic('<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>'),
    share: ic('<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>'),
    more: ic('<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>'),
    sun: ic('<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>'),
    moon: ic('<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>')
  };

  const VERIFIED =
    '<svg class="verified" viewBox="0 0 24 24" role="img" aria-label="Conta verificada">' +
    '<circle cx="12" cy="12" r="11" fill="#1d9bf0"/>' +
    '<path d="M7 12.4l3.2 3.2L17 9" fill="none" stroke="#fff" stroke-width="2.2" ' +
    'stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const initials = (name) =>
    name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  function colorFor(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 360;
    return `hsl(${h}, 62%, 46%)`;
  }

  function fmt(n) {
    if (n >= 1e6) return (n / 1e6).toFixed(1).replace(".0", "") + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(1).replace(".0", "") + "K";
    return String(n);
  }

  function timeAgo(ts) {
    const s = Math.floor((Date.now() - ts) / 1000);
    if (s < 60) return s + "s";
    const m = Math.floor(s / 60);
    if (m < 60) return m + " min";
    const h = Math.floor(m / 60);
    if (h < 24) return h + " h";
    const d = Math.floor(h / 24);
    if (d < 7) return d + " d";
    return new Date(ts).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
  }

  function formatText(text) {
    let h = esc(text);
    h = h.replace(/(https?:\/\/[^\s<]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    h = h.replace(/(^|[\s(])@([A-Za-z0-9_]{1,15})/g, '$1<a href="#">@$2</a>');
    h = h.replace(/(^|[\s(])#([A-Za-z0-9_À-ÿ]+)/g, '$1<a href="#">#$2</a>');
    return h.replace(/\n/g, "<br>");
  }

  /* ---------------- Dados ---------------- */
  const ME = { name: "Ana Clara", handle: "@anaclara" };
  const MIN = 60 * 1000;

  let tweets = [
    {
      id: "t1",
      name: "Tech Brasil",
      handle: "@techbrasil",
      verified: true,
      ts: Date.now() - 3 * MIN,
      text: "Acabei de testar o novo recurso de #acessibilidade e ficou incrível! 🚀\nO futuro chegou — e ele é inclusivo.",
      replies: 42, retweets: 128, likes: 1843,
      following: true,
      media: { bg: "linear-gradient(135deg,#1d9bf0,#7c3aed 55%,#f91880)", emoji: "🚀" }
    },
    {
      id: "t2",
      name: "Marina Duarte",
      handle: "@marinad",
      verified: false,
      ts: Date.now() - 18 * MIN,
      text: "Alguém mais acha que segunda-feira deveria ser opcional? ☕",
      replies: 87, retweets: 214, likes: 3412,
      following: true
    },
    {
      id: "t3",
      name: "Dev Jr",
      handle: "@devjunior",
      verified: false,
      ts: Date.now() - 47 * MIN,
      text: "Dica rápida: use console.table() em vez de console.log() para arrays de objetos. Você vai me agradecer depois. 😉\n\n#JavaScript #DevTips",
      replies: 15, retweets: 96, likes: 742,
      following: true
    },
    {
      id: "t4",
      name: "Lucas Ferreira",
      handle: "@lucasf",
      verified: false,
      ts: Date.now() - 2 * 60 * MIN,
      text: "Pôr do sol de hoje no Rio. Sem filtro. 🌅",
      replies: 23, retweets: 61, likes: 1290,
      following: false,
      media: { bg: "linear-gradient(180deg,#ff7b00,#ff2e63 60%,#3a0ca3)", emoji: "🌅" }
    },
    {
      id: "t5",
      name: "Notícias 24h",
      handle: "@noticias24h",
      verified: true,
      ts: Date.now() - 5 * 60 * MIN,
      text: "Nova atualização de segurança liberada para todos os usuários. Recomendamos atualizar seus aplicativos ainda hoje.",
      replies: 310, retweets: 1204, likes: 5620,
      following: false
    },
    {
      id: "t6",
      name: "Café & Código",
      handle: "@cafeecodigo",
      verified: false,
      ts: Date.now() - 22 * 60 * MIN,
      text: "Bom dia! Qual stack vocês estão usando hoje? 👇",
      replies: 452, retweets: 88, likes: 2104,
      following: true
    }
  ].map((t) => Object.assign(
    { liked: false, retweeted: false, bookmarked: false, media: null },
    t
  ));

  /* ---------------- Render ---------------- */
  const tweetsEl = $("#tweets");
  let currentFilter = "for-you";

  function tweetHTML(t) {
    const num = (v) => (v > 0 ? `<span>${fmt(v)}</span>` : "<span></span>");
    return `
      <article class="tweet" data-id="${t.id}">
        <div class="avatar" style="background:${colorFor(t.name)}">${esc(initials(t.name))}</div>
        <div class="tweet-body">
          <div class="tweet-head">
            <span class="t-name">${esc(t.name)}</span>
            ${t.verified ? VERIFIED : ""}
            <span class="t-handle">${esc(t.handle)}</span>
            <span class="t-dot">·</span>
            <time class="t-time" datetime="${new Date(t.ts).toISOString()}"
                  title="${new Date(t.ts).toLocaleString("pt-BR")}">${timeAgo(t.ts)}</time>
            <button class="more-btn" type="button" data-action="more" aria-label="Mais opções">
              ${ICONS.more}
            </button>
          </div>
          <p class="tweet-text">${formatText(t.text)}</p>
          ${t.media ? `<div class="tweet-media" style="background:${t.media.bg}"><span>${t.media.emoji}</span></div>` : ""}
          <div class="tweet-actions">
            <button class="action reply" type="button" data-action="reply" aria-label="Responder">
              ${ICONS.reply}${num(t.replies)}
            </button>
            <button class="action retweet${t.retweeted ? " active" : ""}" type="button"
                    data-action="retweet" aria-label="Repostar">
              ${ICONS.retweet}${num(t.retweets)}
            </button>
            <button class="action like${t.liked ? " active" : ""}" type="button"
                    data-action="like" aria-label="Curtir">
              ${ICONS.like}${num(t.likes)}
            </button>
            <button class="action bookmark${t.bookmarked ? " active" : ""}" type="button"
                    data-action="bookmark" aria-label="Salvar">
              ${ICONS.bookmark}
            </button>
            <button class="action share" type="button" data-action="share" aria-label="Compartilhar">
              ${ICONS.share}
            </button>
          </div>
        </div>
      </article>`;
  }

  function render() {
    const list = currentFilter === "following"
      ? tweets.filter((t) => t.following)
      : tweets;

    tweetsEl.innerHTML = list.length
      ? list.map(tweetHTML).join("")
      : '<p class="empty">Nada por aqui ainda. Siga mais pessoas para ver seus posts!</p>';
  }

  /* ---------------- Interações do feed ---------------- */
  function bump(el) {
    el.classList.remove("pop");
    void el.offsetWidth;
    el.classList.add("pop");
  }

  tweetsEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    const article = btn.closest(".tweet");
    if (!article) return;

    const t = tweets.find((x) => x.id === article.dataset.id);
    if (!t) return;

    const action = btn.dataset.action;
    const counterEl = btn.querySelector("span");

    switch (action) {
      case "like":
        t.liked = !t.liked;
        t.likes += t.liked ? 1 : -1;
        btn.classList.toggle("active", t.liked);
        btn.setAttribute("aria-pressed", String(t.liked));
        if (counterEl) counterEl.textContent = fmt(t.likes);
        bump(btn);
        break;

      case "retweet":
        t.retweeted = !t.retweeted;
        t.retweets += t.retweeted ? 1 : -1;
        btn.classList.toggle("active", t.retweeted);
        btn.setAttribute("aria-pressed", String(t.retweeted));
        if (counterEl) counterEl.textContent = fmt(t.retweets);
        bump(btn);
        break;

      case "bookmark":
        t.bookmarked = !t.bookmarked;
        btn.classList.toggle("active", t.bookmarked);
        btn.setAttribute("aria-pressed", String(t.bookmarked));
        bump(btn);
        toast(t.bookmarked ? "Post salvo" : "Removido dos salvos");
        break;

      case "reply": {
        const ta = $("#composerText");
        if (!ta.value.trim()) ta.value = t.handle + " ";
        ta.focus();
        ta.setSelectionRange(ta.value.length, ta.value.length);
        updateComposer();
        $("#composer").scrollIntoView({ behavior: "smooth", block: "center" });
        toast("Respondendo a " + t.handle);
        break;
      }

      case "share": {
        const url = `https://chirp.app/${t.handle.slice(1)}/status/${t.id}`;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).catch(() => {});
        }
        toast("Link copiado para a área de transferência");
        break;
      }

      case "more":
        toast("Mais opções em breve");
        break;
    }
  });

  /* ---------------- Composer ---------------- */
  const ta = $("#composerText");
  const counter = $("#counter");
  const postBtn = $("#postBtn");
  const MAX = 280;

  function updateComposer() {
    const len = ta.value.length;
    counter.textContent = len + "/" + MAX;
    counter.classList.toggle("warn", len > 240 && len <= MAX);
    counter.classList.toggle("danger", len > MAX);
    postBtn.disabled = len === 0 || len > MAX;

    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 300) + "px";
  }

  function postTweet() {
    const text = ta.value.trim();
    if (!text || text.length > MAX) return;

    tweets.unshift({
      id: "u" + Date.now(),
      name: ME.name,
      handle: ME.handle,
      verified: false,
      ts: Date.now(),
      text: text,
      replies: 0,
      retweets: 0,
      likes: 0,
      following: true,
      liked: false,
      retweeted: false,
      bookmarked: false,
      media: null
    });

    ta.value = "";
    updateComposer();
    ta.style.height = "auto";

    if (currentFilter !== "for-you") {
      currentFilter = "for-you";
      document.querySelectorAll(".feed-tab").forEach((b) => {
        b.classList.toggle("active", b.dataset.filter === "for-you");
      });
    }

    render();
    toast("Post publicado!");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  ta.addEventListener("input", updateComposer);
  ta.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      postTweet();
    }
  });
  postBtn.addEventListener("click", postTweet);

  $("#sidePost").addEventListener("click", () => {
    ta.focus();
    $("#composer").scrollIntoView({ behavior: "smooth", block: "center" });
  });

  /* ---------------- Abas do feed ---------------- */
  document.querySelectorAll(".feed-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      if (tab.classList.contains("active")) return;
      document.querySelectorAll(".feed-tab").forEach((b) => b.classList.remove("active"));
      tab.classList.add("active");
      currentFilter = tab.dataset.filter;
      render();
    });
  });

  /* ---------------- Quem seguir ---------------- */
  document.querySelectorAll(".btn-follow").forEach((btn) => {
    btn.addEventListener("click", () => {
      const following = btn.classList.toggle("following");
      btn.textContent = following ? "Seguindo" : "Seguir";
      toast(following ? "Você agora segue este perfil" : "Deixou de seguir");
    });
  });

  /* ---------------- Tema ---------------- */
  const root = document.documentElement;
  const themeIcon = $("#themeIcon");

  function applyTheme(theme) {
    root.dataset.theme = theme;
    themeIcon.innerHTML = theme === "dark" ? ICONS.sun : ICONS.moon;
    try { localStorage.setItem("chirp-theme", theme); } catch (e) {}
  }

  let savedTheme = "dark";
  try { savedTheme = localStorage.getItem("chirp-theme") || "dark"; } catch (e) {}
  applyTheme(savedTheme);

  $("#themeToggle").addEventListener("click", () => {
    applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });

  /* ---------------- Toast ---------------- */
  let toastTimer = null;
  const toastEl = $("#toast");

  function toast(message) {
    toastEl.textContent = message;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
  }

  /* ---------------- Avatares fixos ---------------- */
  document.querySelectorAll(".avatar[data-color]").forEach((el) => {
    el.style.background = el.dataset.color;
  });

  const meAvatars = [$("#meAvatar"), $("#composerAvatar")];
  meAvatars.forEach((el) => {
    el.textContent = initials(ME.name);
    el.style.background = colorFor(ME.name);
  });

  /* ---------------- Atualiza os tempos ---------------- */
  setInterval(() => {
    document.querySelectorAll(".tweet").forEach((art) => {
      const t = tweets.find((x) => x.id === art.dataset.id);
      const timeEl = art.querySelector(".t-time");
      if (t && timeEl) timeEl.textContent = timeAgo(t.ts);
    });
  }, 60000);

  /* ---------------- Start ---------------- */
  updateComposer();
  render();
})();