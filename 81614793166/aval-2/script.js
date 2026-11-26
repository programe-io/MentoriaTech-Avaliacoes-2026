let feedData = [
    {
        id: 1,
        user: "Camila Rocha",
        avatar: "https://unsplash.com",
        location: "📍 Parque Nacional de Sete Cidades, PI",
        image: "https://unsplash.com",
        caption: "Trilha matinal pelas formações rochosas e pinturas rupestres. Vale muito a pena contratar um guia local na entrada do parque!",
        likes: 42,
        isLiked: false,
        isSaved: false,
        time: "Há 2 horas",
        comments: [
            { user: "pedro_viaja", text: "Lugar incrível! Fui ano passado e recomendo." }
        ]
    },
    {
        id: 2,
        user: "Rafael Mendes",
        avatar: "https://unsplash.com",
        location: "📍 Dolomitas, Itália",
        image: "https://unsplash.com",
        caption: "Acordar com essa vista nas montanhas compensa qualquer frio. Dica: alugue carro para explorar os passos alpinos no seu ritmo.",
        likes: 128,
        isLiked: true,
        isSaved: true,
        time: "Há 5 horas",
        comments: []
    },
    {
        id: 3,
        user: "Juliana Pires",
        avatar: "https://unsplash.com",
        location: "📍 Ouro Preto, MG",
        image: "https://unsplash.com",
        caption: "Caminhando pelas ladeiras históricas no fim de tarde. Preparem tênis confortáveis porque as subidas são reais!",
        likes: 76,
        isLiked: false,
        isSaved: false,
        time: "Há 1 dia",
        comments: []
    }
];

let currentFilter = 'all';

const feedList = document.getElementById('feedList');
const postForm = document.getElementById('postForm');
const tabButtons = document.querySelectorAll('.tab-btn');
const savedCountEl = document.getElementById('savedCount');

// Atualiza contador de salvos
function updateSavedCount() {
    const count = feedData.filter(post => post.isSaved).length;
    savedCountEl.textContent = count;
}

// Renderiza o feed na tela
function renderFeed() {
    updateSavedCount();
    feedList.innerHTML = '';

    const items = currentFilter === 'saved' 
        ? feedData.filter(post => post.isSaved) 
        : feedData;

    if (items.length === 0) {
        feedList.innerHTML = `<p style="text-align:center; color:#64748b; padding: 30px;">Nenhuma postagem salva ainda. Clique no ícone 🔖 para guardar roteiros!</p>`;
        return;
    }

    items.forEach(post => {
        const commentsHTML = post.comments.map(c => 
            `<li><strong>${c.user}</strong> ${c.text}</li>`
        ).join('');

        const article = document.createElement('article');
        article.className = 'post-card';
        article.innerHTML = `
            <div class="post-header">
                <img src="${post.avatar}" alt="${post.user}" class="avatar">
                <div class="user-info">
                    <h4>${post.user}</h4>
                    <span>${post.location}</span>
                </div>
            </div>

            <img src="${post.image}" alt="${post.location}" class="post-image">

            <div class="post-actions">
                <div class="action-left">
                    <button class="action-btn ${post.isLiked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                        ${post.isLiked ? '❤️' : '🤍'} <span>${post.likes}</span>
                    </button>
                </div>
                <button class="action-btn" onclick="toggleSave(${post.id})" title="Salvar destino">
                    ${post.isSaved ? '🔖' : '📑'}
                </button>
            </div>

            <p class="post-caption"><strong>${post.user}</strong> ${post.caption}</p>
            <div class="post-time">${post.time}</div>

            <div class="comments-section">
                <ul class="comment-list">${commentsHTML}</ul>
                <form class="comment-form" onsubmit="addComment(event, ${post.id})">
                    <input type="text" placeholder="Adicione um comentário..." required>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        `;
        feedList.appendChild(article);
    });
}

// Curtir / Descurtir
function toggleLike(id) {
    const post = feedData.find(p => p.id === id);
    if (!post) return;
    post.isLiked = !post.isLiked;
    post.likes += post.isLiked ? 1 : -1;
    renderFeed();
}

// Salvar / Remover dos salvos
function toggleSave(id) {
    const post = feedData.find(p => p.id === id);
    if (!post) return;
    post.isSaved = !post.isSaved;
    renderFeed();
}

// Adicionar comentário
function addComment(event, id) {
    event.preventDefault();
    const input = event.target.querySelector('input');
    const text = input.value.trim();
    if (!text) return;

    const post = feedData.find(p => p.id === id);
    post.comments.push({ user: "voce_viajante", text });
    renderFeed();
}

// Criar novo post no topo do feed
postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = document.getElementById('locationInput').value.trim();
    const imageUrl = document.getElementById('imageInput').value.trim();
    const caption = document.getElementById('captionInput').value.trim();

    const newPost = {
        id: Date.now(),
        user: "Você (Viajante)",
        avatar: "https://unsplash.com",
        location: location.startsWith('📍') ? location : `📍 ${location}`,
        image: imageUrl || "https://unsplash.com",
        caption: caption,
        likes: 0,
        isLiked: false,
        isSaved: false,
        time: "Agora mesmo",
        comments: []
    };

    feedData.unshift(newPost);
    postForm.reset();
    currentFilter = 'all';
    updateTabsUI();
    renderFeed();
});

// Alternar abas (Explorar / Salvos)
function updateTabsUI() {
    tabButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === currentFilter);
    });
}

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        currentFilter = btn.dataset.filter;
        updateTabsUI();
        renderFeed();
    });
});

// Inicializa
renderFeed();
