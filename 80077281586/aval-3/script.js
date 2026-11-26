// Dados iniciais
const stories = [
    { id: 1, user: "ana.costa", avatar: "https://pravatar.cc", storyImg: "https://unsplash.com", seen: false },
    { id: 2, user: "lucas_ui", avatar: "https://pravatar.cc", storyImg: "https://unsplash.com", seen: false },
    { id: 3, user: "mariana.art", avatar: "https://pravatar.cc", storyImg: "https://unsplash.com", seen: false },
    { id: 4, user: "cafe_nordeste", avatar: "https://pravatar.cc", storyImg: "https://unsplash.com", seen: false },
    { id: 5, user: "pedro.trilhas", avatar: "https://pravatar.cc", storyImg: "https://unsplash.com", seen: false }
];

let posts = [
    {
        id: 101,
        user: "ana.costa",
        location: "Ponte Estaiada, Teresina",
        avatar: "https://pravatar.cc",
        image: "https://unsplash.com",
        likes: 342,
        liked: false,
        saved: false,
        caption: "Explorando novos ângulos da cidade hoje! 📸✨",
        comments: [
            { user: "lucas_ui", text: "Ficou sensacional essa foto!" }
        ]
    },
    {
        id: 102,
        user: "cafe_nordeste",
        location: "Centro",
        avatar: "https://pravatar.cc",
        image: "https://unsplash.com",
        likes: 189,
        liked: true,
        saved: false,
        caption: "Pausa obrigatória para um café coado na hora ☕",
        comments: []
    }
];

const suggestions = [
    { id: 1, user: "carla.design", sub: "Seguido por ana.costa", avatar: "https://pravatar.cc", following: false },
    { id: 2, user: "tech_piaui", sub: "Novo no Instagram", avatar: "https://pravatar.cc3", following: false },
    { id: 3, user: "fotografia_br", sub: "Sugestão para você", avatar: "https://pravatar.cc", following: false }
];

// Renderizar Stories
function renderStories() {
    const container = document.getElementById('stories-bar');
    container.innerHTML = stories.map(s => `
        <div class="story-card" onclick="openStory(${s.id})">
            <div class="story-border ${s.seen ? 'seen' : ''}">
                <img src="${s.avatar}" alt="${s.user}">
            </div>
            <span>${s.user}</span>
        </div>
    `).join('');
}

// Renderizar Posts
function renderPosts() {
    const container = document.getElementById('posts-list');
    container.innerHTML = posts.map(p => `
        <article class="post">
            <div class="post-header">
                <div class="post-author">
                    <img src="${p.avatar}" alt="${p.user}">
                    <div>
                        <h4>${p.user}</h4>
                        ${p.location ? `<small>${p.location}</small>` : ''}
                    </div>
                </div>
                <span style="cursor:pointer;">•••</span>
            </div>

            <div class="post-media" ondblclick="handleDoubleTap(${p.id})">
                <img src="${p.image}" alt="Post">
                <div class="big-heart" id="heart-${p.id}">❤️</div>
            </div>

            <div class="post-controls">
                <div class="left-controls">
                    <button class="icon-action" onclick="toggleLike(${p.id})">${p.liked ? '❤️' : '🤍'}</button>
                    <button class="icon-action" onclick="document.getElementById('comment-in-${p.id}').focus()">💬</button>
                    <button class="icon-action">✈️</button>
                </div>
                <button class="icon-action" onclick="toggleSave(${p.id})">${p.saved ? '🔖' : '📑'}</button>
            </div>

            <div class="likes-text">${p.likes.toLocaleString('pt-BR')} curtidas</div>
            <div class="caption-text"><strong>${p.user}</strong> ${p.caption}</div>

            <div class="comments-box">
                ${p.comments.map(c => `<p><strong>${c.user}</strong> ${c.text}</p>`).join('')}
            </div>

            <form class="add-comment-form" onsubmit="submitComment(event, ${p.id})">
                <input type="text" id="comment-in-${p.id}" placeholder="Adicione um comentário...">
                <button type="submit">Publicar</button>
            </form>
        </article>
    `).join('');
}

