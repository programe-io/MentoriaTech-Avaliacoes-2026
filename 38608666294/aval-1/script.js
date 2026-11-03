
let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("Descrição deve ter no mínimo 5 caracteres.");
    }

    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero.");
    }

    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero.");
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
    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach(function(produto) {
        let linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
            <td>
                <input type="number" min="0" step="0.01"
                    id="valor-${produto.codigo}"
                    value="${produto.valor}">

                <button onclick="atualizarValor(
                    ${produto.codigo},
                    Number(document.getElementById('valor-${produto.codigo}').value)
                )">
                    Alterar valor
                </button>

                <input type="number" min="1"
                    id="quantidade-${produto.codigo}"
                    value="${produto.quantidade}">

                <button onclick="atualizarQuantidade(
                    ${produto.codigo},
                    Number(document.getElementById('quantidade-${produto.codigo}').value)
                )">
                    Alterar quantidade
                </button>
            </td>
        `;

        lista.appendChild(linha);
    });
}

function atualizarValor(codigo, novoValor) {
    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {
        produto.valor = novoValor;
        listarProdutos();
    }
}

function atualizarQuantidade(codigo, novaQuantidade) {
    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {
        produto.quantidade = novaQuantidade;
        listarProdutos();
    }
}

document.getElementById("formProduto").addEventListener("submit", function(event) {
    event.preventDefault();

    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);
    let mensagem = document.getElementById("mensagem");

    try {
        cadastrarProduto(descricao, quantidade, valor);

        mensagem.textContent = "Produto cadastrado com sucesso!";
        mensagem.style.color = "green";

        document.getElementById("formProduto").reset();

        listarProdutos();
    } catch (erro) {
        mensagem.textContent = erro.message;
        mensagem.style.color = "red";
    }
});

listarProdutos();
