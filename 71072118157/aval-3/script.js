function calcularIMC() {
  const nome = document.getElementById("nome").value;
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);
  const resultadoDiv = document.getElementById("resultado");

  if (!nome || isNaN(peso) || isNaN(altura) || altura <= 0 || peso <= 0) {
    alert("Por favor, preencha todos os campos com valores válidos!");
    return;
  }

  const imc = peso / (altura * altura);
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
    classificacao = "Obesidade grau III (mórbida)";
  }

  resultadoDiv.style.display = "block";
  resultadoDiv.innerHTML = `
    <strong>Paciente:</strong> ${nome}<br>
    <strong>IMC:</strong> ${imc.toFixed(2)}<br>
    <strong>Classificação:</strong> ${classificacao}
  `;
}
