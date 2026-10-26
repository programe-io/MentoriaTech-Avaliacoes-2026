/* =========================================================
   LÓGICA DO DEV LAB — SPA com JS puro
   ========================================================= */
(function () {
  var DATA = window.DEVLAB_DATA;
  var AV = DATA.AV;
  var IMG = DATA.IMG;
  var users = DATA.users;
  var trending = DATA.trending;
  var suggestions = DATA.suggestions;
  var stories = DATA.stories;

  // Resolve URLs de avatar e imagem a partir das chaves
  function avatarUrl(u) { return AV[users[u].avatarKey]; }
  function postImage(key) { return key ? IMG[key] : null; }

  // Converte minsAgo/hoursAgo em timestamp real
  var now = Date.now();
  var MIN = 60000, HORA = 3600000;
  var posts = DATA.posts.map(function (p) {
    var t = p.minsAgo ? now - p.minsAgo * MIN : now - p.hoursAgo * HORA;
    return {
      id: p.id, user: p.user, time: t, text: p.text,
      likes: p.likes, shares: p.shares, image: postImage(p.imageKey)
    };
  });

  // Avatares fixos do header/composer
  document.getElementById("header-avatar").src = avatarUrl("voce");
  document.getElementById("composer-avatar").src = avatarUrl("voce");

  // ----- Persistência (localStorage) -----
  function load(k, def) { try { var v = JSON.parse(localStorage.getItem(k) || "null"); return v === null ? def : v; } catch (e) { return def; } }
  function save(k, v) { localStorage.setItem(k, JSON.stringify(v)); }

  var likedPosts = load("devlab_likes", {});
  var likeCounts = load("devlab_likecounts", {});
  var comments = load("devlab_comments", {});
  var followed = load("devlab_followed", {});
  var seenStories = load("devlab_seen_stories", {});
  var openComments = {};
  var nextPostId = 100;

  var feedEl = document.getElementById("feed");
  var pageWrap = document.getElementById("page-wrap");

  // ----- Helpers -----
  function avatar(u, size) {
    return '<img class="avatar-img" src="' + avatarUrl(u) + '" style="width:' + size + 'px;height:' + size + 'px;" alt="' + users[u].nome + '" onerror="this.style.display=\'none\'">';
  }
  function tempoRelativo(t) {
    var diff = Date.now() - t;
    if (diff < MIN) return "agora";
    if (diff < HORA) return Math.floor(diff / MIN) + " min";
    if (diff < 24 * HORA) return Math.floor(diff / HORA) + " h";
    return Math.floor(diff / (24 * HORA)) + " d";
  }
  function linkHashtags(text) { return text.replace(/#(\w+)/g, '<span class="hashtag">#$1</span>'); }
  function showToast(msg) {
    var t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    pageWrap.appendChild(t);
    setTimeout(function () { t.style.opacity = "0"; t.style.transition = "opacity .3s"; }, 1800);
    setTimeout(function () { t.remove(); }, 2200);
  }

  // ----- Stories -----
  function renderStories() {
    var bar = document.getElementById("stories-bar");
    bar.innerHTML = stories.map(function (s, i) {
      var seen = seenStories[s.user] && !s.isNew;
      var inner = s.isNew
        ? '<div class="story-avatar" style="background:var(--card);color:var(--accent2);font-size:28px;font-weight:700;display:flex;align-items:center;justify-content:center;">+</div>'
        : '<img class="story-avatar" src="' + avatarUrl(s.user) + '" alt="' + users[s.user].nome + '" onerror="this.style.display=\'none\'">';
      return '<div class="story-item' + (seen ? ' seen' : '') + '" data-story="' + i + '">'
        + '<div class="story-ring"><div class="story-inner">' + inner + '</div></div>'
        + '<div class="story-name">' + (s.isNew ? "Seu story" : users[s.user].handle.replace("@", "")) + '</div></div>';
    }).join("");
  }

  function openStoryViewer(idx) {
    var s = stories[idx];
    var viewer = document.getElementById("story-viewer");
    viewer.style.display = "block";
    viewer.innerHTML =
      '<div class="fade-in" style="position:relative;border-radius:18px;overflow:hidden;height:380px;background:linear-gradient(135deg,#8b5cf6,#22d3ee);">'
      + '<img src="' + avatarUrl(s.user) + '" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.35;" alt="">'
      + '<button id="close-story" style="position:absolute;top:14px;right:14px;background:rgba(0,0,0,.5);border:none;color:#fff;width:34px;height:34px;border-radius:50%;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;z-index:2;">×</button>'
      + '<div style="position:absolute;top:14px;left:14px;display:flex;align-items:center;gap:10px;z-index:2;">'
      + avatar(s.user, 36)
      + '<div><div style="font-weight:700;color:#fff;font-size:15px;text-shadow:0 1px 4px rgba(0,0,0,.5);">' + users[s.user].nome + '</div><div style="font-size:12px;color:rgba(255,255,255,.9);">' + users[s.user].handle + ' · agora</div></div></div>'
      + '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:40px;text-align:center;z-index:1;">'
      + '<div style="font-size:22px;font-weight:700;color:#fff;max-width:320px;line-height:1.4;text-shadow:0 2px 10px rgba(0,0,0,.5);">' + s.content + '</div></div>'
      + '<div style="position:absolute;bottom:0;left:0;right:0;height:3px;background:rgba(255,255,255,.2);z-index:2;"><div id="story-progress" style="height:100%;width:0%;background:#fff;"></div></div></div>';
    if (!s.isNew) { seenStories[s.user] = true; save("devlab_seen_stories", seenStories); renderStories(); }
    document.getElementById("close-story").addEventListener("click", function () { viewer.style.display = "none"; viewer.innerHTML = ""; });
    var prog = document.getElementById("story-progress");
    var start = Date.now(), dur = 5000;
    var timer = setInterval(function () {
      var pct = Math.min(100, (Date.now() - start) / dur * 100);
      if (prog) prog.style.width = pct + "%";
      if (pct >= 100) { clearInterval(timer); viewer.style.display = "none"; viewer.innerHTML = ""; }
    }, 50);
  }

  // ----- Feed -----
  function renderFeed() {
    var sorted = posts.slice().sort(function (a, b) { return b.time - a.time; });
    feedEl.innerHTML = sorted.map(function (p) {
      var u = users[p.user];
      var liked = !!likedPosts[p.id];
      var lc = likeCounts[p.id] !== undefined ? likeCounts[p.id] : p.likes;
      var sc = p.shares;
      var coms = comments[p.id] || [];
      var open = !!openComments[p.id];
      var imgHtml = p.image ? '<img class="post-image" src="' + p.image + '" alt="imagem do post" onerror="this.style.display=\'none\'">' : '';

      var commentsHtml = open
        ? '<div class="comments-area">'
        + (coms.length === 0 ? '<div style="font-size:13px;color:var(--muted);margin-bottom:10px;">Nenhum comentário ainda. Seja o primeiro!</div>' : '')
        + coms.map(function (c) {
            return '<div class="comment-box"><div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">' + avatar(c.user, 24) + '<span style="font-weight:700;font-size:13px;">' + users[c.user].nome + '</span><span style="font-size:11px;color:var(--muted);">' + tempoRelativo(c.time) + '</span></div><p style="margin:0;font-size:14px;line-height:1.5;color:#cbd5e1;">' + linkHashtags(c.text) + '</p></div>';
          }).join("")
        + '<div style="display:flex;gap:8px;margin-top:10px;">' + avatar("voce", 32)
        + '<input class="comment-input" data-post="' + p.id + '" placeholder="Escreva um comentário...">'
        + '<button class="comment-submit" data-post="' + p.id + '">Enviar</button></div></div>'
        : '';

      return '<article class="post-card fade-in">'
        + '<div style="display:flex;gap:12px;">'
        + avatar(p.user, 44)
        + '<div style="flex:1;min-width:0;">'
        + '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px;">'
        + '<span style="font-weight:700;font-size:15px;">' + u.nome + '</span>'
        + '<span style="color:var(--muted);font-size:13px;">' + u.handle + ' · ' + tempoRelativo(p.time) + '</span></div>'
        + '<p style="margin:0 0 14px;font-size:15px;line-height:1.6;word-wrap:break-word;">' + linkHashtags(p.text) + '</p>'
        + imgHtml
        + '<div class="post-actions">'
        + '<span class="like-btn' + (liked ? ' liked' : '') + '" data-like="' + p.id + '">'
        + '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>'
        + '<span class="like-count">' + lc + '</span></span>'
        + '<span class="comment-toggle" data-comment-toggle="' + p.id + '">'
        + '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'
        + '<span>' + coms.length + '</span></span>'
        + '<span class="share-btn" data-share="' + p.id + '">'
        + '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>'
        + '<span class="share-count">' + sc + '</span></span></div>'
        + commentsHtml
        + '</div></div></article>';
    }).join("");
  }

  // ----- Sidebar -----
  function renderTrending() {
    document.getElementById("trending-list").innerHTML = trending.map(function (t, i) {
      return '<div class="trending-item" data-trend="' + t.tag + '">'
        + '<div class="trending-rank">' + (i + 1) + ' · Em alta</div>'
        + '<div class="trending-tag">' + t.tag + '</div>'
        + '<div class="trending-count">' + t.posts + ' posts</div></div>';
    }).join("");
  }
  function renderSuggestions() {
    document.getElementById("suggest-list").innerHTML = suggestions.map(function (uid) {
      var u = users[uid];
      var isF = !!followed[uid];
      return '<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);">'
        + avatar(uid, 40)
        + '<div style="flex:1;min-width:0;"><div style="font-weight:700;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + u.nome + '</div><div style="font-size:12px;color:var(--muted);">' + u.handle + '</div></div>'
        + '<button class="follow-btn' + (isF ? ' following' : '') + '" data-follow="' + uid + '" style="' + (isF ? '' : 'background:var(--text);color:var(--bg);') + 'border:none;padding:7px 16px;border-radius:20px;font-weight:700;font-size:12px;font-family:inherit;cursor:pointer;">' + (isF ? 'Seguindo' : 'Seguir') + '</button></div>';
    }).join("");
  }

  // ----- Eventos -----
  var composer = document.getElementById("composer-input");
  var charCount = document.getElementById("char-count");
  composer.addEventListener("input", function () {
    var len = composer.value.length;
    charCount.textContent = len + "/280";
    charCount.style.color = len > 260 ? "#f43f5e" : "var(--muted)";
  });
  document.querySelectorAll(".composer-chip").forEach(function (c) {
    c.addEventListener("click", function () {
      if (c.textContent === "#tag") { composer.value += "#"; composer.focus(); }
      else showToast("Funcionalidade em breve!");
    });
  });
  document.getElementById("publish-btn").addEventListener("click", function () {
    var text = composer.value.trim();
    if (!text) { showToast("Escreva algo primeiro!"); return; }
    if (text.length > 280) { showToast("Máximo de 280 caracteres"); return; }
    posts.unshift({ id: nextPostId++, user: "voce", time: Date.now(), text: text, likes: 0, shares: 0, image: null });
    composer.value = ""; charCount.textContent = "0/280"; charCount.style.color = "var(--muted)";
    renderFeed(); showToast("Publicado no DEV LAB!");
  });

  feedEl.addEventListener("click", function (e) {
    var likeBtn = e.target.closest("[data-like]");
    if (likeBtn) {
      var pid = parseInt(likeBtn.getAttribute("data-like"), 10);
      var liked = !!likedPosts[pid];
      var p = posts.find(function (x) { return x.id === pid; }) || { likes: 0 };
      var cur = likeCounts[pid] !== undefined ? likeCounts[pid] : p.likes;
      likeCounts[pid] = cur + (liked ? -1 : 1);
      likedPosts[pid] = !liked;
      save("devlab_likes", likedPosts); save("devlab_likecounts", likeCounts);
      var svg = likeBtn.querySelector("svg");
      svg.classList.add("heart-pop");
      setTimeout(function () { svg.classList.remove("heart-pop"); }, 400);
      renderFeed(); return;
    }
    var ct = e.target.closest("[data-comment-toggle]");
    if (ct) {
      var cid = parseInt(ct.getAttribute("data-comment-toggle"), 10);
      openComments[cid] = !openComments[cid];
      renderFeed(); return;
    }
    var sh = e.target.closest("[data-share]");
    if (sh) {
      var sid = parseInt(sh.getAttribute("data-share"), 10);
      var pst = posts.find(function (x) { return x.id === sid; });
      if (pst) pst.shares = (pst.shares || 0) + 1;
      renderFeed(); showToast("Link copiado para a área de transferência!"); return;
    }
    var sub = e.target.closest(".comment-submit");
    if (sub) {
      var cpid = parseInt(sub.getAttribute("data-post"), 10);
      var inp = feedEl.querySelector('.comment-input[data-post="' + cpid + '"]');
      var txt = inp.value.trim();
      if (!txt) return;
      if (!comments[cpid]) comments[cpid] = [];
      comments[cpid].push({ user: "voce", text: txt, time: Date.now() });
      save("devlab_comments", comments);
      openComments[cpid] = true;
      renderFeed(); return;
    }
  });
  feedEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && e.target.classList.contains("comment-input")) {
      var cpid = parseInt(e.target.getAttribute("data-post"), 10);
      var txt = e.target.value.trim();
      if (!txt) return;
      if (!comments[cpid]) comments[cpid] = [];
      comments[cpid].push({ user: "voce", text: txt, time: Date.now() });
      save("devlab_comments", comments);
      openComments[cpid] = true;
      renderFeed();
    }
  });

  document.getElementById("stories-bar").addEventListener("click", function (e) {
    var item = e.target.closest("[data-story]");
    if (item) { openStoryViewer(parseInt(item.getAttribute("data-story"), 10)); }
  });
  document.getElementById("trending-list").addEventListener("click", function (e) {
    var item = e.target.closest("[data-trend]");
    if (item) { showToast("Filtrando por " + item.getAttribute("data-trend") + "..."); }
  });
  document.getElementById("suggest-list").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-follow]");
    if (btn) {
      var uid = btn.getAttribute("data-follow");
      followed[uid] = !followed[uid];
      save("devlab_followed", followed);
      renderSuggestions();
      showToast(followed[uid] ? "Agora você segue " + users[uid].nome : "Deixou de seguir " + users[uid].nome);
    }
  });
  document.getElementById("logo-btn").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Inicializa
  renderStories();
  renderFeed();
  renderTrending();
  renderSuggestions();
})();

