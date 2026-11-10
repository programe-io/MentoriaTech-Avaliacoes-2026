
let produtos = [];

const codigo = document.getElementById("codigo");
const descricao = document.getElementById("descricao");
const quantidade = document.getElementById("quantidade");
const valor = document.getElementById("valor");

const codigoAlterar = document.getElementById("codigoAlterar");
const novoValor = document.getElementById("novoValor");
const novaQuantidade = document.getElementById("novaQuantidade");

const listaProdutos = document.getElementById("listaProdutos");

// CADASTRAR PRODUTO
function cadastrarProduto() {

    let cod = codigo.value.trim();
    let desc = descricao.value.trim();
    let qtd = Number(quantidade.value);
    let val = Number(valor.value);

    if (
        cod === "" ||
        desc === "" ||
        quantidade.value === "" ||
        valor.value === ""
    ) {
        alert("Preencha todos os campos!");
        return;
    }

    if (qtd < 0 || val < 0) {
        alert("Não utilize valores negativos!");
        return;
    }

    if (produtos.some(p => p.codigo === cod)) {
        alert("Código já cadastrado!");
        return;
    }

    produtos.push({
        codigo: cod,
        descricao: desc,
        quantidade: qtd,
        valor: val
    });

    alert("Produto cadastrado com sucesso!");

    codigo.value = "";
    descricao.value = "";
    quantidade.value = "";
    valor.value = "";

    listarProdutos();
}

// LISTAR PRODUTOS
function listarProdutos() {

    listaProdutos.innerHTML = "";

    if (produtos.length === 0) {
        listaProdutos.textContent = "Nenhum produto cadastrado.";
        return;
    }

    produtos.forEach(function(produto) {

        let div = document.createElement("div");
        div.className = "produto";

        let p1 = document.createElement("p");
        p1.textContent = "Código: " + produto.codigo;

        let p2 = document.createElement("p");
        p2.textContent = "Descrição: " + produto.descricao;

        let p3 = document.createElement("p");
        p3.textContent = "Quantidade: " + produto.quantidade;

        let p4 = document.createElement("p");
        p4.textContent = "Valor: R$ " + produto.valor.toFixed(2);

        div.append(p1, p2, p3, p4);

        listaProdutos.appendChild(div);
    });
}

// ALTERAR VALOR
function alterarValor() {

    let cod = codigoAlterar.value.trim();

    let produto = produtos.find(p => p.codigo === cod);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (novoValor.value === "" || Number(novoValor.value) < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produto.valor = Number(novoValor.value);

    alert("Valor alterado com sucesso!");

    novoValor.value = "";

    listarProdutos();
}

// ALTERAR QUANTIDADE
function alterarQuantidade() {

    let cod = codigoAlterar.value.trim();

    let produto = produtos.find(p => p.codigo === cod);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (
        novaQuantidade.value === "" ||
        Number(novaQuantidade.value) < 0
    ) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produto.quantidade = Number(novaQuantidade.value);

    alert("Quantidade alterada com sucesso!");

    novaQuantidade.value = "";

    listarProdutos();
}

// CONECTAR OS BOTÕES
document.getElementById("btnCadastrar")
    .addEventListener("click", cadastrarProduto);

document.getElementById("btnValor")
    .addEventListener("click", alterarValor);

document.getElementById("btnQuantidade")
    .addEventListener("click", alterarQuantidade);

document.getElementById("btnListar")
    .addEventListener("click", listarProdutos);
