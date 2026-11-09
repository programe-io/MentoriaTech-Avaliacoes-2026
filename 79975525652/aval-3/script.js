document.addEventListener('DOMContentLoaded', () => {
    
    const gridItems = document.querySelectorAll('.grid-item');
    const modal = document.getElementById('postModal');
    const closeModal = document.querySelector('.close-modal');
    
    const modalTitle = document.getElementById('modal-post-title');
    const modalCaption = document.getElementById('modal-post-caption');
    const btnLike = document.getElementById('btn-insta-like');
    const likeNumber = document.getElementById('like-number');

    // Ao clicar em uma publicação do grid, abre o modal do Instagram
    gridItems.forEach(item => {
        item.addEventListener('click', () => {
            const previewTitle = item.querySelector('.post-preview h3').textContent;
            const fullCaption = item.querySelector('.hidden-caption').innerHTML;
            
            // Configura os textos no modal
            modalTitle.textContent = previewTitle;
            modalCaption.innerHTML = fullCaption;
            
            // Reseta o botão de curtida do modal com um valor aleatório realista
            btnLike.classList.remove('liked');
            btnLike.textContent = '🤍';
            likeNumber.textContent = Math.floor(Math.random() * (2500 - 800) + 800);
            
            // Exibe o modal
            modal.classList.remove('hidden');
        });
    });

    // Fechar modal no botão X
    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Fechar modal se clicar fora do conteúdo
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // Sistema de Curtida (Coração) dentro do Modal
    btnLike.addEventListener('click', () => {
        let currentLikes = parseInt(likeNumber.textContent);
        
        if (btnLike.classList.contains('liked')) {
            btnLike.classList.remove('liked');
            btnLike.textContent = '🤍';
            likeNumber.textContent = currentLikes - 1;
        } else {
            btnLike.classList.add('liked');
            btnLike.textContent = '❤️';
            likeNumber.textContent = currentLikes + 1;
        }
    });
});
