document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('comment-form');
    const commentsContainer = document.getElementById('comments-container');

    // Escuta o evento de envio do formulário
    commentForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        // Pega os valores digitados pelo usuário
        const nameInput = document.getElementById('user-name').value;
        const messageInput = document.getElementById('user-message').value;

        // Cria o elemento de bloco do comentário
        const commentBox = document.createElement('div');
        commentBox.classList.add('comment-box');

        // Cria o título com o nome do jogador
        const commenterName = document.createElement('h4');
        commenterName.textContent = nameInput;

        // Cria o parágrafo com a mensagem
        const commenterMessage = document.createElement('p');
        commenterMessage.textContent = messageInput;

        // Monta o comentário dentro do bloco correspondente
        commentBox.appendChild(commenterName);
        commentBox.appendChild(commenterMessage);

        // Adiciona o comentário no topo da lista de comentários
        commentsContainer.insertBefore(commentBox, commentsContainer.firstChild);

        // Limpa o formulário após o envio
        commentForm.reset();
    });
});
