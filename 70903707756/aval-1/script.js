
const estoque = [];
let proximoCodigo = 1;

// Função para cadastrar um novo produto
async function cadastrarProduto() {
    const descricao = prompt("Digite a descrição do produto:");
    const quantidade = Number(prompt("Digite a quantidade:"));
    const valor = Number(prompt("Digite o valor do produto:"));

    if (!descricao || quantidade < 0 || valor < 0 ||
        isNaN(quantidade) || isNaN(valor)) {
        alert("Dados inválidos! Tente novamente.");
        return;
    }

    const produto = {
        codigo: proximoCodigo++,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    estoque.push(produto);

    alert("Produto cadastrado com sucesso!");
}

// Função para listar os produtos cadastrados
async function listarProdutos() {
    if (estoque.length === 0) {
        alert("Nenhum produto cadastrado!");
        return;
    }

    let lista = "===== PRODUTOS CADASTRADOS =====\n\n";

    estoque.forEach(function(produto) {
        lista += "Código: " + produto.codigo + "\n";
        lista += "Descrição: " + produto.descricao + "\n";
        lista += "Quantidade: " + produto.quantidade + "\n";
        lista += "Valor: R$ " + produto.valor.toFixed(2) + "\n";
        lista += "-----------------------------\n";
    });

    alert(lista);
}

// Função para alterar o valor de um produto
async function alterarValor() {
    const codigo = Number(prompt("Digite o código do produto:"));

    const produto = estoque.find(function(item) {
        return item.codigo === codigo;
    });

    if (produto) {
        const novoValor = Number(prompt("Digite o novo valor:"));

        if (isNaN(novoValor) || novoValor < 0) {
            alert("Valor inválido!");
            return;
        }

        produto.valor = novoValor;

        alert("Valor alterado com sucesso!");
    } else {
        alert("Produto não encontrado!");
    }
}

// Função para alterar a quantidade de um produto
async function alterarQuantidade() {
    const codigo = Number(prompt("Digite o código do produto:"));

    const produto = estoque.find(function(item) {
        return item.codigo === codigo;
    });

    if (produto) {
        const novaQuantidade = Number(
            prompt("Digite a nova quantidade:")
        );

        if (isNaN(novaQuantidade) || novaQuantidade < 0) {
            alert("Quantidade inválida!");
            return;
        }

        produto.quantidade = novaQuantidade;

        alert("Quantidade alterada com sucesso!");
    } else {
        alert("Produto não encontrado!");
    }
}

// Função principal do sistema
async function menu() {
    let opcao;

    do {
        opcao = prompt(
            "===== SISTEMA DE ESTOQUE =====\n\n" +
            "1 - Cadastrar produto\n" +
            "2 - Listar produtos\n" +
            "3 - Alterar valor\n" +
            "4 - Alterar quantidade\n" +
            "5 - Sair\n\n" +
            "Escolha uma opção:"
        );

        switch (opcao) {
            case "1":
                await cadastrarProduto();
                break;

            case "2":
                await listarProdutos();
                break;

            case "3":
                await alterarValor();
                break;

            case "4":
                await alterarQuantidade();
                break;

            case "5":
                alert("Sistema encerrado!");
                break;

            default:
                alert("Opção inválida!");
        }

    } while (opcao !== "5");
}

// Iniciar o sistema
menu();
