function analisar() {

    let idade = Number(document.getElementById("idade").value);
    let nota = Number(document.getElementById("nota").value);
    let v1 = Number(document.getElementById("v1").value);
    let v2 = Number(document.getElementById("v2").value);
    let operacao = document.getElementById("operacao").value;

    let resultado = "";

    // ✅ IF, ELSE e operadores relacionais + lógicos
    if (idade >= 18 && idade <= 60) {
        resultado += "Adulto dentro da faixa ativa.<br>";
    } else if (idade < 18) {
        resultado += "Menor de idade.<br>";
    } else {
        resultado += "Idoso.<br>";
    }

    // ✅ Condicional encadeada (classificação de nota)
    if (nota >= 7) {
        resultado += "Aprovado.<br>";
    } else if (nota >= 5 && nota < 7) {
        resultado += "Recuperação.<br>";
    } else {
        resultado += "Reprovado.<br>";
    }

    // ✅ Operadores lógicos adicionais
    if (nota >= 7 && idade >= 18) {
        resultado += "Aluno aprovado e maior de idade.<br>";
    }

    if (nota < 5 || idade < 18) {
        resultado += "Precisa de atenção.<br>";
    }

    // ✅ SWITCH (operações matemáticas)
    let calc;

    switch (operacao) {
        case "1":
            calc = v1 + v2;
            resultado += "Soma: " + calc + "<br>";
            break;

        case "2":
            calc = v1 - v2;
            resultado += "Subtração: " + calc + "<br>";
            break;

        case "3":
            calc = v1 * v2;
            resultado += "Multiplicação: " + calc + "<br>";
            break;

        case "4":
            if (v2 !== 0) {
                calc = v1 / v2;
            } else {
                calc = "Erro: divisão por zero";
            }
            resultado += "Divisão: " + calc + "<br>";
            break;

        default:
            resultado += "Operação inválida.<br>";
    }

    document.getElementById("resultado").innerHTML = resultado;
}