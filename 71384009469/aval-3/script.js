// MENSAGEM DE BOAS-VINDAS
function boasVindas() {
    alert("Seja bem-vindo ao meu projeto!");
}

// ALTERAR TEXTO
function alterarTexto() {
    document.getElementById("titulo").innerHTML =
        "Aprendendo JavaScript!";
}

// MUDAR COR DE FUNDO
function mudarCor() {
    document.body.style.backgroundColor = "#e0f2f1";
}

// MOSTRAR DATA ATUAL
function mostrarData() {
    let data = new Date();

    alert("Data atual: " + data.toLocaleDateString("pt-BR"));
}

// SOMAR DOIS NÚMEROS
function somar() {
    let numero1 = 10;
    let numero2 = 20;

    let resultado = numero1 + numero2;

    alert("O resultado da soma é: " + resultado);
}

// EXECUTAR MENSAGEM AO ABRIR
console.log("Projeto de Desenvolvimento de Sistemas iniciado!");