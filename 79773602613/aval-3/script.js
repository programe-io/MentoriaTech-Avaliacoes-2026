
// Mensagem de boas-vindas
function boasVindas() {
    alert("Bem-vindo ao site da nossa escola!");
}

// Mostrar uma mensagem na página
function mostrarMensagem() {
    document.getElementById("mensagem").innerHTML =
        "Obrigado por visitar nosso site!";
}

// Mostrar a data atual
function mostrarData() {
    let data = new Date();

    document.getElementById("data").innerHTML =
        data.toLocaleDateString("pt-BR");
}
