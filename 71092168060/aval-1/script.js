// ====== AULA 1.14 - PROJETO SISTEMA DE ESTOQUE ======

// 1.12 - Array de produtos
let produtos = [];

// 1.10 / 1.11 - Função cadastrarProduto
function cadastrarProduto(codigo, descricao, quantidade, valor) {
  if (descricao.length < 5) {
    throw new Error("Descrição deve ter no mínimo 5 caracteres");
  }
  if (valor <= 0) {
    throw new Error("Valor deve ser maior que zero");
  }
  if (quantidade < 0) {
    throw new Error("Quantidade deve ser maior ou igual a zero");
  }

  const produto = {
    codigo: codigo,
    descricao: descricao,
    quantidade: quantidade,
    valor: valor
  };

  produtos.push(produto);
  return produto;
}

// 1.11 - Função localizar produto pelo código
function buscarProduto(codigoProduto) {
  return produtos.find((produto) => produto.codigo === codigoProduto);
}

// 1.05 / 1.06 - Alterar valor com validação
function alterarValor(codigoProduto, novoValor) {
  if (novoValor <= 0) {
    throw new Error("Valor deve ser maior que zero");
  }

  const produto = buscarProduto(codigoProduto);

  if (produto) {
    produto.valor = novoValor;
    return produto;
  } else {
    throw new Error("Produto não encontrado");
  }
}

// 1.05 / 1.06 - Alterar quantidade com validação
function alterarQuantidade(codigoProduto, novaQuantidade) {
  if (novaQuantidade < 0) {
    throw new Error("Quantidade deve ser maior ou igual a zero");
  }

  const produto = buscarProduto(codigoProduto);

  if (produto) {
    produto.quantidade = novaQuantidade;
    return produto;
  } else {
    throw new Error("Produto não encontrado");
  }
}

// 1.07 - Listar produtos
function listarProdutos() {
  return produtos;
}

// ====== TESTES (o que aparece no Output da aula) ======
try {
  cadastrarProduto(1, "Cadeira Gamer", 12, 499);
  cadastrarProduto(2, "Mouse Legit", 38, 99);
  cadastrarProduto(3, "Fone Bluetooth", 15, 87);

  console.log("--- Estoque inicial ---");
  console.log(listarProdutos());

  alterarValor(1, 299);

  console.log("--- Após alterar o valor do código 1 ---");
  console.log(listarProdutos());

  alterarQuantidade(3, 3);

  console.log("--- Após alterar a quantidade do código 3 ---");
  console.log(listarProdutos());

  console.log("--- Code Execution Successful ---");
} catch (erro) {
  console.log("Erro:", erro.message);
}
