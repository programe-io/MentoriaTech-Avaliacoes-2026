document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DO BOTÃO DE CURTIDAS (LIKE) ---
    const likeButtons = document.querySelectorAll('.btn-like');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const countSpan = button.querySelector('.like-count');
            let currentLikes = parseInt(countSpan.textContent);
            
            // Verifica se o usuário já curtiu
            if (!button.classList.contains('liked')) {
                currentLikes++;
                countSpan.textContent = currentLikes;
                button.classList.add('liked');
                button.style.borderColor = '#ffd700';
                button.style.background = 'rgba(255, 215, 0, 0.1)';
            } else {
                currentLikes--;
                countSpan.textContent = currentLikes;
                button.classList.remove('liked');
                button.style.borderColor = '#444';
                button.style.background = 'none';
            }
        });
    });

    // --- LÓGICA DA SEÇÃO DE COMENTÁRIOS ---
    const commentForm = document.getElementById('comment-form');
    const commentsContainer = document.getElementById('comments-container');

    // Adiciona alguns comentários iniciais fictícios
    const defaultComments = [
        { name: "Thiago Silva", text: "O melhor que temos! Ousadia e alegria sempre! 👑" },
        { name: "Bruna M.", text: "Texto incrível sobre a trajetória dele. Sou fã demais!" }
    ];

    function renderComment(name, text) {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        
        commentDiv.innerHTML = `
            <h4>${name}</h4>
            <p>${text}</p>
        `;
        
        // Coloca o comentário no topo da lista
        commentsContainer.prepend(commentDiv);
    }

    // Renderiza os comentários padrão ao carregar
    defaultComments.forEach(c => renderComment(c.name, c.text));

    // Ouvinte para envio de novos comentários
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que a página recarregue

        const usernameInput = document.getElementById('username');
        const commentTextInput = document.getElementById('comment-text');

        const name = usernameInput.value.trim();
        const text = commentTextInput.value.trim();

        if (name && text) {
            renderComment(name, text);
            
            // Limpa o formulário
            usernameInput.value = '';
            commentTextInput.value = '';
        }
    });
});