
function mostrarMensagem() {

    let nome = prompt("Qual é o seu nome?");

    if (nome != null && nome.trim() !== "") {

        document.getElementById("mensagem").innerHTML =
            "Olá, " + nome + "! Seja bem-vindo ao nosso site!";

    } else {

        alert("Por favor, informe seu nome!");

    }

}
