
let produtos = [];

function cadastrar() {
    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (codigo == "" || descricao == "" || quantidade < 0 || valor < 0) {
        alert("Preencha os campos corretamente!");
        return;
    }

    produtos.push({
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    });

    alert("Produto cadastrado!");

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}

function listar() {
    let lista = "";

    for (let i = 0; i < produtos.length; i++) {
        lista += "Código: " + produtos[i].codigo + "<br>";
        lista += "Descrição: " + produtos[i].descricao + "<br>";
        lista += "Quantidade: " + produtos[i].quantidade + "<br>";
        lista += "Valor: R$ " + produtos[i].valor + "<br><br>";
    }

    if (lista == "") {
        lista = "Nenhum produto cadastrado!";
    }

    document.getElementById("lista").innerHTML = lista;
}

function alterarValor() {
    let codigo = document.getElementById("codigoAlterar").value;

    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].codigo == codigo) {
            produtos[i].valor = Number(prompt("Digite o novo valor:"));
            alert("Valor alterado!");
            return;
        }
    }

    alert("Produto não encontrado!");
}

function alterarQuantidade() {
    let codigo = document.getElementById("codigoAlterar").value;

    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].codigo == codigo) {
            produtos[i].quantidade = Number(prompt("Digite a nova quantidade:"));
            alert("Quantidade alterada!");
            return;
        }
    }

    alert("Produto não encontrado!");
}
