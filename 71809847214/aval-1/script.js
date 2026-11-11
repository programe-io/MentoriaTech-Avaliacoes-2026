
let produtos = [];
let proximoCodigo = 1;

// Cadastrar produto
document.getElementById("formProduto")
.addEventListener("submit", function(event) {

    event.preventDefault();

    let descricao = document.getElementById("descricao").value.trim();
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (descricao.length < 3) {
        alert("A descrição deve ter pelo menos 3 caracteres!");
        return;
    }

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        alert("Informe uma quantidade válida!");
        return;
    }

    if (!Number.isFinite(valor) || valor < 0) {
        alert("Informe um valor válido!");
        return;
    }

    let produto = {
        codigo: proximoCodigo++,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    this.reset();

    listarProdutos();
});

// Listar produtos
function listarProdutos() {

    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = `
            <tr>
                <td colspan="5" class="vazio">
                    Nenhum produto cadastrado.
                </td>
            </tr>
        `;
        return;
    }

    produtos.forEach(produto => {

        let linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td></td>
            <td>${produto.quantidade}</td>
            <td>${produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })}</td>
            <td>
                <button class="btn-valor"
                    onclick="alterarValor(${produto.codigo})">
                    Alterar Valor
                </button>

                <button class="btn-quantidade"
                    onclick="alterarQuantidade(${produto.codigo})">
                    Alterar Quantidade
                </button>
            </td>
        `;

        linha.children[1].textContent = produto.descricao;

        lista.appendChild(linha);
    });
}

// Alterar valor do produto
function alterarValor(codigo) {

    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    let novoValor = prompt("Digite o novo valor do produto:");

    if (novoValor === null || novoValor.trim() === "") {
        return;
    }

    novoValor = Number(novoValor);

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Valor inválido!");
        return;
    }

    produto.valor = novoValor;

    alert("Valor alterado com sucesso!");

    listarProdutos();
}

// Alterar quantidade do produto
function alterarQuantidade(codigo) {

    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    let novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") {
        return;
    }

    novaQuantidade = Number(novaQuantidade);

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
        alert("Quantidade inválida!");
        return;
    }

    produto.quantidade = novaQuantidade;

    alert("Quantidade alterada com sucesso!");

    listarProdutos();
}

// Exibir lista inicial
listarProdutos();
