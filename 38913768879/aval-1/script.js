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

        // Define a saudação com base no horário
        if (horaAtual >= 5 && horaAtual < 12) {
            saudacao = 'Bom dia!';
        } else if (horaAtual >= 12 && horaAtual < 18) {
            saudacao = 'Boa tarde!';
        } else {
            saudacao = 'Boa noite!';
        }

        // Exibe a mensagem temática de artes marciais na tela
        mensagem.textContent = `🥊 ${saudacao} Sua aula experimental gratuita foi pré-agendada com sucesso! Oss! Nossa equipe entrará em contato para confirmar o horário do seu treino.`;
        mensagem.style.color = '#e74c3c';
        
        // Desativa o botão após o clique para evitar repetições
        botao.disabled = true;
        botao.innerText = 'Aula Agendada!';
        botao.style.backgroundColor = '#555555';
        botao.style.cursor = 'not-allowed';
    });
});