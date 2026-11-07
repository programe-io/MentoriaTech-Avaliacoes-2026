// ===== DADOS INICIAIS =====
let posts = [
    {
        id: 1,
        user: "Jorkian",
        avatar: "J",
        content: "Acabei de terminar meu projeto de programação! 🎉💻 Quem mais ama codar?",
        time: "2 horas atrás",
        likes: 12,
        liked: false,
        comments: [
            { user: "Ana", text: "Parabéns! 🎊" },
            { user: "Pedro", text: "Manda o código aí!" }
        ],
        image: null
    },
    {
        id: 2,
        user: "Ana Clara",
        avatar: "A",
        content: "Dia lindo para um passeio no parque! 🌳☀️ A natureza sempre renova as energias.",
        time: "4 horas atrás",
        likes: 28,
        liked: false,
        comments: [
            { user: "Maria", text: "Que lugar lindo! 😍" }
        ],
        image: null
    },
    {
        id: 3,
        user: "Pedro Santos",
        avatar: "P",
        content: "Alguém mais animado para o fim de semana? 🎶🎉 Vamos fazer algo juntos!",
        time: "6 horas atrás",
        likes: 7,
        liked: false,
        comments: [],
        image: null
    }
];

let nextId = 4;

// ===== ELEMENTOS DO DOM =====
const postsContainer = document.getElementById('postsContainer');
const postInput = document.getElementById('postInput');
const btnPublicar = document.getElementById('btnPublicar');
const btnNotificacoes = document.getElementById('btnNotificacoes');
const modalNotificacoes = document.getElementById('modalNotificacoes');
const closeNotif = document.getElementById('closeNotif');
const badgeNotif = document.getElementById('badgeNotif');

// ===== RENDERIZAR POSTS =====
function renderPosts() {
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        const postEl = createPostElement(post);
        postsContainer.appendChild(postEl);
    });
}

function createPostElement(post) {
    const div = document.createElement('div');
    div.className = 'post';
    div.id = `post-${post.id}`;

    const commentsHTML = post.comments.map(c => `
        <div class="comment">
            <div class="comment-avatar">${c.user.charAt(0)}</div>
            <div class="comment-body">
                <strong>${c.user}</strong>
                <p>${c.text}</p>
            </div>
        </div>
    `).join('');

    div.innerHTML = `
        <div class="post-header">
            <div class="post-avatar">${post.avatar}</div>
            <div class="post-user-info">
                <h4>${post.user}</h4>
                <span>${post.time}</span>
            </div>
            <button class="post-menu" onclick="deletePost(${post.id})">🗑️</button>
        </div>
        <div class="post-content">${post.content}</div>
        <div class="post-stats">
            <span>❤️ ${post.likes} curtidas</span>
            <span>${post.comments.length} comentários</span>
        </div>
        <div class="post-actions">
            <button class="action-btn ${post.liked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                <span class="like-icon">${post.liked ? '❤️' : '🤍'}</span>
                <span>Curtir</span>
            </button>
            <button class="action-btn" onclick="toggleComments(${post.id})">
                <span>💬</span>
                <span>Comentar</span>
            </button>
            <button class="action-btn" onclick="sharePost(${post.id})">
                <span>🔗</span>
                <span>Compartilhar</span>
            </button>
        </div>
        <div class="comments-section" id="comments-${post.id}" style="display: none;">
            ${commentsHTML}
            <div class="comment-input-container">
                <input type="text" class="comment-input" id="commentInput-${post.id}" placeholder="Escreva um comentário...">
                <button class="btn-comentar" onclick="addComment(${post.id})">Enviar</button>
            </div>
        </div>
    `;

    return div;
}

// ===== PUBLICAR POST =====
btnPublicar.addEventListener('click', () => {
    const content = postInput.value.trim();
    if (content === '') {
        postInput.style.boxShadow = '0 0 0 2px #e41e3f';
        setTimeout(() => { postInput.style.boxShadow = 'none'; }, 1500);
        return;
    }

    const newPost = {
        id: nextId++,
        user: "Luiz Davy",
        avatar: "L",
        content: content,
        time: "Agora mesmo",
        likes: 0,
        liked: false,
        comments: [],
        image: null
    };

    posts.unshift(newPost);
    postInput.value = '';
    renderPosts();

    // Animação de sucesso
    btnPublicar.textContent = '✅ Publicado!';
    btnPublicar.style.background = '#42b72a';
    setTimeout(() => {
        btnPublicar.textContent = 'Publicar';
        btnPublicar.style.background = '#1877f2';
    }, 1500);
});

// Permitir publicar com Enter
postInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        btnPublicar.click();
    }
});

// ===== CURTIR =====
function toggleLike(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
        renderPosts();
    }
}

// ===== COMENTAR =====
function toggleComments(postId) {
    const section = document.getElementById(`comments-${postId}`);
    section.style.display = section.style.display === 'none' ? 'block' : 'none';
}

function addComment(postId) {
    const input = document.getElementById(`commentInput-${postId}`);
    const text = input.value.trim();
    if (text === '') return;

    const post = posts.find(p => p.id === postId);
    if (post) {
        post.comments.push({ user: "Luiz Davy", text: text });
        renderPosts();
        // Reabrir comentários após renderizar
        setTimeout(() => {
            document.getElementById(`comments-${postId}`).style.display = 'block';
        }, 50);
    }
}

// Permitir comentar com Enter
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.classList.contains('comment-input')) {
        const postId = parseInt(e.target.id.split('-')[1]);
        addComment(postId);
    }
});

// ===== COMPARTILHAR =====
function sharePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        alert(`🔗 Post de ${post.user} compartilhado com sucesso!`);
    }
}

// ===== DELETAR POST =====
function deletePost(postId) {
    if (confirm('Tem certeza que deseja excluir este post?')) {
        posts = posts.filter(p => p.id !== postId);
        renderPosts();
    }
}

// ===== MODAL DE NOTIFICAÇÕES =====
btnNotificacoes.addEventListener('click', () => {
    modalNotificacoes.classList.add('active');
    badgeNotif.style.display = 'none';
});

closeNotif.addEventListener('click', () => {
    modalNotificacoes.classList.remove('active');
});

modalNotificacoes.addEventListener('click', (e) => {
    if (e.target === modalNotificacoes) {
        modalNotificacoes.classList.remove('active');
    }
});

// ===== BOTÕES DE OPÇÃO DO POST =====
document.getElementById('btnFoto').addEventListener('click', () => {
    alert('📷 Funcionalidade de upload de foto em desenvolvimento!');
});

document.getElementById('btnVideo').addEventListener('click', () => {
    alert('🎥 Funcionalidade de upload de vídeo em desenvolvimento!');
});

document.getElementById('btnSentimento').addEventListener('click', () => {
    const sentimentos = ['😊 Feliz', '😢 Triste', '😡 Bravo', '🥳 Animado', '😴 Cansado', '🤔 Pensativo'];
    const sentimento = sentimentos[Math.floor(Math.random() * sentimentos.length)];
    postInput.value += ` [${sentimento}]`;
    postInput.focus();
});

// ===== BOTÕES DE ADICIONAR AMIGO =====
document.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', function() {
        this.textContent = '✓ Enviado';
        this.style.background = '#42b72a';
        this.disabled = true;
    });
});

// ===== NAV LINKS =====
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// ===== INICIALIZAR =====
renderPosts();