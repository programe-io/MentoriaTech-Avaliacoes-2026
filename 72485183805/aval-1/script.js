// =====================================================
// AVALIAÇÃO 1 - PROJETO CRUD E ESTOQUE EM JAVASCRIPT
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
    throw new Error("A quantidade precisa ser maior que zero");
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
    throw new Error("O preço informado não pode ser negativo");
  }

  const produto = estoque.find((prod) => prod.codigo === codigoProduto);

  if (produto) {
    produto.valor = novoValor;
  } else {
    throw new Error("Não foi possível encontrar esse produto no estoque");
  }
}

// -----------------------------------------------------
// FUNÇÃO PARA ATUALIZAR A QUANTIDADE DE UM PRODUTO
// (a nova quantidade é SOMADA ao estoque existente)
// -----------------------------------------------------
function atualizarQuantidade(codigoProduto, novaQuantidade) {
  if (novaQuantidade < 1) {
    throw new Error("Informe uma quantidade maior que zero");
  }

  const produto = estoque.find((prod) => prod.codigo === codigoProduto);

  if (produto) {
    produto.quantidade = produto.quantidade + novaQuantidade;
  } else {
    throw new Error("Produto não localizado no cadastro");
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

cadastrarProduto("Monitor Samsung", 10, 850);
listarProdutos();

cadastrarProduto("Headset Gamer", 15, 120);
listarProdutos();

// Atualizando o valor do produto de código 2
// O novo valor substitui o valor antigo
atualizarValor(2, 799);
listarProdutos();

// Atualizando a quantidade do produto de código 1
// A nova quantidade é somada ao estoque existente
atualizarQuantidade(1, 5);
listarProdutos();

// -----------------------------------------------------
// TESTES DE ERRO
// Tire o // da frente de UMA linha por vez para testar.
// Cada uma interrompe o programa com uma mensagem de erro.
// -----------------------------------------------------

// cadastrarProduto("TV", 5, 1500);             // descrição muito curta
// cadastrarProduto("Mouse", 0, 99);            // quantidade inválida
// cadastrarProduto("Notebook", 12, -699);      // valor negativo
// atualizarValor(10, 97);                      // produto não encontrado
// atualizarQuantidade(15, 10);                 // produto não encontrado
