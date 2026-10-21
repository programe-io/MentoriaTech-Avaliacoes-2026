
let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("Descrição deve ter no mínimo cinco caracteres");
    }

    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    if (valor < 0) {
        throw new Error("Valor não pode ser negativo");
    }
}

function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);
    listarProdutos();
}

function listarProdutos() {
    const tabela = document.getElementById("listaProdutos");
    tabela.innerHTML = "";

    produtos.forEach(produto => {
        tabela.innerHTML += `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.valor.toFixed(2).replace(".", ",")}</td>
            </tr>
        `;
    });
}

function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("Valor não pode ser negativo");
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
    if (novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
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

function mostrarMensagem(texto, erro = false) {
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = texto;
    mensagem.style.color = erro ? "red" : "green";
}

function cadastrarPelaTela() {
    try {
        const descricao = document.getElementById("descricao").value.trim();
        const quantidade = Number(document.getElementById("quantidade").value);
        const valor = Number(document.getElementById("valor").value);

        cadastrarProduto(descricao, quantidade, valor);

        mostrarMensagem("Produto cadastrado com sucesso!");

        document.getElementById("descricao").value = "";
        document.getElementById("quantidade").value = "";
        document.getElementById("valor").value = "";
    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
}

function atualizarValorPelaTela() {
    try {
        const codigo = Number(document.getElementById("codigoValor").value);
        const valor = Number(document.getElementById("novoValor").value);

        atualizarValor(codigo, valor);
        mostrarMensagem("Valor atualizado com sucesso!");
    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
}

function atualizarQuantidadePelaTela() {
    try {
        const codigo = Number(document.getElementById("codigoQuantidade").value);
        const quantidade = Number(document.getElementById("novaQuantidade").value);

        atualizarQuantidade(codigo, quantidade);
        mostrarMensagem("Quantidade atualizada com sucesso!");
    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
}

// Testando as funções originais
cadastrarProduto("Cadeira gamer", 12, 699.00);
cadastrarProduto("Mouse logi", 38, 99.00);

atualizarValor(2, 97.00);
atualizarQuantidade(2, 3);
