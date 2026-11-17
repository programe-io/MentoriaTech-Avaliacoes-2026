
// Recupera os produtos salvos no navegador
let produtos = JSON.parse(localStorage.getItem("estoque")) || [];

// Elementos da página
const formulario = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");
const total = document.getElementById("totalProdutos");
const mensagemVazia = document.getElementById("mensagemVazia");

// Salvar os produtos no navegador
function salvarEstoque() {
    localStorage.setItem("estoque", JSON.stringify(produtos));
}

// Cadastrar produto
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao || quantidade < 0 ||
        valor < 0 || !Number.isFinite(quantidade) ||
        !Number.isFinite(valor)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Verificar se o código já existe
    if (produtos.some(p => p.codigo === codigo)) {
        alert("Esse código já está cadastrado!");
        return;
    }

    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    salvarEstoque();
    listarProdutos();

    formulario.reset();

    alert("Produto cadastrado com sucesso!");
});

// Listar produtos
function listarProdutos() {
    lista.innerHTML = "";

    total.textContent = produtos.length;

    mensagemVazia.style.display =
        produtos.length === 0 ? "block" : "none";

    produtos.forEach(function(produto) {
        const linha = document.createElement("tr");

        const codigo = document.createElement("td");
        codigo.textContent = produto.codigo;

        const descricao = document.createElement("td");
        descricao.textContent = produto.descricao;

        const quantidade = document.createElement("td");
        quantidade.textContent = produto.quantidade;

        const valor = document.createElement("td");
        valor.textContent = produto.valor.toLocaleString(
            "pt-BR",
            { style: "currency", currency: "BRL" }
        );

        const acoes = document.createElement("td");

        const botaoValor = document.createElement("button");
        botaoValor.textContent = "Alterar valor";
        botaoValor.className = "editar";
        botaoValor.dataset.action = "valor";
        botaoValor.dataset.codigo = produto.codigo;

        const botaoQuantidade = document.createElement("button");
        botaoQuantidade.textContent = "Alterar quantidade";
        botaoQuantidade.className = "editar";
        botaoQuantidade.dataset.action = "quantidade";
        botaoQuantidade.dataset.codigo = produto.codigo;

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "excluir";
        botaoExcluir.dataset.action = "excluir";
        botaoExcluir.dataset.codigo = produto.codigo;

        acoes.append(
            botaoValor,
            botaoQuantidade,
            botaoExcluir
        );

        linha.append(
            codigo,
            descricao,
            quantidade,
            valor,
            acoes
        );

        lista.appendChild(linha);
    });
}

// Ações dos botões
lista.addEventListener("click", function(event) {
    const botao = event.target.closest("button");

    if (!botao) return;

    const codigo = botao.dataset.codigo;
    const acao = botao.dataset.action;

    const produto = produtos.find(p => p.codigo === codigo);

    if (!produto) return;

    // Alterar valor
    if (acao === "valor") {
        const novoValor = prompt(
            "Digite o novo valor do produto:"
        );

        if (novoValor === null || novoValor.trim() === "") return;

        const valor = Number(novoValor.replace(",", "."));

        if (!Number.isFinite(valor) || valor < 0) {
            alert("Digite um valor válido!");
            return;
        }

        produto.valor = valor;

        salvarEstoque();
        listarProdutos();

        alert("Valor alterado com sucesso!");
    }

    // Alterar quantidade
    if (acao === "quantidade") {
        const novaQuantidade = prompt(
            "Digite a nova quantidade do produto:"
        );

        if (novaQuantidade === null ||
            novaQuantidade.trim() === "") return;

        const quantidade = Number(novaQuantidade);

        if (!Number.isInteger(quantidade) || quantidade < 0) {
            alert("Digite uma quantidade inteira válida!");
            return;
        }

        produto.quantidade = quantidade;

        salvarEstoque();
        listarProdutos();

        alert("Quantidade alterada com sucesso!");
    }

    // Excluir produto
    if (acao === "excluir") {
        const confirmar = confirm(
            "Deseja realmente excluir este produto?"
        );

        if (confirmar) {
            produtos = produtos.filter(
                p => p.codigo !== codigo
            );

            salvarEstoque();
            listarProdutos();

            alert("Produto excluído com sucesso!");
        }
    }
});

// Mostrar os produtos ao abrir a página
listarProdutos();
