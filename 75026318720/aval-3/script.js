  let nome = document.getElementById("nome").value;
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value);

    let erro = document.getElementById("erro");
    let resultado = document.getElementById("resultado");

    erro.innerHTML = "";
    resultado.style.display = "none";

    // Verificar se os campos foram preenchidos
    if (nome.trim() === "" || isNaN(peso) ||
        isNaN(altura) || peso <= 0 || altura <= 0) {

        erro.innerHTML = "Preencha todos os campos corretamente!";
        return;
    }

    // Calcular o IMC
    let imc = peso / (altura * altura);

    // Classificar o IMC (referência para adultos)
    let classificacao = "";

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    }
    else if (imc < 25) {
        classificacao = "Faixa de peso considerada adequada";
    }
    else if (imc < 30) {
        classificacao = "Sobrepeso";
    }
    else if (imc < 35) {
        classificacao = "Obesidade grau I";
    }
    else if (imc < 40) {
        classificacao = "Obesidade grau II";
    }
    else {
        classificacao = "Obesidade grau III";
    }

    // Exibir as informações do paciente
    document.getElementById("nomePaciente").innerHTML =
        "Paciente: " + nome;

    document.getElementById("valorIMC").innerHTML =
        imc.toFixed(2);

    document.getElementById("classificacao").innerHTML =
        classificacao;

    // Mostrar resultado
    resultado.style.display = "block";
}