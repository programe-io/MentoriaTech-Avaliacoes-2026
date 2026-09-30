document.addEventListener('DOMContentLoaded', () => {
    const botao = document.getElementById('btn-interacao');
    const mensagem = document.getElementById('mensagem-retorno');

    // Saudação dinâmica ao carregar a página
    function obterSaudacao() {
        const horaAtual = new Date().getHours();
        if (horaAtual >= 5 && horaAtual < 12) return 'Bom dia!';
        if (horaAtual >= 12 && horaAtual < 18) return 'Boa tarde!';
        return 'Boa noite!';
    }

    // Ação do botão
    botao.addEventListener('click', () => {
        const saudacao = obterSaudacao();
        mensagem.textContent = `${saudacao} Obrigado por conferir meu portfólio. Bora codar! 🚀`;
        mensagem.style.color = '#18bc9c';
        
        // Adiciona classe visual de desativação
        botao.disabled = true;
        botao.classList.add('desativado');
    });
});