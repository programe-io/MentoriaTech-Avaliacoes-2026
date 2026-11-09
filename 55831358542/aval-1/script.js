const produtos = [];

const formProduto = document.querySelector("#formProduto");
const listaProdutos = document.querySelector("#listaProdutos");
const mensagem = document.querySelector("#mensagem");
const estoqueVazio = document.querySelector("#estoqueVazio");

formProduto.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const codigo = document.querySelector("#codigo").value.trim();
    const descricao = document.querySelector("#descricao").value.trim();
    const quantidade = Number(
        document.querySelector("#quantidade").value
    );
    const valor = Number(document.querySelector("#valor").value);

    const codigoJaExiste = produtos.some(function (produto) {
        return produto.codigo === codigo;
    \});

    if (codigoJaExiste) {
        exibirMensagem("Já existe um produto com esse código.", "erro");
        return;
    \}

    const novoProduto = {
        codigo,
        descricao,
        quantidade,
        valor
    \};

    produtos.push(novoProduto);

    formProduto.reset();
    exibirMensagem("Produto cadastrado com sucesso.", "sucesso");
    listarProdutos();
\});

function listarProdutos() {
    listaProdutos.innerHTML = "";

    estoqueVazio.style.display =
        produtos.length === 0 ? "block" : "none";

    produtos.forEach(function (produto) {
        const linha = document.createElement("tr");
        const valorTotal = produto.quantidade * produto.valor;

        linha.innerHTML = `
            <td>\${produto.codigo\}</td>
            <td>\${produto.descricao\}</td>
            <td>\${produto.quantidade\}</td>
            <td>\${formatarMoeda(produto.valor)\}</td>
            <td>\${formatarMoeda(valorTotal)\}</td>
            <td>
                <button
                    class="botao-editar"
                    onclick="alterarQuantidade('\${produto.codigo\}')"
                >
                    Alterar quantidade
                </button>

                <button
                    class="botao-editar"
                    onclick="alterarValor('\${produto.codigo\}')"
                >
                    Alterar valor
                </button>

                <button
                    class="botao-excluir"
                    onclick="excluirProduto('\${produto.codigo\}')"
                >
                    Excluir
                </button>
            </td>
        `;

        listaProdutos.appendChild(linha);
    \});
\}

function alterarQuantidade(codigo) {
    const produto = buscarProduto(codigo);

    if (!produto) {
        exibirMensagem("Produto não encontrado.", "erro");
        return;
    \}

    const resposta = prompt(
        `Digite a nova quantidade de \${produto.descricao\}:`,
        produto.quantidade
    );

    if (resposta === null) {
        return;
    \}

    const novaQuantidade = Number(resposta);

    if (
        resposta.trim() === "" ||
        !Number.isInteger(novaQuantidade) ||
        novaQuantidade < 0
    ) {
        exibirMensagem(
            "A quantidade deve ser um número inteiro maior ou igual a zero.",
            "erro"
        );
        return;
    \}

    produto.quantidade = novaQuantidade;

    listarProdutos();
    exibirMensagem("Quantidade alterada com sucesso.", "sucesso");
\}

function alterarValor(codigo) {
    const produto = buscarProduto(codigo);

    if (!produto) {
        exibirMensagem("Produto não encontrado.", "erro");
        return;
    \}

    const resposta = prompt(
        `Digite o novo valor de \${produto.descricao\}:`,
        produto.valor
    );

    if (resposta === null) {
        return;
    \}

    const novoValor = Number(resposta.replace(",", "."));

    if (
        resposta.trim() === "" ||
        !Number.isFinite(novoValor) ||
        novoValor < 0
    ) {
        exibirMensagem(
            "O valor deve ser um número maior ou igual a zero.",
            "erro"
        );
        return;
    \}

    produto.valor = novoValor;

    listarProdutos();
    exibirMensagem("Valor alterado com sucesso.", "sucesso");
\}

function excluirProduto(codigo) {
    const indice = produtos.findIndex(function (produto) {
        return produto.codigo === codigo;
    \});

    if (indice === -1) {
        exibirMensagem("Produto não encontrado.", "erro");
        return;
    \}

    const confirmou = confirm(
        `Deseja excluir o produto \${produtos[indice].descricao\}?`
    );

    if (!confirmou) {
        return;
    \}

    produtos.splice(indice, 1);

    listarProdutos();
    exibirMensagem("Produto excluído com sucesso.", "sucesso");
\}

function buscarProduto(codigo) {
    return produtos.find(function (produto) {
        return produto.codigo === codigo;
    \});
\}

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    \});
\}

function exibirMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = tipo;
\}

listarProdutos();$0