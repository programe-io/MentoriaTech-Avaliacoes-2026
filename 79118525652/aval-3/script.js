// ==========================================
// 1. CONTROLE DE TEMA (MODO ESCURO / CLARO)
// ==========================================
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
}

themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});


// ==========================================
// 2. CONTEÚDO COLORIDO DO PERFIL
// ==========================================
const instaPosts = [
    {
        tag: "Fundamentos",
        title: "1. O que é a Internet e a Web",
        excerpt: "Um sistema global de redes interligadas por protocolos padronizados.",
        likes: "❤️ 45.2mil",
        comments: "💬 1.280"
    },
    {
        tag: "História",
        title: "2. A Origem: Da ARPANET",
        excerpt: "Como a necessidade de comunicação na Guerra Fria deu origem à rede.",
        likes: "❤️ 38.9mil",
        comments: "💬 954"
    },
    {
        tag: "Infraestrutura",
        title: "3. Cabos Submarinos",
        excerpt: "Fibras ópticas gigantes cruzando o oceano para conectar continentes.",
        likes: "❤️ 61.4mil",
        comments: "💬 2.410"
    },
    {
        tag: "World Wide Web",
        title: "4. Tim Berners-Lee",
        excerpt: "A criação do HTML, HTTP e URLs no CERN em prol da humanidade.",
        likes: "❤️ 52.1mil",
        comments: "💬 1.830"
    },
    {
        tag: "Arquitetura",
        title: "5. Cliente x Servidor",
        excerpt: "A requisição perfeita entre o seu navegador e os computadores globais.",
        likes: "❤️ 41.7mil",
        comments: "💬 740"
    },
    {
        tag: "Conceitos",
        title: "6. Internet x Web",
        excerpt: "A internet é a estrada de ferro; a web é o trem de passageiros!",
        likes: "❤️ 78.3mil",
        comments: "💬 3.120"
    }
];

const postsContainer = document.getElementById('posts-container');

function renderInstaGrid(postsArray) {
    postsContainer.innerHTML = "";

    postsArray.forEach(post => {
        const article = document.createElement('article');
        article.classList.add('insta-card');
        
        article.innerHTML = `
            <div>
                <span class="insta-card-tag">${post.tag}</span>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
            </div>
            <div class="insta-card-footer">
                <span>${post.likes}</span>
                <span>${post.comments}</span>
            </div>
        `;
        
        postsContainer.appendChild(article);
    });
}

// Renderiza o grid ao carregar a página
renderInstaGrid(instaPosts);