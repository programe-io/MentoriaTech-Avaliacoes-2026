// 1. Dados Iniciais (Baseados nos nomes e locais dos slides e do resumo)
const storiesData = [
  { id: 1, username: 'seu_story', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', storyImg: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600', isOwn: true },
  { id: 2, username: 'frojo_dev', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', storyImg: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600' },
  { id: 3, username: 'maria_dev', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', storyImg: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600' },
  { id: 4, username: 'tailwind_fan', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', storyImg: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600' },
  { id: 5, username: 'joao_ui', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80', storyImg: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=600' },
  { id: 6, username: 'ana_code', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80', storyImg: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600' }
];

let postsData = [
  {
    id: 101,
    username: 'frojo_dev',
    location: 'Parnaíba-PI',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
    likes: 1234,
    liked: false,
    saved: false,
    caption: 'Finalizando o projeto Clone do Instagram com Tailwind CSS e JavaScript! 💻🚀 #frontend #tailwind #webdev',
    timeAgo: 'HÁ DUAS HORAS',
    comments: [
      { user: 'maria_dev', text: 'Ficou incrível demais! Parabéns 🔥' },
      { user: 'tailwind_fan', text: 'Responsividade mobile-first impecável!' }
    ]
  },
  {
    id: 102,
    username: 'maria_dev',
    location: 'São Paulo, Brasil',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    likes: 856,
    liked: true,
    saved: false,
    caption: 'Setup pronto para mais uma maratona de código e café ☕✨',
    timeAgo: 'HÁ 5 HORAS',
    comments: [
      { user: 'frojo_dev', text: 'Melhor combo possível!' }
    ]
  },
  {
    id: 103,
    username: 'tailwind_fan',
    location: 'Rio de Janeiro, Brasil',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    likes: 432,
    liked: false,
    saved: true,
    caption: 'Estudando classes utilitárias e Flexbox. Produtividade lá em cima! ⚡',
    timeAgo: 'HÁ 1 DIA',
    comments: []
  }
];

