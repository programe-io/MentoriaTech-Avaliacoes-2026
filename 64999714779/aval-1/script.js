```javascript
document.addEventListener('DOMContentLoaded', () => {

    const botao = document.getElementById('btn-interacao');
    const mensagem = document.getElementById('mensagem-retorno');

    botao.addEventListener('click', () => {

        const horaAtual = new Date().getHours();
        let saudacao;

        if (horaAtual >= 5 && horaAtual < 12) {
            saudacao = 'Bom dia!';
        } else if (horaAtual >= 12 && horaAtual < 18) {
            saudacao = 'Boa tarde!';
        } else {
            saudacao = 'Boa noite!';
        }

        mensagem.textContent =
            `${saudacao} Obrigado por visitar meu portfólio! 🚀`;

        botao.textContent = 'Olá enviado ✓';
        botao.disabled = true;
    });

});
```