// Renderizar Sugestões (Coluna Direita)
function renderSuggestions() {
    const container = document.getElementById('suggestions-list');
    container.innerHTML = suggestions.map(sug => `
        <div class="suggestion-row">
            <div class="user-info">
                <img src="${sug.avatar}" alt="${sug.user}">
                <div>
                    <strong>${sug.user}</strong>
                    <span>${sug.sub}</span>
                </div>
            </div>
            <button class="text-btn ${sug.following ? 'following' : ''}" onclick="toggleFollow(${sug.id})">
                ${sug.following ? 'Seguindo' : 'Seguir'}
            </button>
        </div>
    `).join('');
}

// Ações do Feed
function toggleLike(id) {
    const post = posts.find(p => p.id === id);
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    renderPosts();
}

function handleDoubleTap(id) {
    const post = posts.find(p => p.id === id);
    if (!post.liked) {
        post.liked = true;
        post.likes += 1;
        renderPosts();
    }
    const heart = document.getElementById(`heart-${id}`);
    heart.classList.add('animate');
    setTimeout(() => heart.classList.remove('animate'), 700);
}

function toggleSave(id) {
    const post = posts.find(p => p.id === id);
    post.saved = !post.saved;
    renderPosts();
}

function submitComment(e, id) {
    e.preventDefault();
    const input = document.getElementById(`comment-in-${id}`);
    if (!input.value.trim()) return;
    const post = posts.find(p => p.id === id);
    post.comments.push({ user: "dev.teresina", text: input.value.trim() });
    renderPosts();
}

function toggleFollow(id) {
    const sug = suggestions.find(s => s.id === id);
    sug.following = !sug.following;
    renderSuggestions();
}

// Visualizador de Stories com barra de progresso
let storyTimer;
const storyViewer = document.getElementById('story-viewer');
const progressFill = document.getElementById('story-progress-fill');

function openStory(id) {
    const story = stories.find(s => s.id === id);
    story.seen = true;
    renderStories();

    document.getElementById('story-viewer-avatar').src = story.avatar;
    document.getElementById('story-viewer-user').textContent = story.user;
    document.getElementById('story-viewer-img').src = story.storyImg;

    storyViewer.classList.remove('hidden');
    
    // Reset e animação da barra de progresso (4 segundos)
    progressFill.style.transition = 'none';
    progressFill.style.width = '0%';
    setTimeout(() => {
        progressFill.style.transition = 'width 4s linear';
        progressFill.style.width = '100%';
    }, 50);

    clearTimeout(storyTimer);
    storyTimer = setTimeout(closeStoryModal, 4050);
}

function closeStoryModal() {
    clearTimeout(storyTimer);
    storyViewer.classList.add('hidden');
}

document.getElementById('close-story').addEventListener('click', closeStoryModal);

// Modal de Criar Nova Publicação
const createModal = document.getElementById('create-modal');
const fileInput = document.getElementById('post-file-input');
const imagePreview = document.getElementById('image-preview');
let uploadedImageData = null;

document.getElementById('open-create-modal').addEventListener('click', () => {
    createModal.classList.remove('hidden');
});

document.getElementById('close-create').addEventListener('click', () => {
    createModal.classList.add('hidden');
});

// Pré-visualizar foto selecionada do computador
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        uploadedImageData = reader.result;
        imagePreview.src = uploadedImageData;
        imagePreview.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
});

// Publicar novo post no feed
document.getElementById('create-post-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!uploadedImageData) return;

    const location = document.getElementById('post-location-input').value.trim();
    const caption = document.getElementById('post-caption-input').value.trim();

    posts.unshift({
        id: Date.now(),
        user: "dev.teresina",
        location: location,
        avatar: "https://pravatar.cc",
        image: uploadedImageData,
        likes: 0,
        liked: false,
        saved: false,
        caption: caption,
        comments: []
    });

    // Resetar formulário e fechar modal
    e.target.reset();
    imagePreview.classList.add('hidden');
    uploadedImageData = null;
    createModal.classList.add('hidden');
    renderPosts();
});

// Inicializar tudo
renderStories();
renderPosts();
renderSuggestions();
