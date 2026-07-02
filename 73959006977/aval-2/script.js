// Botão principal
const btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
    document.querySelector(".games").scrollIntoView({
        behavior: "smooth"
    });
});

// Botões Comprar
const botoes = document.querySelectorAll(".buy");

botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        alert("Obrigado por comprar na Bembem! 🎮");
    });
});