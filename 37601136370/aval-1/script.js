// Array onde os produtos serão armazenados
let produtos = [];


// Pegando os elementos do HTML
const form = document.getElementById("formProduto");

const codigoInput = document.getElementById("codigo");
const descricaoInput = document.getElementById("descricao");
const quantidadeInput = document.getElementById("quantidade");
const valorInput = document.getElementById("valor");

const listaProdutos = document.getElementById("listaProdutos");

const mensagem = document.getElementById("mensagem");


// CADASTRAR PRODUTO
form.addEventListener("submit", function(event) {

    // Evita recarregar a página
    event.preventDefault();


    // Pegando os valores
    const codigo = codigoInput.value.trim();

    const descricao = descricaoInput.value.trim();

    const quantidade = Number(quantidadeInput.value);

    const valor = Number(valorInput.value);


    // VALIDAÇÕES

    if (codigo === "") {

        mostrarMensagem(
            "Digite o código do produto.",
            "red"
        );

        return;
    \}


    if (descricao === "") {

        mostrarMensagem(
            "Digite a descrição do produto.",
            "red"
        );

        return;
    \}


    if (quantidade < 0 || isNaN(quantidade)) {

        mostrarMensagem(
            "Digite uma quantidade válida.",
            "red"
        );

        return;
    \}


    if (valor < 0 || isNaN(valor)) {

        mostrarMensagem(
            "Digite um valor válido.",
            "red"
        );

        return;
    \}


    // Verificar se o código já existe

    const produtoExistente = produtos.find(function(produto) {

        return produto.codigo === codigo;

    \});


    if (produtoExistente) {

        mostrarMensagem(
            "Já existe um produto com esse código.",
            "red"
        );

        return;
    \}


    // Criando o produto

    const produto = {

        id: Date.now(),

        codigo: codigo,

        descricao: descricao,

        quantidade: quantidade,

        valor: valor

    \};


    // Adicionando no array

    produtos.push(produto);


    // Limpar formulário

    form.reset();


    mostrarMensagem(
        "Produto cadastrado com sucesso!",
        "green"
    );


    // Atualizar lista

    listarProdutos();

\});


// MOSTRAR MENSAGEM

function mostrarMensagem(texto, cor) {

    mensagem.textContent = texto;

    mensagem.style.color = cor;


    setTimeout(function() {

        mensagem.textContent = "";

    \}, 3000);

\}


// LISTAR PRODUTOS

function listarProdutos() {

    listaProdutos.innerHTML = "";


    // Caso não tenha produtos

    if (produtos.length === 0) {

        listaProdutos.innerHTML = `
            <p class="vazio">
                Nenhum produto cadastrado.
            </p>
        `;

        return;
    \}


    // Percorrer produtos

    produtos.forEach(function(produto) {

        const div = document.createElement("div");

        div.classList.add("produto");


        div.innerHTML = `

            <div class="produto-info">

                <h3>
                    \${produto.descricao\}
                </h3>

                <p>
                    <strong>Código:</strong>
                    \${produto.codigo\}
                </p>

                <p>
                    <strong>Quantidade:</strong>
                    \${produto.quantidade\}
                </p>

                <p>
                    <strong>Valor:</strong>
                    R\$ \${produto.valor.toFixed(2)\}
                </p>

            </div>


            <div class="acoes">

                <button
                    class="btn-valor"
                    onclick="alterarValor(\${produto.id\})"
                >
                    Alterar Valor
                </button>


                <button
                    class="btn-quantidade"
                    onclick="alterarQuantidade(\${produto.id\})"
                >
                    Alterar Quantidade
                </button>

            </div>

        `;


        listaProdutos.appendChild(div);

    \});

\}


// ALTERAR VALOR

function alterarValor(id) {

    // Procurar produto

    const produto = produtos.find(function(produto) {

        return produto.id === id;

    \});


    if (!produto) {
        return;
    \}


    // Perguntar novo valor

    const novoValor = prompt(
        "Digite o novo valor do produto:"
    );


    const valor = Number(novoValor);


    // Validar

    if (isNaN(valor) || valor < 0) {

        alert(
            "Digite um valor válido."
        );

        return;
    \}


    // Alterar

    produto.valor = valor;


    // Atualizar lista

    listarProdutos();

\}


// ALTERAR QUANTIDADE

function alterarQuantidade(id) {

    // Procurar produto

    const produto = produtos.find(function(produto) {

        return produto.id === id;

    \});


    if (!produto) {
        return;
    \}


    // Perguntar nova quantidade

    const novaQuantidade = prompt(
        "Digite a nova quantidade:"
    );


    const quantidade = Number(novaQuantidade);


    // Validar

    if (
        isNaN(quantidade) ||
        quantidade < 0
    ) {

        alert(
            "Digite uma quantidade válida."
        );

        return;
    \}


    // Alterar

    produto.quantidade = quantidade;


    // Atualizar lista

    listarProdutos();

\}


// Iniciar a lista

listarProdutos();$0