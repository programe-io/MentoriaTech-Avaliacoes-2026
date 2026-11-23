let produtos = [];
function validarProduto(descricao, quantidade, valor) {

  if (descricao.length < 5) {
    throw new Error("Descrição deve ter no mínimo cinco caracteres.");
  }

  if (quantidade < 1) {
    throw new Error("A quantidade deve ser maior que zero.");
  }

  if (valor < 0) {
    throw new Error("O valor deve ser maior ou igual a zero.");
  }
}

function cadastrarProdutos(descricao, quantidade, valor) {
  validarProduto(descricao, quantidade, valor);

  const novoProduto = {
    codigo: produtos.length + 1,
    descricao: descricao,
    quantidade: quantidade,
    valor: valor
  };

  produtos.push(novoProduto);
}


function listarProdutos() {
  return produtos;
}

function atualizarValor(codigo, novoValor) {
  if (novoValor < 0) {
    throw new Error("O valor deve ser maior ou igual a zero.");
  }

  const produto = produtos.find(prod => prod.codigo === codigo);

  if (!produto) {
    throw new Error("Produto não encontrado.");
  }

  produto.valor = novoValor;
}

function atualizarQuantidade(codigo, novaQuantidade) {
  if (novaQuantidade < 1) {
    throw new Error("A quantidade deve ser maior que zero.");
  }

  const produto = produtos.find(prod => prod.codigo === codigo);

  if (!produto) {
    throw new Error("Produto não encontrado.");
  }

  produto.quantidade += novaQuantidade;
}

console.log("Estoque inicial:", listarProdutos());

cadastrarProdutos("Cadeira gamer", 12, 699.00);
cadastrarProdutos("Mouse da Logitech", 38, 99.00);
console.log("Após cadastros:", listarProdutos());

atualizarValor(1, 750.00);
atualizarQuantidade(1, 3); 
console.log("Após atualizações:", listarProdutos());
