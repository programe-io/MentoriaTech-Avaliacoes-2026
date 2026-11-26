
let produtos = JSON.parse(
    localStorage.getItem("produtos")
) || [];

let editando = null;

const form = document.getElementById("formProduto");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const produto = {
        nome: document.getElementById("nome").value,
        categoria: document.getElementById("categoria").value,
        quantidade: Number(document.getElementById("quantidade").value),
        preco: Number(document.getElementById("preco").value)
    };

    if (editando !== null) {
        produtos[editando] = produto;
        editando = null;
        document.getElementById("btnSalvar").textContent =
            "Adicionar Produto";
    } else {
        produtos.push(produto);
    }

    salvar();
    form.reset();
});

function salvar() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
    mostrarProdutos();
}

function mostrarProdutos() {
    const lista = document.getElementById("listaProdutos");
    const pesquisa = document.getElementById("pesquisa")
        .value.toLowerCase();

    lista.innerHTML = "";

    produtos.forEach((produto, index) => {
        if (!produto.nome.toLowerCase().includes(pesquisa)) {
            return;
        }

        lista.innerHTML += `
            <tr>
                <td>${produto.nome}</td>
                <td>${produto.categoria}</td>
                <td class="${produto.quantidade <= 5 ? 'baixo' : ''}">
                    ${produto.quantidade}
                    ${produto.quantidade <= 5 ? ' ⚠️' : ''}
                </td>
                <td>${produto.preco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}</td>
                <td>
                    <button class="editar"
                        onclick="editarProduto(${index})">
                        Editar
                    </button>

                    <button class="excluir"
                        onclick="excluirProduto(${index})">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });

    atualizarResumo();
}

function editarProduto(index) {
    const produto = produtos[index];

    document.getElementById("nome").value = produto.nome;
    document.getElementById("categoria").value = produto.categoria;
    document.getElementById("quantidade").value = produto.quantidade;
    document.getElementById("preco").value = produto.preco;

    editando = index;

    document.getElementById("btnSalvar").textContent =
        "Salvar Alterações";
}

function excluirProduto(index) {
    if (confirm("Deseja realmente excluir este produto?")) {
        produtos.splice(index, 1);
        salvar();
    }
}

function atualizarResumo() {
    const totalProdutos = produtos.length;

    const totalItens = produtos.reduce(
        (soma, produto) => soma + produto.quantidade, 0
    );

    const valorTotal = produtos.reduce(
        (soma, produto) =>
            soma + produto.quantidade * produto.preco, 0
    );

    document.getElementById("totalProdutos").textContent =
        totalProdutos;

    document.getElementById("totalItens").textContent =
        totalItens;

    document.getElementById("valorEstoque").textContent =
        valorTotal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
}

document.getElementById("pesquisa").addEventListener(
    "input", mostrarProdutos
);

mostrarProdutos();
