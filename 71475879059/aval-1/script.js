
// =====================================================
// AVALIAÇÃO 1 - PROJETO CRUD E ESTOQUE
// Tema: Loja de Informática
// Ambiente de execução: Programiz (JavaScript)
// =====================================================

// Lista que guarda todos os produtos do estoque
let estoque = [];

// -----------------------------------------------------
// FUNÇÃO PARA VALIDAR OS DADOS DO PRODUTO
// -----------------------------------------------------
function validarProduto(descricao, quantidade, valor) {
  if (descricao.length < 3) {
    throw new Error("A descrição precisa ter pelo menos três caracteres");
  }

  if (quantidade < 1) {
    throw new Error("Informe uma quantidade válida, maior que zero");
  }

  if (valor < 0) {
    throw new Error("O preço não pode ser negativo");
  }
}

// -----------------------------------------------------
// FUNÇÃO PARA CADASTRAR UM NOVO PRODUTO
// -----------------------------------------------------
function cadastrarProduto(descricao, quantidade, valor) {
  validarProduto(descricao, quantidade, valor);

  let produtoNovo = {
    codigo: estoque.length + 1,
    descricao: descricao,
    quantidade: quantidade,
    valor: valor
  };

  estoque.push(produtoNovo);
}

// -----------------------------------------------------
// FUNÇÃO PARA LISTAR OS PRODUTOS CADASTRADOS
// -----------------------------------------------------
function listarProdutos() {
  console.log(estoque);
}

// -----------------------------------------------------
// FUNÇÃO PARA ATUALIZAR O VALOR DE UM PRODUTO
// (o novo valor SUBSTITUI o valor antigo)
// -----------------------------------------------------
function atualizarValor(codigoProduto, novoValor) {
  if (novoValor < 0) {
    throw new Error("Não é permitido cadastrar um preço negativo");
  }

  const produto = estoque.find((prod) => prod.codigo === codigoProduto);

  if (produto) {
    produto.valor = novoValor;
  } else {
    throw new Error("Não encontramos esse produto no estoque");
  }
}

// -----------------------------------------------------
// FUNÇÃO PARA ATUALIZAR A QUANTIDADE DE UM PRODUTO
// (a nova quantidade é SOMADA ao estoque existente)
// -----------------------------------------------------
function atualizarQuantidade(codigoProduto, novaQuantidade) {
  if (novaQuantidade < 1) {
    throw new Error("A quantidade informada precisa ser maior que zero");
  }

  const produto = estoque.find((prod) => prod.codigo === codigoProduto);

  if (produto) {
    produto.quantidade = produto.quantidade + novaQuantidade;
  } else {
    throw new Error("Produto não cadastrado no estoque");
  }
}

// =====================================================
// TESTES DO SISTEMA
// =====================================================

// Lista vazia no início
listarProdutos();

// Cadastrando produtos da loja de informática
cadastrarProduto("Teclado Redragon", 20, 150);
listarProdutos();

cadastrarProduto("Mouse Logitech", 35, 99);
listarProdutos();

cadastrarProduto("Headset Gamer", 15, 180);
listarProdutos();

// Atualizando o valor do produto de código 2
atualizarValor(2, 89);
listarProdutos();

// Atualizando a quantidade do produto de código 1
atualizarQuantidade(1, 5);
listarProdutos();

// -----------------------------------------------------
// TESTES DE ERRO
// Tire o // da frente de UMA linha por vez para testar.
// -----------------------------------------------------

// cadastrarProduto("TV", 5, 1500);
// cadastrarProduto("Mouse Logitech", 0, 99);
// cadastrarProduto("Teclado Redragon", 12, -150);
// atualizarValor(5, 97);
// atualizarQuantidade(9, 10);
