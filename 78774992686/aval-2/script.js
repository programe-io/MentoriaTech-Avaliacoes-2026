document.addEventListener('DOMContentLoaded', () => {
    const forumForm = document.getElementById('forum-form');
    const postsContainer = document.getElementById('posts-container');

    // Posts iniciais para o fórum não iniciar vazio
    const initialPosts = [
        {
            title: "Reunião da alcatéia na antiga casa dos Hale",
            author: "Scott McCall",
            content: "Precisamos nos reunir hoje à noite após o treino de Lacrosse. Derek achou marcas estranhas na floresta. Alguém viu o Stiles?"
        },
        {
            title: "Cuidado com o jipe!",
            author: "Stiles Stilinski",
            content: "Se alguém quebrar o meu jipe de novo enquanto fugimos de criaturas sobrenaturais, eu mesmo vou morder vocês. Scott, estou chegando."
        }
    ];

    // Função para renderizar um post na tela
    function createPostElement(title, author, content) {
        const postCard = document.createElement('div');
        postCard.classList.add('post-card');

        postCard.innerHTML = `
            <h3>${title}</h3>
            <div class="post-meta">Postado por: <span>${author}</span></div>
            <p class="post-content">${content}</p>
        `;

        // Adiciona sempre o post mais recente no topo
        postsContainer.insertBefore(postCard, postsContainer.firstChild);
    }

    // Carregar posts iniciais
    initialPosts.forEach(post => {
        createPostElement(post.title, post.author, post.content);
    });

    // Evento de envio do formulário
    forumForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que a página recarregue

        // Captura os valores dos campos
        const authorInput = document.getElementById('user-name').value;
        const titleInput = document.getElementById('post-title').value;
        const contentInput = document.getElementById('post-content').value;

        // Cria o novo post
        createPostElement(titleInput, authorInput, contentInput);

        // Limpa o formulário após o envio
        forumForm.reset();
    });
});
