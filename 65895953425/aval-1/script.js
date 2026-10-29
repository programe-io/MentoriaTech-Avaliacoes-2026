// Função para calcular o total acumulado do lote usando laço de repetição
function calcularTotalLote(quantidade, precoUnitario) {
  let total = 0;
  let contador = 0;

  // Uso da estrutura de repetição while para simular a contagem do lote
  while (contador < quantidade) {
    total += precoUnitario;
    contador++;
  }

  return total;
}

// Função executada ao clicar no botão
function processarLote() {
  const qtdInput = document.getElementById("quantidade").value;
  const precoInput = document.getElementById("preco").value;
  const resultadoDiv = document.getElementById("resultado");
  const infoLoteP = document.getElementById("infoLote");

  const quantidade = Number(qtdInput);
  const preco = Number(precoInput);

  // Validação simples dos campos
  if (!qtdInput || !precoInput || quantidade <= 0 || preco <= 0) {
    alert("Por favor, insira valores válidos e maiores que zero.");
    return;
  }

  // Chamada da função que contém o processamento
  const valorTotal = calcularTotalLote(quantidade, preco);

  // Exibição dos resultados
  infoLoteP.innerHTML = `
    <strong>Itens processados:</strong> ${quantidade}<br>
    <strong>Valor unitário:</strong> R$ ${preco.toFixed(2)}<br>
    <strong>Valor Total do Lote:</strong> R$ ${valorTotal.toFixed(2)}
  `;

  resultadoDiv.classList.remove("hidden");
}