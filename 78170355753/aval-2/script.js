
"use strict";

const $ = (selector) => document.querySelector(selector);

const STORAGE_KEY = "minifeed_posts_v1";
const PROFILE_KEY = "minifeed_profile_v1";
const THEME_KEY = "minifeed_theme_v1";
const NOTIFICATIONS_KEY = "minifeed_notifications_v1";

const defaultProfile = {
  name: "Ana Silva",
  handle: "@ana.dev",
  bio: "Apaixonada por tecnologia, criatividade e novas ideias. ✨",
  avatar: "A"
};

const initialPosts = [
  {
    id: "demo-1",
    author: "Luna Martins",
    handle: "@luna.cria",
    avatar: "L",
    text: "Começando um novo projeto de programação! 💜 É muito legal ver uma ideia saindo do papel e virando algo real.",
    createdAt: Date.now() - 1000 * 60 * 8,
    likes: ["demo-like-1", "demo-like-2"],
    comments: [
      { id: "c-1", author: "Pedro Lima", text: "Vai ficar incrível! 🚀" }
    ],
    own: false
  },
  {
    id: "demo-2",
    author: "Pedro Lima",
    handle: "@pedro.codes",
    avatar: "P",
    text: "Dica do dia: não precisa saber tudo para começar. Aprenda uma coisa nova, pratique e evolua um pouquinho a cada dia. 🚀",
    createdAt: Date.now() - 1000 * 60 * 35,
    likes: ["demo-like-3"],
    comments: [],
    own: false
  },
  {
    id: "demo-3",
    author: "Bia Costa",
    handle: "@biacosta",
    avatar: "B",
    text: "Qual é a coisa mais interessante que você aprendeu esta semana? Quero descobrir novas ideias! 💡",
    createdAt: Date.now() - 1000 * 60 * 90,
    likes: [],
    comments: [
      { id: "c-2", author: "Luna Martins", text: "Estou aprendendo JavaScript!" }
    ],
    own: false
  }
];

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    showToast("Não foi possível salvar. Verifique o armazenamento do navegador.");
    return false;
  }
}

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

let posts = loadJSON(STORAGE_KEY, null);
if (!Array.isArray(posts)) {
  posts = initialPosts;
  saveJSON(STORAGE_KEY, posts);
}

posts = posts
  .filter(p => p && typeof p.text === "string" && Array.isArray(p.likes) && Array.isArray(p.comments))
  .map(p => ({ ...p, own: p.own === true }));

let profile = {
  ...defaultProfile,
  ...loadJSON(PROFILE_KEY, {})
};

let notifications = loadJSON(NOTIFICATIONS_KEY, []);
if (!Array.isArray(notifications)) notifications = [];

let currentPage = "home";
let searchTerm = "";
let toastTimer;
let commentOpen = {};
let activeTheme = loadJSON(THEME_KEY, "dark") === "light" ? "light" : "dark";

