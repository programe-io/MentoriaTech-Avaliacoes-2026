
function calcularIMC() {

    // Receber os dados do paciente
    let nome = document.getElementById("nome").value.trim();

    let peso = Number(document.getElementById("peso").value);

    let altura = Number(document.getElementById("altura").value);

    let resultado = document.getElementById("resultado");

    // Validar os dados
    if (nome.length < 2) {
        alert("Digite o nome do paciente!");
        return;
    }

    if (!Number.isFinite(peso) || peso <= 0) {
        alert("Digite um peso válido!");
        return;
    }

    if (!Number.isFinite(altura) || altura <= 0) {
        alert("Digite uma altura válida!");
        return;
    }

    // Calcular o IMC
    let imc = peso / (altura * altura);

    // Classificar o IMC
    let classificacao = "";

    if (imc < 18.5) {

        classificacao = "Abaixo do peso";

    } else if (imc < 25) {

        classificacao = "Peso adequado";

    } else if (imc < 30) {

        classificacao = "Sobrepeso";

    } else if (imc < 35) {

        classificacao = "Obesidade grau I";

    } else if (imc < 40) {

        classificacao = "Obesidade grau II";

    } else {

        classificacao = "Obesidade grau III";
    }

    // Exibir resultado
    resultado.innerHTML = `
        <h2>Resultado do Paciente</h2>

        <p><strong>Nome:</strong> ${nome}</p>

        <p><strong>Peso:</strong> ${peso} kg</p>

        <p><strong>Altura:</strong> ${altura} m</p>

        <p>Seu IMC é:</p>

        <div class="imc">
            ${imc.toFixed(2)}
        </div>

        <p class="classificacao">
            ${classificacao}
        </p>
    `;
}
