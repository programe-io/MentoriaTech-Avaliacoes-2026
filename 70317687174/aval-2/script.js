
console.log("Olá, mundo!");

function mostrarMensagem() {
    alert("Bem-vindo ao meu site!");
}

function mudarTitulo() {
    document.querySelector("h1").textContent = "Título alterado!";
}

let cliques = 0;

function contarCliques() {
    cliques++;

    document.getElementById("contador").textContent =
        "Cliques: " + cliques;
}
