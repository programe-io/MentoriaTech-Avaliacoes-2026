let produtos = [];

function validarProduto(descricao, quantidade, valor) {
  let erros = false;

  if (descricao.length < 5) {
    console.log("A descrição deve ter no mínimo 5 caracteres.");
    erros = true;
  }
  if (quantidade < 1) {
    console.log("A quantidade deve ser maior que zero.");
    erros = true;
  }
  if (valor <= 0) {
    console.log("O valor deve ser maior que zero!");
    erros = true;
  }

  return !erros; // Retorna true se estiver tudo certo
}

function cadastrarProduto(descricao, quantidade, valor) {
  if (validarProduto(descricao, quantidade, valor)) {
    let novoProduto = {
      codigo: produtos.length + 1,
      descricao: descricao,
      quantidade: quantidade,
      valor: valor
    };
    
    produtos.push(novoProduto);
    console.log("Produto cadastrado com sucesso!");
  }
}

function listarProdutos() {
  console.log(produtos);
}

function atualizarValor(codigoProduto, novoValor) {
  if (novoValor <= 0) {
    console.log("Valor deve ser maior que zero!");
    return;
  }

  const produto = produtos.find(prod => prod.codigo === codigoProduto);

  if (produto) {
    produto.valor = novoValor;
    console.log("Valor atualizado!");
  } else {
    console.log("Produto não encontrado.");
  }
}

function atualizarQuantidade(codigoProduto, novaQuantidade) {
  if (novaQuantidade < 1) {
    console.log("Quantidade deve ser maior que zero!");
    return;
  }

  const produto = produtos.find(prod => prod.codigo === codigoProduto);

  if (produto) {
    produto.quantidade += novaQuantidade;
    console.log("Quantidade atualizada!");
  } else {
    console.log("Produto não encontrado.");
  }
}