
let estoque = [];

// Cadastrar produto
function cadastrar() {
    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    estoque.push(produto);

    alert("Produto cadastrado!");

}

// Listar produtos
function listar() {
    let resultado = document.getElementById("resultado");

    resultado.innerHTML = "";

    estoque.forEach(function(p) {
        resultado.innerHTML +=
            "Código: " + p.codigo + "<br>" +
            "Descrição: " + p.descricao + "<br>" +
            "Quantidade: " + p.quantidade + "<br>" +
            "Valor: R$ " + p.valor + "<hr>";
    });
}

// Alterar valor
function alterarValor() {
    let codigo = Number(prompt("Digite o código:"));

    let produto = estoque.find(p => p.codigo == codigo);

    if (produto) {
        produto.valor = Number(prompt("Digite o novo valor:"));
        alert("Valor alterado!");
    } else {
        alert("Produto não encontrado!");
    }
}

// Alterar quantidade
function alterarQuantidade() {
    let codigo = Number(prompt("Digite o código:"));

    let produto = estoque.find(p => p.codigo == codigo);

    if (produto) {
        produto.quantidade = Number(prompt("Digite a nova quantidade:"));
        alert("Quantidade alterada!");
    } else {
        alert("Produto não encontrado!");
    }
}
