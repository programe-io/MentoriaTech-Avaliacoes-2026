document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Menu Interativo Hamburguer (Mobile)
    const menuToggle = document.getElementById('menuToggle');
    const sideNav = document.getElementById('sideNav');

    if (menuToggle && sideNav) {
        menuToggle.addEventListener('click', () => {
            sideNav.classList.toggle('active');
            
            // Alterna o ícone entre barras e fechar
            const icon = menuToggle.querySelector('i');
            if (sideNav.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
    }

    // 2. Sistema Dinâmico de Curtidas nos Botões Responsivos
    const likeButtons = document.querySelectorAll('.btn-like');

    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const likeCountSpan = button.querySelector('.like-count');
            let currentLikes = parseInt(likeCountSpan.textContent);

            button.classList.toggle('liked');

            if (button.classList.contains('liked')) {
                likeCountSpan.textContent = currentLikes + 1;
            } else {
                likeCountSpan.textContent = currentLikes - 1;
            }
        });
    });

    // 3. Interação do Botão de Comentários (Simulação)
    const commentButtons = document.querySelectorAll('.btn-comment');
    commentButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Caixa de comentários expandida! (Simulação)');
        });
    });
});