function persistPosts() {
  return saveJSON(STORAGE_KEY, posts);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function relativeTime(timestamp) {
  const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
  if (seconds < 60) return "agora mesmo";
  if (seconds < 3600) return `há ${Math.floor(seconds / 60)} min`;
  if (seconds < 86400) return `há ${Math.floor(seconds / 3600)} h`;
  if (seconds < 604800) return `há ${Math.floor(seconds / 86400)} d`;
  return new Date(timestamp).toLocaleDateString("pt-BR");
}

function getAvatar(name) {
  return (name.trim().charAt(0) || "?").toUpperCase();
}

function renderProfile() {
  const name = escapeHTML(profile.name);
  const handle = escapeHTML(profile.handle);
  const bio = escapeHTML(profile.bio);

  $("#sidebarName").textContent = profile.name;
  $("#sidebarHandle").textContent = profile.handle;
  $("#sidebarAvatar").textContent = profile.avatar;
  $("#headerAvatar").textContent = profile.avatar;
  $("#composerAvatar").textContent = profile.avatar;
  $("#profileAvatar").textContent = profile.avatar;

  $("#profileName").textContent = profile.name;
  $("#profileHandle").textContent = profile.handle;
  $("#profileBio").textContent = profile.bio || "Ainda não escreveu uma biografia.";

  const ownPosts = posts.filter(p => p.own);
  const ownIds = new Set(ownPosts.map(p => p.id));
  const likesReceived = posts
    .filter(p => ownIds.has(p.id))
    .reduce((sum, p) => sum + p.likes.length, 0);

  $("#profilePosts").textContent = ownPosts.length;
  $("#profileLikes").textContent = likesReceived;
}

function notify(message, symbol = "♡") {
  notifications.unshift({
    id: makeId(),
    message,
    symbol,
    createdAt: Date.now()
  });

  notifications = notifications.slice(0, 50);
  saveJSON(NOTIFICATIONS_KEY, notifications);
  renderNotifications();
}

function renderNotifications() {
  $("#notificationBadge").textContent = notifications.length || "";
  const list = $("#notificationList");

  if (notifications.length === 0) {
    list.innerHTML = '<div class="notification-empty">Tudo tranquilo por aqui. ✨</div>';
    return;
  }

  list.innerHTML = notifications.map(n => `
    <div class="notification-item">
      <div class="notification-symbol">${escapeHTML(n.symbol)}</div>
      <div>
        <p>${escapeHTML(n.message)}</p>
        <small>${relativeTime(n.createdAt)}</small>
      </div>
    </div>
  `).join("");
}

function renderPosts() {
  const feed = $("#feed");
  const normalizedSearch = searchTerm.trim().toLocaleLowerCase("pt-BR");

  let visible = posts.filter(post => {
    const matchesSearch =
      !normalizedSearch ||
      `${post.text} ${post.author} ${post.handle}`
        .toLocaleLowerCase("pt-BR").includes(normalizedSearch);

    const matchesPage = currentPage !== "profile" || post.own;
    return matchesSearch && matchesPage;
  });

  if ($("#sortSelect").value === "popular") {
    visible.sort((a, b) => b.likes.length - a.likes.length || b.createdAt - a.createdAt);
  } else {
    visible.sort((a, b) => b.createdAt - a.createdAt);
  }

  feed.innerHTML = visible.map(post => {
    const liked = post.likes.includes("me");
    const comments = post.comments;
    const showComments = Boolean(commentOpen[post.id]);

    return `
      <article class="panel post-card" data-post-id="${escapeHTML(post.id)}">
        <div class="post-header">
          <div class="avatar">${escapeHTML(post.avatar || getAvatar(post.author))}</div>
          <div class="post-user">
            <strong>${escapeHTML(post.author)}</strong>
            <div class="post-meta">${escapeHTML(post.handle)} · ${relativeTime(post.createdAt)}</div>
          </div>
          ${post.own ? `
            <button class="delete-btn" data-action="delete"
              data-id="${escapeHTML(post.id)}" aria-label="Excluir publicação">
              Excluir
            </button>` : ""}
        </div>

        <p class="post-text">${escapeHTML(post.text)}</p>

        <div class="post-actions">
          <button class="action-btn ${liked ? "liked" : ""}"
            data-action="like" data-id="${escapeHTML(post.id)}"
            aria-pressed="${liked}">
            <span class="action-icon">${liked ? "♥" : "♡"}</span>
            <span>${post.likes.length} Curtir</span>
          </button>

          <button class="action-btn" data-action="comments"
            data-id="${escapeHTML(post.id)}" aria-expanded="${showComments}">
            <span class="action-icon">☏</span>
            <span>${comments.length} Comentário${comments.length === 1 ? "" : "s"}</span>
          </button>

          <button class="action-btn" data-action="share"
            data-id="${escapeHTML(post.id)}">
            <span class="action-icon">↗</span>
            <span>Compartilhar</span>
          </button>
        </div>

        ${showComments ? `
          <div class="comments">
            <div class="comment-list">
              ${comments.length ? comments.map(c => `
                <div class="comment">
                  <strong>${escapeHTML(c.author)}</strong>
                  <p>${escapeHTML(c.text)}</p>
                </div>
              `).join("") : '<p class="post-meta">Seja o primeiro a comentar!</p>'}
            </div>
            <form class="comment-form" data-id="${escapeHTML(post.id)}">
              <input name="comment" maxlength="250" required
                placeholder="Escreva um comentário..."
                aria-label="Escreva um comentário">
              <button type="submit">Enviar</button>
            </form>
          </div>
        ` : ""}
      </article>
    `;
  }).join("");

  $("#emptyState").hidden = visible.length > 0;
  $("#feed").hidden = visible.length === 0;
  $("#feedHeading").textContent = normalizedSearch
    ? `Resultados (${visible.length})`
    : currentPage === "profile" ? "Suas publicações" : "Últimas publicações";

  renderProfile();
}

function setPage(page) {
  currentPage = page;
  const isProfile = page === "profile";
  const isNotifications = page === "notifications";
  const isExplore = page === "explore";

  document.querySelectorAll("[data-page]").forEach(button => {
    button.classList.toggle("active", button.dataset.page === page);
  });

  $("#composer").hidden = isProfile || isNotifications;
  $("#feed").hidden = isProfile || isNotifications;
  $("#emptyState").hidden = true;
  $("#profilePanel").hidden = !isProfile;
  $("#notificationsPanel").hidden = !isNotifications;
  $("#sortSelect").parentElement.hidden = isNotifications;

  $("#pageEyebrow").textContent = isProfile ? "SEU ESPAÇO" :
    isNotifications ? "FIQUE POR DENTRO" :
    isExplore ? "DESCUBRA NOVIDADES" : "SUA COMUNIDADE";

  $("#pageTitle").innerHTML = isProfile ? "Seu perfil ♙" :
    isNotifications ? "Notificações ♧" :
    isExplore ? "Explore o feed ✨" : "Seu feed <span>💜</span>";

  $("#pageSubtitle").textContent = isProfile
    ? "Veja suas publicações e suas conquistas."
    : isNotifications ? "Tudo o que aconteceu por aqui."
    : isExplore ? "Encontre ideias e conversas interessantes."
    : "Ideias, momentos e pessoas que inspiram.";

  if (isProfile || isNotifications) {
    $("#emptyState").hidden = true;
  } else {
    renderPosts();
  }

  if (isNotifications) renderNotifications();
  renderProfile();
}

function publishPost() {
  const text = $("#postText").value.trim();

  if (!text) {
    showToast("Escreva alguma coisa antes de publicar 🙂");
    $("#postText").focus();
    return;
  }

  if (text.length > 500) {
    showToast("Sua publicação pode ter até 500 caracteres.");
    return;
  }

  const post = {
    id: makeId(),
    author: profile.name,
    handle: profile.handle,
    avatar: profile.avatar,
    text,
    createdAt: Date.now(),
    likes: [],
    comments: [],
    own: true
  };

  posts.unshift(post);
  if (!persistPosts()) {
    posts = posts.filter(p => p.id !== post.id);
    return;
  }

  $("#postText").value = "";
  $("#charCount").textContent = "0/500";
  searchTerm = "";
  $("#searchInput").value = "";
  $("#sortSelect").value = "recent";
  setPage("home");
  showToast("Publicação criada com sucesso! ✨");
}

function toggleLike(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;

  const index = post.likes.indexOf("me");

  if (index >= 0) {
    post.likes.splice(index, 1);
    persistPosts();
    renderPosts();
    showToast("Curtida removida.");
    return;
  }

  post.likes.push("me");
  if (!persistPosts()) {
    post.likes.pop();
    return;
  }

  renderPosts();
  showToast("Você curtiu esta publicação! 💜");

  if (!post.own) {
    notify(`${profile.name} curtiu a publicação de ${post.author}.`, "♥");
  }
}

function deletePost(id) {
  const post = posts.find(p => p.id === id);
  if (!post || !post.own) {
    showToast("Você só pode excluir suas próprias publicações.");
    return;
  }

  if (!confirm("Deseja excluir esta publicação? Essa ação não pode ser desfeita.")) {
    return;
  }

  const previousPosts = posts;
  posts = posts.filter(p => p.id !== id);

  if (!persistPosts()) {
    posts = previousPosts;
    return;
  }

  delete commentOpen[id];
  renderPosts();
  showToast("Publicação excluída.");
}

function addComment(id, text) {
  const post = posts.find(p => p.id === id);
  const commentText = text.trim();

  if (!post || !commentText) {
    showToast("Digite um comentário antes de enviar.");
    return;
  }

  if (commentText.length > 250) {
    showToast("O comentário pode ter até 250 caracteres.");
    return;
  }

  post.comments.push({
    id: makeId(),
    author: profile.name,
    text: commentText
  });

  if (!persistPosts()) {
    post.comments.pop();
    return;
  }

  commentOpen[id] = true;
  renderPosts();
  showToast("Comentário adicionado! 💬");

  if (!post.own) {
    notify(`${profile.name} comentou na publicação de ${post.author}.`, "💬");
  }
}

async function sharePost(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;

  const content = `${post.author} publicou no MiniFeed:\n\n${post.text}`;

  try {
    if (navigator.share) {
      await navigator.share({ title: "MiniFeed", text: content });
    } else if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(content);
      showToast("Texto copiado para compartilhar! ↗");
    } else {
      const temporary = document.createElement("textarea");
      temporary.value = content;
      temporary.style.position = "fixed";
      temporary.style.opacity = "0";
      document.body.appendChild(temporary);
      temporary.select();
      const copied = document.execCommand("copy");
      temporary.remove();
      showToast(copied ? "Texto copiado para compartilhar! ↗" :
        "Não foi possível copiar neste navegador.");
    }
  } catch (error) {
    if (error.name !== "AbortError") {
      showToast("Não foi possível compartilhar agora.");
    }
  }
}

