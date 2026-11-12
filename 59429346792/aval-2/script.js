document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sistema de Curtidas (Botão e Duplo Clique na Foto)
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const likeBtn = post.querySelector('.left-actions span:first-child');
        const postImg = post.querySelector('.post-image');
        const likesDisplay = post.querySelector('.post-likes');
        
        // Extrai o número inicial de curtidas do texto
        let likesCount = parseInt(likesDisplay.textContent.replace(/\D/g, '')) || 0;
        let isLiked = false;

        function toggleLike(forceLike = false) {
            if (!isLiked) {
                isLiked = true;
                likesCount++;
                likeBtn.textContent = '❤️';
                animarIcone(likeBtn);
            } else if (!forceLike) {
                isLiked = false;
                likesCount--;
                likeBtn.textContent = '🤍';
            }
            likesDisplay.textContent = `${likesCount.toLocaleString('pt-BR')} curtidas`;
        }

        // Clique no coração
        likeBtn.addEventListener('click', () => toggleLike(false));

        // Duplo clique na imagem (curte e mostra coração flutuante)
        postImg.addEventListener('dblclick', (e) => {
            toggleLike(true);
            mostrarCoracaoFlutuante(postImg);
        });

        // 2. Botão de Salvar Post (Bookmark)
        const saveBtn = post.querySelector('.post-actions > span');
        let isSaved = false;

        saveBtn.addEventListener('click', () => {
            isSaved = !isSaved;
            saveBtn.style.opacity = isSaved ? '1' : '0.5';
            saveBtn.textContent = isSaved ? '📌' : '🔖';
            animarIcone(saveBtn);
        });
    });

    // 3. Interação com Stories (Marca como visualizado)
    const stories = document.querySelectorAll('.story');

    stories.forEach(story => {
        story.addEventListener('click', () => {
            const ring = story.querySelector('.story-ring');
            const username = story.querySelector('span').textContent;
            
            // Muda a borda gradiente para cinza (story já visto)
            ring.style.background = '#dbdbdb';
            alert(`Visualizando o story de @${username}`);
        });
    });

    // Funções Auxiliares de Animação
    function animarIcone(elemento) {
        elemento.style.transform = 'scale(1.3)';
        setTimeout(() => {
            elemento.style.transform = 'scale(1)';
        }, 150);
    }

    function mostrarCoracaoFlutuante(container) {
        // Garante que o pai tenha posição relativa para centralizar o coração
        container.parentElement.style.position = 'relative';

        const heart = document.createElement('div');
        heart.textContent = '❤️';
        Object.assign(heart.style, {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(0)',
            fontSize: '80px',
            pointerEvents: 'none',
            transition: 'transform 0.3s ease, opacity 0.4s ease',
            opacity: '0.9',
            zIndex: '10'
        });

        container.parentElement.appendChild(heart);

        // Anima a entrada e saída do coração
        requestAnimationFrame(() => {
            heart.style.transform = 'translate(-50%, -50%) scale(1.2)';
        });

        setTimeout(() => {
            heart.style.opacity = '0';
            heart.style.transform = 'translate(-50%, -50%) scale(0.8)';
        }, 500);

        setTimeout(() => {
            heart.remove();
        }, 900);
    }
});
