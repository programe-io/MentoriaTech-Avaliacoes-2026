// ===== DADOS SIMULADOS =====
const users = [
    { id: 1, username: 'maria.silva', fullname: 'Maria Silva', avatar: 'https://i.pravatar.cc/150?img=1', location: 'São Paulo, SP' },
    { id: 2, username: 'joao.dev', fullname: 'João Developer', avatar: 'https://i.pravatar.cc/150?img=3', location: 'Rio de Janeiro, RJ' },
    { id: 3, username: 'ana.fotos', fullname: 'Ana Fotógrafa', avatar: 'https://i.pravatar.cc/150?img=5', location: 'Belo Horizonte, MG' },
    { id: 4, username: 'pedro.travel', fullname: 'Pedro Viajante', avatar: 'https://i.pravatar.cc/150?img=7', location: 'Florianópolis, SC' },
    { id: 5, username: 'carol.fit', fullname: 'Carol Fitness', avatar: 'https://i.pravatar.cc/150?img=9', location: 'Curitiba, PR' },
    { id: 6, username: 'lucas.code', fullname: 'Lucas Programador', avatar: 'https://i.pravatar.cc/150?img=11', location: 'Porto Alegre, RS' },
    { id: 7, username: 'julia.art', fullname: 'Júlia Artista', avatar: 'https://i.pravatar.cc/150?img=16', location: 'Salvador, BA' },
    { id: 8, username: 'rafael.music', fullname: 'Rafael Músico', avatar: 'https://i.pravatar.cc/150?img=13', location: 'Recife, PE' },
];

const postImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=600&fit=crop',
];

const storyImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=700&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=700&fit=crop',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=700&fit=crop',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=700&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=700&fit=crop',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=700&fit=crop',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=700&fit=crop',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=700&fit=crop',
];

const captions = [
    'Que dia incrível! 🌅 #natureza #paz',
    'Explorando novos lugares 🗺️ #travel #adventure',
    'Momentos que valem a pena ❤️ #life #happy',
    'A beleza está em todo lugar 🌿 #photography',
    'Viva o momento! 🎉 #goodvibes',
    'Natureza é terapia 🌲 #outdoors',
    'Verão é vida! ☀️ #beach #summer',
    'Noite estrelada ✨ #stars #night',
];

const commentTexts = [
    'Que foto linda! 😍',
    'Incrível!',
    'Amei demais!',
    'Parabéns pela foto!',
    'Que lugar maravilhoso!',
    'Preciso ir aí!',
    'Top demais! 🔥',
    'Simplesmente perfeito!',
];

// ===== ESTADO DA APLICAÇÃO =====
let posts = [];
let currentStoryIndex = 0;
let storyTimer = null;
let storyProgress = 0;

// ===== INICIALIZAÇÃO =====
function init() {
    generatePosts();
    renderStories();
    renderPosts();
    renderSuggestions();
    setupEventListeners();
}

// ===== GERAR POSTS =====
function generatePosts() {
    posts = [];
    for (let i = 0; i < 8; i++) {
        const user = users[i % users.length];
        const numComments = Math.floor(Math.random() * 4) + 1;
        const comments = [];
        for (let j = 0; j < numComments; j++) {
            const commenter = users[Math.floor(Math.random() * users.length)];
            comments.push({
                user: commenter.username,
                text: commentTexts[Math.floor(Math.random() * commentTexts.length)]
            });
        }
        posts.push({
            id: i,
            user: user,
            image: postImages[i],
            caption: captions[i],
            likes: Math.floor(Math.random() * 5000) + 100,
            liked: false,
            saved: false,
            comments: comments,
            time: `${Math.floor(Math.random() * 23) + 1}h`
        });
    }
}

// ===== RENDERIZAR STORIES =====
function renderStories() {
    const wrapper = document.querySelector('.stories-wrapper');
    users.forEach((user, index) => {
        const storyEl = document.createElement('div');
        storyEl.className = 'story';
        storyEl.innerHTML = `
            <div class="story-avatar">
                <img src="${user.avatar}" alt="${user.username}">
            </div>
            <span class="story-username">${user.username.split('.')[0]}</span>
        `;
        storyEl.addEventListener('click', () => openStory(index));
        wrapper.appendChild(storyEl);
    });
}

