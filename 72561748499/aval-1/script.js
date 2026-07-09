// Array que armazena os produtos
const produtos = [];

// Função para validar o produto
function validarProduto(produto) {
  if (produto.nome.length < 3) {
    console.log("O nome deve ter pelo menos 3 caracteres.");
    return false;
  }

  if (produto.descricao.length < 5) {
    console.log("A descrição deve ter pelo menos 5 caracteres.");
    return false;
  }

  if (produto.preco <= 0) {
    console.log("O preço deve ser maior que zero.");
    return false;
  }

  if (produto.quantidade < 0) {
    console.log("A quantidade não pode ser negativa.");
    return false;
  }

  return true;
}

// Função para cadastrar um produto
function adicionarProduto(nome, descricao, preco, quantidade) {
  const produto = {
    nome,
    descricao,
    preco,
    quantidade
  };

  if (validarProduto(produto)) {
    produtos.push(produto);
    console.log("Produto cadastrado com sucesso!");
  }
}

// Função para listar os produtos
function listarProdutos() {
  console.log("=== Lista de Produtos ===");
  produtos.forEach((produto, indice) => {
    console.log(
      `${indice + 1}. ${produto.nome} | ${produto.descricao} | R$ ${produto.preco.toFixed(2)} | Estoque: ${produto.quantidade}`
    );
  });
}

// Exemplo de uso
adicionarProduto("Notebook", "Notebook Dell i5", 3500, 10);
adicionarProduto("Mouse", "Mouse Gamer RGB", 120, 15);

listarProdutos();