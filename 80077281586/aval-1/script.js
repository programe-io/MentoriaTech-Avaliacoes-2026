const blogPosts = [
    {
        id: 1,
        featured: true,
        category: "medicinal",
        catName: "Medicinal",
        title: "Guia Completo sobre Óleos Full Spectrum, Broad Spectrum e Isolado",
        summary: "Entenda as diferenças na composição de canabinoides e como cada espectro atua no organismo durante tratamentos terapêuticos.",
        content: `
            <p>Ao buscar tratamentos à base de cannabis medicinal, uma das primeiras dúvidas envolve os três tipos principais de extração disponíveis no mercado regulamentado.</p>
            <p><strong>Full Spectrum (Espectro Completo):</strong> Contém todos os compostos naturais da planta, incluindo CBD, terpenos, flavonoides e traços de THC (geralmente abaixo de 0,3%). Essa combinação favorece o chamado Efeito Comitiva.</p>
            <p><strong>Broad Spectrum (Amplo Espectro):</strong> Mantém os diversos canabinoides e terpenos da planta, mas passa por um processo adicional para remover completamente o THC.</p>
            <p><strong>CBD Isolado:</strong> É a forma mais pura do canabidiol (acima de 99%), sem nenhum outro composto da planta. Costuma ser indicado quando o paciente precisa de doses altas apenas de CBD ou tem sensibilidade a outros componentes.</p>
        `
    },
    {
        id: 2,
        featured: false,
        category: "cultura",
        catName: "História & Cultura",
        title: "O Cânhamo Industrial na História: Das Velas de Caravelas à Construção Civil",
        summary: "Muito antes da proibição no século XX, a fibra da cannabis foi uma das matérias-primas mais estratégicas da humanidade.",
        content: `
            <p>Durante séculos, o cânhamo (variedade da Cannabis sativa com baixíssimo teor de THC) foi essencial para a navegação marítima. Suas fibras resistentes à água salgada eram usadas na fabricação de cordas e velas de navios.</p>
            <p>Hoje, o cânhamo vive um renascimento global na indústria sustentável, sendo empregado na produção de tecidos duráveis, bioplásticos e até no <em>hempcrete</em> (concreto de cânhamo), um material de construção leve e isolante térmico.</p>
        `
    },
    {
        id: 3,
        featured: false,
        category: "reducao",
        catName: "Redução de Danos",
        title: "Combustão vs. Vaporização: O que dizem os estudos sobre redução de danos",
        summary: "Uma análise técnica sobre temperatura, liberação de toxinas e preservação de canabinoides nos diferentes métodos de inalação.",
        content: `
            <p>A queima (combustão) de qualquer matéria vegetal ocorre acima de 600°C, gerando fumaça rica em alcatrão, monóxido de carbono e substâncias irritantes para as vias respiratórias.</p>
            <p>Os vaporizadores de ervas secas operam por convecção ou condução em temperaturas controladas entre 160°C e 220°C. Nessa faixa, os canabinoides e terpenos evaporam sem queimar a matéria vegetal, reduzindo drasticamente a inalação de subprodutos tóxicos.</p>
        `
    },
    {
        id: 4,
        featured: false,
        category: "direito",
        catName: "Direito & Leis",
        title: "O que é o Habeas Corpus preventivo para cultivo medicinal?",
        summary: "Saiba como pacientes com laudo médico garantem na Justiça o direito de cultivar a própria planta para extração de óleo.",
        content: `
            <p>Devido ao alto custo dos medicamentos importados ou vendidos em farmácias, muitos pacientes recorrem ao Judiciário brasileiro por meio de um <strong>Habeas Corpus preventivo (salvo-conduto)</strong>.</p>
            <p>Para ingressar com o pedido, o paciente geralmente reúne prescrição médica, laudos que comprovem a necessidade do tratamento, orçamento demonstrando incapacidade financeira de comprar o óleo e certificados de cursos de cultivo e extração.</p>
        `
    }
];

// Elementos DOM
const ageGate = document.getElementById('age-gate');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const themeToggle = document.getElementById('theme-toggle');
const featuredContainer = document.getElementById('featured-post');
const articlesContainer = document.getElementById('articles-container');
const categoryTabs = document.querySelectorAll('.tab');
const searchBox = document.getElementById('search-box');

// Modal de leitura
const readerModal = document.getElementById('reader-modal');
const closeReader = document.getElementById('close-reader');
const readerMeta = document.getElementById('reader-meta');
const readerTitle = document.getElementById('reader-title');
const readerText = document.getElementById('reader-text');

let activeCategory = 'todos';

// 1. Verificação de Idade (+18)
if (sessionStorage.getItem('ageVerified') === 'true') {
    ageGate.classList.add('hidden');
}

btnYes.addEventListener('click', () => {
    sessionStorage.setItem('ageVerified', 'true');
    ageGate.classList.add('hidden');
});

btnNo.addEventListener('click', () => {
    window.location.href = 'https://google.com';
});

// 2. Alternar Tema (Claro / Escuro)
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
});

// 3. Calcular tempo de leitura
function getReadingTime(htmlContent) {
    const text = htmlContent.replace(/<[^>]*>/g, '');
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min de leitura`;
}

// 4. Renderizar Artigo em Destaque
function renderFeatured() {
    const featured = blogPosts.find(post => post.featured);
    if (!featured) return;

    featuredContainer.innerHTML = `
        <span class="tag">Destaque • ${featured.catName}</span>
        <h1>${featured.title}</h1>
        <p>${featured.summary}</p>
        <div>
            <button class="btn-primary" onclick="openArticle(${featured.id})">
                Ler matéria (${getReadingTime(featured.content)})
            </button>
        </div>
    `;
}

// 5. Renderizar Grade de Artigos
function renderArticles() {
    const query = searchBox.value.toLowerCase();
    articlesContainer.innerHTML = '';

    const filtered = blogPosts.filter(post => {
        const matchCat = activeCategory === 'todos' || post.category === activeCategory;
        const matchQuery = post.title.toLowerCase().includes(query) || 
                           post.summary.toLowerCase().includes(query);
        return matchCat && matchQuery;
    });

    if (filtered.length === 0) {
        articlesContainer.innerHTML = '<p>Nenhum artigo encontrado com esses filtros.</p>';
        return;
    }

    filtered.forEach(post => {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
            <div>
                <div class="card-meta">
                    <span class="tag">${post.catName}</span>
                    <span>${getReadingTime(post.content)}</span>
                </div>
                <h3>${post.title}</h3>
                <p>${post.summary}</p>
            </div>
            <button class="read-link" onclick="openArticle(${post.id})">Continuar lendo →</button>
        `;
        articlesContainer.appendChild(card);
    });
}

// 6. Filtros e Busca
categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeCategory = tab.dataset.cat;
        renderArticles();
    });
});

searchBox.addEventListener('input', renderArticles);

// 7. Abrir / Fechar Artigo Completo
function openArticle(id) {
    const post = blogPosts.find(p => p.id === id);
    if (!post) return;

    readerMeta.textContent = `${post.catName} • ${getReadingTime(post.content)}`;
    readerTitle.textContent = post.title;
    readerText.innerHTML = post.content;
    readerModal.classList.remove('hidden');
}

closeReader.addEventListener('click', () => readerModal.classList.add('hidden'));
readerModal.addEventListener('click', (e) => {
    if (e.target === readerModal) readerModal.classList.add('hidden');
});

// Inicialização
renderFeatured();
renderArticles();
