// --- LÓGICA EM JAVASCRIPT ---

// 4. Criação da lista de produtos
let produtos = [];

// 6. Função para validar produto
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

// 10. Função para cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
  validarProduto(descricao, quantidade, valor);

  let novoProduto = {
    codigo: produtos.length + 1,
    descricao: descricao,
    quantidade: quantidade,
    valor: valor
  };

  produtos.push(novoProduto);
  return novoProduto;
}

// 14. Função para listar produtos
function listarProdutos() {
  console.log(produtos);
  return produtos;
}

// 16. Função para atualizar o valor do produto
function atualizarValor(codigoProduto, novoValor) {
  if (novoValor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero");
  }

  const produto = produtos.find((prod) => prod.codigo === codigoProduto);

  if (produto) {
    produto.valor = novoValor;
    return produto;
  } else {
    throw new Error("Produto não encontrado");
  }
}

// 19. Função para atualizar a quantidade do produto
function atualizarQuantidade(codigoProduto, novaQuantidade) {
  if (novaQuantidade < 1) {
    throw new Error("Quantidade deve ser maior que zero");
  }

  const produto = produtos.find((prod) => prod.codigo === codigoProduto);

  if (produto) {
    produto.quantidade = produto.quantidade + novaQuantidade;
    return produto;
  } else {
    throw new Error("Produto não encontrado");
  }
}

// --- TESTES DE EXECUÇÃO NO CONSOLE ---
try {
  cadastrarProduto("Cadeira gamer", 12, 699);
  cadastrarProduto("Mouse Logitech", 38, 99);
  
  atualizarValor(2, 97);
  atualizarQuantidade(1, 3);
  
  listarProdutos();
} catch (erro) {
  console.error("Erro no teste:", erro.message);
}// --- LÓGICA EM JAVASCRIPT ---

// 4. Criação da lista de produtos
let produtos = [];

// 6. Função para validar produto
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

// 10. Função para cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
  validarProduto(descricao, quantidade, valor);

  let novoProduto = {
    codigo: produtos.length + 1,
    descricao: descricao,
    quantidade: quantidade,
    valor: valor
  };

  produtos.push(novoProduto);
  return novoProduto;
}

// 14. Função para listar produtos
function listarProdutos() {
  console.log(produtos);
  return produtos;
}

// 16. Função para atualizar o valor do produto
function atualizarValor(codigoProduto, novoValor) {
  if (novoValor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero");
  }

  const produto = produtos.find((prod) => prod.codigo === codigoProduto);

  if (produto) {
    produto.valor = novoValor;
    return produto;
  } else {
    throw new Error("Produto não encontrado");
  }
}

// 19. Função para atualizar a quantidade do produto
function atualizarQuantidade(codigoProduto, novaQuantidade) {
  if (novaQuantidade < 1) {
    throw new Error("Quantidade deve ser maior que zero");
  }

  const produto = produtos.find((prod) => prod.codigo === codigoProduto);

  if (produto) {
    produto.quantidade = produto.quantidade + novaQuantidade;
    return produto;
  } else {
    throw new Error("Produto não encontrado");
  }
}

// --- TESTES DE EXECUÇÃO NO CONSOLE ---
try {
  cadastrarProduto("Cadeira gamer", 12, 699);
  cadastrarProduto("Mouse Logitech", 38, 99);
  
  atualizarValor(2, 97);
  atualizarQuantidade(1, 3);
  
  listarProdutos();
} catch (erro) {
  console.error("Erro no teste:", erro.message);
}