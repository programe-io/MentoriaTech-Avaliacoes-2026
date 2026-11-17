
const formulario = document.getElementById("formIMC");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Receber os dados do paciente
    const nome = document.getElementById("nome").value.trim();
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);

    const resultado = document.getElementById("resultado");

    // Validar os campos
    if (nome === "" || isNaN(peso) || isNaN(altura)) {
        resultado.className = "resultado erro";
        resultado.innerHTML = "Preencha todos os campos corretamente!";
        return;
    }

    if (peso <= 0 || altura <= 0) {
        resultado.className = "resultado erro";
        resultado.innerHTML = "Peso e altura devem ser maiores que zero!";
        return;
    }

    // Calcular o IMC
    const imc = peso / (altura * altura);

    // Classificação do IMC para adultos
    let classificacao = "";

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

    // Exibir informações
    resultado.className = "resultado sucesso";

    resultado.innerHTML = `
        <h2>Resultado do Paciente</h2>

        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Peso:</strong> ${peso} kg</p>
        <p><strong>Altura:</strong> ${altura} m</p>

        <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>

        <p><strong>Classificação:</strong> ${classificacao}</p>
    `;

});
