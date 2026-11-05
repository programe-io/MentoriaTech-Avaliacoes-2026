
// Aguarda o carregamento da página
document.addEventListener("DOMContentLoaded", function() {

    // Mensagem no console
    console.log("JavaScript conectado com sucesso!");

    // Seleciona o botão
    const botao = document.querySelector("button");

    // Adiciona uma ação ao botão
    if (botao) {
        botao.addEventListener("click", function() {
            alert("Olá! Seja bem-vindo ao meu site!");
        });
    }

});
