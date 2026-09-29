// ==========================================
// CLASSE E GERENCIADOR DE ESTOQUE (JS)
// ==========================================

class Produto {
  constructor(codigo, descricao, quantidade, valor) {
    this.codigo = codigo;
    this.descricao = descricao;
    this.quantidade = quantidade;
    this.valor = valor;
  }
}

class GerenciadorEstoque {
  constructor() {
    this.produtos = [];
    this.proximoCodigo = 1;
  }

  // 1. Cadastrar produto com validação
  cadastrarProduto(descricao, quantidade, valor) {
    if (quantidade < 0) {
      throw new Error("A quantidade deve ser maior ou igual a zero.");
    }
    if (valor <= 0) {
      throw new Error("O valor deve ser maior que zero.");
    }

    const novoProduto = new Produto(
      this.proximoCodigo++,
      descricao,
      quantidade,
      valor
    );

    this.produtos.push(novoProduto);
    return novoProduto;
  }

  // 2. Listar produtos formatados
  listarProdutos() {
    console.log("--- Lista de Estoque ---");
    if (this.produtos.length === 0) {
      console.log("Nenhum produto cadastrado.");
      return;
    }

    this.produtos.forEach((p) => {
      console.log(
        `[#${p.codigo}] ${p.descricao} - Qtd: ${p.quantidade} | R$ ${p.valor.toFixed(2)}`
      );
    });
    console.log("");
  }

  // 3. Atualizar valor pelo código
  atualizarValor(codigoProduto, novoValor) {
    if (novoValor <= 0) {
      throw new Error("O valor deve ser maior que zero.");
    }

    const produto = this.produtos.find((prod) => prod.codigo === codigoProduto);

    if (produto) {
      produto.valor = novoValor;
    } else {
      throw new Error("Produto não encontrado.");
    }
  }

  // 4. Atualizar quantidade pelo código
  atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 0) {
      throw new Error("A quantidade deve ser maior ou igual a zero.");
    }

    const produto = this.produtos.find((prod) => prod.codigo === codigoProduto);

    if (produto) {
      produto.quantidade = novaQuantidade;
    } else {
      throw new Error("Produto não encontrado.");
    }
  }
}

// ==========================================
// EXECUÇÃO E TESTES
// ==========================================

const estoque = new GerenciadorEstoque();

try {
  // Lista inicial vazia
  estoque.listarProdutos();

  // Cadastrando itens
  estoque.cadastrarProduto("Cadeira Gamer", 12, 699.00);
  estoque.cadastrarProduto("Mouse Logi", 38, 99.00);

  // Exibindo produtos após cadastro
  estoque.listarProdutos();

  // Atualizações de teste
  estoque.atualizarValor(2, 97.00);
  estoque.atualizarQuantidade(1, 10);

  // Exibindo resultado final
  estoque.listarProdutos();

} catch (erro) {
  console.error("Erro na operação:", erro.message);
}