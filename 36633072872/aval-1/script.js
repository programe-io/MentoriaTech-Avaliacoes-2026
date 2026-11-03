let produtos = [];
let proximoCodigo = 1;

// Cadastrar produto
function cadastrarProduto() {
    let descricao = prompt("Digite o nome do produto:");
    let quantidade = Number(prompt("Digite a quantidade:"));
    let valor = Number(prompt("Digite o valor:"));

    if (!descricao || descricao.trim() === "" ||
        !Number.isInteger(quantidade) || quantidade < 0 ||
        !Number.isFinite(valor) || valor < 0) {
        console.log("Dados inválidos!");
        return;
    }

    let produto = {
        codigo: proximoCodigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);
    proximoCodigo++;

    console.log("Produto cadastrado com sucesso!");
}

// Listar produtos
function listarProdutos() {
    console.log("=== LISTA DE PRODUTOS ===");

    produtos.forEach(produto => {
        console.log("Código: " + produto.codigo);
        console.log("Descrição: " + produto.descricao);
        console.log("Quantidade: " + produto.quantidade);
        console.log("Valor: R$ " + produto.valor.toFixed(2));
        console.log("----------------------");
    });
}

// Alterar valor
function alterarValor() {
    let codigo = Number(prompt("Digite o código do produto:"));
    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {
        let novoValor = Number(prompt("Digite o novo valor:"));

        if (Number.isFinite(novoValor) && novoValor >= 0) {
            produto.valor = novoValor;
            console.log("Valor atualizado com sucesso!");
        } else {
            console.log("Valor inválido!");
        }
    } else {
        console.log("Produto não encontrado!");
    }
}

// Alterar quantidade
function alterarQuantidade() {
    let codigo = Number(prompt("Digite o código do produto:"));
    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {
        let novaQuantidade = Number(prompt("Digite a nova quantidade:"));

        if (Number.isInteger(novaQuantidade) && novaQuantidade >= 0) {
            produto.quantidade = novaQuantidade;
            console.log("Quantidade atualizada com sucesso!");
        } else {
            console.log("Quantidade inválida!");
        }
    } else {
        console.log("Produto não encontrado!");
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
        "0 - Sair\n\n" +
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
        case "0":
            console.log("Sistema encerrado!");
            break;
        case null:
            opcao = "0";
            break;
        default:
            console.log("Opção inválida!");
    }

} while (opcao !== "0");