
// Mensagem inicial
alert("Bem-vindo ao mundo do JavaScript!");

// Função para mudar o texto
function mudarTexto() {
    document.getElementById("mensagem").innerHTML =
    "JavaScript deixa os sites mais interativos! 🚀";
}

// Função para mudar a cor
function mudarCor() {
    document.body.style.backgroundColor = "#243b55";
}

// Mostrar data e hora
function mostrarData() {
    let data = new Date();

    document.getElementById("data").innerHTML =
    data.toLocaleString("pt-BR");
}
