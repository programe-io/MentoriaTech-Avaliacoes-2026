
window.addEventListener("load", function() {
    console.log("Bem-vindo à MOBILE TECH!");
});

// Efeito nos botões
const botoes = document.querySelectorAll(".botao");

botoes.forEach(function(botao) {
    botao.addEventListener("click", function() {
        console.log("Obrigado por visitar a MOBILE TECH!");
    });
});

// Efeito ao rolar a página
const secoes = document.querySelectorAll("section");

window.addEventListener("scroll", function() {
    secoes.forEach(function(secao) {
        const posicao = secao.getBoundingClientRect().top;

        if (posicao < window.innerHeight - 100) {
            secao.style.opacity = "1";
        }
    });
});
