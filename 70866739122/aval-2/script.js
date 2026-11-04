Posso criar o algoritmo em JavaScript para você, que simula um sistema de estoque de produtos com as funcionalidades pedidas: cadastrar, listar, alterar valor e alterar quantidade. 

Aqui está uma versão básica que roda no console do navegador ou ambiente Node.js. Se quiser, posso explicar como usar ou adaptar para interface gráfica.

```javascript
// Produto representa um item no estoque
class Produto {
  constructor(codigo, descricao, quantidade, preco) {
    this.codigo = codigo;
    this.descricao = descricao;
    this.quantidade = quantidade;
    this.preco = preco;
  }
}

// Estoque armazena e gerencia produtos
class Estoque {
  constructor() {
    this.produtos = [];
  }

  // Cadastrar novo produto
  cadastrarProduto(codigo, descricao, quantidade, preco) {
    if (this.produtos.some(p => p.codigo === codigo)) {
      console.log('Produto com esse código já existe.');
      return;
    }
    const novoProduto = new Produto(codigo, descricao, quantidade, preco);
    this.produtos.push(novoProduto);
    console.log('Produto cadastrado com sucesso.');
  }

  // Listar todos os produtos
  listarProdutos() {
    if (this.produtos.length === 0) {
      console.log('Nenhum produto cadastrado.');
      return;
    }
    console.log('Produtos cadastrados:');
    this.produtos.forEach(p => {
      console.log(`Código: ${p.codigo} | Descrição: ${p.descricao} | Quantidade: ${p.quantidade} | Preço: R$${p.preco.toFixed(2)}`);
    });
  }

  // Alterar preço de um produto pelo código
  alterarPreco(codigo, novoPreco) {
    const produto = this.produtos.find(p => p.codigo === codigo);
    if (!produto) {
      console.log('Produto não encontrado.');
      return;
    }
    produto.preco = novoPreco;
    console.log('Preço alterado com sucesso.');
  }

  // Alterar quantidade de um produto pelo código
  alterarQuantidade(codigo, novaQuantidade) {
    const produto = this.produtos.find(p => p.codigo === codigo);
    if (!produto) {
      console.log('Produto não encontrado.');
      return;
    }
    produto.quantidade = novaQuantidade;
    console.log('Quantidade alterada com sucesso.');
  }
}

// Exemplo de uso:

const estoque = new Estoque();

estoque.cadastrarProduto('001', 'Caneta', 100, 1.50);
estoque.cadastrarProduto('002', 'Caderno', 50, 15.00);
estoque.listarProdutos();

estoque.alterarPreco('001', 1.80);
estoque.alterarQuantidade('002', 60);

estoque.listarProdutos();
```