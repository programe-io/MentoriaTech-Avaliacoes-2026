// Mostrar mensagem
function mostrarMensagem() {
    document.getElementById("mensagem").innerHTML =
    "Obrigado por visitar meu blog pessoal! 😄";
}

// Alternar tema
function mudarTema() {
    if (document.body.style.backgroundColor === "black") {
        document.body.style.backgroundColor = "#f4f4f4";
        document.body.style.color = "black";
    } else {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
    }
}

// Contador
let cliques = 0;

function contarCliques() {
    cliques++;
    document.getElementById("contador").innerHTML =
    "Cliques: " + cliques;
}