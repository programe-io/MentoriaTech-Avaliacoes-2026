// 1. Lista de produtos
let produtos = [];
let proximoCodigo = 1;

// 2. Validar produto
function validarProduto(descricao, quantidade, valor) {

    if (descricao.trim().length < 5) {
        throw new Error("A descrição deve ter no mínimo cinco caracteres.");
    \}

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error("A quantidade deve ser maior que zero.");
    \}

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    \}
\}

// 3. Cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {

    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: proximoCodigo++,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    \};

    produtos.push(novoProduto);

    listarProdutos();

    return "Produto cadastrado com sucesso!";
\}

// 4. Listar produtos
function listarProdutos() {

    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach(function(produto) {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>\${produto.codigo\}</td>
            <td>\${produto.descricao\}</td>
            <td>\${produto.quantidade\}</td>
            <td>\${produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            \})\}</td>
        `;

        lista.appendChild(linha);
    \});

    document.getElementById("totalProdutos").textContent =
        "Total de produtos: " + produtos.length;
\}

// 5. Atualizar valor
function atualizarValor(codigoProduto, novoValor) {

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero.");
    \}

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    \}

    produto.valor = novoValor;

    listarProdutos();

    return "Valor atualizado com sucesso!";
\}

// 6. Atualizar quantidade
function atualizarQuantidade(codigoProduto, novaQuantidade) {

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero.");
    \}

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    \}

    produto.quantidade += novaQuantidade;

    listarProdutos();

    return "Quantidade atualizada com sucesso!";
\}

// 7. Mostrar mensagens
function mostrarMensagem(texto, erro = false) {

    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.style.color = erro ? "red" : "green";
\}

// 8. Evento de cadastro
document.getElementById("formProduto").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        try {
            const descricao =
                document.getElementById("descricao").value;

            const quantidade =
                Number(document.getElementById("quantidade").value);

            const valor =
                Number(document.getElementById("valor").value);

            const resultado = cadastrarProduto(
                descricao,
                quantidade,
                valor
            );

            mostrarMensagem(resultado);

            this.reset();

        \} catch (erro) {
            mostrarMensagem(erro.message, true);
        \}
    \}
);

// 9. Atualizar valor pela tela
function atualizarValorTela() {

    try {
        const codigo = Number(
            document.getElementById("codigoAtualizar").value
        );

        const valor = Number(
            document.getElementById("novoValor").value
        );

        if (!codigo || document.getElementById("novoValor").value === "") {
            throw new Error("Preencha o código e o novo valor.");
        \}

        const resultado = atualizarValor(codigo, valor);

        mostrarMensagem(resultado);

        document.getElementById("novoValor").value = "";

    \} catch (erro) {
        mostrarMensagem(erro.message, true);
    \}
\}

// 10. Atualizar quantidade pela tela
function atualizarQuantidadeTela() {

    try {
        const codigo = Number(
            document.getElementById("codigoAtualizar").value
        );

        const quantidade = Number(
            document.getElementById("novaQuantidade").value
        );

        if (!codigo || document.getElementById("novaQuantidade").value === "") {
            throw new Error("Preencha o código e a quantidade.");
        \}

        const resultado = atualizarQuantidade(codigo, quantidade);

        mostrarMensagem(resultado);

        document.getElementById("novaQuantidade").value = "";

    \} catch (erro) {
        mostrarMensagem(erro.message, true);
    \}
\}$0