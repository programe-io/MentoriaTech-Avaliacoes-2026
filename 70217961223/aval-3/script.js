// DADOS DOS ARTIGOS (MOCK)
const articles = [
    {
        id: 1,
        title: "Elden Ring: Dicas Essenciais de Sobrevivência",
        category: "pc",
        categoryLabel: "PC / Console",
        badgeColor: "badge-purple",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80",
        excerpt: "Guia definitivo para iniciantes e veteranos dominarem as Terras Intermédias com a build perfeita de Raquel.",
        date: "25 de Setembro",
        readTime: "6 min",
        content: `
            <h2>Como dominar as Terras Intermédias</h2>
            <p>Elden Ring é um jogo colossal que exige paciência, observação e um bom planejamento de atributos. Neste guia preparado pela Raquel, vamos abordar as melhores estratégias iniciais.</p>
            <h3>1. Escolha de Classe Inicial</h3>
            <p>Se você prefere combate à distância com alto dano de magia, o Astrólogo é uma excelente escolha. Para combate corpo a corpo puro, o Miserável oferece distribuição totalmente livre de pontos.</p>
            <h3>2. A Importância da Exploração</h3>
            <p>Não siga apenas a luz da Graça. As áreas secundárias contêm frascos de cura adicionais, materiais de upgrade de arma e cinzas de invocação essenciais para chefes difíceis.</p>
        `
    },
    {
        id: 2,
        title: "PS5 Pro: Vale a Pena o Upgrade?",
        category: "ps5",
        categoryLabel: "PS5",
        badgeColor: "badge-purple",
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80",
        excerpt: "Testamos a nova versão do console da Sony com Ray Tracing avançado e tecnologia PSSR.",
        date: "22 de Setembro",
        readTime: "4 min",
        content: `
            <h2>Análise de Desempenho e Gráficos</h2>
            <p>O PS5 Pro chegou com a promessa de entregar 60 FPS com gráficos na qualidade do modo Fidelidade. Mas será que a diferença justifica a atualização?</p>
            <p>Em nossos testes com jogos pesados, a tecnologia PSSR (upscaling por IA) mostrou resultados impressionantes, mantendo a nitidez sem perda acentuada de quadros por segundo.</p>
        `
    },
    {
        id: 3,
        title: "Os Melhores RPGs Indie de 2026",
        category: "switch",
        categoryLabel: "Switch / PC",
        badgeColor: "badge-purple",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
        excerpt: "Uma seleção especial feita por Raquel com jogos independentes imperdíveis deste ano.",
        date: "18 de Setembro",
        readTime: "8 min",
        content: `
            <h2>A Era Ouro dos Jogos Independentes</h2>
            <p>O mercado de jogos indie continua surpreendendo com narrativas emocionantes e mecânicas inovadoras que grandes estúdios muitas vezes hesitam em tentar.</p>
            <p>Confira a lista com mais de 5 títulos com pixel art deslumbrante e trilha sonora inesquecível selecionados a dedo neste artigo.</p>
        `
    },
    {
        id: 4,
        title: "Xbox Game Pass: Novidades do Mês",
        category: "xbox",
        categoryLabel: "Xbox",
        badgeColor: "badge-purple",
        image: "https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&w=600&q=80",
        excerpt: "Descubra quais títulos estão chegando ao catálogo no serviço por assinatura da Microsoft.",
        date: "15 de Setembro",
        readTime: "3 min",
        content: `
            <h2>Lançamentos Day One</h2>
            <p>Este mês o serviço conta com grandes estreias disponíveis desde o primeiro dia de lançamento, incluindo novos jogos de corrida e grandes aventuras cooperativas.</p>
        `
    }
];

// INICIALIZAR RENDERIZAÇÃO
document.addEventListener("DOMContentLoaded", () => {
    renderArticles(articles);
});

// FUNÇÃO PARA RENDERIZAR OS CARDS DOS ARTIGOS
function renderArticles(data) {
    const grid = document.getElementById("articlesGrid");
    grid.innerHTML = "";

    if (data.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Nenhum artigo encontrado.</p>`;
        return;
    }

    data.forEach(article => {
        const cardHTML = `
            <article class="card">
                <div class="card-img-wrap">
                    <img src="${article.image}" alt="${article.title}" class="card-img">
                </div>
                <div class="card-body">
                    <span class="badge ${article.badgeColor}">${article.categoryLabel}</span>
                    <h3 class="card-title">${article.title}</h3>
                    <p class="card-excerpt">${article.excerpt}</p>
                    <div class="card-footer">
                        <span><i class="fa-regular fa-clock"></i> ${article.readTime}</span>
                        <button class="btn-read" onclick="openModal(${article.id})">Ler Artigo <i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
            </article>
        `;
        grid.innerHTML += cardHTML;
    });
}

// FILTRAR POR CATEGORIA
function filterCategory(category, btnElement) {
    // Atualiza botões ativos
    document.querySelectorAll(".cat-btn").forEach(btn => btn.classList.remove("active"));
    btnElement.classList.add("active");

    if (category === "all") {
        renderArticles(articles);
    } else {
        const filtered = articles.filter(item => item.category === category);
        renderArticles(filtered);
    }
}

// BUSCA EM TEMPO REAL
function handleSearch() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filtered = articles.filter(article => 
        article.title.toLowerCase().includes(query) || 
        article.excerpt.toLowerCase().includes(query)
    );
    renderArticles(filtered);
}

// ABRIR MODAL
function openModal(articleId) {
    const article = articles.find(a => a.id === articleId);
    if (!article) return;

    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = `
        <span class="badge ${article.badgeColor} mb-2">${article.categoryLabel}</span>
        <h1 style="font-family: var(--font-heading); font-size: 2rem; margin-bottom: 15px;">${article.title}</h1>
        <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px; display: flex; gap: 15px;">
            <span><i class="fa-solid fa-user text-purple"></i> Por Raquel</span>
            <span><i class="fa-regular fa-calendar text-purple"></i> ${article.date}</span>
        </div>
        <img src="${article.image}" alt="${article.title}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 8px; margin-bottom: 20px;">
        <div style="line-height: 1.8; font-size: 0.95rem;">
            ${article.content}
        </div>
    `;

    document.getElementById("articleModal").classList.add("active");
}

// FECHAR MODAL
function closeModal() {
    document.getElementById("articleModal").classList.remove("active");
}

// FECHAR MODAL AO CLICAR FORA
window.onclick = function(event) {
    const modal = document.getElementById("articleModal");
    if (event.target === modal) {
        closeModal();
    }
};

// FORMULÁRIO DE NEWSLETTER
function handleSubscribe(event) {
    event.preventDefault();
    alert("Obrigado por se inscrever no blog da Raquel Gaming!");
    event.target.reset();
}