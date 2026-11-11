// Lista (array) de Produtos
let produtos = [];

function validarProduto(descricao, quantidade, valor) {
  if (descricao.length < 5) {
    throw new Error("Descricao deve ter no minimo cinco caracteres");
  }

  if (quantidade < 1) {
    throw new Error("Quantidade deve ser maior que zero");
  }

  if (valor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero");
  }
}

function cadastrarProduto(descricao, quantidade, valor) {
  validarProduto(descricao, quantidade, valor);

  let novoProduto = {
    codigo: produtos.length + 1,
    descricao: descricao,
    quantidade: quantidade,
    valor: valor,
  };

  produtos.push(novoProduto);
}

function listarProdutos() {
  console.log(produtos);