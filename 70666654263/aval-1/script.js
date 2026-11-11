function atualizarQuantidade(codigoProduto, novaQuantidade){
    if(novaQuantidade < 0){
        throw new Error("A quantidade não pode ser negativa");
    }

    const produto = produtos.find(prod =>
        prod.codigo === codigoProduto
    );

    if(produto){
        produto.quantidade = novaQuantidade;
        console.log("Quantidade atualizada com sucesso!");
    }
    else{
        throw new Error("Produto não encontrado");
    }
}function removerProduto(codigoProduto){
    const indice = produtos.findIndex(prod =>
        prod.codigo === codigoProduto
    );

    if(indice !== -1){
        produtos.splice(indice, 1);
        console.log("Produto removido com sucesso!");
    }
    else{
        throw new Error("Produto não encontrado");
    }
}function buscarProduto(codigoProduto){
    const produto = produtos.find(prod =>
        prod.codigo === codigoProduto
    );

    if(produto){
        console.log(produto);
        return produto;
    }
    else{
        throw new Error("Produto não encontrado");
    }
}function calcularEstoque(){
    const total = produtos.reduce((soma, produto) => {
        return soma + (produto.valor * produto.quantidade);
    }, 0);

    console.log("Valor total do estoque: R$", total.toFixed(2));

    return total;
}// TESTANDO O SISTEMA

listarProdutos();

cadastrarProduto("Cadeira Gamer", 12, 699.00);

atualizarValor(12, 750.00);

atualizarQuantidade(12, 5);

buscarProduto(12);

calcularEstoque();

removerProduto(12);

listarProdutos();