// Dados Iniciais
const storiesData = [
  { id: 1, user: 'ana.design', avatar: 'https://unsplash.com', storyImg: 'https://unsplash.com', viewed: false \},
  { id: 2, user: 'lucas_tech', avatar: 'https://unsplash.com', storyImg: 'https://unsplash.com', viewed: false \},
  { id: 3, user: 'marina.viaja', avatar: 'https://unsplash.com', storyImg: 'https://unsplash.com', viewed: false \},
  { id: 4, user: 'pedro.foto', avatar: 'https://unsplash.com', storyImg: 'https://unsplash.com', viewed: false \}
];

let postsData = [
  {
    id: 101,
    user: 'marina.viaja',
    location: 'Amalfi, Itália',
    avatar: 'https://unsplash.com',
    image: 'https://unsplash.com',
    likes: 1248,
    liked: false,
    saved: false,
    caption: 'Pôr do sol inesquecível na costa italiana! 🌅✨',
    time: 'HÁ 2 HORAS',
    comments: [
      { user: 'ana.design', text: 'Que lugar maravilhoso!' \},
      { user: 'pedro.foto', text: 'As cores dessa foto ficaram incríveis.' \}
    ]
  \},
  {
    id: 102,
    user: 'lucas_tech',
    location: 'São Paulo, Brasil',
    avatar: 'https://unsplash.com',
    image: 'https://unsplash.com',
    likes: 842,
    liked: true,
    saved: false,
    caption: 'Setup pronto para mais uma maratona de código ☕💻 #frontend #javascript',
    time: 'HÁ 5 HORAS',
    comments: []
  \}
];

const suggestionsData = [
  { user: 'studio.arquitetura', subtitle: 'Seguido por ana.design', avatar: 'https://unsplash.com', following: false \},
  { user: 'cafe.especial', subtitle: 'Novo no Instagram', avatar: 'https://unsplash.com', following: false \},
  { user: 'ui.inspiracao', subtitle: 'Sugestão para você', avatar: 'https://unsplash.com', following: false \}
];

// Renderizar Stories
function renderStories() {
  const container = document.getElementById('storiesContainer');
  container.innerHTML = storiesData.map(story => `
    <div class="story-item" onclick="openStory(\${story.id\})">
      <div class="story-ring \${story.viewed ? 'viewed' : ''\}">
        <img src="\${story.avatar\}" alt="\${story.user\}">
      </div>
      <span>\${story.user\}</span>
    </div>
  `).join('');
\}

// Renderizar Feed de Posts
function renderPosts(filterText = '') {
  const container = document.getElementById('postsContainer');
  const filtered = postsData.filter(p => p.user.toLowerCase().includes(filterText.toLowerCase()));

  container.innerHTML = filtered.map(post => `
    <article class="post-card" id="post-\${post.id\}">
      <div class="post-header">
        <div class="post-user">
          <img src="\${post.avatar\}" alt="\${post.user\}">
          <div class="post-user-info">
            <strong>\${post.user\}</strong>
            <span>\${post.location\}</span>
          </div>
        </div>
        <i class="fas fa-ellipsis-h" style="cursor:pointer;"></i>
      </div>

      <div class="post-image-wrapper" ondblclick="doubleClickLike(\${post.id\})">
        <img src="\${post.image\}" alt="Publicação">
        <i class="fas fa-heart heart-animation" id="heart-anim-\${post.id\}"></i>
      </div>

      <div class="post-actions">
        <div class="post-actions-left">
          <i class="\${post.liked ? 'fas liked' : 'far'\} fa-heart" onclick="toggleLike(\${post.id\})"></i>
          <i class="far fa-comment" onclick="focusComment(\${post.id\})"></i>
          <i class="far fa-paper-plane"></i>
        </div>
        <i class="\${post.saved ? 'fas' : 'far'\} fa-bookmark" onclick="toggleSave(\${post.id\})"></i>
      </div>

      <div class="post-likes">\${post.likes.toLocaleString('pt-BR')\} curtidas</div>

      <div class="post-caption">
        <strong>\${post.user\}</strong> \${post.caption\}
      </div>

      <div class="post-comments">
        \${post.comments.map(c => `
          <div class="comment-item">
            <span><strong>\${c.user\}</strong> \${c.text\}</span>
          </div>
        `).join('')\}
      </div>

      <div class="post-time">\${post.time\}</div>

      <form class="comment-form" onsubmit="addComment(event, \${post.id\})">
        <input type="text" id="input-\${post.id\}" placeholder="Adicione um comentário..." oninput="toggleCommentBtn(\${post.id\})">
        <button type="submit" id="btn-\${post.id\}" disabled>Publicar</button>
      </form>
    </article>
  `).join('');
\}

