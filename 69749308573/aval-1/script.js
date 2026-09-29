// Aguarda o carregamento completo do documento HTML
document.addEventListener('DOMContentLoaded', () => {

// Seleciona os elementos da página
const botao = document.getElementById('btn-interacao');
const mensagem = document.getElementById('mensagem-retorno');


// Verifica se os elementos existem
if (!botao || !mensagem) {
    return;
}


// Evento executado quando o botão é clicado
botao.addEventListener('click', () => {

    // Obtém a hora atual
    const horaAtual = new Date().getHours();

    let saudacao;


    // Define a saudação de acordo com o horário
    if (horaAtual >= 5 && horaAtual < 12) {

        saudacao = 'Bom dia! ☀️';

    } else if (horaAtual >= 12 && horaAtual < 18) {

        saudacao = 'Boa tarde! 🌤️';

    } else {

        saudacao = 'Boa noite! 🌙';

    }


    // Exibe a mensagem
    mensagem.textContent =
        `${saudacao} Obrigado por conferir meu portfólio. Bora codar! 🚀`;


    // Define a aparência da mensagem
    mensagem.style.color = '#18bc9c';
    mensagem.style.fontWeight = 'bold';
    mensagem.style.opacity = '0';


    // Pequena animação de entrada
    setTimeout(() => {

        mensagem.style.transition =
            'opacity 0.5s ease';

        mensagem.style.opacity = '1';

    }, 50);


    // Altera o botão
    botao.textContent =
        'Olá recebido! ✓';

    botao.disabled = true;

    botao.style.background =
        '#95a5a6';

    botao.style.cursor =
        'not-allowed';


    // Aguarda 4 segundos
    setTimeout(() => {

        // Limpa a mensagem
        mensagem.style.opacity = '0';

        setTimeout(() => {
            mensagem.textContent = '';
        }, 500);


        // Reativa o botão
        botao.disabled = false;

        botao.textContent =
            'Diga Olá!';

        botao.style.background =
            'linear-gradient(135deg, #3498db, #2980b9)';

        botao.style.cursor =
            'pointer';

    }, 4000);

});


});