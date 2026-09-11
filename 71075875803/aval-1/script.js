// ==========================================
// 1. ESTRUTURA DE DADOS (Estado da Aplicação)
// ==========================================
let produtos = [];

// ==========================================
// 2. FUNÇÕES AUXILIARES E VALIDAÇÕES
// ==========================================

// Função auxiliar para buscar produto por código (Evita repetição de código)
function buscarProdutoPorCodigo(codigoProduto) {
  return produtos.find((prod) => prod.codigo === codigoProduto);
}

// Validações individuais para maior reutilização
function validarDescricao(descricao) {
  if (!descricao || descricao.length < 5) {
    throw new Error("A descrição deve ter, no mínimo, 5 caracteres.");
  }
}

function validarQuantidade(quantidade) {
  if (typeof quantidade !== "number" || quantidade < 1) {
    throw new Error("A quantidade deve ser um número maior que zero.");
  }
}

function validarValor(valor) {
  if (typeof valor !== "number" || valor < 0) {
    throw new Error("O valor deve ser um número maior ou igual a zero.");
  }
}

// Função principal de validação para novos cadastros
function validarProduto(descricao, quantidade, valor) {
  validarDescricao(descricao);
  validarQuantidade(quantidade);
  validarValor(valor);
}

// ==========================================
// 3. OPERAÇÕES DO SISTEMA (CRUD / Estoque)
// ==========================================

/**
 * Cadastra um novo produto no estoque.
 * Gera o ID/Código automaticamente com base na extensão do array.
 */
function cadastrarProduto(descricao, quantidade, valor) {
  validarProduto(descricao, quantidade, valor);

  const novoProduto = {
    codigo: produtos.length + 1,
    descricao: descricao,
    quantidade: quantidade,
    valor: valor,
  };

  produtos.push(novoProduto);
  console.log(`✅ Produto "${descricao}" cadastrado com sucesso! (Código: ${novoProduto.codigo})`);
}

/**
 * Exibe a lista completa de produtos cadastrados.
 */
function listarProdutos() {
  console.log("\n--- 📦 LISTA DE PRODUTOS EM ESTOQUE ---");
  if (produtos.length === 0) {
    console.log("Nenhum produto cadastrado no momento.");
    return;
  }
  
  console.table(produtos); // 'console.table' exibe os dados em formato tabular amigável
}

/**
 * Atualiza (substitui) o valor unitário de um produto.
 */
function atualizarValor(codigoProduto, novoValor) {
  validarValor(novoValor);

  const produto = buscarProdutoPorCodigo(codigoProduto);

  if (!produto) {
    throw new Error(`Produto com código ${codigoProduto} não foi encontrado.`);
  }

  const valorAntigo = produto.valor;
  produto.valor = novoValor;
  
  console.log(`💲 Valor do produto [${produto.descricao}] atualizado: R$ ${valorAntigo} ➔ R$ ${novoValor}`);
}

/**
 * Adiciona/Soma unidades ao estoque de um produto existente.
 */
function atualizarQuantidade(codigoProduto, quantidadeAdicional) {
  validarQuantidade(quantidadeAdicional);

  const produto = buscarProdutoPorCodigo(codigoProduto);

  if (!produto) {
    throw new Error(`Produto com código ${codigoProduto} não foi encontrado.`);
  }

  produto.quantidade += quantidadeAdicional;
  console.log(`📥 Estoque atualizado! [${produto.descricao}]: +${quantidadeAdicional} un. (Total: ${produto.quantidade})`);
}

// ==========================================
// 4. BATERIA DE TESTES E DEMONSTRAÇÃO
// ==========================================

console.log("=== INICIANDO TESTES DO SISTEMA DE ESTOQUE ===");

try {
  // --- Cadastros Com Sucesso ---
  cadastrarProduto("Cadeira gamer", 12, 699.00);
  cadastrarProduto("Mouse Logitech", 38, 99.00);
  cadastrarProduto("Teclado Mecânico RGB", 15, 250.50);

  // Exibe a lista atual
  listarProdutos();

  // --- Atualizações Válidas ---
  console.log("\n--- Efetuando Alterações ---");
  atualizarValor(2, 89.90);          // Altera valor do Mouse Logitech (código 2)
  atualizarQuantidade(1, 3);          // Soma +3 unidades à Cadeira Gamer (código 1)

  // Exibe a lista atualizada
  listarProdutos();

  // --- Testando Tratamento de Erros (Descomente para testar cada um) ---
  console.log("\n--- Testando Validações de Erro ---");
  
  // 1. Erro na descrição curta
  // cadastrarProduto("TV", 5, 1200); 

  // 2. Erro no valor negativo
  // atualizarValor(1, -50); 

  // 3. Erro de produto inexistente
  // atualizarQuantidade(99, 5);

} catch (error) {
  console.error(`\n❌ ERRO DETECTADO: ${error.message}`);
}