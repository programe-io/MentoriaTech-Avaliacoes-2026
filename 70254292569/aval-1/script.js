// Mensagem de boas-vindas
window.addEventListener("load", function() {
    alert("💜 Bem-vindo(a) à nossa página de cuidados com cachos!");
});

// Botão de informações
const botao = document.querySelector(".botao");

if (botao) {
    botao.addEventListener("click", function() {
        console.log("Cliente interessado no creme para cachos!");
    });
}

// Efeito de animação nos benefícios
const beneficios = document.querySelector(".beneficios");

if (beneficios) {
    beneficios.addEventListener("mouseenter", function() {
        beneficios.style.transform = "scale(1.03)";
        beneficios.style.transition = "0.3s";
    });

    beneficios.addEventListener("mouseleave", function() {
        beneficios.style.transform = "scale(1)";
    });
}

// Mensagem no console
console.log("Site de creme para cabelos cacheados car