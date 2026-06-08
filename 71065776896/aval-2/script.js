// Exibe uma mensagem quando o botão é clicado
function mostrarMensagem() {
    alert("Olá! Você clicou no botão.");
}

// Atualiza o texto de um elemento
function mudarTexto() {
    document.getElementById("texto").innerHTML =
        "O texto foi alterado com JavaScript!";
}

// Mostra a hora atual
function mostrarHora() {
    const agora = new Date();
    document.getElementById("hora").innerHTML =
        agora.toLocaleTimeString();
}