const suggestionsData = [
  { id: 1, username: 'dev_maria', subtitle: 'Sugerido para você', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', following: false },
  { id: 2, username: 'joao_frontend', subtitle: 'Segue você', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80', following: false },
  { id: 3, username: 'programe.io', subtitle: 'Sugerido para você', avatar: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=150&auto=format&fit=crop&q=80', following: false },
  { id: 4, username: 'ana_uxdesign', subtitle: 'Novo no Instagram', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80', following: false }
];

// 2. Renderizar Stories
function renderStories() {
  const container = document.getElementById('storiesContainer');
  container.innerHTML = storiesData.map(story => `
    <div onclick="openStoryModal(${story.id})" class="flex flex-col items-center flex-shrink-0 cursor-pointer group">
      <div class="w-16 h-16 md:w-20 md:h-20 rounded-full p-[2px] ${story.isOwn ? 'bg-gray-300' : 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600'} group-hover:scale-105 transition-transform">
        <img 
          src="${story.avatar}" 
          alt="${story.username}" 
          class="w-full h-full object-cover rounded-full border-2 border-white"
        />
      </div>
      <span class="text-xs mt-1 text-gray-700 truncate w-16 md:w-20 text-center">${story.username}</span>
    </div>
  `).join('');
}

// 3. Renderizar Postagens no Feed
function renderPosts(filterText = '') {
  const container = document.getElementById('feedContainer');
  const filtered = postsData.filter(post => 
    post.username.toLowerCase().includes(filterText.toLowerCase()) ||
    post.caption.toLowerCase().includes(filterText.toLowerCase()) ||
    post.location.toLowerCase().includes(filterText.toLowerCase())
  );

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="bg-card border border-border rounded-lg p-8 text-center text-muted text-sm">
        Nenhuma publicação encontrada para "${filterText}".
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(post => `
    <article class="bg-card border border-border rounded-lg mb-4 overflow-hidden">
      
      <!-- Header da Postagem -->
      <div class="flex justify-between items-center p-3 md:p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
            <img src="${post.avatar}" alt="${post.username}" class="w-full h-full object-cover rounded-full border border-white">
          </div>
          <div>
            <p class="font-semibold text-sm leading-tight">${post.username}</p>
            <p class="text-xs text-muted">${post.location}</p>
          </div>
        </div>
        <button class="text-gray-600 hover:text-black cursor-pointer" aria-label="Mais opções">
          <i class='bx bx-dots-horizontal-rounded text-xl'></i>
        </button>
      </div>

      <!-- Imagem Principal (com duplo clique para curtir) -->
      <div ondblclick="doubleClickLike(${post.id})" class="bg-gray-100 relative aspect-square overflow-hidden cursor-pointer select-none">
        <img
          src="${post.image}"
          alt="imagem do meu projeto"
          class="w-full h-full object-cover"
        />
        <i id="heart-overlay-${post.id}" class='bx bxs-heart text-white text-7xl absolute inset-0 m-auto w-fit h-fit opacity-0 pointer-events-none drop-shadow-lg'></i>
      </div>

      <!-- Área de Interação e Descrição -->
      <div class="p-3 md:p-4">
        
        <!-- Ícones de Ação -->
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-4">
            <button onclick="toggleLike(${post.id})" class="cursor-pointer transition-transform active:scale-125" aria-label="Curtir">
              <i class='bx ${post.liked ? 'bxs-heart text-red-500' : 'bx-heart hover:text-muted'} text-2xl'></i>
            </button>
            <button onclick="focusComment(${post.id})" class="cursor-pointer hover:text-muted" aria-label="Comentar">
              <i class='bx bx-message-rounded text-2xl'></i>
            </button>
            <button onclick="alert('Link da postagem copiado!')" class="cursor-pointer hover:text-muted" aria-label="Compartilhar">
              <i class='bx bx-send text-2xl'></i>
            </button>
          </div>
          <button onclick="toggleSave(${post.id})" class="cursor-pointer hover:text-muted" aria-label="Salvar">
            <i class='bx ${post.saved ? 'bxs-bookmark text-slate-900' : 'bx-bookmark'} text-2xl'></i>
          </button>
        </div>

        <!-- Curtidas -->
        <p class="text-sm font-semibold mb-2">
          ${post.likes.toLocaleString('pt-BR')} curtidas
        </p>

        <!-- Legenda -->
        <p class="text-sm mb-1">
          <span class="font-semibold mr-1">${post.username}</span>
          <span class="text-slate-900/90">${post.caption}</span>
        </p>

        <!-- Lista de Comentários -->
        <div class="space-y-1 mt-2">
          ${post.comments.map(c => `
            <p class="text-sm">
              <span class="font-semibold mr-1">${c.user}</span>
              <span class="text-slate-800">${c.text}</span>
            </p>
          `).join('')}
        </div>

        <!-- Horário -->
        <p class="text-[11px] text-muted mt-2 uppercase tracking-wide">
          ${post.timeAgo}
        </p>

        <!-- Adicionar Novo Comentário -->
        <form onsubmit="addComment(event, ${post.id})" class="flex items-center gap-2 border-t border-border mt-3 pt-3">
          <input 
            id="comment-input-${post.id}"
            type="text" 
            placeholder="Adicione um comentário..." 
            class="flex-1 text-sm focus:outline-none bg-transparent"
          />
          <button type="submit" class="text-blue-500 font-semibold text-sm hover:text-blue-700 cursor-pointer">
            Publicar
          </button>
        </form>

      </div>
    </article>
  `).join('');
}

// 4. Renderizar Sugestões da Sidebar
function renderSuggestions() {
  const container = document.getElementById('suggestionsContainer');
  container.innerHTML = suggestionsData.map(user => `
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <img src="${user.avatar}" alt="${user.username}" class="w-9 h-9 rounded-full object-cover">
        <div>
          <p class="font-semibold text-sm leading-tight">${user.username}</p>
          <p class="text-xs text-muted">${user.subtitle}</p>
        </div>
      </div>
      <button 
        onclick="toggleFollow(${user.id})" 
        class="text-xs font-semibold cursor-pointer ${user.following ? 'text-slate-700' : 'text-blue-500 hover:text-blue-700'}"
      >
        ${user.following ? 'Seguindo' : 'Seguir'}
      </button>
    </div>
  `).join('');
}

// 5. Funções de Interatividade
function toggleLike(postId) {
  const post = postsData.find(p => p.id === postId);
  if (post) {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    renderPosts(document.getElementById('searchInput').value);
  }
}

function doubleClickLike(postId) {
  const post = postsData.find(p => p.id === postId);
  if (post && !post.liked) {
    post.liked = true;
    post.likes += 1;
    renderPosts(document.getElementById('searchInput').value);
  }
  const overlay = document.getElementById(`heart-overlay-${postId}`);
  if (overlay) {
    overlay.classList.remove('animate-heart');
    void overlay.offsetWidth;
    overlay.classList.add('animate-heart');
  }
}

function toggleSave(postId) {
  const post = postsData.find(p => p.id === postId);
  if (post) {
    post.saved = !post.saved;
    renderPosts(document.getElementById('searchInput').value);
  }
}

function focusComment(postId) {
  const input = document.getElementById(`comment-input-${postId}`);
  if (input) input.focus();
}

function addComment(event, postId) {
  event.preventDefault();
  const input = document.getElementById(`comment-input-${postId}`);
  const text = input.value.trim();
  if (!text) return;

  const post = postsData.find(p => p.id === postId);
  if (post) {
    post.comments.push({ user: 'frojo_dev', text });
    renderPosts(document.getElementById('searchInput').value);
  }
}

function toggleFollow(userId) {
  const user = suggestionsData.find(u => u.id === userId);
  if (user) {
    user.following = !user.following;
    renderSuggestions();
  }
}

// Pesquisa em tempo real
document.getElementById('searchInput').addEventListener('input', (e) => {
  renderPosts(e.target.value);
});

function toggleMobileSearch() {
  const term = prompt('Pesquisar por usuário, local ou legenda:');
  if (term !== null) {
    renderPosts(term);
  }
}

// Modal de Nova Postagem
function openNewPostModal() {
  const modal = document.getElementById('newPostModal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeNewPostModal() {
  const modal = document.getElementById('newPostModal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

document.getElementById('newPostForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const location = document.getElementById('postLocation').value;
  const image = document.getElementById('postImage').value;
  const caption = document.getElementById('postCaption').value;

  postsData.unshift({
    id: Date.now(),
    username: 'frojo_dev',
    location,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    image,
    likes: 1,
    liked: true,
    saved: false,
    caption,
    timeAgo: 'AGORA MESMO',
    comments: []
  });

  renderPosts();
  closeNewPostModal();
  e.target.reset();
});

// Modal de Story
let storyTimeout;
function openStoryModal(storyId) {
  const story = storiesData.find(s => s.id === storyId);
  if (!story) return;

  document.getElementById('storyAvatar').src = story.avatar;
  document.getElementById('storyUsername').textContent = story.username;
  document.getElementById('storyFullImg').src = story.storyImg;

  const modal = document.getElementById('storyModal');
  const progress = document.getElementById('storyProgress');
  
  modal.classList.remove('hidden');
  modal.classList.add('flex');

  progress.style.width = '0%';
  setTimeout(() => { progress.style.width = '100%'; }, 50);

  clearTimeout(storyTimeout);
  storyTimeout = setTimeout(closeStoryModal, 3100);
}

function closeStoryModal() {
  const modal = document.getElementById('storyModal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  clearTimeout(storyTimeout);
}

// Inicialização
renderStories();
renderPosts();
renderSuggestions();