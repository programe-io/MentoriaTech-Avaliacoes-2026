const postForm = document.getElementById('post-form');
const authorInput = document.getElementById('author-input');
const contentInput = document.getElementById('content-input');
const feedContainer = document.getElementById('feed-container');

// Postagens iniciais de exemplo
let posts = [
    {
        id: 1,
        author: "Maria Silva",
        content: "Bem-vindo ao MiniFeed! Crie sua primeira postagem acima.",
        time: "Agora mesmo",
        likes: 3,
        liked: false
    }
];

// Função para renderizar as postagens na tela
function renderFeed() {
    feedContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.classList.add('post-card');

        postElement.innerHTML = `
            <div class="post-header">
                <span class="post-author">${escapeHTML(post.author)}</span>
                <span class="post-time">${post.time}</span>
            </div>
            <p class="post-content">${escapeHTML(post.content)}</p>
            <div class="post-actions">
                <button class="btn-action btn-like ${post.liked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                    👍 Curtir (${post.likes})
                </button>
                <button class="btn-action btn-delete" onclick="deletePost(${post.id})">
                    🗑️ Excluir
                </button>
            </div>
        `;

        feedContainer.appendChild(postElement);
    });
}

// Adicionar nova postagem
postForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const author = authorInput.value.trim();
    const content = contentInput.value.trim();

    if (!author || !content) return;

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newPost = {
        id: Date.now(),
        author: author,
        content: content,
        time: `Hoje às ${timeString}`,
        likes: 0,
        liked: false
    };

    // Adiciona no início do array (mais recente primeiro)
    posts.unshift(newPost);

    // Limpa apenas o campo de texto
    contentInput.value = '';
    renderFeed();
});

// Curtir ou descurtir
function toggleLike(id) {
    const post = posts.find(p => p.id === id);
    if (post) {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
        renderFeed();
    }
}

// Excluir postagem
function deletePost(id) {
    posts = posts.filter(p => p.id !== id);
    renderFeed();
}

// Previne injeção de código HTML nos inputs
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag]));
}

// Inicializa o feed ao carregar a página
renderFeed();
