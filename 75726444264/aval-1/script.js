
let produtos = [];

const form = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");

// CADASTRAR PRODUTO
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao || quantidade < 0 || valor < 0 ||
        !Number.isFinite(quantidade) || !Number.isFinite(valor)) {
        alert("Preencha os campos corretamente!");
        return;
    }

    // Verifica se o código já existe
    if (produtos.some(p => p.codigo === codigo)) {
        alert("Já existe um produto com esse código!");
        return;
    }

    const produto = {
        codigo,
        descricao,
        quantidade,
        valor
    };

    produtos.push(produto);

    form.reset();

    listarProdutos();
});

// LISTAR PRODUTOS
function listarProdutos() {

    lista.innerHTML = "";

    produtos.forEach((produto, index) => {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })}</td>

            <td>
                <div class="acoes">
                    <button class="btn-editar"
                        onclick="alterarValor(${index})">
                        Valor
                    </button>

                    <button class="btn-editar"
                        onclick="alterarQuantidade(${index})">
                        Quantidade
                    </button>

                    <button class="btn-excluir"
                        onclick="excluirProduto(${index})">
                        Excluir
                    </button>
                </div>
            </td>
        `;

        lista.appendChild(linha);
    });

    atualizarDashboard();
}

// ALTERAR VALOR DO PRODUTO
function alterarValor(index) {

    const novoValor = prompt(
        "Digite o novo valor do produto:"
    );

    if (novoValor === null || novoValor.trim() === "") {
        return;
    }

    const valor = Number(novoValor);

    if (!Number.isFinite(valor) || valor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produtos[index].valor = valor;

    listarProdutos();

    alert("Valor alterado com sucesso!");
}

// ALTERAR QUANTIDADE
function alterarQuantidade(index) {

    const novaQuantidade = prompt(
        "Digite a nova quantidade em estoque:"
    );

    if (novaQuantidade === null || novaQuantidade.trim() === "") {
        return;
    }

    const quantidade = Number(novaQuantidade);

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        alert("Digite uma quantidade inteira válida!");
        return;
    }

    produtos[index].quantidade = quantidade;

    listarProdutos();

    alert("Quantidade alterada com sucesso!");
}

// EXCLUIR PRODUTO
function excluirProduto(index) {

    const confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );

    if (confirmar) {
        produtos.splice(index, 1);
        listarProdutos();
    }
}

// ATUALIZAR DASHBOARD
function atualizarDashboard() {

    document.getElementById("totalProdutos").textContent =
        produtos.length;

    const total = produtos.reduce(
        (soma, produto) => soma + produto.quantidade, 0
    );

    document.getElementById("totalQuantidade").textContent =
        total;
}
