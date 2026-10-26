//Lista (Array) de Produtos 
let Produtos=[];

Function Validarprodutos(descricao, quantidade, valor) {
}
    if(descricao.length< 5) {
        throw new Error("Descricao deve ter no mínimo cinco caracteres");
        if(quantidade<1){
            throw new Error("Quantidade deve ser maior que zero");
        }
        if(valor<0){
            throw new Error ("valor deve maior igual a zero");
        }

    }
    function cadastrarProduto(descricao, quantidade, valor ){
        validarProduto(descricao,quantidade, valor);

        let novoProduto={
            "codigo": Produtos.length+ 1,
            "descricao": descricao,
            "quantidade":quantidade,
            "valor":valor
        };
        Produtos.push(novoProduto);
    }
    function listarProdutos(){
        console.log(Produtos);
    }
    Function atualizarValor(codigoProduto, novoValor){
        if(novoValor<0){
            throw new Error("Valor deve maoir igual a zero");
        }
    const Produto=Produtos.find(prod=> prod.codigo=== codigoProduto);

    if (Produto) {
        Produto.valor= novoValor;
    }
   else {
    throw new Error ("Produto não encontrado");
   }
   }         
function atulizarQuantidade(codigoProduto,novaQuantidade){
    if(novaQuantidade<1){
        throw new Error ("Quantidade deve ser maoir que zero");
}
const produto= Produtos.find(prod=> prod.codigo====codigoProduto);
if(produto){
    produto.quantidade+= novaQuantidade;
}
else{
    throw new Error("Produto não encontrado");
}
}
//----------------------
listarProdutos();
cadastrarProduto("cadeira Gamer",12,699.00);
cadastrarProduto("Mouse Logi",38,99.00);
listarProdutos();
atualizarQuantidade(1, 3);
listarProdutos();
