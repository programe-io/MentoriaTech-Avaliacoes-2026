
let produtos = [];

function cadastrarProduto() {

    let codigo = document.getElementById("codigo").value.trim();
    let descricao = document.getElementById("descricao").value.trim();
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

    produtos.forEach(function(produto) {

        let item = document.createElement("div");
        item.className = "produto";

        let codigo = document.createElement("p");
        codigo.textContent = "Código: " + produto.codigo;

        let descricao = document.createElement("p");
        descricao.textContent = "Descrição: " + produto.descricao;

        let quantidade = document.createElement("p");
        quantidade.textContent = "Quantidade: " + produto.quantidade;

        let valor = document.createElement("p");
        valor.textContent = "Valor: R$ " + produto.valor.toFixed(2);

        item.appendChild(codigo);
        item.appendChild(descricao);
        item.appendChild(quantidade);
        item.appendChild(valor);

        lista.appendChild(item);
    });
}

function alterarValor() {

    let codigo = document.getElementById("codigoAlterar").value.trim();
    let novoValor = document.getElementById("novoValor").value;

    let produto = produtos.find(function(p) {
        return p.codigo === codigo;
    });

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

    let codigo = document.getElementById("codigoAlterar").value.trim();
    let novaQuantidade = document.getElementById("novaQuantidade").value;

    let produto = produtos.find(function(p) {
        return p.codigo === codigo;
    });

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
