let produtos = [];

function validarProduto(descricao, quantidade, valor) {

    if (descricao.length < 5) {
        throw new Error("Descrição deve ter no mínimo cinco caracteres");
    }

    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
}

function cadastrarProduto() {

    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    try {

        validarProduto(descricao, quantidade, valor);

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

    } catch (erro) {
        alert(erro.message);
    }
}

function listarProdutos() {

    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach(function(produto) {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
        `;

        lista.appendChild(linha);
    });
}

function atualizarValor(codigoProduto, novoValor) {

    if (novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.valor = novoValor;
        listarProdutos();
    } else {
        throw new Error("Produto não encontrado");
    }
}

function atualizarQuantidade(codigoProduto, novaQuantidade) {

    if (novaQuantidade < 0) {
        throw new Error("Quantidade deve ser maior ou igual a zero");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.quantidade += novaQuantidade;
        listarProdutos();
    } else {
        throw new Error("Produto não encontrado");
    }
}