function openEditProfile() {
  $("#editName").value = profile.name;
  $("#editBio").value = profile.bio;
  $("#editDialog").showModal();
}

$("#profileForm").addEventListener("submit", event => {
  event.preventDefault();

  const name = $("#editName").value.trim();
  const bio = $("#editBio").value.trim();

  if (!name) {
    showToast("O nome não pode ficar vazio.");
    return;
  }

  const previousProfile = profile;
  profile = {
    ...profile,
    name,
    bio,
    avatar: getAvatar(name)
  };

  if (!saveJSON(PROFILE_KEY, profile)) {
    profile = previousProfile;
    return;
  }

  renderProfile();
  $("#editDialog").close();
  showToast("Perfil atualizado! ✨");
});

$("#closeDialog").addEventListener("click", () => $("#editDialog").close());
$("#editProfileBtn").addEventListener("click", openEditProfile);
$("#profileEditBtn").addEventListener("click", openEditProfile);
$("#headerAvatar").addEventListener("click", () => setPage("profile"));

$("#publishBtn").addEventListener("click", publishPost);
$("#postText").addEventListener("input", () => {
  $("#charCount").textContent = `${$("#postText").value.length}/500`;
});

$("#postText").addEventListener("keydown", event => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    publishPost();
  }
});

document.querySelectorAll("[data-page]").forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    setPage(button.dataset.page);
  });
});

