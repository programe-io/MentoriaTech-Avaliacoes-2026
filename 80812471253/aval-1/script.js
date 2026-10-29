document.addEventListener('DOMContentLoaded', () => {
    // 1. Navegação Suave (Smooth Scroll) para os links do menu
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // 2. Animação de entrada suave para os posts ao rolar a página (Scroll Reveal)
    const posts = document.querySelectorAll('.post');
    
    const observerOptions = {
        root: null,
        threshold: 0.15
    };

    const postObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    posts.forEach(post => {
        post.style.opacity = '0';
        post.style.transform = 'translateY(20px)';
        post.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        postObserver.observe(post);
    });

    // 3. Efeito Interativo nos botões "Continuar Lendo"
    const readButtons = document.querySelectorAll('.btn-read');
    
    readButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const postTitle = button.closest('.post-content').querySelector('.post-title').innerText;
            alert(`Lendo matéria: "${postTitle}"`);
        });
    });
});