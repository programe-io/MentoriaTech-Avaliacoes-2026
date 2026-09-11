// Array que armazenará os produtos
let produtos = [];


// ==============================
// CADASTRAR PRODUTO
// ==============================

function cadastrarProduto() {

    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    // Verifica se os campos foram preenchidos
    if (codigo === "" || descricao === "" || quantidade < 0 || valor < 0) {
        mostrarMensagem("Preencha todos os campos corretamente.", "erro");
        return;
    }

    // Verifica se o código já existe
    const produtoExistente = produtos.find(
        produto => produto.codigo === codigo
    );

    if (produtoExistente) {
        mostrarMensagem("Já existe um produto com esse código.", "erro");
        return;
    }

    // Cria o produto
    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    // Adiciona o produto ao estoque
    produtos.push(produto);

    // Limpa os campos
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    mostrarMensagem("Produto cadastrado com sucesso!", "sucesso");

    listarProdutos();
}


// ==============================
// LISTAR PRODUTOS
// ==============================

function listarProdutos() {

    const lista = document.getElementById("listaProdutos");

    // Limpa a tabela
    lista.innerHTML = "";

    // Verifica se existem produtos
    if (produtos.length === 0) {

        lista.innerHTML = `
            <tr>
                <td colspan="4">
                    Nenhum produto cadastrado.
                </td>
            </tr>
        `;

        return;
    }

    // Percorre os produtos
    produtos.forEach(produto => {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
        `;

        lista.appendChild(linha);
    });
}


// ==============================
// ALTERAR VALOR
// ==============================

function alterarValor() {

    const codigo = document
        .getElementById("codigoAlteracao")
        .value
        .trim();

    if (codigo === "") {
        mostrarMensagem("Digite o código do produto.", "erro");
        return;
    }

    const produto = produtos.find(
        produto => produto.codigo === codigo
    );

    if (!produto) {
        mostrarMensagem("Produto não encontrado.", "erro");
        return;
    }

    const novoValor = Number(
        prompt("Digite o novo valor do produto:")
    );

    if (isNaN(novoValor) || novoValor < 0) {
        mostrarMensagem("Digite um valor válido.", "erro");
        return;
    }

    produto.valor = novoValor;

    mostrarMensagem("Valor alterado com sucesso!", "sucesso");

    listarProdutos();
}


// ==============================
// ALTERAR QUANTIDADE
// ==============================

function alterarQuantidade() {

    const codigo = document
        .getElementById("codigoAlteracao")
        .value
        .trim();

    if (codigo === "") {
        mostrarMensagem("Digite o código do produto.", "erro");
        return;
    }

    const produto = produtos.find(
        produto => produto.codigo === codigo
    );

    if (!produto) {
        mostrarMensagem("Produto não encontrado.", "erro");
        return;
    }

    const novaQuantidade = Number(
        prompt("Digite a nova quantidade:")
    );

    if (isNaN(novaQuantidade) || novaQuantidade < 0) {
        mostrarMensagem("Digite uma quantidade válida.", "erro");
        return;
    }

    produto.quantidade = novaQuantidade;

    mostrarMensagem(
        "Quantidade alterada com sucesso!",
        "sucesso"
    );

    listarProdutos();
}


// ==============================
// MENSAGEM
// ==============================

function mostrarMensagem(texto, tipo) {

    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;

    mensagem.className = tipo;

    mensagem.style.display = "block";

    setTimeout(() => {
        mensagem.style.display = "none";
    }, 3000);
}


// ==============================
// INICIALIZAÇÃO
// ==============================

listarProdutos();
