
// Efeito de boas-vindas
window.addEventListener("load", function() {
    console.log("Bem-vindo ao site E SP!");
});

// Botão de apresentação
const botao = document.querySelector(".botao");

if (botao) {
    botao.addEventListener("click", function() {
        console.log("Conheça o perfume E SP!");
    });
}

// Animação ao rolar a página
window.addEventListener("scroll", function() {
    const secoes = document.querySelectorAll("section");

    secoes.forEach(function(secao) {
        const posicao = secao.getBoundingClientRect().top;

        if (posicao < window.innerHeight - 100) {
            secao.style.opacity = "1";
            secao.style.transform = "translateY(0)";
        }
    });
});
