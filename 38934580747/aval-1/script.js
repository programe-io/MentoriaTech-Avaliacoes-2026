// ==========================================
// 1. ESTRUTURA DE DADOS
// ==========================================

// Array principal para armazenar os produtos do estoque
let produtos = [];

// ==========================================
// 2. FUNÇÕES AUXILIARES / MELHORIAS
// ==========================================


function buscarProdutoPorCodigo(codigoProduto) {
  return produtos.find((prod) => prod.codigo === codigoProduto);
}

// ==========================================
// 3. FUNÇÕES DE VALIDAÇÃO
// ==========================================


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

// ==========================================
// 4. OPERAÇÕES DO SISTEMA (CRUD)
// ==========================================


function cadastrarProduto(descricao, quantidade, valor) {
  // Valida as entradas antes de processar
  validarProduto(descricao, quantidade, valor);

  // Criação do objeto produto
  let novoProduto = {
    codigo: produtos.length + 1,
    descricao: descricao,
    quantidade: quantidade,
    valor: valor
  };

  // Adiciona ao array principal
  produtos.push(novoProduto);
}

/**
 * Exibe no console a lista atual de produtos.
 */
function listarProdutos() {
  console.log("--- Lista de Produtos em Estoque ---");
  console.log(produtos);
}

/**
 * Atualiza o valor monetário (preço) de um produto existente.
 * O valor anterior é substituído pelo novo valor.
 */
function atualizarValor(codigoProduto, novoValor) {
  if (novoValor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero");
  }

  const produto = buscarProdutoPorCodigo(codigoProduto);

  if (produto) {
    produto.valor = novoValor;
  } else {
    throw new Error("Produto não encontrado");
  }
}

/**
 * Atualiza a quantidade em estoque de um produto existente.
 * A nova quantidade é SOMADA à quantidade existente.
 */
function atualizarQuantidade(codigoProduto, novaQuantidade) {
  if (novaQuantidade < 1) {
    throw new Error("Quantidade deve ser maior que zero");
  }

  const produto = buscarProdutoPorCodigo(codigoProduto);

  if (produto) {
    produto.quantidade += novaQuantidade;
  } else {
    throw new Error("Produto não encontrado");
  }
}

// ==========================================
// 5. TESTES E EXECUÇÃO DO PROJETO
// ==========================================

try {
  // 1. Cadastrando produtos
  console.log(">>> Cadastrando 'Cadeira gamer'...");
  cadastrarProduto("Cadeira gamer", 12, 699);

  console.log(">>> Cadastrando 'Mouse Logitech'...");
  cadastrarProduto("Mouse Logitech", 38, 99);

  // 2. Listando o estoque inicial
  listarProdutos();

  // 3. Atualizando o valor de um produto (ex: Mouse Logitech passa de 99 para 97)
  console.log("\n>>> Atualizando valor do produto de código 2...");
  atualizarValor(2, 97);

  // 4. Adicionando estoque a um produto (ex: +3 unidades na Cadeira gamer)
  console.log(">>> Adicionando 3 unidades ao produto de código 1...");
  atualizarQuantidade(1, 3);

  // 5. Listando o estoque atualizado
  listarProdutos();

  
} catch (erro) {
  console.error("Erro no sistema:", erro.message);
}