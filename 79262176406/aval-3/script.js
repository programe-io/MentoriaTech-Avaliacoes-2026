
// Contador de cliques
let contador = 0;

function contarCliques() {
    contador++;

    document.getElementById("resultado").innerHTML =
        "Você clicou " + contador + " vezes!";
}

// Mostrar data e hora
function mostrarData() {
    let data = new Date();

    document.getElementById("data").innerHTML =
        data.toLocaleString("pt-BR");
}

// Mudar a cor do título
function mudarTitulo() {
    document.getElementById("titulo").style.color = "red";
}
