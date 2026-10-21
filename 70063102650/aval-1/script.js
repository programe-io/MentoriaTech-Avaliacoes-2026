// Array para armazenar os produtos
const produtos = [];
// Função para cadastrar um novo produto
function cadastrarProduto(codigo, descricao, quantidade, valor) {
  // Verifica se o código já existe
  const existe = produtos.some(prod => prod.codigo === codigo);
  if (existe) {
    console.log('Produto com esse código já existe.');
    return;
  }
  const produto = {
    codigo,
    descricao,
    quantidade,
    valor,
  };
  produtos.push(produto);
  console.log('Produto cadastrado com sucesso.');
}
// Função para listar os produtos
function listarProdutos() {
  if (produtos.length === 0) {
    console.log('Nenhum produto cadastrado.');
    return;
  }
  console.log('Produtos cadastrados:');
  produtos.forEach(prod => {
    console.log(`Código: ${prod.codigo}, Descrição: ${prod.descricao}, Quantidade: ${prod.quantidade}, Valor: R$${prod.valor.toFixed(2)}`);
  });
}
// Função para alterar o valor de um produto
function alterarValorProduto(codigo, novoValor) {
  const produto = produtos.find(prod => prod.codigo === codigo);
  if (!produto) {
    console.log('Produto não encontrado.');
    return;
  }
  produto.valor = novoValor;
  console.log('Valor do produto atualizado.');
}
// Função para alterar a quantidade de um produto
function alterarQuantidadeProduto(codigo, novaQuantidade) {
  const produto = produtos.find(prod => prod.codigo === codigo);
  if (!produto) {
    console.log('Produto não encontrado.');
    return;
  }
  produto.quantidade = novaQuantidade;
  console.log('Quantidade do produto atualizada.');
}
// Exemplo de uso:
cadastrarProduto('001', 'Camiseta', 10, 29.90);
cadastrarProduto('002', 'Calça', 5, 79.90);
listarProdutos();
alterarValorProduto('001', 34.90);
alterarQuantidadeProduto('002', 7);
listarProdutos();
