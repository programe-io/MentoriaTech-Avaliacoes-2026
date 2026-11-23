// Dados iniciais
const stories = [
  { id: 1, name: "Seu Story", seed: "Alex", seen: false },
  { id: 2, name: "Camila", seed: "Camila", seen: false },
  { id: 3, name: "Bruno", seed: "Bruno", seen: false },
  { id: 4, name: "Mariana", seed: "Mariana", seen: true },
  { id: 5, name: "Rafael", seed: "Rafael", seen: false },
  { id: 6, name: "Juliana", seed: "Juliana", seen: true }
];

const suggestions = [
  { id: 1, name: "Camila Rocha", handle: "@camilarocha", seed: "Camila", following: false },
  { id: 2, name: "Bruno Costa", handle: "@brunodev", seed: "Bruno", following: true },
  { id: 3, name: "Mariana Lima", handle: "@maridesign", seed: "Mariana", following: false }
];

let posts = [
  {
    id: 101,
    author: "Camila Rocha",
    handle: "@camilarocha",
    seed: "Camila",
    time: "há 18 min",
    following: true,
    saved: false,
    liked: false,
    likes: 42,
    content: "Acabei de finalizar o redesign do nosso dashboard usando apenas CSS Grid e variáveis nativas. Minimalismo deixa tudo muito mais rápido! 🚀✨",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
    showComments: false,
    comments: [
      { user: "Bruno Costa", text: "Ficou limpo demais, Camila! Parabéns." }
    ]
  },
  {
    id: 102,
    author: "Bruno Costa",
    handle: "@brunodev",
    seed: "Bruno",
    time: "há 2 horas",
    following: true,
    saved: true,
    liked: true,
    likes: 87,
    content: "Dica rápida do dia: antes de adicionar uma biblioteca externa pesada no seu projeto, verifique se a API nativa do navegador já resolve o problema em 10 linhas de JavaScript.",
    image: "",
    showComments: false,
    comments: []
  },
  {
    id: 103,
    author: "Rafael Mendes",
    handle: "@rafamendes",
    seed: "Rafael",
    time: "há 5 horas",
    following: false,
    saved: false,
    liked: false,
    likes: 29,
    content: "Café passado, fone com cancelamento de ruído e mais uma sessão noturna de código. Bom trabalho a todos! ☕💻",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    showComments: false,
    comments: []
  }
];

let activeTab = "all";
let searchQuery = "";

// Renderizar Stories
function renderStories() {
  const container = document.getElementById("storiesBar");
  container.innerHTML = stories
    .map(
      (s) => `
      <div class="story-item" onclick="toggleStory(${s.id})">
        <div class="story-ring ${s.seen ? "seen" : ""}">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${s.seed}" alt="${s.name}" />
        </div>
        <span>${s.name}</span>
      </div>
    `
    )
    .join("");
}

function toggleStory(id) {
  const story = stories.find((s) => s.id === id);
  if (story) {
    story.seen = !story.seen;
    renderStories();
  }
}

// Renderizar Sugestões
function renderSuggestions() {
  const container = document.getElementById("suggestionsList");
  container.innerHTML = suggestions
    .map(
      (u) => `
      <div class="suggestion-item">
        <div class="suggestion-user">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${u.seed}" alt="${u.name}" />
          <div>
            <strong>${u.name}</strong>
            <small>${u.handle}</small>
          </div>
        </div>
        <button class="follow-btn ${u.following ? "following" : ""}" onclick="toggleFollow(${u.id})">
          ${u.following ? "Seguindo" : "Seguir"}
        </button>
      </div>
    `
    )
    .join("");
}

function toggleFollow(id) {
  const user = suggestions.find((u) => u.id === id);
  if (user) {
    user.following = !user.following;
    renderSuggestions();
  }
}

