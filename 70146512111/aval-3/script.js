// Estado inicial dos posts (com criadora Kailane em destaque)
let posts = [
    {
        id: 1,
        author: "Kailane",
        avatar: "K",
        category: "Instagram",
        time: "Há 15 minutos",
        content: "O algoritmo do Instagram mudou novamente! Foco em conteúdos autênticos, salvamentos e tempo de retenção nos Reels. O que vocês estão achando dessa atualização? 📸✨",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
        likes: 42,
        liked: false,
        comments: [
            { author: "Lucas Silva", text: "Com certeza! Os Reels estão entregando muito mais." },
            { author: "Mariana Costa", text: "Conteúdo excelente, Kailane!" }
        ]
    },
    {
        id: 2,
        author: "Kailane",
        avatar: "K",
        category: "LinkedIn",
        time: "Há 2 horas",
        content: "Construir uma marca pessoal forte nas redes sociais não é sobre aparecer todos os dias, mas sim sobre gerar valor real para a sua comunidade profissional. Qual sua estratégia hoje? 💼",
        image: "",
        likes: 89,
        liked: true,
        comments: [
            { author: "Carlos Eduardo", text: "Perfeito! Consistência e relevância são a chave." }
        ]
    },
    {
        id: 3,
        author: "Beatriz Lima",
        avatar: "B",
        category: "TikTok",
        time: "Há 5 horas",
        content: "Tendências musicais virais duram em média 5 dias agora. Velocidade de produção é tudo na plataforma atualmente! 🎵⚡",
        image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=1000&auto=format&fit=crop",
        likes: 124,
        liked: false,
        comments: []
    }
];

let currentCategory = 'all';
let searchQuery = '';

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    updateCounts();

    // Event Listeners para Busca
    document.getElementById('searchInput').addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderPosts();
    });
    document.getElementById('searchInputMobile').addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderPosts();
    });

    // Theme Toggle
    document.getElementById('themeToggle').addEventListener('click', () => {
        const html = document.documentElement;
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Restaurar tema salvo
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }
});

