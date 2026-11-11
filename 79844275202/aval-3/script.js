// Estado inicial da aplicação
const state = {
  currentUser: "voce_dev",
  stories: [
    { user: "seu_story", avatar: "https://picsum.photos", seen: false \},
    { user: "ana.codes", avatar: "https://picsum.photos", seen: false \},
    { user: "lucas_ui", avatar: "https://picsum.photos", seen: false \},
    { user: "tech_br", avatar: "https://picsum.photos", seen: true \},
    { user: "marina.js", avatar: "https://picsum.photos", seen: false \},
    { user: "design.daily", avatar: "https://picsum.photos", seen: false \}
  ],
  posts: [
    {
      id: 1,
      user: "ana.codes",
      avatar: "https://picsum.photos",
      location: "São Paulo, Brasil",
      image: "https://picsum.photos",
      likes: 128,
      liked: false,
      saved: false,
      caption: "Finalizando o layout do novo projeto em HTML, CSS e JS puro! 🚀💻",
      comments: [
        { user: "lucas_ui", text: "Ficou muito limpo esse design!" \},
        { user: "marina.js", text: "Show demais 👏" \}
      ]
    \},
    {
      id: 2,
      user: "lucas_ui",
      avatar: "https://picsum.photos",
      location: "Rio de Janeiro",
      image: "https://picsum.photos",
      likes: 342,
      liked: true,
      saved: true,
      caption: "Café e código para começar bem a semana ☕✨",
      comments: [
        { user: "tech_br", text: "Combinação clássica!" \}
      ]
    \}
  ]
\};

// Renderizar Stories
function renderStories() {
  const container = document.getElementById("stories-container");
  container.innerHTML = state.stories.map((story, index) => `
    <div class="story" onclick="viewStory(\${index\})">
      <div class="story-ring \${story.seen ? 'seen' : ''\}">
        <img src="\${story.avatar\}" alt="\${story.user\}">
      </div>
      <span>\${story.user\}</span>
    </div>
  `).join("");
\}

function viewStory(index) {
  state.stories[index].seen = true;
  renderStories();
\}

// Renderizar Feed
function renderFeed() {
  const feed = document.getElementById("feed-container");
  feed.innerHTML = state.posts.map(post => `
    <article class="post" id="post-\${post.id\}">
      <div class="post-header">
        <div class="post-user">
          <img src="\${post.avatar\}" alt="\${post.user\}">
          <div>
            <strong>\${post.user\}</strong>
            <div style="font-size: 0.72rem; color: var(--text-muted);">\${post.location\}</div>
          </div>
        </div>
        <span style="cursor:pointer;">•••</span>
      </div>

      <div class="post-media" ondblclick="doubleClickLike(\${post.id\})">
        <img src="\${post.image\}" alt="Post de \${post.user\}">
        <div class="heart-burst" id="burst-\${post.id\}">❤️</div>
      </div>

      <div class="post-actions">
        <div class="left-actions">
          <button class="action-btn" onclick="toggleLike(\${post.id\})">
            \${post.liked ? "❤️" : "🤍"\}
          </button>
          <button class="action-btn" onclick="focusComment(\${post.id\})">💬</button>
          <button class="action-btn" onclick="alert('Link copiado para compartilhar!')">✈️</button>
        </div>
        <button class="action-btn" onclick="toggleSave(\${post.id\})">
          \${post.saved ? "🔖" : "📑"\}
        </button>
      </div>

      <div class="post-info">
        <div class="likes-count">\${post.likes\} curtidas</div>
        <div class="caption"><strong>\${post.user\}</strong> \${post.caption\}</div>
        <div class="comments-list">
          \${post.comments.map(c => `
            <div class="comment-item"><strong>\${c.user\}</strong> \${c.text\}</div>
          `).join("")\}
        </div>
      </div>

      <form class="comment-form" onsubmit="addComment(event, \${post.id\})">
        <input type="text" id="input-\${post.id\}" placeholder="Adicione um comentário..." required />
        <button type="submit">Publicar</button>
      </form>
    </article>
  `).join("");
\}

// Interações
function toggleLike(id) {
  const post = state.posts.find(p => p.id === id);
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  renderFeed();
\}

function doubleClickLike(id) {
  const post = state.posts.find(p => p.id === id);
  if (!post.liked) {
    post.liked = true;
    post.likes += 1;
    renderFeed();
  \}
  const burst = document.getElementById(`burst-\${id\}`);
  if (burst) {
    burst.classList.add("active");
    setTimeout(() => burst.classList.remove("active"), 600);
  \}
\}

function toggleSave(id) {
  const post = state.posts.find(p => p.id === id);
  post.saved = !post.saved;
  renderFeed();
\}

function focusComment(id) {
  document.getElementById(`input-\${id\}`).focus();
\}

function addComment(event, id) {
  event.preventDefault();
  const input = document.getElementById(`input-\${id\}`);
  const text = input.value.trim();
  if (!text) return;

  const post = state.posts.find(p => p.id === id);
  post.comments.push({ user: state.currentUser, text \});
  renderFeed();
\}

// Alternar Tema Claro/Escuro
document.getElementById("btn-theme").addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
\});

// Modal de Nova Publicação
const modal = document.getElementById("post-modal");
document.getElementById("btn-new-post").addEventListener("click", () => modal.classList.remove("hidden"));
document.getElementById("cancel-post").addEventListener("click", () => modal.classList.add("hidden"));

document.getElementById("publish-post").addEventListener("click", () => {
  const urlInput = document.getElementById("post-img-url").value.trim();
  const captionInput = document.getElementById("post-caption").value.trim();

  const randomSeed = Math.floor(Math.random() * 1000);
  const newPost = {
    id: Date.now(),
    user: state.currentUser,
    avatar: "https://picsum.photos",
    location: "Brasil",
    image: urlInput || `https://picsum.photos{randomSeed\}/600/500`,
    likes: 1,
    liked: true,
    saved: false,
    caption: captionInput || "Nova foto publicada! 📸",
    comments: []
  \};

  state.posts.unshift(newPost);
  document.getElementById("post-img-url").value = "";
  document.getElementById("post-caption").value = "";
  modal.classList.add("hidden");
  renderFeed();
\});

// Inicializar
renderStories();
renderFeed();$0