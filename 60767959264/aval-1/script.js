let produtos = [];
let proximoCodigo = 1;

// Função assíncrona para gerar código automaticamente
async function gerarCodigo() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(proximoCodigo++);
        }, 500);
    });
}

// Cadastrar produto
async function cadastrarProduto() {
    let codigo = await gerarCodigo();

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

    alert("Produto cadastrado com sucesso! Código: " + codigo);
}

// Listar produtos
function listarProdutos() {
    if (produtos.length === 0) {
        alert("Nenhum produto cadastrado!");
        return;
    }

    let lista = "PRODUTOS CADASTRADOS:\n\n";

    produtos.forEach(produto => {
        lista += "Código: " + produto.codigo + "\n";
        lista += "Descrição: " + produto.descricao + "\n";
        lista += "Quantidade: " + produto.quantidade + "\n";
        lista += "Valor: R$ " + produto.valor.toFixed(2) + "\n\n";
    });

    alert(lista);
}

// Alterar valor do produto
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

// Alterar quantidade do produto
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
async function menu() {
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
                await cadastrarProduto();
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
                alert("Sistema encerrado!");
                break;

            default:
                alert("Opção inválida!");
        }

    } while (opcao !== "0");
}

// Iniciar sistema
menu();