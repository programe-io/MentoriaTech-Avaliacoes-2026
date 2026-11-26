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
    throw new Error("A descrição precisa ter pelo menos 3 caracteres.");
  }

  if (quantidade < 1) {
    throw new Error("Informe uma quantidade igual ou superior a 1.");
  }

  if (valor < 0) {
    throw new Error("O valor do produto não pode ser negativo.");
  }
}

// -----------------------------------------------------
// FUNÇÃO PARA CADASTRAR UM NOVO PRODUTO
// -----------------------------------------------------
function cadastrarProduto(descricao, quantidade, valor) {
  validarProduto(descricao, quantidade, valor);

  let novoItem = {
    codigo: estoque.length + 1, // código gerado automaticamente
    descricao: descricao,
    quantidade: quantidade,
    valor: valor
  };

  estoque.push(novoItem);
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
    throw new Error("Não é permitido cadastrar um valor negativo.");
  }

  const produto = estoque.find((item) => item.codigo === codigoProduto);

  if (produto) {
    produto.valor = novoValor;
  } else {
    throw new Error("Não foi encontrado nenhum produto com esse código.");
  }
}

// -----------------------------------------------------
// FUNÇÃO PARA ATUALIZAR A QUANTIDADE DE UM PRODUTO
// (a nova quantidade é SOMADA ao estoque existente)
// -----------------------------------------------------
function atualizarQuantidade(codigoProduto, novaQuantidade) {
  if (novaQuantidade < 1) {
    throw new Error("A quantidade adicionada precisa ser maior que zero.");
  }

  const produto = estoque.find((item) => item.codigo === codigoProduto);

  if (produto) {
    produto.quantidade = produto.quantidade + novaQuantidade;
  } else {
    throw new Error("Não existe produto cadastrado com esse código.");
  }
}

// =====================================================
// TESTES DO SISTEMA
// =====================================================

// Exibindo o estoque inicialmente vazio
listarProdutos();

// Cadastrando produtos da loja de informática
cadastrarProduto("Teclado Redragon", 20, 150);
listarProdutos();

cadastrarProduto("Mouse Logitech", 35, 89);
listarProdutos();

cadastrarProduto("Headset Havit", 12, 129);
listarProdutos();

// Atualizando o valor do produto de código 2 (substitui o valor)
atualizarValor(2, 95);
listarProdutos();

// Atualizando a quantidade do produto de código 1 (soma ao estoque)
atualizarQuantidade(1, 5);
listarProdutos();

// -----------------------------------------------------
// TESTES DE ERRO
// Tire o // da frente de UMA linha por vez para testar.
// Cada uma interrompe o programa com uma mensagem de erro.
// -----------------------------------------------------

// cadastrarProduto("TV", 5, 1500);              // descrição muito curta
// cadastrarProduto("Mouse", 0, 99);             // quantidade inválida
// cadastrarProduto("Teclado", 12, -150);        // valor negativo
// atualizarValor(9, 97);                        // produto não encontrado
// atualizarQuantidade(10, 5);                   // produto não encontrado