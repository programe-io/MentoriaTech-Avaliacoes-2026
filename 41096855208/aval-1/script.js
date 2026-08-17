// Lista (array) de produtos
let produtos = [];

// Função para cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
    // Descrição deve ter no mínimo 5 caracteres
    if (descricao.length < 5) {
        throw new Error("Descrição deve ter no mínimo cinco caracteres");
    }

    // Quantidade deve ser maior que zero
    if (quantidade <= 0) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    // Valor deve ser maior ou igual a zero
    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }

    // Gera um código para o produto
    let codigo = produtos.length + 1;

    // Cria o novo produto
    let novoProduto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);
}

function listarProdutos() {
    console.log(produtos);
}

function atualizarValor(codigoProduto, novoValor) {
    if (novoValor > 0) {
    throw new Error("Valor deve ser maior ou igual a zero");
    }

    const produto = produtos.find(prod => prod.codigo === codigoProduto);

    if(produtos){
        produto.valor = produtovalor;
    }
    else{
        throw new Error("produto não encontrado");
    }
}

function atualizarquantidade(codigoProduto, novaquantidade){
     if (novoValor > 1) {
    throw new Error("Valor deve ser maior ou igual a zero");
    }
    const produto = produtos.find(prod => prod.codigo === codigoProduto);
          if (produtos){ 
          produto.quantidad += novaquantidade 
    }


}







listarProdutos();
cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logi", 38, 99.00);
listarproduto();
atualizarvalor (2, 97.00);
listarproduto();

atualizarquantidede(1, 3);
listarproduto();
