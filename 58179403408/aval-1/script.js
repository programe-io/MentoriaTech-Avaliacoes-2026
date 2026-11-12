
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let produtos = [];

// Função para fazer perguntas
function perguntar(texto) {
    return new Promise(resolve => {
        rl.question(texto, resolve);
    });
}

// Cadastrar produto
function cadastrarProduto(codigo, nome, valor, quantidade) {
    if (produtos.find(prod => prod.codigo === codigo)) {
        throw new Error("Produto já cadastrado!");
    }

    if (valor <= 0 || quantidade < 0) {
        throw new Error("Valor ou quantidade inválidos!");
    }

    produtos.push({
        codigo,
        nome,
        valor,
        quantidade
    });

    console.log("Produto cadastrado com sucesso!");
}

// Atualizar valor do produto
function atualizarValor(codigoProduto, novoValor) {
    if (novoValor <= 0) {
        throw new Error("Valor deve ser maior que zero");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.valor = novoValor;
        console.log("Valor atualizado com sucesso!");
    } else {
        throw new Error("Produto não encontrado!");
    }
}

// Atualizar quantidade
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.quantidade += novaQuantidade;
        console.log("Estoque atualizado com sucesso!");
    } else {
        throw new Error("Produto não encontrado!");
    }
}

// Retirar produtos do estoque
function retirarProduto(codigoProduto, quantidade) {
    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado!");
    }

    if (quantidade <= 0 || quantidade > produto.quantidade) {
        throw new Error("Quantidade inválida ou estoque insuficiente!");
    }

    produto.quantidade -= quantidade;

    console.log("Retirada realizada com sucesso!");
}

// Consultar produto
function consultarProduto(codigoProduto) {
    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        console.log("\n--- DADOS DO PRODUTO ---");
        console.log("Código:", produto.codigo);
        console.log("Nome:", produto.nome);
        console.log("Valor: R$", produto.valor.toFixed(2));
        console.log("Quantidade:", produto.quantidade);
    } else {
        console.log("Produto não encontrado!");
    }
}

// Listar todos os produtos
function listarProdutos() {
    console.log("\n===== ESTOQUE COMPLETO =====");

    if (produtos.length === 0) {
        console.log("Estoque vazio!");
        return;
    }

    produtos.forEach(produto => {
        console.log("---------------------------");
        console.log("Código:", produto.codigo);
        console.log("Nome:", produto.nome);
        console.log("Valor: R$", produto.valor.toFixed(2));
        console.log("Quantidade:", produto.quantidade);
    });
}

// Calcular valor total do estoque
function calcularEstoque() {
    let total = 0;

    produtos.forEach(produto => {
        total += produto.valor * produto.quantidade;
    });

    console.log("\nValor total do estoque: R$", total.toFixed(2));
}

// Menu principal
async function menu() {
    let opcao;

    do {
        console.log("\n===== SISTEMA DE CONTROLE DE ESTOQUE =====");
        console.log("1 - Cadastrar produto");
        console.log("2 - Atualizar valor");
        console.log("3 - Adicionar quantidade");
        console.log("4 - Retirar produto");
        console.log("5 - Consultar produto");
        console.log("6 - Listar produtos");
        console.log("7 - Calcular valor do estoque");
        console.log("0 - Sair");

        opcao = await perguntar("\nEscolha uma opção: ");

        try {
            switch (opcao) {
                case "1": {
                    const codigo = await perguntar("Código: ");
                    const nome = await perguntar("Nome: ");
                    const valor = Number(await perguntar("Valor: "));
                    const quantidade = Number(
                        await perguntar("Quantidade inicial: ")
                    );

                    cadastrarProduto(codigo, nome, valor, quantidade);
                    break;
                }

                case "2": {
                    const codigo = await perguntar("Código do produto: ");
                    const valor = Number(await perguntar("Novo valor: "));

                    atualizarValor(codigo, valor);
                    break;
                }

                case "3": {
                    const codigo = await perguntar("Código do produto: ");
                    const quantidade = Number(
                        await perguntar("Quantidade para adicionar: ")
                    );

                    atualizarQuantidade(codigo, quantidade);
                    break;
                }

                case "4": {
                    const codigo = await perguntar("Código do produto: ");
                    const quantidade = Number(
                        await perguntar("Quantidade para retirar: ")
                    );

                    retirarProduto(codigo, quantidade);
                    break;
                }

                case "5": {
                    const codigo = await perguntar("Código do produto: ");
                    consultarProduto(codigo);
                    break;
                }

                case "6":
                    listarProdutos();
                    break;

                case "7":
                    calcularEstoque();
                    break;

                case "0":
                    console.log("Sistema encerrado!");
                    break;

                default:
                    console.log("Opção inválida!");
            }
        } catch (erro) {
            console.log("ERRO:", erro.message);
        }

    } while (opcao !== "0");

    rl.close();
}

// Executar sistema
menu();
