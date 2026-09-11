function atualizarQuantidade(codigoProduto, novaQuantidade) {
if (novaQuantidade < 1) {
throw new Error("Quantidade deve ser maior que zero");
}
const produto = produtos.find((prod) => prod.codigo ===
codigoProduto);
if (produto) {
produto.quantidade = produto.quantidade + novaQuantidade;
} else {
throw new Error("Produto não encontrado");
}
}