// Seleciona os elementos da página pelos IDs
const botao = document.getElementById('meuBotao');
const mensagem = document.getElementById('mensagem');
const card = document.querySelector('.card');

// Adiciona um evento de clique ao botão
botao.addEventListener('click', () => {
    // Altera o texto do parágrafo
    mensagem.textContent = "Parabéns! O JavaScript funcionou e alterou o conteúdo e o estilo deste cartão.";
    
    // Altera a cor do texto para destacar
    mensagem.style.color = "#28a745";
    
    // Dá um leve destaque na borda do cartão
    card.style.border = "2px solid #28a745";
});