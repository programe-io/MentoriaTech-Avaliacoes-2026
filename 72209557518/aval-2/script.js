document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Abre e fecha o menu mobile ao clicar no botão hambúrguer
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fecha o menu móvel ao clicar em qualquer item de link interno
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Atualiza o estado da classe visual ativa do menu
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        });
    });
});
