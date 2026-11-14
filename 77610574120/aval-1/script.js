javascript
// Seleciona os elementos do formulário e do container de posts
const postForm = document.getElementById('post-form');
const postTitleInput = document.getElementById('post-title');
const postContentInput = document.getElementById('post-content');
const postsContainer = document.getElementById('posts-container');

// Adiciona evento de envio ao formulário
postForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que a página recarregue

    const title = postTitleInput.value.trim();
    const content = postContentInput.value.trim();

    if (title && content) {
        createPost(title, content);
        
        // Limpa os campos do formulário
        postTitleInput.value = '';
        postContentInput.value = '';
    }
});

// Função para criar e inserir uma nova postagem no DOM
function createPost(title, content) {
    const article = document.createElement('article');
    article.classList.add('post');

    const currentDate = new Date().toLocaleDateString('pt-BR');

    article.innerHTML = `
        <h3>${escapeHTML(title)}</h3>
        <span class="date">Publicado em: ${currentDate}</span>
        <p>${escapeHTML(content)}</p>
    `;

    // Adiciona o novo post no topo da lista
    postsContainer.prepend(article);
}

// Função auxiliar simples para evitar problemas com caracteres HTML (segurança básica)
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}