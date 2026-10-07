// ===================== DATA =====================
const storiesData = [
  { username: "Seu story", avatar: "https://i.pravatar.cc/150?img=68", yours: true },
  { username: "ana.codes", avatar: "https://i.pravatar.cc/150?img=5", seen: false },
  { username: "chef.lucas", avatar: "https://i.pravatar.cc/150?img=12", seen: false },
  { username: "viagem.clara", avatar: "https://i.pravatar.cc/150?img=9", seen: false },
  { username: "treino.joao", avatar: "https://i.pravatar.cc/150?img=15", seen: true },
  { username: "pets.mia", avatar: "https://i.pravatar.cc/150?img=20", seen: false },
  { username: "dicas.tech", avatar: "https://i.pravatar.cc/150?img=33", seen: true },
  { username: "arte.sofia", avatar: "https://i.pravatar.cc/150?img=44", seen: false },
  { username: "musica.rafa", avatar: "https://i.pravatar.cc/150?img=51", seen: false }
];

const postsData = [
  {
    id: 1,
    username: "ana.codes",
    avatar: "https://i.pravatar.cc/150?img=5",
    verified: true,
    location: "São Paulo, Brasil",
    emoji: "💻",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    likes: 1284,
    caption: "Quando o código finalmente funciona depois de horas debugando 😭 Quem mais se identifica?",
    hashtags: ["#programação", "#devlife", "#javascript"],
    time: "2 horas",
    commentsCount: 48,
    comments: [
      { user: "dev.pedro", avatar: "https://i.pravatar.cc/150?img=11", text: "Kkk clássico demais 😂", time: "1h" },
      { user: "maria.js", avatar: "https://i.pravatar.cc/150?img=9", text: "Já passei por isso ontem!", time: "45min" }
    ]
  },
  {
    id: 2,
    username: "chef.lucas",
    avatar: "https://i.pravatar.cc/150?img=12",
    verified: false,
    location: "Rio de Janeiro",
    emoji: "🍝",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    likes: 8920,
    caption: "Macarrão cremoso em 15 minutos. Receita completa nos comentários!",
    hashtags: ["#comida", "#receita", "#chef"],
    time: "5 horas",
    commentsCount: 312,
    comments: [
      { user: "foodie.bia", avatar: "https://i.pravatar.cc/150?img=16", text: "Fiz ontem, ficou incrível!!", time: "3h" },
      { user: "cozinheiro", avatar: "https://i.pravatar.cc/150?img=18", text: "Qual queijo você usa?", time: "2h" }
    ]
  },
  {
    id: 3,
    username: "viagem.clara",
    avatar: "https://i.pravatar.cc/150?img=9",
    verified: true,
    location: "Bali, Indonésia",
    emoji: "✈️",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    likes: 15600,
    caption: "Amanhecer em Bali que eu nunca vou esquecer 🌅",
    hashtags: ["#viagem", "#bali", "#travel"],
    time: "8 horas",
    commentsCount: 890,
    comments: [
      { user: "wanderlust", avatar: "https://i.pravatar.cc/150?img=22", text: "Que lugar lindo!!", time: "6h" }
    ]
  },
  {
    id: 4,
    username: "treino.joao",
    avatar: "https://i.pravatar.cc/150?img=15",
    verified: false,
    location: null,
    emoji: "💪",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    likes: 3420,
    caption: "Treino de perna de hoje. Consistência > motivação 🔥",
    hashtags: ["#academia", "#fitness", "#treino"],
    time: "12 horas",
    commentsCount: 156,
    comments: [
      { user: "fit.ana", avatar: "https://i.pravatar.cc/150?img=25", text: "Mandou bem!", time: "10h" }
    ]
  },
  {
    id: 5,
    username: "pets.mia",
    avatar: "https://i.pravatar.cc/150?img=20",
    verified: true,
    location: null,
    emoji: "🐱",
    gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    likes: 28400,
    caption: "Ele descobriu o laser. A casa não é mais a mesma 😂",
    hashtags: ["#gatos", "#pets", "#catsoftiktok"],
    time: "1 dia",
    commentsCount: 1204,
    comments: [
      { user: "cat.lover", avatar: "https://i.pravatar.cc/150?img=30", text: "O meu fica igualzinho kkkk", time: "20h" },
      { user: "dog.dad", avatar: "https://i.pravatar.cc/150?img=32", text: "Gatos são de outro planeta", time: "18h" }
    ]
  },
  {
    id: 6,
    username: "arte.sofia",
    avatar: "https://i.pravatar.cc/150?img=44",
    verified: false,
    location: "Estúdio",
    emoji: "🎨",
    gradient: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
    likes: 5670,
    caption: "Processo completo desse desenho. Demorou 12 horas mas valeu cada segundo ✨",
    hashtags: ["#arte", "#desenho", "#ilustração"],
    time: "2 dias",
    commentsCount: 234,
    comments: [
      { user: "draw.me", avatar: "https://i.pravatar.cc/150?img=41", text: "Que talento!! Que material usa?", time: "1d" }
    ]
  }
];

