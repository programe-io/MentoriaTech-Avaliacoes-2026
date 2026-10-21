// Lista de produtos pet
let produtos = [];

function validarProduto(descricao, quantidade, valor) {
  // Descrição deve ter no mínimo 5 caracteres
  if (descricao.length < 5) {
    throw new Error("Descrição deve ter no mínimo 5 caracteres!\n"); // Corrigido de 4 para 5
  }
  if (quantidade < 1) {
    throw new Error("Quantidade deve ser maior que zero!\n"); // Corrigido erro de digitação "se"
  }
  if (valor < 0) {
    throw new Error("Valor não pode ser negativo!\n");
  }
}

function cadastrarProduto(descricao, quantidade, valor) {
  validarProduto(descricao, quantidade, valor);
  let novoProduto = {
    "codigo": produtos.length + 1,
    "descricao": descricao,
    "quantidade": quantidade,
    "valor": valor,
  };
  produtos.push(novoProduto);
}

function listarProdutos() {
  console.log(produtos);
}

function atualizarValor(codigoProduto, novoValor) {
  if (novoValor < 0) {
    throw new Error("Valor deve ser positivo!\n");
  }
  const produto = produtos.find(prod => prod.codigo === codigoProduto);
  if (produto) {
    produto.valor = novoValor;
  } else {
    throw new Error("Produto não encontrado.\n");
  }
}

function atualizarQuantidade(codigoProduto, novaQuantidade) {
  if (novaQuantidade < 1) {
    throw new Error("Quantidade deve ser maior que zero!\n");
  }
  const produto = produtos.find(prod => prod.codigo === codigoProduto);
  if (produto) {
    produto.quantidade = novaQuantidade; 
  } else {
    throw new Error("Produto não encontrado.\n");
  }
}

//-----------------------------------------------------------------------
// Testes de execução:
listarProdutos(); // []

cadastrarProduto("Botas cano alto", 20, 150.00);
cadastrarProduto("Microfone", 45, 180.00);

listarProdutos(); // Mostra os 2 produtos cadastrados
atualizarValor(2, 200.00); // Atualiza o valor do Microfone para 200.00
listarProdutos(); // Mostra a lista com o valor atualizado
atualizarQuantidade(2, 50);
listarProdutos();