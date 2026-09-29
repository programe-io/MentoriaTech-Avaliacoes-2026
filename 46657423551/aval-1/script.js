document.addEventListener('DOMContentLoaded', () => {
    const botao = document.getElementById('btn-interacao');
    const mensagem = document.getElementById('mensagem-retorno');

    botao.addEventListener('click', () => {
        const horaAtual = new Date().getHours();
        let saudacao;

        if (horaAtual >= 5 && horaAtual < 12) {
            saudacao = '🌅 Bom dia!';
        } else if (horaAtual >= 12 && horaAtual < 18) {
            saudacao = '☀️ Boa tarde!';
        } else {
            saudacao = '🌙 Boa noite!';
        }

        mensagem.textContent = `${saudacao} Obrigado por conferir meu portfólio! Vamos codar juntos? 🚀`;
        mensagem.style.color = '#18bc9c';
        
        botao.disabled = true;
        botao.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
    });
});