// Dados iniciais de Stories
const storiesData = [
    { id: 1, user: "ana_clara", avatar: "https://unsplash.com", storyImg: "https://unsplash.com", seen: false },
    { id: 2, user: "marcos.dev", avatar: "https://unsplash.com", storyImg: "https://unsplash.com", seen: false },
    { id: 3, user: "julia_arte", avatar: "https://unsplash.com", storyImg: "https://unsplash.com", seen: false },
    { id: 4, user: "pedro_trilhas", avatar: "https://unsplash.com", storyImg: "https://unsplash.com", seen: false },
    { id: 5, user: "cafe_com_livros", avatar: "https://unsplash.com", storyImg: "https://unsplash.com", seen: true }
];

// Dados iniciais do Feed
let postsData = [
    {
        id: 101,
        user: "ana_clara",
        avatar: "https://unsplash.com",
        location: "Teresina, Piauí",
        image: "https://unsplash.com",
        likes: 243,
        liked: false,
        saved: false,
        caption: "Fim de tarde perfeito para recarregar as energias! ✨🌅",
        time: "HÁ 2 HORAS",
        comments: [
            { user: "marcos.dev", text: "Que fotografia incrível!" }
        ]
    },
    {
        id: 102,
        user: "marcos.dev",
        avatar: "https://unsplash.com",
        location: "Home Office",
        image: "https://unsplash.com",
        likes: 89,
        liked: true,
        saved: false,
        caption: "Café passado e código limpo para começar bem a semana. 💻☕",
        time: "HÁ 5 HORAS",
        comments: []
    }
];

// Sugestões da barra lateral
const suggestionsData = [
    { user: "fotografia_br", info: "Novo no Instagram", avatar: "https://unsplash.com", following: false },
    { user: "design_ui", info: "Seguido por marcos.dev", avatar: "https://unsplash.com", following: false },
    { user: "viajante_solo", info: "Sugestão para você", avatar: "https://unsplash.com", following: false }
];

let showOnlySaved = false;
let storyTimer = null;

// --- RENDERIZAR STORIES ---
function renderStories() {
    const container = document.getElementById('storiesContainer');
    container.innerHTML = storiesData.map(story => `
        <div class="story-item" onclick="openStory(${story.id})">
            <div class="story-ring ${story.seen ? 'seen' : ''}">
                <img src="${story.avatar}" alt="${story.user}">
            </div>
            <span>${story.user}</span>
        </div>
    `).join('');
}

// --- ABRIR STORY COM PROGRESSO AUTOMÁTICO ---
function openStory(id) {
    const story = storiesData.find(s => s.id === id);
    if (!story) return;

    story.seen = true;
    renderStories();

    const modal = document.getElementById('storyModal');
    const fill = document.getElementById('storyProgressFill');
    document.getElementById('storyViewerAvatar').src = story.avatar;
    document.getElementById('storyViewerUser').textContent = story.user;
    document.getElementById('storyViewerImage').src = story.storyImg;

    modal.style.display = 'flex';
    fill.style.width = '0%';

    let progress = 0;
    clearInterval(storyTimer);
    storyTimer = setInterval(() => {
        progress += 2;
        fill.style.width = `${progress}%`;
        if (progress >= 100) closeStory();
    }, 80); // ~4 segundos
}

function closeStory() {
    clearInterval(storyTimer);
    document.getElementById('storyModal').style.display = 'none';
}

document.getElementById('closeStoryModal').addEventListener('click', closeStory);

