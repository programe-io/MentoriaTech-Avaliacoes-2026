let produtos = [];

function cadastrarProduto() {
    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao || !quantidade || !valor) {
        alert("Preencha todos os campos!");
        return;
    }

    produtos.push({
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    });

    limparCampos();
    listarProdutos();
}

function listarProdutos() {
    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    produtos.forEach(produto => {
        lista.innerHTML += `
            <div class="produto">
                <strong>Código:</strong> ${produto.codigo}<br>
                <strong>Descrição:</strong> ${produto.descricao}<br>
                <strong>Quantidade:</strong> ${produto.quantidade}<br>
                <strong>Valor:</strong> R$ ${produto.valor.toFixed(2)}
            </div>
        `;
    });
}

function alterarValor() {
    let codigo = Number(document.getElementById("codigoAlterar").value);
    let novoValor = Number(document.getElementById("novoValor").value);

    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {
        produto.valor = novoValor;
        alert("Valor alterado com sucesso!");
        listarProdutos();
    } else {
        alert("Produto não encontrado!");
    }
}

function alterarQuantidade() {
    let codigo = Number(document.getElementById("codigoAlterar").value);
    let novaQuantidade = Number(document.getElementById("novaQuantidade").value);

    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {
        produto.quantidade = novaQuantidade;
        alert("Quantidade alterada com sucesso!");
        listarProdutos();
    } else {
        alert("Produto não encontrado!");
    }
}

function limparCampos() {
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}