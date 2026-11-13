
let produtos = [];

function cadastrar() {
    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (codigo == "" || descricao == "") {
        alert("Preencha todos os campos!");
        return;
    }

    produtos.push({
        codigo,
        descricao,
        quantidade,
        valor
    });

    alert("Produto cadastrado!");

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}

function listar() {
    let lista = document.getElementById("lista");
    lista.innerHTML = "<h3>Produtos cadastrados:</h3>";

    produtos.forEach(function(p) {
        lista.innerHTML +=
            "Código: " + p.codigo +
            "<br>Descrição: " + p.descricao +
            "<br>Quantidade: " + p.quantidade +
            "<br>Valor: R$ " + p.valor +
            "<hr>";
    });
}

function alterarValor() {
    let codigo = prompt("Digite o código do produto:");
    let produto = produtos.find(p => p.codigo == codigo);

    if (produto) {
        produto.valor = Number(prompt("Digite o novo valor:"));
        alert("Valor alterado!");
    } else {
        alert("Produto não encontrado!");
    }
}

function alterarQuantidade() {
    let codigo = prompt("Digite o código do produto:");
    let produto = produtos.find(p => p.codigo == codigo);

    if (produto) {
        produto.quantidade = Number(prompt("Digite a nova quantidade:"));
        alert("Quantidade alterada!");
    } else {
        alert("Produto não encontrado!");
    }
}
