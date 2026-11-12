// Banco de dados inicial simulado
const storiesData = [
  { id: 1, user: "ana_ui", avatar: "https://unsplash.com", image: "https://unsplash.com", seen: false \},
  { id: 2, user: "carlos.tech", avatar: "https://unsplash.com", image: "https://unsplash.com", seen: false \},
  { id: 3, user: "viagens_br", avatar: "https://unsplash.com", image: "https://unsplash.com", seen: false \},
  { id: 4, user: "chef_lucas", avatar: "https://unsplash.com", image: "https://unsplash.com", seen: false \}
];

let postsData = [
  {
    id: 101,
    user: "ana_ui",
    location: "São Paulo, Brasil",
    avatar: "https://unsplash.com",
    image: "https://unsplash.com",
    filter: "none",
    likes: 142,
    liked: false,
    saved: false,
    caption: "Finalizando mais um projeto de interface! O que acharam desse setup minimalista? 💻✨",
    time: "HÁ 2 HORAS",
    comments: [
      { user: "carlos.tech", text: "Ficou incrível demais!" \},
      { user: "dev_criativo", text: "Inspiração pura 🔥" \}
    ]
  \},
  {
    id: 102,
    user: "viagens_br",
    location: "Lençóis Maranhenses, MA",
    avatar: "https://unsplash.com",
    image: "https://unsplash.com",
    filter: "contrast(115%)",
    likes: 389,
    liked: true,
    saved: true,
    caption: "Um paraíso chamado Nordeste. Quem aí também ama viajar? 🌊☀️",
    time: "HÁ 5 HORAS",
    comments: [
      { user: "chef_lucas", text: "Lugar sensacional!" \}
    ]
  \}
];

const suggestionsData = [
  { user: "mariana_foto", name: "Mariana Fotografia", avatar: "https://unsplash.com", following: false \},
  { user: "code_academy", name: "Academia do Código", avatar: "https://unsplash.com", following: false \},
  { user: "arte_digital", name: "Estúdio Arte", avatar: "https://unsplash.com", following: false \}
];

let currentFilterMode = 'all';
let storyTimer = null;

// Renderiza os Stories
function renderStories() {
  const bar = document.getElementById("stories-bar");
  bar.innerHTML = storiesData.map(story => `
    <div class="story-item" onclick="openStory(\${story.id\})">
      <div class="story-ring \${story.seen ? 'seen' : ''\}">
        <img src="\${story.avatar\}" alt="\${story.user\}">
      </div>
      <span>\${story.user\}</span>
    </div>
  `).join("");
\}

// Renderiza o Feed
function renderFeed() {
  const feed = document.getElementById("feed");
  const filteredPosts = currentFilterMode === 'saved' 
    ? postsData.filter(p => p.saved) 
    : postsData;

  if (filteredPosts.length === 0) {
    feed.innerHTML = `<p style="text-align:center; color: var(--text-secondary); margin-top: 40px;">Nenhuma publicação salva ainda.</p>`;
    return;
  \}

  feed.innerHTML = filteredPosts.map(post => `
    <article class="post-card">
      <div class="post-header">
        <div class="post-user">
          <img src="\${post.avatar\}" alt="\${post.user\}">
          <div class="post-user-info">
            <strong>\${post.user\}</strong>
            <span>\${post.location\}</span>
          </div>
        </div>
        <span>•••</span>
      </div>

      <div class="post-image-wrapper" ondblclick="doubleClickLike(\${post.id\})">
        <img src="\${post.image\}" style="filter: \${post.filter\}" alt="Post">
        <div class="big-heart" id="heart-\${post.id\}">❤️</div>
      </div>

      <div class="post-actions">
        <div class="left-actions">
          <button class="action-btn" onclick="toggleLike(\${post.id\})">
            \${post.liked ? '❤️' : '🤍'\}
          </button>
          <button class="action-btn" onclick="focusComment(\${post.id\})">💬</button>
          <button class="action-btn" onclick="alert('Link copiado para a área de transferência!')">📤</button>
        </div>
        <button class="action-btn" onclick="toggleSave(\${post.id\})">
          \${post.saved ? '🔖' : '📑'\}
        </button>
      </div>

      <div class="post-details">
        <span class="likes-count">\${post.likes\} curtidas</span>
        <p class="caption"><strong>\${post.user\}</strong> \${post.caption\}</p>
        
        <div class="comments-list">
          \${post.comments.map(c => `
            <div class="comment-item"><strong>\${c.user\}</strong> \${c.text\}</div>
          `).join("")\}
        </div>
        <span class="post-time">\${post.time\}</span>
      </div>

      <form class="comment-form" onsubmit="addComment(event, \${post.id\})">
        <input type="text" id="input-\${post.id\}" placeholder="Adicione um comentário..." required>
        <button type="submit">Publicar</button>
      </form>
    </article>
  `).join("");
\}

