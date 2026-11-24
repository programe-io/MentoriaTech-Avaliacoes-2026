
function calcularIMC() {

    let nome = document.getElementById("nome").value.trim();
    let peso = Number(document.getElementById("peso").value);
    let altura = Number(document.getElementById("altura").value);

    // Validar informações
    if (nome === "" || peso <= 0 || altura <= 0 ||
        document.getElementById("peso").value === "" ||
        document.getElementById("altura").value === "") {

        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Calcular IMC
    let imc = peso / (altura * altura);

    let classificacao;

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    } else if (imc < 25) {
        classificacao = "Faixa de peso considerada adequada";
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
    document.getElementById("resultado").innerHTML = `
        <h2>Resultado</h2>
        <p><strong>Paciente:</strong> ${nome}</p>
        <p><strong>Peso:</strong> ${peso} kg</p>
        <p><strong>Altura:</strong> ${altura} m</p>
        <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>
        <p><strong>Classificação:</strong> ${classificacao}</p>
    `;
}
