
let produtos = [];
let geradorDeCodigo = 0;

function cadastrarProduto() {
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (descricao.trim() === "" ||
        document.getElementById("quantidade").value === "" ||
        document.getElementById("valor").value === "" ||
        !Number.isInteger(quantidade) || quantidade < 0 ||
        !Number.isFinite(valor) || valor < 0) {
        alert("Preencha os dados corretamente!");
        return;
    }

    let produto = {
        codigo: ++geradorDeCodigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    listarProdutos();

    alert("Produto cadastrado com sucesso!");
}

function listarProdutos() {
    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach(function(produto) {
        lista.innerHTML += `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>
                <td class="acoes">
                    <button onclick="alterarValor(${produto.codigo})">
                        Alterar valor
                    </button>
                    <button onclick="alterarQuantidade(${produto.codigo})">
                        Alterar quantidade
                    </button>
                </td>
            </tr>
        `;
    });
}

function buscarProduto(codigo) {
    return produtos.find(function(produto) {
        return produto.codigo === codigo;
    });
}

function alterarValor(codigo) {
    let produto = buscarProduto(codigo);

    let novoValor = prompt("Digite o novo valor:");

    if (novoValor === null || novoValor.trim() === "") {
        return;
    }

    novoValor = Number(novoValor);

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Valor inválido!");
        return;
    }

    produto.valor = novoValor;

    listarProdutos();

    alert("Valor atualizado!");
}

function alterarQuantidade(codigo) {
    let produto = buscarProduto(codigo);

    let novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") {
        return;
    }

    novaQuantidade = Number(novaQuantidade);

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
        alert("Quantidade inválida!");
        return;
    }

    produto.quantidade = novaQuantidade;

    listarProdutos();

    alert("Quantidade atualizada!");
}