$("#searchInput").addEventListener("input", event => {
  searchTerm = event.target.value;
  if (currentPage === "notifications" || currentPage === "profile") {
    setPage("home");
  } else {
    renderPosts();
  }
});

$("#sortSelect").addEventListener("change", renderPosts);

$("#feed").addEventListener("click", event => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const id = button.dataset.id;

  switch (button.dataset.action) {
    case "like":
      toggleLike(id);
      break;
    case "delete":
      deletePost(id);
      break;
    case "comments":
      commentOpen[id] = !commentOpen[id];
      renderPosts();
      break;
    case "share":
      sharePost(id);
      break;
  }
});

$("#feed").addEventListener("submit", event => {
  if (!event.target.matches(".comment-form")) return;
  event.preventDefault();

  const form = event.target;
  const id = form.dataset.id;
  const input = form.elements.comment;
  addComment(id, input.value);
});

$("#clearNotifications").addEventListener("click", () => {
  if (notifications.length === 0) {
    showToast("Você não tem notificações para limpar.");
    return;
  }

  if (!confirm("Deseja limpar todas as notificações?")) return;

  const previous = notifications;
  notifications = [];

  if (!saveJSON(NOTIFICATIONS_KEY, notifications)) {
    notifications = previous;
    return;
  }

  renderNotifications();
  showToast("Notificações limpas.");
});

function applyTheme(theme) {
  activeTheme = theme;
  document.body.classList.toggle("light", theme === "light");
  $("#themeBtn").textContent = theme === "light" ? "☾" : "☼";
  $("#themeBtn").title = theme === "light" ? "Ativar tema escuro" : "Ativar tema claro";
}

$("#themeBtn").addEventListener("click", () => {
  const next = activeTheme === "dark" ? "light" : "dark";
  if (!saveJSON(THEME_KEY, next)) return;
  applyTheme(next);
  showToast(next === "light" ? "Tema claro ativado ☀️" : "Tema escuro ativado 🌙");
});

$("#welcomeBtn").addEventListener("click", () => {
  setPage("home");
  $("#postText").focus();
  $("#composer").scrollIntoView({ behavior: "smooth", block: "center" });
});

$("#emptyAction").addEventListener("click", () => {
  setPage("home");
  $("#postText").focus();
  $("#composer").scrollIntoView({ behavior: "smooth", block: "center" });
});

document.addEventListener("keydown", event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    $("#searchInput").focus();
  }

  if (event.key === "Escape" && $("#editDialog").open) {
    $("#editDialog").close();
  }
});

// Atualiza os horários exibidos periodicamente.
setInterval(() => {
  if (currentPage === "notifications") renderNotifications();
  else renderPosts();
}, 60000);

// Inicialização
applyTheme(activeTheme);
renderProfile();
renderNotifications();
setPage("home");
