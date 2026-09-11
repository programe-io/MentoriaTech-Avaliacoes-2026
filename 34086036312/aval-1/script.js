// Array que armazenará os produtos
let produtos = [];


// ==========================================
// CADASTRAR PRODUTO
// ==========================================

function cadastrarProduto() {

    // Pegando os valores dos campos
    let codigo = document.getElementById("codigo").value.trim();
    let descricao = document.getElementById("descricao").value.trim();
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    // Verificando se os campos foram preenchidos
    if (codigo === "" || descricao === "" || quantidade < 0 || valor < 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    \}

    // Verificando se o código já existe
    let produtoExistente = produtos.find(function(produto) {
        return produto.codigo === codigo;
    \});

    if (produtoExistente) {
        alert("Já existe um produto com esse código!");
        return;
    \}

    // Criando o produto
    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    \};

    // Adicionando o produto ao array
    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    // Limpando os campos
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    // Atualizando a tabela
    listarProdutos();
\}


// ==========================================
// LISTAR PRODUTOS
// ==========================================

function listarProdutos() {

    let tabela = document.getElementById("tabelaProdutos");

    // Limpando a tabela antes de adicionar os produtos
    tabela.innerHTML = "";

    // Verificando se existem produtos
    if (produtos.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="5">
                    Nenhum produto cadastrado.
                </td>
            </tr>
        `;

        return;
    \}

    // Percorrendo o array de produtos
    produtos.forEach(function(produto, indice) {

        let linha = document.createElement("tr");

        linha.innerHTML = `
            <td>\${produto.codigo\}</td>
            <td>\${produto.descricao\}</td>
            <td>\${produto.quantidade\}</td>
            <td>R\$ \${produto.valor.toFixed(2)\}</td>

            <td>
                <button class="btn-excluir"
                    onclick="excluirProduto(\${indice\})">
                    Excluir
                </button>
            </td>
        `;

        tabela.appendChild(linha);
    \});
\}


// ==========================================
// ALTERAR VALOR
// ==========================================

function alterarValor() {

    let codigo = document.getElementById("codigoAlterar").value.trim();
    let novoValor = Number(document.getElementById("novoValor").value);

    if (codigo === "" || novoValor < 0) {
        alert("Informe o código e um valor válido!");
        return;
    \}

    // Procurando o produto pelo código
    let produto = produtos.find(function(produto) {
        return produto.codigo === codigo;
    \});

    // Verificando se encontrou o produto
    if (!produto) {
        alert("Produto não encontrado!");
        return;
    \}

    // Alterando o valor
    produto.valor = novoValor;

    alert("Valor alterado com sucesso!");

    // Limpando os campos
    document.getElementById("codigoAlterar").value = "";
    document.getElementById("novoValor").value = "";

    // Atualizando a tabela
    listarProdutos();
\}


// ==========================================
// ALTERAR QUANTIDADE
// ==========================================

function alterarQuantidade() {

    let codigo = document.getElementById("codigoAlterar").value.trim();
    let novaQuantidade = Number(
        document.getElementById("novaQuantidade").value
    );

    if (codigo === "" || novaQuantidade < 0) {
        alert("Informe o código e uma quantidade válida!");
        return;
    \}

    // Procurando o produto
    let produto = produtos.find(function(produto) {
        return produto.codigo === codigo;
    \});

    // Verificando se encontrou
    if (!produto) {
        alert("Produto não encontrado!");
        return;
    \}

    // Alterando a quantidade
    produto.quantidade = novaQuantidade;

    alert("Quantidade alterada com sucesso!");

    // Limpando os campos
    document.getElementById("codigoAlterar").value = "";
    document.getElementById("novaQuantidade").value = "";

    // Atualizando a tabela
    listarProdutos();
\}


// ==========================================
// EXCLUIR PRODUTO
// ==========================================

function excluirProduto(indice) {

    let confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );

    if (confirmar) {

        produtos.splice(indice, 1);

        alert("Produto excluído com sucesso!");

        listarProdutos();
    \}
\}


// ==========================================
// INICIAR SISTEMA
// ==========================================

listarProdutos();$0