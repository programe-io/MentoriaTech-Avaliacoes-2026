// ==========================================
// 1. CONTROLE DE TEMA (MODO ESCURO / CLARO)
// ==========================================
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeToggleBtn.textContent = '🕷️';
    }
}

themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggleBtn.textContent = '🕷️';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.textContent = '🕸️';
    }
});


// ==========================================
// 2. DADOS DO MINI FEED (CONTEÚDO TÉCNICO)
// ==========================================
const miniFeedPosts = [
    {
        tag: "Fundamentos",
        title: "1. O que é a Internet e a Web",
        time: "Há 2 horas",
        excerpt: "Um sistema global de redes interligadas por protocolos padronizados. Dispositivos trocando dados em milissegundos pelo mundo afora.",
        link: "#"
    },
    {
        tag: "História",
        title: "2. A Origem: Da ARPANET aos Dias Atuais",
        time: "Há 5 horas",
        excerpt: "Como a necessidade de comunicação segura na Guerra Fria deu origem à infraestrutura descentralizada que usamos hoje.",
        link: "#"
    },
    {
        tag: "Infraestrutura",
        title: "3. Cabos Submarinos e Servidores",
        time: "Ontem",
        excerpt: "Esqueça a nuvem mágica! A maior parte do tráfego internacional de dados passa por gigantescos cabos de fibra óptica no fundo dos oceanos.",
        link: "#"
    },
    {
        tag: "World Wide Web",
        title: "4. O Papel de Tim Berners-Lee",
        time: "Há 2 dias",
        excerpt: "Criado no CERN, as tecnologias HTML, HTTP e URLs mudaram para sempre a navegação ao conectar documentos por hiperlinks.",
        link: "#"
    },
    {
        tag: "Arquitetura",
        title: "5. Cliente x Servidor na Prática",
        time: "Há 3 dias",
        excerpt: "O cliente (seu navegador) envia uma requisição, o servidor processa e devolve os dados. A dança perfeita da web moderna.",
        link: "#"
    },
    {
        tag: "Conceitos",
        title: "6. Internet x Web: Qual a Diferença?",
        time: "Há 4 dias",
        excerpt: "Alerta importante: internet é a infraestrutura física de rede, enquanto a web é o sistema de páginas e documentos que roda sobre ela.",
        link: "#"
    }
];

const postsContainer = document.getElementById('posts-container');

function renderMiniFeed(postsArray) {
    postsContainer.innerHTML = "";

    postsArray.forEach(post => {
        const article = document.createElement('article');
        article.classList.add('feed-post');
        
        article.innerHTML = `
            <div class="post-avatar-small">🕸️</div>
            <div class="post-content-area">
                <div class="post-header-meta">
                    <span class="post-author">Alan Parker</span>
                    <span class="post-time">${post.time}</span>
                </div>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <div class="post-footer-actions">
                    <span class="post-tag-badge">${post.tag}</span>
                    <a href="${post.link}" class="read-link">Ler arquivo &rarr;</a>
                </div>
            </div>
        `;
        
        postsContainer.appendChild(article);
    });
}

// Renderiza o Mini Feed ao carregar
renderMiniFeed(miniFeedPosts);