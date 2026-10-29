// Função para calcular o total acumulado do lote usando a estrutura while
function calcularTotalLote(quantidade, precoUnitario) {
  let total = 0;
  let contador = 0;

  // Processa cada item do lote acumulando o valor
  while (contador < quantidade) {
    total += precoUnitario;
    contador++;
  }

  return total;
}

// Função principal disparada pelo botão
function processarLote() {
  const qtdInput = document.getElementById("quantidade").value;
  const precoInput = document.getElementById("preco").value;
  const resultadoDiv = document.getElementById("resultado");
  const infoLoteP = document.getElementById("infoLote");

  const quantidade = Number(qtdInput);
  const preco = Number(precoInput);

  // Validação de entrada
  if (!qtdInput || !precoInput || quantidade <= 0 || preco <= 0) {
    alert("Por favor, preencha todos os campos com valores válidos maiores que zero.");
    return;
  }

  // Executa o cálculo acumulativo
  const valorTotal = calcularTotalLote(quantidade, preco);

  // Exibe o resumo do processamento
  infoLoteP.innerHTML = `
    <strong>Itens processados:</strong> ${quantidade}<br>
    <strong>Valor unitário:</strong> R$ ${preco.toFixed(2)}<br>
    <strong>Valor Total do Lote:</strong> R$ ${valorTotal.toFixed(2)}
  `;

  resultadoDiv.classList.remove("hidden");
}