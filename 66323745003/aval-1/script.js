
// Lista que armazena os produtos
let produtos = [];

// Cadastrar produto
function cadastrarProduto() {

    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao.trim() ||
        !Number.isInteger(quantidade) || quantidade < 0 ||
        !Number.isFinite(valor) || valor < 0) {

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


// Listar produtos
function listarProdutos() {

    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    produtos.forEach(produto => {

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

    let codigo = Number(document.getElementById("codigoAlterar").value);
    let novoValor = Number(document.getElementById("novoValor").value);

    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (document.getElementById("novoValor").value === "" ||
        !Number.isFinite(novoValor) || novoValor < 0) {
        alert("Informe um valor válido!");
        return;
    }

    produto.valor = novoValor;

    alert("Valor alterado com sucesso!");

    listarProdutos();
}


// Alterar quantidade do produto
function alterarQuantidade() {

    let codigo = Number(document.getElementById("codigoAlterar").value);
    let novaQuantidade = Number(document.getElementById("novaQuantidade").value);

    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (document.getElementById("novaQuantidade").value === "" ||
        !Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
        alert("Informe uma quantidade válida!");
        return;
    }

    produto.quantidade = novaQuantidade;

    alert("Quantidade alterada com sucesso!");

    listarProdutos();
}


// Limpar campos do cadastro
function limparCampos() {

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

}
