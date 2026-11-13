
let produtos = [];

// Cadastrar produto
function cadastrarProduto() {

    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value.trim();
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (
        document.getElementById("codigo").value === "" ||
        descricao === "" ||
        document.getElementById("quantidade").value === "" ||
        document.getElementById("valor").value === ""
    ) {
        alert("Preencha todos os campos!");
        return;
    }

    if (codigo <= 0 || quantidade < 0 || valor < 0 ||
        !Number.isFinite(valor)) {
        alert("Informe valores válidos!");
        return;
    }

    let existe = produtos.find(p => p.codigo === codigo);

    if (existe) {
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

    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    produtos.forEach(function(produto) {

        lista.innerHTML += `
            <div class="produto">
                <strong>Código:</strong> ${produto.codigo}<br>
                <strong>Descrição:</strong> ${produto.descricao}<br>
                <strong>Quantidade:</strong> ${produto.quantidade}<br>
                <strong>Valor:</strong> R$ ${produto.valor.toFixed(2)}
            </div>
        `;

    });
}

// Alterar valor do produto
function alterarValor() {

    let codigo = Number(document.getElementById("codigoValor").value);
    let novoValor = Number(document.getElementById("novoValor").value);

    if (
        document.getElementById("codigoValor").value === "" ||
        document.getElementById("novoValor").value === "" ||
        novoValor < 0 ||
        !Number.isFinite(novoValor)
    ) {
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

// Alterar quantidade do produto
function alterarQuantidade() {

    let codigo = Number(document.getElementById("codigoQuantidade").value);
    let novaQuantidade = Number(document.getElementById("novaQuantidade").value);

    if (
        document.getElementById("codigoQuantidade").value === "" ||
        document.getElementById("novaQuantidade").value === "" ||
        novaQuantidade < 0 ||
        !Number.isInteger(novaQuantidade)
    ) {
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
