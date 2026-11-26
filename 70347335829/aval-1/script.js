
function saudacao() {
    let nome = document.getElementById("nome").value;

    if (nome === "") {
        document.getElementById("mensagem").innerHTML =
            "Por favor, digite seu nome!";
    } else {
        document.getElementById("mensagem").innerHTML =
            "Olá, " + nome + "! Seja bem-vindo ao mundo da programação!";
    }
}
