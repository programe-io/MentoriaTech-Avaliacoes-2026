// Array que armazenará os produtos
let produtos = [];


// ==========================================
// CADASTRAR PRODUTO
// ==========================================

function cadastrarProduto() {

    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    // Verifica se os campos foram preenchidos
    if (codigo === "" || descricao === "" || quantidade < 0 || valor < 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Verifica se o código já existe
    const produtoExistente = produtos.find(
        produto => produto.codigo === codigo
    );

    if (produtoExistente) {
        alert("Já existe um produto com esse código!");
        return;
    }

    // Cria o produto
    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    // Adiciona ao array
    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    // Limpa os campos
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    listarProdutos();
}


// ==========================================
// LISTAR PRODUTOS
// ==========================================

function listarProdutos() {

    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length === 0) {

        lista.innerHTML = `
            <p class="sem-produtos">
                Nenhum produto cadastrado.
            </p>
        `;

        return;
    }

    produtos.forEach(produto => {

        const div = document.createElement("div");

        div.classList.add("produto");

        div.innerHTML = `
            <p><strong>Código:</strong> ${produto.codigo}</p>

            <p><strong>Descrição:</strong> ${produto.descricao}</p>

            <p><strong>Quantidade:</strong> ${produto.quantidade}</p>

            <p><strong>Valor:</strong> R$ ${produto.valor.toFixed(2)}
            </p>
        `;

        lista.appendChild(div);
    });
}


// ==========================================
// ALTERAR VALOR
// ==========================================

function alterarValor() {

    const codigo = document
        .getElementById("codigoAlteracao")
        .value
        .trim();

    const novoValor = Number(
        document.getElementById("novoValor").value
    );

    if (codigo === "" || novoValor < 0) {
        alert("Informe um código e um valor válido!");
        return;
    }

    const produto = produtos.find(
        produto => produto.codigo === codigo
    );

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    produto.valor = novoValor;

    alert("Valor alterado com sucesso!");

    document.getElementById("novoValor").value = "";

    listarProdutos();
}


// ==========================================
// ALTERAR QUANTIDADE
// ==========================================

function alterarQuantidade() {

    const codigo = document
        .getElementById("codigoAlteracao")
        .value
        .trim();

    const novaQuantidade = Number(
        document.getElementById("novaQuantidade").value
    );

    if (codigo === "" || novaQuantidade < 0) {
        alert("Informe um código e uma quantidade válida!");
        return;
    }

    const produto = produtos.find(
        produto => produto.codigo === codigo
    );

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    produto.quantidade = novaQuantidade;

    alert("Quantidade alterada com sucesso!");

    document.getElementById("novaQuantidade").value = "";

    listarProdutos();
}
