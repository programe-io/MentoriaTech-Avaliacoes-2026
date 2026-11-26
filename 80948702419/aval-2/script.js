// Dados iniciais simulando posts da comunidade
let posts = [
    {
        id: 1,
        author: "Solaire de Astora",
        category: "Dica",
        content: "Se você sentir que perdeu o caminho, olhe para cima. Louvado seja o Sol! \\[T]/",
        ratings: 142,
        rated: false,
        time: "Há 10 minutos • Altar of Sunlight"
    },
    {
        id: 2,
        author: "Patches, a Hiena",
        category: "Dica",
        content: "Tesouro incrível logo ali na beira do penhasco. Pode olhar lá embaixo, eu garanto!",
        ratings: 3,
        rated: false,
        time: "Há 35 minutos • Tomb of the Giants"
    },
    {
        id: 3,
        author: "Siegmeyer de Catarina",
        category: "Boss",
        content: "Hmm... Mmm... Estou preso pensando em como passar pelos arqueiros de Anor Londo. Alguém tem flechas venenosas?",
        ratings: 89,
        rated: false,
        time: "Há 2 horas • Anor Londo"
    },
    {
        id: 4,
        author: "Big Hat Logan",
        category: "Lore",
        content: "A Chama Primordial está enfraquecendo. Gwyn sacrificou a si mesmo para prolongar a Era do Fogo, mas a maldição dos mortos-vivos apenas cresce.",
        ratings: 215,
        rated: false,
        time: "Há 5 horas • Duke's Archives"
    }
];

let currentFilter = "Todos";

const feedContainer = document.getElementById('feedContainer');
const postForm = document.getElementById('postForm');
const filterButtons = document.querySelectorAll('.filter-btn');

// Renderizar o feed
function renderFeed() {
    feedContainer.innerHTML = '';

    const filteredPosts = currentFilter === "Todos" 
        ? posts 
        : posts.filter(post => post.category === currentFilter);

    filteredPosts.forEach(post => {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-header">
                <span class="author">${escapeHTML(post.author)}</span>
                <span class="tag">${post.category}</span>
            </div>
            <div class="card-body">
                ${escapeHTML(post.content)}
            </div>
            <div class="card-footer">
                <span>${post.time}</span>
                <button class="btn-rate ${post.rated ? 'rated' : ''}" onclick="toggleRate(${post.id})">
                    🔥 Avaliar Bom (${post.ratings})
                </button>
            </div>
        `;
        feedContainer.appendChild(card);
    });
}

// Adicionar novo post
postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const author = document.getElementById('authorInput').value.trim();
    const category = document.getElementById('categoryInput').value;
    const content = document.getElementById('contentInput').value.trim();

    if (!author || !content) return;

    const newPost = {
        id: Date.now(),
        author: author,
        category: category,
        content: content,
        ratings: 1,
        rated: true,
        time: "Agora mesmo • Firelink Shrine"
    };

    posts.unshift(newPost);
    postForm.reset();
    renderFeed();
});

// Sistema de curtida ("Avaliar Bom")
window.toggleRate = function(id) {
    const post = posts.find(p => p.id === id);
    if (post) {
        post.rated = !post.rated;
        post.ratings += post.rated ? 1 : -1;
        renderFeed();
    }
};

// Filtros por categoria
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        renderFeed();
    });
});

// Prevenir injeção de HTML
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag]));
}

// Inicializar
renderFeed();
