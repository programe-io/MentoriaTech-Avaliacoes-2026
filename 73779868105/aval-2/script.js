
function calcularIMC() {
    let nome = document.getElementById("nome").value;
    let peso = Number(document.getElementById("peso").value);
    let altura = Number(document.getElementById("altura").value);

    let resultado = document.getElementById("resultado");

    if (nome.trim() === "" || peso <= 0 || altura <= 0 ||
        !Number.isFinite(peso) || !Number.isFinite(altura)) {
        resultado.innerHTML = "Preencha todos os campos corretamente!";
        return;
    }

    let imc = peso / (altura * altura);

    let classificacao = "";

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    } else if (imc < 25) {
        classificacao = "Faixa de referência considerada adequada para adultos";
    } else if (imc < 30) {
        classificacao = "Sobrepeso";
    } else {
        classificacao = "Obesidade";
    }

    resultado.innerHTML = `
        <h2>Resultado</h2>
        <p><strong>Paciente:</strong> ${nome}</p>
        <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>
        <p><strong>Classificação:</strong> ${classificacao}</p>
        <small>Para adultos, o IMC é apenas um indicador e não substitui uma avaliação profissional.</small>
    `;
}
