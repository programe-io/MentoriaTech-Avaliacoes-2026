// Banco de dados simulado (usa o localStorage do navegador para não sumir ao atualizar)
const postsIniciais = [
    {
        id: 1,
        titulo: "Primeiros passos com JavaScript",
        autor: "Aline Silva",
        data: "03/06/2026",
        conteudo: "JavaScript é uma das linguagens mais populares do mundo. Com ela, você pode criar desde pequenos efeitos em páginas web até sistemas complexos de inteligência artificial."
    },
    {
        id: 2,
        titulo: "Por que o CSS Grid é incrível?",
        autor: "Lucas Souza",
        data: "01/06/2026",
        conteudo: "O CSS Grid Layout veio para revolucionar a forma como criamos layouts na web. Ele permite alinhar elementos em colunas e linhas de forma extremamente simples e responsiva."
    }
];

// Inicializa os posts no LocalStorage se estiver vazio
if (!localStorage.getItem('posts')) {
    localStorage.setItem('posts', JSON.stringify(postsIniciais));
}

// Elementos do DOM
const containerPosts = document.getElementById('container-posts');
const formPost = document.getElementById('form-post');
const btnTema = document.getElementById('btn-tema');

// --- FUNÇÃO: Renderizar os posts na tela ---
function renderizarPosts() {
    const posts = JSON.parse(localStorage.getItem('posts'));
    containerPosts.innerHTML = ''; // Limpa a tela antes de renderizar

    posts.forEach(post => {
        const artigo = document.createElement('article');
        artigo.classList.add('post');
        
        artigo.innerHTML = `
            <h2>${post.titulo}</h2>
            <small>Por <strong>${post.autor}</strong> em ${post.data}</small>
            <p>${post.conteudo.substring(0, 150)}...</p>
            <button onclick="verPostCompleto(${post.id})">Ler mais</button>
            <hr>
        `;
        containerPosts.appendChild(artigo);
    });
}

// --- FUNÇÃO: Criar um novo post ---
if (formPost) {
    formPost.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede a página de recarregar

        const titulo = document.getElementById('titulo').value;
        const autor = document.getElementById('autor').value;
        const conteudo = document.getElementById('conteudo').value;
        const dataAtual = new Date().toLocaleDateString('pt-BR');

        const novoPost = {
            id: Date.now(), // Gera um ID único baseado no tempo
            titulo,
            autor,
            data: dataAtual,
            conteudo
        };

        const postsAtuais = JSON.parse(localStorage.getItem('posts'));
        postsAtuais.unshift(novoPost); // Adiciona o novo post no início da lista

        localStorage.setItem('posts', JSON.stringify(postsAtuais));
        
        formPost.reset(); // Limpa o formulário
        renderizarPosts(); // Atualiza a tela
    });
}

// --- FUNÇÃO: Ver post completo (Alerta simples para demonstração) ---
function verPostCompleto(id) {
    const posts = JSON.parse(localStorage.getItem('posts'));
    const post = posts.find(p => p.id === id);
    
    if (post) {
        alert(`📌 ${post.titulo}\n✍️ Por: ${post.autor} - ${post.data}\n\n${post.conteudo}`);
    }
}

// --- FUNÇÃO: Alternar Tema (Dark Mode) ---
btnTema.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Executa ao carregar a página
renderizarPosts();