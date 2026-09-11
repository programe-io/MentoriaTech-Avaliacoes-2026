// ==========================================
// SISTEMA DE ESTOQUE - STOCKFLOW
// ==========================================

// Array responsável por armazenar os produtos
let produtos = [];


// ==========================================
// ELEMENTOS DO HTML
// ==========================================

const formulario = document.getElementById("produtoForm");

const listaProdutos = document.getElementById("listaProdutos");

const estadoVazio = document.getElementById("estadoVazio");

const totalProdutos = document.getElementById("totalProdutos");

const totalItens = document.getElementById("totalItens");

const valorEstoque = document.getElementById("valorEstoque");

const contadorProdutos = document.getElementById("contadorProdutos");

const toast = document.getElementById("toast");


// ==========================================
// CADASTRAR PRODUTO
// ==========================================

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    const codigo = document
        .getElementById("codigo")
        .value
        .trim();

    const descricao = document
        .getElementById("descricao")
        .value
        .trim();

    const quantidade = Number(
        document.getElementById("quantidade").value
    );

    const valor = Number(
        document.getElementById("valor").value
    );


    // Verifica se o código já existe
    const produtoExistente = produtos.find(
        produto => produto.codigo.toLowerCase() === codigo.toLowerCase()
    );


    if (produtoExistente) {

        mostrarMensagem(
            "Já existe um produto com esse código."
        );

        return;
    \}


    // Cria o novo produto
    const novoProduto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    \};


    // Adiciona o produto ao array
    produtos.push(novoProduto);


    // Limpa o formulário
    formulario.reset();


    // Atualiza a tela
    atualizarTabela();


    mostrarMensagem(
        "Produto cadastrado com sucesso! ✓"
    );

\});


// ==========================================
// LISTAR PRODUTOS
// ==========================================

function atualizarTabela() {

    listaProdutos.innerHTML = "";


    // Se não houver produtos
    if (produtos.length === 0) {

        estadoVazio.style.display = "block";

    \} else {

        estadoVazio.style.display = "none";
    \}


    // Percorre todos os produtos
    produtos.forEach(function (produto, index) {

        const linha = document.createElement("tr");


        // Calcula o valor total do produto
        const total = produto.quantidade * produto.valor;


        linha.innerHTML = `

            <td>
                <span class="codigo">
                    \${produto.codigo\}
                </span>
            </td>

            <td>
                \${produto.descricao\}
            </td>

            <td>
                <span class="quantidade">
                    \${produto.quantidade\}
                </span>
            </td>

            <td>
                <span class="valor">
                    \${formatarMoeda(produto.valor)\}
                </span>
            </td>

            <td>
                <span class="total">
                    \${formatarMoeda(total)\}
                </span>
            </td>

            <td>

                <div class="actions">

                    <button
                        class="action-btn edit-value"
                        onclick="alterarValor(\${index\})"
                        title="Alterar valor"
                    >
                        💰
                    </button>

                    <button
                        class="action-btn edit-quantity"
                        onclick="alterarQuantidade(\${index\})"
                        title="Alterar quantidade"
                    >
                        📊
                    </button>

                </div>

            </td>
        `;


        listaProdutos.appendChild(linha);

    \});


    atualizarEstatisticas();
\}


// ==========================================
// ALTERAR VALOR
// ==========================================

function alterarValor(index) {

    const produto = produtos[index];


    const novoValor = prompt(
        `Digite o novo valor para "\${produto.descricao\}":`,
        produto.valor.toFixed(2)
    );


    // Usuário cancelou
    if (novoValor === null) {
        return;
    \}


    const valor = Number(
        novoValor.replace(",", ".")
    );


    // Validação
    if (isNaN(valor) || valor < 0) {

        mostrarMensagem(
            "Digite um valor válido."
        );

        return;
    \}


    // Atualiza o valor
    produto.valor = valor;


    atualizarTabela();


    mostrarMensagem(
        "Valor atualizado com sucesso! ✓"
    );
\}


// ==========================================
// ALTERAR QUANTIDADE
// ==========================================

function alterarQuantidade(index) {

    const produto = produtos[index];


    const novaQuantidade = prompt(
        `Digite a nova quantidade para "\${produto.descricao\}":`,
        produto.quantidade
    );


    // Usuário cancelou
    if (novaQuantidade === null) {
        return;
    \}


    const quantidade = Number(novaQuantidade);


    // Validação
    if (
        isNaN(quantidade) ||
        quantidade < 0 ||
        !Number.isInteger(quantidade)
    ) {

        mostrarMensagem(
            "Digite uma quantidade inteira válida."
        );

        return;
    \}


    // Atualiza a quantidade
    produto.quantidade = quantidade;


    atualizarTabela();


    mostrarMensagem(
        "Quantidade atualizada com sucesso! ✓"
    );
\}


// ==========================================
// ATUALIZAR ESTATÍSTICAS
// ==========================================

function atualizarEstatisticas() {

    // Total de produtos diferentes
    totalProdutos.textContent = produtos.length;


    // Soma das quantidades
    const quantidadeTotal = produtos.reduce(
        (total, produto) => {
            return total + produto.quantidade;
        \},
        0
    );


    totalItens.textContent = quantidadeTotal;


    // Soma do valor total do estoque
    const valorTotal = produtos.reduce(
        (total, produto) => {
            return total +
                produto.quantidade * produto.valor;
        \},
        0
    );


    valorEstoque.textContent =
        formatarMoeda(valorTotal);


    // Contador da tabela

    if (produtos.length === 1) {

        contadorProdutos.textContent = "1 produto";

    \} else {

        contadorProdutos.textContent =
            `\${produtos.length\} produtos`;
    \}
\}


// ==========================================
// FORMATAR MOEDA
// ==========================================

function formatarMoeda(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        \}
    );
\}


// ==========================================
// MENSAGEM DE NOTIFICAÇÃO
// ==========================================

function mostrarMensagem(mensagem) {

    toast.textContent = mensagem;

    toast.classList.add("show");


    setTimeout(function () {

        toast.classList.remove("show");

    \}, 3000);
\}


// ==========================================
// INICIALIZAÇÃO
// ==========================================

atualizarTabela();$0