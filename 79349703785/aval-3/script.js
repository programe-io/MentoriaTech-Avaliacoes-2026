const stories = [
    {
        id: 1,
        user: "lily.bloom",
        initials: "LB",
        color: "linear-gradient(135deg, #c0566b, #e58c9e)",
        book: "É Assim que Acaba",
        text: "“Nem todo mundo que você ama vai te fazer bem.”",
        seen: false
    },
    {
        id: 2,
        user: "verity.books",
        initials: "VB",
        color: "linear-gradient(135deg, #1f2430, #4a5568)",
        book: "Verity",
        text: "Você acredita na Carta ou no Manuscrito? 👀",
        seen: false
    },
    {
        id: 3,
        user: "novembro9",
        initials: "N9",
        color: "linear-gradient(135deg, #833ab4, #fd1d1d)",
        book: "Novembro, 9",
        text: "Faltam poucos dias para o reencontro anual de Fallon e Ben!",
        seen: false
    },
    {
        id: 4,
        user: "miles.tate",
        initials: "MT",
        color: "linear-gradient(135deg, #355c7d, #6c5b7b)",
        book: "O Lado Feio do Amor",
        text: "Regra nº 1: Nunca pergunte sobre o passado.",
        seen: false
    },
    {
        id: 5,
        user: "quinn.graham",
        initials: "QG",
        color: "linear-gradient(135deg, #2b5876, #4e4376)",
        book: "Todas as Suas (Im)Perfeições",
        text: "“Ilumine suas qualidades, não apenas suas imperfeições.”",
        seen: false
    }
];

let igPosts = [
    {
        id: 101,
        username: "clara.bookstagram",
        initials: "CB",
        avatarColor: "#c0566b",
        book: "É Assim que Acaba",
        bgGradient: "linear-gradient(135deg, #b84a62 0%, #e3879b 100%)",
        artQuote: "“Continue a nadar. Mesmo quando a correnteza parecer forte demais.”",
        caption: "Releitura concluída e meu coração continua em pedaços. A jornada da Lily é uma das coisas mais corajosas que já li. 🌸✨ #ColleenHoover #EAssimQueAcaba",
        likes: 342,
        liked: false,
        saved: false,
        time: "HÁ 2 HORAS",
        comments: [
            { user: "lucas_leituras", text: "O melhor livro da CoHo sem dúvidas!" },
            { user: "bia.paginas", text: "Atlas Corrigan mora no meu coração ❤️" }
        ]
    },
    {
        id: 102,
        username: "suspense.literario",
        initials: "SL",
        avatarColor: "#2b2d42",
        book: "Verity",
        bgGradient: "linear-gradient(135deg, #1b1d29 0%, #464b63 100%)",
        artQuote: "“Encontre o que você ama e deixe que isso mate você.”",
        caption: "Terminei Verity às 3h da manhã e não consegui dormir depois daquelas últimas páginas. Quem mais ficou em choque com a reviravolta? 🖤📖 #Verity #Bookstagram",
        likes: 518,
        liked: true,
        saved: true,
        time: "HÁ 5 HORAS",
        comments: [
            { user: "mari.coho", text: "Eu fiquei olhando para o teto por 20 minutos depois de acabar!" }
        ]
    },
    {
        id: 103,
        username: "estante.romantica",
        initials: "ER",
        avatarColor: "#6d597a",
        book: "Todas as Suas (Im)Perfeições",
        bgGradient: "linear-gradient(135deg, #3d5a80 0%, #7d9ec4 100%)",
        artQuote: "“Se você iluminar apenas suas imperfeições, todas as suas qualidades ficarão na sombra.”",
        caption: "Um retrato sincero e emocionante sobre o casamento de Quinn e Graham. Preparem os lenços antes de começar! 💙 #CoHo #RomanceContemporaneo",
        likes: 219,
        liked: false,
        saved: false,
        time: "HÁ 1 DIA",
        comments: []
    }
];

let showOnlySaved = false;
let storyTimer = null;

const storiesBar = document.getElementById("storiesBar");
const feedStream = document.getElementById("feedStream");
const storyViewer = document.getElementById("storyViewer");
const storyProgress = document.getElementById("storyProgress");
const createModal = document.getElementById("createModal");
const toggleSavedFilterBtn = document.getElementById("toggleSavedFilter");

// Renderizar Stories
function renderStories() {
    storiesBar.innerHTML = stories.map(story => `
        <div class="story-item" onclick="openStory(${story.id})">
            <div class="story-ring ${story.seen ? "seen" : ""}">
                <div class="story-avatar" style="background: ${story.color};">
                    ${story.initials}
                </div>
            </div>
            <span class="story-name">${story.user}</span>
        </div>
    `).join("");
}

