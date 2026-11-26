// Dados Iniciais
const storiesData = [
    { user: "voce_dev", avatar: "https://unsplash.com", storyImg: "https://unsplash.com" },
    { user: "viagens.br", avatar: "https://unsplash.com", storyImg: "https://unsplash.com" },
    { user: "dev_front", avatar: "https://unsplash.com", storyImg: "https://unsplash.com" },
    { user: "cafe_manha", avatar: "https://unsplash.com", storyImg: "https://unsplash.com" },
    { user: "natureza_viva", avatar: "https://unsplash.com", storyImg: "https://unsplash.com" }
];

const defaultPosts = [
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
        comments: [{ user: "ana_clara", text: "Que lugar incrível!" }]
    },
    {
        id: 2,
        user: "voce_dev",
        avatar: "https://unsplash.com",
        image: "https://unsplash.com",
        likes: 842,
        liked: true,
        saved: false,
        caption: "Mais um projeto saindo do papel com HTML, CSS e JS puro. 💻🚀",
        time: "Há 5 horas",
        comments: [{ user: "lucas.tech", text: "Setup muito limpo!" }]
    }
];

// Carregar posts salvos no navegador ou usar padrão
let postsData = JSON.parse(localStorage.getItem('insta_posts')) || defaultPosts;

function saveToStorage() {
    localStorage.setItem('insta_posts', JSON.stringify(postsData));
}

// Renderizar Stories
const storiesContainer = document.getElementById('stories-container');
storiesData.forEach((story, index) => {
    storiesContainer.innerHTML += `
        <div class="story-item" onclick="openStory(${index})">
            <div class="story-ring">
                <img src="${story.avatar}" alt="${story.user}">
            </div>
            <span>${story.user}</span>
        </div>
    `;
});

// Renderizar Feed, Explorar e Perfil
function renderAll() {
    const feedContainer = document.getElementById('feed-container');
    const exploreGrid = document.getElementById('explore-grid');
    const profileGrid = document.getElementById('profile-grid');

    feedContainer.innerHTML = '';
    exploreGrid.innerHTML = '';
    profileGrid.innerHTML = '';

    let myPostsCount = 0;

    postsData.forEach(post => {
        const heartClass = post.liked ? 'fa-solid fa-heart liked' : 'fa-regular fa-heart';
        const saveClass = post.saved ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark';
        const commentsHTML = post.comments.map(c => `<div><strong>${c.user}</strong> ${c.text}</div>`).join('');

        // Feed Principal
        feedContainer.innerHTML += `
            <article class="post">
                <div class="post-header">
                    <div class="post-user">
                        <img src="${post.avatar}" alt="${post.user}">
                        <span>${post.user}</span>
                    </div>
                    <i class="fa-solid fa-trash" style="color:#8e8e8e; cursor:pointer; font-size:14px" title="Excluir post" onclick="deletePost(${post.id})"></i>
                </div>
                <div class="post-image-container" ondblclick="doubleTapLike(${post.id})">
                    <img src="${post.image}" alt="Post" class="post-image">
                    <i class="fa-solid fa-heart double-tap-heart" id="heart-anim-${post.id}"></i>
                </div>
                <div class="post-actions">
                    <div class="left-actions">
                        <i class="${heartClass}" onclick="toggleLike(${post.id})"></i>
                        <i class="fa-regular fa-comment" onclick="document.getElementById('input-${post.id}').focus()"></i>
                        <i class="fa-regular fa-paper-plane"></i>
                    </div>
                    <i class="${saveClass}" onclick="toggleSave(${post.id})"></i>
                </div>
                <div class="post-info">
                    <div class="likes-count">${post.likes.toLocaleString('pt-BR')} curtidas</div>
                    <div class="caption"><strong>${post.user}</strong> ${post.caption}</div>
                    <div class="comments-list">${commentsHTML}</div>
                    <div class="post-time">${post.time}</div>
                </div>
                <div class="add-comment">
                    <input type="text" placeholder="Adicione um comentário..." id="input-${post.id}" oninput="toggleBtn(${post.id})" onkeypress="if(event.key==='Enter') addComment(${post.id})">
                    <button id="btn-${post.id}" onclick="addComment(${post.id})">Publicar</button>
                </div>
            </article>
        `;

        // Aba Explorar
        exploreGrid.innerHTML += `<img src="${post.image}" onclick="switchTab('home')" title="${post.caption}">`;

        // Aba Perfil (filtra apenas os posts do usuário atual)
        if (post.user === "voce_dev") {
            myPostsCount++;
            profileGrid.innerHTML += `<img src="${post.image}" onclick="switchTab('home')">`;
        }
    });

    document.getElementById('profile-posts-count').innerText = myPostsCount;
}

