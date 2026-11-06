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
// 2. CONTEÚDO DOS POSTS (BASEADO NO SEU SUMÁRIO)
// ==========================================
const postsData = [
    {
        tag: "Fundamentos",
        title: "1. O que é a Internet e a Web",
        date: "Arquivos do Aranha #01",
        excerpt: "Um sistema global de redes interligadas por protocolos. Descubra como os dados circulam pelo mundo mais rápido que um balanço de teia.",
        link: "#"
    },
    {
        tag: "História",
        title: "2. A Origem: Da ARPANET aos Dias Atuais",
        date: "Arquivos do Aranha #02",
        excerpt: "Como a necessidade de comunicação segura na Guerra Fria deu origem à tecnologia que hoje sustenta o nosso dia a dia.",
        link: "#"
    },
    {
        tag: "Infraestrutura",
        title: "3. Cabos Submarinos e Servidores",
        date: "Arquivos do Aranha #03",
        excerpt: "Esqueça a nuvem abstrata! A internet depende de cabos de fibra óptica gigantescos cruzando o fundo dos oceanos.",
        link: "#"
    },
    {
        tag: "World Wide Web",
        title: "4. O Papel de Tim Berners-Lee",
        date: "Arquivos do Aranha #04",
        excerpt: "Como o CERN e a criação das tecnologias HTML, HTTP e URLs mudaram para sempre a forma como acessamos informações.",
        link: "#"
    },
    {
        tag: "Arquitetura",
        title: "5. Cliente x Servidor na Prática",
        date: "Arquivos do Aranha #05",
        excerpt: "Entenda a dança perfeita entre o seu navegador (cliente) e os computadores potentes (servidores) que guardam os sites.",
        link: "#"
    },
    {
        tag: "Conceitos",
        title: "6. Internet x Web: Qual a Diferença?",
        date: "Arquivos do Aranha #06",
        excerpt: "Alerta de spoiler: elas não são a mesma coisa! A internet é a estrada de ferro; a web é o trem de passageiros.",
        link: "#"
    }
];

const postsContainer = document.getElementById('posts-container');

function renderPosts(postsArray) {
    postsContainer.innerHTML = "";

    postsArray.forEach(post => {
        const article = document.createElement('article');
        article.classList.add('post-card');
        
        article.innerHTML = `
            <div>
                <span class="post-tag">${post.tag}</span>
                <h3>${post.title}</h3>
                <p class="post-date">${post.date}</p>
                <p class="post-excerpt">${post.excerpt}</p>
            </div>
            <a href="${post.link}" class="read-more">Acessar Arquivo &rarr;</a>
        `;
        
        postsContainer.appendChild(article);
    });
}

// Renderiza os posts ao carregar
renderPosts(postsData);