const suggestionsData = [
  { name: "dev.master", subtitle: "Seguido por ana.codes", avatar: "https://i.pravatar.cc/150?img=60" },
  { name: "food.paradise", subtitle: "Novo no InstaFeed", avatar: "https://i.pravatar.cc/150?img=61" },
  { name: "travel.world", subtitle: "Seguido por viagem.clara", avatar: "https://i.pravatar.cc/150?img=62" },
  { name: "fit.life", subtitle: "Popular", avatar: "https://i.pravatar.cc/150?img=63" },
  { name: "art.daily", subtitle: "Seguido por arte.sofia + 3", avatar: "https://i.pravatar.cc/150?img=64" }
];

// ===================== HELPERS =====================
function formatNumber(num) {
  return num.toLocaleString("pt-BR");
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

// ===================== RENDER =====================
function renderStories() {
  const container = document.getElementById("stories");
  container.innerHTML = storiesData.map(s => `
    <div class="story-item ${s.yours ? "your-story" : ""}">
      <div class="story-ring ${s.seen ? "seen" : ""}">
        <img src="${s.avatar}" alt="${s.username}" loading="lazy">
        ${s.yours ? '<div class="story-add"><i class="fa-solid fa-plus"></i></div>' : ""}
      </div>
      <span class="story-user">${s.username}</span>
    </div>
  `).join("");
}

function createPost(post) {
  const el = document.createElement("article");
  el.className = "post";
  el.dataset.id = post.id;

  const hashtagsHTML = post.hashtags.map(h => `<span class="hashtag">${h}</span>`).join(" ");

  el.innerHTML = `
    <div class="post-header">
      <div class="avatar-ring">
        <img src="${post.avatar}" alt="${post.username}" loading="lazy">
      </div>
      <div class="post-user-info">
        <div class="username">
          ${post.username}
          ${post.verified ? '<i class="fa-solid fa-circle-check verified"></i>' : ""}
        </div>
        ${post.location ? `<div class="location">${post.location}</div>` : ""}
      </div>
      <button class="post-options" aria-label="Opções">
        <i class="fa-solid fa-ellipsis"></i>
      </button>
    </div>

    <div class="post-media">
      <div class="media-bg" style="background: ${post.gradient}"></div>
      <div class="media-emoji">${post.emoji}</div>
      <i class="fa-solid fa-heart double-tap-heart"></i>
    </div>

    <div class="post-actions">
      <div class="action-left">
        <button class="action-btn like-btn" data-liked="false" aria-label="Curtir">
          <i class="fa-regular fa-heart"></i>
        </button>
        <button class="action-btn comment-btn" aria-label="Comentar">
          <i class="fa-regular fa-comment"></i>
        </button>
        <button class="action-btn share-btn" aria-label="Compartilhar">
          <i class="fa-regular fa-paper-plane"></i>
        </button>
      </div>
      <button class="action-btn save-btn" data-saved="false" aria-label="Salvar">
        <i class="fa-regular fa-bookmark"></i>
      </button>
    </div>

    <div class="post-likes">${formatNumber(post.likes)} curtidas</div>

    <div class="post-caption">
      <span class="username">${post.username}</span>${post.caption} ${hashtagsHTML}
    </div>

    <button class="post-comments-preview">
      Ver todos os ${formatNumber(post.commentsCount)} comentários
    </button>

    <div class="post-time">${post.time}</div>

    <div class="post-add-comment">
      <button class="emoji-btn" aria-label="Emoji"><i class="fa-regular fa-face-smile"></i></button>
      <input type="text" placeholder="Adicione um comentário..." data-post-id="${post.id}">
      <button class="publish-btn">Publicar</button>
    </div>
  `;

  return el;
}

function renderFeed() {
  const feed = document.getElementById("feed");
  postsData.forEach(post => feed.appendChild(createPost(post)));
}

function renderSuggestions() {
  const list = document.getElementById("suggestionsList");
  if (!list) return;
  list.innerHTML = suggestionsData.map(s => `
    <div class="suggestion-item">
      <img src="${s.avatar}" alt="${s.name}" loading="lazy">
      <div class="suggestion-info">
        <div class="name">${s.name}</div>
        <div class="subtitle">${s.subtitle}</div>
      </div>
      <button class="follow-btn">Seguir</button>
    </div>
  `).join("");
}

// ===================== INTERACTIONS =====================
let currentPostId = null;

function setupInteractions() {
  const feed = document.getElementById("feed");

  // Double-tap to like on media
  feed.addEventListener("click", (e) => {
    const media = e.target.closest(".post-media");
    if (!media) return;

    const post = media.closest(".post");
    const now = Date.now();

    if (post._lastTap && now - post._lastTap < 300) {
      const likeBtn = post.querySelector(".like-btn");
      if (likeBtn.dataset.liked === "false") {
        toggleLike(likeBtn, post);
      }
      const heart = media.querySelector(".double-tap-heart");
      heart.classList.remove("show");
      void heart.offsetWidth;
      heart.classList.add("show");
      post._lastTap = 0;
      return;
    }
    post._lastTap = now;
  });

  // Action buttons
  feed.addEventListener("click", (e) => {
    const likeBtn = e.target.closest(".like-btn");
    if (likeBtn) {
      const post = likeBtn.closest(".post");
      toggleLike(likeBtn, post);
      return;
    }

    const saveBtn = e.target.closest(".save-btn");
    if (saveBtn) {
      toggleSave(saveBtn);
      return;
    }

    const commentBtn = e.target.closest(".comment-btn");
    if (commentBtn) {
      const post = commentBtn.closest(".post");
      openComments(Number(post.dataset.id));
      return;
    }

    const shareBtn = e.target.closest(".share-btn");
    if (shareBtn) {
      showToast("Link copiado!");
      return;
    }

    const commentsPreview = e.target.closest(".post-comments-preview");
    if (commentsPreview) {
      const post = commentsPreview.closest(".post");
      openComments(Number(post.dataset.id));
      return;
    }

    const optionsBtn = e.target.closest(".post-options");
    if (optionsBtn) {
      showToast("Opções do post");
      return;
    }
  });

  // Inline comment publish
  feed.addEventListener("input", (e) => {
    if (e.target.matches(".post-add-comment input")) {
      const btn = e.target.parentElement.querySelector(".publish-btn");
      btn.classList.toggle("active", e.target.value.trim().length > 0);
    }
  });

  feed.addEventListener("click", (e) => {
    const publishBtn = e.target.closest(".publish-btn");
    if (publishBtn && publishBtn.classList.contains("active")) {
      const input = publishBtn.parentElement.querySelector("input");
      const postId = Number(input.dataset.postId);
      const text = input.value.trim();
      if (!text) return;

      const post = postsData.find(p => p.id === postId);
      if (post) {
        post.comments.push({
          user: "voce.usuario",
          avatar: "https://i.pravatar.cc/150?img=68",
          text,
          time: "agora"
        });
        post.commentsCount += 1;
        const preview = publishBtn.closest(".post").querySelector(".post-comments-preview");
        preview.textContent = `Ver todos os ${formatNumber(post.commentsCount)} comentários`;
      }

      input.value = "";
      publishBtn.classList.remove("active");
      showToast("Comentário publicado!");
    }
  });

  // Suggestions follow
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".follow-btn");
    if (btn && !btn.closest(".modal")) {
      if (btn.classList.contains("following")) {
        btn.classList.remove("following");
        btn.textContent = "Seguir";
      } else {
        btn.classList.add("following");
        btn.textContent = "Seguindo";
        showToast("Seguindo!");
      }
    }
  });

  // Stories click
  document.getElementById("stories").addEventListener("click", (e) => {
    const item = e.target.closest(".story-item");
    if (item) {
      showToast(item.classList.contains("your-story") ? "Criar story" : "Abrindo story...");
    }
  });

  // Bottom nav
  document.querySelectorAll(".bottom-nav .nav-item").forEach(item => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".bottom-nav .nav-item").forEach(i => i.classList.remove("active"));