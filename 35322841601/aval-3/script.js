let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

const formulario = document.getElementById("produtoForm");
const listaProdutos = document.getElementById("listaProdutos");
const pesquisa = document.getElementById("pesquisa");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const categoria = document.getElementById("categoria").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const preco = Number(document.getElementById("preco").value);

    const produto = {
        id: Date.now(),
        nome,
        categoria,
        quantidade,
        preco
    };

    produtos.push(produto);

    salvarProdutos();

    formulario.reset();

    mostrarProdutos();
});

function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

function mostrarProdutos() {

    listaProdutos.innerHTML = "";

    const termo = pesquisa.value.toLowerCase();

    const produtosFiltrados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(termo) ||
        produto.categoria.toLowerCase().includes(termo)
    );

    produtosFiltrados.forEach(produto => {

        let status;
        let classeStatus;

        if (produto.quantidade === 0) {
            status = "Esgotado";
            classeStatus = "esgotado";
        } 
        else if (produto.quantidade <= 5) {
            status = "Estoque baixo";
            classeStatus = "baixo";
        } 
        else {
            status = "Disponível";
            classeStatus = "disponivel";
        }

        const valorTotal = produto.quantidade * produto.preco;

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.nome}</td>

            <td>${produto.categoria}</td>

            <td>${produto.quantidade}</td>

            <td>
                ${formatarMoeda(produto.preco)}
            </td>

            <td>
                ${formatarMoeda(valorTotal)}
            </td>

            <td>
                <span class="status ${classeStatus}">
                    ${status}
                </span>
            </td>

            <td>
                <div class="acoes">

                    <button 
                        class="btn-editar"
                        onclick="editarProduto(${produto.id})">
                        Editar
                    </button>

                    <button 
                        class="btn-excluir"
                        onclick="excluirProduto(${produto.id})">
                        Excluir
                    </button>

                </div>
            </td>
        `;

        listaProdutos.appendChild(linha);
    });

    atualizarDashboard();
}

function excluirProduto(id) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir este produto?"
    );

    if (!confirmar) return;

    produtos = produtos.filter(produto => produto.id !== id);

    salvarProdutos();

    mostrarProdutos();
}

function editarProduto(id) {

    const produto = produtos.find(produto => produto.id === id);

    if (!produto) return;

    const novoNome = prompt(
        "Nome do produto:",
        produto.nome
    );

    if (novoNome === null) return;

    const novaCategoria = prompt(
        "Categoria:",
        produto.categoria
    );

    if (novaCategoria === null) return;

    const novaQuantidade = prompt(
        "Quantidade:",
        produto.quantidade
    );

    if (novaQuantidade === null) return;

    const novoPreco = prompt(
        "Preço:",
        produto.preco
    );

    if (novoPreco === null) return;

    produto.nome = novoNome;
    produto.categoria = novaCategoria;
    produto.quantidade = Number(novaQuantidade);
    produto.preco = Number(novoPreco);

    salvarProdutos();

    mostrarProdutos();
}

function atualizarDashboard() {

    const totalProdutos = produtos.length;

    const totalItens = produtos.reduce(
        (total, produto) =>
            total + produto.quantidade,
        0
    );

    const estoqueBaixo = produtos.filter(
        produto =>
            produto.quantidade <= 5
    ).length;

    const valorEstoque = produtos.reduce(
        (total, produto) =>
            total + produto.quantidade * produto.preco,
        0
    );

    document.getElementById("totalProdutos").textContent =
        totalProdutos;

    document.getElementById("totalItens").textContent =
        totalItens;

    document.getElementById("estoqueBaixo").textContent =
        estoqueBaixo;

    document.getElementById("valorEstoque").textContent =
        formatarMoeda(valorEstoque);
}

function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}

pesquisa.addEventListener(
    "input",
    mostrarProdutos
);

mostrarProdutos();