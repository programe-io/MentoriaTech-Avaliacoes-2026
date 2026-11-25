
function calcularIMC() {

    // Receber os dados do paciente
    let nome = document.getElementById("nome").value.trim();
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value);

    let resultado = document.getElementById("resultado");

    // Verificar se os campos foram preenchidos
    if (nome === "" || isNaN(peso) || isNaN(altura) ||
        peso <= 0 || altura <= 0) {

        resultado.style.display = "block";
        resultado.innerHTML =
            "<p class='erro'>Preencha todos os campos corretamente!</p>";

        return;
    }

    // Calcular o IMC
    let imc = peso / (altura * altura);

    // Classificar o IMC
    let classificacao;

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";

    } else if (imc < 25) {
        classificacao = "Peso normal";

    } else if (imc < 30) {
        classificacao = "Sobrepeso";

    } else if (imc < 35) {
        classificacao = "Obesidade grau I";

    } else if (imc < 40) {
        classificacao = "Obesidade grau II";

    } else {
        classificacao = "Obesidade grau III";
    }

    // Exibir informações do paciente
    resultado.style.display = "block";

    resultado.innerHTML = `
        <h3>Resultado do Paciente</h3>

        <p><strong>Nome:</strong> ${nome}</p>

        <p><strong>Peso:</strong> ${peso} kg</p>

        <p><strong>Altura:</strong> ${altura} m</p>

        <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>

        <p><strong>Classificação:</strong> ${classificacao}</p>
    `;
}
