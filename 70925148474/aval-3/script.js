// SVG embutido: Concha espiral revestida de madrepérola iridescente sobre fundo turquesa
const TOIM_AVATAR_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs>
    <!-- Fundo turquesa vibrante -->
    <radialGradient id="turquoiseBg" cx="35%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#2dd4bf"/>
      <stop offset="55%" stop-color="#0d9488"/>
      <stop offset="100%" stop-color="#0f766e"/>
    </radialGradient>

    <!-- Gradiente iridescente de madrepérola -->
    <linearGradient id="motherOfPearl" x1="15%" y1="15%" x2="85%" y2="85%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="28%" stop-color="#fdf2f8"/>
      <stop offset="52%" stop-color="#e0f2fe"/>
      <stop offset="76%" stop-color="#f3e8ff"/>
      <stop offset="100%" stop-color="#ccfbf1"/>
    </linearGradient>

    <!-- Brilho interno nacarado -->
    <radialGradient id="nacreSheen" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
      <stop offset="55%" stop-color="#fbcfe8" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#99f6e4" stop-opacity="0.25"/>
    </radialGradient>

    <filter id="softShadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#042f2e" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Fundo circular turquesa -->
  <rect width="200" height="200" fill="url(#turquoiseBg)"/>

  <!-- Concha Espiral (Nautilus / Caracol Marinho) -->
  <g filter="url(#softShadow)" transform="translate(100, 102)">
    <!-- Corpo externo da concha -->
    <path d="M -52,18
             C -62,-22 -34,-62 10,-62
             C 52,-62 76,-28 70,12
             C 64,46 32,68 -4,64
             C -32,60 -50,40 -52,18 Z"
          fill="url(#motherOfPearl)"
          stroke="#e2e8f0"
          stroke-width="2.5"/>

    <!-- Camada de brilho madrepérola -->
    <path d="M -46,15
             C -54,-18 -30,-54 9,-54
             C 45,-54 66,-24 61,10
             C 56,40 28,59 -3,55
             C -28,52 -44,34 -46,15 Z"
          fill="url(#nacreSheen)"/>

    <!-- Abertura perlada da concha -->
    <ellipse cx="-26" cy="24" rx="22" ry="30" transform="rotate(-24 -26 24)"
             fill="#fdf4ff" stroke="#cbd5e1" stroke-width="2"/>
    <ellipse cx="-25" cy="24" rx="15" ry="22" transform="rotate(-24 -25 24)"
             fill="#f0fdfa" opacity="0.85"/>

    <!-- Espiral interna delicada -->
    <path d="M 10,-62
             C 38,-48 54,-16 42,14
             C 32,38 4,46 -14,32
             C -28,20 -26,-4 -10,-14
             C 4,-22 20,-14 20,0
             C 20,10 10,16 2,12
             C -4,9 -4,1 2,-2"
          fill="none"
          stroke="#cbd5e1"
          stroke-width="2.4"
          stroke-linecap="round"/>

    <!-- Linhas radiais suaves da concha -->
    <path d="M 10,-60 Q 12,-34 10,-16" fill="none" stroke="#e2e8f0" stroke-width="1.6" opacity="0.8"/>
    <path d="M 46,-44 Q 30,-24 18,-10" fill="none" stroke="#e2e8f0" stroke-width="1.6" opacity="0.8"/>
    <path d="M 68,-6 Q 44,-4 22,0" fill="none" stroke="#e2e8f0" stroke-width="1.6" opacity="0.8"/>
    <path d="M 56,36 Q 34,24 16,10" fill="none" stroke="#e2e8f0" stroke-width="1.6" opacity="0.8"/>
    <path d="M 18,62 Q 10,40 4,16" fill="none" stroke="#e2e8f0" stroke-width="1.6" opacity="0.8"/>
  </g>
</svg>
`)}`;

const CURRENT_USER = {
  username: 'toim_009',
  name: 'Toim',
  avatar: TOIM_AVATAR_SVG
};

// Dados iniciais
const storiesData = [
  {
    username: 'toim_009',
    avatar: CURRENT_USER.avatar,
    storyImg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80'
  },
  {
    username: 'marina.oceano',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
    storyImg: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&q=80'
  },
  {
    username: 'lucas.dev',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    storyImg: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80'
  },
  {
    username: 'clara_arte',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80',
    storyImg: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80'
  },
  {
    username: 'pedro.viaja',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
    storyImg: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80'
  }
];

