v// Seleciona a div
const caixa = document.querySelector(".caixa");

// Altera o conteúdo
caixa.textContent = "Olá, Mundo!";

// Adiciona um evento de clique
caixa.addEventListener("click", () => {
    caixa.style.backgroundColor = "red";
    caixa.style.color = "white";
    caixa.textContent = "Você clicou!";
});