
// Mensagem de boas-vindas
window.onload = function() {
    alert("Bem-vindo ao Tech Blog!");
};

// Botão de curtir
function curtir() {
    alert("Você curtiu esta publicação! ❤️");
}

// Mostrar data atual
function mostrarData() {
    const data = new Date();

    document.getElementById("data").innerHTML =
        "Hoje é: " + data.toLocaleDateString("pt-BR");
}

// Mudar a cor do fundo
function mudarCor() {
    document.body.style.backgroundColor = "#dbeafe";
}
