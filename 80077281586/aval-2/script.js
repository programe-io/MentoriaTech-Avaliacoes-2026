// Dados simulados de Stories
const storiesData = [
    { username: "seu_story", avatar: "https://pravatar.cc" },
    { username: "ana.viaja", avatar: "https://pravatar.cc" },
    { username: "lucas_dev", avatar: "https://pravatar.cc" },
    { username: "mari.art", avatar: "https://pravatar.cc" },
    { username: "pedro.foto", avatar: "https://pravatar.cc" },
    { username: "cafe_teria", avatar: "https://pravatar.cc" }
];

// Dados simulados de Posts
const postsData = [
    {
        id: 1,
        username: "ana.viaja",
        location: "Teresina, Piauí",
        avatar: "https://pravatar.cc",
        image: "https://unsplash.com",
        likes: 248,
        liked: false,
        saved: false,
        caption: "Fim de tarde perfeito para recarregar as energias! 🌊☀️",
        time: "Há 2 horas",
        comments: [
            { user: "lucas_dev", text: "Que foto incrível!" },
            { user: "mari.art", text: "Lugar maravilhoso 😍" }
        ]
    },
    {
        id: 2,
        username: "cafe_teria",
        location: "Centro Histórico",
        avatar: "https://pravatar.cc",
        image: "https://unsplash.com",
        likes: 512,
        liked: true,
        saved: false,
        caption: "Aquele café especial passado na hora para começar bem o dia ☕✨",
        time: "Há 5 horas",
        comments: [
            { user: "pedro.foto", text: "Já quero um desse hoje!" }
        ]
    }
];

const storiesList = document.getElementById('stories-list');
const feedPosts = document.getElementById('feed-posts');

// 1. Renderizar Stories
function renderStories() {
    storiesList.innerHTML = storiesData.map(story => `
        <div class="story-item" onclick="alert('Abrindo story de ${story.username}')">
            <div class="story-ring">
                <img src="${story.avatar}" alt="${story.username}">
            </div>
            <span class="story-username">${story.username}</span>
        </div>
    `).join('');
}

// 2. Renderizar Feed
function renderFeed() {
    feedPosts.innerHTML = postsData.map(post => `
        <article class="post-card" id="post-${post.id}">
            <!-- Cabeçalho -->
            <div class="post-header">
                <div class="post-user">
                    <img src="${post.avatar}" alt="${post.username}">
                    <div class="post-user-info">
                        <h4>${post.username}</h4>
                        <span>${post.location}</span>
                    </div>
                </div>
                <span style="cursor:pointer; font-weight:bold;">•••</span>
            </div>

            <!-- Imagem com duplo clique -->
            <div class="post-image-wrapper" ondblclick="doubleClickLike(${post.id})">
                <img src="${post.image}" alt="Post de ${post.username}" class="post-image">
                <div class="heart-overlay" id="overlay-${post.id}">❤️</div>
            </div>

            <!-- Botões de ação -->
            <div class="post-actions">
                <div class="actions-left">
                    <button class="action-btn" onclick="toggleLike(${post.id})">
                        ${post.liked ? '❤️' : '🤍'}
                    </button>
                    <button class="action-btn" onclick="focusComment(${post.id})">💬</button>
                    <button class="action-btn">✈️</button>
                </div>
                <button class="action-btn" onclick="toggleSave(${post.id})">
                    ${post.saved ? '🔖' : '📑'}
                </button>
            </div>

            <!-- Curtidas, legenda e comentários -->
            <div class="post-details">
                <div class="likes-count">${post.likes.toLocaleString('pt-BR')} curtidas</div>
                <div class="caption">
                    <strong>${post.username}</strong>${post.caption}
                </div>
                
                <div class="comments-list">
                    ${post.comments.map(c => `
                        <div class="comment-item"><strong>${c.user}</strong> ${c.text}</div>
                    `).join('')}
                </div>

                <div class="post-time">${post.time}</div>
            </div>

            <!-- Adicionar comentário -->
            <form class="comment-form" onsubmit="addComment(event, ${post.id})">
                <input type="text" class="comment-input" id="input-${post.id}" placeholder="Adicione um comentário..." oninput="toggleSubmitBtn(${post.id})">
                <button type="submit" class="comment-submit" id="btn-${post.id}" disabled>Publicar</button>
            </form>
        </article>
    `).join('');
}

// Curtir / Descurtir pelo botão
function toggleLike(id) {
    const post = postsData.find(p => p.id === id);
    if (!post) return;

    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    renderFeed();
}

// Curtir com duplo clique na imagem
function doubleClickLike(id) {
    const post = postsData.find(p => p.id === id);
    if (!post) return;

    if (!post.liked) {
        post.liked = true;
        post.likes += 1;
        renderFeed();
    }

    // Animação do coração gigante
    const overlay = document.getElementById(`overlay-${id}`);
    if (overlay) {
        overlay.classList.add('show');
        setTimeout(() => overlay.classList.remove('show'), 700);
    }
}

// Salvar post
function toggleSave(id) {
    const post = postsData.find(p => p.id === id);
    if (!post) return;

    post.saved = !post.saved;
    renderFeed();
}

// Focar no campo de comentário ao clicar no balão
function focusComment(id) {
    const input = document.getElementById(`input-${id}`);
    if (input) input.focus();
}

// Habilitar/desabilitar botão "Publicar"
function toggleSubmitBtn(id) {
    const input = document.getElementById(`input-${id}`);
    const btn = document.getElementById(`btn-${id}`);
    btn.disabled = input.value.trim() === '';
}

// Adicionar novo comentário
function addComment(event, id) {
    event.preventDefault();
    const input = document.getElementById(`input-${id}`);
    const text = input.value.trim();
    if (!text) return;

    const post = postsData.find(p => p.id === id);
    post.comments.push({ user: "voce", text: text });
    renderFeed();
}

// Inicializar aplicação
renderStories();
renderFeed();
