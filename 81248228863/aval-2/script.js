// Dados iniciais simulando um banco de dados
let posts = [
    {
        id: 1,
        author: "Central do Futebol",
        initials: "CF",
        time: "Há 15 min",
        category: "Mercado",
        content: "BOMBA! Clube europeu prepara proposta oficial de 35 milhões de euros por jovem promessa do Brasileirão na próxima janela de transferências.",
        likes: 42,
        liked: false
    },
    {
        id: 2,
        author: "Análise Tática",
        initials: "AT",
        time: "Há 1 hora",
        category: "Jogos",
        content: "A linha alta de marcação no segundo tempo mudou completamente o panorama do clássico. Pressão pós-perda funcionou perfeitamente.",
        likes: 19,
        liked: true
    },
    {
        id: 3,
        author: "Golaços Pelo Mundo",
        initials: "GP",
        time: "Há 3 horas",
        category: "Gols",
        content: "Que pintura de falta no ângulo! Goleiro nem saiu na foto. Forte candidato ao Prêmio Puskás desta temporada.",
        likes: 128,
        liked: false
    }
];

let currentFilter = 'Todos';

// Seleção de elementos do DOM
const feedContainer = document.getElementById('feedContainer');
const btnPublish = document.getElementById('btnPublish');
const postText = document.getElementById('postText');
const postCategory = document.getElementById('postCategory');
const filterButtons = document.querySelectorAll('.filter-btn');

// Renderiza os posts na tela
function renderFeed() {
    feedContainer.innerHTML = '';

    const filteredPosts = currentFilter === 'Todos' 
        ? posts 
        : posts.filter(post => post.category === currentFilter);

    filteredPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <div class="post-header">
                <div class="author-info">
                    <div class="avatar">${post.initials}</div>
                    <div>
                        <div class="author-name">${post.author}</div>
                        <div class="post-time">${post.time}</div>
                    </div>
                </div>
                <span class="tag">${post.category}</span>
            </div>
            <div class="post-content">${post.content}</div>
            <div class="post-actions">
                <button class="action-btn like-btn ${post.liked ? 'liked' : ''}" data-id="${post.id}">
                    ${post.liked ? '❤️' : '🤍'} ${post.likes} Curtidas
                </button>
                <button class="action-btn share-btn" data-author="${post.author}">
                    🔗 Compartilhar
                </button>
            </div>
        `;
        feedContainer.appendChild(postElement);
    });
}

// Adiciona nova postagem
function addPost() {
    const text = postText.value.trim();

    if (!text) {
        alert("Digite algo antes de publicar!");
        return;
    }

    const newPost = {
        id: Date.now(),
        author: "Torcedor Fanático",
        initials: "TF",
        time: "Agora mesmo",
        category: postCategory.value,
        content: text,
        likes: 0,
        liked: false
    };

    posts.unshift(newPost);
    postText.value = '';
    renderFeed();
}

// Eventos
btnPublish.addEventListener('click', addPost);

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        currentFilter = btn.dataset.category;
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderFeed();
    });
});

// Delegação de eventos para curtir e compartilhar nos posts dinâmicos
feedContainer.addEventListener('click', (event) => {
    const likeBtn = event.target.closest('.like-btn');
    const shareBtn = event.target.closest('.share-btn');

    if (likeBtn) {
        const id = Number(likeBtn.dataset.id);
        const post = posts.find(p => p.id === id);
        if (post) {
            post.liked = !post.liked;
            post.likes += post.liked ? 1 : -1;
            renderFeed();
        }
    }

    if (shareBtn) {
        const author = shareBtn.dataset.author;
        alert(`Link da publicação de ${author} copiado para a área de transferência!`);
    }
});

// Inicializa o feed ao carregar a página
renderFeed();
