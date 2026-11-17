// Função para somar números
function somar() {
    let n1 = document.getElementById("n1").value;
    let n2 = document.getElementById("n2").value;

    if (n1 === "" || n2 === "") {
        document.getElementById("resultado").textContent =
            "Digite os dois números!";
        return;
    \}

    let resultado = Number(n1) + Number(n2);

    document.getElementById("resultado").textContent =
        "Resultado: " + resultado;
\}

// Função para verificar idade
function verificarIdade() {
    let idade = document.getElementById("idade").value;

    if (idade === "" || Number(idade) < 0) {
        document.getElementById("resposta").textContent =
            "Digite uma idade válida!";
    \} else if (Number(idade) >= 18) {
        document.getElementById("resposta").textContent =
            "Você é maior de idade!";
    \} else {
        document.getElementById("resposta").textContent =
            "Você é menor de idade!";
    \}
\}

// Função para responder pergunta
function responder(correto) {
    let mensagem = document.getElementById("mensagem");

    if (correto) {
        mensagem.textContent = "Parabéns! Resposta correta!";
        mensagem.style.color = "green";
    \} else {
        mensagem.textContent = "Resposta incorreta. Tente novamente!";
        mensagem.style.color = "red";$0