const prompt = require("prompt-sync")();

let produtos = [];

function cadastrarProduto() {
    let codigo = Number(prompt("Código: "));

    if (produtos.find(p => p.codigo === codigo)) {
        console.log("Código já cadastrado!");
        return;
    }

    let descricao = prompt("Descrição: ");
    let quantidade = Number(prompt("Quantidade: "));
    let valor = Number(prompt("Valor: "));

    produtos.push({
        codigo,
        descricao,
        quantidade,
        valor
    });

    console.log("Produto cadastrado!");
}

function listarProdutos() {
    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    produtos.forEach(p => {
        console.log(`Código: ${p.codigo}`);
        console.log(`Descrição: ${p.descricao}`);
        console.log(`Quantidade: ${p.quantidade}`);
        console.log(`Valor: R$ ${p.valor.toFixed(2)}`);
        console.log("-------------------");
    });
}

function alterarValor() {
    let codigo = Number(prompt("Código do produto: "));
    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        console.log("Produto não encontrado!");
        return;
    }

    produto.valor = Number(prompt("Novo valor: "));
    console.log("Valor alterado!");
}

function alterarQuantidade() {
    let codigo = Number(prompt("Código do produto: "));
    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        console.log("Produto não encontrado!");
        return;
    }

    produto.quantidade = Number(prompt("Nova quantidade: "));
    console.log("Quantidade alterada!");
}

let opcao;

do {
    console.log("\n1 - Cadastrar produto");
    console.log("2 - Listar produtos");
    console.log("3 - Alterar valor");
    console.log("4 - Alterar quantidade");
    console.log("0 - Sair");

    opcao = Number(prompt("Escolha: "));

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
            console.log("Programa encerrado.");
            break;
        default:
            console.log("Opção inválida!");
    }
} while (opcao !== 0);