// Banco de dados simulado dos artigos do blog
const posts = [
  {
    id: 1,
    title: "Elden Ring: Shadow of the Erdtree - A Análise Completa",
    category: "RPG",
    author: "Thayna",
    date: "12 Mar 2026",
    likes: 142,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
    excerpt: "A expansão monumental que eleva o nível dos Soulslike a patamares nunca antes vistos. Vale a pena enfrentar os novos desafios?",
    content: "O universo criado pela FromSoftware ganha um capítulo espetacular. A nova área traz chefes altamente desafiadores, segredos profundos em cada canto e mecânicas aprimoradas que vão testar até os veteranos da franquia. Descubra os detalhes das novas armas, magias e os mistérios por trás do Miquella neste review completo feito por Thayna."
  },
  {
    id: 2,
    title: "Os Melhores Jogos Indie de 2026 que Você Precisa Conhecer",
    category: "Indie",
    author: "Thayna",
    date: "10 Mar 2026",
    likes: 98,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    excerpt: "Desenvolvedores independentes continuam surpreendendo com mecânicas inovadoras e narrativas emocionantes.",
    content: "O cenário indie é o coração da criatividade na indústria dos videogames. Neste artigo, selecionei 5 títulos que provam que gráficos hiper-realistas não são tudo quando se tem uma boa ideia, arte marcante e uma trilha sonora memorável."
  },
  {
    id: 3,
    title: "Guia de Performance: Como Otimizar seus Jogos de FPS",
    category: "FPS",
    author: "Thayna",
    date: "08 Mar 2026",
    likes: 210,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    excerpt: "Aumente suas taxas de quadros por segundo (FPS) e diminua o input lag no Valorant e Counter-Strike com estas dicas técnicas.",
    content: "Se você joga competitivamente, cada milissegundo conta! Nesse guia passo a passo, vou mostrar configurações do Windows, drivers de vídeo e ajustes em jogo para garantir a melhor estabilidade possível para a sua máquina."
  },
  {
    id: 4,
    title: "O Futuro da Inteligência Artificial nos Jogos de Ação",
    category: "Ação",
    author: "Thayna",
    date: "05 Mar 2026",
    likes: 76,
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
    excerpt: "Como novos algoritmos de IA estão criando NPCs mais inteligentes e ambientes dinâmicos que se adaptam ao jogador.",
    content: "Imagine inimigos que aprendem com a sua estratégia de combate e se adaptam em tempo real. A IA está transformando o design de jogos de ação e criando experiências imprevisíveis e altamente imersivas."
  }
];

// Elementos do DOM
const postsContainer = document.getElementById('postsContainer');
const categoryFilters = document.getElementById('categoryFilters');
const searchInput = document.getElementById('searchInput');
const searchInputMobile = document.getElementById('searchInputMobile');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const newsletterForm = document.getElementById('newsletterForm');
const newsletterSuccess = document.getElementById('newsletterSuccess');
const postModal = document.getElementById('postModal');
const modalContent = document.getElementById('modalContent');
const closeModalBtn = document.getElementById('closeModalBtn');

let currentCategory = 'all';
let searchQuery = '';

// Inicializar aplicação
document.addEventListener('DOMContentLoaded', () => {
  renderPosts();
  lucide.createIcons();
});

