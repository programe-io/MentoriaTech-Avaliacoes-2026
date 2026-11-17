
let posts = [
    {
        id: 1,
        author: "Aluno",
        username: "@Aluno_dev",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
        category: "Tech",
        content: "A criar uma estrutura de Mini Feed Social utilizando HTML, CSS e JavaScript puro! 🚀💻",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        likes: 12,
        isLiked: false,
        comments: [
            { id: 1, author: "Maria Silva", text: "Excelente estrutura! Muito limpo o código." }
        ],
        timestamp: "Há 10 min"
    },
    {
        id: 2,
        author: "Pessoa",
        username: "@pessoa_design",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        category: "Design",
        content: "Dica do dia: mantenha o espaçamento e as cores do seu layout consistentes para uma boa UX/UI. ✨🎨",
        image: "",
        likes: 8,
        isLiked: false,
        comments: [],
        timestamp: "Há 1 hora"
    }
];

let selectedCategory = "Todas";
let currentImageBase64 = "";


const postsList = document.getElementById('postsList');
const postInput = document.getElementById('postInput');
const publishBtn = document.getElementById('publishBtn');
const imageInput = document.getElementById('imageInput');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
const imagePreview = document.getElementById('imagePreview');
const removeImgBtn = document.getElementById('removeImgBtn');
const categorySelect = document.getElementById('categorySelect');
const themeToggle = document.getElementById('themeToggle');
const searchInput = document.getElementById('searchInput');
const postCountDisplay = document.getElementById('postCountDisplay');


document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    updatePostCount();

    
    publishBtn.addEventListener('click', createPost);
    imageInput.addEventListener('change', handleImageUpload);
    removeImgBtn.addEventListener('click', removeImage);
    themeToggle.addEventListener('click', toggleTheme);
    searchInput.addEventListener('input', filterBySearch);

    
    document.querySelectorAll('.pill').forEach(pill => {
        pill.addEventListener('click', (e) => {
            document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
            e.target.classList.add('active');
            selectedCategory = e.target.dataset.category;
            renderPosts();
        });
    });
});


function renderPosts(filteredPosts = null) {
    const listToRender = filteredPosts || posts.filter(post => 
        selectedCategory === "Todas" || post.category === selectedCategory
    );

    postsList.innerHTML = "";

    if (listToRender.length === 0) {
        postsList.innerHTML = `<div class="card post-card" style="text-align:center; color: var(--text-secondary);">Nenhuma publicação encontrada.</div>`;
        return;
    }

    listToRender.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'card post-card';
        postElement.innerHTML = `
            <div class="post-header">
                <div class="user-details">
                    <img src="${post.avatar}" class="avatar-sm" alt="${post.author}">
                    <div class="user-names">
                        <h4>${post.author}</h4>
                        <small>${post.username} • ${post.timestamp}</small>
                    </div>
                </div>
                <span class="post-category">${post.category}</span>
            </div>

            <div class="post-content">
                <p>${post.content}</p>
                ${post.image ? `<div class="post-image"><img src="${post.image}" alt="Foto da publicação"></div>` : ''}
            </div>

            <div class="post-actions">
                <button class="post-btn-action ${post.isLiked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                    <i class="${post.isLiked ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    <span>${post.likes}</span>
                </button>
                <button class="post-btn-action" onclick="toggleComments(${post.id})">
                    <i class="fa-regular fa-comment"></i>
                    <span>${post.comments.length}</span>
                </button>
            </div>

            <div id="comments-${post.id}" class="comments-section hidden">
                <div class="comment-input-box">
                    <input type="text" id="input-comment-${post.id}" placeholder="Escreva um comentário...">
                    <button class="primary-btn" onclick="addComment(${post.id})">Enviar</button>
                </div>
                <div class="comments-list">
                    ${post.comments.map(c => `
                        <div class="comment-item">
                            <div class="comment-bubble">
                                <strong>${c.author}</strong>
                                <span>${c.text}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        postsList.appendChild(postElement);
    });
}


function createPost() {
    const text = postInput.value.trim();
    if (!text && !currentImageBase64) return;

    const newPost = {
        id: Date.now(),
        author: "José Airton",
        username: "@jose_dev",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
        category: categorySelect.value,
        content: text,
        image: currentImageBase64,
        likes: 0,
        isLiked: false,
        comments: [],
        timestamp: "Agora mesmo"
    };

    posts.unshift(newPost);
    
    
    postInput.value = "";
    removeImage();
    
    renderPosts();
    updatePostCount();
}


function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            currentImageBase64 = event.target.result;
            imagePreview.src = currentImageBase64;
            imagePreviewContainer.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
}

function removeImage() {
    currentImageBase64 = "";
    imageInput.value = "";
    imagePreview.src = "";
    imagePreviewContainer.classList.add('hidden');
}


function toggleLike(id) {
    const post = posts.find(p => p.id === id);
    if (post) {
        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;
        renderPosts();
    }
}


function toggleComments(id) {
    const section = document.getElementById(`comments-${id}`);
    if (section) {
        section.classList.toggle('hidden');
    }
}


function addComment(id) {
    const input = document.getElementById(`input-comment-${id}`);
    const text = input.value.trim();
    if (!text) return;

    const post = posts.find(p => p.id === id);
    if (post) {
        post.comments.push({
            id: Date.now(),
            author: "José Airton",
            text: text
        });
        renderPosts();
        
        toggleComments(id);
    }
}


function filterBySearch() {
    const term = searchInput.value.toLowerCase();
    const filtered = posts.filter(post => 
        post.content.toLowerCase().includes(term) ||
        post.author.toLowerCase().includes(term)
    );
    renderPosts(filtered);
}


function updatePostCount() {
    const userPosts = posts.filter(p => p.username === "@jose_dev");
    postCountDisplay.textContent = userPosts.length;
}


function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' 
        ? '<i class="fa-solid fa-sun"></i>' 
        : '<i class="fa-solid fa-moon"></i>';
}