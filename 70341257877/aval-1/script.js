// Array inicial com os dados exibidos na tela
let produtos = [
  { codigo: 1, descricao: "Cadeira Gamer", quantidade: 12, valor: 699.00 },
  { codigo: 2, descricao: "Mouse Logitech", quantidade: 38, valor: 99.00 }
];

let proximoCodigo = 3;

// Função para renderizar a tabela
function renderizarTabela() {
  const tbody = document.getElementById("tabela-produtos");
  tbody.innerHTML = "";

  produtos.forEach((produto) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${produto.codigo}</td>
      <td>${produto.descricao}</td>
      <td>${produto.quantidade}</td>
      <td>R$ ${produto.valor.toFixed(2)}</td>
      <td>
        <button class="btn btn-alterar-valor" onclick="alterarValor(${produto.codigo})">Alterar Valor</button>
        <button class="btn btn-alterar-qtd" onclick="alterarQuantidade(${produto.codigo})">Alterar Quantidade</button>
        <button class="btn btn-excluir" onclick="excluirProduto(${produto.codigo})">Excluir</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

// Cadastrar novo produto
document.getElementById("form-produto").addEventListener("submit", function (e) {
  e.preventDefault();

  const descricaoInput = document.getElementById("descricao");
  const quantidadeInput = document.getElementById("quantidade");
  const valorInput = document.getElementById("valor");

  const novoProduto = {
    codigo: proximoCodigo++,
    descricao: descricaoInput.value,
    quantidade: parseInt(quantidadeInput.value),
    valor: parseFloat(valorInput.value)
  };

  produtos.push(novoProduto);
  renderizarTabela();

  // Limpar formulário
  descricaoInput.value = "";
  quantidadeInput.value = "";
  valorInput.value = "";
});

// Alterar Valor
function alterarValor(codigo) {
  const produto = produtos.find((p) => p.codigo === codigo);
  if (produto) {
    const novoValor = prompt(`Informe o novo valor para "${produto.descricao}":`, produto.valor);
    if (novoValor !== null && !isNaN(novoValor) && novoValor >= 0) {
      produto.valor = parseFloat(novoValor);
      renderizarTabela();
    }
  }
}

// Alterar Quantidade
function alterarQuantidade(codigo) {
  const produto = produtos.find((p) => p.codigo === codigo);
  if (produto) {
    const novaQtd = prompt(`Informe a nova quantidade para "${produto.descricao}":`, produto.quantidade);
    if (novaQtd !== null && !isNaN(novaQtd) && novaQtd >= 0) {
      produto.quantidade = parseInt(novaQtd);
      renderizarTabela();
    }
  }
}

// Excluir Produto
function excluirProduto(codigo) {
  if (confirm("Deseja realmente excluir este produto?")) {
    produtos = produtos.filter((p) => p.codigo !== codigo);
    renderizarTabela();
  }
}

// Renderizar a tabela no carregamento inicial
renderizarTabela();