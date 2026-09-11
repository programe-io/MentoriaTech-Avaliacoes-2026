// Array que armazena os produtos
let produtos = [];


// ===============================
// VALIDAÇÃO DO PRODUTO
// ===============================

function validarProduto(descricao, quantidade, valor) {

    if (descricao.length < 5) {
        throw new Error(
            "A descrição deve ter, no mínimo, cinco caracteres."
        );
    }

    if (quantidade < 1) {
        throw new Error(
            "A quantidade deve ser maior que zero."
        );
    }

    if (valor < 0) {
        throw new Error(
            "O valor deve ser maior ou igual a zero."
        );
    }
}


// ===============================
// CADASTRAR PRODUTO
// ===============================

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


// ===============================
// LISTAR PRODUTOS
// ===============================

function listarProdutos() {

    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = `
            <tr>
                <td colspan="5">
                    Nenhum produto cadastrado.
                </td>
            </tr>
        `;

        return;
    }

    produtos.forEach(function(produto) {

        const linha = document.createElement("tr");

        const classeEstoque =
            produto.quantidade <= 5
                ? "estoque-baixo"
                : "estoque-normal";

        linha.innerHTML = `
            <td>${produto.codigo}</td>

            <td>${produto.descricao}</td>

            <td class="${classeEstoque}">
                ${produto.quantidade}
            </td>

            <td>
                R$ ${produto.valor.toFixed(2)}
            </td>

            <td>
                <button
                    onclick="prepararAtualizacao(${produto.codigo})"
                >
                    Selecionar
                </button>
            </td>
        `;

        lista.appendChild(linha);
    });
}


// ===============================
// BUSCAR PRODUTO
// ===============================

function buscarProdutoPorCodigo(codigoProduto) {

    return produtos.find(function(produto) {
        return produto.codigo === codigoProduto;
    });
}


// ===============================
// ATUALIZAR VALOR
// ===============================

function atualizarValor(codigoProduto, novoValor) {

    if (novoValor < 0) {
        throw new Error(
            "O valor deve ser maior ou igual a zero."
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


// ===============================
// ATUALIZAR QUANTIDADE
// ===============================

function atualizarQuantidade(
    codigoProduto,
    novaQuantidade
) {

    if (novaQuantidade < 1) {
        throw new Error(
            "A quantidade deve ser maior que zero."
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


// ===============================
// FORMULÁRIO DE CADASTRO
// ===============================

document
    .getElementById("formProduto")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const descricao =
            document.getElementById("descricao").value.trim();

        const quantidade =
            Number(document.getElementById("quantidade").value);

        const valor =
            Number(document.getElementById("valor").value);

        const mensagem =
            document.getElementById("mensagem");

        try {

            cadastrarProduto(
                descricao,
                quantidade,
                valor
            );

            mensagem.textContent =
                "Produto cadastrado com sucesso!";

            mensagem.className = "sucesso";

            document.getElementById("formProduto").reset();

            listarProdutos();

        } catch (erro) {

            mensagem.textContent = erro.message;

            mensagem.className = "erro";
        }
    });


// ===============================
// ATUALIZAR VALOR PELA TELA
// ===============================

function atualizarValorTela() {

    const codigo =
        Number(
            document.getElementById("codigoAtualizar").value
        );

    const novoValor =
        Number(
            document.getElementById("novoValor").value
        );

    const mensagem =
        document.getElementById("mensagem");

    try {

        atualizarValor(codigo, novoValor);

        mensagem.textContent =
            "Valor atualizado com sucesso!";

        mensagem.className = "sucesso";

        document.getElementById("novoValor").value = "";

        listarProdutos();

    } catch (erro) {

        mensagem.textContent = erro.message;

        mensagem.className = "erro";
    }
}


// ===============================
// ATUALIZAR QUANTIDADE PELA TELA
// ===============================

function atualizarQuantidadeTela() {

    const codigo =
        Number(
            document.getElementById("codigoAtualizar").value
        );

    const novaQuantidade =
        Number(
            document.getElementById("novaQuantidade").value
        );

    const mensagem =
        document.getElementById("mensagem");

    try {

        atualizarQuantidade(
            codigo,
            novaQuantidade
        );

        mensagem.textContent =
            "Quantidade adicionada ao estoque com sucesso!";

        mensagem.className = "sucesso";

        document.getElementById("novaQuantidade").value = "";

        listarProdutos();

    } catch (erro) {

        mensagem.textContent = erro.message;

        mensagem.className = "erro";
    }
}


// ===============================
// SELECIONAR PRODUTO
// ===============================

function prepararAtualizacao(codigo) {

    document.getElementById("codigoAtualizar").value = codigo;

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
}


// ===============================
// INICIALIZAÇÃO
// ===============================

listarProdutos();
