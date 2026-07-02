// Mensagem de boas-vindas
window.onload = function () {
    alert("Bem-vindo ao site sobre Neymar Jr!");
};

// Exibe a data e hora da última visita ao clicar no botão
function mostrarData() {
    const data = new Date();

    const opcoes = {
        dateStyle: "full",
        timeStyle: "medium"
    };

    document.getElementById("data").innerHTML =
        "Data e hora atual: " + data.toLocaleString("pt-BR", opcoes);
}