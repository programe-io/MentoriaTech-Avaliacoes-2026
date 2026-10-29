// Array contendo os dados das postagens (Simulando um banco de dados)
const postsData = [
    {
        id: 1,
        title: "Primeiros passos com HTML e CSS",
        date: "28 de Outubro de 2026",
        author: "Alex Silva",
        excerpt: "Aprenda a estruturar e estilizar suas primeiras páginas web do absoluto zero com este guia prático e direto.",
        link: "#"
    },
    {
        id: 2,
        title: "Dominando o JavaScript moderno",
        date: "24 de Outubro de 2026",
        author: "Maria Souza",
        excerpt: "Entenda recursos essenciais como Arrow Functions, Promises e manipulação avançada de DOM para criar sites interativos.",
        link: "#"
    },
    {
        id: 3,
        title: "Por que design responsivo importa?",
        date: "15 de Outubro de 2026",
        author: "Lucas Lima",
        excerpt: "Descubra como criar layouts adaptáveis que funcionam perfeitamente em telas de celulares, tablets e computadores.",
        link: "#"
    }
];

// Função responsável por renderizar os posts na tela
function renderPosts() {
    const container = document.getElementById('posts-container');
    
    // Limpa a mensagem de carregamento antes de inserir os posts
    container.innerHTML = '';

    // Passa por cada objeto de postagem e gera o HTML estruturado
    postsData.forEach(post => {
        const postElement = document.createElement('article');
        postElement.classList.add('post-card');

        postElement.innerHTML = `
            <div class="post-content">
                <div class="post-meta">Por <strong>${post.author}</strong> em ${post.date}</div>
                <h2 class="post-title">${post.title}</h2>
                <p class="post-excerpt">${post.excerpt}</p>
                <a href="${post.link}" class="read-more">Ler postagem &rarr;</a>
            </div>
        `;

        container.appendChild(postElement);
    });
}

// Executa a função assim que o documento HTML estiver totalmente carregado
document.addEventListener('DOMContentLoaded', renderPosts);
