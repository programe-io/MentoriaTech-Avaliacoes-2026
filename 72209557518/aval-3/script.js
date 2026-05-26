document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const likeButtons = document.querySelectorAll('.like-btn');

    // Abre e fecha o menu mobile
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fecha o menu ao selecionar um item
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Interatividade da Rede Social: Sistema de curtidas dinâmico
    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const span = button.querySelector('span');
            let currentLikes = parseInt(span.textContent);
            
            if (button.classList.contains('liked')) {
                button.classList.remove('liked');
                span.textContent = currentLikes - 1;
                button.style.color = '';
            } else {
                button.classList.add('liked');
                span.textContent = currentLikes + 1;
                button.style.color = '#ef4444'; // Altera para vermelho ao curtir
            }
        });
    });
});
