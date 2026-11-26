// Dados dos Stories
const stories = [
    { name: "seu_story", avatar: "https://unsplash.com" },
    { name: "champions", avatar: "https://unsplash.com" },
    { name: "brasileirao", avatar: "https://unsplash.com" },
    { name: "selecao_br", avatar: "https://unsplash.com" },
    { name: "premierleague", avatar: "https://unsplash.com" }
];

// Dados iniciais dos Posts
let posts = [
    {
        id: 1,
        username: "arena_futebol",
        avatar: "https://unsplash.com",
        image: "https://unsplash.com",
        caption: "Noite mágica de decisão! Nada supera o clima de estádio lotado sob os refletores. 🏟️⚽🔥",
        likes: 1420,
        liked: false,
        saved: false,
        time: "HÁ 2 HORAS",
        comments: [
            { user: "lucas_10", text: "Que foto absurda!" },
            { user: "mari_fut", text: "Melhor atmosfera do mundo 🙌" }
        ]
    },
    {
        id: 2,
        username: "tatica_fc",
        avatar: "https://unsplash.com",
        image: "https://unsplash.com",
        caption: "Treino intenso antes da grande final de domingo. Foco total nos 90 minutos!",
        likes: 856,
        liked: true,
        saved: false,
        time: "HÁ 5 HORAS",
        comments: [
            { user: "pedro_gol", text: "Vamo pra cima!" }
        ]
    }
];

// Elementos do DOM
const storiesContainer = document.getElementById('storiesContainer');
const feedContainer = document.getElementById('feedContainer');
const postModal = document.getElementById('postModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const publishPostBtn = document.getElementById('publishPostBtn');

// Renderizar Stories
function renderStories() {
    storiesContainer.innerHTML = stories.map(story => `
        <div class="story-item" onclick="alert('Visualizando story de ${story.name}')">
            <div class="story-ring">
                <img src="${story.avatar}" alt="${story.name}">
            </div>
            <span class="story-name">${story.name}</span>
        </div>
    `).join('');
}

// Renderizar Feed
function renderFeed() {
    feedContainer.innerHTML = posts.map(post => `
        <article class="post" data-id="${post.id}">
            <div class="post-header">
                <div class="post-user">
                    <img src="${post.avatar}" alt="${post.username}">
                    <span class="username">${post.username}</span>
                </div>
                <span>•••</span>
            </div>

            <div class="post-image-wrapper" ondblclick="doubleClickLike(${post.id}, this)">
                <img src="${post.image}" alt="Publicação" class="post-image">
                <div class="heart-overlay">❤️</div>
            </div>

            <div class="post-actions">
                <div class="left-actions">
                    <button class="icon-btn" onclick="toggleLike(${post.id})">
                        ${post.liked ? '❤️' : '🤍'}
                    </button>
                    <button class="icon-btn" onclick="focusComment(${post.id})">💬</button>
                    <button class="icon-btn" onclick="alert('Link copiado!')">🚀</button>
                </div>
                <button class="icon-btn" onclick="toggleSave(${post.id})">
                    ${post.saved ? '🔖' : '🏷️'}
                </button>
            </div>

            <div class="likes-count">${post.likes.toLocaleString('pt-BR')} curtidas</div>

            <div class="post-caption">
                <strong>${post.username}</strong> ${post.caption}
            </div>

            <div class="comments-list">
                ${post.comments.map(c => `
                    <div class="comment-item"><span>${c.user}</span>${c.text}</div>
                `).join('')}
            </div>

            <div class="post-time">${post.time}</div>

            <form class="comment-form" onsubmit="addComment(event, ${post.id})">
                <input type="text" class="comment-input" id="input-${post.id}" placeholder="Adicione um comentário..." required>
                <button type="submit" class="btn-comment">Publicar</button>
            </form>
        </article>
    `).join('');
}

// Curtir / Descurtir
function toggleLike(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    renderFeed();
}

// Duplo Clique na Foto
function doubleClickLike(id, wrapper) {
    const heart = wrapper.querySelector('.heart-overlay');
    heart.classList.add('animate');
    
    setTimeout(() => {
        heart.classList.remove('animate');
    }, 700);

    const post = posts.find(p => p.id === id);
    if (post && !post.liked) {
        post.liked = true;
        post.likes += 1;
        setTimeout(renderFeed, 600);
    }
}

// Salvar Post
function toggleSave(id) {
    const post = posts.find(p => p.id === id);
    if (post) {
        post.saved = !post.saved;
        renderFeed();
    }
}

// Focar no campo de comentário
function focusComment(id) {
    document.getElementById(`input-${id}`).focus();
}

// Adicionar Comentário
function addComment(event, id) {
    event.preventDefault();
    const input = document.getElementById(`input-${id}`);
    const text = input.value.trim();
    if (!text) return;

    const post = posts.find(p => p.id === id);
    if (post) {
        post.comments.push({ user: "voce_oficial", text });
        renderFeed();
    }
}

// Controle do Modal de Novo Post
openModalBtn.addEventListener('click', () => postModal.classList.add('active'));
closeModalBtn.addEventListener('click', () => postModal.classList.remove('active'));

publishPostBtn.addEventListener('click', () => {
    const imageUrl = document.getElementById('imageUrlInput').value.trim();
    const caption = document.getElementById('captionInput').value.trim();

    if (!imageUrl) {
        alert("Por favor, insira a URL de uma imagem.");
        return;
    }

    const newPost = {
        id: Date.now(),
        username: "voce_oficial",
        avatar: "https://unsplash.com",
        image: imageUrl,
        caption: caption || "Nova foto no feed!",
        likes: 1,
        liked: true,
        saved: false,
        time: "AGORA MESMO",
        comments: []
    };

    posts.unshift(newPost);
    document.getElementById('imageUrlInput').value = '';
    document.getElementById('captionInput').value = '';
    postModal.classList.remove('active');
    renderFeed();
});

// Inicialização
renderStories();
renderFeed();