// Renderiza Sugestões
function renderSuggestions() {
  const list = document.getElementById("suggestions-list");
  list.innerHTML = suggestionsData.map((s, idx) => `
    <div class="suggestion-item">
      <div class="suggestion-user">
        <img src="\${s.avatar\}" alt="\${s.user\}">
        <div>
          <strong>\${s.user\}</strong>
          <small>\${s.name\}</small>
        </div>
      </div>
      <button class="follow-btn \${s.following ? 'following' : ''\}" onclick="toggleFollow(\${idx\})">
        \${s.following ? 'Seguindo' : 'Seguir'\}
      </button>
    </div>
  `).join("");
\}

// Interações de Curtida
function toggleLike(id) {
  const post = postsData.find(p => p.id === id);
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  renderFeed();
\}

function doubleClickLike(id) {
  const post = postsData.find(p => p.id === id);
  if (!post.liked) {
    post.liked = true;
    post.likes += 1;
    renderFeed();
  \}
  const heart = document.getElementById(`heart-\${id\}`);
  if (heart) {
    heart.classList.add("show");
    setTimeout(() => heart.classList.remove("show"), 700);
  \}
\}

// Salvar Post
function toggleSave(id) {
  const post = postsData.find(p => p.id === id);
  post.saved = !post.saved;
  renderFeed();
\}

// Comentários
function addComment(e, id) {
  e.preventDefault();
  const input = document.getElementById(`input-\${id\}`);
  const text = input.value.trim();
  if (!text) return;

  const post = postsData.find(p => p.id === id);
  post.comments.push({ user: "dev_criativo", text \});
  renderFeed();
\}

function focusComment(id) {
  document.getElementById(`input-\${id\}`).focus();
\}

// Seguir Usuários
function toggleFollow(index) {
  suggestionsData[index].following = !suggestionsData[index].following;
  renderSuggestions();
\}

// Stories Modal e Barra de Progresso
function openStory(id) {
  const story = storiesData.find(s => s.id === id);
  story.seen = true;
  renderStories();

  document.getElementById("story-avatar").src = story.avatar;
  document.getElementById("story-username").innerText = story.user;
  document.getElementById("story-image").src = story.image;
  document.getElementById("story-modal").classList.add("active");

  const progress = document.getElementById("story-progress");
  progress.style.transition = "none";
  progress.style.width = "0%";

  setTimeout(() => {
    progress.style.transition = "width 4s linear";
    progress.style.width = "100%";
  \}, 50);

  clearTimeout(storyTimer);
  storyTimer = setTimeout(closeStory, 4050);
\}

function closeStory() {
  clearTimeout(storyTimer);
  document.getElementById("story-modal").classList.remove("active");
\}

// Criar Novo Post
function openCreateModal() {
  document.getElementById("create-modal").classList.add("active");
\}

function closeCreateModal() {
  document.getElementById("create-modal").classList.remove("active");
\}

function updatePreview() {
  const customUrl = document.getElementById("custom-img-url").value.trim();
  const presetUrl = document.getElementById("preset-images").value;
  const filter = document.getElementById("image-filter").value;

  const preview = document.getElementById("new-post-preview");
  preview.src = customUrl || presetUrl;
  preview.style.filter = filter;
\}

function publishPost() {
  const customUrl = document.getElementById("custom-img-url").value.trim();
  const presetUrl = document.getElementById("preset-images").value;
  const filter = document.getElementById("image-filter").value;
  const location = document.getElementById("new-post-location").value.trim() || "Brasil";
  const caption = document.getElementById("new-post-caption").value.trim() || "Nova foto compartilhada!";

  postsData.unshift({
    id: Date.now(),
    user: "dev_criativo",
    location,
    avatar: "https://unsplash.com",
    image: customUrl || presetUrl,
    filter,
    likes: 1,
    liked: true,
    saved: false,
    caption,
    time: "AGORA MESMO",
    comments: []
  \});

  document.getElementById("custom-img-url").value = "";
  document.getElementById("new-post-caption").value = "";
  closeCreateModal();
  renderFeed();
\}

// Alternar Filtro de Feed e Tema Escuro
function filterFeed(mode, btn) {
  currentFilterMode = mode;
  document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));
  btn.classList.add("active");
  renderFeed();
\}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  document.getElementById("theme-icon").innerText = isDark ? "☀️" : "🌙";
\}

// Inicialização
renderStories();
renderFeed();
renderSuggestions();$0