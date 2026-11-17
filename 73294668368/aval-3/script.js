let resultado = Number(n1) * Number(n2);

    document.getElementById("resultado").innerHTML =
        "O resultado da multiplicação é: " + resultado;
\}

function verificarIdade() {
    let idadeTexto = document.getElementById("idade").value;
    let idade = Number(idadeTexto);

    if (idadeTexto === "" || idade < 0) {
        document.getElementById("mensagem").innerHTML =
            "Digite uma idade válida!";
    \} else if (idade >= 18) {
        document.getElementById("mensagem").innerHTML =
            "Você é maior de idade!";
    \} else {
        document.getElementById("mensagem").innerHTML =
            "Você é menor de idade!";
    \}
\}

Como organizar os arquivos$0