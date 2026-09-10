let produtos = [];

function validarProdutos(descricao, quantidade, valor) {

    if (descricao.length < 5) {
        throw new Error("Descrição deve ter no mínimo 5 caracteres");
    }

    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
}

function cadastrarProduto(descricao, quantidade, valor) {

    validarProdutos(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);
}

function listarProdutos() {
    return produtos;
}

function atualizarValor(codigoProduto, novoValor) {

    if (novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }

    const produto = produtos.find(
        produto => produto.codigo === codigoProduto
    );

    if (produto) {
        produto.valor = novoValor;
    } else {
        throw new Error("Produto não encontrado");
    }
}

function cadastrarProdutoHTML() {

    try {
        let descricao = document.getElementById("descricao").value;
        let quantidade = Number(
            document.getElementById("quantidade").value
        );
        let valor = Number(
            document.getElementById("valor").value
        );

        cadastrarProduto(descricao, quantidade, valor);

        alert("Produto cadastrado com sucesso!");

        document.getElementById("descricao").value = "";
        document.getElementById("quantidade").value = "";
        document.getElementById("valor").value = "";

    } catch (erro) {
        alert(erro.message);
    }
}

function listarProdutosHTML() {

    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach(function(produto) {

        lista.innerHTML += `
            <div class="produto">
                <p><strong>Código:</strong> ${produto.codigo}</p>
                <p><strong>Descrição:</strong> ${produto.descricao}</p>
                <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
                <p><strong>Valor:</strong> R$ ${produto.valor.toFixed(2)}</p>
            </div>
        `;

    });
}

function atualizarValorHTML() {

    try {
        let codigo = Number(
            document.getElementById("codigo").value
        );

        let novoValor = Number(
            document.getElementById("novoValor").value
        );

        atualizarValor(codigo, novoValor);

        alert("Valor atualizado com sucesso!");

        document.getElementById("codigo").value = "";
        document.getElementById("novoValor").value = "";

        listarProdutosHTML();

    } catch (erro) {
        alert(erro.message);
    }
}