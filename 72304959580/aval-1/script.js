
let produtos = [];

// Cadastrar produto
function cadastrarProduto() {

    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao || quantidade < 0 || valor < 0 ||
        document.getElementById("quantidade").value === "" ||
        document.getElementById("valor").value === "") {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    let existe = produtos.find(p => p.codigo === codigo);

    if (existe) {
        alert("Código já cadastrado!");
        return;
    }

    produtos.push({
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    });

    alert("Produto cadastrado com sucesso!");

    limparCampos();
    listarProdutos();
}

// Listar produtos
function listarProdutos() {

    let tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    produtos.forEach(produto => {

        tabela.innerHTML += `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>
                <td>
                    <button class="btn-alterar"
                    onclick="alterarValor(${produto.codigo})">
                    Alterar Valor
                    </button>

                    <button class="btn-alterar"
                    onclick="alterarQuantidade(${produto.codigo})">
                    Alterar Quantidade
                    </button>
                </td>
            </tr>
        `;
    });
}

// Alterar valor
function alterarValor(codigo) {

    let produto = produtos.find(p => p.codigo === codigo);

    let novoValor = prompt("Digite o novo valor:");

    if (novoValor === null || novoValor.trim() === "") return;

    novoValor = Number(novoValor);

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produto.valor = novoValor;

    alert("Valor alterado com sucesso!");

    listarProdutos();
}

// Alterar quantidade
function alterarQuantidade(codigo) {

    let produto = produtos.find(p => p.codigo === codigo);

    let novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") return;

    novaQuantidade = Number(novaQuantidade);

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produto.quantidade = novaQuantidade;

    alert("Quantidade alterada com sucesso!");

    listarProdutos();
}

// Limpar campos
function limparCampos() {

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

}
