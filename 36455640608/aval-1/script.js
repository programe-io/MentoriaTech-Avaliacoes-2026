// Simula o banco de dados de estoque em memória
let estoque = [];

// Busca um produto pelo código
function buscarProduto(codigo) {
  return estoque.find(p => p.codigo.toLowerCase() === codigo.toLowerCase());
}

// 1. Cadastrar novo produto
function cadastrarProduto(codigo, descricao, quantidade, valor) {
  if (!codigo || !descricao || isNaN(quantidade) || isNaN(valor)) {
    console.log("Erro: dados inválidos.");
    return;
  }

  if (buscarProduto(codigo)) {
    console.log("Erro: já existe um produto com esse código.");
    return;
  }

  estoque.push({ codigo, descricao, quantidade, valor });
  console.log(`Produto "${descricao}" cadastrado com sucesso!`);
}

// 2. Listar produtos cadastrados
function listarProdutos() {
  console.log("\n---- ESTOQUE ATUAL ----");
  if (estoque.length === 0) {
    console.log("Nenhum produto cadastrado.");
    return;
  }

  estoque.forEach(p => {
    console.log(
      `Código: ${p.codigo} | Descrição: ${p.descricao} | Quantidade: ${p.quantidade} | Valor: R$ ${p.valor.toFixed(2)}`
    );
  });
  console.log("------------------------\n");
}

// 3. Alterar valor de um produto
function alterarValor(codigo, novoValor) {
  const produto = buscarProduto(codigo);
  if (!produto) {
    console.log("Erro: produto não encontrado.");
    return;
  }
  if (isNaN(novoValor)) {
    console.log("Erro: valor inválido.");
    return;
  }

  produto.valor = novoValor;
  console.log(`Valor de "${produto.descricao}" atualizado para R$ ${novoValor.toFixed(2)}.`);
}

// 4. Alterar quantidade de um produto
function alterarQuantidade(codigo, novaQuantidade) {
  const produto = buscarProduto(codigo);
  if (!produto) {
    console.log("Erro: produto não encontrado.");
    return;
  }
  if (isNaN(novaQuantidade)) {
    console.log("Erro: quantidade inválida.");
    return;
  }

  produto.quantidade = novaQuantidade;
  console.log(`Quantidade de "${produto.descricao}" atualizada para ${novaQuantidade}.`);
}

// ---- Exemplo de uso ----
cadastrarProduto("P001", "Caneta azul", 50, 2.50);
cadastrarProduto("P002", "Caderno 100 folhas", 20, 12.90);

listarProdutos();

alterarValor("P001", 3.00);
alterarQuantidade("P002", 15);

listarProdutos();

