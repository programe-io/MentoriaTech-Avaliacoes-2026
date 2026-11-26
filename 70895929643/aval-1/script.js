
// AVALIAÇÃO 1 - PROJETO CRUD E ESTOQUE EM JAVASCRIPT
// Tema: Loja de informática
// Ambiente de execução: Programiz

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
    throw new Error("Informe uma quantidade válida");
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
// FUNÇÃO PARA LISTAR OS PRODUTOS CADASTRADOS
// -----------------------------------------------------
function listarProdutos() {
  console.log(estoque);
}

// -----------------------------------------------------
// FUNÇÃO PARA ATUALIZAR O VALOR DE UM PRODUTO
// O novo valor SUBSTITUI o valor antigo
// -----------------------------------------------------
function atualizarValor(codigoProduto, novoValor) {
  if (novoValor < 0) {
    throw new Error("O preço informado deve ser zero ou positivo");
  }

  const item = estoque.find((prod) => prod.codigo === codigoProduto);

  if (item) {
    item.valor = novoValor;
  } else {
    throw new Error("Não foi possível localizar esse produto");
  }
}

// -----------------------------------------------------
// FUNÇÃO PARA ATUALIZAR A QUANTIDADE DE UM PRODUTO
// A nova quantidade é SOMADA ao estoque existente
// -----------------------------------------------------
function atualizarQuantidade(codigoProduto, novaQuantidade) {
  if (novaQuantidade < 1) {
    throw new Error("A quantidade precisa ser maior que zero");
  }

  const item = estoque.find((prod) => prod.codigo === codigoProduto);

  if (item) {
    item.quantidade = item.quantidade + novaQuantidade;
  } else {
    throw new Error("Não existe produto com esse código");
  }
}

// =====================================================
// TESTES DO SISTEMA
// =====================================================

// Lista vazia no início
listarProdutos();

// Cadastrando produtos da loja de informática
cadastrarProduto("Notebook Lenovo", 10, 2500);
listarProdutos();

cadastrarProduto("Teclado gamer", 20, 150);
listarProdutos();

// Atualizando o valor do produto de código 2
atualizarValor(2, 130);
listarProdutos();

// Atualizando a quantidade do produto de código 1
atualizarQuantidade(1, 5);
listarProdutos();

// -----------------------------------------------------
// TESTES DE ERRO
// Tire o // da frente de UMA linha por vez para testar.
// -----------------------------------------------------
// cadastrarProduto("TV", 5, 1500);              // descrição muito curta
// cadastrarProduto("Mouse", 0, 99);             // quantidade inválida
// cadastrarProduto("Notebook", 12, -699);       // valor negativo
// atualizarValor(5, 97);                        // produto não encontrado
// atualizarQuantidade(9, 10);                   // produto não encontrado
