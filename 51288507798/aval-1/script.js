// Aguarda o documento HTML ser completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona os elementos do HTML pelo ID
    const botao = document.getElementById('btn-interacao');
    const mensagem = document.getElementById('mensagem-retorno');

    // Adiciona um evento de "clique" ao botão
    botao.addEventListener('click', () => {
        
        // Descobre a hora atual
        const horaAtual = new Date().getHours();
        let saudacao = 'Olá!';
        let recomendacao = '';

        // Define a saudação e a dica com base no horário
        if (horaAtual >= 5 && horaAtual < 12) {
            saudacao = 'Bom dia!';
            recomendacao = 'Para começar bem o dia, que tal ouvir um Indie Folk relaxante ou uma Bossa Nova?';
        } else if (horaAtual >= 12 && horaAtual < 18) {
            saudacao = 'Boa tarde!';
            recomendacao = 'Mantenha a energia em alta! Recomendamos uma playlist de Lo-Fi Hip Hop para focar ou Pop Rock para animar.';
        } else {
            saudacao = 'Boa noite!';
            recomendacao = 'Hora de relaxar (ou agitar a noite). Que tal um Synthwave retrô ou um Jazz contemporâneo?';
        }

        // Exibe a mensagem na tela e muda a cor do texto para o ciano destaque
        mensagem.textContent = `${saudacao} ${recomendacao}`;
        mensagem.style.color = '#66fcf1';
        
        // Desativa o botão após o clique
        botao.disabled = true;
        botao.style.backgroundColor = '#333';
        botao.style.color = '#666';
        botao.style.cursor = 'not-allowed';
    });
});