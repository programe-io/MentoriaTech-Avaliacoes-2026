let produtos = [];

const formProduto = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");
const totalProdutos = document.getElementById("totalProdutos");

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

function listarProdutos() {
    listaProdutos.innerHTML = "";

    if (produtos.length === 0) {
        listaProdutos.innerHTML = `
            <tr>
                <td colspan="5" class="vazio">
                    Nenhum produto cadastrado.
                </td>
            </tr>
        `;

        totalProdutos.textContent = "0 produtos";
        return;
    }

    produtos.forEach(function (produto) {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
            <td>
                <button
                    class="btn btn-editar"
                    onclick="alterarValor(${produto.codigo})"
                >
                    Alterar valor
                </button>

                <button
                    class="btn btn-editar"
                    onclick="alterarQuantidade(${produto.codigo})"
                >
                    Alterar quantidade
                </button>
            </td>
        `;

        listaProdutos.appendChild(linha);
    });

    totalProdutos.textContent =
        `${produtos.length} produto${produtos.length > 1 ? "s" : ""}`;
}

function alterarValor(codigo) {
    const produto = produtos.find(function (produto) {
        return produto.codigo === codigo;
    });

    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    const novoValor = prompt(
        `Digite o novo valor para "${produto.descricao}":`
    );

    if (novoValor === null) {
        return;
    }

    const valor = Number(novoValor);

    if (isNaN(valor) || valor < 0) {
        alert("Digite um valor válido.");
        return;
    }

    produto.valor = valor;

    listarProdutos();
}

function alterarQuantidade(codigo) {
    const produto = produtos.find(function (produto) {
        return produto.codigo === codigo;
    });

    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    const novaQuantidade = prompt(
        `Digite a nova quantidade para "${produto.descricao}":`
    );

    if (novaQuantidade === null) {
        return;
    }

    const quantidade = Number(novaQuantidade);

    if (isNaN(quantidade) || quantidade < 0) {
        alert("Digite uma quantidade válida.");
        return;
    }

    produto.quantidade = quantidade;

    listarProdutos();
}

listarProdutos();
