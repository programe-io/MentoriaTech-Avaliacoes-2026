// Exibe uma mensagem quando a página carrega
window.onload = function() {
    alert("Bem-vindo à minha página!");
};

// Mostra uma mensagem ao clicar no botão
function mostrarMensagem() {
    document.getElementById("mensagem").innerHTML =
        "Obrigado por visitar minha página!";
}