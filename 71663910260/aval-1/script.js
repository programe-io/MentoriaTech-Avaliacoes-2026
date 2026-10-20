// ==========================================
// 3. Estrutura dos dados do produto (Classe)
// ==========================================
class Produto {
  constructor(id, descricao, quantidade, valor) {
    this.id = id;
    this.descricao = descricao.trim();
    this.quantidade = quantidade;
    this.valor = valor;
  }

  // Calcula o valor total em estoque deste produto específico
  get valorTotalEstoque() {
    return this.quantidade * this.valor;
  }
}

// ==========================================
// 5. Organização do projeto em funções/métodos
// ==========================================
class GerenciadorProdutos {
  constructor() {
    // 4. Criação da lista de produtos
    this.listaProdutos = [];
    // 12. Geração automática do código do produto
    this.proximoId = 1; 
  }

  // 6. Função para validar produto
  validar(descricao, quantidade, valor) {
    // 7. Validação da descrição
    if (!descricao || typeof descricao !== "string" || descricao.trim() === "") {
      console.error("Erro de Validação: Descrição inválida.");
      return false;
    }
    // 8. Validação da quantidade
    if (typeof quantidade !== "number" || quantidade < 0 || !Number.isInteger(quantidade)) {
      console.error("Erro de Validação: Quantidade deve ser um número inteiro maior ou igual a zero.");
      return false;
    }
    // 9. Validação do valor
    if (typeof valor !== "number" || valor <= 0) {
      console.error("Erro de Validação: Valor deve ser um número maior que zero.");
      return false;
    }
    return true;
  }

  // 10. Função para cadastrar produto
  cadastrar(descricao, quantidade, valor) {
    if (!this.validar(descricao, quantidade, valor)) {
      return null;
    }

    // 11. Criação do objeto produto (Instanciando a classe)
    const novo = new Produto(this.proximoId++, descricao, quantidade, valor);
    
    // 13. Adição de produtos ao array
    this.listaProdutos.push(novo);
    console.log(`Sucesso: "${novo.descricao}" cadastrado com ID #${novo.id}.`);
    return novo;
  }

  // 14. Função para listar produtos
  listar() {
    if (this.listaProdutos.length === 0) {
      console.log("\n--- Nenhum produto em estoque ---");
      return;
    }

    console.log("\n=======================================================");
    console.log("                LISTA DE PRODUTOS                      ");
    console.log("=======================================================");
    this.listaProdutos.forEach(prod => {
      console.log(
        `ID: #${prod.id} | ` +
        `Produto: ${prod.descricao.padEnd(18)} | ` +
        `Qtd: ${String(prod.quantidade).padStart(3)} un | ` +
        `Preço: R$ ${prod.valor.toFixed(2).padStart(7)} | ` +
        `Total: R$ ${prod.valorTotalEstoque.toFixed(2)}`
      );
    });
    console.log("=======================================================\n");
  }

  // 17. Busca de produto com find
  buscarPorId(id) {
    return this.listaProdutos.find(prod => prod.id === id);
  }

  // 16. Função para atualizar o valor do produto
  atualizarValor(id, novoValor) {
    if (typeof novoValor !== "number" || novoValor <= 0) {
      console.error("Erro: Novo valor inválido.");
      return;
    }

    const produto = this.buscarPorId(id);

    // 18. Tratamento de produto não encontrado
    if (!produto) {
      console.error(`Erro: Produto com ID ${id} não encontrado.`);
      return;
    }

    produto.valor = novoValor;
    console.log(`Sucesso: Preço do ID #${id} alterado para R$ ${novoValor.toFixed(2)}.`);
  }

  // 19. Função para atualizar a quantidade do produto
  // 20. Diferença entre alterar valor e somar quantidade
  adicionarQuantidade(id, quantidadeEntrada) {
    if (typeof quantidadeEntrada !== "number" || quantidadeEntrada <= 0 || !Number.isInteger(quantidadeEntrada)) {
      console.error("Erro: Quantidade de entrada deve ser um inteiro maior que zero.");
      return;
    }

    const produto = this.buscarPorId(id);

    if (!produto) {
      console.error(`Erro: Produto com ID ${id} não encontrado.`);
      return;
    }

    // Somando a quantidade atual à nova quantidade inserida
    produto.quantidade += quantidadeEntrada; 
    console.log(`Sucesso: Adicionadas ${quantidadeEntrada} un ao ID #${id}. Total: ${produto.quantidade} un.`);
  }
}

// ==========================================
// 15. Testando o cadastro e a listagem
// ==========================================

const sistema = new GerenciadorProdutos();

console.log("--- Executando Testes de Cadastro ---");
sistema.cadastrar("Monitor LG 29'", 8, 1200.00);
sistema.cadastrar("Cadeira Gamer", 5, 950.00);
sistema.cadastrar("Headset HyperX", 15, 349.90);

// Testando validação com dado incorreto (deve exibir erro no console)
sistema.cadastrar("Teclado", -2, 150); 

// Primeira listagem
sistema.listar();

console.log("--- Executando Testes de Atualização ---");
// Atualizando preço do monitor (ID 1)
sistema.atualizarValor(1, 1149.90); 

// Somando estoque de fones (ID 3)
sistema.adicionarQuantidade(3, 10); 

// Testando ID inexistente (deve exibir tratamento de erro)
sistema.atualizarValor(99, 50.00); 

// Listagem final com os dados modificados
sistema.listar();
