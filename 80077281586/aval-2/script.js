// Banco de dados inicial do Feed
let posts = [
    {
        id: 1,
        name: "Camila Rocha",
        handle: "@camilarocha",
        avatar: "https://pravatar.cc",
        time: "15m",
        content: "Acabei de finalizar meu primeiro projeto usando apenas HTML, CSS e JavaScript puro. A sensação de ver tudo funcionando sem depender de bibliotecas externas é incrível! 🚀💻",
        image: null,
        replies: 4,
        reposts: 12,
        likes: 48,
        liked: false,
        reposted: false
    },
    {
        id: 2,
        name: "Piauí Tech",
        handle: "@piauitech",
        avatar: "https://pravatar.cc",
        time: "2h",
        content: "Fim de tarde espetacular no encontro da Potycabana hoje em Teresina! Nada melhor que programar ao ar livre. ☀️🌴",
        image: "https://unsplash.com",
        replies: 9,
        reposts: 21,
        likes: 134,
        liked: true,
        reposted: false
    },
    {
        id: 3,
        name: "Rafael Mendes",
        handle: "@rafamendes_dev",
        avatar: "https://pravatar.cc",
        time: "5h",
        content: "Dica rápida de CSS: use `backdrop-filter: blur(12px)` nos cabeçalhos fixos para criar aquele efeito translúcido moderno estilo vidro fosco.",
        image: null,
        replies: 2,
        reposts: 35,
        likes: 210,
        liked: false,
        reposted: true
    }
];

// Elementos da interface
const feedStream = document.getElementById('feed-stream');
const textarea = document.getElementById('post-textarea');
const charCounter = document.getElementById('char-counter');
const publishBtn = document.getElementById('publish-btn');
const tabButtons = document.querySelectorAll('.tab-btn');

let currentFilter = 'all';

// 1. Renderizar o Feed
function renderFeed() {
    const filteredPosts = currentFilter === 'liked' 
        ? posts.filter(p => p.liked) 
        : posts;

    if (filteredPosts.length === 0) {
        feedStream.innerHTML = `<div class="empty-state">Nenhuma publicação encontrada nesta aba.</div>`;
        return;
    }

    feedStream.innerHTML = filteredPosts.map(post => `
        <article class="post-item">
            <img src="${post.avatar}" alt="${post.name}" class="avatar">
            <div class="post-body">
                <div class="post-meta">
                    <span class="author-name">${post.name}</span>
                    <span class="author-handle">${post.handle}</span>
                    <span class="post-time">· ${post.time}</span>
                </div>
                <p class="post-text">${escapeHTML(post.content)}</p>
                ${post.image ? `<img src="${post.image}" alt="Imagem do post" class="post-image">` : ''}
                
                <div class="post-actions">
                    <button class="action-btn" onclick="replyPost(${post.id})">
                        💬 <span>${post.replies}</span>
                    </button>
                    <button class="action-btn ${post.reposted ? 'reposted' : ''}" onclick="toggleRepost(${post.id})">
                        🔁 <span>${post.reposts}</span>
                    </button>
                    <button class="action-btn ${post.liked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                        ${post.liked ? '❤️' : '🤍'} <span>${post.likes}</span>
                    </button>
                    <button class="action-btn" onclick="deletePost(${post.id})" title="Excluir post">
                        🗑️
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}

// Prevenir injeção de HTML no texto digitado
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// 2. Controle do Campo de Texto e Contador de Caracteres
textarea.addEventListener('input', () => {
    const remaining = 280 - textarea.value.length;
    charCounter.textContent = remaining;

    if (remaining <= 20) {
        charCounter.classList.add('warning');
    } else {
        charCounter.classList.remove('warning');
    }

    publishBtn.disabled = textarea.value.trim().length === 0;
});

// 3. Criar Nova Publicação
publishBtn.addEventListener('click', () => {
    const text = textarea.value.trim();
    if (!text) return;

    const newPost = {
        id: Date.now(),
        name: "Você",
        handle: "@seu_usuario",
        avatar: "https://pravatar.cc",
        time: "Agora",
        content: text,
        image: null,
        replies: 0,
        reposts: 0,
        likes: 0,
        liked: false,
        reposted: false
    };

    posts.unshift(newPost); // Adiciona no topo do feed
    textarea.value = '';
    charCounter.textContent = '280';
    publishBtn.disabled = true;
    renderFeed();
});

// 4. Interações (Curtir, Repostar, Responder, Excluir)
function toggleLike(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    renderFeed();
}

function toggleRepost(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    post.reposted = !post.reposted;
    post.reposts += post.reposted ? 1 : -1;
    renderFeed();
}

function replyPost(id) {
    const reply = prompt("Digite sua resposta para este post:");
    if (reply && reply.trim() !== "") {
        const post = posts.find(p => p.id === id);
        post.replies += 1;
        renderFeed();
    }
}

function deletePost(id) {
    posts = posts.filter(p => p.id !== id);
    renderFeed();
}

// 5. Alternar Abas ("Para você" vs "Curtidos")
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderFeed();
    });
});

// Inicializar feed
renderFeed();
