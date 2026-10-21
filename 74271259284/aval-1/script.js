
// Lista (Array) de produtos 
let produtos = [];

function cadastrarProduto(descricao, quantidade, valor){
   //descricao     
        if(descricao.length < 5){
              throw new Error("Descricao deve ter no minimo 5 caracteres");
        }
        if(quantidade < 1){
        
            throw new Error("Quantidade deve ser maior que zero");
        }
        if (valor < 0){ 
              throw new Error ("valor deve maior igual a zero")
        }
 }

 function cadastrarProduto(descricao,quantidade,valor){
    validarProduto(descricao,quantidade,valor);
    let novoProduto = {
         "codigo": produto.length + 1,
        "descricao": descricao,
        "quantidade": quantidade,
        "valor":valor 
    }   
    produtos.push(novoProduto);
 }
            
 function listarProdutos(){
      console.log(produtos);
 }

 function atualizarValor(codigoProduto, novoValor){
    if(novoValor < 0){
        throw new Error ("Valor deve maior igual a zero");
     }
 
    const produto = produtos.find(prod => prod.codigo === codigoProduto);
        produto.valor = novoValor; 
  } 
  else{
           throw new Error("produto não encontrado");
        }
  
        
 function atualizarQuantidade(codigoProduto, novaQuantidade){
      if(novaQuantidade < 1){
         throw new Error("Quantidade deve ser maior que zero");
      }
   } 





//------------------
listarProdutos();
 cadastrarProduto("cadeira Gamer, 12,699.00");
 cadastrarproduto("mouse logi, 38,99.00");
 listraProdutos();
 atualizarValor(2.97.00);
 listarprodutos();

 atualizarQuantidade(4,3 );
 listarProdutos();

 