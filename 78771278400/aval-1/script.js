/ Seleciona o botão e a tag main (conteúdo do blog)
const botao = document.querySelector('button');
const conteudoPrincipal = document.querySelector('main');

// Adiciona um evento de clique no botão
botao.addEventListener('click', () => {
    // Cria um novo artigo (postagem)
    const novoPost = document.createElement('article');
    novoPost.innerHTML = `
        <h2>Novo Post no Blog</h2>
        <p>Este conteúdo foi inserido dinamicamente usando JavaScript!</p>
    `;