let postsData = [
  {
    id: 1,
    username: 'toim_009',
    avatar: CURRENT_USER.avatar,
    time: '2 h',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
    likes: 342,
    liked: false,
    saved: false,
    caption: 'Reflexos de madrepérola e águas turquesa no fim de tarde 🐚🌊',
    comments: [
      { user: 'marina.oceano', text: 'Essa paleta de cores ficou surreal!' },
      { user: 'lucas.dev', text: 'Foto impecável!' }
    ]
  },
  {
    id: 2,
    username: 'marina.oceano',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
    time: '5 h',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    likes: 819,
    liked: true,
    saved: false,
    caption: 'Mergulho matinal e paz absoluta.',
    comments: [
      { user: 'toim_009', text: 'Que lugar incrível!' }
    ]
  },
  {
    id: 3,
    username: 'toim_009',
    avatar: CURRENT_USER.avatar,
    time: '1 d',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    likes: 514,
    liked: false,
    saved: true,
    caption: 'Setup pronto para mais uma noite de código em dark mode 💻🌑',
    comments: []
  }
];

const suggestionsData = [
  { username: 'studio.nacre', sub: 'Seguido por marina.oceano', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&q=80' },
  { username: 'rafael.design', sub: 'Novo no Instagram', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80' },
  { username: 'costa.azul', sub: 'Sugestão para você', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80' }
];

// Aplica o avatar de concha madrepérola + turquesa em todos os elementos do perfil principal
function applyMainUserAvatar() {
  document.querySelectorAll('.main-user-avatar').forEach(img => {
    img.src = CURRENT_USER.avatar;
  });
}

// Renderiza Stories
function renderStories() {
  const container = document.getElementById('stories-bar');
  container.innerHTML = storiesData.map((story, index) => `
    <div class="story-item" onclick="openStory(${index})">
      <div class="story-ring">
        <img src="${story.avatar}" alt="${story.username}">
      </div>
      <span>${story.username}</span>
    </div>
  `).join('');
}

// Renderiza Feed de Publicações
function renderFeed() {
  const container = document.getElementById('posts-feed');
  container.innerHTML = postsData.map(post => `
    <article class="post-card" data-id="${post.id}">
      <div class="post-header">
        <div class="post-author">
          <img src="${post.avatar}" class="avatar-sm" alt="${post.username}">
          <strong>${post.username}</strong>
          <span class="post-time">• ${post.time}</span>
        </div>
        <i class="fa-solid fa-ellipsis" style="cursor:pointer;"></i>
      </div>

      <div class="post-image-wrapper" ondblclick="handleDoubleTap(${post.id})">
        <img src="${post.image}" class="post-image" alt="Publicação de ${post.username}">
        <i class="fa-solid fa-heart double-tap-heart" id="heart-anim-${post.id}"></i>
      </div>

      <div class="post-actions">
        <div class="actions-left">
          <i class="${post.liked ? 'fa-solid liked' : 'fa-regular'} fa-heart action-icon"
             onclick="toggleLike(${post.id})"></i>
          <i class="fa-regular fa-comment action-icon"
             onclick="focusComment(${post.id})"></i>
          <i class="fa-regular fa-paper-plane action-icon"></i>
        </div>
        <i class="${post.saved ? 'fa-solid' : 'fa-regular'} fa-bookmark action-icon"
           onclick="toggleSave(${post.id})"></i>
      </div>

      <div class="post-likes">${post.likes.toLocaleString('pt-BR')} curtidas</div>

      <div class="post-caption">
        <strong>${post.username}</strong> ${post.caption}
      </div>

      <div class="post-comments">
        ${post.comments.map(c => `
          <div><strong>${c.user}</strong> ${c.text}</div>
        `).join('')}
      </div>

      <form class="comment-form" onsubmit="addComment(event, ${post.id})">
        <input type="text" id="comment-input-${post.id}" class="comment-input" placeholder="Adicione um comentário..." required>
        <button type="submit" class="comment-submit">Publicar</button>
      </form>
    </article>
  `).join('');
}

// Renderiza Sugestões Laterais
function renderSuggestions() {
  const container = document.getElementById('suggestions-list');
  container.innerHTML = suggestionsData.map(s => `
    <div class="suggestion-item">
      <div class="user-info-left">
        <img src="${s.avatar}" class="avatar-sm" alt="${s.username}">
        <div>
          <strong>${s.username}</strong>
          <span class="subtext">${s.sub}</span>
        </div>
      </div>
      <button class="text-btn" onclick="toggleFollow(this)">Seguir</button>
    </div>
  `).join('');
}

// Renderiza Grade do Perfil toim_009
function renderProfileGrid() {
  const userPosts = postsData.filter(p => p.username === CURRENT_USER.username);
  document.getElementById('profile-posts-count').textContent = userPosts.length;

  const grid = document.getElementById('profile-grid');
  grid.innerHTML = userPosts.map(post => `
    <div class="grid-item">
      <img src="${post.image}" alt="Post de ${CURRENT_USER.username}">
    </div>
  `).join('');
}

// Interações de Curtir, Salvar e Comentar
function toggleLike(id) {
  const post = postsData.find(p => p.id === id);
  if (!post) return;
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  renderFeed();
}

function handleDoubleTap(id) {
  const post = postsData.find(p => p.id === id);
  if (!post) return;
  if (!post.liked) {
    post.liked = true;
    post.likes += 1;
    renderFeed();
  }
  const heart = document.getElementById(`heart-anim-${id}`);
  if (heart) {
    heart.classList.add('animate');
    setTimeout(() => heart.classList.remove('animate'), 650);
  }
}

function toggleSave(id) {
  const post = postsData.find(p => p.id === id);
  if (!post) return;
  post.saved = !post.saved;
  renderFeed();
}

function focusComment(id) {
  const input = document.getElementById(`comment-input-${id}`);
  if (input) input.focus();
}

function addComment(event, id) {
  event.preventDefault();
  const input = document.getElementById(`comment-input-${id}`);
  const text = input.value.trim();
  if (!text) return;

  const post = postsData.find(p => p.id === id);
  post.comments.push({ user: CURRENT_USER.username, text });
  renderFeed();
}

function toggleFollow(btn) {
  if (btn.textContent === 'Seguir') {
    btn.textContent = 'Seguindo';
    btn.style.color = '#a8a8a8';
  } else {
    btn.textContent = 'Seguir';
    btn.style.color = '#0095f6';
  }
}

// Alternância entre Feed e Perfil
function switchView(viewName) {
  const feedView = document.getElementById('feed-view');
  const profileView = document.getElementById('profile-view');

  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.view === viewName);
  });

  if (viewName === 'profile') {
    feedView.classList.add('hidden');
    profileView.classList.remove('hidden');
    renderProfileGrid();
  } else {
    profileView.classList.add('hidden');
    feedView.classList.remove('hidden');
  }
}

