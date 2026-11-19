
// MENSAGEM DE BOAS-VINDAS
window.onload = function() {
    alert("Olá! Seja bem-vindo ao blog pessoal do Rhuan! ⚽");
};

// BOTÃO DE INTERAÇÃO
function mensagem() {
    alert("Obrigado por visitar meu blog! Meu nome é Rhuan, tenho 15 anos e adoro jogar futebol!");
}

// MUDAR A COR DO FUNDO
function mudarCor() {
    document.body.style.backgroundColor = "#dbeafe";
}

// MOSTRAR E ESCONDER CURIOSIDADES
function mostrarCuriosidades() {
    const curiosidades = document.getElementById("curiosidades");

    if (curiosidades.style.display === "none") {
        curiosidades.style.display = "block";
    } else {
        curiosidades.style.display = "none";
    }
}

// MOSTRAR A DATA ATUAL
function mostrarData() {
    const hoje = new Date();

    const data = hoje.toLocaleDateString("pt-BR");

    document.getElementById("data").innerHTML =
        "Hoje é: " + data;
}
