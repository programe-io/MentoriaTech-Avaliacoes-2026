
let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        alert("A descrição deve ter pelo menos 5 caracteres.");
        return false;
    }

    if (quantidade < 1 || !Number.isInteger(quantidade)) {
        alert("A quantidade deve ser maior que zero.");
        return false;
    }

    if (valor < 0 || !Number.isFinite(valor)) {
        alert("Digite um valor válido.");
        return false;
    }

    return true;
}

function cadastrarProduto(descricao, quantidade, valor) {

    if (!validarProduto(descricao, quantidade, valor)) {
        return;
    }

    let novoProduto = {
        codigo: produtos.length > 0
            ? Math.max(...produtos.map(p => p.codigo)) + 1
            : 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    listarProdutos();
}

function listarProdutos() {

    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach(produto => {

        let linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>${formatarMoeda(produto.valor)}</td>
            <td>
                <div class="acoes">
                    <button class="atualizar"
                    onclick="atualizarValor(${produto.codigo})">
                    Preço
                    </button>

                    <button
                    onclick="atualizarQuantidade(${produto.codigo})">
                    Estoque
                    </button>

                    <button class="excluir"
                    onclick="excluirProduto(${produto.codigo})">
                    Excluir
                    </button>
                </div>
            </td>
        `;

        lista.appendChild(linha);
    });

    atualizarResumo();
}

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function atualizarResumo() {

    let totalProdutos = produtos.length;

    let totalItens = produtos.reduce(
        (total, produto) => total + produto.quantidade, 0
    );

    let valorTotal = produtos.reduce(
        (total, produto) => total + produto.quantidade * produto.valor, 0
    );

    document.getElementById("totalProdutos").textContent = totalProdutos;

    document.getElementById("totalItens").textContent = totalItens;

    document.getElementById("valorEstoque").textContent =
        formatarMoeda(valorTotal);
}

function atualizarValor(codigoProduto) {

    let produto = produtos.find(p => p.codigo === codigoProduto);

    let novoValor = prompt("Digite o novo valor do produto:");

    if (novoValor === null || novoValor.trim() === "") return;

    novoValor = Number(novoValor);

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Digite um valor válido.");
        return;
    }

    produto.valor = novoValor;

    listarProdutos();
}

function atualizarQuantidade(codigoProduto) {

    let produto = produtos.find(p => p.codigo === codigoProduto);

    let quantidade = prompt("Quantos itens deseja adicionar?");

    if (quantidade === null || quantidade.trim() === "") return;

    quantidade = Number(quantidade);

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        alert("Digite uma quantidade válida.");
        return;
    }

    produto.quantidade += quantidade;

    listarProdutos();
}

function excluirProduto(codigoProduto) {

    if (!confirm("Deseja realmente excluir este produto?")) return;

    produtos = produtos.filter(
        produto => produto.codigo !== codigoProduto
    );

    listarProdutos();
}

document.getElementById("formProduto").addEventListener("submit", function(e) {

    e.preventDefault();

    let descricao = document.getElementById("descricao").value.trim();

    let quantidade = Number(document.getElementById("quantidade").value);

    let valor = Number(document.getElementById("valor").value);

    let tamanhoAnterior = produtos.length;

    cadastrarProduto(descricao, quantidade, valor);

    if (produtos.length > tamanhoAnterior) {
        this.reset();
    }
});

document.getElementById("pesquisa").addEventListener("input", function() {

    let pesquisa = this.value.toLowerCase();

    document.querySelectorAll("#listaProdutos tr").forEach(linha => {

        let nome = linha.cells[1].textContent.toLowerCase();

        linha.style.display = nome.includes(pesquisa) ? "" : "none";

    });
});

// Produtos iniciais para demonstração
cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logitech", 38, 99.00);
cadastrarProduto("Teclado Mecânico", 15, 250.00);
