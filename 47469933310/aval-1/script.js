// Aguarda o documento HTML ser completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona os elementos do HTML pelo ID
    const botao = document.getElementById('btn-interacao');
    const mensagem = document.getElementById('mensagem-retorno');

    // Adiciona um evento de clique ao botão
    botao.addEventListener('click', () => {
        
        // Obter a hora atual do sistema
        const horaAtual = new Date().getHours();
        let saudacao = 'Olá!';

        // Define a saudação dinâmica com base no horário
        if (horaAtual >= 5 && horaAtual < 12) {
            saudacao = 'Bom dia!';
        } else if (horaAtual >= 12 && horaAtual < 18) {
            saudacao = 'Boa tarde!';
        } else {
            saudacao = 'Boa noite!';
        }

        // Exibe a mensagem formatada na tela
        mensagem.textContent = `${saudacao} Obrigado por conferir meu portfólio. Bora codar!`;
        mensagem.style.color = '#18bc9c';
        
        // Atualiza e desativa o botão após a interação
        botao.disabled = true;
        botao.textContent = 'Mensagem enviada!';
        botao.style.backgroundColor = '#95a5a6';
        botao.style.cursor = 'not-allowed';
        botao.style.transform = 'none';
    });
});