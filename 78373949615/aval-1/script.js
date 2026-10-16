
function calcular(operacao) {
  const n1 = parseFloat(document.getElementById("n1").value);
  const n2 = parseFloat(document.getElementById("n2").value);
  const resultado = document.getElementById("resultado");

  if (isNaN(n1) || isNaN(n2)) {
    resultado.textContent = "Digite os dois números!";
    return;
  }

  let valor;

  switch (operacao) {
    case "+":
      valor = n1 + n2;
      break;
    case "-":
      valor = n1 - n2;
      break;
    case "*":
      valor = n1 * n2;
      break;
    case "/":
      if (n2 === 0) {
        resultado.textContent = "Não é possível dividir por zero!";
        return;
      }
      valor = n1 / n2;
      break;
  }

  resultado.textContent = "Resultado: " + valor;
}