// Abrir Story com barra de progresso
function openStory(id) {
    const story = stories.find(s => s.id === id);
    if (!story) return;

    story.seen = true;
    renderStories();

    const card = storyViewer.querySelector(".story-card");
    card.style.background = story.color;
    document.getElementById("storyAvatar").textContent = story.initials;
    document.getElementById("storyUsername").textContent = story.user;
    document.getElementById("storyContent").innerHTML = `
        <h4>${story.book}</h4>
        <p>${story.text}</p>
    `;

    storyViewer.classList.add("open");
    storyProgress.style.width = "0%";

    let progress = 0;
    clearInterval(storyTimer);
    storyTimer = setInterval(() => {
        progress += 2;
        storyProgress.style.width = progress + "%";
        if (progress >= 100) {
            closeStoryModal();
        }
    }, 80);
}

function closeStoryModal() {
    clearInterval(storyTimer);
    storyViewer.classList.remove("open");
}

document.getElementById("closeStory").addEventListener("click", closeStoryModal);

// Renderizar Feed
function renderFeed() {
    const list = showOnlySaved ? igPosts.filter(p => p.saved) : igPosts;

    if (list.length === 0) {
        feedStream.innerHTML = `<div style="text-align:center; padding:3rem; color:#737373; background:#fff; border:1px solid #dbdbdb;">Nenhuma publicação salva ainda. Clique no ícone 🔖 para salvar seus posts favoritos.</div>`;
        return;
    }

    feedStream.innerHTML = list.map(post => `
        <article class="ig-post">
            <div class="ig-post-header">
                <div class="ig-user-meta">
                    <div class="ig-avatar" style="background: ${post.avatarColor};">${post.initials}</div>
                    <div>
                        <span class="ig-username">${post.username}</span>
                        <span class="ig-location">${post.book} • Colleen Hoover</span>
                    </div>
                </div>
                <span>•••</span>
            </div>

            <!-- Área da Foto com Duplo Clique -->
            <div class="ig-media" style="background: ${post.bgGradient};" ondblclick="handleDoubleTap(${post.id}, this)">
                <span class="media-book-tag">${post.book}</span>
                <p class="media-quote">${post.artQuote}</p>
                <span class="media-author">COLLEEN HOOVER</span>
                <div class="double-tap-heart">♥</div>
            </div>

            <!-- Ações Estilo Instagram -->
            <div class="ig-actions">
                <div class="ig-left-actions">
                    <button class="ig-action-btn ${post.liked ? "liked" : ""}" onclick="toggleLike(${post.id})">
                        ${post.liked ? "♥" : "♡"}
                    </button>
                    <button class="ig-action-btn" onclick="focusComment(${post.id})">💬</button>
                </div>
                <button class="ig-action-btn" onclick="toggleSave(${post.id})">
                    ${post.saved ? "🔖" : "📑"}
                </button>
            </div>

            <div class="ig-details">
                <span class="ig-likes">${post.likes} curtidas</span>
                <p class="ig-caption"><strong>${post.username}</strong>${post.caption}</p>

                <div class="ig-comments-list">
                    ${post.comments.map(c => `
                        <div class="ig-comment"><strong>${c.user}</strong>${c.text}</div>
                    `).join("")}
                </div>

                <span class="ig-time">${post.time}</span>
            </div>

            <form class="ig-comment-box" onsubmit="postComment(event, ${post.id})">
                <input type="text" id="comment-input-${post.id}" placeholder="Adicione um comentário..." required>
                <button type="submit">Publicar</button>
            </form>
        </article>
    `).join("");
}

function toggleLike(id) {
    const post = igPosts.find(p => p.id === id);
    if (!post) return;
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    renderFeed();
}

function handleDoubleTap(id, mediaEl) {
    const post = igPosts.find(p => p.id === id);
    if (!post) return;

    if (!post.liked) {
        post.liked = true;
        post.likes += 1;
        renderFeed();
    }

    const updatedHeart = document.querySelector(`[ondblclick="handleDoubleTap(${id}, this)"] .double-tap-heart`);
    if (updatedHeart) {
        updatedHeart.classList.add("pop");
        setTimeout(() => updatedHeart.classList.remove("pop"), 650);
    }
}

function toggleSave(id) {
    const post = igPosts.find(p => p.id === id);
    if (!post) return;
    post.saved = !post.saved;
    renderFeed();
}

function focusComment(id) {
    const input = document.getElementById(`comment-input-${id}`);
    if (input) input.focus();
}

function postComment(event, id) {
    event.preventDefault();
    const input = document.getElementById(`comment-input-${id}`);
    const text = input.value.trim();
    if (!text) return;

    const post = igPosts.find(p => p.id === id);
    if (!post) return;

    post.comments.push({ user: "voce.leitor", text });
    renderFeed();
}

// Modal de Criar Novo Post
document.getElementById("openCreateModal").addEventListener("click", () => {
    createModal.classList.add("open");
});

document.getElementById("closeCreateModal").addEventListener("click", () => {
    createModal.classList.remove("open");
});

document.getElementById("createPostForm").addEventListener("submit", (e) => {
    e.preventDefault();

