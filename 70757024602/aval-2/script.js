let produtos = [];

// ==============================
// VALIDAÇÃO
// ==============================

function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error(
            "Descrição deve ter, no mínimo, cinco caracteres."
        );
    }

    if (quantidade < 1) {
        throw new Error(
            "Quantidade deve ser maior que zero."
        );
    }

    if (valor < 0) {
        throw new Error(
            "Valor deve ser maior ou igual a zero."
        );
    }
}


// ==============================
// CADASTRAR PRODUTO
// ==============================

function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);
}


// ==============================
// LISTAR PRODUTOS
// ==============================

function listarProdutos() {
    const listaProdutos = document.getElementById("listaProdutos");

    listaProdutos.innerHTML = "";

    if (produtos.length === 0) {
        listaProdutos.innerHTML = `
            <tr>
                <td colspan="4">
                    Nenhum produto cadastrado.
                </td>
            </tr>
        `;

        return;
    }

    produtos.forEach(function(produto) {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
        `;

        listaProdutos.appendChild(linha);
    });
}


// ==============================
// BUSCAR PRODUTO
// ==============================

function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find(function(produto) {
        return produto.codigo === codigoProduto;
    });
}


// ==============================
// ATUALIZAR VALOR
// ==============================

function atualizarValor(codigoProduto, novoValor) {

    if (novoValor < 0) {
        throw new Error(
            "Valor deve ser maior ou igual a zero."
        );
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {
        produto.valor = novoValor;
    } else {
        throw new Error(
            "Produto não encontrado."
        );
    }
}


// ==============================
// ATUALIZAR QUANTIDADE
// ==============================

function atualizarQuantidade(codigoProduto, novaQuantidade) {

    if (novaQuantidade < 1) {
        throw new Error(
            "Quantidade deve ser maior que zero."
        );
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {
        produto.quantidade =
            produto.quantidade + novaQuantidade;
    } else {
        throw new Error(
            "Produto não encontrado."
        );
    }
}


// ==============================
// CADASTRO PELO FORMULÁRIO
// ==============================

const formProduto = document.getElementById("formProduto");

formProduto.addEventListener("submit", function(event) {

    event.preventDefault();

    try {
        const descricao =
            document.getElementById("descricao").value.trim();

        const quantidade =
            Number(document.getElementById("quantidade").value);

        const valor =
            Number(document.getElementById("valor").value);

        cadastrarProduto(descricao, quantidade, valor);

        document.getElementById("mensagem").textContent =
            "Produto cadastrado com sucesso!";

        document.getElementById("mensagem").style.color =
            "green";

        formProduto.reset();

        listarProdutos();

    } catch (erro) {

        document.getElementById("mensagem").textContent =
            erro.message;

        document.getElementById("mensagem").style.color =
            "red";
    }
});


// ==============================
// ATUALIZAÇÃO DO VALOR
// ==============================

const formValor = document.getElementById("formValor");

formValor.addEventListener("submit", function(event) {

    event.preventDefault();

    try {
        const codigo =
            Number(document.getElementById("codigoValor").value);

        const novoValor =
            Number(document.getElementById("novoValor").value);

        atualizarValor(codigo, novoValor);

        alert("Valor atualizado com sucesso!");

        formValor.reset();

        listarProdutos();

    } catch (erro) {

        alert(erro.message);
    }
});


// ==============================
// ATUALIZAÇÃO DA QUANTIDADE
// ==============================

const formQuantidade =
    document.getElementById("formQuantidade");

formQuantidade.addEventListener("submit", function(event) {

    event.preventDefault();

    try {
        const codigo =
            Number(
                document.getElementById("codigoQuantidade").value
            );

        const novaQuantidade =
            Number(
                document.getElementById("novaQuantidade").value
            );

        atualizarQuantidade(codigo, novaQuantidade);

        alert("Quantidade atualizada com sucesso!");

        formQuantidade.reset();

        listarProdutos();

    } catch (erro) {

        alert(erro.message);
    }
});


// ==============================
// INICIAR LISTAGEM
// ==============================

listarProdutos();
