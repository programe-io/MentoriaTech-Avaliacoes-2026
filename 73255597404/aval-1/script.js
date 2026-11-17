
const estoque = [];

let proximoCodigo = 1;

// Cadastrar produto
async function cadastrarProduto() {

    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (descricao.trim() === "" || 
        document.getElementById("quantidade").value === "" ||
        document.getElementById("valor").value === "" ||
        !Number.isFinite(quantidade) ||
        !Number.isFinite(valor) ||
        quantidade < 0 || valor < 0) {

        alert("Preencha todos os campos corretamente!");
        return;
    }

    const produto = {
        codigo: proximoCodigo++,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    estoque.push(produto);

    alert("Produto cadastrado com sucesso!");

    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    await listarProdutos();
}

// Listar produtos
async function listarProdutos() {

    const resultado = document.getElementById("resultado");

    resultado.innerHTML = "";

    if (estoque.length === 0) {
        resultado.innerHTML = "<p class='vazio'>Nenhum produto cadastrado.</p>";
        return;
    }

    estoque.forEach((produto) => {

        resultado.innerHTML += `
            <div class="produto">
                <p><strong>Código:</strong> ${produto.codigo}</p>
                <p><strong>Descrição:</strong> ${produto.descricao}</p>
                <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
                <p><strong>Valor:</strong> R$ ${produto.valor.toFixed(2)}</p>
            </div>
        `;

    });
}

// Buscar produto pelo código
function buscarProduto(codigo) {

    return estoque.find((produto) => produto.codigo === codigo);

}

// Alterar valor
async function alterarValor() {

    const codigo = Number(document.getElementById("codigoAlterar").value);

    const novoValor = document.getElementById("novoValor").value;

    const produto = buscarProduto(codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (novoValor === "" || !Number.isFinite(Number(novoValor)) || Number(novoValor) < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produto.valor = Number(novoValor);

    alert("Valor alterado com sucesso!");

    document.getElementById("novoValor").value = "";

    await listarProdutos();
}

// Alterar quantidade
async function alterarQuantidade() {

    const codigo = Number(document.getElementById("codigoAlterar").value);

    const novaQuantidade = document.getElementById("novaQuantidade").value;

    const produto = buscarProduto(codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (novaQuantidade === "" || !Number.isFinite(Number(novaQuantidade)) || Number(novaQuantidade) < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produto.quantidade = Number(novaQuantidade);

    alert("Quantidade alterada com sucesso!");

    document.getElementById("novaQuantidade").value = "";

    await listarProdutos();
}
