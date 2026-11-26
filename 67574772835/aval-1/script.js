
// Lista que armazenará os produtos
let produtos = [];

// FUNÇÃO 1: CADASTRAR PRODUTO
function cadastrarProduto() {

    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    // Verificar se os campos foram preenchidos
    if (
        codigo === "" ||
        descricao === "" ||
        document.getElementById("quantidade").value === "" ||
        document.getElementById("valor").value === ""
    ) {
        alert("Preencha todos os campos!");
        return;
    }

    if (!Number.isInteger(quantidade) || quantidade < 0 || !Number.isFinite(valor) || valor < 0) {
        alert("Informe uma quantidade inteira e valores não negativos!");
        return;
    }

    // Verificar se o código já existe
    const existe = produtos.some(produto => produto.codigo === codigo);

    if (existe) {
        alert("Esse código já está cadastrado!");
        return;
    }

    // Criar objeto do produto
    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    // Adicionar produto à lista
    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    // Limpar os campos
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    listarProdutos();
}


// FUNÇÃO 2: LISTAR PRODUTOS
function listarProdutos() {

    const tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    produtos.forEach((produto, index) => {

        const linha = document.createElement("tr");

        const codigo = document.createElement("td");
        codigo.textContent = produto.codigo;

        const descricao = document.createElement("td");
        descricao.textContent = produto.descricao;

        const quantidade = document.createElement("td");
        quantidade.textContent = produto.quantidade;

        const valor = document.createElement("td");
        valor.textContent = produto.valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        const acoes = document.createElement("td");

        const botaoValor = document.createElement("button");
        botaoValor.textContent = "Alterar valor";
        botaoValor.className = "editar";
        botaoValor.dataset.action = "valor";
        botaoValor.dataset.index = index;

        const botaoQuantidade = document.createElement("button");
        botaoQuantidade.textContent = "Alterar quantidade";
        botaoQuantidade.className = "editar";
        botaoQuantidade.dataset.action = "quantidade";
        botaoQuantidade.dataset.index = index;

        acoes.append(botaoValor, botaoQuantidade);

        linha.append(codigo, descricao, quantidade, valor, acoes);

        tabela.appendChild(linha);
    });
}


// FUNÇÃO 3 E 4: ALTERAR VALOR OU QUANTIDADE
document.getElementById("listaProdutos").addEventListener("click", function(event) {

    const botao = event.target.closest("button[data-action]");

    if (!botao) return;

    const index = Number(botao.dataset.index);
    const produto = produtos[index];

    if (!produto) return;

    if (botao.dataset.action === "valor") {

        const novoValor = prompt("Digite o novo valor do produto:");

        if (novoValor === null || novoValor.trim() === "") return;

        const valor = Number(novoValor);

        if (!Number.isFinite(valor) || valor < 0) {
            alert("Digite um valor válido!");
            return;
        }

        produto.valor = valor;

        alert("Valor atualizado com sucesso!");

    } else if (botao.dataset.action === "quantidade") {

        const novaQuantidade = prompt("Digite a nova quantidade:");

        if (novaQuantidade === null || novaQuantidade.trim() === "") return;

        const quantidade = Number(novaQuantidade);

        if (!Number.isInteger(quantidade) || quantidade < 0) {
            alert("Digite uma quantidade inteira válida!");
            return;
        }

        produto.quantidade = quantidade;

        alert("Quantidade atualizada com sucesso!");
    }

    listarProdutos();
});
