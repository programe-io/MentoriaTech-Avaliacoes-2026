let produtos = [];

function ValidarProduto(descricao, quantidade, valor) {
  if (descricao.length < 3) {
    throw new Error("Descrição deve ter no minímo 3 caracteres");
  }
  if (quantidade < 1) {
    throw new Error("A quantidade do produto não deve ser menor que 0");
  }
  if (valor < 0) {
    throw new Error("O valor deve ser maior ou igual a 0");
  }
}

function CadastrarProdutos(descricao, quantidade, valor) {
  ValidarProduto(descricao, quantidade, valor);
  let ProdutoNovo = {
    "codigo": produtos.length + 1,
    "descrição": descricao,
    "quantidade": quantidade,
    "valor": valor
  };
  produtos.push(ProdutoNovo);
}

function ListarProdutos() {
  console.log(produtos);
}

function AtualizarValor(CodigoProduto, NovoValor) {
  if (NovoValor < 0) {
    throw new Error("O valor do produto não deve ser menor que 0");
  }

  const produto = produtos.find(Produ => Produ.codigo === CodigoProduto);

  if (produto) {
    produto.valor = NovoValor;
  } else {
    throw new Error("produto não foi encontrado");
  }
}

function AtualizarQuantidade(CodigoProduto, NovaQuantidade) {
  if (NovaQuantidade < 1) {
    throw new Error("A quantidade do produto não deve ser menor que 0");
  }

  const produto = produtos.find(Produ => Produ.codigo === CodigoProduto);

  if (produto) {
    produto.quantidade += NovaQuantidade;
  } else {
    throw new Error("produto não foi encontrado");
  }
}

//cuListarProdutos();
CadastrarProdutos("Memória Ram DDR5 16GB", 13, 1850);
CadastrarProdutos("PS5", 22, 5300.83);
ListarProdutos();
AtualizarValor(2, 5000);
ListarProdutos();
AtualizarQuantidade(1, 9);