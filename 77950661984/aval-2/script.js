// Postagens iniciais do feed
let feedPosts = [
    {
        id: 1,
        name: "Bolinha (Golden Retriever)",
        time: "Há 15 minutos",
        image: "https://unsplash.com",
        caption: "Esperando pacientemente meu humano soltar a bolinha de tênis! 🎾🐾",
        likes: 24,
        liked: false,
        comments: ["Que carinha mais linda!", "Merece todos os petiscos!"]
    },
    {
        id: 2,
        name: "Luna (Bulldog Francês)",
        time: "Há 2 horas",
        image: "https://unsplash.com",
        caption: "Dia de preguiça no sofá depois de um passeio longo no parque. 😴",
        likes: 41,
        liked: true,
        comments: ["Modo soneca ativado!"]
    }
];

const feedList = document.getElementById('feed-list');
const postForm = document.getElementById('post-form');

// Renderiza todas as postagens na tela
function renderFeed() {
    feedList.innerHTML = '';

    feedPosts.forEach(post => {
        const article = document.createElement('article');
        article.classList.add('post-card');

        const commentsHTML = post.comments
            .map(c => `<li><strong>Amigo Pet:</strong> ${c}</li>`)
            .join('');

        article.innerHTML = `
            <div class="post-header">
                <div class="avatar">🐕</div>
                <div class="user-info">
                    <h3>${post.name}</h3>
                    <span>${post.time}</span>
                </div>
            </div>
            <img class="post-image" src="${post.image}" alt="Foto de ${post.name}">
            <div class="post-body">
                <div class="post-actions">
                    <button class="like-btn ${post.liked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                        ${post.liked ? '❤️' : '🤍'} ${post.likes} curtidas
                    </button>
                </div>
                <p class="caption"><strong>${post.name}:</strong> ${post.caption}</p>
                <div class="comments-section">
                    <ul class="comment-list">${commentsHTML}</ul>
                    <form class="comment-form" onsubmit="addComment(event, ${post.id})">
                        <input type="text" placeholder="Adicione um comentário..." required>
                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        `;
        feedList.appendChild(article);
    });
}

// Alternar curtida
function toggleLike(id) {
    const post = feedPosts.find(p => p.id === id);
    if (!post) return;

    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    renderFeed();
}

// Adicionar comentário
function addComment(event, id) {
    event.preventDefault();
    const input = event.target.querySelector('input');
    const text = input.value.trim();
    if (!text) return;

    const post = feedPosts.find(p => p.id === id);
    post.comments.push(text);
    renderFeed();
}

// Criar nova postagem pelo formulário
postForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('pet-name').value.trim();
    const photoInput = document.getElementById('pet-photo').value.trim();
    const caption = document.getElementById('pet-caption').value.trim();

    // Foto padrão caso o usuário deixe o campo de URL vazio
    const defaultDogPhoto = "https://unsplash.com";

    const newPost = {
        id: Date.now(),
        name: name,
        time: "Agora mesmo",
        image: photoInput || defaultDogPhoto,
        caption: caption,
        likes: 0,
        liked: false,
        comments: []
    };

    feedPosts.unshift(newPost); // Adiciona no topo do feed
    postForm.reset();
    renderFeed();
});

// Inicializa o feed
renderFeed();
