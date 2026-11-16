// --- DADOS INICIAIS (MOCK) ---
const storiesData = [
    { id: 1, user: "seu_story", avatar: "https://i.pravatar.cc/150?img=11", storyImg: "https://picsum.photos/id/1015/500/800", seen: false },
    { id: 2, user: "ana.codes", avatar: "https://i.pravatar.cc/150?img=5", storyImg: "https://picsum.photos/id/1018/500/800", seen: false },
    { id: 3, user: "lucas_ui", avatar: "https://i.pravatar.cc/150?img=12", storyImg: "https://picsum.photos/id/1025/500/800", seen: false },
    { id: 4, user: "mariana.travel", avatar: "https://i.pravatar.cc/150?img=9", storyImg: "https://picsum.photos/id/1036/500/800", seen: false },
    { id: 5, user: "tech_br", avatar: "https://i.pravatar.cc/150?img=33", storyImg: "https://picsum.photos/id/1040/500/800", seen: false },
    { id: 6, user: "cafe.dev", avatar: "https://i.pravatar.cc/150?img=24", storyImg: "https://picsum.photos/id/1060/500/800", seen: false },
    { id: 7, user: "design.daily", avatar: "https://i.pravatar.cc/150?img=45", storyImg: "https://picsum.photos/id/1074/500/800", seen: false }
];

let postsData = [
    {
        id: 101,
        user: "mariana.travel",
        avatar: "https://i.pravatar.cc/150?img=9",
        time: "2 h",
        image: "https://picsum.photos/id/1015/600/600",
        likes: 342,
        liked: false,
        saved: false,
        caption: "Fim de tarde perfeito nas montanhas! 🏔️✨",
        comments: [
            { user: "lucas_ui", text: "Que lugar incrível!!" },
            { user: "ana.codes", text: "Foto sensacional 😍" }
        ]
    },
    {
        id: 102,
        user: "cafe.dev",
        avatar: "https://i.pravatar.cc/150?img=24",
        time: "5 h",
        image: "https://picsum.photos/id/1060/600/600",
        likes: 891,
        liked: true,
        saved: false,
        caption: "Nada como um bom café antes de começar o deploy de sexta-feira ☕💻",
        comments: [
            { user: "tech_br", text: "Regra número 1: nunca faça deploy na sexta 😂" }
        ]
    }
];

const suggestionsData = [
    { user: "rocket_js", subtitle: "Seguido por ana.codes", avatar: "https://i.pravatar.cc/150?img=52", following: false },
    { user: "css.master", subtitle: "Novo no Instagram", avatar: "https://i.pravatar.cc/150?img=32", following: false },
    { user: "foto.urbana", subtitle: "Seguido por lucas_ui", avatar: "https://i.pravatar.cc/150?img=15", following: false }
];

// --- RENDERIZAÇÃO DE STORIES ---
function renderStories() {
    const container = document.getElementById("stories-container");
    container.innerHTML = storiesData.map(story => `
        <div class="story-item" onclick="openStory(${story.id})">
            <div class="story-ring ${story.seen ? 'seen' : ''}">
                <img src="${story.avatar}" alt="${story.user}">
            </div>
            <span>${story.user}</span>
        </div>
    `).join("");
}

// --- RENDERIZAÇÃO DO FEED ---
function renderFeed() {
    const container = document.getElementById("feed-container");
    container.innerHTML = postsData.map(post => `
        <article class="post" id="post-${post.id}">
            <div class="post-header">
                <div class="post-user">
                    <img src="${post.avatar}" alt="${post.user}">
                    <div class="post-user-info">
                        <strong>${post.user}</strong> <span class="post-time">• ${post.time}</span>
                    </div>
                </div>
                <i class="fa-solid fa-ellipsis" style="cursor:pointer;"></i>
            </div>

            <div class="post-image-container" ondblclick="handleDoubleTap(${post.id})">
                <img src="${post.image}" alt="Post de ${post.user}">
                <i class="fa-solid fa-heart double-tap-heart" id="heart-anim-${post.id}"></i>
            </div>

            <div class="post-actions">
                <div class="left-actions">
                    <button class="action-btn ${post.liked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                        <i class="${post.liked ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    </button>
                    <button class="action-btn" onclick="focusComment(${post.id})">
                        <i class="fa-regular fa-comment"></i>
                    </button>
                    <button class="action-btn">
                        <i class="fa-regular fa-paper-plane"></i>
                    </button>
                </div>
                <button class="action-btn" onclick="toggleSave(${post.id})">
                    <i class="${post.saved ? 'fa-solid' : 'fa-regular'} fa-bookmark"></i>
                </button>
            </div>

            <div class="post-likes">${post.likes.toLocaleString('pt-BR')} curtidas</div>

            <div class="post-caption">
                <strong>${post.user}</strong> ${post.caption}
            </div>

            <div class="post-comments">
                ${post.comments.map(c => `
                    <div class="comment-item"><strong>${c.user}</strong> ${c.text}</div>
                `).join("")}
            </div>

            <form class="add-comment" onsubmit="addComment(event, ${post.id})">
                <input type="text" id="input-${post.id}" placeholder="Adicione um comentário..." oninput="togglePostBtn(this)">
                <button type="submit">Publicar</button>
            </form>
        </article>
    `).join("");
}

