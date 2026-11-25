
/* =================================
   CONFIGURAÇÕES E DADOS
================================= */

const me = "meu_perfil";

const defaultPosts = [
  {
    id: 1,
    user: "natureza_linda",
    avatar: "https://i.pravatar.cc/100?img=32",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=900",
    caption: "A beleza da natureza está nos pequenos detalhes! 🌸",
    likes: 125,
    liked: false,
    saved: false,
    comments: [
      { user: "ana", text: "Que foto maravilhosa!" },
      { user: "pedro", text: "Amei as flores!" }
    ],
    time: "2 HORAS ATRÁS"
  },
  {
    id: 2,
    user: "viagem_perfeita",
    avatar: "https://i.pravatar.cc/100?img=44",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900",
    caption: "Um lugar para esquecer do mundo. 🌿",
    likes: 89,
    liked: false,
    saved: false,
    comments: [],
    time: "5 HORAS ATRÁS"
  },
  {
    id: 3,
    user: "fotografia_diaria",
    avatar: "https://i.pravatar.cc/100?img=15",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900",
    caption: "Colecionando momentos especiais! ✨",
    likes: 243,
    liked: false,
    saved: false,
    comments: [],
    time: "1 DIA ATRÁS"
  }
];

const defaultStories = [
  { user: "ana", avatar: "https://i.pravatar.cc/100?img=5", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=900" },
  { user: "pedro", avatar: "https://i.pravatar.cc/100?img=12", image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900" },
  { user: "mariana", avatar: "https://i.pravatar.cc/100?img=25", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900" },
  { user: "lucas", avatar: "https://i.pravatar.cc/100?img=13", image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=900" },
  { user: "juliana", avatar: "https://i.pravatar.cc/100?img=47", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900" }
];

const defaultSuggestions = [
  { user: "carol_fotos", avatar: "https://i.pravatar.cc/100?img=23" },
  { user: "mundo_natural", avatar: "https://i.pravatar.cc/100?img=34" },
  { user: "estilo_urbano", avatar: "https://i.pravatar.cc/100?img=45" },
  { user: "vida_colorida", avatar: "https://i.pravatar.cc/100?img=19" }
];

function loadData(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

let posts = loadData("instagram_posts", defaultPosts);
let stories = defaultStories;
let following = loadData("instagram_following", []);
let notifications = loadData("instagram_notifications", [
  "Bem-vindo ao seu Instagram Clone!",
  "Você pode curtir, comentar e criar publicações."
]);
let messages = loadData("instagram_messages", []);
let activeStory = 0;
let currentPage = "inicio";

/* =================================
   ELEMENTOS E FUNÇÕES AUXILIARES
================================= */

const feed = document.getElementById("feed");
const storiesContainer = document.getElementById("stories");
const suggestionsContainer = document.getElementById("suggestions");
const otherPage = document.getElementById("other-page");

function saveData() {
  try {
    localStorage.setItem("instagram_posts", JSON.stringify(posts));
    localStorage.setItem("instagram_following", JSON.stringify(following));
    localStorage.setItem("instagram_notifications", JSON.stringify(notifications));
    localStorage.setItem("instagram_messages", JSON.stringify(messages));
  } catch (error) {
    alert("Não foi possível salvar os dados. Tente usar uma imagem menor.");
  }
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

function openModal(id) {
  document.getElementById(id).classList.remove("hidden");
}

function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
}

/* =================================
   STORIES
================================= */

function renderStories() {
  storiesContainer.innerHTML = stories.map((story, index) => `
    <div class="story" data-story="${index}">
      <img src="${story.avatar}" alt="${escapeHTML(story.user)}">
      <p>${escapeHTML(story.user)}</p>
    </div>
  `).join("");
}

function showStory(index) {
  if (index < 0 || index >= stories.length) return;

  activeStory = index;
  const story = stories[index];

  document.getElementById("story-name").textContent = story.user;
  document.getElementById("story-image").src = story.image;
  document.getElementById("story-progress-bar").style.width = "100%";

  openModal("story-modal");
}

storiesContainer.addEventListener("click", event => {
  const item = event.target.closest("[data-story]");
  if (item) showStory(Number(item.dataset.story));
});

document.getElementById("story-next").addEventListener("click", () => {
  if (activeStory < stories.length - 1) {
    showStory(activeStory + 1);
  } else {
    closeModal("story-modal");
  }
});

document.getElementById("story-prev").addEventListener("click", () => {
  showStory(Math.max(0, activeStory - 1));
});

document.getElementById("close-story").addEventListener("click", () => {
  closeModal("story-modal");
});

/* =================================
   PUBLICAÇÕES
================================= */

function renderPosts(list = posts) {
  feed.innerHTML = list.map(post => `
    <article class="post" data-post="${post.id}">

      <div class="post-header">
        <img src="${post.avatar}" alt="Foto de ${escapeHTML(post.user)}">

        <div class="post-user">
          <strong>${escapeHTML(post.user)}</strong>
          <small>Brasil</small>
        </div>

        <button class="more-btn" data-delete="${post.id}" title="Opções">•••</button>
      </div>

      <img class="post-image"
        src="${post.image}"
        alt="Publicação de ${escapeHTML(post.user)}"
        loading="lazy">

      <div class="post-actions">
        <button class="action-btn ${post.liked ? "liked" : ""}"
          data-like="${post.id}" title="Curtir">
          ${post.liked ? "♥" : "♡"}
        </button>

        <button class="action-btn" data-focus-comment="${post.id}" title="Comentar">▢</button>

        <button class="action-btn" data-share="${post.id}" title="Compartilhar">➤</button>

        <button class="action-btn save-btn"
          data-save="${post.id}" title="Salvar">
          ${post.saved ? "▣" : "♧"}
        </button>
      </div>

      <div class="post-info">
        <p class="likes">${post.likes} curtidas</p>

        <p class="caption">
          <strong>${escapeHTML(post.user)}</strong>
          ${escapeHTML(post.caption)}
        </p>

        <button class="view-comments" data-show-comments="${post.id}">
          Ver todos os ${post.comments.length} comentários
        </button>

        <div class="comment-list" id="comments-${post.id}">
          ${post.comments.map(comment => `
            <p class="comment">
              <strong>${escapeHTML(comment.user)}</strong>
              ${escapeHTML(comment.text)}
            </p>
          `).join("")}
        </div>

        <form class="comment-form" data-comment="${post.id}">
          <input type="text" placeholder="Adicione um comentário..." maxlength="300" required>
          <button type="submit">Publicar</button>
        </form>

        <p class="post-time">${escapeHTML(post.time)}</p>
      </div>

    </article>
  `).join("");
}

/* =================================
   CURTIDAS, COMENTÁRIOS E AÇÕES
================================= */

feed.addEventListener("click", event => {
  const likeButton = event.target.closest("[data-like]");
  const saveButton = event.target.closest("[data-save]");
  const commentButton = event.target.closest("[data-focus-comment]");
  const showCommentsButton = event.target.closest("[data-show-comments]");
  const shareButton = event.target.closest("[data-share]");
  const deleteButton = event.target.closest("[data-delete]");

  if (likeButton) {
    const post = posts.find(p => p.id === Number(likeButton.dataset.like));
    if (!post) return;

    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;

    if (post.liked) {
      notifications.unshift(`Você curtiu a publicação de ${post.user}.`);
    }

    saveData();
    renderPosts();
  }

  if (saveButton) {
    const post = posts.find(p => p.id === Number(saveButton.dataset.save));
    if (!post) return;

    post.saved = !post.saved;
    saveData();
    renderPosts();
  }

  if (commentButton) {
    const id = commentButton.dataset.focusComment;
    const input = document.querySelector(`[data-comment="${id}"] input`);
    input?.focus();
  }

  if (showCommentsButton) {
    const id = showCommentsButton.dataset.showComments;
    document.getElementById(`comments-${id}`).classList.toggle("hidden");
  }

  if (shareButton) {
    const post = posts.find(p => p.id === Number(shareButton.dataset.share));
    if (!post) return;

    const shareText = `${post.caption}\n${post.image}`;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(shareText)
        .then(() => alert("Informações da publicação copiadas!"))
        .catch(() => alert(shareText));
    } else {
      alert(shareText);
    }
  }

  if (deleteButton) {
    const post = posts.find(p => p.id === Number(deleteButton.dataset.delete));
    if (!post) return;

    if (post.user !== me) {
      alert("Você só pode excluir suas próprias publicações.");
      return;
    }

    if (confirm("Deseja excluir esta publicação?")) {
      posts = posts.filter(p => p.id !== post.id);
      saveData();
      renderPosts();
    }
  }
});

feed.addEventListener("dblclick", event => {
  if (!event.target.classList.contains("post-image")) return;

  const article = event.target.closest("[data-post]");
  const post = posts.find(p => p.id === Number(article.dataset.post));

  if (post && !post.liked) {
    post.liked = true;
    post.likes++;
    saveData();
    renderPosts();
  }
});

feed.addEventListener("submit", event => {
  const form = event.target.closest("[data-comment]");
  if (!form) return;

  event.preventDefault();

  const id = Number(form.dataset.comment);
  const input = form.querySelector("input");
  const text = input.value.trim();

  if (!text) return;

  const post = posts.find(p => p.id === id);
  if (!post) return;

  post.comments.push({ user: me, text });
  saveData();
  renderPosts();
});

/* =================================
   CRIAR PUBLICAÇÃO
================================= */

function openCreate() {
  openModal("create-modal");
}

document.getElementById("menu-create").addEventListener("click", openCreate);

document.getElementById("create-form").addEventListener("submit", event => {
  event.preventDefault();

  const file = document.getElementById("post-image").files[0];
  const caption = document.getElementById("post-caption").value.trim();

  if (!file) {
    alert("Escolha uma imagem primeiro.");
    return;
  }

  if (!file.type.startsWith("image/")) {
    alert("Selecione um arquivo de imagem válido.");
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    alert("A imagem deve ter no máximo 2 MB.");
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    const newPost = {
      id: Date.now(),
      user: me,
      avatar: "https://i.pravatar.cc/100?img=12",
      image: reader.result,
      caption,
      likes: 0,
      liked: false,
      saved: false,
      comments: [],
      time: "AGORA"
    };

    posts.unshift(newPost);
    saveData();
    renderPosts();
    closeModal("create-modal");
    event.target.reset();
    showPage("inicio");

    alert("Publicação criada com sucesso!");
  };

  reader.onerror = () => alert("Não foi possível carregar a imagem.");

  reader.readAsDataURL(file);
});

/* =================================
   SUGESTÕES E SEGUIR
================================= */

function renderSuggestions() {
  suggestionsContainer.innerHTML = defaultSuggestions.map(user => {
    const isFollowing = following.includes(user.user);

    return `
      <div class="suggestion-user">
        <img src="${user.avatar}" alt="">
        <div>
          <strong>${escapeHTML(user.user)}</strong>
          <small>Recomendado para você</small>
        </div>
        <button class="follow-btn" data-follow="${user.user}">
          ${isFollowing ? "Seguindo" : "Seguir"}
        </button>
      </div>
    `;
  }).join("");
}

suggestionsContainer.addEventListener("click", event => {
  const button = event.target.closest("[data-follow]");
  if (!button) return;

  const user = button.dataset.follow;

  if (following.includes(user)) {
    following = following.filter(name => name !== user);
  } else {
    following.push(user);
  }

  saveData();
  renderSuggestions();
});

/* =================================
   PESQUISA
================================= */

function showSearch() {
  otherPage.innerHTML = `
    <h2>Pesquisar</h2>
    <input id="search-input" type="search"
      placeholder="Pesquisar usuários ou publicações..."
      style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px">

    <div id="search-results" style="margin-top:20px"></div>
  `;

  otherPage.classList.remove("hidden");
  feed.classList.add("hidden");
  storiesContainer.classList.add("hidden");

  const input = document.getElementById("search-input");

  input.addEventListener("input", () => {
    const term = input.value.toLowerCase().trim();

    const results = posts.filter(post =>
      post.user.toLowerCase().includes(term) ||
      post.caption.toLowerCase().includes(term)
    );

    document.getElementById("search-results").innerHTML = term
      ? results.map(post => `
          <p style="padding:12px;border-bottom:1px solid #eee">
            <strong>${escapeHTML(post.user)}</strong> —
            ${escapeHTML(post.caption)}
          </p>
        `).join("") || "<p>Nenhuma publicação encontrada.</p>"
      : "<p>Digite algo para pesquisar.</p>";
  });

  input.focus();
}

/* =================================
   EXPLORAR
================================= */

function showExplore() {
  otherPage.innerHTML = `
    <h2>Explorar</h2>
    <div class="explore-grid">
      ${posts.map(post => `
        <img src="${post.image}" alt="${escapeHTML(post.caption)}"
          title="${escapeHTML(post.caption)}">
      `).join("")}
    </div>
  `;

  showOtherPage();
}

/* =================================
   PERFIL
================================= */

function showProfile() {
  const myPosts = posts.filter(post => post.user === me);
  const savedPosts = posts.filter(post => post.saved);

  otherPage.innerHTML = `
    <div class="profile-header">
      <img src="https://i.pravatar.cc/100?img=12" alt="Minha foto">
      <div>
        <h2>${me}</h2>
        <p>${myPosts.length} publicações</p>
        <p>${following.length} seguindo</p>
        <p>Bem-vindo ao meu perfil! ✨</p>
      </div>
    </div>

    <h3>Minhas publicações</h3>
    <div class="explore-grid">
      ${myPosts.map(post => `
        <img src="${post.image}" alt="${escapeHTML(post.caption)}">
      `).join("") || "<p>Você ainda não publicou nenhuma foto.</p>"}
    </div>

    <h3 style="margin-top:25px">Publicações salvas</h3>
    <div class="explore-grid">
      ${savedPosts.map(post => `
        <img src="${post.image}" alt="${escapeHTML(post.caption)}">
      `).join("") || "<p>Nenhuma publicação salva.</p>"}
    </div>
  `;

  showOtherPage();
}

/* =================================
   REELS DEMONSTRATIVO
================================= */

function showReels() {
  otherPage.innerHTML = `
    <h2>Reels</h2>
    <p>Área demonstrativa de vídeos curtos.</p>
    <p>Para adicionar vídeos reais, é necessário implementar o envio e a reprodução de arquivos de vídeo.</p>
  `;

  showOtherPage();
}

/* =================================
   MENSAGENS
================================= */

function renderMessages() {
  const content = document.getElementById("chat-content");

  content.innerHTML = messages.map(message => `
    <div class="chat-message ${message.user === me ? "mine" : ""}">
      <strong>${escapeHTML(message.user)}</strong><br>
      ${escapeHTML(message.text)}
    </div>
  `).join("") || '<p class="empty-chat">Nenhuma mensagem ainda. Envie uma mensagem!</p>';

  content.scrollTop = content.scrollHeight;
}

document.getElementById("chat-form").addEventListener("submit", event => {
  event.preventDefault();

  const input = document.getElementById("message-input");
  const text = input.value.trim();

  if (!text) return;

  messages.push({ user: me, text });
  saveData();
  renderMessages();
  input.value = "";
});

function showMessages() {
  renderMessages();
  openModal("message-modal");
}

/* =================================
   NOTIFICAÇÕES
================================= */

function showNotifications() {
  document.getElementById("notification-list").innerHTML =
    notifications.map(notification => `
      <div class="notification-item">
        ♡ ${escapeHTML(notification)}
      </div>
    `).join("");

  openModal("notification-modal");
}

/* =================================
   NAVEGAÇÃO
================================= */

function showOtherPage() {
  feed.classList.add("hidden");
  storiesContainer.classList.add("hidden");
  otherPage.classList.remove("hidden");
}

function showPage(page) {
  currentPage = page;

  document.querySelectorAll(".nav-btn").forEach(button => {
    button.classList.toggle("active", button.dataset.page === page);
  });

  feed.classList.remove("hidden");
  storiesContainer.classList.remove("hidden");
  otherPage.classList.add("hidden");

  switch (page) {
    case "inicio":
      renderPosts();
      break;

    case "pesquisa":
      showSearch();
      break;

    case "explorar":
      showExplore();
      break;

    case "reels":
      showReels();
      break;

    case "mensagens":
      showMessages();
      break;

    case "notificacoes":
      showNotifications();
      break;

    case "perfil":
      showProfile();
      break;

    case "mais":
      alert("Você está usando o Instagram Clone!");
      break;
  }
}

document.querySelectorAll("[data-page]").forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.page);
  });
});

/* =================================
   FECHAR MODAIS
================================= */

document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", () => {
    closeModal(button.dataset.close);
  });
});

document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", event => {
    if (event.target === modal) {
      modal.classList.add("hidden");
    }
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal").forEach(modal => {
      modal.classList.add("hidden");
    });
  }
});

/* =================================
   INICIALIZAÇÃO
================================= */

function init() {
  renderStories();
  renderPosts();
  renderSuggestions();
}

init();