// Renderizar Sugestões
function renderSuggestions() {
  const container = document.getElementById('suggestionsList');
  container.innerHTML = suggestionsData.map((item, idx) => `
    <div class="suggestion-item">
      <img src="\${item.avatar\}" alt="\${item.user\}">
      <div class="user-info">
        <strong>\${item.user\}</strong>
        <span>\${item.subtitle\}</span>
      </div>
      <button class="text-btn \${item.following ? 'dark' : ''\}" onclick="toggleFollow(\${idx\})">
        \${item.following ? 'Seguindo' : 'Seguir'\}
      </button>
    </div>
  `).join('');
\}

// Interações dos Posts
function toggleLike(id) {
  const post = postsData.find(p => p.id === id);
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  renderPosts(document.getElementById('searchInput').value);
\}

function doubleClickLike(id) {
  const post = postsData.find(p => p.id === id);
  if (!post.liked) {
    post.liked = true;
    post.likes += 1;
    renderPosts(document.getElementById('searchInput').value);
  \}
  const heart = document.getElementById(`heart-anim-\${id\}`);
  heart.classList.add('animate');
  setTimeout(() => heart.classList.remove('animate'), 700);
\}

function toggleSave(id) {
  const post = postsData.find(p => p.id === id);
  post.saved = !post.saved;
  renderPosts(document.getElementById('searchInput').value);
\}

function focusComment(id) {
  document.getElementById(`input-\${id\}`).focus();
\}

function toggleCommentBtn(id) {
  const input = document.getElementById(`input-\${id\}`);
  const btn = document.getElementById(`btn-\${id\}`);
  btn.disabled = input.value.trim() === '';
\}

function addComment(event, id) {
  event.preventDefault();
  const input = document.getElementById(`input-\${id\}`);
  const text = input.value.trim();
  if (!text) return;

  const post = postsData.find(p => p.id === id);
  post.comments.push({ user: 'dev.criativo', text \});
  renderPosts(document.getElementById('searchInput').value);
\}

function toggleFollow(index) {
  suggestionsData[index].following = !suggestionsData[index].following;
  renderSuggestions();
\}

// Lógica do Visualizador de Stories
let storyTimer;
function openStory(id) {
  const story = storiesData.find(s => s.id === id);
  story.viewed = true;
  renderStories();

  document.getElementById('storyUserImg').src = story.avatar;
  document.getElementById('storyUsername').textContent = story.user;
  document.getElementById('storyMainImg').src = story.storyImg;
  
  const viewer = document.getElementById('storyViewer');
  const fill = document.getElementById('storyProgressFill');
  viewer.classList.add('active');
  
  fill.style.transition = 'none';
  fill.style.width = '0%';
  
  setTimeout(() => {
    fill.style.transition = 'width 4s linear';
    fill.style.width = '100%';
  \}, 50);

  clearTimeout(storyTimer);
  storyTimer = setTimeout(closeStory, 4050);
\}

function closeStory() {
  document.getElementById('storyViewer').classList.remove('active');
  clearTimeout(storyTimer);
\}

document.getElementById('closeStoryBtn').addEventListener('click', closeStory);

// Pesquisa em Tempo Real
document.getElementById('searchInput').addEventListener('input', (e) => {
  renderPosts(e.target.value);
\});

// Modal de Nova Publicação
const modal = document.getElementById('createPostModal');
document.getElementById('openModalBtn').addEventListener('click', () => modal.classList.add('active'));
document.getElementById('closeModalBtn').addEventListener('click', () => modal.classList.remove('active'));

document.getElementById('newPostForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const image = document.getElementById('postImageUrl').value;
  const caption = document.getElementById('postCaption').value;

  postsData.unshift({
    id: Date.now(),
    user: 'dev.criativo',
    location: 'Brasil',
    avatar: 'https://unsplash.com',
    image,
    likes: 0,
    liked: false,
    saved: false,
    caption,
    time: 'AGORA MESMO',
    comments: []
  \});

  renderPosts();
  e.target.reset();
  modal.classList.remove('active');
\});

// Inicializar Aplicação
renderStories();
renderPosts();
renderSuggestions();$0