// Aguarda todo o HTML da página carregar antes de executar o código
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Captura os elementos do HTML que vamos interagir
    const botao = document.getElementById('meuBotao');
    const card = document.querySelector('.card');

    // 2. Cria um efeito de clique no botão principal
    botao.addEventListener('click', () => {
        // Altera o texto do botão
        botao.textContent = "Logado com Sucesso! 🎉";
        botao.style.backgroundColor = "#10b981"; // Muda a cor para verde
        
        // Cria um novo parágrafo dinamicamente
        const mensagemSucesso = document.createElement('p');
        mensagemSucesso.innerText = "Parabéns! O JavaScript detectou seu clique e modificou a página em tempo real.";
        mensagemSucesso.style.color = "#10b981";
        mensagemSucesso.style.marginTop = "1rem";
        mensagemSucesso.style.fontWeight = "bold";
        
        // Evita que adicione várias mensagens se clicar mais de uma vez
        if (card.children.length < 4) {
            card.appendChild(mensagemSucesso);
        }
    });

});