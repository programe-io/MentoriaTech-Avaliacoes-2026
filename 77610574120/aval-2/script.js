// Elementos do DOM
const postsContainer = document.getElementById('posts-container');
const postForm = document.getElementById('post-form');
const formSection = document.getElementById('form-section');
const toggleFormBtn = document.getElementById('toggle-form-btn');
const cancelFormBtn = document.getElementById('cancel-form-btn');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');

// Elementos do Modal
const modal = document.getElementById('post-modal');
const closeModal = document.getElementById('close-modal');

// Posts iniciais caso o localStorage esteja vazio
const defaultPosts = [
    {
        id: 1,
        title: 'Como estruturar projetos modernos com JavaScript',
        category: 'Programação',
        image: 'https://unsplash.com',
        date: '14/11/2026',
        likes: 12,
        content: 'Organizar bem o código desde o início evita dores de cabeça no futuro.\n\nSeparar responsabilidades entre manipulação de DOM, gerenciamento de estado e armazenamento local permite que sua aplicação cresça de forma limpa e sustentável.'
    },
    {
        id: 2,
        title: 'Princípios de UI Design para desenvolvedores',
        category: 'Design',
        image: 'https://unsplash.com',
        date: '12/11/2026',
        likes: 8,
        content: 'Você não precisa ser designer para criar interfaces agradáveis.\n\nFocar em espaçamento consistente, hierarquia tipográfica clara e contraste adequado de cores já eleva drasticamente a qualidade visual de qualquer projeto web.'
    }
];

// Carrega posts do localStorage ou usa os padrões
let posts = JSON.parse(localStorage.getItem('devblog_posts')) || defaultPosts;

// Salva no localStorage
function savePosts() {
    localStorage.setItem('devblog_posts', JSON.stringify(posts));
}

// Renderiza os posts na tela
function renderPosts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm) || 
                              post.content.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'Todas' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    postsContainer.innerHTML = '';

    if (filteredPosts.length === 0) {
        postsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #64748b;">Nenhum artigo encontrado.</p>';
        return;
    }

    filteredPosts.forEach(post => {
        const excerpt = post.content.length > 110 ? post.content.substring(0, 110) + '...' : post.content;
        
        const article = document.createElement('article');
        article.classList.add('post-card');

        article.innerHTML = `
            ${post.image ? `<img src="${escapeHTML(post.image)}" alt="Capa" class="post-img">` : ''}
            <div class="post-body">
                <span class="badge">${escapeHTML(post.category)}</span>
                <h3>${escapeHTML(post.title)}</h3>
                <span class="date">${post.date}</span>
                <p class="excerpt">${escapeHTML(excerpt)}</p>
                <div class="post-footer">
                    <button class="read-more" onclick="openPost(${post.id})">Ler artigo &rarr;</button>
                    <div class="post-actions">
                        <button class="action-btn" onclick="likePost(${post.id})">❤️ ${post.likes}</button>
                        <button class="action-btn delete-btn" onclick="deletePost(${post.id})" title="Excluir">🗑️</button>
                    </div>
                </div>
            </div>
        `;

        postsContainer.appendChild(article);
    });
}

// Criar nova postagem
postForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newPost = {
        id: Date.now(),
        title: document.getElementById('post-title').value.trim(),
        category: document.getElementById('post-category').value,
        image: document.getElementById('post-image').value.trim(),
        content: document.getElementById('post-content').value.trim(),
        date: new Date().toLocaleDateString('pt-BR'),
        likes: 0
    };

    posts.unshift(newPost);
    savePosts();
    renderPosts();

    postForm.reset();
    formSection.classList.add('hidden');
});

// Abrir modal de leitura
window.openPost = function(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;

    const modalImg = document.getElementById('modal-img');
    if (post.image) {
        modalImg.src = post.image;
        modalImg.classList.remove('hidden');
    } else {
        modalImg.classList.add('hidden');
    }

    document.getElementById('modal-category').textContent = post.category;
    document.getElementById('modal-title').textContent = post.title;
    document.getElementById('modal-date').textContent = `Publicado em ${post.date}`;
    document.getElementById('modal-body').textContent = post.content;

    modal.classList.remove('hidden');
};

// Curtir postagem
window.likePost = function(id) {
    const post = posts.find(p => p.id === id);
    if (post) {
        post.likes++;
        savePosts();
        renderPosts();
    }
};

// Excluir postagem
window.deletePost = function(id) {
    if (confirm('Tem certeza que deseja excluir este artigo?')) {
        posts = posts.filter(p => p.id !== id);
        savePosts();
        renderPosts();
    }
};

// Controles de Interface (Abrir/Fechar Form e Modal)
toggleFormBtn.addEventListener('click', () => formSection.classList.toggle('hidden'));
cancelFormBtn.addEventListener('click', () => formSection.classList.add('hidden'));
closeModal.addEventListener('click', () => modal.classList.add('hidden'));
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
});

// Eventos de Busca e Filtro
searchInput.addEventListener('input', renderPosts);
categoryFilter.addEventListener('change', renderPosts);

// Segurança contra injeção de HTML
function escapeHTML(str) {
    return String(str).replace(/[&<>'"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag] || tag));
}

// Inicializa a página
renderPosts();
