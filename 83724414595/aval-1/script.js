
let produtos = [];

// CADASTRAR PRODUTO
document.getElementById("produtoForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    // Verificar código duplicado
    if (produtos.some(produto => produto.codigo === codigo)) {
        alert("Este código já está cadastrado!");
        return;
    }

    const novoProduto = {
        codigo,
        descricao,
        quantidade,
        valor
    };

    produtos.push(novoProduto);

    this.reset();

    listarProdutos();

    alert("Produto cadastrado com sucesso!");
});


// LISTAR PRODUTOS
function listarProdutos() {

    const tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    if (produtos.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="5">Nenhum produto cadastrado.</td>
            </tr>
        `;
    }

    produtos.forEach((produto, index) => {

        tabela.innerHTML += `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>${produto.valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}</td>

                <td>
                    <button class="btn-editar"
                        onclick="alterarValor(${index})">
                        Valor
                    </button>

                    <button class="btn-editar"
                        onclick="alterarQuantidade(${index})">
                        Qtd.
                    </button>

                    <button class="btn-excluir"
                        onclick="excluirProduto(${index})">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });

    atualizarDashboard();
}


// ALTERAR VALOR DO PRODUTO
function alterarValor(index) {

    const novoValor = prompt("Digite o novo valor do produto:");

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


// ALTERAR QUANTIDADE DO PRODUTO
function alterarQuantidade(index) {

    const novaQuantidade = prompt("Digite a nova quantidade:");

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

    const confirmar = confirm("Deseja realmente excluir este produto?");

    if (confirmar) {
        produtos.splice(index, 1);

        listarProdutos();

        alert("Produto excluído com sucesso!");
    }
}


// ATUALIZAR PAINEL
function atualizarDashboard() {

    document.getElementById("totalProdutos").textContent = produtos.length;

    const total = produtos.reduce((soma, produto) => {
        return soma + produto.quantidade;
    }, 0);

    document.getElementById("totalQuantidade").textContent = total;
}


// INICIALIZAR SISTEMA
listarProdutos();
