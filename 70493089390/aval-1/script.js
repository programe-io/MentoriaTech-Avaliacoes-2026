try {
    cadastrarProduto("Teclado Mecânico", 10, 250.00);
    cadastrarProduto("Mouse Sem Fio", 5, 120.50);
    
    atualizarValor(1, 230.00);
    darBaixaEstoque(2, 2);
    
    listarProdutos();
    console.log("Valor total em estoque: R$", calcularValorTotalEstoque().toFixed(2));
} catch (erro) {
    console.error("Erro:", erro.message);
}
