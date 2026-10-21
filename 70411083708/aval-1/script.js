
let produtos = [];

// Cadastrar um novo produto
function cadastrarProduto() {
    let codigo = prompt("Digite o código do produto:");
    let descricao = prompt("Digite a descrição do produto:");
    let quantidade = Number(prompt("Digite a quantidade em estoque:"));
    let valor = Number(prompt("Digite o valor do produto:"));

    if (codigo === null || descricao === null) {
        return;
    }

    codigo = codigo.trim();
    descricao = descricao.trim();

    if (codigo === "" || descricao === "") {
        alert("Código e descrição são obrigatórios!");
        return;
    }

    if (produtos.some(p => p.codigo.toLowerCase() === codigo.toLowerCase())) {
        alert("Já existe um produto com esse código!");
        return;
    }

    if (
        !Number.isSafeInteger(quantidade) ||
        quantidade < 0 ||
        !Number.isFinite(valor) ||
        valor < 0
    ) {
        alert("Informe uma quantidade inteira e um valor válidos.");
        return;
    }

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");
}

// Listar os produtos cadastrados
function listarProdutos() {
    if (produtos.length === 0) {
        alert("Nenhum produto cadastrado!");
        return;
    }

    let lista = "=== PRODUTOS CADASTRADOS ===\n\n";

    produtos.forEach(function(produto) {
        lista += "Código: " + produto.codigo + "\n";
        lista += "Descrição: " + produto.descricao + "\n";
        lista += "Quantidade: " + produto.quantidade + "\n";
        lista += "Valor: R$ " + produto.valor.toFixed(2) + "\n";
        lista += "--------------------------\n";
    });

    alert(lista);
}

// Localizar um produto pelo código
function buscarProduto(codigo) {
    return produtos.find(
        produto => produto.codigo.toLowerCase() === codigo.toLowerCase()
    );
}

// Alterar o valor de um produto
function alterarValor() {
    let codigo = prompt("Digite o código do produto:");
    
    if (codigo === null) return;

    let produto = buscarProduto(codigo.trim());

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    let novoValor = prompt("Digite o novo valor do produto:");

    if (novoValor === null) return;

    novoValor = novoValor.trim();

    if (novoValor === "" || !/^\d+([.,]\d{1,2})?$/.test(novoValor)) {
        alert("Digite um valor válido!");
        return;
    }

    novoValor = Number(novoValor.replace(",", "."));

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("O valor não pode ser negativo!");
        return;
    }

    produto.valor = novoValor;

    alert("Valor alterado com sucesso!");
}

// Alterar a quantidade de um produto
function alterarQuantidade() {
    let codigo = prompt("Digite o código do produto:");

    if (codigo === null) return;

    let produto = buscarProduto(codigo.trim());

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    let novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null) return;

    novaQuantidade = novaQuantidade.trim();
    let quantidade = Number(novaQuantidade);

    if (
        novaQuantidade === "" ||
        !Number.isSafeInteger(quantidade) ||
        quantidade < 0
    ) {
        alert("Digite uma quantidade inteira válida!");
        return;
    }

    produto.quantidade = quantidade;

    alert("Quantidade alterada com sucesso!");
}

// Menu principal
function menu() {
    let opcao;

    do {
        opcao = prompt(
            "=== SISTEMA DE ESTOQUE ===\n\n" +
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
                alert("Sistema encerrado!");
                break;

            case null:
                opcao = "0";
                alert("Sistema encerrado!");
                break;

            default:
                alert("Opção inválida! Tente novamente.");
        }

    } while (opcao !== "0");
}

// Iniciar o sistema
menu();
