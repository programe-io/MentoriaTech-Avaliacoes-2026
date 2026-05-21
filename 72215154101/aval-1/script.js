document.getElementById("calcular").addEventListener("click", function () {

    // Variáveis
    let n1 = Number(document.getElementById("nota1").value);

    let n2 = Number(document.getElementById("nota2").value);

    let n3 = Number(document.getElementById("nota3").value);

    // Cálculo da média
    let media = (n1 + n2 + n3) / 3;

    // Resultado
    let resultado = "";

    if (media >= 7) {

        resultado = "Parabéns! Você foi aprovado com média " +
            media.toFixed(2);

    } else if (media >= 5) {

        resultado = "Você está de recuperação. Média: " +
            media.toFixed(2);

    } else {

        resultado = "Infelizmente, você foi reprovado. Média: " +
            media.toFixed(2);
    }

    // Exemplo de repetição FOR
    for (let i = 1; i <= 3; i++) {

        console.log("Nota " + i + " registrada.");
    }

    // Exibir resultado
    document.getElementById("resultado").textContent = resultado;

});