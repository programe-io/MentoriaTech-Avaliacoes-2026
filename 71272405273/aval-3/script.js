const form = document.getElementById("form-imc");
const resultadoDiv = document.getElementById("resultado");

function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}

function obterClassificacao(imc) {
  if (imc < 18.5) return "Abaixo do peso";
  if (imc < 25) return "Peso normal";
  if (imc < 30) return "Sobrepeso";
  if (imc < 35) return "Obesidade grau I";
  if (imc < 40) return "Obesidade grau II";
  return "Obesidade grau III";
}

form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);

  if (!nome || isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
    alert("Preencha todos os campos com valores válidos.");
    return;
  }

  const imc = calcularIMC(peso, altura);
  const classificacao = obterClassificacao(imc);

  resultadoDiv.innerHTML = `
    <p><strong>Paciente:</strong> ${nome}</p>
    <p><strong>Peso:</strong> ${peso.toFixed(2)} kg | <strong>Altura:</strong> ${altura.toFixed(2)} m</p>
    <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>
    <p><strong>Classificação:</strong> ${classificacao}</p>
  `;

  resultadoDiv.classList.remove("oculto");
});
