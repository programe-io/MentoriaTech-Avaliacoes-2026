// Dados de Stories
const stories = [
    { username: "ana_clara", avatar: "https://unsplash.com", storyImg: "https://unsplash.com" },
    { username: "pedro.foto", avatar: "https://unsplash.com", storyImg: "https://unsplash.com" },
    { username: "cafe_com_arte", avatar: "https://unsplash.com", storyImg: "https://unsplash.com" },
    { username: "marina.fit", avatar: "https://unsplash.com", storyImg: "https://unsplash.com" }
];

// Dados iniciais do Feed
let posts = [
    {
        id: 1,
        username: "pedro.foto",
        avatar: "https://unsplash.com",
        image: "https://unsplash.com",
        likes: 128,
        liked: false,
        saved: false,
        caption: "Explorando trilhas novas neste fim de semana! 🌲⛰️",
        time: "Há 2 horas",
        comments: [
            { user: "ana_clara", text: "Que lugar incrível!!" }
        ]
    },
    {
        id: 2,
        username: "cafe_com_arte",
        avatar: "https://unsplash.com",
        image: "https://unsplash.com",
        likes: 89,
        liked: true,
        saved: false,
        caption: "Começando o dia da melhor forma possível ☕✨",
        time: "Há 5 horas",
        comments: []
    }
];

const storiesContainer = document.getElementById('stories-container');
const postsFeed = document.getElementById('posts-feed');

// Renderizar Stories
function renderStories() {
    storiesContainer.innerHTML = stories.map((story, index) => `
        <div class="story-item" onclick="openStory(${index})">
            <div class="story-ring">
                <img src="${story.avatar}" alt="${story.username}">
            </div>
            <span>${story.username}</span>
        </div>
    `).join('');
}

// Renderizar Feed
function renderPosts() {
    postsFeed.innerHTML = posts.map(post => `
        <article class="post-card">
            <div class="post-header">
                <div class="post-user">
                    <img src="${post.avatar}" alt="${post.username}">
                    <strong>${post.username}</strong>
                </div>
                <span>•••</span>
            </div>

            <div class="post-img-container" ondblclick="doubleClickLike(${post.id}, this)">
                <img src="${post.image}" alt="Post">
                <div class="big-heart">❤️</div>
            </div>

            <div class="post-footer">
                <div class="action-icons">
                    <div class="left-icons">
                        <button class="icon-btn" onclick="toggleLike(${post.id})">${post.liked ? '❤️' : '🤍'}</button>
                        <button class="icon-btn" onclick="focusComment(${post.id})">💬</button>
                    </div>
                    <button class="icon-btn" onclick="toggleSave(${post.id})">${post.saved ? '🔖' : '📑'}</button>
                </div>

                <div class="likes-count">${post.likes} curtidas</div>
                <p class="caption"><strong>${post.username}</strong> ${post.caption}</p>

                <ul class="comments-list">
                    ${post.comments.map(c => `<li><strong>${c.user}</strong> ${c.text}</li>`).join('')}
                </ul>

                <div class="post-time">${post.time}</div>

                <form class="add-comment" onsubmit="addComment(event, ${post.id})">
                    <input type="text" id="comment-input-${post.id}" placeholder="Adicione um comentário..." required>
                    <button type="submit">Publicar</button>
                </form>
            </div>
        </article>
    `).join('');
}

// Curtir pelo botão
function toggleLike(id) {
    const post = posts.find(p => p.id === id);
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    renderPosts();
}

// Curtir com duplo clique na foto
function doubleClickLike(id, container) {
    const post = posts.find(p => p.id === id);
    const heart = container.querySelector('.big-heart');
    heart.classList.add('show');

    setTimeout(() => {
        heart.classList.remove('show');
        if (!post.liked) {
            post.liked = true;
            post.likes += 1;
            renderPosts();
        }
    }, 600);
}

// Salvar post
function toggleSave(id) {
    const post = posts.find(p => p.id === id);
    post.saved = !post.saved;
    renderPosts();
}

// Focar no campo de comentário
function focusComment(id) {
    document.getElementById(`comment-input-${id}`).focus();
}

// Adicionar comentário
function addComment(e, id) {
    e.preventDefault();
    const input = document.getElementById(`comment-input-${id}`);
    const text = input.value.trim();
    if (!text) return;

    const post = posts.find(p => p.id === id);
    post.comments.push({ user: "seu_perfil", text });
    renderPosts();
}

// Botão Seguir / Seguindo
function toggleFollow(btn) {
    if (btn.textContent === "Seguir") {
        btn.textContent = "Seguindo";
        btn.style.color = "#262626";
    } else {
        btn.textContent = "Seguir";
        btn.style.color = "#0095f6";
    }
}

// Modal de Criar Post
const createModal = document.getElementById('create-modal');
document.getElementById('open-create-modal').onclick = () => createModal.style.display = 'flex';
document.getElementById('close-create-modal').onclick = () => createModal.style.display = 'none';

document.getElementById('new-post-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const fileInput = document.getElementById('post-file');
    const urlInput = document.getElementById('post-url').value.trim();
    const caption = document.getElementById('post-caption').value.trim();

    const createNewPost = (imgSrc) => {
        posts.unshift({
            id: Date.now(),
            username: "seu_perfil",
            avatar: "https://unsplash.com",
            image: imgSrc,
            likes: 0,
            liked: false,
            saved: false,
            caption: caption,
            time: "Agora mesmo",
            comments: []
        });
        renderPosts();
        this.reset();
        createModal.style.display = 'none';
    };

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = (event) => createNewPost(event.target.result);
        reader.readAsDataURL(fileInput.files[0]);
    } else if (urlInput) {
        createNewPost(urlInput);
    } else {
        alert("Por favor, selecione uma foto ou insira uma URL.");
    }
});

// Visualizador de Story
const storyModal = document.getElementById('story-modal');
let storyTimeout;

function openStory(index) {
    const story = stories[index];
    document.getElementById('story-avatar').src = story.avatar;
    document.getElementById('story-username').textContent = story.username;
    document.getElementById('story-image').src = story.storyImg;

    storyModal.style.display = 'flex';
    const bar = document.querySelector('.story-bar-fill');
    bar.style.width = '0%';
    setTimeout(() => bar.style.width = '100%', 50);

    clearTimeout(storyTimeout);
    storyTimeout = setTimeout(() => storyModal.style.display = 'none', 3000);
}

document.getElementById('close-story').onclick = () => {
    clearTimeout(storyTimeout);
    storyModal.style.display = 'none';
};

// Inicialização
renderStories();
renderPosts();
