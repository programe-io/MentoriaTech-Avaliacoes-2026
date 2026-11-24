

const form = document.getElementById("form-imc");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Receber os dados
    const nome = document.getElementById("nome").value.trim();
    const idade = Number(document.getElementById("idade").value);
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    // Validar os dados
    if (
        nome.length < 2 ||
        !Number.isInteger(idade) ||
        idade < 1 || idade > 120 ||
        !Number.isFinite(peso) ||
        peso < 2 || peso > 500 ||
        !Number.isFinite(altura) ||
        altura < 0.5 || altura > 2.5
    ) {
        alert("Por favor, informe dados válidos!");
        return;
    }

    // Calcular o IMC
    const imc = peso / (altura * altura);

    // Classificar o resultado
    let classificacao = "";
    let classe = "";

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
        classe = "abaixo";
    } else if (imc < 25) {
        classificacao = "Peso normal";
        classe = "normal";
    } else if (imc < 30) {
        classificacao = "Sobrepeso";
        classe = "sobrepeso";
    } else if (imc < 35) {
        classificacao = "Obesidade grau I";
        classe = "obesidade";
    } else if (imc < 40) {
        classificacao = "Obesidade grau II";
        classe = "obesidade";
    } else {
        classificacao = "Obesidade grau III";
        classe = "obesidade";
    }

    // Mostrar o resultado
    document.getElementById("resultado-nome").textContent = nome;
    document.getElementById("resultado-idade").textContent = idade + " anos";

    document.getElementById("valor-imc").textContent =
        imc.toFixed(2).replace(".", ",");

    const elementoClassificacao =
        document.getElementById("classificacao");

    elementoClassificacao.textContent = classificacao;
    elementoClassificacao.className = classe;

    document.getElementById("resultado").hidden = false;
});
