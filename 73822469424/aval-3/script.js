const botao = document.getElementById("btn-calcular");
const caixaResultado = document.getElementById("resultado");
const saudacao = document.getElementById("saudacao");
const valorImc = document.getElementById("valor-imc");
const classificacao = document.getElementById("classificacao");

function classificarImc(imc) {
  if (imc < 18.5) return "Abaixo do peso";
  if (imc < 25) return "Peso normal";
  if (imc < 30) return "Sobrepeso";
  if (imc < 35) return "Obesidade grau I";
  if (imc < 40) return "Obesidade grau II";
  return "Obesidade grau III";
}

botao.addEventListener("click", function () {
  const nome = document.getElementById("nome").value.trim();
  const peso = parseFloat(document.getElementById("peso").value);
  let altura = parseFloat(document.getElementById("altura").value);

  caixaResultado.classList.remove("oculto", "erro");

  if (nome === "" || isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
    saudacao.textContent = "Preencha nome, peso e altura corretamente.";
    valorImc.textContent = "";
    classificacao.textContent = "";
    caixaResultado.classList.add("erro");
    return;
  }

  
  if (altura > 3) {
    altura = altura / 100;
  }

  const imc = peso / (altura * altura);

  saudacao.textContent = "Paciente: " + nome;
  valorImc.textContent = imc.toFixed(1);
  classificacao.textContent = classificarImc(imc);
});