
let produtos = [];

function cadastrarProduto() {
    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value.trim();
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao || quantidade < 0 || valor < 0 ||
        document.getElementById("quantidade").value === "" ||
        document.getElementById("valor").value === "") {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    if (produtos.some(p => p.codigo === codigo)) {
        alert("Esse código já está cadastrado!");
        return;
    }

    produtos.push({
        codigo,
        descricao,
        quantidade,
        valor
    });

    alert("Produto cadastrado com sucesso!");
    limparCampos();
}

function listarProdutos() {
    let resultado = document.getElementById("resultado");

    if (produtos.length === 0) {
        resultado.innerHTML = "Nenhum produto cadastrado.";
        return;
    }

    resultado.innerHTML = "<h3>Produtos cadastrados</h3>";

    produtos.forEach(p => {
        resultado.innerHTML +=
            "Código: " + p.codigo +
            "<br>Descrição: " + p.descricao +
            "<br>Quantidade: " + p.quantidade +
            "<br>Valor: R$ " + p.valor.toFixed(2) +
            "<hr>";
    });
}

function alterarValor() {
    let codigo = Number(prompt("Digite o código do produto:"));
    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    let novoValor = Number(prompt("Digite o novo valor:"));

    if (isNaN(novoValor) || novoValor < 0) {
        alert("Valor inválido!");
        return;
    }

    produto.valor = novoValor;
    alert("Valor alterado com sucesso!");
}

function alterarQuantidade() {
    let codigo = Number(prompt("Digite o código do produto:"));
    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    let novaQuantidade = Number(prompt("Digite a nova quantidade:"));

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
        alert("Quantidade inválida!");
        return;
    }

    produto.quantidade = novaQuantidade;
    alert("Quantidade alterada com sucesso!");
}

function limparCampos() {
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}
