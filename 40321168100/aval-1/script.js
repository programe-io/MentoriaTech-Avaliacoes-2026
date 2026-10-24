
 // Listar (Array) de Produtos
let produtos = [];

function validarProdutos(descricao, quantidade, valor) {
  if (descricao.length < 5) {
    throw new Error("Descrição deve ter no mínimo cinco caracteres");
  }

  if (quantidade < 1) {
    throw new Error("Quantidade deve ser maior que zero");
  }

  if (valor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero");
  }
}

function cadastrarProduto(descricao, quantidade, valor) {
  validarProdutos(descricao, quantidade, valor);

  let novoProduto = {
    codigo: produtos.length + 1,
    descricao: descricao,
    quantidade: quantidade,
    valor: valor
  };

  produtos.push(novoProduto);
}

function listarProdutos() {
  console.log(produtos);
}

function atualizarValor(codigoProduto, novoValor) {
  if (novoValor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero");
  }

  const produto = produtos.find(prod => prod.codigo === codigoProduto);

  if (produto) {
    produto.valor = novoValor;
  } else {
    throw new Error("Produto não encontrado");
  }
}

function atualizarQuantidade(codigoProduto, novaQuantidade) {
  if (novaQuantidade < 1) {
    throw new Error("Quantidade deve ser maior que zero");
  }

  const produto = produtos.find(prod => prod.codigo === codigoProduto);

  if (produto) {
    produto.quantidade += novaQuantidade;
  } else {
    throw new Error("Produto não encontrado");
  }
}

// Testes
listarProdutos();

cadastrarProduto("Teclado Gamer", 9, 80);
cadastrarProduto("Mouse Gamer", 12, 45);

listarProdutos();

atualizarValor(1, 75);

atualizarQuantidade(2, 4);

listarProdutos();

