
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
        return;
    }

    let lista = "";

    produtos.forEach(function(produto) {
        lista += "Código: " + produto.codigo + "\n";
        lista += "Descrição: " + produto.descricao + "\n";
        lista += "Quantidade: " + produto.quantidade + "\n";
        lista += "Valor: R$ " + produto.valor.toFixed(2) + "\n";
        lista += "----------------------\n";
    });

    alert(lista);
}

function alterarValor() {
    let codigo = Number(prompt("Digite o código do produto:"));

    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {
        let novoValor = Number(prompt("Digite o novo valor:"));
        produto.valor = novoValor;

        alert("Valor alterado com sucesso!");
    } else {
        alert("Produto não encontrado!");
    }
}

function alterarQuantidade() {
    let codigo = Number(prompt("Digite o código do produto:"));

    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {
        let novaQuantidade = Number(prompt("Digite a nova quantidade:"));
        produto.quantidade = novaQuantidade;

        alert("Quantidade alterada com sucesso!");
    } else {
        alert("Produto não encontrado!");
    }
}

// Menu principal
let opcao;

do {
    opcao = prompt(
        "SISTEMA DE ESTOQUE\n\n" +
        "1 - Cadastrar produto\n" +
        "2 - Listar produtos\n" +
        "3 - Alterar valor\n" +
        "4 - Alterar quantidade\n" +
        "5 - Sair\n\n" +
        "Escolha uma opção:"
    );

    switch (opcao) {
        case "1":
            cadastrarProduto();
            break;

        case "2":
            listarProdutos();
            break;

        case "3":
            alterarValor();
            break;

        case "4":
            alterarQuantidade();
            break;

        case "5":
            alert("Saindo do sistema...");
            break;

        default:
            alert("Opção inválida!");
    }

} while (opcao !== "5");
  