// Modal de Criar Publicação
const createModal = document.getElementById('create-modal');
document.getElementById('btn-open-create').addEventListener('click', (e) => {
  e.preventDefault();
  createModal.classList.remove('hidden');
});

document.getElementById('btn-close-create').addEventListener('click', () => {
  createModal.classList.add('hidden');
});

document.getElementById('create-post-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const imgUrl = document.getElementById('new-post-image').value.trim() ||
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80';
  const caption = document.getElementById('new-post-caption').value.trim();

  postsData.unshift({
    id: Date.now(),
    username: CURRENT_USER.username,
    avatar: CURRENT_USER.avatar,
    time: 'Agora',
    image: imgUrl,
    likes: 1,
    liked: true,
    saved: false,
    caption,
    comments: []
  });

  e.target.reset();
  createModal.classList.add('hidden');
  renderFeed();
  renderProfileGrid();
});

// Visualizador de Stories
let storyTimer = null;
function openStory(index) {
  const story = storiesData[index];
  const modal = document.getElementById('story-modal');
  const progress = document.getElementById('story-progress');

  document.getElementById('story-avatar').src = story.avatar;
  document.getElementById('story-username').textContent = story.username;
  document.getElementById('story-image').src = story.storyImg;

  modal.classList.remove('hidden');
  progress.style.transition = 'none';
  progress.style.width = '0%';

  requestAnimationFrame(() => {
    progress.style.transition = 'width 4s linear';
    progress.style.width = '100%';
  });

  clearTimeout(storyTimer);
  storyTimer = setTimeout(closeStory, 4000);
}

function closeStory() {
  clearTimeout(storyTimer);
  document.getElementById('story-modal').classList.add('hidden');
}

document.getElementById('btn-close-story').addEventListener('click', closeStory);

// Navegação
document.querySelectorAll('[data-view]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    switchView(el.dataset.view);
  });
});

// Inicialização
applyMainUserAvatar();
renderStories();
renderFeed();
renderSuggestions();
renderProfileGrid();