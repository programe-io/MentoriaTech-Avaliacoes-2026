const postsIniciais = [
    {
        titulo: "Bem-vindo ao meu novo Blog!",
        data: "08 de Junho de 2026",
        conteudo: "Este é o primeiro post do meu blog pessoal desenvolvido com HTML, CSS e JavaScript puro. Aqui pretendo compartilhar minha jornada, projetos e insights sobre tecnologia."
    },
    {
        titulo: "Por que aprender desenvolvimento web?",
        data: "07 de Junho de 2026",
        conteudo: "A web é uma das plataformas mais democráticas do mundo. Saber construir sites e aplicações do zero te dá o poder de transformar ideias em realidade visível para qualquer pessoa no planeta."
    }
];

const postsContainer = document.getElementById('posts-container');
const postForm = document.getElementById('post-form');

function criarPostElemento(titulo, data, conteudo) {
    const artigo = document.createElement('article');
    artigo.classList.add('post');

    artigo.innerHTML = `
        <h3>${titulo}</h3>
        <div class="meta">Postado em ${data}</div>
        <p>${conteudo}</p>
    `;

    return artigo;
}

function carregarPosts() {
    postsIniciais.forEach(post => {
        const novoPost = criarPostElemento(post.titulo, post.data, post.conteudo);
        postsContainer.appendChild(novoPost);
    });
}

function obterDataAtual() {
    const opcoes = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('pt-BR', opcoes);
}

postForm.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const tituloInput = document.getElementById('post-title').value;
    const conteudoInput = document.getElementById('post-content').value;
    const dataAtual = obterDataAtual();

    const novoPost = criarPostElemento(tituloInput, dataAtual, conteudoInput);

    postsContainer.insertBefore(novoPost, postsContainer.firstChild);

    postForm.reset();
});

document.addEventListener('DOMContentLoaded', carregarPosts);