// Interações de Post
function toggleLike(id) {
    const post = postsData.find(p => p.id === id);
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    saveToStorage();
    renderAll();
}

function doubleTapLike(id) {
    const post = postsData.find(p => p.id === id);
    if (!post.liked) {
        post.liked = true;
        post.likes += 1;
        saveToStorage();
        renderAll();
    }
    const heartAnim = document.getElementById(`heart-anim-${id}`);
    heartAnim.classList.add('animate');
    setTimeout(() => heartAnim.classList.remove('animate'), 700);
}

function toggleSave(id) {
    const post = postsData.find(p => p.id === id);
    post.saved = !post.saved;
    saveToStorage();
    renderAll();
}

function toggleBtn(id) {
    const input = document.getElementById(`input-${id}`);
    const btn = document.getElementById(`btn-${id}`);
    btn.classList.toggle('active', input.value.trim().length > 0);
}

function addComment(id) {
    const input = document.getElementById(`input-${id}`);
    const text = input.value.trim();
    if (text) {
        const post = postsData.find(p => p.id === id);
        post.comments.push({ user: "voce_dev", text });
        saveToStorage();
        renderAll();
    }
}

function deletePost(id) {
    if (confirm("Deseja remover esta publicação?")) {
        postsData = postsData.filter(p => p.id !== id);
        saveToStorage();
        renderAll();
    }
}

// Criar Nova Publicação
function openNewPostModal() {
    document.getElementById('new-post-modal').classList.add('open');
}

function closeNewPostModal() {
    document.getElementById('new-post-modal').classList.remove('open');
}

function createNewPost() {
    const url = document.getElementById('new-post-url').value.trim();
    const caption = document.getElementById('new-post-caption').value.trim();
    if (!url) return alert("Insira a URL de uma imagem!");

    const newPost = {
        id: Date.now(),
        user: "voce_dev",
        avatar: "https://unsplash.com",
        image: url,
        likes: 0,
        liked: false,
        saved: false,
        caption: caption || "Nova foto no feed!",
        time: "Agora mesmo",
        comments: []
    };

    postsData.unshift(newPost);
    saveToStorage();
    renderAll();
    closeNewPostModal();
    document.getElementById('new-post-caption').value = '';
    switchTab('home');
}

// Visualizador de Stories
let storyTimer;
function openStory(index) {
    const story = storiesData[index];
    document.getElementById('story-viewer-avatar').src = story.avatar;
    document.getElementById('story-viewer-name').innerText = story.user;
    document.getElementById('story-viewer-image').src = story.storyImg;
    document.getElementById('story-modal').classList.add('open');

    const bar = document.getElementById('story-bar');
    bar.style.width = '0%';
    let progress = 0;

    clearInterval(storyTimer);
    storyTimer = setInterval(() => {
        progress += 2;
        bar.style.width = progress + '%';
        if (progress >= 100) {
            closeStory();
        }
    }, 60);
}

function closeStory() {
    clearInterval(storyTimer);
    document.getElementById('story-modal').classList.remove('open');
}

// Alternar Abas e Tema Escuro
function switchTab(tabName) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    document.getElementById(`tab-${tabName}`).classList.add('active');
    window.scrollTo(0, 0);
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('theme-toggle');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
}

// Inicializar
renderAll();
