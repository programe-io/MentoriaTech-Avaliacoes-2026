let produtos = [];

const formProduto = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");

// Cadastrar produto
formProduto.addEventListener("submit", function (event) {
    event.preventDefault();

    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(
        document.getElementById("quantidade").value
    );
    const valor = Number(
        document.getElementById("valor").value
    );

    const produto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    formProduto.reset();

    listarProdutos();
});

// Listar produtos
function listarProdutos() {
    listaProdutos.innerHTML = "";

    produtos.forEach(function (produto) {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
            <td>
                <div class="acoes">
                    <button
                        class="btn-valor"
                        onclick="alterarValor(${produto.codigo})"
                    >
                        Alterar valor
                    </button>

                    <button
                        class="btn-quantidade"
                        onclick="alterarQuantidade(${produto.codigo})"
                    >
                        Alterar quantidade
                    </button>
                </div>
            </td>
        `;

        listaProdutos.appendChild(linha);
    });
}

// Alterar valor
function alterarValor(codigo) {
    const produto = produtos.find(function (produto) {
        return produto.codigo === codigo;
    });

    if (produto) {
        const novoValor = Number(
            prompt("Digite o novo valor:")
        );

        if (!isNaN(novoValor) && novoValor >= 0) {
            produto.valor = novoValor;
            listarProdutos();
        } else {
            alert("Digite um valor válido.");
        }
    }
}

// Alterar quantidade
function alterarQuantidade(codigo) {
    const produto = produtos.find(function (produto) {
        return produto.codigo === codigo;
    });

    if (produto) {
        const novaQuantidade = Number(
            prompt("Digite a nova quantidade:")
        );

        if (
            !isNaN(novaQuantidade) &&
            novaQuantidade >= 0
        ) {
            produto.quantidade = novaQuantidade;
            listarProdutos();
        } else {
            alert("Digite uma quantidade válida.");
        }
    }
}
