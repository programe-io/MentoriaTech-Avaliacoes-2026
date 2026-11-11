// Estado inicial da aplicação
const state = {
  currentUser: {
    username: "dev_ana",
    avatar: "https://unsplash.com"
  \},
  stories: [
    { id: 1, username: "lucas_ui", avatar: "https://unsplash.com", storyImg: "https://unsplash.com", viewed: false \},
    { id: 2, username: "mari.code", avatar: "https://unsplash.com", storyImg: "https://unsplash.com", viewed: false \},
    { id: 3, username: "pedro_js", avatar: "https://unsplash.com", storyImg: "https://unsplash.com", viewed: false \},
    { id: 4, username: "julia.art", avatar: "https://unsplash.com", storyImg: "https://unsplash.com", viewed: false \},
    { id: 5, username: "tech_br", avatar: "https://unsplash.com", storyImg: "https://unsplash.com", viewed: false \}
  ],
  posts: [
    {
      id: 101,
      username: "lucas_ui",
      avatar: "https://unsplash.com",
      location: "Florianópolis, SC",
      image: "https://unsplash.com",
      likes: 142,
      liked: false,
      saved: false,
      caption: "Refatorando toda a arquitetura CSS hoje. Código limpo é vida! 💻🚀 #webdev #javascript",
      time: "HÁ 2 HORAS",
      comments: [
        { user: "mari.code", text: "Ficou incrível esse setup!" \},
        { user: "pedro_js", text: "Qual tema você usa no editor?" \}
      ]
    \},
    {
      id: 102,
      username: "julia.art",
      avatar: "https://unsplash.com",
      location: "Rio de Janeiro, RJ",
      image: "https://unsplash.com",
      likes: 389,
      liked: true,
      saved: false,
      caption: "Fim de tarde perfeito para recarregar as energias antes da entrega do projeto. ✨🌄",
      time: "HÁ 5 HORAS",
      comments: [
        { user: "dev_ana", text: "Que vista maravilhosa!" \}
      ]
    \}
  ],
  suggestions: [
    { username: "css_wizard", bio: "Seguido por lucas_ui", avatar: "https://unsplash.com", following: false \},
    { username: "design.daily", bio: "Novo no InstaDev", avatar: "https://unsplash.com", following: false \},
    { username: "fullstack_lab", bio: "Sugestão para você", avatar: "https://unsplash.com", following: false \}
  ]
\};

// Renderiza Stories
function renderStories() {
  const container = document.getElementById("storiesContainer");
  container.innerHTML = state.stories.map(story => `
    <div class="story-item" onclick="openStory(\${story.id\})">
      <div class="story-ring \${story.viewed ? 'viewed' : ''\}">
        <img src="\${story.avatar\}" alt="\${story.username\}">
      </div>
      <span>\${story.username\}</span>
    </div>
  `).join("");
\}

// Renderiza Posts
function renderPosts(filterText = "") {
  const container = document.getElementById("feedContainer");
  const filtered = state.posts.filter(post =>
    post.username.toLowerCase().includes(filterText.toLowerCase()) ||
    post.caption.toLowerCase().includes(filterText.toLowerCase())
  );

  if (filtered.length === 0) {
    container.innerHTML = `<p style="text-align:center; padding: 40px; color: var(--text-secondary);">Nenhuma publicação encontrada.</p>`;
    return;
  \}

  container.innerHTML = filtered.map(post => `
    <article class="post-card">
      <div class="post-header">
        <div class="post-author">
          <img src="\${post.avatar\}" alt="\${post.username\}">
          <div class="author-details">
            <strong>\${post.username\}</strong>
            \${post.location ? `<small>\${post.location\}</small>` : ""\}
          </div>
        </div>
        <span>•••</span>
      </div>

      <div class="post-image-wrapper" ondblclick="doubleClickLike(\${post.id\}, this)">
        <img src="\${post.image\}" alt="Post de \${post.username\}">
        <div class="big-heart-anim">❤️</div>
      </div>

      <div class="post-actions">
        <div class="left-actions">
          <button class="action-btn" onclick="toggleLike(\${post.id\})">
            \${post.liked ? "❤️" : "🤍"\}
          </button>
          <button class="action-btn" onclick="focusComment(\${post.id\})">💬</button>
          <button class="action-btn" onclick="sharePost('\${post.username\}')">🚀</button>
        </div>
        <button class="action-btn" onclick="toggleSave(\${post.id\})">
          \${post.saved ? "🔖" : "📑"\}
        </button>
      </div>

      <div class="post-body">
        <div class="likes-count">\${post.likes\} curtidas</div>
        <div class="post-caption">
          <strong>\${post.username\}</strong> \${post.caption\}
        </div>
        <div class="comments-list">
          \${post.comments.map(c => `
            <div class="comment-item"><strong>\${c.user\}</strong> \${c.text\}</div>
          `).join("")\}
        </div>
        <div class="post-time">\${post.time\}</div>
      </div>

      <form class="comment-form" onsubmit="addComment(event, \${post.id\})">
        <input type="text" id="comment-input-\${post.id\}" placeholder="Adicione um comentário..." required>
        <button type="submit">Publicar</button>
      </form>
    </article>
  `).join("");
\}

