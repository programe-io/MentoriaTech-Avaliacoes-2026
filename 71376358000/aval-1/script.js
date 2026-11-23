let produtos = [];
function validarProduto(descricao, quantidade, valor) {
  if (!descricao || descricao.trim().length < 5) {
    throw new Error("A descrição deve ter no mínimo 5 caracteres.");
  }

  if (quantidade < 0) {
    throw new Error("A quantidade não pode ser menor que zero.");
  }

  if (valor <= 0) {
    throw new Error("O valor do produto deve ser maior que zero.");
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
  console.log("--- LISTA DE PRODUTOS ---");
  if (produtos.length === 0) {
    console.log("Estoque vazio.");
    return;
  }
  console.log(produtos);
}

function atualizarValor(codigo, novoValor) {
  if (novoValor <= 0) {
    throw new Error("O novo valor deve ser maior que zero.");
  }

  const produto = produtos.find(prod => prod.codigo === codigo);

  if (!produto) {
    throw new Error("Produto não encontrado.");
  }

  produto.valor = novoValor;
}

function atualizarQuantidade(codigo, novaQuantidade) {
  const produto = produtos.find(prod => prod.codigo === codigo);

  if (!produto) {
    throw new Error("Produto não encontrado.");
  }

  produto.quantidade += novaQuantidade;
}

try {
  cadastrarProdutos("Cadeira gamer", 12, 699.00);
  cadastrarProdutos("Mouse da Logitech", 38, 99.00);

  listarProdutos();

  atualizarValor(1, 749.90);
  atualizarQuantidade(1, 3);

  listarProdutos();
} catch (erro) {
  console.error("Erro na operação:", erro.message);
}