// --- RENDERIZAR FEED ---
function renderPosts(filterText = '') {
    const container = document.getElementById('postsContainer');
    
    let filtered = postsData.filter(p => 
        p.user.toLowerCase().includes(filterText.toLowerCase()) ||
        p.caption.toLowerCase().includes(filterText.toLowerCase())
    );

    if (showOnlySaved) {
        filtered = filtered.filter(p => p.saved);
    }

    if (filtered.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:#8e8e8e; padding:40px;">Nenhuma publicação encontrada.</p>`;
        return;
    }

    container.innerHTML = filtered.map(post => `
        <article class="post">
            <div class="post-header">
                <div class="post-user">
                    <img src="${post.avatar}" alt="${post.user}">
                    <div class="post-user-meta">
                        <strong>${post.user}</strong>
                        ${post.location ? `<span>${post.location}</span>` : ''}
                    </div>
                </div>
                <span>•••</span>
            </div>

            <div class="post-media" ondblclick="handleDoubleTap(this, ${post.id})">
                <img src="${post.image}" alt="Publicação">
                <div class="double-tap-heart">❤️</div>
            </div>

            <div class="post-actions">
                <div class="actions-left">
                    <button class="action-icon" onclick="toggleLike(${post.id})">
                        ${post.liked ? '❤️' : '🤍'}
                    </button>
                    <button class="action-icon" onclick="focusComment(${post.id})">💬</button>
                    <button class="action-icon">🚀</button>
                </div>
                <button class="action-icon" onclick="toggleSave(${post.id})">
                    ${post.saved ? '🔖' : '📑'}
                </button>
            </div>

            <div class="post-likes">${post.likes.toLocaleString('pt-BR')} curtidas</div>

            <div class="post-caption">
                <strong>${post.user}</strong> ${post.caption}
            </div>

            <div class="post-comments">
                ${post.comments.map(c => `<p><strong>${c.user}</strong> ${c.text}</p>`).join('')}
            </div>

            <div class="post-time">${post.time}</div>

            <form class="comment-box" onsubmit="addComment(event, ${post.id})">
                <input type="text" id="comment-input-${post.id}" placeholder="Adicione um comentário..." required>
                <button type="submit">Publicar</button>
            </form>
        </article>
    `).join('');
}

// --- DUPLO CLIQUE PARA CURTIR ---
function handleDoubleTap(element, id) {
    const heart = element.querySelector('.double-tap-heart');
    heart.classList.add('animate');
    setTimeout(() => heart.classList.remove('animate'), 700);

    const post = postsData.find(p => p.id === id);
    if (post && !post.liked) {
        post.liked = true;
        post.likes++;
        setTimeout(() => renderPosts(), 300);
    }
}

function toggleLike(id) {
    const post = postsData.find(p => p.id === id);
    if (!post) return;
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    renderPosts();
}

function toggleSave(id) {
    const post = postsData.find(p => p.id === id);
    if (!post) return;
    post.saved = !post.saved;
    renderPosts();
}

function focusComment(id) {
    document.getElementById(`comment-input-${id}`).focus();
}

function addComment(e, id) {
    e.preventDefault();
    const input = document.getElementById(`comment-input-${id}`);
    const text = input.value.trim();
    if (!text) return;

    const post = postsData.find(p => p.id === id);
    post.comments.push({ user: "seu_usuario", text });
    renderPosts();
}

// --- SUGESTÕES DA BARRA LATERAL ---
function renderSuggestions() {
    const container = document.getElementById('suggestionsList');
    container.innerHTML = suggestionsData.map((s, idx) => `
        <div class="suggestion-item">
            <div class="suggestion-user">
                <img src="${s.avatar}" alt="${s.user}">
                <div>
                    <strong>${s.user}</strong>
                    <span>${s.info}</span>
                </div>
            </div>
            <button class="follow-btn ${s.following ? 'following' : ''}" onclick="toggleFollow(${idx})">
                ${s.following ? 'Seguindo' : 'Seguir'}
            </button>
        </div>
    `).join('');
}

function toggleFollow(index) {
    suggestionsData[index].following = !suggestionsData[index].following;
    renderSuggestions();
}

// --- MODAL CRIAR POST COM UPLOAD REAL ---
const createModal = document.getElementById('createModal');
const imageFileInput = document.getElementById('imageFileInput');
const imagePreview = document.getElementById('imagePreview');
let uploadedImageBase64 = '';

document.getElementById('openCreateModal').addEventListener('click', () => {
    createModal.style.display = 'flex';
});

document.getElementById('closeCreateModal').addEventListener('click', () => {
    createModal.style.display = 'none';
});

imageFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
