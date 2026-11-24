
function calcularIMC() {
    let nome = document.getElementById("nome").value;
    let peso = Number(document.getElementById("peso").value);
    let altura = Number(document.getElementById("altura").value);

    if (nome === "" || peso <= 0 || altura <= 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    let imc = peso / (altura * altura);

    let classificacao;

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    } else if (imc < 25) {
        classificacao = "Faixa considerada adequada";
    } else if (imc < 30) {
        classificacao = "Sobrepeso";
    } else {
        classificacao = "Obesidade";
    }

    document.getElementById("resultado").innerHTML = `
        <h2>Resultado</h2>
        <p>Paciente: ${nome}</p>
        <p>IMC: ${imc.toFixed(2)}</p>
        <p>Classificação: ${classificacao}</p>
    `;
}