// Renderizar Feed de Posts
function renderPosts() {
    const feed = document.getElementById('postsFeed');
    const emptyState = document.getElementById('emptyState');
    
    // Filtrar posts
    const filtered = posts.filter(post => {
        const matchesCategory = currentCategory === 'all' || post.category === currentCategory;
        const matchesSearch = post.content.toLowerCase().includes(searchQuery) || 
                              post.author.toLowerCase().includes(searchQuery) || 
                              post.category.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        feed.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    feed.innerHTML = filtered.map(post => {
        let badgeColor = 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300';
        let iconClass = 'fa-solid fa-globe';
        if (post.category === 'Instagram') { badgeColor = 'bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300'; iconClass = 'fa-brands fa-instagram'; }
        if (post.category === 'TikTok') { badgeColor = 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200'; iconClass = 'fa-brands fa-tiktok'; }
        if (post.category === 'LinkedIn') { badgeColor = 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'; iconClass = 'fa-brands fa-linkedin'; }
        if (post.category === 'Twitter') { badgeColor = 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300'; iconClass = 'fa-brands fa-x-twitter'; }

        return `
            <article class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 transition">
                <!-- Cabeçalho do Post -->
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center shadow-md shadow-brand-500/20">
                            ${post.avatar}
                        </div>
                        <div>
                            <h4 class="font-bold text-sm text-slate-800 dark:text-slate-100">${post.author}</h4>
                            <p class="text-xs text-slate-400">${post.time}</p>
                        </div>
                    </div>
                    <span class="text-xs font-semibold px-3 py-1 rounded-full flex items-center space-x-1.5 ${badgeColor}">
                        <i class="${iconClass}"></i>
                        <span>${post.category}</span>
                    </span>
                </div>

                <!-- Texto do Post -->
                <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-4">${escapeHTML(post.content)}</p>

                <!-- Imagem Opcional -->
                ${post.image ? `<div class="mb-4 rounded-xl overflow-hidden max-h-96 bg-slate-100 dark:bg-slate-900 flex items-center justify-center"><img src="${escapeHTML(post.image)}" alt="Mídia do post" class="w-full object-cover max-h-96"></div>` : ''}

                <!-- Estatísticas e Ações -->
                <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/60 text-slate-500 dark:text-slate-400 text-sm">
                    <button onclick="toggleLike(${post.id})" class="flex items-center space-x-2 hover:text-brand-600 transition ${post.liked ? 'text-rose-500' : ''}">
                        <i class="${post.liked ? 'fa-solid text-rose-500' : 'fa-regular'} fa-heart"></i>
                        <span class="font-medium">${post.likes}</span>
                    </button>
                    <button onclick="toggleComments(${post.id})" class="flex items-center space-x-2 hover:text-brand-600 transition">
                        <i class="fa-regular fa-comment"></i>
                        <span class="font-medium">${post.comments.length} Comentários</span>
                    </button>
                    <button onclick="sharePost(${post.id})" class="flex items-center space-x-2 hover:text-brand-600 transition">
                        <i class="fa-solid fa-share-nodes"></i>
                        <span class="hidden sm:inline">Compartilhar</span>
                    </button>
                </div>

                <!-- Seção de Comentários (Expansível) -->
                <div id="comments-section-${post.id}" class="hidden mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/60 space-y-3">
                    <div class="space-y-2">
                        ${post.comments.length === 0 ? '<p class="text-xs text-slate-400 italic">Nenhum comentário ainda. Seja o primeiro!</p>' : ''}
                        ${post.comments.map(c => `
                            <div class="bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl text-xs">
                                <span class="font-bold text-slate-800 dark:text-slate-200">${escapeHTML(c.author)}:</span>
                                <span class="text-slate-600 dark:text-slate-400 ml-1">${escapeHTML(c.text)}</span>
                            </div>
                        `).join('')}
                    </div>
                    <form onsubmit="handleAddComment(event, ${post.id})" class="flex items-center space-x-2 mt-2">
                        <input type="text" name="commentText" required placeholder="Escreva um comentário..." class="flex-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-xl text-xs focus:outline-none focus:border-brand-500">
                        <button type="submit" class="bg-brand-600 text-white px-3 py-1.5 rounded-xl text-xs font-medium hover:bg-brand-700 transition">Enviar</button>
                    </form>
                </div>
            </article>
        `;
    }).join('');
}

// Filtrar por Categoria
function filterCategory(category) {
    currentCategory = category;
    
    // Atualizar classes dos botões da sidebar
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        btn.className = "category-btn w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition";
    });
    
    event.currentTarget.className = "category-btn w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400";
    renderPosts();
}

// Atualizar contadores de posts
function updateCounts() {
    document.getElementById('count-all').innerText = posts.length;
    document.getElementById('count-Instagram').innerText = posts.filter(p => p.category === 'Instagram').length;
    document.getElementById('count-TikTok').innerText = posts.filter(p => p.category === 'TikTok').length;
    document.getElementById('count-LinkedIn').innerText = posts.filter(p => p.category === 'LinkedIn').length;
    document.getElementById('count-Twitter').innerText = posts.filter(p => p.category === 'Twitter').length;
}

// Curtir post
function toggleLike(id) {
    const post = posts.find(p => p.id === id);
    if (post) {
        if (post.liked) {
            post.likes -= 1;
            post.liked = false;
        } else {
            post.likes += 1;
            post.liked = true;
        }
        renderPosts();
    }
}

// Mostrar/Ocultar Comentários
function toggleComments(id) {
    const section = document.getElementById(`comments-section-${id}`);
    section.classList.toggle('hidden');
}

// Adicionar Comentário
function handleAddComment(event, postId) {
    event.preventDefault();
    const input = event.target.elements.commentText;
    const text = input.value.trim();
    if (!text) return;

    const post = posts.find(p => p.id === postId);
    if (post) {
        post.comments.push({
            author: "Visitante",
            text: text
        });
        renderPosts();
        // Manter seção aberta após comentar
        document.getElementById(`comments-section-${postId}`).classList.remove('hidden');
    }
}

// Compartilhar Post
function sharePost(id) {
    navigator.clipboard.writeText(window.location.href);
    alert('Link da publicação copiado para a área de transferência!');
}

// Modal Controls
function openModal() {
    document.getElementById('postModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('postModal').classList.add('hidden');
    document.getElementById('postForm').reset();
}

// Criar Novo Post
function handleCreatePost(event) {
    event.preventDefault();
    const author = document.getElementById('authorInput').value.trim();
    const category = document.getElementById('categoryInput').value;
    const image = document.getElementById('imageInput').value.trim();
    const content = document.getElementById('contentInput').value.trim();

    const newPost = {
        id: Date.now(),
        author: author,
        avatar: author.charAt(0).toUpperCase(),
        category: category,
        time: "Agora mesmo",
        content: content,
        image: image,
        likes: 0,
        liked: false,
        comments: []
    };

    posts.unshift(newPost);
    updateCounts();
    renderPosts();
    closeModal();
}

// Segurança básica para prevenir XSS
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}