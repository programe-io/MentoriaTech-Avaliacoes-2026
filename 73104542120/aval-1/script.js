let estoque = [];

function cadastrarProduto() {

    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = parseInt(
        document.getElementById("quantidade").value
    );
    const valor = parseFloat(
        document.getElementById("valor").value
    );

    if (!codigo || !descricao || isNaN(quantidade) || isNaN(valor)) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    const existe = estoque.find(produto => produto.codigo === codigo);

    if (existe) {
        alert("Já existe um produto com esse código.");
        return;
    }

    const novoProduto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    estoque.push(novoProduto);

    limparCampos();
    listarProdutos();

    alert("Produto cadastrado com sucesso!");
}


function listarProdutos() {

    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (estoque.length === 0) {
        lista.innerHTML = `
            <tr>
                <td colspan="5">O estoque está vazio.</td>
            </tr>
        `;
        return;
    }

    estoque.forEach(produto => {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>

            <td>
                <button
                    class="btn-alterar"
                    onclick="alterarValor('${produto.codigo}')">
                    Alterar valor
                </button>

                <button
                    class="btn-alterar"
                    onclick="alterarQuantidade('${produto.codigo}')">
                    Alterar quantidade
                </button>

                <button
                    class="btn-excluir"
                    onclick="excluirProduto('${produto.codigo}')">
                    Excluir
                </button>
            </td>
        `;

        lista.appendChild(linha);
    });
}


function alterarValor(codigo) {

    const produto = estoque.find(
        produto => produto.codigo === codigo
    );

    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    const novoValor = prompt(
        `Digite o novo valor para ${produto.descricao}:`
    );

    if (novoValor === null) {
        return;
    }

    const valor = parseFloat(novoValor);

    if (isNaN(valor) || valor < 0) {
        alert("Digite um valor válido.");
        return;
    }

    produto.valor = valor;

    listarProdutos();
}


function alterarQuantidade(codigo) {

    const produto = estoque.find(
        produto => produto.codigo === codigo
    );

    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    const novaQuantidade = prompt(
        `Digite a nova quantidade para ${produto.descricao}:`
    );

    if (novaQuantidade === null) {
        return;
    }

    const quantidade = parseInt(novaQuantidade);

    if (isNaN(quantidade) || quantidade < 0) {
        alert("Digite uma quantidade válida.");
        return;
    }

    produto.quantidade = quantidade;

    listarProdutos();
}


function excluirProduto(codigo) {

    const confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );

    if (!confirmar) {
        return;
    }

    estoque = estoque.filter(
        produto => produto.codigo !== codigo
    );

    listarProdutos();
}


function limparCampos() {

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}


listarProdutos();
