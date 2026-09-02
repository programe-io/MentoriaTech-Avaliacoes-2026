let produtos = [];

// Cadastrar novo produto
function cadastrarProduto() {
    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao || quantidade < 0 || valor < 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    let produtoExistente = produtos.find(p => p.codigo === codigo);

    if (produtoExistente) {
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

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    listarProdutos();
}

// Listar produtos
function listarProdutos() {
    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    produtos.forEach(produto => {
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

// Alterar valor
function alterarValor() {
    let codigo = Number(document.getElementById("codigoAlterar").value);
    let novoValor = Number(document.getElementById("novoValor").value);

    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (novoValor < 0) {
        alert("O valor não pode ser negativo!");
        return;
    }

    produto.valor = novoValor;

    alert("Valor alterado com sucesso!");

    listarProdutos();
}

// Alterar quantidade
function alterarQuantidade() {
    let codigo = Number(document.getElementById("codigoAlterar").value);
    let novaQuantidade = Number(document.getElementById("novaQuantidade").value);

    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (novaQuantidade < 0) {
        alert("A quantidade não pode ser negativa!");
        return;
    }

    produto.quantidade = novaQuantidade;

    alert("Quantidade alterada com sucesso!");

    listarProdutos();
}