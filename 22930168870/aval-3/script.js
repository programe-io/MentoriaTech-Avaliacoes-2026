const storiesContainer = document.getElementById('stories-container');
const feedContainer = document.getElementById('feed-container');
const postModal = document.getElementById('post-modal');
const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const newPostForm = document.getElementById('new-post-form');

// Dados iniciais de Stories
const stories = [
    { user: "seu_story", avatar: "https://picsum.photos" },
    { user: "ana.dev", avatar: "https://picsum.photos" },
    { user: "carlos_foto", avatar: "https://picsum.photos" },
    { user: "viagens.br", avatar: "https://picsum.photos" },
    { user: "tech_news", avatar: "https://picsum.photos" }
];

// Dados iniciais do Feed
let posts = [
    {
        id: 1,
        user: "viagens.br",
        avatar: "https://picsum.photos",
        image: "https://picsum.photos",
        caption: "Fim de tarde incrível na serra! 🌄✨",
        likes: 142,
        liked: false,
        comments: [
            { user: "ana.dev", text: "Que lugar maravilhoso!" }
        ]
    },
    {
        id: 2,
        user: "carlos_foto",
        avatar: "https://picsum.photos",
        image: "https://picsum.photos",
        caption: "Explorando a arquitetura urbana hoje pela manhã. 📸",
        likes: 89,
        liked: true,
        comments: []
    }
];

// Renderizar Stories
function renderStories() {
    storiesContainer.innerHTML = stories.map(story => `
        <div class="story-item">
            <div class="story-ring">
                <img src="${story.avatar}" alt="${story.user}">
            </div>
            <span class="story-username">${story.user}</span>
        </div>
    `).join('');
}

// Renderizar Feed
function renderFeed() {
    feedContainer.innerHTML = posts.map(post => `
        <article class="post-card">
            <div class="post-header">
                <img src="${post.avatar}" alt="${post.user}" class="post-avatar">
                <span class="post-user">${escapeHTML(post.user)}</span>
            </div>

            <div class="post-image-wrapper" ondblclick="doubleClickLike(${post.id}, this)">
                <img src="${post.image}" alt="Publicação" class="post-image">
                <div class="heart-overlay">❤️</div>
            </div>

            <div class="post-body">
                <div class="post-actions">
                    <button class="action-btn" onclick="toggleLike(${post.id})">
                        ${post.liked ? '❤️' : '🤍'}
                    </button>
                    <button class="action-btn" onclick="focusComment(${post.id})">💬</button>
                </div>

                <div class="likes-count">${post.likes} curtidas</div>

                <div class="post-caption">
                    <strong>${escapeHTML(post.user)}</strong> ${escapeHTML(post.caption)}
                </div>

                <div class="comments-list">
                    ${post.comments.map(c => `
                        <div class="comment-item">
                            <strong>${escapeHTML(c.user)}</strong> ${escapeHTML(c.text)}
                        </div>
                    `).join('')}
                </div>

                <form class="comment-form" onsubmit="addComment(event, ${post.id})">
                    <input type="text" id="comment-input-${post.id}" class="comment-input" placeholder="Adicione um comentário..." required>
                    <button type="submit" class="comment-submit">Publicar</button>
                </form>
            </div>
        </article>
    `).join('');
}

// Curtir / Descurtir pelo botão
function toggleLike(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    renderFeed();
}

// Curtir com duplo clique na imagem
function doubleClickLike(postId, wrapperElement) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const heartIcon = wrapperElement.querySelector('.heart-overlay');
    heartIcon.classList.add('show');

    setTimeout(() => {
        heartIcon.classList.remove('show');
    }, 700);

    if (!post.liked) {
        post.liked = true;
        post.likes += 1;
        setTimeout(renderFeed, 650);
    }
}

// Focar no campo de comentário ao clicar no ícone 💬
function focusComment(postId) {
    const input = document.getElementById(`comment-input-${postId}`);
    if (input) input.focus();
}

// Adicionar comentário
function addComment(event, postId) {
    event.preventDefault();
    const input = document.getElementById(`comment-input-${postId}`);
    const text = input.value.trim();
    if (!text) return;

    const post = posts.find(p => p.id === postId);
    if (post) {
        post.comments.push({ user: "voce", text });
        renderFeed();
    }
}

// Controle do Modal de Nova Postagem
openModalBtn.addEventListener('click', () => postModal.classList.remove('hidden'));
closeModalBtn.addEventListener('click', () => postModal.classList.add('hidden'));

newPostForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const user = document.getElementById('username-input').value.trim();
    const image = document.getElementById('image-url-input').value.trim();
    const caption = document.getElementById('caption-input').value.trim();

    const newPost = {
        id: Date.now(),
        user: user,
        avatar: `https://picsum.photos{encodeURIComponent(user)}/100`,
        image: image,
        caption: caption,
        likes: 0,
        liked: false,
        comments: []
    };

    posts.unshift(newPost);
    newPostForm.reset();
    postModal.classList.add('hidden');
    renderFeed();
});

// Proteção contra HTML malicioso nos inputs
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag]));
}

// Inicialização
renderStories();
renderFeed();
