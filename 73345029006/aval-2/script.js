
function enviarTime() {

    // Pega o nome digitado pelo visitante
    let time = document.getElementById("time").value.trim();

    let resposta = document.getElementById("resposta");

    // Verifica se o campo está vazio
    if (time === "") {

        resposta.textContent =
        "Por favor, digite o nome do seu time!";

        return;
    }

    // Mostra a mensagem
    resposta.textContent =
    "⚽ Que legal! Seu time do coração é " + time + "!";

    // Limpa o campo
    document.getElementById("time").value = "";

}
