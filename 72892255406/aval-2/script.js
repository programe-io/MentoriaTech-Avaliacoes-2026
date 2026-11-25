const botao = document.getElementById("btnCalcular");
const caixaResultado = document.getElementById("resultado");

botao.addEventListener("click", function () {
  // Entrada de dados (Variáveis e Tipos de Dados)
  const n1 = parseFloat(document.getElementById("nota1").value);
  const n2 = parseFloat(document.getElementById("nota2").value);
  const n3 = parseFloat(document.getElementById("nota3").value);

  // Validação
  if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
    caixaResultado.textContent = "Por favor, preencha todas as três notas!";
    caixaResultado.className = "resultado reprovado";
    return;
  }

  // Operadores aritméticos
  const media = (n1 + n2 + n3) / 3;

  // Estrutura de decisão (IF / ELSE IF / ELSE)
  if (media >= 7) {
    caixaResultado.textContent = `Média: ${media.toFixed(1)} — Situação: Aprovado!`;
    caixaResultado.className = "resultado aprovado";
  } else if (media >= 5) {
    caixaResultado.textContent = `Média: ${media.toFixed(1)} — Situação: Recuperação.`;
    caixaResultado.className = "resultado recuperacao";
  } else {
    caixaResultado.textContent = `Média: ${media.toFixed(1)} — Situação: Reprovado.`;
    caixaResultado.className = "resultado reprovado";
  }
});