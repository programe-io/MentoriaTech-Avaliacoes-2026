
let produtos = [];
let proximoCodigo = 1;

// CADASTRAR PRODUTO
function cadastrarProduto() {

    let descricao = document.getElementById("descricao").value.trim();
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (descricao.length < 3) {
        alert("Digite uma descrição válida!");
        return;
    }

    if (document.getElementById("quantidade").value === "" ||
        !Number.isInteger(quantidade) || quantidade < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    if (document.getElementById("valor").value === "" ||
        !Number.isFinite(valor) || valor <= 0) {
        alert("Digite um valor válido!");
        return;
    }

    let produto = {
        codigo: proximoCodigo++,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    listarProdutos();
}

// LISTAR PRODUTOS
function listarProdutos() {

    let tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    produtos.forEach(function(produto) {

        let linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })}</td>

            <td>
                <button class="entrada"
                    onclick="adicionarEstoque(${produto.codigo})">
                    + Estoque
                </button>

                <button class="saida"
                    onclick="retirarEstoque(${produto.codigo})">
                    - Estoque
                </button>

                <button onclick="atualizarValor(${produto.codigo})">
                    Editar
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

// BUSCAR PRODUTO COM FIND
function buscarProduto() {

    let codigo = Number(
        document.getElementById("buscarCodigo").value
    );

    let produto = produtos.find(function(item) {
        return item.codigo === codigo;
    });

    let resultado = document.getElementById("resultadoBusca");

    if (produto) {
        resultado.innerHTML =
            "Produto: " + produto.descricao +
            " | Quantidade: " + produto.quantidade +
            " | Valor: R$ " + produto.valor.toFixed(2);
    } else {
        resultado.innerHTML = "Produto não encontrado!";
    }
}

// ADICIONAR ESTOQUE
function adicionarEstoque(codigo) {

    let produto = produtos.find(p => p.codigo === codigo);

    let quantidade = Number(
        prompt("Quantas unidades deseja adicionar?")
    );

    if (quantidade > 0 && Number.isInteger(quantidade)) {

        produto.quantidade += quantidade;

        alert("Estoque atualizado!");

        listarProdutos();

    } else {
        alert("Quantidade inválida!");
    }
}

// RETIRAR ESTOQUE
function retirarEstoque(codigo) {

    let produto = produtos.find(p => p.codigo === codigo);

    let quantidade = Number(
        prompt("Quantas unidades deseja retirar?")
    );

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        alert("Quantidade inválida!");
        return;
    }

    if (quantidade > produto.quantidade) {
        alert("Estoque insuficiente!");
        return;
    }

    produto.quantidade -= quantidade;

    alert("Saída registrada!");

    listarProdutos();
}

// ATUALIZAR VALOR
function atualizarValor(codigo) {

    let produto = produtos.find(p => p.codigo === codigo);

    let novoValor = Number(
        prompt("Digite o novo valor:")
    );

    if (novoValor > 0 && Number.isFinite(novoValor)) {

        produto.valor = novoValor;

        alert("Valor atualizado!");

        listarProdutos();

    } else {
        alert("Valor inválido!");
    }
}

// EXCLUIR PRODUTO
function excluirProduto(codigo) {

    let confirmar = confirm("Deseja excluir este produto?");

    if (!confirmar) {
        return;
    }

    produtos = produtos.filter(function(produto) {
        return produto.codigo !== codigo;
    });

    alert("Produto excluído!");

    listarProdutos();
}

// ATUALIZAR RESUMO
function atualizarResumo() {

    let unidades = 0;
    let total = 0;

    produtos.forEach(function(produto) {

        unidades += produto.quantidade;

        total += produto.quantidade * produto.valor;

    });

    document.getElementById("totalProdutos").textContent =
        produtos.length;

    document.getElementById("totalUnidades").textContent =
        unidades;

    document.getElementById("valorEstoque").textContent =
        total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
}
