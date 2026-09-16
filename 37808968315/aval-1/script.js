let produtos = [];

// Cadastrar novo produto
function cadastrarProduto() {

    const codigo = document.getElementById("codigo").value;
    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(
        document.getElementById("quantidade").value
    );
    const valor = Number(
        document.getElementById("valor").value
    );

    if (
        codigo === "" ||
        descricao === "" ||
        quantidade < 0 ||
        valor < 0
    ) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const existe = produtos.some(
        produto => produto.codigo === codigo
    );

    if (existe) {
        alert("Este código já está cadastrado!");
        return;
    }

    const produto = {
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
}

// Listar produtos cadastrados
function listarProdutos() {

    const lista = document.getElementById("lista");

    if (produtos.length === 0) {
        lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    lista.innerHTML = "";

    produtos.forEach(produto => {

        const item = document.createElement("p");

        item.innerHTML =
            "Código: " + produto.codigo +
            " | Descrição: " + produto.descricao +
            " | Quantidade: " + produto.quantidade +
            " | Valor: R$ " + produto.valor.toFixed(2);

        lista.appendChild(item);

    });
}

// Alterar o valor de um produto
function alterarValor() {

    const codigo = document.getElementById("codigoValor").value;
    const novoValor = Number(
        document.getElementById("novoValor").value
    );

    const produto = produtos.find(
        produto => produto.codigo === codigo
    );

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (
        novoValor < 0 ||
        document.getElementById("novoValor").value === ""
    ) {
        alert("Digite um valor válido!");
        return;
    }

    produto.valor = novoValor;

    alert("Valor alterado com sucesso!");

    listarProdutos();
}

// Alterar a quantidade de um produto
function alterarQuantidade() {

    const codigo = document.getElementById("codigoQuantidade").value;
    const novaQuantidade = Number(
        document.getElementById("novaQuantidade").value
    );

    const produto = produtos.find(
        produto => produto.codigo === codigo
    );

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (
        novaQuantidade < 0 ||
        document.getElementById("novaQuantidade").value === ""
    ) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produto.quantidade = novaQuantidade;

    alert("Quantidade alterada com sucesso!");

    listarProdutos();
}