
let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("Descrição deve ter, no mínimo, cinco caracteres");
    }

    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
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
    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach((produto) => {
        lista.innerHTML += `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>
            </tr>
        `;
    });
}

function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }

    const produto = produtos.find(
        (prod) => prod.codigo === codigoProduto
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
        (prod) => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.quantidade = novaQuantidade;
        listarProdutos();
    } else {
        throw new Error("Produto não encontrado");
    }
}

// Cadastrar produto pelo formulário
function cadastrar() {
    try {
        let descricao = document.getElementById("descricao").value;
        let quantidade = Number(document.getElementById("quantidade").value);
        let valor = Number(document.getElementById("valor").value);

        cadastrarProduto(descricao, quantidade, valor);

        alert("Produto cadastrado com sucesso!");

        document.getElementById("descricao").value = "";
        document.getElementById("quantidade").value = "";
        document.getElementById("valor").value = "";

    } catch (erro) {
        alert(erro.message);
    }
}

// Atualizar preço
function atualizarPreco() {
    try {
        let codigo = Number(document.getElementById("codigo").value);
        let valor = Number(document.getElementById("novoValor").value);

        atualizarValor(codigo, valor);

        alert("Valor atualizado com sucesso!");

    } catch (erro) {
        alert(erro.message);
    }
}

// Atualizar quantidade
function atualizarEstoque() {
    try {
        let codigo = Number(document.getElementById("codigo").value);
        let quantidade = Number(document.getElementById("novaQuantidade").value);

        atualizarQuantidade(codigo, quantidade);

        alert("Quantidade atualizada com sucesso!");

    } catch (erro) {
        alert(erro.message);
    }
}

// Produtos iniciais
cadastrarProduto("Cadeira gamer", 12, 699.00);
cadastrarProduto("Mouse Logi", 38, 99.00);

// Atualizações iniciais
atualizarValor(2, 97.00);
atualizarQuantidade(1, 3);
