// Mensagem de boas-vindas
window.addEventListener("load", function () {
    alert("Bem-vindo à Step Shoes!");
});

// Seleciona todos os botões
const botoes = document.querySelectorAll("button");

// Adiciona um evento para cada botão
botoes.forEach(function(botao) {

    botao.addEventListener("click", function() {

        // Procura o título do produto
        const nomeProduto = this.parentElement.querySelector("h3").innerText;

        // Exibe uma mensagem
        alert("Você escolheu: " + nomeProduto);

        // Altera o botão
        this.innerText = "Adicionado!";
        this.style.backgroundColor = "green";
        this.disabled = true;

    });

});