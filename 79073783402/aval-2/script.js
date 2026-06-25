// Exibe uma mensagem de boas-vindas quando a página carrega
window.onload = function() {
    document.getElementById("mensagem").innerHTML =
        "Bem-vindo ao nosso site!";
};

// Mostra a data e hora atuais
function mostrarDataHora() {
    const agora = new Date();

    document.getElementById("dataHora").innerHTML =
        "Data e hora atuais: " + agora.toLocaleString("pt-BR");
}