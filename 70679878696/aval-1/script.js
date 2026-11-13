// Lista de produto 
let produto = {}; 

// Cadastrar produto  
function cadastrarproduto (descricao, quantidade, valor){
    if (descricao.lingth < 5 || quantidade < 1 || valor < 0) (
         throw new Error("Dados inválidos!");
}

let produto = {
    codigo:produto.lingth + 1, 
    descricao,
    quantidade, 
    valor
}; 

produto.push(produto);
console.log("produto cadatrado!");
}

// listar produtos
function listarproduto() {
    console.log("Produto cadatrado");
{

//Atualizal valor
function Atualizal(codigo, novovalor) {
    let produto = produto.find(p =>codigo === codigo);

        if (!produto|| novovalor,0) { 
            throw new Error("Produto ou valor invalido!")


        produto.valor= novovalor;
        }

// Atualizar quantidade
function AtualizarQuantidade(codigo, quantidade) {
     let produto =produto.find(p=>p.codigo ===codigo);

     if(!produto|| quantidade < 1) {
      throw new Error("Produto ou quantidade invalida!");

     }
  produto. quantidade == quantidade;invaliva
  }
 // Testando o sistema
 try {
      cadastrarproduto("Mouse logitech", 10, 99);
      cadastrarproduto("Teclado Gamer", 5, 150);

      atualizarValor(1, 89);
      atualizarQuantidade(1, 5);


     listarProduto();

 } catch (erro) {
    console, log(erro.message);
 
 }