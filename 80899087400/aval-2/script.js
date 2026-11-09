
// Mensagem de boas-vindas
function boasVindas() {
    alert("Olá! Seja bem-vindo ao meu site!");
}

// Alterar o texto da página
function mudarTexto() {
    document.getElementById("mensagem").innerHTML =
        "Você clicou no botão! Muito bem!";
}

// Mudar a cor de fundo
function mudarCor() {
    document.body.style.background =
        "linear-gradient(135deg, #000000, #6a1b9a)";
}

// Mostrar a data atual
function mostrarData() {
    let data = new Date();

    alert("Data atual: " + data.toLocaleDateString("pt-BR"));
}
