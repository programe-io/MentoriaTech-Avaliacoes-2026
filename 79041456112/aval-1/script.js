// Aguarda o documento carregar completamente
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Seleciona os elementos que vamos manipular
    const botao = document.querySelector("button");
    const cartao = document.querySelector(".cartao");
    const titulo = document.querySelector("h1");

    // 2. Adiciona um "ouvinte de evento" para o clique
    botao.addEventListener("click", function() {
        
        // Muda o texto do título
        titulo.innerText = "Você clicou no botão! 🎉";

        // Muda a cor de fundo do cartão aleatoriamente
        const cores = ["#ffeb3b", "#8bc34a", "#ff5722", "#e91e63"];
        const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
        
        cartao.style.backgroundColor = corAleatoria;

        // Exibe um alerta no navegador
        console.log("O botão foi acionado com sucesso!");
    });
});