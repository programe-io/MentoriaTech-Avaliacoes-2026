// Array para armazenar os produtos

let produtos = [];


// ================================
// CADASTRAR PRODUTO
// ================================

function cadastrarProduto() {

    let codigo = prompt("Digite o código do produto:");

    if (!codigo) {
        alert("❌ Código inválido!");
        return;
    \}


    let descricao = prompt("Digite a descrição do produto:");

    if (!descricao) {
        alert("❌ Descrição inválida!");
        return;
    \}


    let quantidade = Number(
        prompt("Digite a quantidade do produto:")
    );


    let valor = Number(
        prompt("Digite o valor do produto:")
    );


    if (isNaN(quantidade) || isNaN(valor)) {

        alert("❌ Digite números válidos!");

        return;
    \}


    // Criando o produto

    let produto = {

        codigo: codigo,

        descricao: descricao,

        quantidade: quantidade,

        valor: valor

    \};


    // Adicionando ao array

    produtos.push(produto);


    alert("✅ Produto cadastrado com sucesso!");


    // Atualiza a tela

    atualizarTela();
\}



// ================================
// LISTAR PRODUTOS
// ================================

function listarProdutos() {

    if (produtos.length === 0) {

        alert("⚠️ Nenhum produto cadastrado.");

        return;
    \}


    let mensagem = "📋 PRODUTOS CADASTRADOS\\n\\n";


    produtos.forEach(function(produto, index) {

        mensagem +=
            "Produto " + (index + 1) + "\\n" +

            "Código: " + produto.codigo + "\\n" +

            "Descrição: " + produto.descricao + "\\n" +

            "Quantidade: " + produto.quantidade + "\\n" +

            "Valor: R\$ " +
            produto.valor.toFixed(2) +

            "\\n\\n";

    \});


    alert(mensagem);
\}



// ================================
// ALTERAR VALOR
// ================================

function alterarValor() {

    let codigo = prompt(
        "Digite o código do produto:"
    );


    // Procura o produto

    let produto = produtos.find(function(p) {

        return p.codigo === codigo;

    \});


    if (!produto) {

        alert("❌ Produto não encontrado!");

        return;
    \}


    let novoValor = Number(
        prompt("Digite o novo valor:")
    );


    if (isNaN(novoValor)) {

        alert("❌ Valor inválido!");

        return;
    \}


    produto.valor = novoValor;


    alert("✅ Valor alterado com sucesso!");


    atualizarTela();
\}



// ================================
// ALTERAR QUANTIDADE
// ================================

function alterarQuantidade() {

    let codigo = prompt(
        "Digite o código do produto:"
    );


    let produto = produtos.find(function(p) {

        return p.codigo === codigo;

    \});


    if (!produto) {

        alert("❌ Produto não encontrado!");

        return;
    \}


    let novaQuantidade = Number(
        prompt("Digite a nova quantidade:")
    );


    if (isNaN(novaQuantidade)) {

        alert("❌ Quantidade inválida!");

        return;
    \}


    produto.quantidade = novaQuantidade;


    alert("✅ Quantidade alterada com sucesso!");


    atualizarTela();
\}



// ================================
// ATUALIZAR A TELA
// ================================

function atualizarTela() {

    let lista = document.getElementById(
        "listaProdutos"
    );


    lista.innerHTML = "";


    if (produtos.length === 0) {

        lista.innerHTML = `
            <p class="vazio">
                Nenhum produto cadastrado.
            </p>
        `;

        return;
    \}


    produtos.forEach(function(produto) {

        lista.innerHTML += `

            <div class="produto">

                <p>
                    <strong>🔢 Código:</strong>
                    \${produto.codigo\}
                </p>

                <p>
                    <strong>📝 Descrição:</strong>
                    \${produto.descricao\}
                </p>

                <p>
                    <strong>📦 Quantidade:</strong>
                    \${produto.quantidade\}
                </p>

                <p>
                    <strong>💰 Valor:</strong>
                    R\$ \${produto.valor.toFixed(2)\}
                </p>

            </div>

        `;

    \});
\}



// ================================
// SAIR
// ================================

function sair() {

    alert("👋 Sistema encerrado!");

\}$0