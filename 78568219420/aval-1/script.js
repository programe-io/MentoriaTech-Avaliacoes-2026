nst botao = document.getElementById("botao");
const texto = document.getElementById("texto");

botao.addEventListener("click", function () {
    texto.textContent = "Você clicou no botão! 🎉";

    document.body.style.background = "#064e3b";

    botao.textContent = "Funcionou!";
});