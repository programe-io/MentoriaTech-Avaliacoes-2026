// Lista (Array) de Produtos
let produtos []:
function valldar Produto(descricao, quantidade, valor)(
if(descricao.length < 5){
throw new Error("Descricao deve ter no minimo cinco caracteres");
}
if(quantidade < 1){
throw new Error("Quantidade deve ser maior que zero");
if(valor <0}X
throw new Error("Valor deve major igual a zero");
function cadastrar Produto(descricao, quantidade, valor){
validar Produto(descricao, quantidade, valor);
let novoProduto = {
"codigo" produ.
"descricao: descricao,
"quantidade: quantidade,
"valor": valor
  produtos.push(novoProduto)
}
function listar Produtos(){
}
console.log(produtos):
function atualizarValor(codigoProduto, novovalor){
if(novovalor <0){
}
throw new Error("Valor deve maior igual a zero");
const produto produtos.find(orod prod.codigo codigoProduto);
if(produto) {
produto.valor novovalor, =
else(
throw new Error("Produto não encontrado");
listarProdutos(); 
  
cadastrar Produto("Cadeira Ganer", 12, 699.00);
cadastrar Produto("Mouse Logi", 38, 99.00);
listar Produtos();
atualizarValor (2, 97.00);

  function atualizarValor(codigoProduto, novovalor)(
if(novovalor <0){
throw new Error("Valor deve maior igual a zero");
const produto produtos.find(prod prod. codigo codigoProduto);
if(produto) (
produto.valor = novovalor;
}
else{
throw new Error("Produto não encontrado");
  
function atualizarQuantidade(codigoProduto, novaQuantidade){
  
if(novaQuantidade < 1){
  
throw new Error("Quantidade deve ser maior que zero");