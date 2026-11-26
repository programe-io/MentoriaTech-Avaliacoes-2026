// Dados Iniciais
const storiesData = [
  { user: "ana.viaja", avatar: "https://unsplash.com", storyImg: "https://unsplash.com" },
  { user: "lucas.dev", avatar: "https://unsplash.com", storyImg: "https://unsplash.com" },
  { user: "cafe.brasil", avatar: "https://unsplash.com", storyImg: "https://unsplash.com" },
  { user: "marina_art", avatar: "https://unsplash.com", storyImg: "https://unsplash.com" }
];

const suggestionsData = [
  { user: "pedro.foto", bio: "Sugerido para você", avatar: "https://unsplash.com", following: false },
  { user: "flora.design", bio: "Novo no Instagram", avatar: "https://unsplash.com", following: false },
  { user: "trilhas_br", bio: "Seguido por ana.viaja", avatar: "https://unsplash.com", following: false }
];

let postsData = [
  {
    id: 1,
    user: "ana.viaja",
    location: "Jericoacoara, Ceará",
    avatar: "https://unsplash.com",
    image: "https://unsplash.com",
    caption: "Fim de tarde inesquecível pé na areia 🌅🌊",
    likes: 342,
    liked: false,
    saved: false,
    time: "HÁ 3 HORAS",
    comments: [
      { user: "lucas.dev", text: "Que lugar incrível!" }
    ]
  },
  {
    id: 2,
    user: "cafe.brasil",
    location: "São Paulo, Brasil",
    avatar: "https://unsplash.com",
    image: "https://unsplash.com",
    caption: "Nada começa antes de um bom café espresso ☕✨",
    likes: 518,
    liked: true,
    saved: true,
    time: "HÁ 6 HORAS",
    comments: [
      { user: "marina_art", text: "Deu vontade agora!" }
    ]
  }
];

// Renderizar Stories
function renderStories() {
  const bar = document.getElementById("storiesBar");
  bar.innerHTML = storiesData.map((s, idx) => `
    <div class="story-item" onclick="openStory(${idx})">
      <div class="story-ring"><img src="${s.avatar}" alt="${s.user}"></div>
      <span>${s.user}</span>
    </div>
  `).join("");
}

// Renderizar Sugestões
function renderSuggestions() {
  const list = document.getElementById("suggestionsList");
  list.innerHTML = suggestionsData.map((s, idx) => `
    <div class="suggestion-row">
      <div class="suggestion-info">
        <img src="${s.avatar}" alt="${s.user}">
        <div>
          <strong>${s.user}</strong>
          <small>${s.bio}</small>
        </div>
      </div>
      <button class="follow-btn ${s.following ? 'following' : ''}" onclick="toggleFollow(${idx})">
        ${s.following ? 'Seguindo' : 'Seguir'}
      </button>
    </div>
  `).join("");
}

function toggleFollow(idx) {
  suggestionsData[idx].following = !suggestionsData[idx].following;
  renderSuggestions();
}

// Renderizar Feed
function renderFeed() {
  const feed = document.getElementById("postsFeed");
  feed.innerHTML = postsData.map(post => `
    <article class="post">
      <header class="post-header">
        <div class="post-user">
          <img src="${post.avatar}" alt="${post.user}">
          <div class="post-user-meta">
            <strong>${post.user}</strong>
            ${post.location ? `<small>${post.location}</small>` : ""}
          </div>
        </div>
      </header>

      <div class="post-media" ondblclick="handleDoubleClick(${post.id}, this)">
        <img src="${post.image}" alt="Post">
        <div class="heart-burst">❤️</div>
      </div>

      <div class="post-actions">
        <div class="action-group">
          <button class="icon-btn" onclick="toggleLike(${post.id})">${post.liked ? "❤️" : "🤍"}</button>
          <button class="icon-btn" onclick="document.getElementById('input-${post.id}').focus()">💬</button>
        </div>
        <button class="icon-btn" onclick="toggleSave(${post.id})">${post.saved ? "🔖" : "🏷️"}</button>
      </div>

      <div class="likes-text">${post.likes} curtidas</div>
      <div class="caption-text"><strong>${post.user}</strong> ${post.caption}</div>

      <div class="comments-area">
        ${post.comments.map(c => `<div class="comment-line"><strong>${c.user}</strong> ${c.text}</div>`).join("")}
      </div>

      <div class="post-time">${post.time}</div>

      <form class="add-comment" onsubmit="submitComment(event, ${post.id})">
        <input type="text" id="input-${post.id}" placeholder="Adicione um comentário..." required>
        <button type="submit">Publicar</button>
      </form>
    </article>
  `).join("");
}

