// 1. Array principal que armazenará os produtos do estoque
let produtos = [];

// 2. Função responsável exclusivamente pelas validações do cadastro
function validarProduto(descricao, quantidade, valor) {
  if (descricao.length < 5) {
    throw new Error("Descrição deve ter, no mínimo, cinco caracteres");
  }
  if (quantidade < 1) {
    throw new Error("Quantidade deve ser maior que zero");
  }
  if (valor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero");
  }
}

// 3. Função para cadastrar um novo produto
function cadastrarProduto(descricao, quantidade, valor) {
  // Executa a validação antes de prosseguir
  validarProduto(descricao, quantidade, valor);

  // Cria o objeto do produto com código gerado automaticamente
  let novoProduto = {
    codigo: produtos.length + 1,
    descricao: descricao,
    quantidade: quantidade,
    valor: valor
  };

  // Adiciona o produto ao array de estoque
  produtos.push(novoProduto);
}

// 4. Função para listar todos os produtos cadastrados
function listarProdutos() {
  console.log(produtos);
}

// 5. Função para atualizar o valor de um produto (substitui o valor antigo)
function atualizarValor(codigoProduto, novoValor) {
  if (novoValor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero");
  }

  const produto = produtos.find((prod) => prod.codigo === codigoProduto);

  if (produto) {
    produto.valor = novoValor;
  } else {
    throw new Error("Produto não encontrado");
  }
}

// 6. Função para atualizar a quantidade de um produto (soma ao estoque existente)
function atualizarQuantidade(codigoProduto, novaQuantidade) {
  if (novaQuantidade < 1) {
    throw new Error("Quantidade deve ser maior que zero");
  }

  const produto = produtos.find((prod) => prod.codigo === codigoProduto);

  if (produto) {
    produto.quantidade = produto.quantidade + novaQuantidade;
  } else {
    throw new Error("Produto não encontrado");
  }
}

// ==========================================
// EXEMPLOS DE USO / TESTES (conforme a aula)
// ==========================================

// Cadastrando produtos
cadastrarProduto("Cadeira gamer", 12, 699);
cadastrarProduto("Mouse Logitech", 38, 99);

// Listando produtos cadastrados
console.log("--- Produtos após cadastro ---");
listarProdutos();

// Atualizando o valor do Mouse Logitech (código 2)
atualizarValor(2, 97);

// Adicionando 3 unidades ao estoque da Cadeira Gamer (código 1)
atualizarQuantidade(1, 3);

// Listando novamente para conferir as alterações
console.log("\n--- Produtos após atualizações ---");
listarProdutos();