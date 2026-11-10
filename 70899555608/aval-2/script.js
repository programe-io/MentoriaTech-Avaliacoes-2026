
// MENSAGEM DE BOAS-VINDAS
function mensagem() {
    alert("Bem-vindo ao meu site!");
}

// MUDAR A COR DO FUNDO
function mudarCor() {
    document.body.style.backgroundColor = "#dbeafe";
}

// MODO ESCURO
function modoEscuro() {
    document.body.classList.toggle("escuro");
}

// ALTERAR TÍTULO
function mudarTitulo() {
    document.querySelector("h1").textContent =
        "Meu site com JavaScript!";
}

// CONTADOR DE CLIQUES
let cliques = 0;

function contarCliques() {
    cliques++;

    document.getElementById("contador").textContent =
        "Total de cliques: " + cliques;
}

// MOSTRAR DATA E HORA
function mostrarData() {
    let data = new Date();

    document.getElementById("data").textContent =
        data.toLocaleString("pt-BR");
}

// VALIDAR FORMULÁRIO
function enviarFormulario() {
    let nome = document.getElementById("nome").value;

    if (nome.trim() === "") {
        alert("Digite seu nome!");
    } else {
        alert("Olá, " + nome + "! Cadastro realizado!");
    }
}
