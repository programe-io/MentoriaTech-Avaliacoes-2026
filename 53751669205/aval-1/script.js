// Aguarda o carregamento do documento
document.addEventListener('DOMContentLoaded', () => {
    
    const blogForm = document.getElementById('blog-form');
    const postsContainer = document.getElementById('posts-container');

    // Escuta o envio do formulário de novas histórias
    blogForm.addEventListener('submit', function(event) {
        // Impede que a página recarregue ao enviar o formulário
        event.preventDefault();

        // Captura os dados inseridos pelo utilizador
        const category = document.getElementById('post-category').value;
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;

        // Cria o elemento html do novo artigo
        const newPost = document.createElement('article');
        newPost.className = 'post-card';

        // Define a classe correta da etiqueta de acordo com a categoria selecionada
        let badgeClass = 'badge';
        let categoryName = '';

        if (category === 'historia') {
            badgeClass += ' badge-historia';
            categoryName = 'História';
        } else if (category === 'premio') {
            badgeClass += ' badge-premio';
            categoryName = 'Prémio';
        } else if (category === 'jogador') {
            badgeClass += ' badge-jogador';
            categoryName = 'Jogador';
        }

        // Constrói a estrutura interna do novo post usando as variáveis coletadas
        newPost.innerHTML = `
            <div class="post-meta">
                <span class="${badgeClass}">${categoryName}</span>
                <span class="post-date">Publicado Agora mesmo</span>
            </div>
            <h3>${title}</h3>
            <p>${content}</p>
        `;

        // Insere o novo card de história no topo do feed (logo após o título da secção)
        // O container.children[1] garante que fica abaixo do título "Histórias e Crônicas"
        postsContainer.insertBefore(newPost, postsContainer.children[1]);

        // Limpa os campos de texto do formulário para o próximo uso
        blogForm.reset();
    });
});