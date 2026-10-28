/* ==========================================================================
   BEAUTY GLOW - BANCO DE DADOS & LÓGICA PRINCIPAL
   ========================================================================== */

// 1. DADOS DOS ARTIGOS DO BLOG
const articlesData = [
    {
        id: 1,
        title: "Maquiagem para iniciantes: guia completo",
        category: "Iniciantes",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80",
        excerpt: "Aprenda o passo a passo fundamental para criar maquiagens incríveis mesmo se você estiver começando do zero.",
        content: `
            <p>Iniciar no universo da maquiagem pode parecer desafiador com a quantidade de produtos disponíveis no mercado. Porém, com os itens certos e as técnicas adequadas, você pode criar visuais belíssimos sem complicação.</p>
            <h3>1. Os produtos essenciais para o seu kit inicial</h3>
            <p>Você não precisa de dezenas de pincéis ou paletas complexas. Para começar, invista em: um bom protetor solar com cor ou BB Cream, corretivo do tom exato da sua pele, máscara de cílios, blush cremoso (que também serve como batom) e um gel de sobrancelhas.</p>
            <h3>2. A ordem de aplicação perfeita</h3>
            <p>Comece sempre pela limpeza e hidratação. Em seguida, aplique a cobertura escolhida uniformemente. Corrija pontualmente olheiras ou machinhas, adicione cor às bochechas e finalize com a máscara de cílios.</p>
            <p>Lembre-se: o segredo de uma maquiagem bonita está na construção de camadas leves e no esfumado suave!</p>
        `
    },
    {
        id: 2,
        title: "Como preparar a pele antes da maquiagem",
        category: "Pele",
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80",
        excerpt: "O segredo de uma maquiagem duradoura e sem efeito 'craquelado' está na rotina de pré-maquiagem.",
        content: `
            <p>O acabamento de qualquer base depende diretamente da saúde e da textura da sua pele no momento da aplicação. Negligenciar a preparação é o erro número um de quem reclama do efeito craquelado.</p>
            <h3>Passo 1: Limpeza Eficiente</h3>
            <p>Lave o rosto com um sabonete específico para o seu tipo de pele. Isso remove a oleosidade acumulada e os resíduos de produtos anteriores.</p>
            <h3>Passo 2: Hidratação Estratégica</h3>
            <p>Mesmo peles oleosas precisam de hidratação! Opte por géis hidratantes para peles mistas/oleosas e cremes mais densos para peles secas. Espere o produto absorver por cerca de 3 a 5 minutos antes do próximo passo.</p>
            <h3>Passo 3: Primer e Proteção</h3>
            <p>O primer ajuda a suavizar os poros e prolongar a fixação da make. Aplique focado nas regiões com maior textura, como a zona T.</p>
        `
    },
    {
        id: 3,
        title: "5 tendências de maquiagem para 2026",
        category: "Tendências",
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
        excerpt: "Fique por dentro do que estará em alta nos desfiles e no dia a dia nesta temporada.",
        content: `
            <p>O ano traz um equilíbrio perfeito entre o minimalismo sofisticado e pontos de cor audaciosos. Confira as 5 maiores tendências:</p>

            <p><strong>1. Pele 'Glass Skin' Iluminada:</strong> Coberturas ultraleves com acabamento viçoso e natural continuam dominando.</p>
            <p><strong>2. Blushes Alinhados no Têmpora:</strong> Aplicação do blush subindo em direção às têmporas para um efeito 'facelift' instantâneo.</p>
            <p><strong>3. Lábios Contornados Estilo Anos 90:</strong> Lápis de boca tom marrom com gloss translúcido no centro.</p>
            <p><strong>4. Delineados Gráficos Suaves:</strong> Delineados coloridos em tons terrosos e pastel com traços finos.</p>
            <p><strong>5. Sobrancelhas Naturais Laminated:</strong> Fios penteados para cima, mas sem o aspecto rígido.</p>
        `
    },
    {
        id: 4,
        title: "Como escolher a base ideal para seu tom de pele",
        category: "Pele",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
        excerpt: "Descubra seu subtom e nunca mais erre na escolha da cor do seu produto facial.",
        content: `
            <p>Comprar a base errada é uma das frustrações mais comuns na maquiagem. Para não errar, você precisa entender a diferença entre tom e subtom.</p>
            <h3>Descobrindo seu Subtom</h3>
            <p><strong>Frio:</strong> Sua pele tende a corar facilmente ao sol e bijuterias prateadas costumam favorecer você. Suas veias no pulso parecem azuladas.</p>
            <p><strong>Quente:</strong> Você bronzear com facilidade e acessórios dourados se destacam. Suas veias parecem mais esverdeadas.</p>
            <p><strong>Neutro:</strong> Um equilíbrio entre tons quentes e frios.</p>
            <h3>Onde testar a cor?</h3>
            <p>Nunca teste a base nas costas da mão ou no pulso! O local correto para testar é no maxilar, descendo levemente em direção ao pescoço. A cor certa deve 'desaparecer' na pele.</p>
        `
    },
    {
        id: 5,
        title: "Maquiagem natural para o dia a dia",
        category: "Dia a Dia",
        image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600&q=80",
        excerpt: "Um visual leve, iluminado e rápido de fazer em apenas 10 minutos pela manhã.",
        content: `
            <p>A maquiagem do dia a dia deve ser prática, confortável e realçar seus pontos fortes sem parecer pesada.</p>
            <h3>Passo a Passo de 10 Minutos:</h3>
            <p>1. Misture umas gotinhas de iluminador líquido no seu hidratante ou protetor solar.</p>
            <p>2. Aplique corretivo apenas onde houver necessidade (olheiras e pequenas marcas).</p>
            <p>3. Dê batidinhas de blush cremoso nas maçãs do rosto para ar saudável.</p>
            <p>4. Aplique uma camada de máscara nos cílios superiores.</p>
            <p>5. Finalize com um balme labial com cor.</p>
        `
    },
    {
        id: 6,
        title: "Como fazer um delineado perfeito",
        category: "Técnicas",
        image: "https://images.unsplash.com/photo-1583241800698-e8ab01c85b27?auto=format&fit=crop&w=600&q=80",
        excerpt: "Dicas infalíveis e truques práticos para conquistar o gatinho reto e simétrico.",
        content: `
            <p>Fazer o delineado gatinho é um desafio para muitas pessoas, mas o segredo está no ponto de apoio e no ângulo correto!</p>
            <h3>O truque do espelho</h3>
            <p>Olhe para baixo em direção ao espelho, sem franzir os olhos. Isso evita que a dobra da pálpebra atrapalhe o traço.</p>
            <h3>Conectando os pontos</h3>
            <p>Faça primeiro a linha que sai do canto externo do olho em direção ao final da sobrancelha. Em seguida, traga uma linha do topo do traço em direção ao centro da pálpebra, formando um triângulo, e preencha.</p>
            <p><em>Dica de ouro:</em> Tenha à mão um pincel chanfrado limpo com um pouquinho de corretivo para 'limpar' o traço e deixá-lo super afiado!</p>
        `
    }
];

