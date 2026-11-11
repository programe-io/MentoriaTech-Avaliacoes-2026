
let produtos = [];

// Cadastrar produto
function cadastrarProduto() {

    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value.trim();
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (
        document.getElementById("codigo").value === "" ||
        !Number.isInteger(codigo) ||
        codigo <= 0 ||
        descricao === "" ||
        document.getElementById("quantidade").value === "" ||
        !Number.isInteger(quantidade) ||
        quantidade < 0 ||
        document.getElementById("valor").value === "" ||
        !Number.isFinite(valor) ||
        valor < 0
    ) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    let existe = produtos.find(p => p.codigo === codigo);

    if (existe) {
        alert("Esse código já está cadastrado!");
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
                    <button class="botao-valor"
                        onclick="alterarValor(${index})">
                        Alterar Valor
                    </button>

                    <button class="botao-quantidade"
                        onclick="alterarQuantidade(${index})">
                        Alterar Quantidade
                    </button>

                    <button class="botao-excluir"
                        onclick="excluirProduto(${index})">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });
}

// Alterar valor
function alterarValor(index) {

    let novoValor = prompt("Digite o novo valor do produto:");

    if (novoValor === null || novoValor.trim() === "") {
        return;
    }

    novoValor = Number(novoValor.replace(",", "."));

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produtos[index].valor = novoValor;

    alert("Valor alterado com sucesso!");

    listarProdutos();
}

// Alterar quantidade
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

    let confirmar = confirm("Deseja excluir este produto?");

    if (confirmar) {
        produtos.splice(index, 1);
        listarProdutos();
        alert("Produto excluído!");
    }
}

// Limpar campos
function limparCampos() {

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}
