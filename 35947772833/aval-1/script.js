// Função chamada ao clicar no botão
function mostrarMensagem() {
    alert("Olá! Você clicou no botão.");
}

// Muda a cor do título ao clicar nele
document.querySelector("h1").addEventListener("click", function() {
    this.style.color = "blue";
});