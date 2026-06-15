document.getElementById('postForm').addEventListener('submit', function(e) {
    // Impede a página de recarregar ao enviar o formulário
    e.preventDefault();

    // Captura os valores digitados nos campos
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
    
    // Obtém a data atual do sistema formatada por extenso
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const today = new Date().toLocaleDateString('pt-BR', options);

    // Cria o elemento HTML do novo post
    const newPost = document.createElement('article');
    newPost.className = 'post-card';
    
    // Insere o conteúdo dinamicamente com a assinatura da Maria Eduarda
    newPost.innerHTML = `
        <h2 class="post-title">${titleInput.value}</h2>
        <div class="post-meta">Postado em ${today} por Maria Eduarda</div>
        <p class="post-content">${contentInput.value}</p>
    `;

    // Seleciona o container e coloca o novo post no topo da lista
    const container = document.getElementById('postsContainer');
    container.insertBefore(newPost, container.firstChild);

    // Limpa os campos do formulário para o próximo post
    titleInput.value = '';
    contentInput.value = '';
});
