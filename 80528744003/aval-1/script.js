// Seleciona os elementos do DOM
const postForm = document.getElementById('postForm');
const postsContainer = document.getElementById('postsContainer');
const titleInput = document.getElementById('titleInput');
const contentInput = document.getElementById('contentInput');

// Escuta o evento de envio (submit) do formulário
postForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede a página de recarregar

    // Pega os valores digitados pelo usuário
    const title = titleInput.value;
    const content = contentInput.value;
    
    // Obtém a data atual formatada
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date().toLocaleDateString('pt-BR', options);

    // Cria a estrutura HTML do novo post de forma dinâmica
    const article = document.createElement('article');
    article.classList.add('post-card');

    article.innerHTML = `
        <h3>${title}</h3>
        <p class="post-date">Publicado em ${today}</p>
        <p class="post-content">${content}</p>
    `;

    // Insere o novo post no topo do container de posts
    postsContainer.insertBefore(article, postsContainer.firstChild);

    // Limpa os campos do formulário após publicar
    postForm.reset();
});
