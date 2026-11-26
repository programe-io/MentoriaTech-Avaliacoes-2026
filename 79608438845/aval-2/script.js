// Dados simulados
const storiesData = [
    { user: "seu_story", img: "https://unsplash.com" },
    { user: "viagens.br", img: "https://unsplash.com" },
    { user: "dev_front", img: "https://unsplash.com" },
    { user: "cafe_manha", img: "https://unsplash.com" },
    { user: "natureza_viva", img: "https://unsplash.com" },
    { user: "design.ui", img: "https://unsplash.com" }
];

const postsData = [
    {
        id: 1,
        user: "viagens.br",
        avatar: "https://unsplash.com",
        image: "https://unsplash.com",
        likes: 1248,
        liked: false,
        saved: false,
        caption: "Fim de tarde perfeito para recarregar as energias! 🌊☀️",
        time: "Há 2 horas",
        comments: [
            { user: "ana_clara", text: "Que lugar incrível!" }
        ]
    },
    {
        id: 2,
        user: "dev_front",
        avatar: "https://unsplash.com",
        image: "https://unsplash.com",
        likes: 842,
        liked: true,
        saved: false,
        caption: "Mais um projeto saindo do papel com HTML, CSS e JS puro. 💻🚀",
        time: "Há 5 horas",
        comments: [
            { user: "lucas.tech", text: "Setup muito limpo!" },
            { user: "mari_dev", text: "Mandou bem demais 👏" }
        ]
    }
];

// Renderizar Stories
const storiesContainer = document.getElementById('stories-container');
storiesData.forEach(story => {
    storiesContainer.innerHTML += `
        <div class="story-item">
            <div class="story-ring">
                <img src="${story.img}" alt="${story.user}">
            </div>
            <span>${story.user}</span>
        </div>
    `;
});

// Renderizar Feed
const feedContainer = document.getElementById('feed-container');

function renderFeed() {
    feedContainer.innerHTML = '';
    postsData.forEach(post => {
        const heartClass = post.liked ? 'fa-solid fa-heart liked' : 'fa-regular fa-heart';
        const saveClass = post.saved ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark';
        
        const commentsHTML = post.comments.map(c => 
            `<div class="comment-item"><strong>${c.user}</strong>${c.text}</div>`
        ).join('');

        feedContainer.innerHTML += `
            <article class="post" id="post-${post.id}">
                <div class="post-header">
                    <div class="post-user">
                        <img src="${post.avatar}" alt="${post.user}">
                        <span>${post.user}</span>
                    </div>
                    <i class="fa-solid fa-ellipsis"></i>
                </div>

                <div class="post-image-container" ondblclick="doubleTapLike(${post.id})">
                    <img src="${post.image}" alt="Post" class="post-image">
                    <i class="fa-solid fa-heart double-tap-heart" id="heart-anim-${post.id}"></i>
                </div>

                <div class="post-actions">
                    <div class="left-actions">
                        <i class="${heartClass}" onclick="toggleLike(${post.id})"></i>
                        <i class="fa-regular fa-comment" onclick="focusComment(${post.id})"></i>
                        <i class="fa-regular fa-paper-plane"></i>
                    </div>
                    <i class="${saveClass}" onclick="toggleSave(${post.id})"></i>
                </div>

                <div class="post-info">
                    <div class="likes-count">${post.likes.toLocaleString('pt-BR')} curtidas</div>
                    <div class="caption"><strong>${post.user}</strong>${post.caption}</div>
                    <div class="comments-list">${commentsHTML}</div>
                    <div class="post-time">${post.time}</div>
                </div>

                <div class="add-comment">
                    <input type="text" placeholder="Adicione um comentário..." id="input-${post.id}" oninput="toggleBtn(${post.id})" onkeypress="handleKeyPress(event, ${post.id})">
                    <button id="btn-${post.id}" onclick="addComment(${post.id})">Publicar</button>
                </div>
            </article>
        `;
    });
}

// Funções de Interatividade
function toggleLike(id) {
    const post = postsData.find(p => p.id === id);
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    renderFeed();
}

function doubleTapLike(id) {
    const post = postsData.find(p => p.id === id);
    if (!post.liked) {
        post.liked = true;
        post.likes += 1;
        renderFeed();
    }
    const heartAnim = document.getElementById(`heart-anim-${id}`);
    heartAnim.classList.add('animate');
    setTimeout(() => {
        heartAnim.classList.remove('animate');
    }, 700);
}

function toggleSave(id) {
    const post = postsData.find(p => p.id === id);
    post.saved = !post.saved;
    renderFeed();
}

function focusComment(id) {
    document.getElementById(`input-${id}`).focus();
}

function toggleBtn(id) {
    const input = document.getElementById(`input-${id}`);
    const btn = document.getElementById(`btn-${id}`);
    if (input.value.trim().length > 0) {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }
}

function addComment(id) {
    const input = document.getElementById(`input-${id}`);
    const text = input.value.trim();
    if (text) {
        const post = postsData.find(p => p.id === id);
        post.comments.push({ user: "voce", text: text });
        renderFeed();
    }
}

function handleKeyPress(event, id) {
    if (event.key === 'Enter') {
        addComment(id);
    }
}

// Inicializar
renderFeed();
