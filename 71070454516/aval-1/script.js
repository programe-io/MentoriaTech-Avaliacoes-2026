let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error(
            "Descrição deve ter no mínimo cinco caracteres"
        );
    }

    if (quantidade <= 1) {
        throw new Error(
            "Quantidade deve ser maior que zero"
        );
    }

    if (valor <= 0) {
        throw new Error(
            "Valor deve ser maior que zero"
        );
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
}

function listarProdutos() {
    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach(produto => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.valor.toFixed(2).replace(".", ",")}</td>
        `;

        lista.appendChild(linha);
    });
}

function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error(
            "Valor deve ser maior ou igual a zero"
        );
    }

    const produto = produtos.find(
        p => p.codigo === codigoProduto
    );

    if (produto) {
        produto.valor = novoValor;
    } else {
        throw new Error("Produto não encontrado");
    }
}

function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 1) {
        throw new Error(
            "Quantidade deve ser maior que zero"
        );
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.quantidade += novaQuantidade;
    } else {
        throw new Error("Produto não encontrado");
    }
}


// CADASTRAR PRODUTO
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
            cadastrarProduto(descricao, quantidade, valor);

            listarProdutos();

            mensagem.textContent =
                "Produto cadastrado com sucesso!";

            mensagem.className = "sucesso";

            document.getElementById("formProduto").reset();

        } catch (erro) {

            mensagem.textContent = erro.message;
            mensagem.className = "erro";
        }
    });


// ATUALIZAR VALOR
document
    .getElementById("btnValor")
    .addEventListener("click", function() {

        const codigo =
            Number(document.getElementById("codigo").value);

        const novoValor =
            Number(document.getElementById("novoValor").value);

        const mensagem =
            document.getElementById("mensagemAtualizacao");

        try {
            atualizarValor(codigo, novoValor);

            listarProdutos();

            mensagem.textContent =
                "Valor atualizado com sucesso!";

            mensagem.className = "sucesso";

        } catch (erro) {

            mensagem.textContent = erro.message;
            mensagem.className = "erro";
        }
    });


// ATUALIZAR QUANTIDADE
document
    .getElementById("btnQuantidade")
    .addEventListener("click", function() {

        const codigo =
            Number(document.getElementById("codigo").value);

        const novaQuantidade =
            Number(document.getElementById("novaQuantidade").value);

        const mensagem =
            document.getElementById("mensagemAtualizacao");

        try {
            atualizarQuantidade(codigo, novaQuantidade);

            listarProdutos();

            mensagem.textContent =
                "Quantidade atualizada com sucesso!";

            mensagem.className = "sucesso";

        } catch (erro) {

            mensagem.textContent = erro.message;
            mensagem.className = "erro";
        }
    });


// PRODUTOS INICIAIS
cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logi", 38, 99.00);

listarProdutos();
