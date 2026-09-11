class Estoque {
  constructor() {
    this.produtos = [];
  }

  // Cadastrar um novo produto
  cadastrarProduto(codigo, descricao, quantidade, valor) {
    const produtoExiste = this.produtos.some(p => p.codigo === codigo);
    if (produtoExiste) {
      console.log(`Erro: Já existe um produto com o código ${codigo}.`);
      return;
    }
    
    this.produtos.push({ codigo, descricao, quantidade, valor });
    console.log(`Produto "${descricao}" cadastrado com sucesso!`);
  }

  // Listar os produtos cadastrados
  listarProdutos() {
    if (this.produtos.length === 0) {
      console.log("O estoque está vazio.");
      return;
    }

    console.log("\n--- LISTA DE PRODUTOS NO ESTOQUE ---");
    this.produtos.forEach(p => {
      console.log(`Código: ${p.codigo} | Descrição: ${p.descricao} | Qtd: ${p.quantidade} | Valor: R$ ${p.valor.toFixed(2)}`);
    });
    console.log("------------------------------------\n");
  }

  // Alterar o valor de um produto
  alterarValor(codigo, novoValor) {
    const produto = this.produtos.find(p => p.codigo === codigo);
    if (!produto) {
      console.log(`Erro: Produto com código ${codigo} não encontrado.`);
      return;
    }

    produto.valor = novoValor;
    console.log(`Valor do produto "${produto.descricao}" atualizado para R$ ${novoValor.toFixed(2)}.`);
  }

  // Alterar a quantidade de um produto
  alterarQuantidade(codigo, novaQuantidade) {
    const produto = this.produtos.find(p => p.codigo === codigo);
    if (!produto) {
      console.log(`Erro: Produto com código ${codigo} não encontrado.`);
      return;
    }

    produto.quantidade = novaQuantidade;
    console.log(`Quantidade do produto "${produto.descricao}" atualizada para ${novaQuantidade}.`);
  }
}

// ==========================================
// Exemplo de Uso do Sistema
// ==========================================

const meuEstoque = new Estoque();

// 1. Cadastrando produtos
meuEstoque.cadastrarProduto(101, "Camiseta Algodão", 50, 39.90);
meuEstoque.cadastrarProduto(102, "Calça Jeans", 25, 119.90);
meuEstoque.cadastrarProduto(103, "Tênis Esportivo", 15, 249.99);

// 2. Listando os produtos
meuEstoque.listarProdutos();

// 3. Alterando o valor de um produto (Camiseta para R$ 45.00)
meuEstoque.alterarValor(101, 45.00);

// 4. Alterando a quantidade de um produto (Tênis para 10 unidades)
meuEstoque.alterarQuantidade(103, 10);

// Listando novamente para conferir as alterações
meuEstoque.listarProdutos();