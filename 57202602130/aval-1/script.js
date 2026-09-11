// Array que armazenará os produtos
let produtos = [];


// ======================================================
// FUNÇÃO PARA VALIDAR O PRODUTO
// ======================================================

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


// ======================================================
// FUNÇÃO PARA CADASTRAR PRODUTO
// ======================================================

function cadastrarProduto(descricao, quantidade, valor) {

    // Validação dos dados
    validarProduto(descricao, quantidade, valor);

    // Criação do objeto produto
    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    // Adiciona o produto ao array
    produtos.push(novoProduto);
}


// ======================================================
// FUNÇÃO PARA LISTAR PRODUTOS
// ======================================================

function listarProdutos() {

    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = `
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

        lista.appendChild(linha);
    });
}


// ======================================================
// FUNÇÃO PARA BUSCAR PRODUTO PELO CÓDIGO
// ======================================================

function buscarProdutoPorCodigo(codigoProduto) {

    return produtos.find(function(produto) {
        return produto.codigo === codigoProduto;
    });
}


// ======================================================
// FUNÇÃO PARA ATUALIZAR O VALOR
// ======================================================

function atualizarValor(codigoProduto, novoValor) {

    if (novoValor < 0) {
        throw new Error(
            "O valor deve ser maior ou igual a zero."
        );
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {

        // O novo valor substitui o valor antigo
        produto.valor = novoValor;

    } else {

        throw new Error(
            "Produto não encontrado."
        );
    }
}


// ======================================================
// FUNÇÃO PARA ATUALIZAR A QUANTIDADE
// ======================================================

function atualizarQuantidade(codigoProduto, novaQuantidade) {

    if (novaQuantidade < 1) {
        throw new Error(
            "A quantidade deve ser maior que zero."
        );
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {

        // Soma a nova quantidade ao estoque atual
        produto.quantidade =
            produto.quantidade + novaQuantidade;

    } else {

        throw new Error(
            "Produto não encontrado."
        );
    }
}


// ======================================================
// EVENTO DE CADASTRO
// ======================================================

document
    .getElementById("formProduto")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const mensagem = document.getElementById("mensagem");

        try {

            const descricao =
                document.getElementById("descricao").value.trim();

            const quantidade =
                Number(document.getElementById("quantidade").value);

            const valor =
                Number(document.getElementById("valor").value);

            cadastrarProduto(
                descricao,
                quantidade,
                valor
            );

            mensagem.textContent =
                "Produto cadastrado com sucesso!";

            mensagem.className = "sucesso";

            this.reset();

            listarProdutos();

        } catch (erro) {

            mensagem.textContent = erro.message;
            mensagem.className = "erro";
        }
    });


// ======================================================
// EVENTO PARA ATUALIZAR VALOR
// ======================================================

document
    .getElementById("formValor")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const mensagem =
            document.getElementById("mensagemValor");

        try {

            const codigo =
                Number(
                    document.getElementById("codigoValor").value
                );

            const novoValor =
                Number(
                    document.getElementById("novoValor").value
                );

            atualizarValor(codigo, novoValor);

            mensagem.textContent =
                "Valor atualizado com sucesso!";

            mensagem.className = "sucesso";

            this.reset();

            listarProdutos();

        } catch (erro) {

            mensagem.textContent = erro.message;
            mensagem.className = "erro";
        }
    });


// ======================================================
// EVENTO PARA ADICIONAR QUANTIDADE
// ======================================================

document
    .getElementById("formQuantidade")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const mensagem =
            document.getElementById("mensagemQuantidade");

        try {

            const codigo =
                Number(
                    document.getElementById("codigoQuantidade").value
                );

            const novaQuantidade =
                Number(
                    document.getElementById("novaQuantidade").value
                );

            atualizarQuantidade(
                codigo,
                novaQuantidade
            );

            mensagem.textContent =
                "Quantidade adicionada ao estoque com sucesso!";

            mensagem.className = "sucesso";

            this.reset();

            listarProdutos();

        } catch (erro) {

            mensagem.textContent = erro.message;
            mensagem.className = "erro";
        }
    });


// ======================================================
// LISTAGEM INICIAL
// ======================================================

listarProdutos();
