const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Lista para armazenar os produtos do estoque
let estoque = [];

// Função para exibir o menu principal
function exibirMenu() {
    console.log("\n--- SISTEMA DE CONTROLE DE ESTOQUE ---");
    console.log("1. Cadastrar novo produto");
    console.log("2. Listar produtos cadastrados");
    console.log("3. Alterar o valor de um produto");
    console.log("4. Alterar a quantidade de um produto");
    console.log("5. Sair");
    
    rl.question("\nEscolha uma opção: ", (opcao) => {
        switch (opcao.trim()) {
            case '1':
                cadastrarProduto();
                break;
            case '2':
                listarProdutos();
                break;
            case '3':
                alterarValor();
                break;
            case '4':
                alterarQuantidade();
                break;
            case '5':
                console.log("Saindo do sistema. Até logo!");
                rl.close();
                break;
            default:
                console.log("Opção inválida! Tente novamente.");
                exibirMenu();
                break;
        }
    });
}

// 1. Cadastrar um novo produto
function cadastrarProduto() {
    rl.question("Digite o código do produto: ", (codigo) => {
        // Verifica se o código já existe
        if (estoque.some(p => p.codigo === codigo)) {
            console.log("Erro: Já existe um produto cadastrado com esse código!");
            return exibirMenu();
        }

        rl.question("Digite a descrição do produto: ", (descricao) => {
            rl.question("Digite a quantidade em estoque: ", (qtdStr) => {
                rl.question("Digite o valor unitário do produto: ", (valStr) => {
                    const quantidade = parseInt(qtdStr);
                    const valor = parseFloat(valStr);

                    if (isNaN(quantidade) || isNaN(valor) || quantidade < 0 || valor < 0) {
                        console.log("Erro: Quantidade e valor devem ser números válidos e positivos!");
                    } else {
                        estoque.push({ codigo, descricao, quantidade, valor });
                        console.log("Produto cadastrado com sucesso!");
                    }
                    exibirMenu();
                });
            });
        });
    });
}

// 2. Listar os produtos cadastrados
function listarProdutos() {
    console.log("\n--- LISTA DE PRODUTOS ---");
    if (estoque.length === 0) {
        console.log("O estoque está vazio.");
    } else {
        estoque.forEach((p, index) => {
            console.log(`${index + 1}. Código: ${p.codigo} | Descrição: ${p.descricao} | Qtd: ${p.quantidade} | Valor: R$ ${p.valor.toFixed(2)}`);
        });
    }
    exibirMenu();
}

// 3. Alterar o valor de um produto
function alterarValor() {
    if (estoque.length === 0) {
        console.log("O estoque está vazio. Não há produtos para alterar.");
        return exibirMenu();
    }

    rl.question("Digite o código do produto que deseja alterar o valor: ", (codigo) => {
        const produto = estoque.find(p => p.codigo === codigo);

        if (!produto) {
            console.log("Produto não encontrado!");
            return exibirMenu();
        }

        rl.question(`Valor atual (R$ ${produto.valor.toFixed(2)}). Digite o novo valor: `, (valStr) => {
            const novoValor = parseFloat(valStr);

            if (isNaN(novoValor) || novoValor < 0) {
                console.log("Erro: O valor deve ser um número válido e positivo!");
            } else {
                produto.valor = novoValor;
                console.log("Valor atualizado com sucesso!");
            }
            exibirMenu();
        });
    });
}

// 4. Alterar a quantidade de um produto
function alterarQuantidade() {
    if (estoque.length === 0) {
        console.log("O estoque está vazio. Não há produtos para alterar.");
        return exibirMenu();
    }

    rl.question("Digite o código do produto que deseja alterar a quantidade: ", (codigo) => {
        const produto = estoque.find(p => p.codigo === codigo);

        if (!produto) {
            console.log("Produto não encontrado!");
            return exibirMenu();
        }

        rl.question(`Quantidade atual (${produto.quantidade}). Digite a nova quantidade: `, (qtdStr) => {
            const novaQuantidade = parseInt(qtdStr);

            if (isNaN(novaQuantidade) || novaQuantidade < 0) {
                console.log("Erro: A quantidade deve ser um número inteiro válido e positivo!");
            } else {
                produto.quantidade = novaQuantidade;
                console.log("Quantidade atualizada com sucesso!");
            }
            exibirMenu();
        });
    });
}

// Inicializa o programa
exibirMenu();