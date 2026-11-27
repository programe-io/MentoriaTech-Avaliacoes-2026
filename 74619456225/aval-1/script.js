
let produtos = [];

// Cadastrar produto
document.getElementById("formProduto").addEventListener("submit", function(event) {
    event.preventDefault();

    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    // Verificar se o código já existe
    if (produtos.some(produto => produto.codigo === codigo)) {
        alert("Este código já está cadastrado!");
        return;
    }

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    document.getElementById("formProduto").reset();

    listarProdutos();
});

// Listar produtos
function listarProdutos() {
    let tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    produtos.forEach((produto, index) => {
        tabela.innerHTML += `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>
                <td>
                    <button class="editar" onclick="alterarValor(${index})">
                        Alterar Valor
                    </button>

                    <button class="editar" onclick="alterarQuantidade(${index})">
                        Alterar Quantidade
                    </button>

                    <button class="excluir" onclick="excluirProduto(${index})">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });
}

// Alterar valor do produto
function alterarValor(index) {
    let novoValor = prompt("Digite o novo valor do produto:");

    if (novoValor === null || novoValor.trim() === "") {
        return;
    }

    novoValor = Number(novoValor);

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produtos[index].valor = novoValor;

    alert("Valor alterado com sucesso!");

    listarProdutos();
}

// Alterar quantidade do produto
function alterarQuantidade(index) {
    let novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") {
        return;
    }

    novaQuantidade = Number(novaQuantidade);

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produtos[index].quantidade = novaQuantidade;

    alert("Quantidade alterada com sucesso!");

    listarProdutos();
}

// Excluir produto
function excluirProduto(index) {
    if (confirm("Deseja realmente excluir este produto?")) {
        produtos.splice(index, 1);

        listarProdutos();
    }
}
