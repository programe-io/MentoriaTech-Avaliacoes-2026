// =====================================================
// AVALIAÇÃO 1 - SISTEMA DE ESTOQUE EM JAVASCRIPT
// Tema: Loja de Informática
// Ambiente de execução: Programiz
// =====================================================

// Lista que armazena os produtos do estoque
let estoque = [];

// -----------------------------------------------------
// FUNÇÃO PARA VALIDAR OS DADOS DO PRODUTO
// -----------------------------------------------------
function validarProduto(descricao, quantidade, valor) {
  if (descricao.length < 3) {
    throw new Error("A descrição precisa ter pelo menos três caracteres");
  }

  if (quantidade < 1) {
    throw new Error("Informe uma quantidade válida para o produto");
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

  let novoProduto = {
    codigo: estoque.length + 1,
    descricao: descricao,
    quantidade: quantidade,
    valor: valor
  };

  estoque.push(novoProduto);
}

// -----------------------------------------------------
// FUNÇÃO PARA MOSTRAR OS PRODUTOS CADASTRADOS
// -----------------------------------------------------
function listarProdutos() {
  console.log(estoque);
}

// -----------------------------------------------------
// FUNÇÃO PARA ATUALIZAR O VALOR DE UM PRODUTO
// O novo preço substitui o preço anterior
// -----------------------------------------------------
function atualizarValor(codigoProduto, novoValor) {
  if (novoValor < 0) {
    throw new Error("O novo preço deve ser zero ou maior");
  }

  const produto = estoque.find((prod) => prod.codigo === codigoProduto);

  if (produto) {
    produto.valor = novoValor;
  } else {
    throw new Error("Não foi possível localizar esse produto no estoque");
  }
}

// -----------------------------------------------------
// FUNÇÃO PARA ATUALIZAR A QUANTIDADE DE UM PRODUTO
// A nova quantidade é somada ao estoque existente
// -----------------------------------------------------
function atualizarQuantidade(codigoProduto, novaQuantidade) {
  if (novaQuantidade < 1) {
    throw new Error("A quantidade informada precisa ser maior que zero");
  }

  const produto = estoque.find((prod) => prod.codigo === codigoProduto);

  if (produto) {
    produto.quantidade = produto.quantidade + novaQuantidade;
  } else {
    throw new Error("Produto não cadastrado no sistema");
  }
}

// =====================================================
// TESTES DO SISTEMA
// =====================================================

// Exibindo o estoque inicialmente vazio
listarProdutos();

// Cadastrando produtos da loja de informática
cadastrarProduto("Teclado Gamer", 20, 150);
listarProdutos();

cadastrarProduto("Mouse Wireless", 35, 85);
listarProdutos();

cadastrarProduto("Monitor LG", 10, 750);
listarProdutos();

// Alterando o preço do produto de código 2
atualizarValor(2, 79);
listarProdutos();

// Adicionando mais unidades ao produto de código 1
atualizarQuantidade(1, 5);
listarProdutos();

// -----------------------------------------------------
// TESTES DE ERRO
// Retire o // de uma linha por vez para testar.
// -----------------------------------------------------
// cadastrarProduto("TV", 5, 1500); 
// cadastrarProduto("Mouse Wireless", 0, 85);
// cadastrarProduto("Monitor LG", 10, -750);
// atualizarValor(8, 100);
// atualizarQuantidade(9, 10);