// 2. DADOS DAS RESENHAS DE PRODUTOS
const reviewsData = [
    {
        id: 101,
        title: "Base Glow Hydrating",
        rating: 5,
        image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=400&q=80",
        shortDesc: "Acabamento luminoso, cobertura média ajustável e ultra hidratação.",
        fullReview: "Esta base se tornou a minha favorita para o dia a dia. Ela possui uma textura fluida e deixa a pele com um viço radiante natural, sem parecer oleosa. Durou cerca de 8 horas intacta na minha pele mista com uma leve selada de pó na zona T."
    },
    {
        id: 102,
        title: "Máscara Cílios Infinitos",
        rating: 4,
        image: "https://images.unsplash.com/photo-1591360236480-4ed861025fa1?auto=format&fit=crop&w=400&q=80",
        shortDesc: "Volume dramático e alongamento imediato sem empelotar.",
        fullReview: "O aplicador em silicone consegue pegar até os cílios menores no canto interno. Entrega um bom volume na primeira camada e não borra ao longo do dia. O único ponto é que requer um demaquilante bifásico para sair completamente."
    },
    {
        id: 103,
        title: "Batom Matte Velvet",
        rating: 5,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80",
        shortDesc: "Textura aveludada, pigmentação intensa e conforto nos lábios.",
        fullReview: "Diferente dos mattes tradicionais que ressecam, essa fórmula tem toque aveludado quase de nuvem. A pigmentação é entrega de primeira e a cor dura mesmo após refeições leves."
    },
    {
        id: 104,
        title: "Paleta Sombras Nude Gold",
        rating: 5,
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=400&q=80",
        shortDesc: "12 cores hiper pigmentadas entre opacas e cintilantes.",
        fullReview: "Super versátil! As sombras esfarelam pouquíssimo e esfoliam/esfumam com facilidade extrema. Permite desde makes suaves para reuniões até um olho esfumado marcante para a noite."
    }
];

