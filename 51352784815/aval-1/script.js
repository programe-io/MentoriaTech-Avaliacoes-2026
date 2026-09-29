// Aguarda o documento HTML ser completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona os elementos do HTML pelo ID
    const botao = document.getElementById('btn-interacao');
    const mensagem = document.getElementById('mensagem-retorno');

    // Adiciona um evento de clique ao botão
    botao.addEventListener('click', () => {
        
        // Descobre a hora atual
        const horaAtual = new Date().getHours();
        let saudacao = 'Olá!';

        // Define a saudação com base no horário
        if (horaAtual >= 5 && horaAtual < 12) {
            saudacao = 'Bom dia, explorador!';
        } else if (horaAtual >= 12 && horaAtual < 18) {
            saudacao = 'Boa tarde, explorador!';
        } else {
            saudacao = 'Boa noite, cuidado com a Cuca e a Mula sem Cabeça!';
        }

        // Exibe a mensagem temática e muda a cor do texto
        mensagem.textContent = `${saudacao} Você acabou de entrar no reino do folclore nacional. Proteja a natureza e respeite as lendas!`;
        mensagem.style.color = '#2d6a4f';
        
        // Desativa o botão após o clique para evitar repetições
        botao.disabled = true;
        botao.style.backgroundColor = '#95a5a6';
        botao.style.cursor = 'not-allowed';
    });
});