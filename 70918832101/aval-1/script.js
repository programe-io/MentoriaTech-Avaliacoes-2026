
// Vetor para armazenar os produtos
let produtos = [];

// Cadastrar produto
function cadastrarProduto() {

    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (
        !codigo ||
        !descricao.trim() ||
        document.getElementById("quantidade").value === "" ||
        document.getElementById("valor").value === "" ||
        quantidade < 0 ||
        valor < 0
    ) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Verificar código repetido
    if (produtos.some(p => p.codigo === codigo)) {
        alert("Este código já está cadastrado!");
        return;
    }

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    limparCampos();
    listarProdutos();
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
                    <button class="alterar"
                    onclick="alterarValor(${index})">
                    Valor
                    </button>

                    <button class="alterar"
                    onclick="alterarQuantidade(${index})">
                    Quantidade
                    </button>

                    <button class="excluir"
                    onclick="excluirProduto(${index})">
                    Excluir
                    </button>
                </td>
            </tr>
        `;
    });
}

// Alterar valor do produto
function alterarValor(index) {

    let novoValor = prompt("Digite o novo valor:");

    if (novoValor === null || novoValor.trim() === "") {
        return;
    }

    novoValor = Number(novoValor);

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produtos[index].valor = novoValor;

    alert("Valor alterado com sucesso!");

    listarProdutos();
}

// Alterar quantidade do produto
function alterarQuantidade(index) {

    let novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") {
        return;
    }

    novaQuantidade = Number(novaQuantidade);

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produtos[index].quantidade = novaQuantidade;

    alert("Quantidade alterada com sucesso!");

    listarProdutos();
}

// Excluir produto
function excluirProduto(index) {

    if (confirm("Deseja realmente excluir este produto?")) {

        produtos.splice(index, 1);

        alert("Produto excluído com sucesso!");

        listarProdutos();
    }
}

// Limpar campos
function limparCampos() {

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

}
