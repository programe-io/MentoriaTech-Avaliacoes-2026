// ==========================================
// Sistema de Controle de Estoque (JavaScript)
// ==========================================

// Array principal que simula o banco de dados do estoque
const estoque = [];

/**
 * 1. Cadastrar um novo produto
 * @param {number} codigo 
 * @param {string} descricao 
 * @param {number} quantidade 
 * @param {number} valor 
 */
function cadastrarProduto(codigo, descricao, quantidade, valor) {
  // Verifica se o produto já existe pelo código
  const produtoExistente = estoque.find(p => p.codigo === codigo);
  if (produtoExistente) {
    console.log(`Erro: Já existe um produto cadastrado com o código ${codigo}.`);
    return false;
  }

  // Cria o objeto produto e adiciona ao array
  const novoProduto = {
    codigo: codigo,
    descricao: descricao,
    quantidade: quantidade,
    valor: valor
  };

  estoque.push(novoProduto);
  console.log(`Produto "${descricao}" cadastrado com sucesso!`);
  return true;
}

/**
 * 2. Listar os produtos cadastrados
 */
function listarProdutos() {
  if (estoque.length === 0) {
    console.log("O estoque está vazio.");
    return;
  }

  console.log("--- LISTA DE PRODUTOS NO ESTOQUE ---");
  estoque.forEach(produto => {
    console.log(`Código: ${produto.codigo} | Descrição: ${produto.descricao} | Qtd: ${produto.quantidade} | Valor: R$ ${produto.valor.toFixed(2)}`);
  });
  console.log("-------------------------------------");
}

/**
 * 3. Alterar o valor de um produto
 * @param {number} codigo 
 * @param {number} novoValor 
 */
function alterarValorProduto(codigo, novoValor) {
  const produto = estoque.find(p => p.codigo === codigo);
  
  if (!produto) {
    console.log(`Erro: Produto com código ${codigo} não encontrado.`);
    return false;
  }

  if (novoValor < 0) {
    console.log("Erro: O valor não pode ser negativo.");
    return false;
  }

  produto.valor = novoValor;
  console.log(`Valor do produto "${produto.descricao}" atualizado para R$ ${novoValor.toFixed(2)}.`);
  return true;
}

/**
 * 4. Alterar a quantidade de um produto
 * @param {number} codigo 
 * @param {number} novaQuantidade 
 */
function alterarQuantidadeProduto(codigo, novaQuantidade) {
  const produto = estoque.find(p => p.codigo === codigo);
  
  if (!produto) {
    console.log(`Erro: Produto com código ${codigo} não encontrado.`);
    return false;
  }

  if (novaQuantidade < 0) {
    console.log("Erro: A quantidade não pode ser negativa.");
    return false;
  }

  produto.quantidade = novaQuantidade;
  console.log(`Quantidade do produto "${produto.descricao}" atualizada para ${novaQuantidade}.`);
  return true;
}

// ==========================================
// Exemplo de Uso (Teste no Console)
// ==========================================

// Cadastrando produtos
cadastrarProduto(1, "Caderno 10 Matérias", 50, 22.50);
cadastrarProduto(2, "Caneta Azul", 200, 2.00);

// Listando produtos
listarProdutos();

// Alterando a quantidade do produto com código 1
alterarQuantidadeProduto(1, 45);

// Alterando o valor do produto com código 2
alterarValorProduto(2, 2.50);

// Listando novamente para ver as atualizações
listarProdutos();