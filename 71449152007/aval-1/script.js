let produtos = [];

function validarProduto(descricao, quantidade, valor) {

    if (descricao.length < 5) {
        throw new Error("Descrição deve ter no mínimo cinco caracteres");
    \}

    if (quantidade <= 0) {
        throw new Error("Quantidade deve ser maior que zero");
    \}

    if (valor <= 0) {
        throw new Error("Valor deve ser maior que zero");
    \}
\}

function cadastrarProduto() {

    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    const mensagem = document.getElementById("mensagem");

    try {

        validarProduto(descricao, quantidade, valor);

        let novoProduto = {
            codigo: produtos.length + 1,
            descricao: descricao,
            quantidade: quantidade,
            valor: valor
        \};

        produtos.push(novoProduto);

        mensagem.textContent = "Produto cadastrado com sucesso!";
        mensagem.className = "sucesso";

        document.getElementById("descricao").value = "";
        document.getElementById("quantidade").value = "";
        document.getElementById("valor").value = "";

        listarProdutos();

    \} catch (erro) {

        mensagem.textContent = erro.message;
        mensagem.className = "erro";
    \}
\}

function listarProdutos() {

    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length === 0) {

        lista.innerHTML = `
            <p class="vazio">
                Nenhum produto cadastrado.
            </p>
        `;

        return;
    \}

    produtos.forEach(produto => {

        const div = document.createElement("div");

        div.className = "produto";

        div.innerHTML = `
            <h3>\${produto.descricao\}</h3>

            <p>
                <strong>Código:</strong> \${produto.codigo\}
            </p>

            <p>
                <strong>Quantidade:</strong> \${produto.quantidade\}
            </p>

            <p>
                <strong>Valor:</strong>
                R\$ \${produto.valor.toFixed(2)\}
            </p>

            <div class="acoes">

                <button 
                    class="btn-valor"
                    onclick="atualizarValor(\${produto.codigo\})">
                    Alterar valor
                </button>

                <button 
                    class="btn-quantidade"
                    onclick="atualizarQuantidade(\${produto.codigo\})">
                    Adicionar quantidade
                </button>

            </div>
        `;

        lista.appendChild(div);
    \});
\}

function atualizarValor(codigoProduto) {

    const novoValor = Number(
        prompt("Digite o novo valor do produto:")
    );

    if (isNaN(novoValor)) {
        alert("Digite um valor válido.");
        return;
    \}

    if (novoValor < 0) {
        alert("Valor deve ser maior ou igual a zero.");
        return;
    \}

    const produto = produtos.find(
        p => p.codigo === codigoProduto
    );

    if (produto) {

        produto.valor = novoValor;

        listarProdutos();

    \} else {

        alert("Produto não encontrado.");
    \}
\}

function atualizarQuantidade(codigoProduto) {

    const novaQuantidade = Number(
        prompt("Digite a quantidade que deseja adicionar:")
    );

    if (isNaN(novaQuantidade)) {
        alert("Digite uma quantidade válida.");
        return;
    \}

    if (novaQuantidade <= 0) {
        alert("Quantidade deve ser maior que zero.");
        return;
    \}

    const produto = produtos.find(
        p => p.codigo === codigoProduto
    );

    if (produto) {

        produto.quantidade += novaQuantidade;

        listarProdutos();

    \} else {

        alert("Produto não encontrado.");
    \}
\}

listarProdutos();$0