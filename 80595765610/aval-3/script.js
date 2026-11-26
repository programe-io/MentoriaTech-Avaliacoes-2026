// Dados iniciais simulados
const storiesData = [
    { username: "ana.clara", avatar: "https://pravatar.cc" },
    { username: "pedro_tech", avatar: "https://pravatar.cc" },
    { username: "mariana.art", avatar: "https://pravatar.cc" },
    { username: "lucas.fit", avatar: "https://pravatar.cc" },
    { username: "cafe_com_codigo", avatar: "https://pravatar.cc2" },
    { username: "julia.trips", avatar: "https://pravatar.cc6" }
];

let postsData = [
    {
        id: 1,
        username: "julia.trips",
        avatar: "https://pravatar.cc6",
        image: "https://unsplash.com",
        likes: 248,
        liked: false,
        saved: false,
        caption: "Fim de tarde perfeito na praia! 🌅🌊 #ferias #verao",
        time: "HÁ 2 HORAS",
        comments: [
            { user: "ana.clara", text: "Que lugar incrível!!" }
        ]
    },
    {
        id: 2,
        username: "cafe_com_codigo",
        avatar: "https://pravatar.cc2",
        image: "https://unsplash.com",
        likes: 512,
        liked: true,
        saved: false,
        caption: "Setup pronto para mais um dia de muito JavaScript e café. ☕💻",
        time: "HÁ 5 HORAS",
        comments: [
            { user: "pedro_tech", text: "Melhor combinação possível!" },
            { user: "dev_brasil", text: "Clean demais esse setup." }
        ]
    }
];

// Renderizar Stories
function renderStories() {
    const container = document.getElementById("stories-container");
    container.innerHTML = storiesData.map(story => `
        <div class="story-item">
            <div class="story-ring">
                <img src="${story.avatar}" alt="${story.username}">
            </div>
            <span>${story.username}</span>
        </div>
    `).join("");
}

// Renderizar Feed de Posts
function renderPosts() {
    const container = document.getElementById("posts-container");
    container.innerHTML = postsData.map(post => `
        <article class="post-card" data-id="${post.id}">
            <div class="post-header">
                <div class="post-user">
                    <img src="${post.avatar}" alt="${post.username}">
                    <strong>${post.username}</strong>
                </div>
                <i class="fa-solid fa-ellipsis" style="cursor:pointer;"></i>
            </div>

            <div class="post-image-wrapper" ondblclick="handleDoubleClick(${post.id})">
                <img src="${post.image}" alt="Post" class="post-image">
                <i class="fa-solid fa-heart heart-animation" id="heart-anim-${post.id}"></i>
            </div>

            <div class="post-actions">
                <div class="left-actions">
                    <i class="${post.liked ? 'fa-solid liked' : 'fa-regular'} fa-heart" onclick="toggleLike(${post.id})"></i>
                    <i class="fa-regular fa-comment" onclick="focusComment(${post.id})"></i>
                    <i class="fa-regular fa-paper-plane"></i>
                </div>
                <i class="${post.saved ? 'fa-solid' : 'fa-regular'} fa-bookmark" onclick="toggleSave(${post.id})"></i>
            </div>

            <div class="post-info">
                <span class="likes-count">${post.likes} curtidas</span>
                <p class="caption"><strong>${post.username}</strong> ${post.caption}</p>
                
                <div class="comments-list">
                    ${post.comments.map(c => `
                        <div class="comment-item"><strong>${c.user}</strong> ${c.text}</div>
                    `).join("")}
                </div>
                
                <span class="post-time">${post.time}</span>
            </div>

            <form class="add-comment" onsubmit="addComment(event, ${post.id})">
                <input type="text" id="input-comment-${post.id}" placeholder="Adicione um comentário..." oninput="togglePostBtn(${post.id})">
                <button type="submit" id="btn-comment-${post.id}" disabled>Publicar</button>
            </form>
        </article>
    `).join("");
}

// Curtir / Descurtir
function toggleLike(postId) {
    const post = postsData.find(p => p.id === postId);
    if (!post) return;
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    renderPosts();
}

// Duplo Clique na Foto
function handleDoubleClick(postId) {
    const post = postsData.find(p => p.id === postId);
    if (!post.liked) {
        post.liked = true;
        post.likes += 1;
        renderPosts();
    }
    
    // Dispara animação do coração
    setTimeout(() => {
        const heart = document.getElementById(`heart-anim-${postId}`);
        if (heart) {
            heart.classList.add("active");
            setTimeout(() => heart.classList.remove("active"), 700);
        }
    }, 50);
}

// Salvar Post
function toggleSave(postId) {
    const post = postsData.find(p => p.id === postId);
    if (!post) return;
    post.saved = !post.saved;
    renderPosts();
}

// Comentários
function focusComment(postId) {
    document.getElementById(`input-comment-${postId}`).focus();
}

function togglePostBtn(postId) {
    const input = document.getElementById(`input-comment-${postId}`);
    const btn = document.getElementById(`btn-comment-${postId}`);
    btn.disabled = input.value.trim() === "";
}

function addComment(event, postId) {
    event.preventDefault();
    const input = document.getElementById(`input-comment-${postId}`);
    const text = input.value.trim();
    if (!text) return;

    const post = postsData.find(p => p.id === postId);
    post.comments.push({ user: "dev_brasil", text: text });
    renderPosts();
}

// Botões "Seguir" na Sidebar
document.querySelectorAll(".follow-btn").forEach(btn => {
    btn.addEventListener("click", function() {
        if (this.innerText === "Seguir") {
            this.innerText = "Seguindo";
            this.style.color = "#262626";
        } else {
            this.innerText = "Seguir";
            this.style.color = "#0095f6";
        }
    });
});

// Modal de Nova Publicação
const modal = document.getElementById("post-modal");
document.getElementById("btn-open-modal").onclick = () => modal.classList.add("open");
document.getElementById("btn-close-modal").onclick = () => modal.classList.remove("open");

window.onclick = (e) => {
    if (e.target === modal) modal.classList.remove("open");
};

document.getElementById("new-post-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const imageUrl = document.getElementById("post-image-url").value;
    const caption = document.getElementById("post-caption").value;

    const newPost = {
        id: Date.now(),
        username: "dev_brasil",
        avatar: "https://pravatar.cc1",
        image: imageUrl,
        likes: 0,
        liked: false,
        saved: false,
        caption: caption,
        time: "AGORA MESMO",
        comments: []
    };

    postsData.unshift(newPost);
    renderPosts();
    modal.classList.remove("open");
    e.target.reset();
});

// Inicialização
renderStories();
renderPosts();