// ===== RENDERIZAR POSTS =====
function renderPosts() {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';
    posts.forEach((post, index) => {
        const postEl = document.createElement('article');
        postEl.className = 'post';
        postEl.innerHTML = `
            <div class="post-header">
                <img src="${post.user.avatar}" alt="${post.user.username}" class="post-avatar">
                <div class="post-user-info">
                    <span class="post-username">${post.user.username}</span>
                    <div class="post-location">${post.user.location}</div>
                </div>
                <i class="fas fa-ellipsis-h post-more"></i>
            </div>
            <div class="post-image-container" data-post-index="${index}">
                <img src="${post.image}" alt="Post" class="post-image">
                <i class="fas fa-heart heart-animation"></i>
            </div>
            <div class="post-actions">
                <button class="action-btn like-btn ${post.liked ? 'liked' : ''}" data-post-index="${index}">
                    <i class="${post.liked ? 'fas' : 'far'} fa-heart"></i>
                </button>
                <button class="action-btn comment-btn" data-post-index="${index}">
                    <i class="far fa-comment"></i>
                </button>
                <button class="action-btn share-btn-action">
                    <i class="far fa-paper-plane"></i>
                </button>
                <button class="action-btn save-btn ${post.saved ? 'saved' : ''}" data-post-index="${index}">
                    <i class="${post.saved ? 'fas' : 'far'} fa-bookmark"></i>
                </button>
            </div>
            <div class="post-likes" data-post-index="${index}">${formatLikes(post.likes)} curtidas</div>
            <div class="post-caption">
                <span class="caption-username">${post.user.username}</span>
                ${post.caption}
            </div>
            ${post.comments.length > 2 ? `<div class="post-comments-preview">Ver todos os ${post.comments.length} comentários</div>` : ''}
            ${post.comments.slice(-2).map(c => `
                <div class="post-comment">
                    <span class="comment-user">${c.user}</span>${c.text}
                </div>
            `).join('')}
            <div class="post-time">Há ${post.time}</div>
            <div class="post-add-comment">
                <button class="emoji-btn">😊</button>
                <input type="text" placeholder="Adicione um comentário..." data-post-index="${index}" class="comment-input">
                <button class="submit-comment" data-post-index="${index}">Publicar</button>
            </div>
        `;
        feed.appendChild(postEl);
    });
}

// ===== RENDERIZAR SUGESTÕES =====
function renderSuggestions() {
    const list = document.getElementById('suggestionsList');
    const suggestions = users.slice(3, 8);
    suggestions.forEach(user => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.innerHTML = `
            <img src="${user.avatar}" alt="${user.username}" class="suggestion-avatar">
            <div class="suggestion-info">
                <span class="suggestion-username">${user.username}</span>
                <span class="suggestion-sub">Sugestão para você</span>
            </div>
            <button class="follow-btn" data-user="${user.username}">Seguir</button>
        `;
        list.appendChild(item);
    });
}

// ===== FORMATAR CURTIDAS =====
function formatLikes(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'mil';
    return num.toLocaleString('pt-BR');
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Curtir post (botão)
    document.getElementById('feed').addEventListener('click', (e) => {
        const likeBtn = e.target.closest('.like-btn');
        if (likeBtn) {
            const index = parseInt(likeBtn.dataset.postIndex);
            toggleLike(index);
        }

        // Salvar post
        const saveBtn = e.target.closest('.save-btn');
        if (saveBtn) {
            const index = parseInt(saveBtn.dataset.postIndex);
            toggleSave(index);
        }

        // Double tap para curtir
        const imgContainer = e.target.closest('.post-image-container');
        if (imgContainer && !e.target.closest('.action-btn')) {
            const index = parseInt(imgContainer.dataset.postIndex);
            doubleTapLike(index, imgContainer);
        }

        // Focar no input de comentário
        const commentBtn = e.target.closest('.comment-btn');
        if (commentBtn) {
            const index = parseInt(commentBtn.dataset.postIndex);
            const input = document.querySelector(`.comment-input[data-post-index="${index}"]`);
            if (input) input.focus();
        }
    });

    // Submit comentário
    document.getElementById('feed').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.classList.contains('comment-input')) {
            const index = parseInt(e.target.dataset.postIndex);
            submitComment(index, e.target.value);
            e.target.value = '';
            updateSubmitBtn(index);
        }
    });

    document.getElementById('feed').addEventListener('input', (e) => {
        if (e.target.classList.contains('comment-input')) {
            const index = parseInt(e.target.dataset.postIndex);
            updateSubmitBtn(index);
        }
    });

    document.getElementById('feed').addEventListener('click', (e) => {
        if (e.target.classList.contains('submit-comment')) {
            const index = parseInt(e.target.dataset.postIndex);
            const input = document.querySelector(`.comment-input[data-post-index="${index}"]`);
            submitComment(index, input.value);
            input.value = '';
            updateSubmitBtn(index);
        }
    });

    // Seguir usuário
    document.getElementById('suggestionsList').addEventListener('click', (e) => {
        if (e.target.classList.contains('follow-btn')) {
            toggleFollow(e.target);
        }
    });

    // Modal novo post
    document.getElementById('newPostBtn').addEventListener('click', () => {
        document.getElementById('newPostModal').classList.add('show');
    });

    document.getElementById('closeModal').addEventListener('click', () => {
        document.getElementById('newPostModal').classList.remove('show');
        resetPostModal();
    });

    document.getElementById('uploadBtn').addEventListener('click', () => {
        document.getElementById('fileInput').click();
    });

    document.getElementById('fileInput').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                document.getElementById('previewImg').src = ev.target.result;
                document.getElementById('uploadArea').style.display = 'none';
                document.getElementById('postPreview').style.display = 'flex';
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById('shareBtn').addEventListener('click', () => {
        const imgSrc = document.getElementById('previewImg').src;
        const caption = document.getElementById('captionInput').value;
        addNewPost(imgSrc, caption);
        document.getElementById('newPostModal').classList.remove('show');
        resetPostModal();
    });

    // Fechar modal clicando fora
    document.getElementById('newPostModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('newPostModal')) {
            document.getElementById('newPostModal').classList.remove('show');
            resetPostModal();
        }
    });

    // Story viewer
    document.getElementById('closeStory').addEventListener('click', closeStoryViewer);
    document.getElementById('storyPrev').addEventListener('click', prevStory);
    document.getElementById('storyNext').addEventListener('click', nextStory);

    // Notificações
    document.getElementById('notifBtn').addEventListener('click', () => {
        alert('🔔 Você tem 3 novas notificações!\n\n❤️ maria.silva curtiu sua foto\n💬 joao.dev comentou: "Top!"\n👤 ana.fotos começou a te seguir');
    });
}

