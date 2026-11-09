(function () {
  "use strict";

  /* ---------- Dados base ---------- */
  var ME = {
    name: "Pedro Emanoell Rodrigues Soares",
    handle: "@pedroemanoell",
    avatar: "https://ui-avatars.com/api/?name=Pedro+Soares&size=96&background=3b6fd8&color=ffffff&bold=true"
  };

  var AVATARS = {
    "Marina Lopes": "https://ui-avatars.com/api/?name=Marina+Lopes&size=96&background=5b7f6a&color=ffffff&bold=true",
    "Lucas Prado": "https://ui-avatars.com/api/?name=Lucas+Prado&size=96&background=8a5a44&color=ffffff&bold=true",
    "Ana Beatriz": "https://ui-avatars.com/api/?name=Ana+Beatriz&size=96&background=6a5a8a&color=ffffff&bold=true"
  };

  var MIN = 60 * 1000;
  var STORAGE_KEY = "mini-feed-pedro-v1";

  function seedPosts() {
    var now = Date.now();
    return [
      {
        id: "p1",
        text: "Joguei Hollow Knight hoje e foi muito legal! 🎮\nExplorar Hallownest sem pressa, enfrentar chefes e descobrir cada cantinho do mapa vale cada minuto. Já quero voltar amanhã.\n#HollowKnight #Games",
        image: null,   // para colocar uma foto, troque null por "https://link-da-sua-imagem.jpg"
        alt: "",
        createdAt: now - 12 * MIN,
        likes: 24,
        liked: false,
        games: true,
        comments: [
          { author: "Marina Lopes", text: "Esse jogo é demais! Qual chefe foi o mais difícil?" },
          { author: "Lucas Prado", text: "A trilha sonora dele é perfeita. Bora jogar junto no fim de semana." }
        ]
      },
      {
        id: "p2",
        text: "Montando a lista de jogos para as próximas semanas. Aceito sugestões de metroidvania! #Metroidvania",
        image: null,
        alt: "",
        createdAt: now - 3 * 24 * 60 * MIN,
        likes: 11,
        liked: false,
        games: true,
        comments: [
          { author: "Ana Beatriz", text: "Anota aí: Ori and the Blind Forest." }
        ]
      }
    ];
  }

  /* ---------- Estado ---------- */
  var state = { posts: [], filter: "all", query: "" };

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      }
    } catch (e) { /* armazenamento indisponível */ }
    return seedPosts();
  }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.posts)); } catch (e) { /* ignora */ }
  }

  /* ---------- Utilidades ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class") node.className = attrs[k];
        else if (k === "text") node.textContent = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  function timeAgo(ts) {
    var diff = Math.max(0, Date.now() - ts);
    var m = Math.floor(diff / MIN);
    if (m < 1) return "agora mesmo";
    if (m < 60) return "há " + m + " min";
    var h = Math.floor(m / 60);
    if (h < 24) return "há " + h + (h === 1 ? " hora" : " horas");
    var d = Math.floor(h / 24);
    return "há " + d + (d === 1 ? " dia" : " dias");
  }

  var toastTimer;
  function toast(msg) {
    var t = $("#toast");
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 2200);
  }

  function icon(path) {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    var p = document.createElementNS(ns, "path");
    p.setAttribute("d", path);
    svg.appendChild(p);
    return svg;
  }

  var ICONS = {
    heart: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8Z",
    comment: "M21 12a8 8 0 0 1-11.600 7.100L4 20l1-4.800A8 8 0 1 1 21 12Z",
    share: "M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13"
  };

  // Texto com hashtags destacadas, sem usar innerHTML.
  function richText(text) {
    var frag = document.createDocumentFragment();
    text.split(/(#[\p{L}\p{N}_]+)/u).forEach(function (part) {
      if (!part) return;
      if (part.charAt(0) === "#" && part.length > 1) frag.appendChild(el("span", { class: "tag", text: part }));
      else frag.appendChild(document.createTextNode(part));
    });
    return frag;
  }

  /* ---------- Renderização ---------- */
  function visiblePosts() {
    var q = state.query.trim().toLowerCase();
    return state.posts.filter(function (p) {
      if (state.filter === "liked" && !p.liked) return false;
      if (state.filter === "games" && !p.games) return false;
      if (q && p.text.toLowerCase().indexOf(q) === -1) return false;
      return true;
    });
  }

  function commentNode(c) {
    var name = c.author || ME.name;
    var avatar = c.author ? (AVATARS[c.author] || ME.avatar) : ME.avatar;
    return el("div", { class: "comment" }, [
      el("img", { class: "avatar", src: avatar, alt: "" }),
      el("div", { class: "comment__bubble" }, [
        el("strong", { text: name }),
        el("p", { text: c.text })
      ])
    ]);
  }

  function postNode(p) {
    var article = el("article", { class: "post card", "data-id": p.id });

    // Cabeçalho
    var del = el("button", { class: "post__del", type: "button", "aria-label": "Excluir publicação", title: "Excluir", text: "\u00d7" });
    del.addEventListener("click", function () {
      state.posts = state.posts.filter(function (x) { return x.id !== p.id; });
      save(); render(); toast("Publicação excluída");
    });
    article.appendChild(el("div", { class: "post__head" }, [
      el("img", { class: "avatar", src: ME.avatar, alt: "" }),
      el("div", { class: "post__who" }, [
        el("span", { class: "post__name", text: ME.name }),
        el("span", { class: "post__meta", text: ME.handle + " \u00b7 " + timeAgo(p.createdAt) })
      ]),
      del
    ]));

    // Texto
    var txt = el("p", { class: "post__text" });
    txt.appendChild(richText(p.text));
    article.appendChild(txt);

    // Imagem
    if (p.image) {
      var img = el("img", { src: p.image, alt: p.alt || "Imagem da publicação", loading: "lazy" });
      img.addEventListener("error", function () { img.style.visibility = "hidden"; });
      article.appendChild(el("figure", { class: "post__media" }, [img]));
    }

    // Contadores
    var likeCount = el("span", { text: p.likes + (p.likes === 1 ? " curtida" : " curtidas") });
    var commentCount = el("span", { text: p.comments.length + (p.comments.length === 1 ? " comentário" : " comentários") });
    article.appendChild(el("div", { class: "post__counts" }, [likeCount, commentCount]));

    // Ações
    var likeBtn = el("button", { class: "act" + (p.liked ? " is-liked" : ""), type: "button", "aria-pressed": String(p.liked) });
    likeBtn.appendChild(icon(ICONS.heart));
    likeBtn.appendChild(el("span", { text: "Curtir" }));

    var commentBtn = el("button", { class: "act", type: "button", "aria-expanded": "false" });
    commentBtn.appendChild(icon(ICONS.comment));
    commentBtn.appendChild(el("span", { text: "Comentar" }));

    var shareBtn = el("button", { class: "act", type: "button" });
    shareBtn.appendChild(icon(ICONS.share));
    shareBtn.appendChild(el("span", { text: "Compartilhar" }));

    article.appendChild(el("div", { class: "post__actions" }, [likeBtn, commentBtn, shareBtn]));

    // Comentários
    var list = el("div", { class: "comments" });
    list.hidden = true;
    p.comments.forEach(function (c) { list.appendChild(commentNode(c)); });

    var input = el("input", { type: "text", placeholder: "Escreva um comentário", maxlength: "160", "aria-label": "Escrever comentário", id: "c-" + p.id });
    var send = el("button", { class: "btn", type: "submit", text: "Enviar" });
    var form = el("form", { class: "comment-form", autocomplete: "off" }, [input, send]);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var value = input.value.trim();
      if (!value) return;
      var c = { author: null, text: value };
      p.comments.push(c);
      save();
      list.insertBefore(commentNode(c), form);
      commentCount.textContent = p.comments.length + (p.comments.length === 1 ? " comentário" : " comentários");
      input.value = "";
    });
    list.appendChild(form);
    article.appendChild(list);

    likeBtn.addEventListener("click", function () {
      p.liked = !p.liked;
      p.likes += p.liked ? 1 : -1;
      likeBtn.classList.toggle("is-liked", p.liked);
      likeBtn.classList.add("pop");
      likeBtn.setAttribute("aria-pressed", String(p.liked));
      likeCount.textContent = p.likes + (p.likes === 1 ? " curtida" : " curtidas");
      save();
      if (state.filter === "liked" && !p.liked) render();
    });

    commentBtn.addEventListener("click", function () {
      list.hidden = !list.hidden;
      commentBtn.setAttribute("aria-expanded", String(!list.hidden));
      if (!list.hidden) input.focus();
    });

    shareBtn.addEventListener("click", function () {
      var text = ME.name + ": " + p.text.split("\n")[0];
      var done = function () { toast("Texto copiado"); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { toast("Não foi possível copiar"); });
      } else {
        toast("Não foi possível copiar");
      }
    });

    return article;
  }

  function render() {
    var box = $("#posts");
    box.textContent = "";
    var items = visiblePosts();
    items.forEach(function (p) { box.appendChild(postNode(p)); });
    $("#empty").hidden = items.length > 0;
    $("#statPosts").textContent = String(state.posts.length);
  }

  /* ---------- Publicar ---------- */
  var composer = $("#composer");
  var ta = $("#composerText");
  var btn = $("#publishBtn");
  var counter = $("#counter");

  function syncComposer() {
    var n = ta.value.length;
    counter.textContent = n + " / 280";
    counter.classList.toggle("is-near", n > 250);
    btn.disabled = ta.value.trim().length === 0;
  }
  ta.addEventListener("input", syncComposer);

  composer.addEventListener("submit", function (e) {
    e.preventDefault();
    var value = ta.value.trim();
    if (!value) return;
    state.posts.unshift({
      id: "p" + Date.now(),
      text: value,
      image: null,
      createdAt: Date.now(),
      likes: 0,
      liked: false,
      games: /#?(game|jogo|jogu|hollow|metroidvania)/i.test(value),
      comments: []
    });
    ta.value = "";
    syncComposer();
    save();
    render();
    toast("Publicado");
  });

  /* ---------- Filtros e busca ---------- */
  document.querySelectorAll(".chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      document.querySelectorAll(".chip").forEach(function (c) {
        c.classList.remove("is-active");
        c.setAttribute("aria-selected", "false");
      });
      chip.classList.add("is-active");
      chip.setAttribute("aria-selected", "true");
      state.filter = chip.getAttribute("data-filter");
      render();
    });
  });

  $("#search").addEventListener("input", function (e) {
    state.query = e.target.value;
    render();
  });

  /* ---------- Seguir ---------- */
  document.querySelectorAll("[data-follow]").forEach(function (b) {
    b.addEventListener("click", function () {
      var on = b.classList.toggle("is-on");
      b.textContent = on ? "Seguindo" : "Seguir";
    });
  });

  /* ---------- Tema ---------- */
  var root = document.documentElement;
  try {
    var savedTheme = localStorage.getItem("mini-feed-theme");
    if (savedTheme === "dark" || savedTheme === "light") root.setAttribute("data-theme", savedTheme);
  } catch (e) { /* ignora */ }

  $("#themeToggle").addEventListener("click", function () {
    var current = root.getAttribute("data-theme");
    if (!current) {
      current = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    var next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("mini-feed-theme", next); } catch (e) { /* ignora */ }
  });

  /* ---------- Início ---------- */
  state.posts = load();
  syncComposer();
  render();
})();