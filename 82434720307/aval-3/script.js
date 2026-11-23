function calcularIMC() {
  const nome = document.getElementById("nome").value.trim();
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);
  const divResultado = document.getElementById("resultado");

  if (!nome || isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
    alert("Por favor, preencha todos os campos com valores válidos.");
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
  } else {
    classificacao = "Obesidade";
  }

  divResultado.style.display = "block";
  divResultado.innerHTML = `
    <strong>Paciente:</strong> ${nome} <br>
    <strong>IMC:</strong> ${imc.toFixed(2)} <br>
    <strong>Classificação:</strong> ${classificacao}
  `;
}
