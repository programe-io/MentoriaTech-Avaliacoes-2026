
function calcularIMC() {

    // Receber os dados do paciente
    let nome = document.getElementById("nome").value.trim();
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value);

    let resultado = document.getElementById("resultado");

    // Verificar se os campos foram preenchidos
    if (nome === "" || isNaN(peso) || isNaN(altura) ||
        peso <= 0 || altura <= 0) {

        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Calcular o IMC
    let imc = peso / (altura * altura);

    let classificacao = "";
    let mensagem = "";

    // Classificar o IMC para adultos
    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
        mensagem = "O paciente está abaixo do peso considerado adequado.";
    }
    else if (imc < 25) {
        classificacao = "Peso normal";
        mensagem = "O paciente está na faixa de peso considerada adequada.";
    }
    else if (imc < 30) {
        classificacao = "Sobrepeso";
        mensagem = "O paciente está com sobrepeso.";
    }
    else if (imc < 35) {
        classificacao = "Obesidade grau I";
        mensagem = "O paciente apresenta obesidade grau I.";
    }
    else if (imc < 40) {
        classificacao = "Obesidade grau II";
        mensagem = "O paciente apresenta obesidade grau II.";
    }
    else {
        classificacao = "Obesidade grau III";
        mensagem = "O paciente apresenta obesidade grau III.";
    }

    // Exibir o resultado
    resultado.style.display = "block";

    resultado.innerHTML = `
        <h2>Resultado do Paciente</h2>

        <p><strong>Nome:</strong> ${nome}</p>

        <p><strong>Peso:</strong> ${peso.toFixed(1)} KG</p>

        <p><strong>Altura:</strong> ${altura.toFixed(2)} M</p>

        <p>Seu IMC é:</p>

        <div class="valor-imc">
            ${imc.toFixed(2)}
        </div>

        <p class="classificacao">
            ${classificacao}
        </p>

        <p>${mensagem}</p>
    `;
}
