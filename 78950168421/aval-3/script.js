const currentUser = "Juan_244_Rei/delas";
const currentUserAvatar = "https://i.pravatar.cc/150?img=11";

// Lista de Stories
const stories = [
  { user: "Juan_244_Rei/delas", avatar: currentUserAvatar },
  { user: "camila.sol", avatar: "https://i.pravatar.cc/150?img=5" },
  { user: "larissa_rj", avatar: "https://i.pravatar.cc/150?img=9" },
  { user: "bianca.beach", avatar: "https://i.pravatar.cc/150?img=16" },
  { user: "amanda_verao", avatar: "https://i.pravatar.cc/150?img=20" }
];

// Lista inicial de publicações (substitua as URLs de 'imagem' pelas fotos que desejar)
let posts = [
  {
    id: 1,
    usuario: "Juan_244_Rei/delas",
    avatar: currentUserAvatar,
    local: "Praia de Copacabana, RJ",
    imagem: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    curtidas: 142,
    curtido: false,
    salvo: false,
    legenda: "Dia de sol e praia no melhor estilo! ☀️🌊",
    tempo: "Há 1 hora",
    comentarios: [
      { user: "camila.sol", text: "Lugar incrível 🔥" }
    ]
  },
  {
    id: 2,
    usuario: "larissa_rj",
    avatar: "https://i.pravatar.cc/150?img=9",
    local: "Angra dos Reis",
    imagem: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80",
    curtidas: 318,
    curtido: true,
    salvo: false,
    legenda: "Aproveitando o fim de semana na água cristalina ✨🏖️",
    tempo: "Há 4 horas",
    comentarios: [
      { user: "Juan_244_Rei/delas", text: "Top demais!" }
    ]
  }
];

// Elementos do DOM
const storiesBar = document.getElementById("stories-bar");
const feedContainer = document.getElementById("feed-container");
const themeToggle = document.getElementById("theme-toggle");
const newPostBtn = document.getElementById("new-post-btn");
const postModal = document.getElementById("post-modal");
const closeModalBtn = document.getElementById("close-modal");
const newPostForm = document.getElementById("new-post-form");

// Renderiza Stories
function renderStories() {
  storiesBar.innerHTML = stories
    .map(
      (story) => `
      <div class="story-item">
        <div class="story-ring">
          <img src="${story.avatar}" alt="${story.user}">
        </div>
        <span>${story.user}</span>
      </div>
    `
    )
    .join("");
}

// Renderiza Feed
function renderFeed() {
  feedContainer.innerHTML = "";

  posts.forEach((post) => {
    const article = document.createElement("article");
    article.classList.add("post-card");

    const commentsHTML = post.comentarios
      .map((c) => `<p><strong>${c.user}</strong> ${c.text}</p>`)
      .join("");

    article.innerHTML = `
      <div class="post-header">
        <div class="post-user">
          <img src="${post.avatar}" alt="${post.usuario}">
          <div class="user-meta">
            <h4>${post.usuario}</h4>
            <span>${post.local}</span>
          </div>
        </div>
        <span>•••</span>
      </div>

      <div class="post-image-wrapper" ondblclick="doubleClickLike(${post.id})">
        <img src="${post.imagem}" alt="Publicação de ${post.usuario}">
      </div>

      <div class="post-actions">
        <div class="left-actions">
          <button class="action-icon ${post.curtido ? "liked" : ""}" onclick="toggleLike(${post.id})">
            ${post.curtido ? "❤️" : "🤍"}
          </button>
          <button class="action-icon" onclick="focusInput(${post.id})">💬</button>
          <button class="action-icon">➤</button>
        </div>
        <button class="action-icon" onclick="toggleSave(${post.id})">
          ${post.salvo ? "🔖" : "📑"}
        </button>
      </div>

      <div class="post-info">
        <p class="likes-count">${post.curtidas} curtidas</p>
        <p class="caption"><strong>${post.usuario}</strong> ${post.legenda}</p>
        <div class="comments-list">${commentsHTML}</div>
        <p class="post-time">${post.tempo}</p>
      </div>

      <form class="comment-box" onsubmit="addComment(event, ${post.id})">
        <input type="text" id="input-${post.id}" placeholder="Adicione um comentário..." required>
        <button type="submit">Publicar</button>
      </form>
    `;

    feedContainer.appendChild(article);
  });
}

// Curtir / Descurtir
function toggleLike(id) {
  const post = posts.find((p) => p.id === id);
  if (!post) return;

  post.curtido = !post.curtido;
  post.curtidas += post.curtido ? 1 : -1;
  renderFeed();
}

// Duplo clique na foto para curtir
function doubleClickLike(id) {
  const post = posts.find((p) => p.id === id);
  if (!post || post.curtido) return;

  post.curtido = true;
  post.curtidas += 1;
  renderFeed();
}

// Salvar post
function toggleSave(id) {
  const post = posts.find((p) => p.id === id);
  if (!post) return;

  post.salvo = !post.salvo;
  renderFeed();
}

// Focar no campo de comentário
function focusInput(id) {
  const input = document.getElementById(`input-${id}`);
  if (input) input.focus();
}

// Adicionar comentário como Juan_244_Rei/delas
function addComment(event, id) {
  event.preventDefault();
  const input = document.getElementById(`input-${id}`);
  const text = input.value.trim();
  if (!text) return;

  const post = posts.find((p) => p.id === id);
  if (!post) return;

  post.comentarios.push({
    user: currentUser,
    text: text
  });

  renderFeed();
}

// Alternar Modo Claro / Escuro
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// Abrir e fechar modal de nova publicação
newPostBtn.addEventListener("click", () => postModal.classList.add("open"));
closeModalBtn.addEventListener("click", () => postModal.classList.remove("open"));

// Criar nova publicação
newPostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const imgUrl = document.getElementById("img-url").value.trim();
  const location = document.getElementById("post-location").value.trim() || "Brasil";
  const caption = document.getElementById("post-caption").value.trim();

  posts.unshift({
    id: Date.now(),
    usuario: currentUser,
    avatar: currentUserAvatar,
    local: location,
    imagem: imgUrl,
    curtidas: 0,
    curtido: false,
    salvo: false,
    legenda: caption,
    tempo: "Agora mesmo",
    comentarios: []
  });

  newPostForm.reset();
  postModal.classList.remove("open");
  renderFeed();
});

// Inicializar
renderStories();
renderFeed();