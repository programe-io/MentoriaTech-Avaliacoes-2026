let produtos = [];

// CADASTRAR PRODUTO
function cadastrarProduto() {

    const codigo = Number(document.getElementById("codigo").value);
    const descricao = document.getElementById("descricao").value.trim();
    const quantidadeTexto = document.getElementById("quantidade").value;
    const valorTexto = document.getElementById("valor").value;

    const quantidade = Number(quantidadeTexto);
    const valor = Number(valorTexto);

    // Verificar campos
    if (
        document.getElementById("codigo").value === "" ||
        descricao === "" ||
        quantidadeTexto === "" ||
        valorTexto === ""
    ) {
        alert("Preencha todos os campos!");
        return;
    \}

    if (codigo <= 0 || quantidade < 0 || valor < 0) {
        alert("Digite valores válidos!");
        return;
    \}

    // Verificar código duplicado
    const existe = produtos.find(p => p.codigo === codigo);

    if (existe) {
        alert("Este código já está cadastrado!");
        return;
    \}

    // Criar produto
    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    \};

    // Adicionar produto
    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    limparCampos();

    listarProdutos();
\}

// LISTAR PRODUTOS
function listarProdutos() {

    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    \}

    produtos.forEach(produto => {

        lista.innerHTML += `
            <div class="produto">
                <strong>Código:</strong> \${produto.codigo\}<br>
                <strong>Descrição:</strong> \${produto.descricao\}<br>
                <strong>Quantidade:</strong> \${produto.quantidade\}<br>
                <strong>Valor:</strong> R\$ \${produto.valor.toFixed(2)\}
            </div>
        `;
    \});
\}

// ALTERAR VALOR
function alterarValor() {

    const codigo = Number(document.getElementById("codigoAlterar").value);
    const novoValorTexto = document.getElementById("novoValor").value;
    const novoValor = Number(novoValorTexto);

    if (!codigo || novoValorTexto === "" || novoValor < 0) {
        alert("Informe o código e o novo valor!");
        return;
    \}

    const produto = produtos.find(p => p.codigo === codigo);

    if (produto) {
        produto.valor = novoValor;
        alert("Valor alterado com sucesso!");
        listarProdutos();
    \} else {
        alert("Produto não encontrado!");
    \}
\}

// ALTERAR QUANTIDADE
function alterarQuantidade() {

    const codigo = Number(document.getElementById("codigoAlterar").value);
    const novaQuantidadeTexto = document.getElementById("novaQuantidade").value;
    const novaQuantidade = Number(novaQuantidadeTexto);

    if (!codigo || novaQuantidadeTexto === "" || novaQuantidade < 0) {
        alert("Informe o código e a nova quantidade!");
        return;
    \}

    const produto = produtos.find(p => p.codigo === codigo);

    if (produto) {
        produto.quantidade = novaQuantidade;
        alert("Quantidade alterada com sucesso!");
        listarProdutos();
    \} else {
        alert("Produto não encontrado!");
    \}
\}

// LIMPAR CAMPOS
function limparCampos() {

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

\}$0