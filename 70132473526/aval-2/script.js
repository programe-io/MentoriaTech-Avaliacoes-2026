let produtos = [];

function validarProduto(descricao, quantidade, valor) {

    if (descricao.length < 5) {
        throw new Error("A descrição deve ter, no mínimo, cinco caracteres.");
    }

    if (quantidade < 1) {
        throw new Error("A quantidade deve ser maior que zero.");
    }

    if (valor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }
}

function cadastrarProduto() {

    try {

        const descricao = document.getElementById("descricao").value.trim();
        const quantidade = Number(document.getElementById("quantidade").value);
        const valor = Number(document.getElementById("valor").value);

        validarProduto(descricao, quantidade, valor);

        const novoProduto = {
            codigo: produtos.length + 1,
            descricao: descricao,
            quantidade: quantidade,
            valor: valor
        };

        produtos.push(novoProduto);

        mostrarMensagem("Produto cadastrado com sucesso!");

        limparCampos();

        listarProdutos();

    } catch (erro) {

        mostrarMensagem(erro.message);
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

function atualizarValor() {

    try {

        const codigo = Number(
            document.getElementById("codigoAtualizar").value
        );

        const novoValor = Number(
            document.getElementById("novoValor").value
        );

        if (novoValor < 0) {
            throw new Error("O valor deve ser maior ou igual a zero.");
        }

        const produto = produtos.find(
            prod => prod.codigo === codigo
        );

        if (produto) {

            produto.valor = novoValor;

            mostrarMensagem("Valor atualizado com sucesso!");

            listarProdutos();

        } else {

            throw new Error("Produto não encontrado.");
        }

    } catch (erro) {

        mostrarMensagem(erro.message);
    }
}

function atualizarQuantidade() {

    try {

        const codigo = Number(
            document.getElementById("codigoAtualizar").value
        );

        const novaQuantidade = Number(
            document.getElementById("novaQuantidade").value
        );

        if (novaQuantidade < 1) {
            throw new Error("A quantidade deve ser maior que zero.");
        }

        const produto = produtos.find(
            prod => prod.codigo === codigo
        );

        if (produto) {

            produto.quantidade =
                produto.quantidade + novaQuantidade;

            mostrarMensagem("Quantidade atualizada com sucesso!");

            listarProdutos();

        } else {

            throw new Error("Produto não encontrado.");
        }

    } catch (erro) {

        mostrarMensagem(erro.message);
    }
}

function mostrarMensagem(texto) {

    document.getElementById("mensagem").textContent = texto;
}

function limparCampos() {

    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}