/* ==========================================================================
   3. RENDERIZAÇÃO DE ELEMENTOS DILÂMICOS
   ========================================================================== */

// DOM Elements
const articlesGrid = document.getElementById('articlesGrid');
const categoryFilters = document.getElementById('categoryFilters');
const popularPostsContainer = document.getElementById('popularPosts');
const reviewsGrid = document.getElementById('reviewsGrid');
const noResults = document.getElementById('noResults');
const articleModal = document.getElementById('articleModal');
const modalBody = document.getElementById('modalBody');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const backToTopBtn = document.getElementById('backToTopBtn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

// Renderizar Artigos
function renderArticles(articlesToRender) {
    articlesGrid.innerHTML = '';

    if (articlesToRender.length === 0) {
        noResults.classList.remove('hidden');
        return;
    }

    noResults.classList.add('hidden');

    articlesToRender.forEach(article => {
        const card = document.createElement('article');
        card.className = 'article-card';
        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
                <span class="card-category">${article.category}</span>
            </div>
            <div class="card-content">
                <h3 class="card-title">${article.title}</h3>
                <p class="card-excerpt">${article.excerpt}</p>
                <div class="card-footer">
                    <button class="read-more-btn" onclick="openArticleModal(${article.id})">
                        Ler artigo completo →
                    </button>
                </div>
            </div>
        `;
        articlesGrid.appendChild(card);
    });
}

// Renderizar Sidebar: Artigos Populares
function renderPopularPosts() {
    popularPostsContainer.innerHTML = '';
    // Pegando os 3 primeiros para destaque
    const popular = articlesData.slice(0, 3);
    
    popular.forEach(post => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="popular-post-item" style="cursor: pointer;" onclick="openArticleModal(${post.id})">
                <img src="${post.image}" alt="${post.title}">
                <div class="popular-post-info">
                    <h4>${post.title}</h4>
                    <span>${post.category}</span>
                </div>
            </div>
        `;
        popularPostsContainer.appendChild(li);
    });
}

// Renderizar Resenhas
function renderReviews() {
    reviewsGrid.innerHTML = '';
    
    reviewsData.forEach(review => {
        const starsHtml = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
            <img src="${review.image}" alt="${review.title}" class="review-img">
            <h3 class="review-title">${review.title}</h3>
            <div class="stars">${starsHtml}</div>
            <p class="review-desc">${review.shortDesc}</p>
            <button class="btn btn-outline" style="width: 100%; font-size: 0.8rem; padding: 8px 15px;" onclick="openReviewModal(${review.id})">
                Ver resenha
            </button>
        `;
        reviewsGrid.appendChild(card);
    });
}

/* ==========================================================================
   4. MODAL DE CONTEÚDO (ARTIGOS E RESENHAS)
   ========================================================================== */

function openArticleModal(id) {
    const article = articlesData.find(a => a.id === id);
    if (!article) return;

    modalBody.innerHTML = `
        <img src="${article.image}" alt="${article.title}" class="modal-header-img">
        <span class="modal-meta">Categoria: ${article.category}</span>
        <h2 class="modal-title">${article.title}</h2>
        <div class="modal-body-text">
            ${article.content}
        </div>
    `;
    articleModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function openReviewModal(id) {
    const review = reviewsData.find(r => r.id === id);
    if (!review) return;

    const starsHtml = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

    modalBody.innerHTML = `
        <img src="${review.image}" alt="${review.title}" class="modal-header-img" style="height:200px; object-fit:contain;">
        <div style="text-align: center; margin-bottom: 15px;">
            <h2 class="modal-title">${review.title}</h2>
            <div class="stars" style="font-size: 1.2rem;">${starsHtml}</div>
        </div>
        <div class="modal-body-text">
            <p><strong>Veredito:</strong> ${review.fullReview}</p>
        </div>
    `;
    articleModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    articleModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

modalCloseBtn.addEventListener('click', closeModal);
articleModal.addEventListener('click', (e) => {
    if (e.target === articleModal) closeModal();
});

/* ==========================================================================
   5. FILTROS & BUSCA
   ========================================================================== */

// Filtros por Categoria nos Botões
categoryFilters.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        const category = e.target.getAttribute('data-category');
        filterArticles(category);
    }
});

function filterArticles(category) {
    if (category === 'all') {
        renderArticles(articlesData);
    } else {
        const filtered = articlesData.filter(a => a.category.toLowerCase() === category.toLowerCase());
        renderArticles(filtered);
    }
}

// Filtros por Categorias na Sidebar
document.querySelectorAll('.sidebar-cat-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const cat = link.getAttribute('data-cat');
        
        // Atualiza estilo dos botões principais
        document.querySelectorAll('.filter-btn').forEach(btn => {
            if (btn.getAttribute('data-category') === cat) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        filterArticles(cat);
        document.getElementById('artigos').scrollIntoView({ behavior: 'smooth' });
    });
});

// Busca de Artigos no Header
const searchInput = document.getElementById('headerSearchInput');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    const filtered = articlesData.filter(article => 
        article.title.toLowerCase().includes(searchTerm) || 
        article.excerpt.toLowerCase().includes(searchTerm) ||
        article.category.toLowerCase().includes(searchTerm)
    );
    
    renderArticles(filtered);
});

/* ==========================================================================
   6. FORMULÁRIOS & VALIDAÇÕES
   ========================================================================== */

// Validação de E-mail genérica
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Newsletter Principal
const mainNewsletterForm = document.getElementById('mainNewsletterForm');
const newsletterMessage = document.getElementById('newsletterMessage');

mainNewsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('newsEmailInput');
    const emailValue = emailInput.value.trim();

    if (!isValidEmail(emailValue)) {
        newsletterMessage.textContent = 'Por favor, insira um e-mail válido.';
        newsletterMessage.className = 'form-message error';
        return;
    }

    newsletterMessage.textContent = 'Obrigado por se inscrever! Seu brilho começa agora. ✨';
    newsletterMessage.className = 'form-message success';
    emailInput.value = '';

    setTimeout(() => {
        newsletterMessage.textContent = '';
    }, 4000);
});

// Newsletter Sidebar
const sidebarNewsForm = document.getElementById('sidebarNewsForm');
sidebarNewsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = sidebarNewsForm.querySelector('input');
    if (isValidEmail(input.value.trim())) {
        alert('Inscrição realizada com sucesso! Bem-vinda ao Beauty Glow.');
        input.value = '';
    } else {
        alert('Por favor, informe um e-mail válido.');
    }
});

/* ==========================================================================
   7. INTERAÇÕES DE INTERFACE & SCROLL
   ========================================================================== */

// Menu Mobile Toggle
mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Botão Voltar ao Topo
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Tecla ESC para fechar modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && articleModal.classList.contains('active')) {
        closeModal();
    }
});

/* ==========================================================================
   8. INICIALIZAÇÃO
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    renderArticles(articlesData);
    renderPopularPosts();
    renderReviews();
});