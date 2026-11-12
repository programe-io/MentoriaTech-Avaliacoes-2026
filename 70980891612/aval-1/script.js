let estoque = [];

function cadastrarProduto() {
  const codigo = document.getElementById("codigo").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const quantidade = parseInt(document.getElementById("quantidade").value);
  const valor = parseFloat(document.getElementById("valor").value);

  if (!codigo || !descricao || isNaN(quantidade) || isNaN(valor)) {
    alert("Por favor, preencha todos os campos corretamente!");
    return;
  }

  if (quantidade < 0 || valor < 0) {
    alert("Quantidade e valor não podem ser negativos!");
    return;
  }

  const produtoExistente = estoque.some(item => item.codigo === codigo);
  if (produtoExistente) {
    alert("Erro: Já existe um produto cadastrado com esse código!");
    return;
  }

  estoque.push({
    codigo: codigo,
    descricao: descricao,
    quantidade: quantidade,
    valor: valor
  });

  limparFormulario();
  listarProdutos();
}

function listarProdutos() {
  const tabela = document.getElementById("lista-produtos");
  tabela.innerHTML = "";

  if (estoque.length === 0) {
    tabela.innerHTML = `<tr><td colspan="5" class="vazio">Nenhum produto cadastrado no estoque.</td></tr>`;
    return;
  }

  estoque.forEach((produto, index) => {
    tabela.innerHTML += `
      <tr>
        <td><strong>${produto.codigo}</strong></td>
        <td>${produto.descricao}</td>
        <td>${produto.quantidade} un.</td>
        <td>R$ ${produto.valor.toFixed(2)}</td>
        <td>
          <button class="btn-acao" onclick="alterarValor(${index})">Alterar Valor</button>
          <button class="btn-acao" onclick="alterarQuantidade(${index})">Alterar Qtd</button>
        </td>
      </tr>
    `;
  });
}

function alterarValor(index) {
  const produto = estoque[index];
  const entrada = prompt(`Produto: ${produto.descricao}\nValor atual: R$ ${produto.valor.toFixed(2)}\n\nDigite o novo valor:`);

  if (entrada === null) return;

  const novoValor = parseFloat(entrada);
  if (!isNaN(novoValor) && novoValor >= 0) {
    produto.valor = novoValor;
    listarProdutos();
  } else {
    alert("Valor inválido!");
  }
}

function alterarQuantidade(index) {
  const produto = estoque[index];
  const entrada = prompt(`Produto: ${produto.descricao}\nQuantidade atual: ${produto.quantidade}\n\nDigite a nova quantidade:`);

  if (entrada === null) return;

  const novaQtd = parseInt(entrada);
  if (!isNaN(novaQtd) && novaQtd >= 0) {
    produto.quantidade = novaQtd;
    listarProdutos();
  } else {
    alert("Quantidade inválida!");
  }
}

function limparFormulario() {
  document.getElementById("codigo").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("quantidade").value = "";
  document.getElementById("valor").value = "";
}
