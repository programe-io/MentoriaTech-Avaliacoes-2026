document.addEventListener('DOMContentLoaded', () => {
    // Alternar destaque no menu de navegação
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.style.color = '');
            this.style.color = '#ff4d6d';
        });
    });

    // Interatividade nos botões "Continuar Lendo"
    const readButtons = document.querySelectorAll('.btn-read');
    readButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const articleTitle = e.target.parentElement.querySelector('h2').innerText;
            alert(`Você será redirecionado para a leitura de: "${articleTitle}"`);
        });
    });

    // Animação simples de rolagem suave ao clicar nos links do menu
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});