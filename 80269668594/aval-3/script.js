// Dados simulados dos Stories
const stories = [
    { username: "seu_story", avatar: "https://pravatar.cc" },
    { username: "ana.clara", avatar: "https://pravatar.cc" },
    { username: "lucas_dev", avatar: "https://pravatar.cc" },
    { username: "mariana.travels", avatar: "https://pravatar.cc" },
    { username: "pedro.foto", avatar: "https://pravatar.cc" },
    { username: "julia_art", avatar: "https://pravatar.cc" }
];

// Dados iniciais do Feed
let posts = [
    {
        id: 1,
        username: "mariana.travels",
        avatar: "https://pravatar.cc",
        image: "https://unsplash.com",
        caption: "Fim de tarde perfeito na praia! 🌅✨",
        likes: 124,
        liked: false,
        time: "HÁ 2 HORAS",
        comments: [
            { user: "ana.clara", text: "Que lugar incrível!!" }
        ]
    },
    {
        id: 2,
        username: "lucas_dev",
        avatar: "https://pravatar.cc",
        image: "https://unsplash.com",
        caption: "Setup pronto para mais um dia de código 💻☕",
        likes: 89,
        liked: true,
        time: "HÁ 5 HORAS",
        comments: []
    }
];

const storiesContainer = document.getElementById("storiesContainer");
const feedContainer = document.getElementById("feedContainer");

// Renderiza os Stories
function renderStories() {
    storiesContainer.innerHTML = stories.map(story => `
        <div class="story-item">
            <div class="story-ring">
                <img src="${story.avatar}" alt="${story.username}">
            </div>
            <span class="story-username">${story.username}</span>
        </div>
    `).join("");
}

// Renderiza o Feed
function renderFeed() {
    feedContainer.innerHTML = "";

    posts.forEach(post => {
        const postEl = document.createElement("article");
        postEl.classList.add("post-card");

        const commentsHtml = post.comments.map(c => `
            <div class="comment-item"><strong>${c.user}</strong> ${c.text}</div>
        `).join("");

        postEl.innerHTML = `
            <div class="post-header">
                <img src="${post.avatar}" alt="${post.username}" class="post-avatar">
                <span class="post-username">${post.username}</span>
            </div>
            <div class="post-image-container" ondblclick="likePost(${post.id}, true)">
                <img src="${post.image}" alt="Post" class="post-image">
            </div>
            <div class="post-actions">
                <button class="action-btn" onclick="likePost(${post.id})">
                    ${post.liked ? "❤️" : "🤍"}
                </button>
                <button class="action-btn" onclick="focusComment(${post.id})">💬</button>
                <button class="action-btn">📤</button>
            </div>
            <div class="post-likes">${post.likes} curtidas</div>
            <div class="post-caption">
                <strong>${post.username}</strong> ${post.caption}
            </div>
            <div class="post-comments">${commentsHtml}</div>
            <div class="post-time">${post.time}</div>
            <form class="comment-form" onsubmit="addComment(event, ${post.id})">
                <input type="text" id="comment-input-${post.id}" class="comment-input" placeholder="Adicione um comentário..." required>
                <button type="submit" class="comment-submit">Publicar</button>
            </form>
        `;

        feedContainer.appendChild(postEl);
    });
}

// Curtir / Descurtir Post
function likePost(id, onlyLike = false) {
    const post = posts.find(p => p.id === id);
    if (!post) return;

    if (onlyLike && post.liked) return; // Duplo clique não descurte

    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    renderFeed();
}

// Focar no campo de comentário ao clicar no ícone de balão
function focusComment(id) {
    document.getElementById(`comment-input-${id}`).focus();
}

// Adicionar Comentário
function addComment(event, id) {
    event.preventDefault();
    const input = document.getElementById(`comment-input-${id}`);
    const text = input.value.trim();

    if (text) {
        const post = posts.find(p => p.id === id);
        post.comments.push({ user: "voce_oficial", text });
        renderFeed();
    }
}

// Controle do Modal de Nova Publicação
const postModal = document.getElementById("postModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const publishPostBtn = document.getElementById("publishPostBtn");

openModalBtn.addEventListener("click", () => postModal.classList.remove("hidden"));
closeModalBtn.addEventListener("click", () => postModal.classList.add("hidden"));

publishPostBtn.addEventListener("click", () => {
    const imageUrl = document.getElementById("newPostImage").value.trim();
    const caption = document.getElementById("newPostCaption").value.trim();

    if (!imageUrl) {
        alert("Por favor, insira a URL de uma imagem.");
        return;
    }

    const newPost = {
        id: Date.now(),
        username: "voce_oficial",
        avatar: "https://pravatar.cc",
        image: imageUrl,
        caption: caption,
        likes: 0,
        liked: false,
        time: "AGORA MESMO",
        comments: []
    };

    posts.unshift(newPost);
    document.getElementById("newPostImage").value = "";
    document.getElementById("newPostCaption").value = "";
    postModal.classList.add("hidden");
    renderFeed();
});

// Inicialização
renderStories();
renderFeed();
