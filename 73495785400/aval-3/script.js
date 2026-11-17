
function calcularIMC() {

    let nome = document.getElementById("nome").value.trim();
    let peso = Number(document.getElementById("peso").value);
    let altura = Number(document.getElementById("altura").value);

    if (nome === "" || peso <= 0 || altura <= 0 ||
        document.getElementById("peso").value === "" ||
        document.getElementById("altura").value === "") {

        alert("Preencha todos os campos corretamente!");
        return;
    }

    let imc = peso / (altura * altura);

    let classificacao = "";

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    } else if (imc < 25) {
        classificacao = "Faixa de peso considerada adequada";
    } else if (imc < 30) {
        classificacao = "Acima da faixa de peso adequada";
    } else {
        classificacao = "IMC elevado";
    }

    document.getElementById("resultado").innerHTML = `
        <h3>Resultado do Paciente</h3>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>
        <p><strong>Classificação:</strong> ${classificacao}</p>
    `;
}
