
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// Produtos cadastrados automaticamente na primeira execução
if (localStorage.getItem("produtos") === null) {

    produtos = [
        {
            codigo: 1,
            descricao: "Pendrive 64GB",
            quantidade: 40,
            valor: 39.90
        },
        {
            codigo: 2,
            descricao: "Notebook",
            quantidade: 10,
            valor: 2899.90
        },
        {
            codigo: 3,
            descricao: "Celular",
            quantidade: 15,
            valor: 1499.90
        }
    ];

    localStorage.setItem("produtos", JSON.stringify(produtos));
}

let proximoCodigo = produtos.reduce(
    (maior, produto) => Math.max(maior, produto.codigo), 0
) + 1;

const form = document.getElementById("formProduto");

function validarProduto(descricao, quantidade, valor) {

    if (descricao.trim().length < 5) {
        throw new Error("A descrição deve ter pelo menos 5 caracteres.");
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error("A quantidade deve ser maior que zero.");
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }
}

function salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

function cadastrarProduto(descricao, quantidade, valor) {

    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: proximoCodigo++,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    salvarDados();
    listarProdutos();
}

function listarProdutos() {

    let tabela = document.getElementById("listaProdutos");
    tabela.innerHTML = "";

    produtos.forEach(produto => {

        let linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>${formatarMoeda(produto.valor)}</td>
            <td class="acoes">
                <button onclick="atualizarValor(${produto.codigo})">
                    Alterar valor
                </button>

                <button class="entrada"
                    onclick="atualizarQuantidade(${produto.codigo})">
                    + Estoque
                </button>

                <button class="excluir"
                    onclick="excluirProduto(${produto.codigo})">
                    Excluir
                </button>
            </td>
        `;

        tabela.appendChild(linha);
    });

    atualizarResumo();
}

function buscarProdutoPorCodigo(codigoProduto) {

    return produtos.find(produto =>
        produto.codigo === Number(codigoProduto)
    );
}

function atualizarValor(codigoProduto) {

    let produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    let novoValor = prompt("Digite o novo valor:");

    if (novoValor === null || novoValor.trim() === "") return;

    novoValor = Number(novoValor.replace(",", "."));

    try {
        if (!Number.isFinite(novoValor) || novoValor < 0) {
            throw new Error("Valor inválido.");
        }

        produto.valor = novoValor;

        salvarDados();
        listarProdutos();

        alert("Valor atualizado com sucesso!");

    } catch (erro) {
        alert(erro.message);
    }
}

function atualizarQuantidade(codigoProduto) {

    let produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    let quantidade = prompt("Quantas unidades deseja adicionar?");

    if (quantidade === null || quantidade.trim() === "") return;

    quantidade = Number(quantidade);

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        alert("Informe uma quantidade inteira maior que zero.");
        return;
    }

    produto.quantidade += quantidade;

    salvarDados();
    listarProdutos();

    alert("Estoque atualizado!");
}

function excluirProduto(codigoProduto) {

    let produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (confirm("Deseja excluir este produto?")) {

        produtos = produtos.filter(
            produto => produto.codigo !== Number(codigoProduto)
        );

        salvarDados();
        listarProdutos();
    }
}

function formatarMoeda(valor) {

    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function atualizarResumo() {

    document.getElementById("totalProdutos").textContent =
        produtos.length;

    let unidades = produtos.reduce(
        (total, produto) => total + produto.quantidade, 0
    );

    document.getElementById("totalUnidades").textContent =
        unidades;

    let valorTotal = produtos.reduce(
        (total, produto) =>
            total + produto.quantidade * produto.valor, 0
    );

    document.getElementById("valorEstoque").textContent =
        formatarMoeda(valorTotal);
}

form.addEventListener("submit", function(event) {

    event.preventDefault();

    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(
        document.getElementById("quantidade").value
    );
    let valor = Number(
        document.getElementById("valor").value
    );

    try {

        cadastrarProduto(descricao, quantidade, valor);

        alert("Produto cadastrado com sucesso!");

        form.reset();

    } catch (erro) {
        alert(erro.message);
    }
});

document.getElementById("busca").addEventListener("input", function() {

    let pesquisa = this.value.toLowerCase();

    let linhas = document.querySelectorAll("#listaProdutos tr");

    linhas.forEach(linha => {
        linha.style.display =
            linha.textContent.toLowerCase().includes(pesquisa)
            ? ""
            : "none";
    });
});

// Inicia o sistema
listarProdutos();
