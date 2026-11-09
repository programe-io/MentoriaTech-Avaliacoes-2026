
// Mostrar mensagem de boas-vindas
function mostrarMensagem() {
    alert("Bem-vindo ao Meu Mundo Digital!");
}

// Mudar a cor do fundo
function mudarCor() {
    document.body.style.backgroundColor = "#d1c4e9";
}

// Mostrar e esconder informações
function mostrarInformacao() {
    let texto = document.getElementById("informacao");

    if (texto.style.display === "none") {
        texto.style.display = "block";
    } else {
        texto.style.display = "none";
    }
}
