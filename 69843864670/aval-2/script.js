document.addEventListener('DOMContentLoaded', () => {
    
    // Menu de navegação mobile para os mistérios de Nunca Mais
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        // Alterna entre o emoji de bola de cristal e o xis gótico
        menuToggle.textContent = mainNav.classList.contains('active') ? '✕' : '🔮';
    });

    // Cliques sombrios no botão de curtir (coração preto vira coração partido/sangrento)
    const likeButtons = document.querySelectorAll('.like-btn');

    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const countSpan = button.querySelector('.like-count');
            let currentLikes = parseInt(countSpan.textContent);

            if (button.classList.contains('liked')) {
                button.classList.remove('liked');
                button.innerHTML = `🖤 <span class="like-count">${currentLikes - 1}</span>`;
            } else {
                button.classList.add('liked');
                button.innerHTML = `💔 <span class="like-count">${currentLikes + 1}</span>`;
            }
        });
    });

    // Fecha o menu de navegação ao clicar em alguma das opções
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.textContent = '🔮';
            }
        });
    });
});
