// Array para armazenar os produtos do estoque
const produtos = [];
let proximoCodigo = 1;

// 1. Função para cadastrar um novo produto
function cadastrarProduto(descricao, quantidade, valor) {
  if (quantidade < 0) {
    throw new Error("A quantidade deve ser maior ou igual a zero.");
  }
  if (valor <= 0) {
    throw new Error("O valor deve ser maior que zero.");
  }

  const novoProduto = {
    codigo: proximoCodigo++,
    descricao: descricao,
    quantidade: quantidade,
    valor: valor
  };

  produtos.push(novoProduto);
  return novoProduto;
}

// 2. Função para listar todos os produtos cadastrados
function listarProdutos() {
  console.log("--- Lista de Estoque ---");
  console.log(produtos);
}

// 3. Função para atualizar o valor de um produto pelo código
function atualizarValor(codigoProduto, novoValor) {
  if (novoValor <= 0) {
    throw new Error("O valor deve ser maior que zero.");
  }

  const produto = produtos.find((prod) => prod.codigo === codigoProduto);

  if (produto) {
    produto.valor = novoValor;
  } else {
    throw new Error("Produto não encontrado.");
  }
}

// 4. Função para atualizar a quantidade de um produto pelo código
function atualizarQuantidade(codigoProduto, novaQuantidade) {
  if (novaQuantidade < 0) {
    throw new Error("A quantidade deve ser maior ou igual a zero.");
  }

  const produto = produtos.find((prod) => prod.codigo === codigoProduto);

  if (produto) {
    produto.quantidade = novaQuantidade;
  } else {
    throw new Error("Produto não encontrado.");
  }
}

// --- Execução e Testes ---

// Cadastrando produtos iniciais
cadastrarProduto("Cadeira Gamer", 12, 699);
cadastrarProduto("Mouse Logi", 38, 99);

// Exibindo a lista inicial
listarProdutos();

// Atualizando o valor do Mouse Logi (código 2)
atualizarValor(2, 97);

// Exibindo a lista atualizada
listarProdutos();