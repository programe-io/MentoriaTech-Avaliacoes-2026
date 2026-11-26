// Dados de Stories
const stories = [
    { id: 1, user: "mariana.style", avatar: "https://unsplash.com", foto: "https://unsplash.com", visto: false },
    { id: 2, user: "pedro.foto", avatar: "https://unsplash.com", foto: "https://unsplash.com", visto: false },
    { id: 3, user: "cafe.teria", avatar: "https://unsplash.com", foto: "https://unsplash.com", visto: false },
    { id: 4, user: "studio.design", avatar: "https://unsplash.com", foto: "https://unsplash.com", visto: false }
];

// Dados do Feed
let posts = [
    {
        id: 101,
        user: "mariana.style",
        location: "São Paulo, SP",
        avatar: "https://unsplash.com",
        imagem: "https://unsplash.com",
        likes: 342,
        liked: false,
        saved: false,
        caption: "Editorial de fim de tarde ✨",
        comments: [
            { user: "pedro.foto", text: "Iluminação perfeita!" }
        ]
    },
    {
        id: 102,
        user: "pedro.foto",
        location: "Rio de Janeiro",
        avatar: "https://unsplash.com",
        imagem: "https://unsplash.com",
        likes: 819,
        liked: true,
        saved: false,
        caption: "Dias de sol e mar 🌊☀️",
        comments: []
    }
];

// Sugestões de perfis
const sugestoes = [
    { user: "atelier.minimal", desc: "Novo no Instagram", avatar: "https://unsplash.com", seguindo: false },
    { user: "lucas.dev", desc: "Seguido por pedro.foto", avatar: "https://unsplash.com", seguindo: false }
];

let abaAtual = "feed";
let storyTimer = null;

// Renderizar Stories
function renderizarStories() {
    const container = document.getElementById("stories-list");
    container.innerHTML = stories.map(s => `
        <div class="story-card" onclick="abrirStory(${s.id})">
            <div class="story-ring ${s.visto ? 'seen' : ''}">
                <img src="${s.avatar}" alt="${s.user}">
            </div>
            <span>${s.user}</span>
        </div>
    `).join("");
}

// Renderizar Posts
function renderizarPosts() {
    const container = document.getElementById("posts-container");
    const lista = abaAtual === "salvos" ? posts.filter(p => p.saved) : posts;

    if (lista.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:#737373; padding:40px 0;">Nenhuma publicação salva ainda.</p>`;
        return;
    }

    container.innerHTML = lista.map(post => `
        <article class="post">
            <div class="post-header">
                <img src="${post.avatar}" alt="${post.user}">
                <div class="post-user-meta">
                    <strong>${post.user}</strong>
                    ${post.location ? `<small>${post.location}</small>` : ""}
                </div>
            </div>

            <div class="post-media" ondblclick="curtirDuploClique(${post.id}, this)">
                <img src="${post.imagem}" alt="Post de ${post.user}">
                <div class="heart-burst">♥</div>
            </div>

            <div class="post-actions">
                <div class="actions-left">
                    <button class="icon-btn ${post.liked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                        ${post.liked ? '♥' : '♡'}
                    </button>
                    <button class="icon-btn" onclick="focarComentario(${post.id})">💬</button>
                </div>
                <button class="icon-btn" onclick="toggleSave(${post.id})" title="Salvar">
                    ${post.saved ? '⚑' : '⚐'}
                </button>
            </div>

            <div class="likes-label">${post.likes.toLocaleString('pt-BR')} curtidas</div>
            <p class="caption-text"><strong>${post.user}</strong> ${post.caption}</p>

            <div class="comments-box">
                ${post.comments.map(c => `<div><strong>${c.user}</strong> ${c.text}</div>`).join("")}
            </div>

            <form class="add-comment" onsubmit="enviarComentario(event, ${post.id})">
                <input type="text" id="input-comment-${post.id}" placeholder="Adicione um comentário..." required>
                <button type="submit">Publicar</button>
            </form>
        </article>
    `).join("");
}

// Renderizar Sugestões
function renderizarSugestoes() {
    const container = document.getElementById("suggestions-list");
    container.innerHTML = sugestoes.map((s, idx) => `
        <div class="suggestion-item">
            <div class="suggestion-left">
                <img src="${s.avatar}" alt="${s.user}">
                <div class="profile-info">
                    <strong>${s.user}</strong>
                    <span>${s.desc}</span>
                </div>
            </div>
            <button class="follow-btn ${s.seguindo ? 'following' : ''}" onclick="toggleSeguir(${idx})">
                ${s.seguindo ? 'Seguindo' : 'Seguir'}
            </button>
        </div>
    `).join("");
}

// Interações
function toggleLike(id) {
    const post = posts.find(p => p.id === id);
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    renderizarPosts();
}

function curtirDuploClique(id, mediaEl) {
    const post = posts.find(p => p.id === id);
    if (!post.liked) {
        post.liked = true;
        post.likes++;
    }
    const heart = mediaEl.querySelector(".heart-burst");
    heart.classList.add("animate");
    setTimeout(() => {
        heart.classList.remove("animate");
        renderizarPosts();
    }, 650);
}

function toggleSave(id) {
    const post = posts.find(p => p.id === id);
    post.saved = !post.saved;
    renderizarPosts();
}

function focarComentario(id) {
    document.getElementById(`input-comment-${id}`).focus();
}

function enviarComentario(e, id) {
    e.preventDefault();
    const input = document.getElementById(`input-comment-${id}`);
    const post = posts.find(p => p.id === id);
    post.comments.push({ user: "seu.perfil", text: input.value.trim() });
    renderizarPosts();
}

function toggleSeguir(index) {
    sugestoes[index].seguindo = !sugestoes[index].seguindo;
    renderizarSugestoes();
}

function mudarAba(aba, btn) {
    abaAtual = aba;
    document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));
    btn.classList.add("active");
    renderizarPosts();
}

// Stories Modal
function abrirStory(id) {
    const story = stories.find(s => s.id === id);
    story.visto = true;
    renderizarStories();

    document.getElementById("story-user-img").src = story.avatar;
    document.getElementById("story-user-name").textContent = story.user;
    document.getElementById("story-main-img").src = story.foto;
    document.getElementById("story-modal").style.display = "flex";

    const bar = document.getElementById("story-bar");
    bar.style.transition = "none";
    bar.style.width = "0%";
    setTimeout(() => {
        bar.style.transition = "width 4s linear";
        bar.style.width = "100%";
    }, 50);

    clearTimeout(storyTimer);
    storyTimer = setTimeout(fecharStory, 4050);
}

function fecharStory() {
    clearTimeout(storyTimer);
    document.getElementById("story-modal").style.display = "none";
}

// Criar Nova Publicação
function abrirModalCriar() {
    document.getElementById("create-modal").style.display = "flex";
}

function fecharModalCriar() {
    document.getElementById("create-modal").style.display = "none";
}

document.getElementById("new-post-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const novoPost = {
        id: Date.now(),
        user: "seu.perfil",
        location: document.getElementById("post-location").value.trim(),
        avatar: "https://unsplash.com",
        imagem: document.getElementById("img-url").value.trim(),
        likes: 0,
        liked: false,
        saved: false,
        caption: document.getElementById("post-caption").value.trim(),
        comments: []
    };
    posts.unshift(novoPost);
    this.reset();
    fecharModalCriar();
    renderizarPosts();
});

// Inicializar Aplicação
renderizarStories();
renderizarPosts();
renderizarSugestoes();
