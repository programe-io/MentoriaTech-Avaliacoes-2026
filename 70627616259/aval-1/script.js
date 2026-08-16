let produtos = [];

function cadastrarProduto() {
    let descricao = prompt("Digite a descrição do produto:");
    let quantidade = Number(prompt("Digite a quantidade do produto:"));
    let valor = Number(prompt("Digite o valor do produto:"));

    if (descricao.length < 5) {
        console.log("A descrição deve ter no mínimo 5 caracteres.");
        return;
    }

    if (quantidade < 0 || valor < 0) {
        console.log("Quantidade e valor não podem ser negativos.");
        return;
    }

    let produto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    console.log("Produto cadastrado com sucesso!");
}

function listarProdutos() {
    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    console.log("===== PRODUTOS CADASTRADOS =====");

    for (let produto of produtos) {
        console.log(
            `Código: ${produto.codigo} | ` +
            `Descrição: ${produto.descricao} | ` +
            `Quantidade: ${produto.quantidade} | ` +
            `Valor: R$ ${produto.valor.toFixed(2)}`
        );
    }
}

function alterarValor() {
    let codigo = Number(prompt("Digite o código do produto:"));

    let produto = produtos.find(produto => produto.codigo === codigo);

    if (produto === undefined) {
        console.log("Produto não encontrado.");
        return;
    }

    let novoValor = Number(prompt("Digite o novo valor:"));

    if (novoValor < 0) {
        console.log("O valor não pode ser negativo.");
        return;
    }

    produto.valor = novoValor;

    console.log("Valor atualizado com sucesso!");
}

function alterarQuantidade() {
    let codigo = Number(prompt("Digite o código do produto:"));

    let produto = produtos.find(produto => produto.codigo === codigo);

    if (produto === undefined) {
        console.log("Produto não encontrado.");
        return;
    }

    let novaQuantidade = Number(
        prompt("Digite a quantidade que deseja adicionar:")
    );

    if (novaQuantidade < 0) {
        console.log("A quantidade não pode ser negativa.");
        return;
    }

    produto.quantidade += novaQuantidade;

    console.log("Quantidade atualizada com sucesso!");
}

let opcao;

do {
    opcao = Number(
        prompt(
            "===== SISTEMA DE ESTOQUE =====\n" +
            "1 - Cadastrar produto\n" +
            "2 - Listar produtos\n" +
            "3 - Alterar valor\n" +
            "4 - Alterar quantidade\n" +
            "0 - Sair\n\n" +
            "Digite uma opção:"
        )
    );

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
            console.log("Sistema encerrado.");
            break;

        default:
            console.log("Opção inválida.");
    }

} while (opcao !== 0);