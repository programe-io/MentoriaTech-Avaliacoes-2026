let estoque = [];

// 1. Cadastrar um novo produto
function cadastrarProduto() {
  const codigo = document.getElementById("codigo").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const quantidadeTexto = document.getElementById("quantidade").value.trim();
  const valorTexto = document.getElementById("valor").value.trim().replace(",", ".");

  const quantidade = parseInt(quantidadeTexto);
  const valor = parseFloat(valorTexto);

  // Validação dos campos
  if (!codigo || !descricao || isNaN(quantidade) || isNaN(valor)) {
    alert("Preencha todos os campos corretamente!");
    return;
  }

  if (quantidade < 0 || valor < 0) {
    alert("Quantidade e valor não podem ser negativos!");
    return;
  }

  // Verifica se o código já existe
  const produtoExistente = estoque.some((item) => item.codigo.toLowerCase() === codigo.toLowerCase());

  if (produtoExistente) {
    alert("Erro: Já existe um produto cadastrado com este código.");
    return;
  }

  estoque.push({
    codigo: codigo,
    descricao: descricao,
    quantidade: quantidade,
    valor: valor
  });

  document.getElementById("form-cadastro").reset();
  listarProdutos();
}

// 2. Listar os produtos cadastrados
function listarProdutos() {
  const tabelaProdutos = document.getElementById("tabela-produtos");
  tabelaProdutos.innerHTML = "";

  if (estoque.length === 0) {
    tabelaProdutos.innerHTML = `
      <tr>
        <td colspan="4" class="vazio">Nenhum produto cadastrado.</td>
      </tr>
    `;
    return;
  }

  estoque.forEach((produto) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${produto.codigo}</td>
      <td>${produto.descricao}</td>
      <td>${produto.quantidade}</td>
      <td>R$ ${produto.valor.toFixed(2).replace(".", ",")}</td>
    `;
    tabelaProdutos.appendChild(linha);
  });
}

// 3. Alterar o valor de um produto
function alterarValor() {
  const codigo = document.getElementById("cod-valor").value.trim();
  const novoValorTexto = document.getElementById("novo-valor").value.trim().replace(",", ".");
  const novoValor = parseFloat(novoValorTexto);

  if (!codigo || isNaN(novoValor) || novoValor < 0) {
    alert("Informe um código e um valor válido!");
    return;
  }

  const produto = estoque.find((item) => item.codigo.toLowerCase() === codigo.toLowerCase());

  if (!produto) {
    alert("Produto não encontrado!");
    return;
  }

  produto.valor = novoValor;
  document.getElementById("form-valor").reset();
  listarProdutos();
  alert("Valor atualizado com sucesso!");
}

// 4. Alterar a quantidade de um produto
function alterarQuantidade() {
  const codigo = document.getElementById("cod-qtd").value.trim();
  const novaQtdTexto = document.getElementById("nova-qtd").value.trim();
  const novaQuantidade = parseInt(novaQtdTexto);

  if (!codigo || isNaN(novaQuantidade) || novaQuantidade < 0) {
    alert("Informe um código e uma quantidade válida!");
    return;
  }

  const produto = estoque.find((item) => item.codigo.toLowerCase() === codigo.toLowerCase());

  if (!produto) {
    alert("Produto não encontrado!");
    return;
  }

  produto.quantidade = novaQuantidade;
  document.getElementById("form-quantidade").reset();
  listarProdutos();
  alert("Quantidade atualizada com sucesso!");
}
