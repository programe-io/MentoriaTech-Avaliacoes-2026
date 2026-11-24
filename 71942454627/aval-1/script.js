let produtos = [];

function validarProduto(descricao, quantidade, valor) {
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
  validarProduto(descricao, quantidade, valor);

  let novoProduto = {
    codigo: produtos.length + 1,
    descricao: descricao,
    quantidade: quantidade,
    valor: valor
  };

  produtos.push(novoProduto);

  console.log("Produto cadastrado com sucesso!");
}

function listarProdutos() {
  console.log(produtos);
}

function atualizarValor(codigoProduto, novoValor) {
  if (novoValor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero");
  }

  const produto = produtos.find(
    prod => prod.codigo === Number(codigoProduto)
  );

  if (produto) {
    produto.valor = novoValor;
    console.log("Valor atualizado com sucesso!");
  } else {
    throw new Error("Produto não encontrado");
  }
}

function atualizarQuantidade(codigoProduto, novaQuantidade) {
  if (novaQuantidade < 1) {
    throw new Error("Quantidade deve ser maior que zero");
  }

  const produto = produtos.find(
    prod => prod.codigo === Number(codigoProduto)
  );

  if (produto) {
    produto.quantidade = novaQuantidade;
    console.log("Quantidade atualizada com sucesso!");
  } else {
    throw new Error("Produto não encontrado");
  }
}

// TESTANDO O PROGRAMA

cadastrarProduto("Caderno", 10, 15);
cadastrarProduto("Caneta azul", 20, 2);

atualizarValor(1, 18);
atualizarQuantidade(2, 30);

listarProdutos();