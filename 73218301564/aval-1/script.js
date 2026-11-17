```javascript
let produtos = [];
let proximoCodigo = 1;

// Cadastrar produto
async function cadastrarProduto() {
    let descricao = prompt("Digite a descrição do produto:");
    let quantidade = Number(prompt("Digite a quantidade:"));
    let valor = Number(prompt("Digite o valor:"));

    let produto = {
        codigo: proximoCodigo++,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");
}

// Listar produtos
async function listarProdutos() {
    if (produtos.length === 0) {
        alert("Nenhum produto cadastrado!");
        return;
    }

    let lista = "";

    produtos.forEach(produto => {
        lista += `Código: ${produto.codigo}\n`;
        lista += `Descrição: ${produto.descricao}\n`;
        lista += `Quantidade: ${produto.quantidade}\n`;
        lista += `Valor: R$ ${produto.valor}\n\n`;
    });

    alert(lista);
}

// Alterar valor
async function alterarValor() {
    let codigo = Number(prompt("Digite o código do produto:"));

    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {
        produto.valor = Number(prompt("Digite o novo valor:"));
        alert("Valor alterado com sucesso!");
    } else {
        alert("Produto não encontrado!");
    }
}

// Alterar quantidade
async function alterarQuantidade() {
    let codigo = Number(prompt("Digite o código do produto:"));

    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {
        produto.quantidade = Number(prompt("Digite a nova quantidade:"));
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
            "0 - Sair"
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

            case "0":
                alert("Sistema encerrado!");
                break;

            default:
                alert("Opção inválida!");
        }

    } while (opcao !== "0");
}

menu();
```