// Ações de Postagem
function toggleLike(id) {
  const post = postsData.find(p => p.id === id);
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  renderFeed();
}

function handleDoubleClick(id, el) {
  const post = postsData.find(p => p.id === id);
  const heart = el.querySelector(".heart-burst");
  heart.classList.add("active");
  setTimeout(() => heart.classList.remove("active"), 600);

  if (!post.liked) {
    post.liked = true;
    post.likes++;
    setTimeout(renderFeed, 650);
  }
}

function toggleSave(id) {
  const post = postsData.find(p => p.id === id);
  post.saved = !post.saved;
  renderFeed();
}

function submitComment(e, id) {
  e.preventDefault();
  const input = document.getElementById(`input-${id}`);
  const post = postsData.find(p => p.id === id);
  post.comments.push({ user: "seu_perfil", text: input.value.trim() });
  renderFeed();
}

// Navegação entre Abas (Feed, Explorar, Salvos)
document.querySelectorAll(".nav-item[data-tab]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const tab = btn.dataset.tab;
    const feedTab = document.getElementById("feedTab");
    const gridTab = document.getElementById("gridTab");
    const photoGrid = document.getElementById("photoGrid");
    const gridTitle = document.getElementById("gridTitle");

    if (tab === "feed") {
      feedTab.classList.remove("hidden");
      gridTab.classList.add("hidden");
    } else {
      feedTab.classList.add("hidden");
      gridTab.classList.remove("hidden");

      const items = tab === "saved" ? postsData.filter(p => p.saved) : postsData;
      gridTitle.textContent = tab === "saved" ? "Itens Salvos" : "Explorar";
      photoGrid.innerHTML = items.length
        ? items.map(p => `<div class="grid-item"><img src="${p.image}" alt=""></div>`).join("")
        : "<p>Nenhuma publicação encontrada.</p>";
    }
  });
});

// Modal de Nova Publicação
const createModal = document.getElementById("createModal");
document.getElementById("openCreateModal").addEventListener("click", () => createModal.classList.remove("hidden"));
document.getElementById("closeCreateModal").addEventListener("click", () => createModal.classList.add("hidden"));

document.getElementById("createPostForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const image = document.getElementById("newImageUrl").value;
  const location = document.getElementById("newLocation").value;
  const caption = document.getElementById("newCaption").value;

  postsData.unshift({
    id: Date.now(),
    user: "seu_perfil",
    location,
    avatar: "https://unsplash.com",
    image,
    caption,
    likes: 1,
    liked: true,
    saved: false,
    time: "AGORA MESMO",
    comments: []
  });

  e.target.reset();
  createModal.classList.add("hidden");
  renderFeed();
});

// Visualizador de Stories
let storyTimer;
function openStory(idx) {
  const story = storiesData[idx];
  const viewer = document.getElementById("storyViewer");
  const fill = document.getElementById("storyProgressFill");

  document.getElementById("storyViewerAvatar").src = story.avatar;
  document.getElementById("storyViewerUser").textContent = story.user;
  document.getElementById("storyViewerImage").src = story.storyImg;

  viewer.classList.remove("hidden");
  fill.style.transition = "none";
  fill.style.width = "0%";

  setTimeout(() => {
    fill.style.transition = "width 3s linear";
    fill.style.width = "100%";
  }, 50);

  clearTimeout(storyTimer);
  storyTimer = setTimeout(closeStory, 3050);
}

function closeStory() {
  document.getElementById("storyViewer").classList.add("hidden");
  clearTimeout(storyTimer);
}

document.getElementById("closeStoryViewer").addEventListener("click", closeStory);

// Inicialização
renderStories();
renderSuggestions();
renderFeed();
