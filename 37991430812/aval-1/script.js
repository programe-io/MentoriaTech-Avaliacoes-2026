// Aguarda o documento HTML ser completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona os elementos do HTML pelo ID
    const botao = document.getElementById('btn-interacao');
    const mensagem = document.getElementById('mensagem-retorno');

    // Adiciona um evento de "clique" ao botão
    botao.addEventListener('click', () => {
        
        // Descobre a hora atual
        const horaAtual = new Date().getHours();
        let saudacao = 'Partiu treinar!';

        // Define a saudação com base no horário do treino
        if (horaAtual >= 5 && horaAtual < 12) {
            saudacao = 'Bom dia! Hora do treino matinal e foco na preparação física.';
        } else if (horaAtual >= 12 && horaAtual < 18) {
            saudacao = 'Boa tarde! Hora do treino tático e trabalho com bola.';
        } else {
            saudacao = 'Boa noite! Hora do descanso, hidratação e recuperação muscular.';
        }

        // Exibe a mensagem na tela e muda a cor do texto
        mensagem.textContent = `${saudacao} Mantenha a disciplina para alcançar o topo!`;
        mensagem.style.color = '#2d6a4f';
        
        // Desativa o botão após o clique para evitar repetições
        botao.disabled = true;
        botao.style.backgroundColor = '#95a5a6';
        botao.style.cursor = 'not-allowed';
    });
});