let produtos = [];

document.addEventListener("DOMContentLoaded", function() {

    // BOTÃO CADASTRAR
    document.getElementById("btnCadastrar").addEventListener("click", cadastrarProduto);

    // BOTÕES DE ALTERAÇÃO
    document.getElementById("btnValor").addEventListener("click", alterarValor);

    document.getElementById("btnQuantidade").addEventListener("click", alterarQuantidade);

\});

function cadastrarProduto() {

    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value.trim();
    let quantidade = document.getElementById("quantidade").value;
    let valor = document.getElementById("valor").value;

    let mensagem = document.getElementById("mensagem");

    mensagem.style.color = "red";

    if (codigo === "" || descricao === "" ||
        quantidade === "" || valor === "") {

        mensagem.textContent = "Preencha todos os campos!";
        return;
    \}

    codigo = Number(codigo);
    quantidade = Number(quantidade);
    valor = Number(valor);

    if (!Number.isInteger(codigo) || codigo <= 0 ||
        !Number.isInteger(quantidade) || quantidade < 0 ||
        !Number.isFinite(valor) || valor < 0) {

        mensagem.textContent = "Digite valores válidos!";
        return;
    \}

    let existe = produtos.find(function(p) {
        return p.codigo === codigo;
    \});

    if (existe) {
        mensagem.textContent = "Código já cadastrado!";
        return;
    \}

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    \};

    produtos.push(produto);

    mensagem.style.color = "green";
    mensagem.textContent = "Produto cadastrado com sucesso!";

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    listarProdutos();
\}


// LISTAR PRODUTOS
function listarProdutos() {

    let tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    produtos.forEach(function(p) {

        let linha = document.createElement("tr");

        let dados = [
            p.codigo,
            p.descricao,
            p.quantidade,
            "R\$ " + p.valor.toFixed(2).replace(".", ",")
        ];

        dados.forEach(function(dado) {
            let coluna = document.createElement("td");
            coluna.textContent = dado;
            linha.appendChild(coluna);
        \});

        tabela.appendChild(linha);

    \});

\}


// ALTERAR VALOR
function alterarValor() {

    let codigo = Number(document.getElementById("codigoAlterar").value);
    let valor = document.getElementById("novoValor").value;

    if (!codigo || valor === "" || Number(valor) < 0) {
        alert("Informe o código e o novo valor!");
        return;
    \}

    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    \}

    produto.valor = Number(valor);

    alert("Valor alterado com sucesso!");

    listarProdutos();

\}


// ALTERAR QUANTIDADE
function alterarQuantidade() {

    let codigo = Number(document.getElementById("codigoAlterar").value);
    let quantidade = document.getElementById("novaQuantidade").value;

    if (!codigo || quantidade === "" ||
        !Number.isInteger(Number(quantidade)) || Number(quantidade) < 0) {

        alert("Informe o código e uma quantidade válida!");
        return;
    \}

    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    \}

    produto.quantidade = Number(quantidade);

    alert("Quantidade alterada com sucesso!");

    listarProdutos();

\}