
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
        alert("Nenhum produto cadastrado!");
    } else {
        let lista = "";

        for (let i = 0; i < produtos.length; i++) {
            lista += "Código: " + produtos[i].codigo +
                "\nDescrição: " + produtos[i].descricao +
                "\nQuantidade: " + produtos[i].quantidade +
                "\nValor: R$ " + produtos[i].valor +
                "\n----------------------\n";
        }

        alert(lista);
    }
}

function alterarValor() {
    let codigo = Number(prompt("Digite o código do produto:"));

    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].codigo === codigo) {
            produtos[i].valor = Number(prompt("Digite o novo valor:"));
            alert("Valor alterado com sucesso!");
            return;
        }
    }

    alert("Produto não encontrado!");
}

function alterarQuantidade() {
    let codigo = Number(prompt("Digite o código do produto:"));

    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].codigo === codigo) {
            produtos[i].quantidade = Number(prompt("Digite a nova quantidade:"));
            alert("Quantidade alterada com sucesso!");
            return;
        }
    }

    alert("Produto não encontrado!");
}

// Menu principal
let opcao;

do {
    opcao = Number(prompt(
        "SISTEMA DE ESTOQUE\n\n" +
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
            alert("Saindo do sistema...");
            break;

        default:
            alert("Opção inválida!");
    }

} while (opcao !== 0);
