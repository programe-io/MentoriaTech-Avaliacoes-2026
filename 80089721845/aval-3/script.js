
let posts = [
    {
        id: 1,
        username: "pessoa_tech",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
        likes: 124,
        liked: false,
        caption: "Desenvolvendo novos projetos com HTML5 e CSS3! 🚀💻 #programacao",
        comments: ["Incrível o projeto!", "Ficou muito top! 🔥"]
    },
    {
        id: 2,
        username: "pessoa_dev",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
        likes: 89,
        liked: false,
        caption: "Cantinho de estudos limpo e organizado para a mentoria de hoje ☕✨",
        comments: ["Ambiente perfeito!"]
    }
];


const postsFeed = document.getElementById('postsFeed');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const openCreateModalBtn = document.getElementById('openCreateModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const createPostModal = document.getElementById('createPostModal');
const submitPostBtn = document.getElementById('submitPostBtn');
const newImageInput = document.getElementById('newImageInput');
const newCaptionInput = document.getElementById('newCaptionInput');


document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    setupEventListeners();
});


function renderPosts() {
    postsFeed.innerHTML = "";

    posts.forEach(post => {
        const postCard = document.createElement('article');
        postCard.className = 'post-card';
        postCard.innerHTML = `
            <div class="post-header">
                <div class="post-user-info">
                    <div class="post-avatar-ring">
                        <img src="${post.avatar}" class="post-avatar" alt="${post.username}">
                    </div>
                    <span class="post-user-name">${post.username}</span>
                </div>
                <button class="more-btn"><i class="fa-solid fa-ellipsis"></i></button>
            </div>

            <div class="post-image">
                <img src="${post.image}" alt="Foto da publicação">
            </div>

            <div class="post-actions">
                <div class="action-group">
                    <button class="action-icon ${post.liked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                        <i class="${post.liked ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    </button>
                    <button class="action-icon"><i class="fa-regular fa-comment"></i></button>
                    <button class="action-icon"><i class="fa-regular fa-paper-plane"></i></button>
                </div>
                <button class="action-icon"><i class="fa-regular fa-bookmark"></i></button>
            </div>

            <div class="post-body">
                <span class="likes-count">${post.likes} gostos</span>
                <p class="caption">
                    <span class="caption-user">${post.username}</span>${post.caption}
                </p>
                <div id="comments-container-${post.id}">
                    ${post.comments.map(comment => `<p class="caption"><span class="caption-user">utilizador</span>${comment}</p>`).join('')}
                </div>
            </div>

            <div class="add-comment-box">
                <input type="text" id="comment-input-${post.id}" placeholder="Adicione um comentário..." class="comment-input">
                <button class="post-btn" onclick="addComment(${post.id})">Publicar</button>
            </div>
        `;
        postsFeed.appendChild(postCard);
    });
}


function toggleLike(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
        renderPosts();
    }
}


function addComment(postId) {
    const input = document.getElementById(`comment-input-${postId}`);
    const text = input.value.trim();
    if (!text) return;

    const post = posts.find(p => p.id === postId);
    if (post) {
        post.comments.push(text);
        renderPosts();
    }
}


function setupEventListeners() {
    
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', nextTheme);
        themeToggleBtn.innerHTML = nextTheme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    });

    
    openCreateModalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        createPostModal.classList.remove('hidden');
    });

    closeModalBtn.addEventListener('click', () => {
        createPostModal.classList.add('hidden');
    });

    
    submitPostBtn.addEventListener('click', () => {
        const imgUrl = newImageInput.value.trim();
        const caption = newCaptionInput.value.trim();

        if (!imgUrl) return;

        const newPost = {
            id: Date.now(),
            username: "meu_perfil_dev",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            image: imgUrl,
            likes: 0,
            liked: false,
            caption: caption,
            comments: []
        };

        posts.unshift(newPost);
        renderPosts();

        
        newImageInput.value = "";
        newCaptionInput.value = "";
        createPostModal.classList.add('hidden');
    });

    
    document.querySelectorAll('.follow-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.textContent === 'Seguir') {
                this.textContent = 'A seguir';
                this.style.color = 'var(--text-primary)';
            } else {
                this.textContent = 'Seguir';
                this.style.color = 'var(--accent-color)';
            }
        });
    });
}