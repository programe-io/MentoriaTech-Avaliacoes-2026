
let produtos = [];

function cadastrarProduto() {
    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = document.getElementById("quantidade").value;
    let valor = document.getElementById("valor").value;

    if (codigo === "" || descricao === "" ||
        quantidade === "" || valor === "") {
        alert("Preencha todos os campos!");
        return;
    }

    if (produtos.some(p => p.codigo === codigo)) {
        alert("Este código já está cadastrado!");
        return;
    }

    if (Number(quantidade) < 0 || Number(valor) < 0) {
        alert("Quantidade e valor não podem ser negativos!");
        return;
    }

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: Number(quantidade),
        valor: Number(valor)
    };

    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    listarProdutos();
}

function listarProdutos() {
    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    produtos.forEach(produto => {
        lista.innerHTML += `
            <div class="produto">
                <p><strong>Código:</strong> ${produto.codigo}</p>
                <p><strong>Descrição:</strong> ${produto.descricao}</p>
                <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
                <p><strong>Valor:</strong> R$ ${produto.valor.toFixed(2)}</p>
            </div>
        `;
    });
}

function alterarValor() {
    let codigo = document.getElementById("codigoAlterar").value;
    let novoValor = document.getElementById("novoValor").value;

    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (novoValor === "" || Number(novoValor) < 0) {
        alert("Informe um valor válido!");
        return;
    }

    produto.valor = Number(novoValor);

    alert("Valor alterado com sucesso!");

    document.getElementById("novoValor").value = "";

    listarProdutos();
}

function alterarQuantidade() {
    let codigo = document.getElementById("codigoAlterar").value;
    let novaQuantidade = document.getElementById("novaQuantidade").value;

    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (novaQuantidade === "" || Number(novaQuantidade) < 0) {
        alert("Informe uma quantidade válida!");
        return;
    }

    produto.quantidade = Number(novaQuantidade);

    alert("Quantidade alterada com sucesso!");

    document.getElementById("novaQuantidade").value = "";

    listarProdutos();
}
