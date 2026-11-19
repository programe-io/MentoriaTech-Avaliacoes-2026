
let produtos = JSON.parse(
    localStorage.getItem("estoque")
) || [];

let indiceEdicao = null;

function moeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function salvarDados() {
    localStorage.setItem("estoque", JSON.stringify(produtos));
}

document.getElementById("formProduto")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const preco = Number(document.getElementById("preco").value);
    const quantidade = Number(document.getElementById("quantidade").value);

    if (!nome || !categoria ||
        !Number.isFinite(preco) || preco < 0 ||
        !Number.isInteger(quantidade) || quantidade < 0) {

        alert("Preencha os campos corretamente!");
        return;
    }

    const produto = {
        id: indiceEdicao !== null
            ? produtos[indiceEdicao].id
            : Date.now() + Math.random(),
        nome,
        categoria,
        preco,
        quantidade
    };

    if (indiceEdicao !== null) {
        produtos[indiceEdicao] = produto;
        alert("Produto atualizado com sucesso!");
    } else {
        produtos.push(produto);
        alert("Produto cadastrado com sucesso!");
    }

    salvarDados();
    cancelarEdicao();
    listarProdutos();
});

function escapar(texto) {
    return String(texto).replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caractere]);
}

function listarProdutos() {

    const lista = document.getElementById("listaProdutos");

    const busca = document.getElementById("pesquisa")
        .value.toLowerCase();

    lista.innerHTML = "";

    const filtrados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(busca) ||
        produto.categoria.toLowerCase().includes(busca)
    );

    if (filtrados.length === 0) {
        lista.innerHTML = `
            <tr>
                <td colspan="7" class="vazio">
                    Nenhum produto encontrado.
                </td>
            </tr>
        `;
    }

    filtrados.forEach(produto => {

        const indice = produtos.findIndex(
            p => p.id === produto.id
        );

        lista.innerHTML += `
            <tr>
                <td>${indice + 1}</td>
                <td>${escapar(produto.nome)}</td>
                <td>${escapar(produto.categoria)}</td>
                <td>${moeda(produto.preco)}</td>
                <td>${produto.quantidade}</td>
                <td>${moeda(produto.preco * produto.quantidade)}</td>
                <td>
                    <button class="editar"
                        onclick="editarProduto(${indice})">
                        Editar
                    </button>

                    <button class="excluir"
                        onclick="excluirProduto(${indice})">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });

    atualizarResumo();
}

function editarProduto(indice) {

    const produto = produtos[indice];

    document.getElementById("nome").value = produto.nome;
    document.getElementById("categoria").value = produto.categoria;
    document.getElementById("preco").value = produto.preco;
    document.getElementById("quantidade").value = produto.quantidade;

    indiceEdicao = indice;

    document.getElementById("tituloFormulario")
        .textContent = "Alterar Produto";

    document.getElementById("btnSalvar")
        .textContent = "Salvar Alterações";

    document.getElementById("btnCancelar")
        .style.display = "inline-block";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function cancelarEdicao() {

    indiceEdicao = null;

    document.getElementById("formProduto").reset();

    document.getElementById("tituloFormulario")
        .textContent = "Cadastrar Novo Produto";

    document.getElementById("btnSalvar")
        .textContent = "Cadastrar Produto";

    document.getElementById("btnCancelar")
        .style.display = "none";
}

function excluirProduto(indice) {

    if (confirm("Deseja realmente excluir este produto?")) {

        if (indiceEdicao === indice) {
            cancelarEdicao();
        } else if (indiceEdicao !== null && indiceEdicao > indice) {
            indiceEdicao--;
        }

        produtos.splice(indice, 1);

        salvarDados();
        listarProdutos();

        alert("Produto excluído com sucesso!");
    }
}

function atualizarResumo() {

    const totalProdutos = produtos.length;

    const totalQuantidade = produtos.reduce(
        (total, produto) => total + produto.quantidade, 0
    );

    const valorTotal = produtos.reduce(
        (total, produto) => total + produto.preco * produto.quantidade, 0
    );

    document.getElementById("totalProdutos").textContent = totalProdutos;

    document.getElementById("totalQuantidade").textContent = totalQuantidade;

    document.getElementById("valorEstoque").textContent = moeda(valorTotal);
}

listarProdutos();
