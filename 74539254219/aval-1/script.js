
let produtos = [];

function cadastrarProduto() {
    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao || quantidade < 0 ||
        document.getElementById("quantidade").value === "" ||
        document.getElementById("valor").value === "" ||
        valor < 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    if (produtos.some(p => p.codigo === codigo)) {
        alert("Esse código já está cadastrado!");
        return;
    }

    let produto = {
        codigo,
        descricao,
        quantidade,
        valor
    };

    produtos.push(produto);

    listarProdutos();

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}

function listarProdutos() {
    let tabela = document.getElementById("tabelaProdutos");

    tabela.innerHTML = "";

    produtos.forEach((produto, index) => {
        tabela.innerHTML += `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>
                <td>
                    <button class="alterar"
                        onclick="alterarValor(${index})">
                        Alterar Valor
                    </button>

                    <button onclick="alterarQuantidade(${index})">
                        Alterar Quantidade
                    </button>
                </td>
            </tr>
        `;
    });
}

function alterarValor(index) {
    let novoValor = prompt("Digite o novo valor:");

    if (novoValor === null || novoValor.trim() === "") return;

    novoValor = Number(novoValor);

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produtos[index].valor = novoValor;

    listarProdutos();
}

function alterarQuantidade(index) {
    let novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") return;

    novaQuantidade = Number(novaQuantidade);

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produtos[index].quantidade = novaQuantidade;

    listarProdutos();
}
