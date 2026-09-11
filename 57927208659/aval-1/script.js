let produtos = [];

const form = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const codigo = document.getElementById("codigo").value;
    const nome = document.getElementById("nome").value;
    const categoria = document.getElementById("categoria").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const preco = Number(document.getElementById("preco").value);

    const produto = {
        codigo: codigo,
        nome: nome,
        categoria: categoria,
        quantidade: quantidade,
        preco: preco
    \};

    produtos.push(produto);

    mostrarProdutos();
    atualizarResumo();

    form.reset();
\});


function mostrarProdutos() {

    listaProdutos.innerHTML = "";

    produtos.forEach(function(produto, index) {

        const linha = document.createElement("tr");

        let status;

        if (produto.quantidade <= 5) {
            status = `<span class="status-baixo">Estoque baixo</span>`;
        \} else {
            status = `<span class="status-normal">Normal</span>`;
        \}

        linha.innerHTML = `
            <td>\${produto.codigo\}</td>
            <td>\${produto.nome\}</td>
            <td>\${produto.categoria\}</td>
            <td>\${produto.quantidade\}</td>
            <td>R\$ \${produto.preco.toFixed(2)\}</td>
            <td>\${status\}</td>
            <td>
                <button class="btn-excluir" onclick="excluirProduto(\${index\})">
                    Excluir
                </button>
            </td>
        `;

        listaProdutos.appendChild(linha);
    \});
\}


function excluirProduto(index) {

    produtos.splice(index, 1);

    mostrarProdutos();
    atualizarResumo();
\}


function atualizarResumo() {

    const totalProdutos = produtos.length;

    let totalItens = 0;
    let valorEstoque = 0;

    produtos.forEach(function(produto) {

        totalItens += produto.quantidade;

        valorEstoque += produto.quantidade * produto.preco;

    \});

    document.getElementById("totalProdutos").textContent = totalProdutos;

    document.getElementById("totalItens").textContent = totalItens;

    document.getElementById("valorEstoque").textContent =
        valorEstoque.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        \});
\}$0