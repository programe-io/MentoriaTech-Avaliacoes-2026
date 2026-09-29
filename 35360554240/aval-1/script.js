document.addEventListener('DOMContentLoaded', () => {
    const botao = document.getElementById('btn-interacao');
    const btnReiniciar = document.getElementById('btn-reiniciar');
    const mensagem = document.getElementById('mensagem-retorno');

    // Saudação com base no horário
    botao.addEventListener('click', () => {
        const horaAtual = new Date().getHours();
        let saudacao = 'Olá!';
        let emoji = '👋';

        if (horaAtual >= 5 && horaAtual < 12) {
            saudacao = 'Bom dia!';
            emoji = '☀️';
        } else if (horaAtual >= 12 && horaAtual < 18) {
            saudacao = 'Boa tarde!';
            emoji = '🌤️';
        } else {
            saudacao = 'Boa noite!';
            emoji = '🌙';
        }

        mensagem.textContent = `${saudacao} ${emoji} Obrigado por conferir meu portfólio! Estou à disposição para conversarmos. Bora codar! 🚀`;
        mensagem.style.color = '#18bc9c';
        mensagem.style.backgroundColor = '#e8f8f3';

        botao.disabled = true;
        botao.textContent = 'Já disse! ✅';
    });

    // Reiniciar interação
    btnReiniciar.addEventListener('click', () => {
        mensagem.textContent = '';
        mensagem.style.backgroundColor = 'transparent';
        botao.disabled = false;
        botao.textContent = 'Diga Olá! 👋';
    });

    // Rolagem suave nos links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const alvo = document.querySelector(link.getAttribute('href'));
            alvo.scrollIntoView({ behavior: 'smooth' });
        });
    });
});