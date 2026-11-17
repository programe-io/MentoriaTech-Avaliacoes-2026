
let produtos = [];

// Cadastrar produto
function cadastrarProduto() {

    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = document.getElementById("quantidade").value;
    let valor = document.getElementById("valor").value;

    if (!codigo || !descricao || quantidade === "" || valor === "") {
        alert("Preencha todos os campos!");
        return;
    }

    if (produtos.some(p => p.codigo === codigo)) {
        alert("Esse código já está cadastrado!");
        return;
    }

    if (Number(quantidade) < 0 || Number(valor) < 0) {
        alert("Quantidade e valor não podem ser negativos!");
        return;
    }

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: Number(quantidade),
        valor: Number(valor)
    };

    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    listarProdutos();

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}

// Listar produtos
function listarProdutos() {

    let tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    produtos.forEach((produto, index) => {

        tabela.innerHTML += `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>
                <td>
                    <button onclick="alterarValor(${index})">
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

// Alterar valor do produto
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

    alert("Valor alterado com sucesso!");
}

// Alterar quantidade do produto
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

    alert("Quantidade alterada com sucesso!");
}