// ===== TOGGLE LIKE =====
function toggleLike(index) {
    posts[index].liked = !posts[index].liked;
    posts[index].likes += posts[index].liked ? 1 : -1;
    renderPosts();
}

// ===== DOUBLE TAP LIKE =====
function doubleTapLike(index, container) {
    if (!posts[index].liked) {
        posts[index].liked = true;
        posts[index].likes += 1;
        renderPosts();
    }
    // Animação do coração
    const heart = container.querySelector('.heart-animation');
    heart.classList.remove('show');
    void heart.offsetWidth;
    heart.classList.add('show');
    setTimeout(() => heart.classList.remove('show'), 900);
}

// ===== TOGGLE SAVE =====
function toggleSave(index) {
    posts[index].saved = !posts[index].saved;
    renderPosts();
}

// ===== SUBMIT COMENTÁRIO =====
function submitComment(index, text) {
    if (text.trim() === '') return;
    posts[index].comments.push({
        user: 'luizdavy.dev',
        text: text.trim()
    });
    renderPosts();
}

// ===== UPDATE SUBMIT BUTTON =====
function updateSubmitBtn(index) {
    const input = document.querySelector(`.comment-input[data-post-index="${index}"]`);
    const btn = document.querySelector(`.submit-comment[data-post-index="${index}"]`);
    if (input && btn) {
        btn.classList.toggle('active', input.value.trim().length > 0);
    }
}

// ===== TOGGLE FOLLOW =====
function toggleFollow(btn) {
    if (btn.classList.contains('following')) {
        btn.classList.remove('following');
        btn.textContent = 'Seguir';
    } else {
        btn.classList.add('following');
        btn.textContent = 'Seguindo';
    }
}

// ===== NOVO POST =====
function addNewPost(imgSrc, caption) {
    const newPost = {
        id: posts.length,
        user: { username: 'luizdavy.dev', fullname: 'Luiz Davy', avatar: 'https://i.pravatar.cc/150?img=12', location: 'Sua localização' },
        image: imgSrc,
        caption: caption || 'Nova publicação 📸',
        likes: 0,
        liked: false,
        saved: false,
        comments: [],
        time: 'agora'
    };
    posts.unshift(newPost);
    renderPosts();
}

// ===== RESET MODAL =====
function resetPostModal() {
    document.getElementById('uploadArea').style.display = 'block';
    document.getElementById('postPreview').style.display = 'none';
    document.getElementById('captionInput').value = '';
    document.getElementById('fileInput').value = '';
}

// ===== STORY VIEWER =====
function openStory(index) {
    currentStoryIndex = index;
    const user = users[index];
    document.getElementById('storyViewerAvatar').src = user.avatar;
    document.getElementById('storyViewerUsername').textContent = user.username;
    document.getElementById('storyViewerTime').textContent = `${Math.floor(Math.random() * 12) + 1}h`;
    document.getElementById('storyViewerImg').src = storyImages[index];
    document.getElementById('storyModal').classList.add('show');
    startStoryProgress();
}

function closeStoryViewer() {
    document.getElementById('storyModal').classList.remove('show');
    clearInterval(storyTimer);
    storyProgress = 0;
}

function startStoryProgress() {
    clearInterval(storyTimer);
    storyProgress = 0;
    const progressBar = document.getElementById('storyProgress');
    storyTimer = setInterval(() => {
        storyProgress += 2;
        progressBar.style.width = storyProgress + '%';
        if (storyProgress >= 100) {
            nextStory();
        }
    }, 100);
}

function nextStory() {
    if (currentStoryIndex < users.length - 1) {
        currentStoryIndex++;
        openStory(currentStoryIndex);
    } else {
        closeStoryViewer();
    }
}

function prevStory() {
    if (currentStoryIndex > 0) {
        currentStoryIndex--;
        openStory(currentStoryIndex);
    }
}

// ===== INICIAR =====
document.addEventListener('DOMContentLoaded', init);