
document.getElementById("formIMC").addEventListener("submit", function(event) {

    event.preventDefault();

    // Receber os dados do paciente
    let nome = document.getElementById("nome").value.trim();
    let peso = Number(document.getElementById("peso").value);
    let altura = Number(document.getElementById("altura").value);

    // Validar informações
    if (nome === "" || peso <= 0 || altura <= 0 ||
        !Number.isFinite(peso) || !Number.isFinite(altura)) {

        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Calcular o IMC
    let imc = peso / (altura * altura);

    let classificacao = "";

    // Verificar a classificação do IMC
    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    } 
    else if (imc < 25) {
        classificacao = "Peso normal";
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

    // Exibir resultado
    document.getElementById("resultado").innerHTML = `
        <h2>Resultado do IMC</h2>

        <p><strong>Paciente:</strong> ${nome}</p>

        <p><strong>Peso:</strong> ${peso} kg</p>

        <p><strong>Altura:</strong> ${altura} m</p>

        <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>

        <p><strong>Classificação:</strong> ${classificacao}</p>
    `;

});
