document.addEventListener('DOMContentLoaded', () => {

    /* ===== SAUDAÇÃO ===== */
    const botao = document.getElementById('btn-interacao');
    const mensagem = document.getElementById('mensagem-retorno');

    botao.addEventListener('click', () => {
        const horaAtual = new Date().getHours();
        let saudacao;

        if (horaAtual >= 5 && horaAtual < 12) {
            saudacao = 'Bom dia! ☀️';
        } else if (horaAtual >= 12 && horaAtual < 18) {
            saudacao = 'Boa tarde! 🌤️';
        } else {
            saudacao = 'Boa noite! 🌙';
        }

        mensagem.textContent = `${saudacao} Obrigado por conferir meu portfólio. Bora codar! 🚀`;

        // Efeito de "pop" na mensagem
        mensagem.animate(
            [{ transform: 'scale(0.9)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }],
            { duration: 400, easing: 'ease-out' }
        );

        botao.disabled = true;
        botao.textContent = '✓ Mensagem enviada';
    });

    /* ===== MENU MOBILE ===== */
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.topbar nav');

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen);
    });

    // Fecha o menu ao clicar em um link
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });

    /* ===== REVEAL ON SCROLL ===== */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

});