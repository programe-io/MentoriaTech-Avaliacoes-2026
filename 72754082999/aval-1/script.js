let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

const formulario = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");

// Salvar produtos
function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Cadastrar produto
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const preco = Number(document.getElementById("preco").value);
    const quantidade = Number(document.getElementById("quantidade").value);

    const produto = {
        id: Date.now(),
        nome: nome,
        preco: preco,
        quantidade: quantidade
    };

    produtos.push(produto);

    salvarProdutos();
    listarProdutos();

    formulario.reset();

    alert("Produto cadastrado com sucesso!");
});

// Listar produtos
function listarProdutos() {
    listaProdutos.innerHTML = "";

    produtos.forEach(function(produto) {
        const linha = document.createElement("tr");

        const nome = document.createElement("td");
        nome.textContent = produto.nome;

        const preco = document.createElement("td");
        preco.textContent = produto.preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        const quantidade = document.createElement("td");
        quantidade.textContent = produto.quantidade;

        const acoes = document.createElement("td");

        const botaoPreco = document.createElement("button");
        botaoPreco.textContent = "Alterar preço";
        botaoPreco.className = "alterar";
        botaoPreco.onclick = () => alterarPreco(produto.id);

        const botaoQuantidade = document.createElement("button");
        botaoQuantidade.textContent = "Alterar quantidade";
        botaoQuantidade.className = "alterar";
        botaoQuantidade.onclick = () => alterarQuantidade(produto.id);

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "excluir";
        botaoExcluir.onclick = () => excluirProduto(produto.id);

        acoes.append(botaoPreco, botaoQuantidade, botaoExcluir);

        linha.append(nome, preco, quantidade, acoes);

        listaProdutos.appendChild(linha);
    });
}

// Alterar preço
function alterarPreco(id) {
    const produto = produtos.find(p => p.id === id);

    const novoPreco = prompt("Digite o novo preço:", produto.preco);

    if (novoPreco === null || novoPreco.trim() === "") return;

    const valor = Number(novoPreco.replace(",", "."));

    if (!Number.isFinite(valor) || valor < 0) {
        alert("Digite um preço válido!");
        return;
    }

    produto.preco = valor;

    salvarProdutos();
    listarProdutos();
}

// Alterar quantidade
function alterarQuantidade(id) {
    const produto = produtos.find(p => p.id === id);

    const novaQuantidade = prompt(
        "Digite a nova quantidade:",
        produto.quantidade
    );

    if (novaQuantidade === null || novaQuantidade.trim() === "") return;

    const valor = Number(novaQuantidade);

    if (!Number.isInteger(valor) || valor < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produto.quantidade = valor;

    salvarProdutos();
    listarProdutos();
}

// Excluir produto
function excluirProduto(id) {
    if (confirm("Deseja realmente excluir este produto?")) {
        produtos = produtos.filter(p => p.id !== id);

        salvarProdutos();
        listarProdutos();
    }
}

// Mostrar produtos ao abrir a página
listarProdutos();