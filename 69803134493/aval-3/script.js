// script.js

function mostrarMensagem() {
    alert("Olá! Bem-vindo ao meu site.");
}

function mudarCor() {
    document.body.style.backgroundColor = "lightblue";
}

function mostrarHora() {
    const agora = new Date();
    document.getElementById("hora").innerHTML =
        "Hora atual: " + agora.toLocaleTimeString();
}