// Exibe uma mensagem quando o botão é clicado
function mostrarMensagem() {
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = "Olá! Você clicou no botão. 🎉";
    mensagem.style.color = "green";
    mensagem.style.fontWeight = "bold";
}

// Mostra uma mensagem no console quando a página termina de carregar
window.onload = function () {
    console.log("Página carregada com sucesso!");
};