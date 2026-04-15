// 1. Soma
function somar() {
  let n1 = Number(document.getElementById("num1").value);
  let n2 = Number(document.getElementById("num2").value);

  let resultado = n1 + n2;

  document.getElementById("resultadoSoma").innerText =
    "Resultado: " + resultado;
}

// 2. Par ou Ímpar
function verificarPar() {
  let numero = Number(document.getElementById("numeroPar").value);

  if (numero % 2 === 0) {
    document.getElementById("resultadoPar").innerText = "É par!";
  } else {
    document.getElementById("resultadoPar").innerText = "É ímpar!";
  }
}

// 3. Média
function calcularMedia() {
  let n1 = Number(document.getElementById("nota1").value);
  let n2 = Number(document.getElementById("nota2").value);

  let media = (n1 + n2) / 2;

  if (media >= 7) {
    document.getElementById("resultadoMedia").innerText =
      "Aprovado! Média: " + media;
  } else {
    document.getElementById("resultadoMedia").innerText =
      "Reprovado! Média: " + media;
  }
}