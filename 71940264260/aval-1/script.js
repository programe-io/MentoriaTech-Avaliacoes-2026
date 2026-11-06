
let produtos = [];

function cadastrarProduto() {
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (descricao === "" || quantidade < 1 || valor < 0 ||
        document.getElementById("valor").value === "") {
        alert("Preencha os dados corretamente!");
        return;
    }

    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    listarProdutos();

    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    document.getElementById("mensagem").innerText =
        "Produto cadastrado com sucesso!";
}

function listarProdutos() {
    let tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    produtos.forEach(function(produto) {
        tabela.innerHTML += `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>
            </tr>
        `;
    });
}

function atualizarValor() {
    let codigoProduto = Number(
        document.getElementById("codigoPreco").value
    );

    let novoValor = Number(
        document.getElementById("novoValor").value
    );

    if (document.getElementById("novoValor").value === "" || novoValor < 0) {
        alert("Valor deve ser maior ou igual a zero!");
        return;
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.valor = novoValor;

        listarProdutos();

        document.getElementById("mensagem").innerText =
            "Preço atualizado com sucesso!";
    } else {
        alert("Produto não encontrado!");
    }
}

function atualizarQuantidade() {
    let codigoProduto = Number(
        document.getElementById("codigoQuantidade").value
    );

    let novaQuantidade = Number(
        document.getElementById("novaQuantidade").value
    );

    if (document.getElementById("novaQuantidade").value === "" ||
        novaQuantidade < 1) {
        alert("Quantidade deve ser maior que zero!");
        return;
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.quantidade = novaQuantidade;

        listarProdutos();

        document.getElementById("mensagem").innerText =
            "Quantidade atualizada com sucesso!";
    } else {
        alert("Produto não encontrado!");
    }
}
