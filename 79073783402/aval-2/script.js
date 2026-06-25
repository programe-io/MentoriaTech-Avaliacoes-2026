// Mensagem de boas-vindas ao abrir a página
window.onload = function() {
    alert("Bem-vindo ao meu site!");
};

// Função para mostrar uma mensagem
function mostrarMensagem() {
    document.getElementById("mensagem").innerHTML =
        "Obrigado por visitar o site!";
}