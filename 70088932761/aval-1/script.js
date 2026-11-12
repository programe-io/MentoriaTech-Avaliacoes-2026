let produtos = [];

function ValidarProduto(descrição, quantidade, valor){
    if(descrição.length < 5){
        throw new Error("Descrição deve ter no mínimo 5 caracteres...");
    }
    if(quantidade < 0){
        throw new Error("Produto indisponível...")
    }
    if(valor < 0){
        throw new Error("Produto sem preço...")
    }
}
function CadastrarProduto(descrição, quantidade, valor){
    ValidarProduto(descrição, quantidade, valor);
        let NovoProduto = {
            "código": produtos.length + 1,
            "descrição": descrição,
            "quantidade": quantidade,
            "valor": valor,
        }
    produtos.push(NovoProduto);
}
function ListarProdutos(){
    console.log(produtos);
}
function AtualizarValor(codigoProduto, nvalor){
    if(nvalor < 0){
        throw new Error("Produto sem valor...")

    }
    const produto = produtos.find(prod => prod.código === codigoProduto)
    if(produto){
        produto.valor = nvalor
    }
    else{
        throw new Error("Produto não encontrado...")
    }
}
function AlterarQuantidade(codigoProduto, nquantidade){
    if(nquantidade <0 ){
        throw new Error("Produto indisponível...")
    }
    const produto = produtos.find(prod => prod.código === codigoProduto)
    if(produto){
        produto.quantidade += nquantidade
    }
    else{
        throw new Error("Produto não encontrado...")
    }
}

