// Dados iniciais do Feed
let posts = [
    {
        id: 1,
        author: "Ana Silva",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
        time: "Há 15 min",
        content: "Acabei de publicar a primeira versão do meu feed interativo feito apenas com HTML, CSS e JavaScript puro! 🚀",
        likes: 12,
        liked: false,
        saved: false,
        comments: ["Incrível!", "Muito bom o resultado."]
    },
    {
        id: 2,
        author: "Carlos Eduardo",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
        time: "Há 2 horas",
        content: "Dica do dia: Estruturar bem o seu CSS utilizando variáveis (:root) economiza tempo e deixa o código muito fácil de manter.",
        likes: 34,
        liked: false,
        saved: false,
        comments: []
    }
];

let currentFilter = 'all';

// Elementos DOM
const postsList = document.getElementById('posts-list');
const postInput = document.getElementById('post-input');
const publishBtn = document.getElementById('publish-btn');
const charCount = document.getElementById('char-count');
const savedCountEl = document.getElementById('saved-count');

const btnAll = document.getElementById('btn-all');
const btnSaved = document.getElementById('btn-saved');

// --- Validação do Criador de Post ---
postInput.addEventListener('input', () => {
    const len = postInput.value.length;
    charCount.textContent = len;
    publishBtn.disabled = len === 0 || len > 280;
});

// --- Inserir Novo Post ---
publishBtn.addEventListener('click', () => {
    const content = postInput.value.trim();
    if (!content) return;

    const newPost = {
        id: Date.now(),
        author: "Você",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
        time: "Agora mesmo",
        content: content,
        likes: 0,
        liked: false,
        saved: false,
        comments: []
    };

    posts.unshift(newPost);
    postInput.value = '';
    charCount.textContent = '0';
    publishBtn.disabled = true;
    renderPosts();
});

// --- Alternar Filtros (Todos / Salvos) ---
btnAll.addEventListener('click', () => {
    currentFilter = 'all';
    btnAll.classList.add('active');
    btnSaved.classList.remove('active');
    renderPosts();
});

btnSaved.addEventListener('click', () => {
    currentFilter = 'saved';
    btnSaved.classList.add('active');
    btnAll.classList.remove('active');
    renderPosts();
});

// --- Funções Interativas do Post ---
function toggleLike(id) {
    posts = posts.map(post => {
        if (post.id === id) {
            return {
                ...post,
                liked: !post.liked,
                likes: post.liked ? post.likes - 1 : post.likes + 1
            };
        }
        return post;
    });
    renderPosts();
}

function toggleSave(id) {
    posts = posts.map(post => {
        if (post.id === id) {
            return { ...post, saved: !post.saved };
        }
        return post;
    });
    renderPosts();
}

function toggleComments(id) {
    const commentsEl = document.getElementById(`comments-${id}`);
    if (commentsEl) {
        commentsEl.classList.toggle('active');
    }
}

function addComment(id) {
    const input = document.getElementById(`input-comment-${id}`);
    const text = input.value.trim();
    if (!text) return;

    posts = posts.map(post => {
        if (post.id === id) {
            return { ...post, comments: [...post.comments, text] };
        }
        return post;
    });

    renderPosts();
    // Reabre a sessão de comentários após renderizar
    setTimeout(() => toggleComments(id), 50);
}

// --- Renderizar Lista de Posts ---
function renderPosts() {
    postsList.innerHTML = '';

    const filteredPosts = currentFilter === 'saved' 
        ? posts.filter(p => p.saved) 
        : posts;

    // Atualiza contador de salvos
    const savedCount = posts.filter(p => p.saved).length;
    savedCountEl.textContent = savedCount;

    if (filteredPosts.length === 0) {
        postsList.innerHTML = `
            <div class="card" style="text-align: center; color: var(--text-muted);">
                Nenhum post encontrado nesta visualização.
            </div>
        `;
        return;
    }

    filteredPosts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'card';

        const commentsHTML = post.comments.map(c => `
            <div class="comment-item">${c}</div>
        `).join('');

        postElement.innerHTML = `
            <div class="post-header">
                <img src="${post.avatar}" alt="${post.author}" class="avatar">
                <div>
                    <div class="post-author">${post.author}</div>
                    <div class="post-time">${post.time}</div>
                </div>
            </div>
            <div class="post-content">${post.content}</div>
            <div class="post-footer">
                <button class="action-btn ${post.liked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                    ${post.liked ? '❤️' : '🤍'} ${post.likes}
                </button>
                <button class="action-btn" onclick="toggleComments(${post.id})">
                    💬 ${post.comments.length}
                </button>
                <button class="action-btn ${post.saved ? 'saved' : ''}" onclick="toggleSave(${post.id})">
                    ${post.saved ? '🔖 Salvo' : '🏷️ Salvar'}
                </button>
            </div>

            <!-- Área de Comentários -->
            <div id="comments-${post.id}" class="comments-section">
                ${commentsHTML}
                <div class="comment-input-box">
                    <input type="text" id="input-comment-${post.id}" placeholder="Escreva um comentário...">
                    <button onclick="addComment(${post.id})">Enviar</button>
                </div>
            </div>
        `;

        postsList.appendChild(postElement);
    });
}

// Inicializa a renderização
renderPosts();