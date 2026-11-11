
let produtos = [];

// Mostrar mensagem na tela
function mostrarMensagem(texto) {
    document.getElementById("mensagem").innerText = texto;
}

// Cadastrar produto
function cadastrarProduto() {

    let codigo = Number(document.getElementById("codigo").value);

    let descricao = document.getElementById("descricao").value;

    let quantidade = Number(document.getElementById("quantidade").value);

    let valor = Number(document.getElementById("valor").value);

    let existe = produtos.find(p => p.codigo === codigo);

    if (existe) {
        mostrarMensagem("Já existe um produto com esse código!");
        return;
    }

    if (
        document.getElementById("codigo").value === "" ||
        !Number.isInteger(codigo) ||
        codigo <= 0 ||
        descricao.trim() === "" ||
        document.getElementById("quantidade").value === "" ||
        document.getElementById("valor").value === "" ||
        !Number.isInteger(quantidade) ||
        quantidade < 0 ||
        !Number.isFinite(valor) ||
        valor < 0
    ) {
        mostrarMensagem("Dados inválidos!");
        return;
    }

    produtos.push({
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    });

    mostrarMensagem("Produto cadastrado com sucesso!");

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    listarProdutos();
}

// Listar produtos
function listarProdutos() {

    let tabela = document.getElementById("tabelaProdutos");

    tabela.innerHTML = "";

    if (produtos.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="4">Nenhum produto cadastrado!</td>
            </tr>
        `;
        return;
    }

    produtos.forEach(p => {

        tabela.innerHTML += `
            <tr>
                <td>${p.codigo}</td>
                <td>${p.descricao}</td>
                <td>${p.quantidade}</td>
                <td>R$ ${p.valor.toFixed(2)}</td>
            </tr>
        `;

    });
}

// Alterar valor do produto
function alterarValor() {

    let codigo = Number(document.getElementById("codigoAlterar").value);

    let produto = produtos.find(p => p.codigo === codigo);

    let novoValor = Number(document.getElementById("novoValor").value);

    if (!produto) {
        mostrarMensagem("Produto não encontrado!");
        return;
    }

    if (
        document.getElementById("novoValor").value === "" ||
        !Number.isFinite(novoValor) ||
        novoValor < 0
    ) {
        mostrarMensagem("Valor inválido!");
        return;
    }

    produto.valor = novoValor;

    mostrarMensagem("Valor alterado com sucesso!");

    document.getElementById("novoValor").value = "";

    listarProdutos();
}

// Alterar quantidade
function alterarQuantidade() {

    let codigo = Number(document.getElementById("codigoAlterar").value);

    let produto = produtos.find(p => p.codigo === codigo);

    let novaQuantidade = Number(document.getElementById("novaQuantidade").value);

    if (!produto) {
        mostrarMensagem("Produto não encontrado!");
        return;
    }

    if (
        document.getElementById("novaQuantidade").value === "" ||
        !Number.isInteger(novaQuantidade) ||
        novaQuantidade < 0
    ) {
        mostrarMensagem("Quantidade inválida!");
        return;
    }

    produto.quantidade = novaQuantidade;

    mostrarMensagem("Quantidade alterada com sucesso!");

    document.getElementById("novaQuantidade").value = "";

    listarProdutos();
}

// Mostrar tabela ao iniciar
listarProdutos();