// Função para renderizar os posts
function renderPosts() {
  postsContainer.innerHTML = '';

  const filteredPosts = posts.filter(post => {
    const matchesCategory = currentCategory === 'all' || post.category === currentCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filteredPosts.length === 0) {
    postsContainer.innerHTML = `
      <div class="col-span-full py-12 text-center text-gray-400 bg-[#120c24] border border-purple-900/40 rounded-2xl">
        <i data-lucide="ghost" class="w-12 h-12 text-purple-500 mx-auto mb-3"></i>
        <p class="text-base font-semibold text-gray-300">Nenhum artigo encontrado!</p>
        <p class="text-xs text-gray-400 mt-1">Tente pesquisar por outro termo ou categoria.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  filteredPosts.forEach(post => {
    const postElement = document.createElement('article');
    postElement.className = 'post-card bg-[#120c24] border border-purple-900/40 rounded-2xl overflow-hidden flex flex-col h-full';
    
    postElement.innerHTML = `
      <div class="relative overflow-hidden group h-48">
        <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
        <span class="absolute top-3 left-3 px-2.5 py-1 bg-purple-900/80 backdrop-blur-md text-purple-200 text-xs font-bold rounded-lg border border-purple-700/50 uppercase">
          ${post.category}
        </span>
      </div>

      <div class="p-5 flex flex-col flex-grow justify-between">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-gray-400">
            <span class="flex items-center gap-1 text-purple-300"><i data-lucide="user" class="w-3.5 h-3.5"></i> ${post.author}</span>
            <span>•</span>
            <span class="flex items-center gap-1"><i data-lucide="calendar" class="w-3.5 h-3.5"></i> ${post.date}</span>
          </div>

          <h3 class="text-lg font-bold text-white hover:text-purple-300 transition cursor-pointer" onclick="openPostModal(${post.id})">
            ${post.title}
          </h3>

          <p class="text-xs text-gray-300 line-clamp-2 leading-relaxed">
            ${post.excerpt}
          </p>
        </div>

        <div class="pt-4 mt-4 border-t border-purple-900/30 flex items-center justify-between">
          <button onclick="likePost(${post.id})" class="flex items-center gap-1.5 text-xs text-gray-400 hover:text-purple-400 transition bg-purple-950/40 px-2.5 py-1.5 rounded-lg border border-purple-900/40">
            <i data-lucide="heart" class="w-3.5 h-3.5 text-purple-500"></i>
            <span id="like-count-${post.id}">${post.likes}</span>
          </button>

          <button onclick="openPostModal(${post.id})" class="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition">
            Ler artigo <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    `;

    postsContainer.appendChild(postElement);
  });

  lucide.createIcons();
}

// Filtro por Categoria
categoryFilters.addEventListener('click', (e) => {
  if (e.target.classList.contains('filter-btn')) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('bg-purple-600', 'text-white', 'shadow-md', 'shadow-purple-600/30', 'border-purple-600');
      btn.classList.add('bg-[#130d24]', 'text-gray-300', 'border-purple-900/60');
    });

    e.target.classList.remove('bg-[#130d24]', 'text-gray-300', 'border-purple-900/60');
    e.target.classList.add('bg-purple-600', 'text-white', 'shadow-md', 'shadow-purple-600/30', 'border-purple-600');

    currentCategory = e.target.getAttribute('data-category');
    renderPosts();
  }
});

// Sistema de Busca
function handleSearch(e) {
  searchQuery = e.target.value;
  renderPosts();
}
searchInput.addEventListener('input', handleSearch);
searchInputMobile.addEventListener('input', handleSearch);

// Sistema de Curtidas
function likePost(postId) {
  const post = posts.find(p => p.id === postId);
  if (post) {
    post.likes++;
    const likeCountElem = document.getElementById(`like-count-${postId}`);
    if (likeCountElem) {
      likeCountElem.textContent = post.likes;
    }
  }
}

// Modal do Artigo
function openPostModal(postId) {
  const post = posts.find(p => p.id === postId);
  if (!post) return;

  modalContent.innerHTML = `
    <div class="space-y-4">
      <span class="px-3 py-1 bg-purple-900/60 text-purple-300 text-xs font-bold rounded-lg border border-purple-700/50 uppercase inline-block">
        ${post.category}
      </span>
      
      <h2 class="text-2xl sm:text-3xl font-extrabold text-white">${post.title}</h2>

      <div class="flex items-center gap-3 text-xs text-gray-400 pb-3 border-b border-purple-900/40">
        <span class="text-purple-300 font-semibold">Por ${post.author}</span>
        <span>•</span>
        <span>${post.date}</span>
        <span>•</span>
        <span class="text-purple-400 font-medium">${post.likes} curtidas</span>
      </div>

      <img src="${post.image}" alt="${post.title}" class="w-full h-64 object-cover rounded-xl my-4 border border-purple-800/40">

      <div class="text-gray-200 text-sm leading-relaxed space-y-4">
        <p>${post.content}</p>
        <p>Acompanhe diariamente o portal <strong>GamerVerse</strong> para mais reviews, guias de performance e coberturas completas criadas por <strong>Thayna</strong>!</p>
      </div>

      <!-- Seção de Comentários Simulada -->
      <div class="pt-6 border-t border-purple-900/40 mt-6">
        <h4 class="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <i data-lucide="message-square" class="w-4 h-4 text-purple-400"></i> Comentários
        </h4>
        
        <div class="flex gap-2 mb-4">
          <input type="text" id="commentInput" placeholder="Deixe seu comentário..." class="flex-grow bg-[#0c0818] text-xs text-gray-200 px-3 py-2 rounded-lg border border-purple-900/60 focus:outline-none focus:border-purple-500">
          <button onclick="addComment()" class="px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition">Enviar</button>
        </div>

        <div id="commentsList" class="space-y-2">
          <div class="p-2.5 rounded-lg bg-purple-950/30 border border-purple-900/30 text-xs">
            <span class="font-bold text-purple-300">MarcosGamer</span>: <span class="text-gray-300">Excelente artigo! Gostei muito das dicas de otimização.</span>
          </div>
        </div>
      </div>
    </div>
  `;

  postModal.classList.remove('hidden');
  lucide.createIcons();
}

closeModalBtn.addEventListener('click', () => {
  postModal.classList.add('hidden');
});

// Fechar modal ao clicar fora
postModal.addEventListener('click', (e) => {
  if (e.target === postModal) {
    postModal.classList.add('hidden');
  }
});

// Adicionar Comentário no Modal
function addComment() {
  const commentInput = document.getElementById('commentInput');
  const commentsList = document.getElementById('commentsList');

  if (commentInput && commentInput.value.trim() !== '') {
    const newComment = document.createElement('div');
    newComment.className = 'p-2.5 rounded-lg bg-purple-950/30 border border-purple-900/30 text-xs';
    newComment.innerHTML = `<span class="font-bold text-purple-300">Leitor Gamer</span>: <span class="text-gray-300">${commentInput.value}</span>`;
    
    commentsList.prepend(newComment);
    commentInput.value = '';
  }
}

// Menu Mobile Toggle
mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Form da Newsletter
newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  newsletterForm.reset();
  newsletterSuccess.classList.remove('hidden');
  setTimeout(() => {
    newsletterSuccess.classList.add('hidden');
  }, 4000);
});