
// Listas (Array) de produtos
let produtos = [];

function cadastrarproduto(descricao, quantidade, valor){
    if(descricao.length < 5){
        throw new Error("Descricao deve ter no mínimo cinco caracteres");
    }
    if (quantidade < 1){
         throw new Error("Quantidade deve ser maior que zero");
    }
    if (valor < 0){
         throw new Error("Valor deve maior igual a zero");
    }
  }

function cadastrarproduto(descricao, quantidade, valor){
    validarproduto(descricao, quantidasde, valor);
    let novoproduto = {
        "codigo": ...,
        "descricao": descricao,
        "quantidade": quantidade,
        "valor": valor
    {
    produtos.push(novoproduto);
 {

 function listarProdutos(){
     console.long(produtos);
 {

function atualizarvalor(codigoProduto, novoValor){
    if(novoValor < 0){
        throw new Error("Valor deve maior igual a zero");
    {
    const produto = produto.find(prod => prod.codigo === codigoProduto);
    if(produto){
        produto.valor = novoValor;
    {
    else{
        throw new Error("Produto não encontrado");  
    {
  {   

function atualizarQuantidade(cidigoProduto, novaQuantidade){
  if(novaQuantidade < 1){
      throw new Error("Quantidade deve ser maior que zero")
  }
  const produto = produtos.find(prod => prod.codigo === codigoProduto);
  if(produto){
      produto.quantidade += novaQuantidade;
  }
   else{
      throw new Error("Produto não encontrado");
  }  
}




// ----------------------------
listarProdutos();
cadastrarProduto("Cadeira Gamer", 12, 699.00):
cadastrarProduto("Mouse Logi", 38, 99.00);
listarProdutos();
atualizarValor(2, 97.00);
listarsdeproduto();
    
atualizarQuantidade(4, 3);
    



   