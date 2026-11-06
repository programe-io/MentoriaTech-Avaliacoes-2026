function validarProduto(descricao,quantidade,valor){
    if(descricao.length<5){
throw nem Error("descricao deve ter no minimo cinco caracteres");
    }
    if(quantidade<1){
        throw new Error("quantidade deve ser maior que zero");
           }
           if(valor<0){
            throw new Error("Valor deve maior igual a zero");

            }
           }
           function cadastrarProduto(descricao,quantidade,valor){
            validarProduto(descricao,quantidade,valor);
            let novoProduto={
                "codido":produtos.length+1,
                "descricao":descricao
                "quantidade":quantidade,
                "valor":valor
            }
            produtos.push(novoProdutos);
            }
            function listarProdutos(){
                console.log(produtos);
            }
            function atualizarValor(condigoProduto,novoValor){
                if(novoValor<0){
                    throw new Error("Valor deve maior igual a zero");
                
                }
const produto= produto.find(prod=>prod=>prod.codigo===codigoProduto);
if(produto){ 
    produto.valor=novoValor;
}
else{
    throw new Error("Produto nao encontrado");
    }
 }
 function atualizarQuantidade(codigoProduto,novaQuantidade){
    if(novaQuantidade<1){
        throw new Error("Quantidade deve ser maior que zero");
           }
           const produto=produtos.find(prod=>prod.codigo===codigoProduto);
           if(produto){
            produto.quantidade+=novaQuantidade;
           }
           else{
            throw new Error("Produto nao encontrado");
           }
 }
 //---------------
 listarProdutos();
 cadastrarProduto("Cadeira Gamer", 12,699.00);
 cadastrarProduto("Mouse Logi",38,99.00);
 listrarProdutos();
 atualizarValor(2,97.00);
 listrarProdutos();

 atualizarQuantidade(1,3);
 listrarProdutos();
 
