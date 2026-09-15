// Mensagem ao carregar o blog
document.addEventListener("DOMContentLoaded", function() {
    console.log("Blog carregado com sucesso!");
});


// Botões "Leia mais"
const botoes = document.querySelectorAll(".botao");

botoes.forEach(function(botao) {

    botao.addEventListener("click", function(event) {

        event.preventDefault();

        alert("Obrigado por visitar o blog! Em breve você poderá ler a publicação completa.");

    });

});


// Mensagem de contato
const contato = document.querySelector("#contato");

contato.addEventListener("click", function() {
    alert("Entre em contato conosco pelo e-mail: contato@meublog.com");
});