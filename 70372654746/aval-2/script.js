// SISTEMA DE ESTOQUE - LOJA DE PERFUMES

let produtos = [
    {
        codigo: 1,
        descricao: "Perfume Floral",
        quantidade: 10,
        valor: 89.90
    },
    {
        codigo: 2,
        descricao: "Hidratante Corporal",
        quantidade: 15,
        valor: 49.90
    },
    {
        codigo: 3,
        descricao: "Body Splash",
        quantidade: 20,
        valor: 59.90
    }
];


// CADASTRAR NOVO PRODUTO
function cadastrarProduto(codigo, descricao, quantidade, valor) {

    let novoProduto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    console.log("Produto cadastrado com sucesso!");
}


// LISTAR PRODUTOS
function listarProdutos() {

    console.log("===== PRODUTOS DA LOJA =====");

    produtos.forEach(function(produto) {

        console.log(
            "Código: " + produto.codigo +
            " | Produto: " + produto.descricao +
            " | Quantidade: " + produto.quantidade +
            " | Valor: R$ " + produto.valor.toFixed(2)
        );

    });
}


// ALTERAR VALOR
function alterarValor(codigo, novoValor) {

    let produto = produtos.find(function(produto) {
        return produto.codigo === codigo;
    });

    if (produto) {

        produto.valor = novoValor;

        console.log("Valor alterado com sucesso!");

    } else {

        console.log("Produto não encontrado!");

    }
}


// ALTERAR QUANTIDADE
function alterarQuantidade(codigo, novaQuantidade) {

    let produto = produtos.find(function(produto) {
        return produto.codigo === codigo;
    });

    if (produto) {

        produto.quantidade = novaQuantidade;

        console.log("Quantidade alterada com sucesso!");

    }