// SEGUNDA PARTE DO ARQUIVO JS 
/* =========================================================
   DADOS DO DEV LAB — edite aqui para adicionar usuários,
   posts, trending, sugestões e stories.
   ========================================================= */

window.DEVLAB_DATA = {

  // URLs das imagens de perfil (avatares ilustrados)
  AV: {
    voce: "https://p16-flow-image-sign.ibyteimg.com/tos-mya-i-3rsxbfecgb/rc_gen_image/80a1da7ea20c4385adffe0355c508d54.jpeg~tplv-0es2k971ck-image.image?rcl=2026102621222913C2672E03FDA6D42D06&rk3s=8e244e95&rrcfp=02a80fc2&x-expires=1795613031&x-signature=oil%2FOplZ6l17i2H4klEKefnMp4U%3D",
    marina: "https://p16-flow-image-sign.ibyteimg.com/tos-mya-i-3rsxbfecgb/rc_gen_image/38834c3215974df9b6805b8014b55e1f.jpeg~tplv-0es2k971ck-image.image?rcl=2026102621222913C2672E03FDA6D42D06&rk3s=8e244e95&rrcfp=02a80fc2&x-expires=1795613018&x-signature=wfwGlIxA5Da2UsuJKZYcns6O46Y%3D",
    rafa: "https://p19-flow-image-sign.ibyteimg.com/tos-mya-i-3rsxbfecgb/rc_gen_image/c4cdd50422ee4c28904c78ab2a0fff3f.jpeg~tplv-0es2k971ck-image.image?rcl=2026102621222913C2672E03FDA6D42D06&rk3s=8e244e95&rrcfp=02a80fc2&x-expires=1795613020&x-signature=drhyJFhBdfHYbUaSWCKLZZnymUA%3D",
    technews: "https://p16-flow-image-sign.ibyteimg.com/tos-mya-i-3rsxbfecgb/rc_gen_image/3b93840591864801ab22f07acd311458.jpeg~tplv-0es2k971ck-image.image?rcl=2026102621222913C2672E03FDA6D42D06&rk3s=8e244e95&rrcfp=02a80fc2&x-expires=1795613022&x-signature=iw4cYq3UfOCWFw%2Bu2vzTnPtACvs%3D",
    cafe: "https://p16-flow-image-sign.ibyteimg.com/tos-mya-i-3rsxbfecgb/rc_gen_image/87305eac62fe442589f11206aaa47ad3.jpeg~tplv-0es2k971ck-image.image?rcl=2026102621222913C2672E03FDA6D42D06&rk3s=8e244e95&rrcfp=02a80fc2&x-expires=1795613018&x-signature=c1ygFxUh9nL5rKgYNXWGn%2BqXLH8%3D",
    ana: "https://p16-flow-image-sign.ibyteimg.com/tos-mya-i-3rsxbfecgb/rc_gen_image/65bd2fdb3a87435383023246c466b254.jpeg~tplv-0es2k971ck-image.image?rcl=2026102621222913C2672E03FDA6D42D06&rk3s=8e244e95&rrcfp=02a80fc2&x-expires=1795613019&x-signature=YUxI4sijXs5bNZe9bNf86md8JW4%3D",
    design: "https://p16-flow-image-sign.ibyteimg.com/tos-mya-i-3rsxbfecgb/rc_gen_image/1f221fc9b52448c789dd2d7765466b57.jpeg~tplv-0es2k971ck-image.image?rcl=2026102621222913C2672E03FDA6D42D06&rk3s=8e244e95&rrcfp=02a80fc2&x-expires=1795613018&x-signature=wrWC0qWilZSqfQdD5RM%2Fswqn5oY%3D",
    devpleno: "https://p16-flow-image-sign.ibyteimg.com/tos-mya-i-3rsxbfecgb/rc_gen_image/8227e88b9a8f4139b188359970c9d7cd.jpeg~tplv-0es2k971ck-image.image?rcl=2026102621222913C2672E03FDA6D42D06&rk3s=8e244e95&rrcfp=02a80fc2&x-expires=1795613018&x-signature=yEZSvfMybep7R%2Bup9QDBZZGgA24%3D",
    codemaster: "https://p16-flow-image-sign.ibyteimg.com/tos-mya-i-3rsxbfecgb/rc_gen_image/bcb46ca0849643b2baab34922909de1f.jpeg~tplv-0es2k971ck-image.image?rcl=2026102621222913C2672E03FDA6D42D06&rk3s=8e244e95&rrcfp=02a80fc2&x-expires=1795613018&x-signature=RuwHlxtpySAy00914HY89ssQIrM%3D",
    stack: "https://p19-flow-image-sign.ibyteimg.com/tos-mya-i-3rsxbfecgb/rc_gen_image/42016b28ca43471dbddfbc0736c27e0e.jpeg~tplv-0es2k971ck-image.image?rcl=2026102621222913C2672E03FDA6D42D06&rk3s=8e244e95&rrcfp=02a80fc2&x-expires=1795613029&x-signature=2jkLx1G0cOxWaLw1YyoQk9xkcA4%3D",
    luna: "https://p16-flow-image-sign.ibyteimg.com/tos-mya-i-3rsxbfecgb/rc_gen_image/9422199c645f46b3b54c5a0b3cb84db1.jpeg~tplv-0es2k971ck-image.image?rcl=2026102621222913C2672E03FDA6D42D06&rk3s=8e244e95&rrcfp=02a80fc2&x-expires=1795613031&x-signature=jdUpwI9Xxv94cfFzah5JR4PE3xU%3D",
    thiago: "https://p16-flow-image-sign.ibyteimg.com/tos-mya-i-3rsxbfecgb/rc_gen_image/4e478cf6156a42908ab38ac1621d0cac.jpeg~tplv-0es2k971ck-image.image?rcl=2026102621222913C2672E03FDA6D42D06&rk3s=8e244e95&rrcfp=02a80fc2&x-expires=1795613029&x-signature=4pVSvHnF91CvcMITEgXjBz%2FUiPI%3D"
  },

  // URLs das imagens dos posts
  IMG: {
    vaga: "https://p16-flow-image-sign.ibyteimg.com/tos-mya-i-3rsxbfecgb/rc_gen_image/6260cd5dd1494f9cb232245f3d968029.jpeg~tplv-0es2k971ck-image.image?rcl=2026102621222913C2672E03FDA6D42D06&rk3s=8e244e95&rrcfp=02a80fc2&x-expires=1795613031&x-signature=yC0uhea99K5%2BwjTlME7y2vqLxhw%3D",
    setup: "https://p16-flow-image-sign.ibyteimg.com/tos-mya-i-3rsxbfecgb/rc_gen_image/667434f47dec4d07a0846981fcfce589.jpeg~tplv-0es2k971ck-image.image?rcl=2026102621222913C2672E03FDA6D42D06&rk3s=8e244e95&rrcfp=02a80fc2&x-expires=1795613031&x-signature=RxVKAuHY0l8wzCgHH0Szujk7%2BKk%3D",
    equipe: "https://p16-flow-image-sign.ibyteimg.com/tos-mya-i-3rsxbfecgb/rc_gen_image/fcc536764b3f4424956a6c6fd6e1e7dc.jpeg~tplv-0es2k971ck-image.image?rcl=2026102621222913C2672E03FDA6D42D06&rk3s=8e244e95&rrcfp=02a80fc2&x-expires=1795613031&x-signature=UqlEMEMsYTIYLJRlPnURmyNY8og%3D"
  },

  // Usuários da plataforma
  users: {
    voce:      { nome: "Você",              handle: "@voce",             avatarKey: "voce" },
    marina:    { nome: "Marina Costa",      handle: "@marinacode",       avatarKey: "marina" },
    rafa:      { nome: "Rafa Dev",          handle: "@rafaela.py",       avatarKey: "rafa" },
    technews:  { nome: "Tech News",         handle: "@technews",         avatarKey: "technews" },
    cafe:      { nome: "Café & Código",     handle: "@cafeecodigo",      avatarKey: "cafe" },
    ana:       { nome: "Ana Silva",         handle: "@anadev",           avatarKey: "ana" },
    design:    { nome: "Design Diário",     handle: "@designdiario",     avatarKey: "design" },
    devpleno:  { nome: "DevPleno",          handle: "@devpleno",         avatarKey: "devpleno" },
    codemaster:{ nome: "CodeMaster",        handle: "@codemaster",       avatarKey: "codemaster" },
    stack:     { nome: "StackOverflow BR",  handle: "@stackoverflow_br", avatarKey: "stack" },
    luna:      { nome: "Luna Code",         handle: "@lunacode",         avatarKey: "luna" },
    thiago:    { nome: "Thiago DevOps",     handle: "@thiagodevops",      avatarKey: "thiago" }
  },

  // Posts do feed (time relativo calculado em app.js)
  posts: [
    { id: 1,  user: "marina",     minsAgo: 8,   text: "TypeScript salvou minha vida mais uma vez. Erro de tipo pego em compile time = cliente nunca vê. Não tem preço. #TypeScript #Qualidade", likes: 142, shares: 18 },
    { id: 2,  user: "devpleno",   minsAgo: 22,  text: "VAGA ABERTA! Procuramos dev full-stack júnior para trabalho 100% remoto. Requisitos: HTML, CSS, JS e muita vontade de aprender. Envie currículo pelo link na bio! #VagaDev #Remote #Júnior", likes: 89, shares: 156, imageKey: "vaga" },
    { id: 3,  user: "rafa",       minsAgo: 45,  text: "Dica do dia: escrevam testes. Não é frescura. Perdi 4h debugando um bug que um teste de 5 linhas teria pegado em 2 segundos. #TDD #Qualidade", likes: 89, shares: 31 },
    { id: 4,  user: "luna",       minsAgo: 70,  text: "Acabei de descobrir que o CSS tem native nesting agora. Adeus, SASS? Quem mais está testando? #CSS #FrontEnd", likes: 54, shares: 12 },
    { id: 5,  user: "technews",   hoursAgo: 2,  text: "BREAKING: Nova versão do Python traz melhorias de performance de até 60% em loops. Já podem atualizar. #Python #Noticias", likes: 523, shares: 210 },
    { id: 6,  user: "codemaster", hoursAgo: 3,  text: "Pergunta de entrevista: qual a diferença entre let, const e var? Deixa sua resposta nos comentários! #JavaScript #Entrevista #Dica", likes: 201, shares: 45, imageKey: "equipe" },
    { id: 7,  user: "cafe",       hoursAgo: 4,  text: "Café da manhã + código novo + setup novo = dia perfeito. Qual é a sua bebida de programação? Comenta aí! #Café #DevLife #Setup", likes: 76, shares: 4, imageKey: "setup" },
    { id: 8,  user: "stack",      hoursAgo: 5,  text: "Alguém mais passa horas tentando resolver um problema e descobre que era um ponto e vírgula faltando? Não, só eu mesmo. #StackOverflow #DevLife", likes: 312, shares: 67 },
    { id: 9,  user: "ana",        hoursAgo: 6,  text: "FINALIZEI MEU PRIMEIRO PROJETO FULL-STACK! Lista de tarefas com autenticação, deploy na Vercel. Feedback é bem-vindo! #100DaysOfCode #Portfólio #Conquista", likes: 445, shares: 89 },
    { id: 10, user: "thiago",     hoursAgo: 9,  text: "Levantei um cluster Kubernetes inteiro com Terraform hoje. Automação é amor. Quem quiser o repositório é só pedir. #DevOps #Kubernetes #Terraform", likes: 178, shares: 52 },
    { id: 11, user: "design",     hoursAgo: 12, text: "Lembrete: whitespace não é espaço vazio, é respiração. Seu design agradece. #Design #UX #Dica", likes: 201, shares: 45 },
    { id: 12, user: "marina",     hoursAgo: 26, text: "Acabei de migrar um projeto legado de jQuery para React puro. 3 meses de trabalho, mas a performance dobrou. Não subestimem o poder de um bom refactor. #React #Refactor", likes: 267, shares: 34 }
  ],

  trending: [
    { tag: "#ReactHooks",    posts: "12.4K" },
    { tag: "#VagaDev",       posts: "8.9K" },
    { tag: "#Python",        posts: "45.2K" },
    { tag: "#100DaysOfCode", posts: "3.1K" },
    { tag: "#CSS",           posts: "6.7K" },
    { tag: "#DevOps",        posts: "4.2K" }
  ],

  suggestions: ["devpleno", "codemaster", "stack", "luna", "thiago"],

  stories: [
    { user: "voce",     isNew: true, content: "Adicione seu primeiro story!" },
    { user: "marina",   content: "Novo vídeo: migrando projetos legados!" },
    { user: "rafa",     content: "Live de Python às 20h, não percam!" },
    { user: "technews", content: "Python 3.14 anunciado oficialmente" },
    { user: "cafe",     content: "Tour pelo meu setup novo!" },
    { user: "design",   content: "Mini tutorial: grids responsivos" },
    { user: "luna",     content: "CSS nesting: testando agora!" },
    { user: "thiago",   content: "Behind the scenes: meu cluster K8s" }
  ]
};
