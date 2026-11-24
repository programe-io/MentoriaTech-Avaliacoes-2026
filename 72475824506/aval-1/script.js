
let estoque = [];

function cadastrarProduto() {
    let nome = prompt("Nome do produto:");
    let preco = Number(prompt("Preço do produto:"));
    let quantidade = Number(prompt("Quantidade inicial:"));

    if (!nome || preco <= 0 || quantidade < 0) {
        alert("Dados inválidos!");
        return;
    }

    estoque.push({
        nome: nome,
        preco: preco,
        quantidade: quantidade
    });

    alert("Produto cadastrado com sucesso!");
}

function listarProdutos() {
    if (estoque.length === 0) {
        alert("Estoque vazio!");
        return;
    }

    let lista = "=== PRODUTOS EM ESTOQUE ===\n";

    estoque.forEach((produto, i) => {
        lista += `\n${i + 1}. ${produto.nome}`;
        lista += `\nPreço: R$ ${produto.preco.toFixed(2)}`;
        lista += `\nQuantidade: ${produto.quantidade}\n`;
    });

    alert(lista);
}

function entradaEstoque() {
    let nome = prompt("Nome do produto:");
    let produto = estoque.find(p => 
        p.nome.toLowerCase() === nome.toLowerCase()
    );

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    let quantidade = Number(prompt("Quantidade de entrada:"));

    if (quantidade <= 0) {
        alert("Quantidade inválida!");
        return;
    }

    produto.quantidade += quantidade;
    alert("Entrada registrada!");
}

function saidaEstoque() {
    let nome = prompt("Nome do produto:");
    let produto = estoque.find(p => 
        p.nome.toLowerCase() === nome.toLowerCase()
    );

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    let quantidade = Number(prompt("Quantidade de saída:"));

    if (quantidade <= 0 || quantidade > produto.quantidade) {
        alert("Quantidade inválida ou estoque insuficiente!");
        return;
    }

    produto.quantidade -= quantidade;
    alert("Saída registrada!");
}

function valorTotalEstoque() {
    let total = estoque.reduce((soma, produto) => {
        return soma + produto.preco * produto.quantidade;
    }, 0);

    alert("Valor total do estoque: R$ " + total.toFixed(2));
}

function menu() {
    let opcao;

    do {
        opcao = prompt(
            "=== SISTEMA DE ESTOQUE ===\n\n" +
            "1 - Cadastrar produto\n" +
            "2 - Listar produtos\n" +
            "3 - Registrar entrada\n" +
            "4 - Registrar saída\n" +
            "5 - Valor total do estoque\n" +
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
                entradaEstoque();
                break;
            case "4":
                saidaEstoque();
                break;
            case "5":
                valorTotalEstoque();
                break;
            case "0":
                alert("Sistema encerrado!");
                break;
            default:
                alert("Opção inválida!");
        }
    } while (opcao !== "0");
}

menu();
