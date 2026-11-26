// Banco de dados simulado dos artigos
const posts = [
    {
        id: 1,
        title: "Roteiro de 5 dias pelo Delta do Parnaíba e Lençóis",
        category: "brasil",
        date: "18 de Novembro, 2026",
        author: "Mariana Costa",
        image: "https://unsplash.com",
        excerpt: "Descubra como combinar as dunas cristalinas do Maranhão com a biodiversidade única do Delta do Parnaíba no Piauí.",
        content: `
            <p>A Rota das Emoções é um dos trajetos mais impressionantes do Nordeste brasileiro. Começando pelo Delta do Parnaíba, no Piauí, você encontra o único delta em mar aberto das Américas.</p>
            <p>O passeio de lancha pelos igarapés permite observar guarás vermelhos revoadando ao entardecer, um espetáculo natural inesquecível.</p>
            <p>Seguindo rumo aos Lençóis Maranhenses, a dica principal é visitar entre junho e setembro, quando as lagoas interdunares estão cheias e com água cristalina.</p>
        `
    },
    {
        id: 2,
        title: "O que fazer em Lisboa: guia para primeira viagem",
        category: "europa",
        date: "10 de Novembro, 2026",
        author: "Lucas Andrade",
        image: "https://unsplash.com",
        excerpt: "De Alfama a Belém, confira os miradouros imperdíveis, onde comer os melhores pastéis de nata e como usar o transporte.",
        content: `
            <p>Lisboa encanta logo no primeiro olhar com suas colinas, bondes amarelos e azulejos históricos.</p>
            <p>Reserve uma manhã inteira para se perder pelas ruas estreitas de Alfama e subir até o Castelo de São Jorge. No fim da tarde, o Miradouro de Santa Luzia oferece a melhor vista do rio Tejo.</p>
            <p>Para economizar no transporte, adquira o cartão Navegante Ocasional e carregue na modalidade Zapping.</p>
        `
    },
    {
        id: 3,
        title: "Kyoto no Outono: templos e florestas de bambu",
        category: "asia",
        date: "02 de Novembro, 2026",
        author: "Mariana Costa",
        image: "https://unsplash.com",
        excerpt: "A antiga capital imperial do Japão ganha tons vibrantes de vermelho e laranja entre outubro e novembro.",
        content: `
            <p>Visitar Kyoto durante o Momiji (a temporada das folhas de outono) é uma experiência sensorial única.</p>
            <p>Chegue antes das 7h da manhã na Floresta de Bambu de Arashiyama e no santuário Fushimi Inari para evitar multidões e conseguir boas fotografias.</p>
            <p>Não deixe de experimentar uma cerimônia tradicional do chá no bairro histórico de Gion.</p>
        `
    },
    {
        id: 4,
        title: "Como montar uma mala de mão para 10 dias",
        category: "dicas",
        date: "25 de Outubro, 2026",
        author: "Lucas Andrade",
        image: "https://unsplash.com",
        excerpt: "Aprenda a técnica de camadas e organizadores para viajar leve e evitar taxas de despacho de bagagem.",
        content: `
            <p>Viajar apenas com mala de bordo (até 10kg) economiza tempo no aeroporto e evita extravios.</p>
            <p>O segredo está na regra 5-4-3-2-1: cinco conjuntos de roupas íntimas/meias, quatro partes de cima, três partes de baixo, dois pares de calçados e um casaco versátil.</p>
            <p>Use organizadores de mala (packing cubes) para comprimir as peças e manter tudo separado por categoria.</p>
        `
    }
];

const postsContainer = document.getElementById('postsContainer');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');

// Elementos do Modal
const modal = document.getElementById('postModal');
const closeModal = document.getElementById('closeModal');

let currentCategory = 'todos';

// Renderiza os cards na tela
function renderPosts(postsToRender) {
    postsContainer.innerHTML = '';

    if (postsToRender.length === 0) {
        postsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #64748b;">Nenhum artigo encontrado para sua busca.</p>';
        return;
    }

    postsToRender.forEach(post => {
        const card = document.createElement('article');
        card.className = 'post-card';
        card.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <div class="post-content">
                <span class="tag">${post.category}</span>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <button class="read-more" onclick="openPost(${post.id})">Ler artigo completo →</button>
            </div>
        `;
        postsContainer.appendChild(card);
    });
}

// Filtra por categoria e texto
function filterPosts() {
    const searchTerm = searchInput.value.toLowerCase();

    const filtered = posts.filter(post => {
        const matchesCategory = currentCategory === 'todos' || post.category === currentCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm) || 
                              post.excerpt.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    renderPosts(filtered);
}

// Eventos dos botões de categoria
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        filterPosts();
    });
});

// Evento de busca em tempo real
searchInput.addEventListener('input', filterPosts);

// Abre o modal com o conteúdo completo
function openPost(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;

    document.getElementById('modalImage').src = post.image;
    document.getElementById('modalCategory').textContent = post.category;
    document.getElementById('modalTitle').textContent = post.title;
    document.getElementById('modalMeta').textContent = `Por ${post.author} • ${post.date}`;
    document.getElementById('modalBody').innerHTML = post.content;

    modal.style.display = 'block';
}

// Fecha o modal
closeModal.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

// Inicializa o blog
renderPosts(posts);
