// Dados Mockados para simular o conteúdo da rede social
const storiesData = [
    { user: "seu_story", avatar: "👤" },
    { user: "viagens", avatar: "✈️" },
    { user: "gatinhos", avatar: "🐱" },
    { user: "dev_life", avatar: "💻" },
    { user: "fitness", avatar: "💪" }
];

const feedData = [
    {
        id: 1,
        user: "gatinhos",
        userAvatar: "🐱",
        media: "🐈",
        likes: 124,
        liked: false,
        caption: "Apenas tirando um cochilo da tarde... 💤",
        comments: [
            { user: "dev_life", text: "Queria estar assim hoje kk" }
        ]
    },
    {
        id: 2,
        user: "viagens",
        userAvatar: "✈️",
        media: "🏔️",
        likes: 856,
        liked: false,
        caption: "Mais uma aventura concluída no topo do mundo!",
        comments: []
    }
];

// Inserir os Stories dinamicamente
function renderStories() {
    const container = document.getElementById('stories-list');
    container.innerHTML = storiesData.map(story => `
        <div class="story-item">
            <div class="story-ring">
                <div class="story-avatar">${story.avatar}</div>
            </div>
            <span>${story.user}</span>
        </div>
    `).join('');
}

// Inserir os posts no Feed dinamicamente
function renderFeed() {
    const container = document.getElementById('feed-list');
    container.innerHTML = feedData.map(post => `
        <article class="post-card">
            <div class="post-header">
                <div class="post-user-avatar">${post.userAvatar}</div>
                <div class="post-username">${post.user}</div>
            </div>
            
            <div class="post-image-placeholder">
                ${post.media}
            </div>

            <div class="post-actions-bar">
                <span class="action-btn" onclick="toggleLike(${post.id})">
                    ${post.liked ? '❤️' : '🤍'}
                </span>
                <span class="action-btn">💬</span>
                <span class="action-btn">✈️</span>
            </div>

            <div class="post-info">
                <span class="likes-count" id="likes-${post.id}">${post.likes} curtidas</span>
                <p class="post-caption"><span>${post.user}</span>${post.caption}</p>
            </div>

            <div class="comments-section" id="comments-box-${post.id}">
                ${post.comments.map(c => `
                    <div class="comment"><strong>${c.user}</strong>${c.text}</div>
                `).join('')}
            </div>

            <form class="comment-form" onsubmit="addComment(event, ${post.id})">
                <input type="text" placeholder="Adicione um comentário..." class="comment-input" required id="input-${post.id}">
                <button type="submit" class="comment-btn">Publicar</button>
            </form>
        </article>
    `).join('');
}

// Lógica de Curtir Post (Mudar ícone e atualizar contador)
function toggleLike(id) {
    const post = feedData.find(p => p.id === id);
    if (post) {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
        renderFeed(); // Re-renderiza o feed atualizado
    }
}

// Lógica para enviar novo comentário
function addComment(event, id) {
    event.preventDefault();
    const input = document.getElementById(`input-${id}`);
    const post = feedData.find(p => p.id === id);

    if (post && input.value.trim() !== '') {
        post.comments.push({
            user: "seu_usuario",
            text: input.value
        });
        input.value = '';
        renderFeed();
    }
}

// Inicializa a aplicação
document.addEventListener("DOMContentLoaded", () => {
    renderStories();
    renderFeed();
});
