function calcular(num1, num2, operador) {
  switch (operador) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      if (num2 === 0) {
        return "Erro: divisão por zero";
      }
      return num1 / num2;
    default:
      return "Operador inválido";
  }
}

// Exemplos de uso:
console.log("10 + 5 =", calcular(10, 5, "+")); // 15
console.log("10 - 5 =", calcular(10, 5, "-")); // 5
console.log("10 * 5 =", calcular(10, 5, "*")); // 50
console.log("10 / 5 =", calcular(10, 5, "/")); // 2
