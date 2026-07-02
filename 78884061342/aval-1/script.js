document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Animação do Menu Mobile (Toggle) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        // Alterna a classe active no menu e no botão
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });


    // --- 2. Animação de Surgimento (Scroll Reveal) ---
    const posts = document.querySelectorAll('.post-card');

    // Configuração do observador
    const observerOptions = {
        root: null, // usa a viewport do navegador
        threshold: 0.1, // engatilha quando 10% do card estiver visível
        rootMargin: "0px 0px -50px 0px" // ativa um pouco antes de entrar totalmente
    };

    const postObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove a classe 'hidden' e adiciona a classe 'show'
                entry.target.classList.remove('hidden');
                entry.target.classList.add('show');
                // Deixa de observar o post atual, já que ele já apareceu
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Diz ao observador para ficar de olho em cada um dos posts
    posts.forEach(post => {
        postObserver.observe(post);
    });
});document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Animação do Menu Mobile (Toggle) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        // Alterna a classe active no menu e no botão
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });


    // --- 2. Animação de Surgimento (Scroll Reveal) ---
    const posts = document.querySelectorAll('.post-card');

    // Configuração do observador
    const observerOptions = {
        root: null, // usa a viewport do navegador
        threshold: 0.1, // engatilha quando 10% do card estiver visível
        rootMargin: "0px 0px -50px 0px" // ativa um pouco antes de entrar totalmente
    };

    const postObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove a classe 'hidden' e adiciona a classe 'show'
                entry.target.classList.remove('hidden');
                entry.target.classList.add('show');
                // Deixa de observar o post atual, já que ele já apareceu
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Diz ao observador para ficar de olho em cada um dos posts
    posts.forEach(post => {
        postObserver.observe(post);
    });
});cc