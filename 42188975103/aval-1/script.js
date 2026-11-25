let produtos = [];

function cadastrar() {
    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = document.getElementById("quantidade").value;
    let valor = document.getElementById("valor").value;

    produtos.push({
        codigo,
        descricao,
        quantidade,
        valor
    });

    alert("Produto cadastrado!");
}

function listar() {
    let resultado = document.getElementById("resultado");

    resultado.innerHTML = "";

    produtos.forEach(p => {
        resultado.innerHTML += `
            Código: ${p.codigo} |
            Descrição: ${p.descricao} |
            Quantidade: ${p.quantidade} |
            Valor: R$ ${p.valor}<br><br>
        `;
    });
}

function alterarValor() {
    let codigo = prompt("Digite o código do produto:");
    let produto = produtos.find(p => p.codigo == codigo);

    if (produto) {
        produto.valor = prompt("Digite o novo valor:");
        alert("Valor alterado!");
    } else {
        alert("Produto não encontrado!");
    }
}

function alterarQuantidade() {
    let codigo = prompt("Digite o código do produto:");
    let produto = produtos.find(p => p.codigo == codigo);

    if (produto) {
        produto.quantidade = prompt("Digite a nova quantidade:");
        alert("Quantidade alterada!");
    } else {
        alert("Produto não encontrado!");
    }
}