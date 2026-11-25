let produtos = [];

function cadastrar() {
    let codigo = prompt("Código do produto:");
    let descricao = prompt("Descrição:");
    let quantidade = Number(prompt("Quantidade:"));
    let valor = Number(prompt("Valor:"));

    produtos.push({ codigo, descricao, quantidade, valor });

    alert("Produto cadastrado!");
}

function listar() {
    let resultado = document.getElementById("resultado");

    resultado.innerHTML = "";

    produtos.forEach(p => {
        resultado.innerHTML += `
            Código: ${p.codigo}<br>
            Descrição: ${p.descricao}<br>
            Quantidade: ${p.quantidade}<br>
            Valor: R$ ${p.valor.toFixed(2)}<br><br>
        `;
    });
}

function alterarValor() {
    let codigo = prompt("Digite o código do produto:");
    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {
        produto.valor = Number(prompt("Novo valor:"));
        alert("Valor alterado!");
    } else {
        alert("Produto não encontrado!");
    }
}

function alterarQuantidade() {
    let codigo = prompt("Digite o código do produto:");
    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {
        produto.quantidade = Number(prompt("Nova quantidade:"));
        alert("Quantidade alterada!");
    } else {
        alert("Produto não encontrado!");
    }
}