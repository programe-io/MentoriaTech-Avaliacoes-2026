// Banco de dados fictício de postagens do blog
const posts = [
    {
        id: 1,
        title: "Melhor Sensibilidade para Subir Capa na Nova Atualização",
        category: "dicas",
        categoryLabel: "Dicas & Capa",
        date: "24 de Novembro de 2026",
        image: "https://unsplash.com",
        summary: "Descubra os ajustes ideais de Geral, Ponto Vermelho e Mira 2x para celulares Android e iOS.",
        content: "Subir capa exige precisão e treino. Para a atualização atual, recomendamos manter a Geral entre 95 e 100, Ponto Vermelho em 92, Mira 2x em 96 e Mira 4x em 90. Lembre-se de ajustar o tamanho do botão de atirar para cerca de 45% a 52% para facilitar o movimento de puxada rápida."
    },
    {
        id: 2,
        title: "Notas da Atualização OB: Novo Mapa e Ajustes de Personagens",
        category: "atualizacoes",
        categoryLabel: "Atualizações",
        date: "20 de Novembro de 2026",
        image: "https://unsplash.com",
        summary: "Confira tudo o que mudou nas habilidades ativas e as novidades no modo Contra Squad.",
        content: "A Garena trouxe mudanças importantes para equilibrar o cenário competitivo. Personagens de cura sofreram pequenos ajustes no tempo de recarga, enquanto novas áreas de loot foram adicionadas em Bermuda. No modo Contra Squad, a economia das primeiras rodadas foi reformulada."
    },
    {
        id: 3,
        title: "Top 3 Melhores Armas de Rush para Curta Distância",
        category: "armas",
        categoryLabel: "Armas & Meta",
        date: "15 de Novembro de 2026",
        image: "https://unsplash.com",
        summary: "Veja quais submetralhadoras e espingardas estão dominando as trocas de tiro insanas.",
        content: "1. MP40: Continua sendo a rainha da cadência de tiro para quem gosta de agilidade.\n2. M1887 (Doze Velha): Letal com dois disparos bem encaixados no peito ou cabeça.\n3. UMP: Excelente penetração de armadura para derreter coletes nível 3 e 4."
    },
    {
        id: 4,
        title: "Como Fazer o Gelo Agachando Muito Mais Rápido",
        category: "dicas",
        categoryLabel: "Dicas & Capa",
        date: "10 de Novembro de 2026",
        image: "https://unsplash.com",
        summary: "Aprenda a configurar seu HUD de 3 dedos para colocar parede de gelo instantânea.",
        content: "O segredo do gelo rápido está no HUD personalizado. Posicione o botão da parede de gelo no canto superior esquerdo para apertá-lo com o indicador esquerdo enquanto usa o polegar esquerdo para agachar e o direito para girar a câmera para baixo."
    }
];

const postsContainer = document.getElementById('postsContainer');
const searchInput = document.getElementById('searchInput');
const navLinks = document.querySelectorAll('.nav-links a');

// Elementos do Modal
const modal = document.getElementById('articleModal');
const closeBtn = document.querySelector('.close-btn');

let currentCategory = 'todos';

// Função para renderizar os cards na tela
function renderPosts(postsToRender) {
    postsContainer.innerHTML = '';

    if (postsToRender.length === 0) {
        postsContainer.innerHTML = '<p>Nenhum artigo encontrado com esses critérios.</p>';
        return;
    }

    postsToRender.forEach(post => {
        const card = document.createElement('article');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <div class="card-content">
                <span class="badge">${post.categoryLabel}</span>
                <h3>${post.title}</h3>
                <p>${post.summary}</p>
                <button class="btn-read" onclick="openModal(${post.id})">Ler Artigo</button>
            </div>
        `;

        postsContainer.appendChild(card);
    });
}

// Filtrar por categoria e texto de busca
function filterPosts() {
    const searchTerm = searchInput.value.toLowerCase();

    const filtered = posts.filter(post => {
        const matchesCategory = currentCategory === 'todos' || post.category === currentCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm) || 
                              post.summary.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    renderPosts(filtered);
}

// Eventos dos links de categoria
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');

        currentCategory = link.getAttribute('data-category');
        filterPosts();
    });
});

// Evento de digitação na busca
searchInput.addEventListener('input', filterPosts);

// Funções do Modal
function openModal(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    document.getElementById('modalCategory').textContent = post.categoryLabel;
    document.getElementById('modalTitle').textContent = post.title;
    document.getElementById('modalDate').textContent = `Publicado em ${post.date}`;
    document.getElementById('modalImage').src = post.image;
    document.getElementById('modalBody').innerText = post.content;

    modal.style.display = 'block';
}

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Inicializa o blog
renderPosts(posts);
