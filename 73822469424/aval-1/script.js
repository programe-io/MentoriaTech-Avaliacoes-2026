let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("A descrição deve possuir pelo menos 5 caracteres.");
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
        const descricao = document.getElementById("descricao").value;
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

        limparCampos();
        listarProdutos();

    } catch (erro) {
        alert(erro.message);
    }
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
                <td>R$ ${produto.valor.toFixed(2)}</td>
                <td>
                    <button onclick="atualizarValor(${produto.codigo})">
                        Alterar Valor
                    </button>

                    <button onclick="atualizarQuantidade(${produto.codigo})">
                        Adicionar Estoque
                    </button>
                </td>
            </tr>
        `;
    });
}

function buscarProdutoPorCodigo(codigo) {
    return produtos.find(produto => produto.codigo === codigo);
}

function atualizarValor(codigo) {
    const produto = buscarProdutoPorCodigo(codigo);

    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    const novoValor = Number(prompt("Digite o novo valor:"));

    if (novoValor < 0) {
        alert("Valor inválido.");
        return;
    }

    produto.valor = novoValor;

    listarProdutos();
}

function atualizarQuantidade(codigo) {
    const produto = buscarProdutoPorCodigo(codigo);

    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    const quantidade = Number(prompt("Quantidade a adicionar:"));

    if (quantidade < 1) {
        alert("Quantidade inválida.");
        return;
    }

    produto.quantidade += quantidade;

    listarProdutos();
}

function limparCampos() {
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}