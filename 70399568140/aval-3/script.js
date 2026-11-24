// ==========================================
// DADOS INICIAIS (MOCK DATA)
// ==========================================
const storiesData = [
  { username: "seu_story", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80", isUser: true },
  { username: "maria_dev", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" },
  { username: "tailwind_fan", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=80" },
  { username: "joao_code", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" },
  { username: "ana_uiux", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80" },
  { username: "lucas_js", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80" }
];

let postsData = [
  {
    id: 1,
    username: "frojo_dev",
    location: "Parnaíba - PI",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    likes: 1234,
    liked: false,
    saved: false,
    caption: "Finalizando o projeto Clone do Instagram com Tailwind CSS! Responsividade mobile-first na prática. #tailwind #frontend #webdev",
    commentsCount: 42,
    comments: [
      { user: "maria_dev", text: "Ficou top demais! Parabéns!" }
    ],
    timeAgo: "HÁ DUAS HORAS"
  },
  {
    id: 2,
    username: "maria_dev",
    location: "São Paulo, Brasil",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
    likes: 856,
    liked: true,
    saved: false,
    caption: "Café pronto e código rodando. Mais um dia produtivo por aqui! ☕💻",
    commentsCount: 19,
    comments: [],
    timeAgo: "HÁ CINCO HORAS"
  }
];

const suggestionsData = [
  { id: 1, username: "dev_maria", subtitle: "Sugerido para você", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80", following: false },
  { id: 2, username: "joao_fullstack", subtitle: "Segue você", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80", following: false },
  { id: 3, username: "ui_brasil", subtitle: "Sugerido para você", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80", following: false }
];

// ==========================================
// RENDERIZAR STORIES
// ==========================================
function renderStories() {
  const container = document.getElementById("stories-container");
  container.innerHTML = storiesData.map(story => `
    <div class="flex flex-col items-center flex-shrink-0 cursor-pointer group">
      <div class="${story.isUser ? 'bg-gray-200' : 'story-gradient'} p-0.5 rounded-full transition-transform group-hover:scale-105">
        <div class="bg-white p-0.5 rounded-full">
          <img 
            src="${story.avatar}" 
            alt="${story.username}" 
            class="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
          />
        </div>
      </div>
      <span class="text-xs mt-1.5 text-slate-800 truncate w-16 md:w-20 text-center">
        ${story.username}
      </span>
    </div>
  `).join("");
}

// ==========================================
// RENDERIZAR POSTAGENS DO FEED
// ==========================================
function renderPosts(filterText = "") {
  const container = document.getElementById("feed-container");
  
  const filteredPosts = postsData.filter(post => 
    post.username.toLowerCase().includes(filterText.toLowerCase()) ||
    post.caption.toLowerCase().includes(filterText.toLowerCase()) ||
    post.location.toLowerCase().includes(filterText.toLowerCase())
  );

  if (filteredPosts.length === 0) {
    container.innerHTML = `
      <div class="bg-card border border-border rounded-lg p-8 text-center text-muted text-sm">
        Nenhuma publicação encontrada para "${filterText}".
      </div>
    `;
    return;
  }

  container.innerHTML = filteredPosts.map(post => `
    <article class="bg-card border border-border rounded-lg mb-4 overflow-hidden">
      
      <!-- Header do Card -->
      <div class="flex justify-between items-center p-3.5">
        <div class="flex items-center gap-3">
          <div class="story-gradient p-0.5 rounded-full">
            <img 
              src="${post.avatar}" 
              alt="${post.username}" 
              class="w-9 h-9 rounded-full object-cover border border-white"
            />
          </div>
          <div>
            <p class="font-semibold text-sm leading-tight">${post.username}</p>
            <p class="text-xs text-muted">${post.location}</p>
          </div>
        </div>
        <button class="text-xl text-slate-700 hover:text-black cursor-pointer" aria-label="Mais opções">
          <i class='bx bx-dots-horizontal'></i>
        </button>
      </div>

      <!-- Imagem Principal (com duplo clique para curtir) -->
      <div 
        ondblclick="handleDoubleClickLike(${post.id})" 
        class="bg-muted relative aspect-square w-full overflow-hidden select-none cursor-pointer"
      >
        <img 
          src="${post.image}" 
          alt="imagem do meu projeto" 
          class="w-full h-full object-cover"
        />
        <!-- Coração animado central no duplo clique -->
        <div id="heart-overlay-${post.id}" class="hidden absolute inset-0 flex items-center justify-center pointer-events-none">
          <i class='bx bxs-heart text-white text-8xl drop-shadow-lg animate-like-heart'></i>
        </div>
      </div>

      <!-- Área de Interação e Descrição -->
      <div class="p-3.5">
        
        <!-- Ícones de Ação -->
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-4 text-2xl">
            <button onclick="toggleLike(${post.id})" class="cursor-pointer transition-transform active:scale-125" aria-label="Curtir">
              <i class='bx ${post.liked ? "bxs-heart text-red-500" : "bx-heart hover:text-gray-500"}'></i>
            </button>
            <button onclick="focusCommentInput(${post.id})" class="hover:text-gray-500 cursor-pointer" aria-label="Comentar">
              <i class='bx bx-message-rounded'></i>
            </button>
            <button class="hover:text-gray-500 cursor-pointer" aria-label="Compartilhar">
              <i class='bx bx-send'></i>
            </button>
          </div>
          
          <button onclick="toggleSave(${post.id})" class="text-2xl cursor-pointer" aria-label="Salvar">
            <i class='bx ${post.saved ? "bxs-bookmark text-slate-900" : "bx-bookmark hover:text-gray-500"}'></i>
          </button>
        </div>

        <!-- Contador de Curtidas -->
        <p class="font-semibold text-sm mb-2">
          ${post.likes.toLocaleString('pt-BR')} curtidas
        </p>

        <!-- Descrição da Postagem -->
        <p class="text-sm leading-snug">
          <span class="font-semibold mr-1">${post.username}</span>
          <span class="text-slate-900/90">${post.caption}</span>
        </p>

        <!-- Lista de Comentários Recentes -->
        ${post.comments.length > 0 ? `
          <div class="mt-2 space-y-1">
            ${post.comments.map(c => `
              <p class="text-sm">
                <span class="font-semibold mr-1">${c.user}</span>
                <span class="text-slate-800">${c.text}</span>
              </p>
            `).join("")}
          </div>
        ` : ""}

        <!-- Botão Ver Todos os Comentários -->
        <button class="text-sm text-muted mt-1.5 hover:underline cursor-pointer">
          Ver todos os ${post.commentsCount} comentários
        </button>

        <!-- Horário da Postagem -->
        <p class="text-xs text-muted mt-2 uppercase tracking-wide">
          ${post.timeAgo}
        </p>

        <!-- Campo Rápido de Comentário -->
        <form onsubmit="addComment(event, ${post.id})" class="mt-3 pt-3 border-t border-border flex items-center gap-2">
          <input 
            id="comment-input-${post.id}"
            type="text" 
            placeholder="Adicione um comentário..." 
            class="flex-1 text-sm focus:outline-none"
          />
          <button type="submit" class="text-blue-500 font-semibold text-sm hover:text-blue-700 cursor-pointer">
            Publicar
          </button>
        </form>

      </div>
    </article>
  `).join("");
}

// ==========================================
// RENDERIZAR SUGESTÕES NA SIDEBAR
// ==========================================
function renderSuggestions() {
  const container = document.getElementById("suggestions-container");
  container.innerHTML = suggestionsData.map(user => `
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <img 
          src="${user.avatar}" 
          alt="${user.username}" 
          class="w-9 h-9 rounded-full object-cover"
        />
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
  `).join("");
}

// ==========================================
// FUNÇÕES DE INTERAÇÃO
// ==========================================

// Alternar curtida no botão de coração
function toggleLike(postId) {
  const post = postsData.find(p => p.id === postId);
  if (!post) return;

  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  renderPosts(document.getElementById("search-input").value);
}

// Duplo clique na imagem (curte e mostra coração animado)
function handleDoubleClickLike(postId) {
  const post = postsData.find(p => p.id === postId);
  if (!post) return;

  if (!post.liked) {
    post.liked = true;
    post.likes += 1;
    renderPosts(document.getElementById("search-input").value);
  }

  const overlay = document.getElementById(`heart-overlay-${postId}`);
  if (overlay) {
    overlay.classList.remove("hidden");
    setTimeout(() => {
      overlay.classList.add("hidden");
    }, 800);
  }
}

// Salvar / Favoritar postagem
function toggleSave(postId) {
  const post = postsData.find(p => p.id === postId);
  if (!post) return;

  post.saved = !post.saved;
  renderPosts(document.getElementById("search-input").value);
}

// Adicionar novo comentário
function addComment(event, postId) {
  event.preventDefault();
  const input = document.getElementById(`comment-input-${postId}`);
  const text = input.value.trim();
  if (!text) return;

  const post = postsData.find(p => p.id === postId);
  if (post) {
    post.comments.push({ user: "frojo_dev", text });
    post.commentsCount += 1;
    renderPosts(document.getElementById("search-input").value);
  }
}

function focusCommentInput(postId) {
  const input = document.getElementById(`comment-input-${postId}`);
  if (input) input.focus();
}

// Seguir / Deixar de seguir na barra lateral
function toggleFollow(userId) {
  const user = suggestionsData.find(u => u.id === userId);
  if (!user) return;

  user.following = !user.following;
  renderSuggestions();
}

// Pesquisa em tempo real
document.getElementById("search-input").addEventListener("input", (e) => {
  renderPosts(e.target.value);
});

// ==========================================
// CONTROLE DO MODAL DE NOVA POSTAGEM
// ==========================================
function openNewPostModal() {
  document.getElementById("new-post-modal").classList.remove("hidden");
}

function closeNewPostModal() {
  document.getElementById("new-post-modal").classList.add("hidden");
}

document.getElementById("new-post-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const location = document.getElementById("post-location").value;
  const image = document.getElementById("post-image").value;
  const caption = document.getElementById("post-caption").value;

  const newPost = {
    id: Date.now(),
    username: "frojo_dev",
    location,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    image,
    likes: 1,
    liked: true,
    saved: false,
    caption,
    commentsCount: 0,
    comments: [],
    timeAgo: "AGORA MESMO"
  };

  postsData.unshift(newPost);
  renderPosts();
  e.target.reset();
  closeNewPostModal();
});

// ==========================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ==========================================
renderStories();
renderPosts();
renderSuggestions();