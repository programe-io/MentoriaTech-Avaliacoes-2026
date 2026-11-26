// Banco de dados simulado de resenhas
const posts = [
    {
        id: 1,
        title: "O Iluminado (1980): O Terror do Isolamento",
        category: "Psicológico",
        director: "Stanley Kubrick",
        rating: "★★★★★",
        image: "https://unsplash.com",
        excerpt: "Como o Hotel Overlook transforma a sanidade de Jack Torrance em uma obra-prima inesquecível do horror.",
        content: `
            <p>Dirigido por Stanley Kubrick e baseado na obra de Stephen King, <strong>O Iluminado</strong> redefine o terror ao abandonar as sombras tradicionais e apostar em corredores iluminados, simetria perturbadora e uma trilha sonora sufocante.</p>
            <p>A atuação de Jack Nicholson como Jack Torrance mostra uma descida gradual e assustadora à loucura, impulsionada pelo isolamento extremo do inverno no Colorado e pelas forças sobrenaturais do Hotel Overlook.</p>
            <p><strong>Veredito:</strong> Um clássico obrigatório que envelhece como vinho e continua perturbando novas gerações.</p>
        `
    },
    {
        id: 2,
        title: "Halloween (1978): O Nascimento do Slasher Moderno",
        category: "Slasher",
        director: "John Carpenter",
        rating: "★★★★★",
        image: "https://unsplash.com",
        excerpt: "Com orçamento baixo e uma máscara branca inexpressiva, Michael Myers redefiniu o medo nos subúrbios.",
        content: `
            <p>John Carpenter provou que não é preciso sangue em excesso para causar pânico genuíno. Em <strong>Halloween</strong>, a câmera subjetiva e a icônica trilha sonora composta pelo próprio diretor criam uma tensão constante.</p>
            <p>Michael Myers não tem motivações claras — ele é o mal puro andando lentamente pelas ruas tranquilas de Haddonfield, enquanto Laurie Strode (Jamie Lee Curtis) luta para sobreviver à noite.</p>
            <p><strong>Veredito:</strong> A pedra fundamental de todo filme slasher que veio depois dele.</p>
        `
    },
    {
        id: 3,
        title: "Hereditário (2018): O Luto Como Maldição",
        category: "Sobrenatural",
        director: "Ari Aster",
        rating: "★★★★☆",
        image: "https://unsplash.com",
        excerpt: "Ari Aster entrega um drama familiar devastador que escala para um pesadelo ocultista sufocante.",
        content: `
            <p><strong>Hereditário</strong> começa como um estudo profundo sobre trauma e luto após a morte da matriarca da família Graham, mas rapidamente se transforma em uma espiral de horror sobrenatural implacável.</p>
            <p>Toni Collette entrega uma das maiores atuações da história do gênero, carregando o desespero de uma mãe vendo sua família desmoronar diante de forças que ela não compreende.</p>
            <p><strong>Veredito:</strong> Perturbador, imprevisível e com um terceiro ato que fica gravado na memória por dias.</p>
        `
    },
    {
        id: 4,
        title: "Invocação do Mal (2013): O Resgate dos Sustos Clássicos",
        category: "Sobrenatural",
        director: "James Wan",
        rating: "★★★★☆",
        image: "https://unsplash.com",
        excerpt: "James Wan usa atmosfera, som e paciência para criar o melhor terror de casa assombrada da década.",
        content: `
            <p>Inspirado nos arquivos reais do casal Ed e Lorraine Warren, <strong>Invocação do Mal</strong> resgata o terror clássico dos anos 70 sem depender de efeitos digitais exagerados.</p>
            <p>A famosa cena das palmas no porão demonstra o domínio técnico de James Wan ao construir expectativa antes de entregar o susto.</p>
            <p><strong>Veredito:</strong> Eficiente, assustador e responsável por iniciar um dos maiores universos do terror moderno.</p>
        `
    }
];

const blogGrid = document.getElementById('blog-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search-input');

// Elementos do Modal
const modal = document.getElementById('article-modal');
const closeModalBtn = document.getElementById('close-modal');

let currentCategory = 'todos';

// Renderiza os cards na tela
function renderPosts() {
    const searchTerm = searchInput.value.toLowerCase();
    blogGrid.innerHTML = '';

    const filtered = posts.filter(post => {
        const matchesCategory = currentCategory === 'todos' || post.category === currentCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm) || 
                              post.director.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        blogGrid.innerHTML = '<p style="color: #9ca3af;">Nenhum pesadelo encontrado para sua busca...</p>';
        return;
    }

    filtered.forEach(post => {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <div class="card-content">
                <span class="badge">${post.category}</span>
                <h3>${post.title}</h3>
                <p class="meta">Dir. ${post.director} • Nota: ${post.rating}</p>
                <p class="excerpt">${post.excerpt}</p>
                <button class="read-more" onclick="openModal(${post.id})">Ler Crítica</button>
            </div>
        `;
        blogGrid.appendChild(card);
    });
}

// Abre o modal com o texto completo
function openModal(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;

    document.getElementById('modal-img').src = post.image;
    document.getElementById('modal-category').textContent = post.category;
    document.getElementById('modal-title').textContent = post.title;
    document.getElementById('modal-meta').textContent = `Direção: ${post.director} | Avaliação: ${post.rating}`;
    document.getElementById('modal-body').innerHTML = post.content;

    modal.style.display = 'block';
}

// Eventos de filtro por categoria
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        renderPosts();
    });
});

// Evento de pesquisa em tempo real
searchInput.addEventListener('input', renderPosts);

// Fechar modal
closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

// Inicializa o blog
renderPosts();