// --- RENDERIZAÇÃO DE SUGESTÕES ---
function renderSuggestions() {
    const container = document.getElementById("suggestions-list");
    container.innerHTML = suggestionsData.map((sug, index) => `
        <div class="suggestion-item">
            <img src="${sug.avatar}" alt="${sug.user}">
            <div class="user-info">
                <strong>${sug.user}</strong>
                <span>${sug.subtitle}</span>
            </div>
            <button class="text-btn ${sug.following ? 'following' : ''}" onclick="toggleFollow(${index})">
                ${sug.following ? 'Seguindo' : 'Seguir'}
            </button>
        </div>
    `).join("");
}

// --- INTERAÇÕES ---
function toggleLike(postId) {
    const post = postsData.find(p => p.id === postId);
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    renderFeed();
}

function handleDoubleTap(postId) {
    const post = postsData.find(p => p.id === postId);
    if (!post.liked) {
        post.liked = true;
        post.likes += 1;
        renderFeed();
    }
    // Dispara animação do coração
    const heart = document.getElementById(`heart-anim-${postId}`);
    heart.classList.remove("animate");
    void heart.offsetWidth; // força reflow
    heart.classList.add("animate");
}

function toggleSave(postId) {
    const post = postsData.find(p => p.id === postId);
    post.saved = !post.saved;
    renderFeed();
}

function focusComment(postId) {
    document.getElementById(`input-${postId}`).focus();
}

function togglePostBtn(input) {
    const btn = input.nextElementSibling;
    if (input.value.trim().length > 0) {
        btn.classList.add("active");
    } else {
        btn.classList.remove("active");
    }
}

function addComment(event, postId) {
    event.preventDefault();
    const input = document.getElementById(`input-${postId}`);
    const text = input.value.trim();
    if (!text) return;

    const post = postsData.find(p => p.id === postId);
    post.comments.push({ user: "dev_front", text });
    renderFeed();
}

function toggleFollow(index) {
    suggestionsData[index].following = !suggestionsData[index].following;
    renderSuggestions();
}

// --- MODAL CRIAR PUBLICAÇÃO ---
const createModal = document.getElementById("create-modal");
document.getElementById("open-modal-btn").addEventListener("click", () => createModal.classList.add("open"));
document.getElementById("close-modal-btn").addEventListener("click", () => createModal.classList.remove("open"));

document.getElementById("new-post-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const urlInput = document.getElementById("post-image-url").value.trim();
    const caption = document.getElementById("post-caption").value.trim();
    
    // Gera uma imagem aleatória caso o usuário não informe URL
    const randomId = Math.floor(Math.random() * 200) + 10;
    const imageUrl = urlInput || `https://picsum.photos/id/${randomId}/600/600`;

    const newPost = {
        id: Date.now(),
        user: "dev_front",
        avatar: "https://i.pravatar.cc/150?img=11",
        time: "Agora",
        image: imageUrl,
        likes: 0,
        liked: false,
        saved: false,
        caption: caption,
        comments: []
    };

    postsData.unshift(newPost);
    renderFeed();
    e.target.reset();
    createModal.classList.remove("open");
});

// --- VISUALIZADOR DE STORIES ---
let storyTimeout;
const storyModal = document.getElementById("story-modal");

function openStory(storyId) {
    const story = storiesData.find(s => s.id === storyId);
    story.seen = true;
    renderStories();

    document.getElementById("story-user-avatar").src = story.avatar;
    document.getElementById("story-username").textContent = story.user;
    document.getElementById("story-image").src = story.storyImg;

    const progress = document.getElementById("story-progress");
    progress.style.transition = "none";
    progress.style.width = "0%";
    
    storyModal.classList.add("open");

    setTimeout(() => {
        progress.style.transition = "width 4s linear";
        progress.style.width = "100%";
    }, 50);

    clearTimeout(storyTimeout);
    storyTimeout = setTimeout(() => {
        closeStory();
    }, 4050);
}

function closeStory() {
    storyModal.classList.remove("open");
    clearTimeout(storyTimeout);
}

document.getElementById("close-story-btn").addEventListener("click", closeStory);

// --- INICIALIZAÇÃO ---
renderStories();
renderFeed();
renderSuggestions();