// Renderizar Feed
function renderFeed() {
  const container = document.getElementById("feedContainer");

  const filtered = posts.filter((post) => {
    if (activeTab === "following" && !post.following) return false;
    if (activeTab === "saved" && !post.saved) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        post.content.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q) ||
        post.handle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div class="card" style="text-align:center; color:var(--text-muted);">Nenhuma publicação encontrada nesta visualização.</div>`;
    return;
  }

  container.innerHTML = filtered
    .map(
      (post) => `
      <article class="card">
        <div class="post-header">
          <div class="post-author">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${post.seed}" alt="${post.author}" class="avatar" />
            <div>
              <h4>${post.author}</h4>
              <span class="post-meta">${post.handle} • ${post.time}</span>
            </div>
          </div>
          <button class="bookmark-btn ${post.saved ? "saved" : ""}" onclick="toggleSave(${post.id})" title="Salvar post">
            ${post.saved ? "🔖" : "📑"}
          </button>
        </div>

        <p class="post-body">${escapeHTML(post.content)}</p>

        ${post.image ? `<img src="${post.image}" alt="Imagem do post" class="post-image" />` : ""}

        <div class="post-stats">
          <span>❤️ ${post.likes} curtidas</span>
          <span>${post.comments.length} comentários</span>
        </div>

        <div class="post-actions">
          <button class="action-btn ${post.liked ? "liked" : ""}" onclick="toggleLike(${post.id})">
            ${post.liked ? "❤️ Curtido" : "🤍 Curtir"}
          </button>
          <button class="action-btn" onclick="toggleComments(${post.id})">
            💬 Comentar
          </button>
          <button class="action-btn" onclick="sharePost(${post.id})">
            🔗 Compartilhar
          </button>
        </div>

        ${
          post.showComments
            ? `
          <div class="comments-section">
            <form class="comment-form" onsubmit="addComment(event, ${post.id})">
              <input type="text" id="input-${post.id}" placeholder="Escreva um comentário..." required />
              <button type="submit">Enviar</button>
            </form>
            <div>
              ${post.comments
                .map(
                  (c) =>
                    `<div class="comment-item"><strong>${escapeHTML(c.user)}:</strong> ${escapeHTML(c.text)}</div>`
                )
                .join("")}
            </div>
          </div>`
            : ""
        }
      </article>
    `
    )
    .join("");
}

// Interações do Post
function toggleLike(id) {
  const post = posts.find((p) => p.id === id);
  if (!post) return;
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  renderFeed();
}

function toggleSave(id) {
  const post = posts.find((p) => p.id === id);
  if (!post) return;
  post.saved = !post.saved;
  renderFeed();
}

function toggleComments(id) {
  const post = posts.find((p) => p.id === id);
  if (!post) return;
  post.showComments = !post.showComments;
  renderFeed();
}

function addComment(event, id) {
  event.preventDefault();
  const input = document.getElementById(`input-${id}`);
  const text = input.value.trim();
  if (!text) return;

  const post = posts.find((p) => p.id === id);
  post.comments.push({ user: "Alex Silva", text });
  renderFeed();
}

function sharePost(id) {
  navigator.clipboard?.writeText(`${window.location.origin}/#post-${id}`);
  alert("Link da publicação copiado para a área de transferência!");
}

// Criar Nova Publicação
document.getElementById("toggleImageBtn").addEventListener("click", () => {
  document.getElementById("imageInputBox").classList.toggle("hidden");
});

document.getElementById("publishBtn").addEventListener("click", () => {
  const textEl = document.getElementById("postText");
  const imgEl = document.getElementById("postImageUrl");
  const content = textEl.value.trim();
  const image = imgEl.value.trim();

  if (!content && !image) return;

  posts.unshift({
    id: Date.now(),
    author: "Alex Silva",
    handle: "@alexsilva",
    seed: "Alex",
    time: "agora mesmo",
    following: true,
    saved: false,
    liked: false,
    likes: 0,
    content,
    image,
    showComments: false,
    comments: []
  });

  textEl.value = "";
  imgEl.value = "";
  document.getElementById("imageInputBox").classList.add("hidden");
  renderFeed();
});

// Navegação de Abas e Busca
document.querySelectorAll(".menu-item").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".menu-item").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeTab = btn.dataset.tab;
    renderFeed();
  });
});

document.getElementById("searchInput").addEventListener("input", (e) => {
  searchQuery = e.target.value;
  renderFeed();
});

// Tema Claro / Escuro
const themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  document.documentElement.setAttribute("data-theme", isDark ? "light" : "dark");
  themeBtn.textContent = isDark ? "🌙" : "☀️";
});

// Prevenção básica contra XSS
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[m]));
}

// Inicialização
renderStories();
renderSuggestions();
renderFeed();