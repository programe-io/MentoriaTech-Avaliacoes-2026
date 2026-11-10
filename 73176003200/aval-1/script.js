
// Array para armazenar os produtos
let produtos = [];

// Função para cadastrar produto
function cadastrarProduto() {

    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao.trim() ||
        !Number.isInteger(quantidade) || quantidade < 0 ||
        !Number.isFinite(valor) || valor < 0 ||
        document.getElementById("valor").value === "") {

        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Verificar se o código já existe
    let existe = produtos.find(p => p.codigo === codigo);

    if (existe) {
        alert("Já existe um produto com esse código!");
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

// Função para listar produtos
function listarProdutos() {

    let tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    produtos.forEach(produto => {

        let linha = tabela.insertRow();

        linha.insertCell(0).textContent = produto.codigo;
        linha.insertCell(1).textContent = produto.descricao;
        linha.insertCell(2).textContent = produto.quantidade;
        linha.insertCell(3).textContent =
            produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

    });
}

// Função para alterar o valor do produto
function alterarValor() {

    let codigo = Number(
        document.getElementById("codigoAlterar").value
    );

    let novoValor = Number(
        document.getElementById("novoValor").value
    );

    if (document.getElementById("codigoAlterar").value === "" ||
        document.getElementById("novoValor").value === "" ||
        !Number.isFinite(novoValor) || novoValor < 0) {

        alert("Informe um código e um valor válido!");
        return;
    }

    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {

        produto.valor = novoValor;

        alert("Valor alterado com sucesso!");

        listarProdutos();

    } else {

        alert("Produto não encontrado!");

    }
}

// Função para alterar a quantidade
function alterarQuantidade() {

    let codigo = Number(
        document.getElementById("codigoAlterar").value
    );

    let novaQuantidade = Number(
        document.getElementById("novaQuantidade").value
    );

    if (document.getElementById("codigoAlterar").value === "" ||
        document.getElementById("novaQuantidade").value === "" ||
        !Number.isInteger(novaQuantidade) ||
        novaQuantidade < 0) {

        alert("Informe um código e uma quantidade válida!");
        return;
    }

    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {

        produto.quantidade = novaQuantidade;

        alert("Quantidade alterada com sucesso!");

        listarProdutos();

    } else {

        alert("Produto não encontrado!");

    }
}

// Limpar campos do cadastro
function limparCampos() {

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

}
