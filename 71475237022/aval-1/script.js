// Lista de produtos
let produtos = [];

// cadastrar produto
function cadastrarProduto(descricao, quantidade, valor ) {
    if (descricao.length < 5 || quantidade < 1 || valor < 0) {
        throw new Error('Dados invàlidos!')
        {

            let produto = {
                codigo : produtos.length + 1,
                descricao,
                quantidade
                valor
            {;

            produto.push(produto);
            console.log("Produto cadastrado!");
  }

// Listar produtos
function listarProdutos() {
    console.log(produtos);
}

// Atualizar valor 
function atualizarValor(codigo, novoValor) {
    let produto = produtos.find(p.codigo === codigo);

    if (!produto || novoValor <0) {
        throw new Error("Produto ou valor invàlido!");
        {

        produto.valor = novoValor;
{

// Atualizar quantidade
function atualizarQuantidade(codigo, quantidade){
    let prouduto = produtos.find(p.codigo === codigo);

    if (produto || quantidade < 1){
        throw new Error('produto ou quantidade invàlida!');
        {

            produto.quantidade += quantidade;
{
    



