function calcular() {
    // Variáveis e tipos de dados
    let valor1 = Number(document.getElementById("valor1").value);
    let valor2 = Number(document.getElementById("valor2").value);

    // Operadores aritméticos
    let soma = valor1 + valor2;
    let subtracao = valor1 - valor2;
    let multiplicacao = valor1 * valor2;
    let divisao = valor2 !== 0 ? (valor1 / valor2) : "Não é possível dividir por zero";

    // Operadores relacionais
    let maior = valor1 > valor2;
    let menor = valor1 < valor2;
    let igual = valor1 === valor2;

    // Exibição
    let resultado = `
        <strong>Resultados:</strong><br>
        Soma: ${soma} <br>
        Subtração: ${subtracao} <br>
        Multiplicação: ${multiplicacao} <br>
        Divisão: ${divisao} <br><br>

        <strong>Comparações:</strong><br>
        Valor 1 > Valor 2: ${maior} <br>
        Valor 1 < Valor 2: ${menor} <br>
        Valor 1 == Valor 2: ${igual}
    `;

    document.getElementById("resultado").innerHTML = resultado;
}