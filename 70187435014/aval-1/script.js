
let estoque = [];

function cadastrarProduto() {
    let nome = prompt("Digite o nome do produto:");
    let quantidade = Number(prompt("Digite a quantidade:"));
    let preco = Number(prompt("Digite o preço:"));

    if (!nome || quantidade < 0 || preco < 0 ||
        !Number.isFinite(quantidade) ||
        !Number.isFinite(preco)) {
        console.log("Dados inválidos!");
        return;
    }

    estoque.push({
        nome: nome,
        quantidade: quantidade,
        preco: preco
    });

    console.log("Produto cadastrado com sucesso!");
}

function listarProdutos() {
    console.log("\n=== ESTOQUE ===");

    if (estoque.length === 0) {
        console.log("Estoque vazio!");
        return;
    }

    estoque.forEach((produto, i) => {
        console.log(
            (i + 1) + " - " + produto.nome +
            " | Quantidade: " + produto.quantidade +
            " | Preço: R$ " + produto.preco.toFixed(2)
        );
    });
}

function adicionarProduto() {
    let nome = prompt("Nome do produto:");
    let produto = estoque.find(p => p.nome === nome);

    if (produto) {
        let qtd = Number(prompt("Quantidade para adicionar:"));

        if (Number.isFinite(qtd) && qtd > 0) {
            produto.quantidade += qtd;
            console.log("Quantidade adicionada!");
        } else {
            console.log("Quantidade inválida!");
        }
    } else {
        console.log("Produto não encontrado!");
    }
}

function removerProduto() {
    let nome = prompt("Nome do produto:");
    let produto = estoque.find(p => p.nome === nome);

    if (produto) {
        let qtd = Number(prompt("Quantidade para remover:"));

        if (Number.isFinite(qtd) && qtd > 0 &&
            qtd <= produto.quantidade) {
            produto.quantidade -= qtd;
            console.log("Produto removido!");
        } else {
            console.log("Quantidade inválida ou insuficiente!");
        }
    } else {
        console.log("Produto não encontrado!");
    }
}

// MENU PRINCIPAL

let opcao;

do {
    opcao = Number(prompt(
        "\n===== SISTEMA DE ESTOQUE =====\n" +
        "1 - Cadastrar produto\n" +
        "2 - Listar produtos\n" +
        "3 - Adicionar estoque\n" +
        "4 - Remover estoque\n" +
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
            adicionarProduto();
            break;

        case 4:
            removerProduto();
            break;

        case 0:
            console.log("Sistema encerrado!");
            break;

        default:
            console.log("Opção inválida!");
    }

} while (opcao !== 0);
