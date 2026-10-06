let produtos = [];

function cadastrarProduto() {
    let codigo = Number(prompt("Digite o código do produto:"));
    let descricao = prompt("Digite a descrição do produto:");
    let quantidade = Number(prompt("Digite a quantidade:"));
    let valor = Number(prompt("Digite o valor do produto:"));

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");
}

function listarProdutos() {
    if (produtos.length === 0) {
        alert("Nenhum produto cadastrado.");
        return;
    }

    console.log("=== PRODUTOS CADASTRADOS ===");

    produtos.forEach(function(produto) {
        console.log(
            "Código: " + produto.codigo +
            " | Descrição: " + produto.descricao +
            " | Quantidade: " + produto.quantidade +
            " | Valor: R$ " + produto.valor.toFixed(2)
        );
    });
}

function alterarValor() {
    let codigo = Number(prompt("Digite o código do produto:"));

    let produto = produtos.find(function(produto) {
        return produto.codigo === codigo;
    });

    if (produto) {
        let novoValor = Number(prompt("Digite o novo valor:"));
        produto.valor = novoValor;

        alert("Valor alterado com sucesso!");
    } else {
        alert("Produto não encontrado.");
    }
}

function alterarQuantidade() {
    let codigo = Number(prompt("Digite o código do produto:"));

    let produto = produtos.find(function(produto) {
        return produto.codigo === codigo;
    });

    if (produto) {
        let novaQuantidade = Number(prompt("Digite a nova quantidade:"));
        produto.quantidade = novaQuantidade;

        alert("Quantidade alterada com sucesso!");
    } else {
        alert("Produto não encontrado.");
    }
}


// Menu principal
let opcao;

do {
    opcao = Number(prompt(
        "=== SISTEMA DE ESTOQUE ===\n\n" +
        "1 - Cadastrar produto\n" +
        "2 - Listar produtos\n" +
        "3 - Alterar valor\n" +
        "4 - Alterar quantidade\n" +
        "0 - Sair\n\n" +
        "Escolha uma opção:"
    ));

    switch (opcao) {
        case 1:
            cadastrarProduto();
            break;

        case 2:
            listarProdutos();
            break;

        case 3:
            alterarValor();
            break;

        case 4:
            alterarQuantidade();
            break;

        case 0:
            alert("Sistema encerrado.");
            break;

        default:
            alert("Opção inválida!");
    }

} while (opcao !== 0);