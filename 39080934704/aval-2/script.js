// 4. Criação da lista de produtos
let produtos = [];

// 6. Função para validar produto
function validarProduto(descricao, quantidade, valor) {
  // 7. Validação da descrição
  if (descricao.length < 5) {
    throw new Error("Descrição deve ter, no mínimo, cinco caracteres");
  }

  // 8. Validação da quantidade
  if (quantidade < 1) {
    throw new Error("Quantidade deve ser maior que zero");
  }

  // 9. Validação do valor
  if (valor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero");
  }
}

// 10. Função para cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
  validarProduto(descricao, quantidade, valor);

  // 11. Criação do objeto produto
  // 12. Geração automática do código
  let novoProduto = {
    codigo: produtos.length + 1,
    descricao: descricao,
    quantidade: quantidade,
    valor: valor
  };

  // 13. Adição de produtos ao array
  produtos.push(novoProduto);
}

// 14. Função para listar produtos
function listarProdutos() {
  for (let produto of produtos) {
    console.log(
      `Código: ${produto.codigo} | Descrição: ${produto.descricao} | Quantidade: ${produto.quantidade} | Valor: R$ ${produto.valor}`
    );
  }
}

// 17. Busca de produto por código
function buscarProduto(codigoProduto) {
  let produto = produtos.find(function (p) {
    return p.codigo === codigoProduto;
  });

  // 18. Tratamento de produto não encontrado
  if (!produto) {
    throw new Error("Produto não encontrado");
  }

  return produto;
}

// 15 / 19 / 20. Função para atualizar o valor do produto
// Aqui ALTERA o valor, não soma
function atualizarValor(codigoProduto, novoValor) {
  if (novoValor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero");
  }

  let produto = buscarProduto(codigoProduto);
  produto.valor = novoValor;
}

// 19 / 20. Função para atualizar a quantidade do produto
// Aqui ALTERA a quantidade, não soma
function atualizarQuantidade(codigoProduto, novaQuantidade) {
  if (novaQuantidade < 1) {
    throw new Error("Quantidade deve ser maior que zero");
  }

  let produto = buscarProduto(codigoProduto);
  produto.quantidade = novaQuantidade;
}

// 15. Testando o cadastro e a listagem
try {
  cadastrarProduto("Mouse Logitech", 38, 99);
  cadastrarProduto("Cadeira gamer", 12, 699);
  cadastrarProduto("Teclado mecânico", 20, 350);

  listarProdutos();

  console.log("--- Atualizando ---");
  atualizarValor(1, 119);
  atualizarQuantidade(2, 10);

  listarProdutos();

} catch (erro) {
  // 16. Tratamento de erro na listagem / cadastro
  console.log("Erro: " + erro.message);
}