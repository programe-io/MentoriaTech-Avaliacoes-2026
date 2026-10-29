// Dados iniciais
const initialPosts = [
  {
    id: 1,
    title: "Arquitetura limpa em aplicações JavaScript",
    category: "Backend",
    author: "Carlos Silva",
    content: "Boas práticas de organização de código para criar aplicações sustentáveis a longo prazo.",
    date: "29/10/2026",
    likes: 5
  },
  {
    id: 2,
    title: "Dominando CSS Grid e Flexbox",
    category: "Frontend",
    author: "Ana Souza",
    content: "Aprenda a alinhar elementos e criar layouts responsivos de forma simples.",
    date: "28/10/2026",
    likes: 12
  }
];

// Estado da aplicação com LocalStorage
let posts = JSON.parse(localStorage.getItem('blog_posts')) || initialPosts;
let currentFilter = 'all';

// Elementos do DOM
const postsContainer = document.getElementById('postsContainer');
const postForm = document.getElementById('postForm');
const searchInput = document.getElementById('searchInput');
const themeToggle = document.getElementById('themeToggle');
const filterBtns = document.querySelectorAll('.filter-btn');

// Renderizar Posts
function renderPosts() {
  const searchTerm = searchInput.value.toLowerCase();
  
  const filtered = posts.filter(post => {
    const matchesFilter = currentFilter === 'all' || post.category === currentFilter;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm) || 
                          post.content.toLowerCase().includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  postsContainer.innerHTML = filtered.length === 0 
    ? `<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">Nenhum post encontrado.</p>`
    : filtered.map(post => `
        <article class="post-card">
          <div>
            <div class="post-header">
              <span class="badge">${post.category}</span>
              <small>${post.date}</small>
            </div>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-excerpt">${post.content}</p>
          </div>
          <div class="post-footer">
            <span>Por <strong>${post.author}</strong></span>
            <button class="like-btn" onclick="toggleLike(${post.id})">
              <i class="fas fa-heart"></i> <span>${post.likes}</span>
            </button>
          </div>
        </article>
      `).join('');
}

// Curtir Post
window.toggleLike = function(id) {
  posts = posts.map(post => {
    if (post.id === id) post.likes += 1;
    return post;
  });
  saveAndRender();
};

// Criar Novo Post
postForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newPost = {
    id: Date.now(),
    title: document.getElementById('postTitle').value,
    category: document.getElementById('postCategory').value,
    author: document.getElementById('postAuthor').value,
    content: document.getElementById('postContent').value,
    date: new Date().toLocaleDateString('pt-BR'),
    likes: 0
  };

  posts.unshift(newPost);
  saveAndRender();
  postForm.reset();
});

// Filtros
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.category;
    renderPosts();
  });
});

// Pesquisa em tempo real
searchInput.addEventListener('input', renderPosts);

// Alternar Tema Escuro
themeToggle.addEventListener('click', () => {
  const isDark = document.body.getAttribute('data-theme') === 'dark';
  document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
});

// Auxiliares
function saveAndRender() {
  localStorage.setItem('blog_posts', JSON.stringify(posts));
  renderPosts();
}

// Inicialização
renderPosts();