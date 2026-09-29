const botao = document.getElementById('btn-interacao');
const mensagem = document.getElementById('mensagem-retorno');
const ano = document.getElementById('ano');

if (ano) ano.textContent = new Date().getFullYear();

if (botao && mensagem) {
    botao.addEventListener('click', () => {
        const hora = new Date().getHours();
        let saudacao = 'Boa noite!';

        if (hora >= 5 && hora < 12) saudacao = 'Bom dia!';
        else if (hora >= 12 && hora < 18) saudacao = 'Boa tarde!';

        mensagem.textContent = `${saudacao} Obrigado por visitar meu portfólio. Bora codar!`;
        mensagem.classList.add('ativo');
        botao.disabled = true;
    });
}