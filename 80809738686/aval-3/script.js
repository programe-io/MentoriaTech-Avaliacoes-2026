// Dataset Inicial
const defaultPosts = [
  {
    id: 101,
    title: "IA Generativa na Prática com JavaScript",
    category: "IA & Dados",
    author: "Dra. Ellen Ripley",
    content: "Como integrar modelos de inteligência artificial em suas aplicações web utilizando APIs modernas.",
    date: "29/10/2026",
    likes: 24,
    comments: ["Artigo fantástico!", "Ajudou muito no meu projeto."]
  },
  {
    id: 102,
    title: "O Futuro das Arquiteturas Serverless",
    category: "Backend",
    author: "Lucas Mendes",
    content: "Análise profunda sobre redução de custos e escalabilidade automática para APIs modernas.",
    date: "28/10/2026",
    likes: 18,
    comments: []
  }
];

// Estado da Aplicação
let postsState = JSON.parse(localStorage.getItem('devhub_posts')) || defaultPosts;
let activeCategory = 'ALL';

// Seletores do DOM
const postsFeed = document.getElementById('postsFeed');
const createPostForm = document.getElementById('createPostForm');
const searchInput = document.getElementById('searchInput');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const categoryTabs = document.getElementById('categoryTabs');
const totalPostsCount = document.getElementById('totalPostsCount');
const totalLikesCount = document.getElementById('totalLikesCount');

// Renderização do Feed e Métricas
function renderApp() {
  const query = searchInput.value.toLowerCase();

  // Filtragem
  const filteredPosts = postsState.filter(post => {
    const matchCat = activeCategory === 'ALL' || post.category === activeCategory;
    const matchSearch = post.title.toLowerCase().includes(query) || post.content.toLowerCase().includes(query);
    return matchCat && matchSearch;
  });

  // Atualizar Métricas
  totalPostsCount.textContent = postsState.length;
  totalLikesCount.textContent = postsState.reduce((acc, p) => acc + p.likes, 0);

  // Renderizar Feed
  if (filteredPosts.length === 0) {
    postsFeed.innerHTML = `<div class="widget" style="text-align:center; color: var(--text-muted);">Nenhum artigo encontrado.</div>`;
    return;
  }

  postsFeed.innerHTML = filteredPosts.map(post => `
    <article class="post-card">
      <div class="post-header">
        <span class="tag">${post.category}</span>
        <small style="color: var(--text-muted);">${post.date}</small>
      </div>
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">${post.content}</p>
      
      <div class="post-footer">
        <small style="color: var(--text-muted);">Por <strong>${post.author}</strong></small>
        <div class="post-actions">
          <button class="action-btn" onclick="handleLike(${post.id})">
            <i class="fas fa-heart" style="color: var(--danger);"></i> ${post.likes}
          </button>
          <button class="action-btn delete-btn" onclick="handleDelete(${post.id})">
            <i class="fas fa-trash"></i> Excluir
          </button>
        </div>
      </div>

      <!-- Sistema de Comentários Integrado -->
      <div class="comments-section">
        <div class="comments-list">
          ${post.comments.map(c => `<div class="comment-item"><i class="fas fa-comment-dots"></i> ${c}</div>`).join('')}
        </div>
        <form class="comment-form" onsubmit="handleAddComment(event, ${post.id})">
          <input type="text" placeholder="Escreva um comentário..." required>
          <button type="submit"><i class="fas fa-paper-plane"></i></button>
        </form>
      </div>
    </article>
  `).join('');
}

// Ações do Usuário
window.handleLike = function(id) {
  postsState = postsState.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p);
  saveData();
};

window.handleDelete = function(id) {
  if (confirm("Tem certeza de que deseja excluir este artigo?")) {
    postsState = postsState.filter(p => p.id !== id);
    saveData();
  }
};

window.handleAddComment = function(event, postId) {
  event.preventDefault();
  const input = event.target.querySelector('input');
  const commentText = input.value.trim();

  if (commentText) {
    postsState = postsState.map(p => {
      if (p.id === postId) {
        return { ...p, comments: [...p.comments, commentText] };
      }
      return p;
    });
    saveData();
  }
};

// Submissão de Novo Post
createPostForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newArticle = {
    id: Date.now(),
    title: document.getElementById('inputTitle').value,
    category: document.getElementById('selectCategory').value,
    author: document.getElementById('inputAuthor').value,
    content: document.getElementById('textContent').value,
    date: new Date().toLocaleDateString('pt-BR'),
    likes: 0,
    comments: []
  };

  postsState.unshift(newArticle);
  saveData();
  createPostForm.reset();
});

// Manipulação de Abas de Categoria
categoryTabs.addEventListener('click', (e) => {
  if (e.target.classList.contains('tab-btn')) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    activeCategory = e.target.dataset.category;
    renderApp();
  }
});

// Pesquisa
searchInput.addEventListener('input', renderApp);

// Alternar Tema (Dark/Light)
themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-theme');
  const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.body.setAttribute('data-theme', nextTheme);
  themeToggleBtn.innerHTML = nextTheme === 'light' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Salvar no LocalStorage e Atualizar Tela
function saveData() {
  localStorage.setItem('devhub_posts', JSON.stringify(postsState));
  renderApp();
}

// Inicialização
renderApp();