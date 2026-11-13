
// FUNÇÃO DE COMPRA DOS PRODUTOS
function comprar(produto) {
    alert(
        "🌸 Mundo dos Cachos 🌸\n\n" +
        "Você escolheu: " + produto +
        "\n\nEntre em contato conosco para finalizar sua compra!"
    );
}

// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    console.log("Bem-vindo ao Mundo dos Cachos!");
});

// EFEITO NOS BOTÕES
const botoes = document.querySelectorAll(".botao");

botoes.forEach(function(botao) {
    botao.addEventListener("mouseenter", function() {
        botao.style.transform = "scale(1.05)";
    });

    botao.addEventListener("mouseleave", function() {
        botao.style.transform = "scale(1)";
    });
});

// MENSAGEM DE NAVEGAÇÃO
const links = document.querySelectorAll("nav a");

links.forEach(function(link) {
    link.addEventListener("click", function() {
        console.log("Você acessou: " + link.textContent);
    });
});
