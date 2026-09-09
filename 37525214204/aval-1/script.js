const botao = document.getElementById("botao");
const texto = document.getElementById("texto");

botao.addEventListener("click", function() {
    texto.textContent = "Você clicou no botão! 🎉";
    document.body.style.backgroundColor = "#87CEEB";
    botao.textContent = "Clicado!";
});
