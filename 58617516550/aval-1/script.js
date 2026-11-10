let produtos = [];

// Cadastrar produto
function cadastrarProduto() {

    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao.trim() ||
        !Number.isInteger(quantidade) || quantidade < 0 ||
        document.getElementById("valor").value === "" ||
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

    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    produtos.forEach(function(produto) {

        lista.innerHTML += `
            <div class="produto">
                <p><strong>Código:</strong> ${produto.codigo}</p>
                <p><strong>Descrição:</strong> ${produto.descricao}</p>
                <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
                <p><strong>Valor:</strong> R$ ${produto.valor.toFixed(2)}</p>
            </div>
        `;

    });
}

// Alterar valor do produto
function alterarValor() {

    let codigo = Number(document.getElementById("codigoValor").value);
    let novoValor = Number(document.getElementById("novoValor").value);

    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (document.getElementById("novoValor").value === "" ||
        !Number.isFinite(novoValor) || novoValor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produto.valor = novoValor;

    alert("Valor atualizado com sucesso!");

    document.getElementById("codigoValor").value = "";
    document.getElementById("novoValor").value = "";

    listarProdutos();
}

// Alterar quantidade
function alterarQuantidade() {

    let codigo = Number(document.getElementById("codigoQuantidade").value);
    let novaQuantidade = Number(document.getElementById("novaQuantidade").value);

    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (document.getElementById("novaQuantidade").value === "" ||
        !Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produto.quantidade = novaQuantidade;

    alert("Quantidade atualizada com sucesso!");

    document.getElementById("codigoQuantidade").value = "";
    document.getElementById("novaQuantidade").value = "";

    listarProdutos();
}
