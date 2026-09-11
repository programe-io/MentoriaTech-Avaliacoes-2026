// Array que armazenará os produtos
let produtos = [];


// ==============================
// VALIDAR PRODUTO
// ==============================

function validarProduto(descricao, quantidade, valor) {

    if (descricao.length < 5) {
        throw new Error(
            "A descrição deve ter, no mínimo, 5 caracteres."
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


// ==============================
// CADASTRAR PRODUTO
// ==============================

function cadastrarProduto(descricao, quantidade, valor) {

    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    listarProdutos();
}


// ==============================
// LISTAR PRODUTOS
// ==============================

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


// ==============================
// ATUALIZAR VALOR
// ==============================

function atualizarValor() {

    const codigo = Number(
        document.getElementById("codigoAtualizar").value
    );

    const novoValor = Number(
        document.getElementById("novoValor").value
    );

    try {

        if (novoValor < 0) {
            throw new Error(
                "O valor deve ser maior ou igual a zero."
            );
        }

        const produto = produtos.find(
            (prod) => prod.codigo === codigo
        );

        if (produto) {

            produto.valor = novoValor;

            listarProdutos();

            alert("Valor atualizado com sucesso!");

        } else {

            throw new Error("Produto não encontrado.");
        }

    } catch (erro) {

        alert(erro.message);
    }
}


// ==============================
// ATUALIZAR QUANTIDADE
// ==============================

function atualizarQuantidade() {

    const codigo = Number(
        document.getElementById("codigoQuantidade").value
    );

    const novaQuantidade = Number(
        document.getElementById("novaQuantidade").value
    );

    try {

        if (novaQuantidade < 1) {
            throw new Error(
                "A quantidade deve ser maior que zero."
            );
        }

        const produto = produtos.find(
            (prod) => prod.codigo === codigo
        );

        if (produto) {

            produto.quantidade =
                produto.quantidade + novaQuantidade;

            listarProdutos();

            alert("Quantidade adicionada com sucesso!");

        } else {

            throw new Error("Produto não encontrado.");
        }

    } catch (erro) {

        alert(erro.message);
    }
}


// ==============================
// FORMULÁRIO DE CADASTRO
// ==============================

document
    .getElementById("formProduto")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const descricao =
            document.getElementById("descricao").value;

        const quantidade =
            Number(document.getElementById("quantidade").value);

        const valor =
            Number(document.getElementById("valor").value);

        try {

            cadastrarProduto(
                descricao,
                quantidade,
                valor
            );

            alert("Produto cadastrado com sucesso!");

            // Limpar formulário
            document.getElementById("formProduto").reset();

        } catch (erro) {

            alert(erro.message);
        }
    });