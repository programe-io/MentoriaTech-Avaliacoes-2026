
let produtos = [];

function cadastrarProduto() {
    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao || quantidade < 0 || !valor) {
        alert("Preencha os campos corretamente!");
        return;
    }

    produtos.push({
        codigo,
        descricao,
        quantidade,
        valor
    });

    alert("Produto cadastrado!");

    listarProdutos();
}

function listarProdutos() {
    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    produtos.forEach(produto => {
        lista.innerHTML += `
            <p>
                Código: ${produto.codigo}<br>
                Descrição: ${produto.descricao}<br>
                Quantidade: ${produto.quantidade}<br>
                Valor: R$ ${produto.valor.toFixed(2)}
                <hr>
            </p>
        `;
    });
}

function alterarValor() {
    let codigo = Number(document.getElementById("codigoAlterar").value);

    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {
        produto.valor = Number(document.getElementById("novoValor").value);
        alert("Valor alterado!");
        listarProdutos();
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
        listarProdutos();
    } else {
        alert("Produto não encontrado!");
    }
}
