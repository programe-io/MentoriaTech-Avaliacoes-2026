// Mostra uma mensagem ao clicar no botão
function mostrarMensagem() {
    alert("Olá! Seu site está funcionando! 🎉");
}

// Adiciona o evento ao botão
const botao = document.querySelector("#botao");

if (botao) {
    botao.addEventListener("click", mostrarMensagem);
}
