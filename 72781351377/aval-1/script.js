let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

let proximoId = produtos.length > 0
    ? Math.max(...produtos.map(produto => produto.id)) + 1
    : 1;


// CREATE - Cadastrar produto
function salvarProduto() {

    const id = document.getElementById("produtoId").value;
    const nome = document.getElementById("nome").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const preco = Number(document.getElementById("preco").value);

    if (nome === "" || quantidade < 0 || preco < 0 || isNaN(quantidade) || isNaN(preco)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // UPDATE - Editar produto
    if (id !== "") {

        const produto = produtos.find(p => p.id === Number(id));

        produto.nome = nome;
        produto.quantidade = quantidade;
        produto.preco = preco;

        mostrarMensagem("Produto atualizado com sucesso!");

    } else {

        // CREATE - Novo produto
        const novoProduto = {
            id: proximoId++,
            nome: nome,
            quantidade: quantidade,
            preco: preco
        };

        produtos.push(novoProduto);

        mostrarMensagem("Produto cadastrado com sucesso!");
    }

    salvarLocalStorage();
    atualizarTabela();
    limparFormulario();
}


// READ - Mostrar produtos
function atualizarTabela() {

    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach(produto => {

        const valorTotal = produto.quantidade * produto.preco;

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.id}</td>
            <td>${produto.nome}</td>
            <td>${produto.quantidade}</td>
            <td>${formatarMoeda(produto.preco)}</td>
            <td>${formatarMoeda(valorTotal)}</td>

            <td>
                <button
                    class="btn-editar"
                    onclick="editarProduto(${produto.id})">
                    Editar
                </button>

                <button
                    class="btn-excluir"
                    onclick="excluirProduto(${produto.id})">
                    Excluir
                </button>
            </td>
        `;

        lista.appendChild(linha);
    });

    atualizarResumo();
}


// UPDATE - Carregar produto para edição
function editarProduto(id) {

    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        return;
    }

    document.getElementById("produtoId").value = produto.id;
    document.getElementById("nome").value = produto.nome;
    document.getElementById("quantidade").value = produto.quantidade;
    document.getElementById("preco").value = produto.preco;

    document.getElementById("btnSalvar").textContent = "Atualizar";
}


// DELETE - Excluir produto
function excluirProduto(id) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir este produto?"
    );

    if (!confirmar) {
        return;
    }

    produtos = produtos.filter(produto => produto.id !== id);

    salvarLocalStorage();
    atualizarTabela();

    mostrarMensagem("Produto excluído com sucesso!");
}


// Limpar formulário
function limparFormulario() {

    document.getElementById("produtoId").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("preco").value = "";

    document.getElementById("btnSalvar").textContent = "Cadastrar";
}


// Salvar no navegador
function salvarLocalStorage() {

    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );
}


// Atualizar resumo do estoque
function atualizarResumo() {

    const totalProdutos = produtos.length;

    const totalItens = produtos.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    const valorTotal = produtos.reduce(
        (total, produto) =>
            total + (produto.quantidade * produto.preco),
        0
    );

    document.getElementById("totalProdutos").textContent =
        totalProdutos;

    document.getElementById("totalEstoque").textContent =
        totalItens;

    document.getElementById("valorEstoque").textContent =
        formatarMoeda(valorTotal);
}


// Formatar valores em reais
function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


// Mensagem
function mostrarMensagem(texto) {

    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;

    setTimeout(() => {
        mensagem.textContent = "";
    }, 3000);
}


// Carregar dados ao abrir a página
atualizarTabela();