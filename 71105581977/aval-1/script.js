
let produtos = [];

const formulario = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");

// Cadastrar produto
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = Number(document.getElementById("codigo").value);
    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    const existe = produtos.some(produto => produto.codigo === codigo);

    if (existe) {
        alert("Esse código já está cadastrado!");
        return;
    }

    const produto = {
        codigo,
        descricao,
        quantidade,
        valor
    };

    produtos.push(produto);

    formulario.reset();
    listarProdutos();
});

// Listar produtos
function listarProdutos() {
    listaProdutos.innerHTML = "";

    produtos.forEach((produto, indice) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })}</td>

            <td class="acoes">
                <button onclick="alterarValor(${indice})">
                    Alterar Valor
                </button>

                <button onclick="alterarQuantidade(${indice})">
                    Alterar Quantidade
                </button>

                <button class="btn-excluir" onclick="excluirProduto(${indice})">
                    Excluir
                </button>
            </td>
        `;

        listaProdutos.appendChild(linha);
    });

    atualizarResumo();
}

// Alterar valor
function alterarValor(indice) {
    const novoValor = prompt("Digite o novo valor do produto:");

    if (novoValor !== null && novoValor.trim() !== "") {
        const valor = Number(novoValor);

        if (Number.isFinite(valor) && valor >= 0) {
            produtos[indice].valor = valor;
            listarProdutos();
        } else {
            alert("Digite um valor válido!");
        }
    }
}

// Alterar quantidade
function alterarQuantidade(indice) {
    const novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade !== null && novaQuantidade.trim() !== "") {
        const quantidade = Number(novaQuantidade);

        if (Number.isInteger(quantidade) && quantidade >= 0) {
            produtos[indice].quantidade = quantidade;
            listarProdutos();
        } else {
            alert("Digite uma quantidade válida!");
        }
    }
}

// Excluir produto
function excluirProduto(indice) {
    if (confirm("Deseja excluir este produto?")) {
        produtos.splice(indice, 1);
        listarProdutos();
    }
}

// Atualizar informações do estoque
function atualizarResumo() {
    const totalProdutos = produtos.length;

    const totalQuantidade = produtos.reduce(
        (total, produto) => total + produto.quantidade, 0
    );

    const valorEstoque = produtos.reduce(
        (total, produto) => total + produto.quantidade * produto.valor, 0
    );

    document.getElementById("totalProdutos").textContent = totalProdutos;

    document.getElementById("totalQuantidade").textContent =
        totalQuantidade;

    document.getElementById("valorEstoque").textContent =
        valorEstoque.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
}
