// Scroll suave nos links do menu
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Efeito de clique nos posts
document.querySelectorAll('.post').forEach(post => {
    post.addEventListener('click', function() {
        const titulo = this.querySelector('h2').textContent;
        console.log('Post clicado:', titulo);
    });
});

console.log('✅ Blog de Games carregado com sucesso!');