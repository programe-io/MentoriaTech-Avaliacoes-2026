const storiesData = [
  { id: 1, user: "seu_story", avatar: "https://pravatar.cc", storyImg: "https://picsum.photos", seen: false \},
  { id: 2, user: "ana.travels", avatar: "https://pravatar.cc", storyImg: "https://picsum.photos", seen: false \},
  { id: 3, user: "dev_lucas", avatar: "https://pravatar.cc", storyImg: "https://picsum.photos", seen: false \},
  { id: 4, user: "cafeteria.sp", avatar: "https://pravatar.cc", storyImg: "https://picsum.photos", seen: false \},
  { id: 5, user: "foto_arte", avatar: "https://pravatar.cc", storyImg: "https://picsum.photos", seen: false \}
];

let postsData = [
  {
    id: 101,
    user: "ana.travels",
    avatar: "https://pravatar.cc",
    image: "https://picsum.photos",
    likes: 142,
    liked: false,
    saved: false,
    caption: "Fim de tarde incrível depois de explorar a cidade! 🌅✨",
    comments: [
      { user: "dev_lucas", text: "Que foto sensacional!" \}
    ]
  \},
  {
    id: 102,
    user: "cafeteria.sp",
    avatar: "https://pravatar.cc",
    image: "https://picsum.photos",
    likes: 89,
    liked: false,
    saved: false,
    caption: "Nada como um café especial para começar bem o dia ☕",
    comments: []
  \}
];

const storiesEl = document.getElementById("stories");
const feedEl = document.getElementById("feed");

function renderStories() {
  storiesEl.innerHTML = storiesData.map(story => `
    <div class="story" onclick="openStory(\${story.id\})">
      <div class="story-ring \${story.seen ? 'seen' : ''\}">
        <img src="\${story.avatar\}" alt="\${story.user\}">
      </div>
      <span>\${story.user\}</span>
    </div>
  `).join("");
\}

function renderFeed() {
  feedEl.innerHTML = postsData.map(post => `
    <article class="post">
      <div class="post-header">
        <img src="\${post.avatar\}" alt="\${post.user\}">
        <strong>\${post.user\}</strong>
      </div>
      
      <div class="post-image-wrapper" ondblclick="doubleClickLike(\${post.id\}, this)">
        <img src="\${post.image\}" alt="Post de \${post.user\}">
        <div class="big-heart">❤️</div>
      </div>

      <div class="post-actions">
        <div class="action-left">
          <button class="action-btn" onclick="toggleLike(\${post.id\})">
            \${post.liked ? "❤️" : "🤍"\}
          </button>
          <button class="action-btn" onclick="focusComment(\${post.id\})">💬</button>
          <button class="action-btn">✈️</button>
        </div>
        <button class="action-btn" onclick="toggleSave(\${post.id\})">
          \${post.saved ? "🔖" : "📑"\}
        </button>
      </div>

      <div class="post-info">
        <div class="likes-count">\${post.likes\} curtidas</div>
        <div class="caption"><strong>\${post.user\}</strong> \${post.caption\}</div>
        <div class="comments-list">
          \${post.comments.map(c => `<div class="comment-item"><strong>\${c.user\}</strong> \${c.text\}</div>`).join("")\}
        </div>
      </div>

      <form class="comment-box" onsubmit="addComment(event, \${post.id\})">
        <input type="text" id="input-\${post.id\}" placeholder="Adicione um comentário..." required>
        <button type="submit">Publicar</button>
      </form>
    </article>
  `).join("");
\}

// Curtir / Descurtir
window.toggleLike = function(id) {
  const post = postsData.find(p => p.id === id);
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  renderFeed();
\};

// Duplo clique na foto
window.doubleClickLike = function(id, wrapper) {
  const post = postsData.find(p => p.id === id);
  const heart = wrapper.querySelector(".big-heart");
  heart.classList.add("show");
  setTimeout(() => heart.classList.remove("show"), 700);

  if (!post.liked) {
    post.liked = true;
    post.likes += 1;
    setTimeout(renderFeed, 650);
  \}
\};

// Salvar post
window.toggleSave = function(id) {
  const post = postsData.find(p => p.id === id);
  post.saved = !post.saved;
  renderFeed();
\};

// Comentar
window.focusComment = function(id) {
  document.getElementById(`input-\${id\}`).focus();
\};

window.addComment = function(e, id) {
  e.preventDefault();
  const input = document.getElementById(`input-\${id\}`);
  const post = postsData.find(p => p.id === id);
  post.comments.push({ user: "voce", text: input.value \});
  renderFeed();
\};

// Stories Interativos
let storyTimer;
window.openStory = function(id) {
  const story = storiesData.find(s => s.id === id);
  story.seen = true;
  renderStories();

  const modal = document.getElementById("story-modal");
  const bar = document.getElementById("story-progress-bar");
  document.getElementById("story-user-avatar").src = story.avatar;
  document.getElementById("story-user-name").textContent = story.user;
  document.getElementById("story-image").src = story.storyImg;

  modal.classList.add("active");
  bar.style.transition = "none";
  bar.style.width = "0%";

  setTimeout(() => {
    bar.style.transition = "width 4s linear";
    bar.style.width = "100%";
  \}, 50);

  clearTimeout(storyTimer);
  storyTimer = setTimeout(() => {
    modal.classList.remove("active");
  \}, 4050);
\};

document.getElementById("close-story").onclick = () => {
  clearTimeout(storyTimer);
  document.getElementById("story-modal").classList.remove("active");
\};

// Modal de Novo Post
const postModal = document.getElementById("post-modal");
document.getElementById("btn-new-post").onclick = () => postModal.classList.add("active");
document.getElementById("close-modal").onclick = () => postModal.classList.remove("active");

document.getElementById("publish-post").onclick = () => {
  const url = document.getElementById("post-img-url").value.trim() || `https://picsum.photos{Date.now()\}`;
  const caption = document.getElementById("post-caption").value.trim() || "Nova foto publicada!";

  postsData.unshift({
    id: Date.now(),
    user: "voce",
    avatar: "https://pravatar.cc",
    image: url,
    likes: 0,
    liked: false,
    saved: false,
    caption: caption,
    comments: []
  \});

  document.getElementById("post-img-url").value = "";
  document.getElementById("post-caption").value = "";
  postModal.classList.remove("active");
  renderFeed();
\};

// Inicializar
renderStories();
renderFeed();$0