// --- Dados Mockados ---
const storiesData = [
    { username: "seu_story", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" },
    { username: "marcos.dev", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" },
    { username: "laura_tech", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" },
    { username: "code_guru", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" },
    { username: "design_hub", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80" }
];

const suggestionsData = [
    { username: "aline_codes", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80", info: "Seguido(a) por marcos.dev" },
    { username: "front_end_br", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80", info: "Novo no Instagram" },
    { username: "css_master", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80", info: "Seguido por laura_tech" }
];

let postsData = [
    {
        id: 1,
        author: "laura_tech",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
        likes: 142,
        liked: false,
        saved: false,
        caption: "Dia produtivo focando na construção de interfaces limpas e responsivas! 💻✨",
        comments: [
            { user: "marcos.dev", text: "Ficou top demais!" },
            { user: "seu_usuario", text: "Excelente setup 🔥" }
        ]
    },
    {
        id: 2,
        author: "code_guru",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
        likes: 89,
        liked: false,
        saved: false,
        caption: "Sem filtro! Café + Código = Combinação perfeita para o café da manhã. ☕",
        comments: []
    }
];

// --- Renderização Inicial ---
document.addEventListener("DOMContentLoaded", () => {
    renderStories();
    renderSuggestions();
    renderPosts();
    setupThemeToggle();
    setupModal();
});

// Renderizar Stories
function renderStories() {
    const container = document.getElementById("stories-container");
    container.innerHTML = storiesData.map(story => `
        <div class="story-item">
            <div class="avatar-ring">
                <img src="${story.avatar}" alt="${story.username}" class="avatar-img">
            </div>
            <span class="story-username">${story.username}</span>
        </div>
    `).join("");
}

// Renderizar Sugestões
function renderSuggestions() {
    const container = document.getElementById("suggestions-container");
    container.innerHTML = suggestionsData.map(item => `
        <div class="suggestion-item">
            <div class="user-profile">
                <img src="${item.avatar}" alt="${item.username}" class="avatar-img">
                <div class="user-info">
                    <span class="username">${item.username}</span>
                    <span class="name">${item.info}</span>
                </div>
            </div>
            <button class="link-btn">Seguir</button>
        </div>
    `).join("");
}

// Renderizar Posts
function renderPosts() {
    const container = document.getElementById("posts-container");
    container.innerHTML = postsData.map(post => `
        <article class="post-card">
            <div class="post-header-info">
                <div class="post-author-box">
                    <img src="${post.avatar}" alt="${post.author}" class="avatar-img">
                    <span class="post-author-name">${post.author}</span>
                </div>
                <button class="icon-btn">•••</button>
            </div>

            <div class="post-image-box" ondblclick="doubleClickLike(${post.id})">
                <img src="${post.image}" alt="Post Image">
                <div class="heart-pop" id="heart-pop-${post.id}">❤️</div>
            </div>

            <div class="post-actions">
                <div class="left-actions">
                    <button class="icon-btn" onclick="toggleLike(${post.id})">
                        ${post.liked ? '❤️' : '🤍'}
                    </button>
                    <button class="icon-btn" onclick="focusCommentInput(${post.id})">💬</button>
                    <button class="icon-btn">✈️</button>
                </div>
                <button class="icon-btn" onclick="toggleSave(${post.id})">
                    ${post.saved ? '🏷️' : '🔖'}
                </button>
            </div>

            <div class="post-likes">${post.likes} curtidas</div>

            <div class="post-caption">
                <span class="username">${post.author}</span>${post.caption}
            </div>

            <div class="comments-list">
                ${post.comments.map(c => `
                    <div class="comment-line">
                        <strong>${c.user}</strong>${c.text}
                    </div>
                `).join("")}
            </div>

            <div class="comment-box">
                <input type="text" id="comment-input-${post.id}" placeholder="Adicione um comentário...">
                <button onclick="addComment(${post.id})">Publicar</button>
            </div>
        </article>
    `).join("");
}

// --- Funções Interativas dos Posts ---

// Curtir / Descurtir
function toggleLike(id) {
    postsData = postsData.map(post => {
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

// Curtir via Toque Duplo na foto (Double-Tap)
function doubleClickLike(id) {
    const post = postsData.find(p => p.id === id);
    if (!post) return;

    if (!post.liked) {
        toggleLike(id);
    }

    const heart = document.getElementById(`heart-pop-${id}`);
    if (heart) {
        heart.classList.add("animate");
        setTimeout(() => heart.classList.remove("animate"), 800);
    }
}

// Salvar / Desalvar
function toggleSave(id) {
    postsData = postsData.map(post => {
        if (post.id === id) {
            return { ...post, saved: !post.saved };
        }
        return post;
    });
    renderPosts();
}

// Adicionar Comentário
function addComment(id) {
    const input = document.getElementById(`comment-input-${id}`);
    const text = input.value.trim();
    if (!text) return;

    postsData = postsData.map(post => {
        if (post.id === id) {
            return {
                ...post,
                comments: [...post.comments, { user: "seu_usuario", text }]
            };
        }
        return post;
    });

    renderPosts();
}

function focusCommentInput(id) {
    const input = document.getElementById(`comment-input-${id}`);
    if (input) input.focus();
}

// --- Criar Novo Post ---
function setupModal() {
    const modal = document.getElementById("create-modal");
    const openBtn = document.getElementById("create-post-btn");
    const closeBtn = document.getElementById("close-modal");
    const submitBtn = document.getElementById("submit-post-btn");

    openBtn.addEventListener("click", () => modal.classList.add("active"));
    closeBtn.addEventListener("click", () => modal.classList.remove("active"));

    submitBtn.addEventListener("click", () => {
        const imgUrl = document.getElementById("img-url-input").value.trim();
        const caption = document.getElementById("caption-input").value.trim();

        if (!imgUrl) {
            alert("Por favor, informe a URL de uma imagem!");
            return;
        }

        const newPost = {
            id: Date.now(),
            author: "seu_usuario",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
            image: imgUrl,
            likes: 0,