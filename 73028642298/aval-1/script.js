let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("Descrição deve ter no mínimo cinco caracteres");
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

function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }

    const produto = produtos.find(prod => prod.codigo === codigoProduto);

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

    const produto = produtos.find(prod => prod.codigo === codigoProduto);

    if (produto) {
        produto.quantidade = novaQuantidade;
        listarProdutos();
    } else {
        throw new Error("Produto não encontrado");
    }
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
            <td>R$ ${produto.valor.toFixed(2)}</td>
            <td>
                <button 
                    class="btn-atualizar"
                    onclick="alterarQuantidade(${produto.codigo})">
                    Alterar Quantidade
                </button>

                <button 
                    class="btn-atualizar"
                    onclick="alterarValor(${produto.codigo})">
                    Alterar Valor
                </button>
            </td>
        `;

        lista.appendChild(linha);
    });
}

function alterarQuantidade(codigo) {
    const novaQuantidade = Number(
        prompt("Digite a nova quantidade:")
    );

    if (isNaN(novaQuantidade)) {
        alert("Digite uma quantidade válida.");
        return;
    }

    try {
        atualizarQuantidade(codigo, novaQuantidade);
    } catch (erro) {
        alert(erro.message);
    }
}

function alterarValor(codigo) {
    const novoValor = Number(
        prompt("Digite o novo valor:")
    );

    if (isNaN(novoValor)) {
        alert("Digite um valor válido.");
        return;
    }

    try {
        atualizarValor(codigo, novoValor);
    } catch (erro) {
        alert(erro.message);
    }
}


// Cadastro pelo formulário
document.getElementById("formProduto").addEventListener("submit", function(event) {

    event.preventDefault();

    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(
        document.getElementById("quantidade").value
    );
    const valor = Number(
        document.getElementById("valor").value
    );

    try {
        cadastrarProduto(descricao, quantidade, valor);

        alert("Produto cadastrado com sucesso!");

        document.getElementById("formProduto").reset();

    } catch (erro) {
        alert(erro.message);
    }
});