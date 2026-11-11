
let produtos = [];

function cadastrar() {
    produtos.push({
        codigo: Number(document.getElementById("codigo").value),
        descricao: document.getElementById("descricao").value,
        quantidade: Number(document.getElementById("quantidade").value),
        valor: Number(document.getElementById("valor").value)
    });

    alert("Produto cadastrado!");
}

function listar() {
    let resultado = "";

    produtos.forEach(p => {
        resultado += `
            <p>
            Código: ${p.codigo}<br>
            Descrição: ${p.descricao}<br>
            Quantidade: ${p.quantidade}<br>
            Valor: R$ ${p.valor.toFixed(2)}
            </p><hr>
        `;
    });

    document.getElementById("resultado").innerHTML = resultado;
}

function alterarValor() {
    let codigo = Number(document.getElementById("codigoAlterar").value);
    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {
        produto.valor = Number(document.getElementById("novoValor").value);
        alert("Valor alterado!");
    } else {
        alert("Produto não encontrado!");
    }
}

function alterarQuantidade() {
    let codigo = Number(document.getElementById("codigoAlterar").value);
    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {
        produto.quantidade = Number(document.getElementById("novaQuantidade").value);
        alert("Quantidade alterada!");
    } else {
        alert("Produto não encontrado!");
    }
}
