
// Mensagem de boas-vindas
window.onload = function() {
    alert("Bem-vindo ao meu site!");
};

// Contador de cliques
let contador = 0;

function contarCliques() {
    contador++;

    document.getElementById("contador").innerText =
        "Cliques: " + contador;
}

// Modo escuro
function modoEscuro() {
    document.body.classList.toggle("escuro");
}

// Mostrar data e hora
function mostrarHorario() {
    let agora = new Date();

    document.getElementById("horario").innerText =
        agora.toLocaleString("pt-BR");
}

// Atualizar relógio
setInterval(mostrarHorario, 1000);
mostrarHorario();