// Renderiza Sugestões
function renderSuggestions() {
  const container = document.getElementById("suggestionsContainer");
  container.innerHTML = state.suggestions.map((sug, index) => `
    <div class="suggestion-item">
      <div class="suggestion-left">
        <img src="\${sug.avatar\}" alt="\${sug.username\}">
        <div class="user-info">
          <strong>\${sug.username\}</strong>
          <span>\${sug.bio\}</span>
        </div>
      </div>
      <button class="follow-btn \${sug.following ? 'following' : ''\}" onclick="toggleFollow(\${index\})">
        \${sug.following ? "Seguindo" : "Seguir"\}
      </button>
    </div>
  `).join("");
\}

// Interações de Like, Salvar e Comentários
window.toggleLike = function(postId) {
  const post = state.posts.find(p => p.id === postId);
  if (post) {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    renderPosts(document.getElementById("searchInput").value);
  \}
\};

window.doubleClickLike = function(postId, wrapper) {
  const post = state.posts.find(p => p.id === postId);
  const heart = wrapper.querySelector(".big-heart-anim");
  
  heart.classList.add("active");
  setTimeout(() => heart.classList.remove("active"), 700);

  if (post && !post.liked) {
    post.liked = true;
    post.likes += 1;
    setTimeout(() => renderPosts(document.getElementById("searchInput").value), 500);
  \}
\};

window.toggleSave = function(postId) {
  const post = state.posts.find(p => p.id === postId);
  if (post) {
    post.saved = !post.saved;
    renderPosts(document.getElementById("searchInput").value);
  \}
\};

window.addComment = function(event, postId) {
  event.preventDefault();
  const input = document.getElementById(`comment-input-\${postId\}`);
  const text = input.value.trim();
  if (!text) return;

  const post = state.posts.find(p => p.id === postId);
  if (post) {
    post.comments.push({ user: state.currentUser.username, text \});
    renderPosts(document.getElementById("searchInput").value);
  \}
\};

window.focusComment = function(postId) {
  document.getElementById(`comment-input-\${postId\}`).focus();
\};

window.sharePost = function(username) {
  alert(`Link da publicação de @\${username\} copiado para a área de transferência!`);
\};

window.toggleFollow = function(index) {
  state.suggestions[index].following = !state.suggestions[index].following;
  renderSuggestions();
\};

// Controle de Stories
let storyTimeout;
window.openStory = function(storyId) {
  const story = state.stories.find(s => s.id === storyId);
  if (!story) return;

  story.viewed = true;
  renderStories();

  const viewer = document.getElementById("storyViewer");
  const progress = document.getElementById("storyProgress");
  document.getElementById("storyUserImg").src = story.avatar;
  document.getElementById("storyUserName").textContent = story.username;
  document.getElementById("storyMainImg").src = story.storyImg;

  viewer.classList.add("open");
  progress.style.transition = "none";
  progress.style.width = "0%";

  setTimeout(() => {
    progress.style.transition = "width 3s linear";
    progress.style.width = "100%";
  \}, 50);

  clearTimeout(storyTimeout);
  storyTimeout = setTimeout(() => {
    viewer.classList.remove("open");
  \}, 3100);
\};

document.getElementById("closeStoryBtn").addEventListener("click", () => {
  clearTimeout(storyTimeout);
  document.getElementById("storyViewer").classList.remove("open");
\});

// Modal de Nova Publicação
const postModal = document.getElementById("postModal");
document.getElementById("openModalBtn").addEventListener("click", () => postModal.classList.add("open"));
document.getElementById("closeModalBtn").addEventListener("click", () => postModal.classList.remove("open"));

window.setPresetImage = function(url) {
  document.getElementById("postImageUrl").value = url;
\};

document.getElementById("newPostForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const image = document.getElementById("postImageUrl").value;
  const location = document.getElementById("postLocation").value;
  const caption = document.getElementById("postCaption").value;

  state.posts.unshift({
    id: Date.now(),
    username: state.currentUser.username,$0