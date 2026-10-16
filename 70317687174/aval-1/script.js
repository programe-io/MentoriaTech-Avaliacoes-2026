
/* Mensagem no console */
console.log("Olá, mundo!");

// Função para mostrar uma mensagem
function mostrarMensagem() {
    alert("Bem-vindo ao meu site!");
}

// Alterar o título da página
function mudarTitulo() {
    document.querySelector("h1").textContent = "Título alterado!";
}

// Contador de cliques
let cliques = 0;

function contarCliques() {
    cliques++;
    document.getElementById("contador").textContent =
        "Cliques: " + cliques;
}
