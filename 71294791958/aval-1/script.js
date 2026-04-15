function calcularMedia() {
    // Pegando valores
    let nome = document.getElementById("nome").value;
    let nota1 = Number(document.getElementById("nota1").value);
    let nota2 = Number(document.getElementById("nota2").value);

    // Calculando média
    let media = (nota1 + nota2) / 2;

    let resultado;

    // Lógica
    if (media >= 7) {
        resultado = "Aprovado";
    } else {
        resultado = "Reprovado";
    }

    // Exibindo resultado
    document.getElementById("resultado").innerText =
        `Aluno: ${nome} | Média: ${media.toFixed(2)} | Resultado: ${resultado}`;
}