const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let produtos = [];
let proximoId = 1;

function perguntar(texto) {
    return new Promise(resolve => {
        rl.question(texto, resposta => resolve(resposta));
    });
}

async function cadastrarProduto() {
    console.log("\n=== CADASTRAR PRODUTO ===");

    const nome = (await perguntar("Nome: ")).trim();
    const categoria = (await perguntar("Categoria: ")).trim();
    const quantidade = Number(await perguntar("Quantidade: "));
    const preco = Number(await perguntar("Preco: "));
    const localizacao = (await perguntar("Localizacao: ")).trim();

    if (!nome || !categoria || !localizacao ||
        !Number.isInteger(quantidade) || quantidade < 0 ||
        !Number.isFinite(preco) || preco < 0) {
        console.log("Erro: informe dados validos.");
        return;
    }

    produtos.push({
        id: proximoId++,
        nome,
        categoria,
        quantidade,
        preco,
        localizacao
    });

    console.log("Produto cadastrado com sucesso!");
}

function listarProdutos() {
    console.log("\n=== LISTA DE PRODUTOS ===");

    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    produtos.forEach(p => {
        console.log(
            `ID: ${p.id} | ${p.nome} | ` +
            `Categoria: ${p.categoria} | ` +
            `Quantidade: ${p.quantidade} | ` +
            `Preco: R$ ${p.preco.toFixed(2)} | ` +
            `Local: ${p.localizacao}`
        );
    });
}

async function buscarProduto() {
    const id = Number(await perguntar("Digite o ID do produto: "));
    return produtos.find(p => p.id === id);
}

async function entradaEstoque() {
    console.log("\n=== ENTRADA DE ESTOQUE ===");

    const produto = await buscarProduto();

    if (!produto) {
        console.log("Produto nao encontrado.");
        return;
    }

    const quantidade = Number(
        await perguntar("Quantidade recebida: ")
    );

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        console.log("Quantidade invalida.");
        return;
    }

    produto.quantidade += quantidade;
    console.log("Estoque atualizado com sucesso!");
}

async function saidaEstoque() {
    console.log("\n=== SAIDA DE ESTOQUE ===");

    const produto = await buscarProduto();

    if (!produto) {
        console.log("Produto nao encontrado.");
        return;
    }

    const quantidade = Number(
        await perguntar("Quantidade retirada: ")
    );

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        console.log("Quantidade invalida.");
        return;
    }

    if (quantidade > produto.quantidade) {
        console.log("Estoque insuficiente!");
        return;
    }

    produto.quantidade -= quantidade;
    console.log("Saida registrada com sucesso!");
}

function relatorioEstoque() {
    console.log("\n=== RELATORIO DE ESTOQUE ===");

    let valorTotal = 0;

    produtos.forEach(p => {
        valorTotal += p.quantidade * p.preco;

        if (p.quantidade === 0) {
            console.log(`${p.nome}: SEM ESTOQUE`);
        } else if (p.quantidade <= 5) {
            console.log(`${p.nome}: ESTOQUE BAIXO (${p.quantidade})`);
        }
    });

    console.log(
        "Valor total dos produtos: R$ " +
        valorTotal.toFixed(2)
    );
}

async function menu() {
    let opcao;

    do {
        console.log("\n===== SISTEMA DE ESTOQUE =====");
        console.log("1 - Cadastrar produto");
        console.log("2 - Listar produtos");
        console.log("3 - Entrada de estoque");
        console.log("4 - Saida de estoque");
        console.log("5 - Relatorio de estoque");
        console.log("0 - Sair");

        opcao = await perguntar("Escolha uma opcao: ");

        switch (opcao) {
            case "1":
                await cadastrarProduto();
                break;

            case "2":
                listarProdutos();
                break;

            case "3":
                await entradaEstoque();
                break;

            case "4":
                await saidaEstoque();
                break;

            case "5":
                relatorioEstoque();
                break;

            case "0":
                console.log("Sistema encerrado!");
                break;

            default:
                console.log("Opcao invalida!");
        }
    } while (opcao !== "0");

    rl.close();
}

menu();
