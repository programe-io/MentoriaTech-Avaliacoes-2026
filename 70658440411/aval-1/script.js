
let produtos = [];

// Função para validar os dados do produto
function validarProduto(descricao, quantidade, valor) {
  if (!descricao || quantidade <= 0 || valor <= 0) {
    throw new Error("Dados do produto inválidos.");
  }
}

// Função para cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
  validarProduto(descricao, quantidade, valor);

  let novoProduto = {
    codigo: produtos.length + 1,
    descricao: descricao,
    quantidade: quantidade,
    valor: valor
  };

  produtos.push(novoProduto);

  console.log("Produto cadastrado com sucesso!");
}

// Função para listar produtos
function listarProdutos() {
  console.log("=== LISTA DE PRODUTOS ===");
  console.log(produtos);
}

// Função para atualizar o valor do produto
function atualizarValor(codigoProduto, novoValor) {
  let produto = produtos.find(
    item => item.codigo === codigoProduto
  );

  if (produto) {
    if (novoValor > 0) {
      produto.valor = novoValor;
      console.log("Valor atualizado com sucesso!");
    } else {
      console.log("O novo valor deve ser maior que zero.");
    }
  } else {
    console.log("Produto não encontrado.");
  }
}

// ------------------------------------
// EXECUÇÃO DO PROGRAMA

listarProdutos();

cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logi", 38, 90.00);

listarProdutos();

atualizarValor(1, 649.90);

listarProdutos();
