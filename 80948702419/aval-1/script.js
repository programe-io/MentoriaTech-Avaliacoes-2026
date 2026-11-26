const posts = [
    {
        id: 1,
        title: "A Era do Fogo e o Pecado Original de Gwyn",
        category: "lore",
        categoryLabel: "Lore & História",
        date: "14 de Outubro • Por Solaire de Astora",
        excerpt: "Quando a Primeira Chama começou a enfraquecer, o Senhor da Luz Solar tomou uma decisão desesperada que condenou a humanidade à Maldição dos Mortos-Vivos.",
        content: `
            <p>No princípio, o mundo era informe e envolto em névoa. Uma terra de penhascos cinzentos, arquiárvores e dragões eternos. Mas então surgiu o Fogo, e com o Fogo veio a disparidade: calor e frio, vida e morte, luz e trevas.</p>
            <p>Temendo o fim da Era do Fogo e a ascensão dos humanos — portadores da Alma Sombria —, Gwyn sacrificou a si mesmo para acender novamente a Primeira Chama. Ao fazer isso, ele selou a natureza sombria da humanidade com o Darksign, iniciando o ciclo interminável de sacrifício e decadência que testemunhamos em Lordran.</p>
        `
    },
    {
        id: 2,
        title: "Como Derrotar Ornstein e Smough sem Perder a Sanidade",
        category: "bosses",
        categoryLabel: "Chefes",
        date: "22 de Outubro • Por Cavaleiro Oscar",
        excerpt: "A dupla guardiã de Anor Londo representa o maior teste de paciência e posicionamento de todo o primeiro jogo. Veja como controlar a arena.",
        content: `
            <p>O segredo para vencer Ornstein e Smough não é o dano bruto, mas o controle espacial. Utilize os pilares destruídos da catedral de Anor Londo para separar a investida rápida de Ornstein do martelo pesado de Smough.</p>
            <p><strong>Dica crucial:</strong> Nunca trave a mira (lock-on) o tempo inteiro. Mantenha ambos no seu campo de visão e ataque apenas quando tiver certeza de onde está o segundo chefe. Se quiser o Anel de Leão, derrote Smough primeiro.</p>
        `
    },
    {
        id: 3,
        title: "Build de Força Pura: Dominando a Zweihander",
        category: "guias",
        categoryLabel: "Guias & Builds",
        date: "02 de Novembro • Por Siegward de Catarina",
        excerpt: "Disponível logo nos primeiros minutos no cemitério de Firelink, esta espada ultra-grande é capaz de atordoar até os maiores inimigos.",
        content: `
            <p>A Zweihander exige 24 de Força (ou apenas 16 se empunhada com as duas mãos) e 10 de Destreza. Seu ataque pesado (R2) esmaga o equilíbrio (poise) da maioria dos inimigos, derrubando-os no chão instantaneamente.</p>
            <p>Combine-a com o Anel de Havel e o Anel de Favor e Proteção para conseguir carregar armaduras pesadas mantendo a rolagem média (mid-roll).</p>
        `
    }
];

const postsContainer = document.getElementById("posts-container");
const filterButtons = document.querySelectorAll(".filter-btn");
const modal = document.getElementById("article-modal");
const closeModalBtn = document.getElementById("close-modal");
const bonfireBtn = document.getElementById("bonfire-btn");
const bonfireBanner = document.getElementById("bonfire-banner");

// Renderizar posts na tela
function renderPosts(filter = "todos") {
    postsContainer.innerHTML = "";

    const filteredPosts = filter === "todos" 
        ? posts 
        : posts.filter(post => post.category === filter);

    filteredPosts.forEach(post => {
        const article = document.createElement("article");
        article.classList.add("post-card");

        article.innerHTML = `
            <span class="badge">${post.categoryLabel}</span>
            <h2>${post.title}</h2>
            <p class="post-date">${post.date}</p>
            <p>${post.excerpt}</p>
            <button class="read-more-btn" onclick="openArticle(${post.id})">Ler Registro Completo</button>
        `;

        postsContainer.appendChild(article);
    });
}

// Abrir artigo no modal
function openArticle(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;

    document.getElementById("modal-category").textContent = post.categoryLabel;
    document.getElementById("modal-title").textContent = post.title;
    document.getElementById("modal-date").textContent = post.date;
    document.getElementById("modal-body").innerHTML = post.content;

    modal.classList.remove("hidden");
}

// Fechar modal
closeModalBtn.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
});

// Filtro de categorias
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderPosts(btn.dataset.category);
    });
});

// Efeito "Bonfire Lit"
bonfireBtn.addEventListener("click", () => {
    bonfireBanner.classList.remove("hidden");
    // Reinicia a animação
    bonfireBanner.style.animation = 'none';
    bonfireBanner.offsetHeight; 
    bonfireBanner.style.animation = null;

    setTimeout(() => {
        bonfireBanner.classList.add("hidden");
    }, 3000);
});

// Inicializar blog
renderPosts();
