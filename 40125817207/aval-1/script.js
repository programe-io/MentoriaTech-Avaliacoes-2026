// Mensagem de boas-vindas
window.onload = function () {
    alert("💙 Bem-vindo(a) ao blog da Maria Rita!");
};

// Mostrar a data e hora
function mostrarData() {
    const agora = new Date();

    const opcoes = {
        dateStyle: "full",
        timeStyle: "short"
    };

    document.getElementById("data").innerHTML =
        agora.toLocaleDateString("pt-BR", opcoes);
}

mostrarData();
setInterval(mostrarData, 1000);

// Botão para mudar a cor do tema
function mudarTema() {
    document.body.classList.toggle("escuro");
}

// Mensagem sobre os hobbies
function mensagemHobby(hobby) {
    alert("💙 Meu hobby favorito é: " + hobby);
}