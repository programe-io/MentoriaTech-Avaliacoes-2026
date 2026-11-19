
let produtos = [];

// Cadastrar produto
function cadastrarProduto() {

    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao.trim() ||
        !Number.isInteger(quantidade) || quantidade < 0 ||
        !Number.isFinite(valor) || valor < 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

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

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    listarProdutos();
}

// Listar produtos
function listarProdutos() {

    let tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    produtos.forEach((produto, indice) => {

        tabela.innerHTML += `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>

                <td class="acoes">
                    <button class="btn-valor"
                        onclick="alterarValor(${indice})">
                        Alterar Valor
                    </button>

                    <button class="btn-quantidade"
                        onclick="alterarQuantidade(${indice})">
                        Alterar Quantidade
                    </button>
                </td>
            </tr>
        `;
    });
}

// Alterar valor
function alterarValor(indice) {

    let novoValor = Number(
        prompt("Digite o novo valor do produto:")
    );

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Valor inválido!");
        return;
    }

    produtos[indice].valor = novoValor;

    alert("Valor alterado com sucesso!");

    listarProdutos();
}

// Alterar quantidade
function alterarQuantidade(indice) {

    let novaQuantidade = Number(
        prompt("Digite a nova quantidade:")
    );

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
        alert("Quantidade inválida!");
        return;
    }

    produtos[indice].quantidade = novaQuantidade;

    alert("Quantidade alterada com sucesso!");

    listarProdutos();
}
