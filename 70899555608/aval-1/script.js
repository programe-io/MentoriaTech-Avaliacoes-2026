
// Mensagem de boas-vindas
function boasVindas() {
    alert("Olá! Seja bem-vindo ao meu site!");
}

// Alterar o texto da página
function mudarTexto() {
    document.getElementById("titulo").innerHTML =
        "Texto alterado com JavaScript!";
}

// Mudar a cor de fundo
function mudarCor() {
    document.body.style.backgroundColor = "#dbeafe";
}

// Mostrar data e hora
function mostrarData() {
    let agora = new Date();

    document.getElementById("data").innerHTML =
        agora.toLocaleString("pt-BR");
}

// Contador de cliques
let contador = 0;

function contarCliques() {
    contador++;

    document.getElementById("contador").innerHTML =
        "Cliques: " + contador;
}
