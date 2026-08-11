// Seleciona o botão
const botao = document.getElementById("botao");

// Executa quando o botão for clicado
botao.addEventListener("click", function () {

    const nome = document.getElementById("nome").value;

    if (nome === "") {
        alert("Digite seu nome!");
    } else {
        alert("Olá, " + nome + "!");
    }

});