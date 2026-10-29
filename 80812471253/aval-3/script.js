document.addEventListener('DOMContentLoaded', () => {
    // 1. Estado dos Posts (Curtidas, Salvos e Comentários)
    const postsState = {
        post1: {
            likes: 1432,
            isLiked: false,
            isSaved: false,
            comments: [
                { user: 'carlos_dev', text: 'Lugar incrível! 🔥' },
                { user: 'marina_photo', text: 'A luz dessa foto ficou perfeita!' }
            ]
        },
        post2: {
            likes: 856,
            isLiked: false,
            isSaved: false,
            comments: [
                { user: 'ana.silva', text: 'Boa sorte no projeto! 💻' }
            ]
        }
    };

    // 2. Funcionalidade de Curtir (Like)
    const heartButtons = document.querySelectorAll('.post-actions-left .action-icon:first-child');
    
    heartButtons.forEach((heartBtn, index) => {
        const postId = `post${index + 1}`;
        
        heartBtn.addEventListener('click', () => {
            const post = postsState[postId];
            post.isLiked = !post.isLiked;

            // Altera visual do ícone
            heartBtn.textContent = post.isLiked ? '❤️' : '🤍';
            
            // Atualiza o contador no DOM
            post.likes += post.isLiked ? 1 : -1;
            const likesCountElement = heartBtn.closest('.post-card').querySelector('.post-likes');
            if (likesCountElement) {
                likesCountElement.textContent = `${post.likes.toLocaleString('pt-BR')} curtidas`;
            }
        });
    });

    // 3. Funcionalidade de Salvar Post (Bookmark)
    const saveButtons = document.querySelectorAll('.post-actions > .action-icon');
    
    saveButtons.forEach((saveBtn,