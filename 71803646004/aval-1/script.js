```javascript
// ==========================================
// SISTEMA DE ESTOQUE
// ==========================================

// Recupera os produtos salvos no navegador
let produtos = JSON.parse(localStorage.getItem("produtosEstoque")) || [];


// ELEMENTOS DO HTML
const formulario = document.getElementById("produtoForm");
const listaProdutos = document.getElementById("listaProdutos");

const codigoInput = document.getElementById("codigo");
const nomeInput = document.getElementById("nome");
const categoriaInput = document.getElementById("categoria");
const quantidadeInput = document.getElementById("quantidade");
const precoInput = document.getElementById("preco");
const produtoIdInput = document.getElementById("produtoId");

const buscarInput = document.getElementById("buscar");
const filtroCategoria = document.getElementById("filtroCategoria");

const totalProdutos = document.getElementById("totalProdutos");
const totalItens = document.getElementById("totalItens");
const estoqueBaixo = document.getElementById("estoqueBaixo");
const valorEstoque = document.getElementById("valorEstoque");


// ==========================================
// FORMATAÇÃO DE VALORES
// ==========================================

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


// ==========================================
// SALVAR NO LOCALSTORAGE
// ==========================================

function salvarProdutos() {
    localStorage.setItem(
        "produtosEstoque",
        JSON.stringify(produtos)
    );
}


// ==========================================
// ADICIONAR / EDITAR PRODUTO
// ==========================================

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const codigo = codigoInput.value.trim();
    const nome = nomeInput.value.trim();
    const categoria = categoriaInput.value;
    const quantidade = Number(quantidadeInput.value);
    const preco = Number(precoInput.value);
    const id = produtoIdInput.value;

    if (
        codigo === "" ||
        nome === "" ||
        categoria === "" ||
        quantidade < 0 ||
        preco < 0
    ) {
        alert("Preencha todos os campos corretamente.");
        return;
    }


    // EDITANDO
    if (id !== "") {

        const indice = produtos.findIndex(
            produto => produto.id == id
        );

        if (indice !== -1) {

            produtos[indice] = {
                id: Number(id),
                codigo,
                nome,
                categoria,
                quantidade,
                preco
            };

            alert("Produto atualizado com sucesso!");
        }

    }

    // ADICIONANDO
    else {

        const codigoExiste = produtos.some(
            produto => produto.codigo.toLowerCase() === codigo.toLowerCase()
        );

        if (codigoExiste) {
            alert("Já existe um produto com esse código.");
            return;
        }

        const novoProduto = {
            id: Date.now(),
            codigo,
            nome,
            categoria,
            quantidade,
            preco
        };

        produtos.push(novoProduto);

        alert("Produto adicionado com sucesso!");
    }


    salvarProdutos();

    formulario.reset();

    produtoIdInput.value = "";

    document.getElementById("btnSalvar").textContent =
        "➕ Adicionar Produto";

    document.getElementById("btnCancelar").style.display =
        "none";

    atualizarTela();
});


// ==========================================
// EXIBIR PRODUTOS
// ==========================================

function atualizarTela() {

    listaProdutos.innerHTML = "";

    const pesquisa = buscarInput.value
        .toLowerCase()
        .trim();

    const categoriaSelecionada =
        filtroCategoria.value;


    const produtosFiltrados = produtos.filter(produto => {

        const correspondePesquisa =
            produto.nome.toLowerCase().includes(pesquisa) ||
            produto.codigo.toLowerCase().includes(pesquisa);

        const correspondeCategoria =
            categoriaSelecionada === "todos" ||
            produto.categoria === categoriaSelecionada;

        return correspondePesquisa && correspondeCategoria;
    });


    if (produtosFiltrados.length === 0) {

        document.getElementById("mensagemVazia").style.display =
            "block";

    } else {

        document.getElementById("mensagemVazia").style.display =
            "none";
    }


    produtosFiltrados.forEach(produto => {

        const tr = document.createElement("tr");

        let status;
        let classeStatus;

        if (produto.quantidade === 0) {

            status = "Esgotado";
            classeStatus = "status-esgotado";

        } else if (produto.quantidade <= 5) {

            status = "Estoque baixo";
            classeStatus = "status-baixo";

        } else {

            status = "Disponível";
            classeStatus = "status-ok";
        }


        const valorTotal =
            produto.quantidade * produto.preco;


        tr.innerHTML = `

            <td>${produto.codigo}</td>

            <td>
                <strong>${produto.nome}</strong>
            </td>

            <td>${produto.categoria}</td>

            <td>${produto.quantidade}</td>

            <td>${formatarMoeda(produto.preco)}</td>

            <td>${formatarMoeda(valorTotal)}</td>

            <td>
                <span class="status ${classeStatus}">
                    ${status}
                </span>
            </td>

            <td>

                <button
                    class="btn-editar"
                    onclick="editarProduto(${produto.id})"
                >
                    ✏️
                </button>

                <button
                    class="btn-excluir"
                    onclick="excluirProduto(${produto.id})"
                >
                    🗑️
                </button>

            </td>
        `;

        listaProdutos.appendChild(tr);
    });


    atualizarResumo();
}


// ==========================================
// ATUALIZAR RESUMO
// ==========================================

function atualizarResumo() {

    const quantidadeProdutos = produtos.length;

    const quantidadeItens = produtos.reduce(
        (total, produto) =>
            total + produto.quantidade,
        0
    );

    const produtosBaixos = produtos.filter(
        produto =>
            produto.quantidade > 0 &&
            produto.quantidade <= 5
    ).length;

    const valorTotal = produtos.reduce(
        (total, produto) =>
            total + (produto.quantidade * produto.preco),
        0
    );


    totalProdutos.textContent =
        quantidadeProdutos;

    totalItens.textContent =
        quantidadeItens;

    estoqueBaixo.textContent =
        produtosBaixos;

    valorEstoque.textContent =
        formatarMoeda(valorTotal);
}


// ==========================================
// EDITAR PRODUTO
// ==========================================

function editarProduto(id) {

    const produto = produtos.find(
        produto => produto.id === id
    );

    if (!produto) return;


    produtoIdInput.value = produto.id;

    codigoInput.value = produto.codigo;
    nomeInput.value = produto.nome;
    categoriaInput.value = produto.categoria;
    quantidadeInput.value = produto.quantidade;
    precoInput.value = produto.preco;


    document.getElementById("btnSalvar").textContent =
        "💾 Salvar Alterações";

    document.getElementById("btnCancelar").style.display =
        "inline-block";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==========================================
// CANCELAR EDIÇÃO
// ==========================================

function cancelarEdicao() {

    formulario.reset();

    produtoIdInput.value = "";

    document.getElementById("btnSalvar").textContent =
        "➕ Adicionar Produto";

    document.getElementById("btnCancelar").style.display =
        "none";
}


// ==========================================
// EXCLUIR PRODUTO
// ==========================================

function excluirProduto(id) {

    const produto = produtos.find(
        produto => produto.id === id
    );

    if (!produto) return;


    const confirmar = confirm(
        `Deseja realmente excluir "${produto.nome}"?`
    );


    if (!confirmar) return;


    produtos = produtos.filter(
        produto => produto.id !== id
    );


    salvarProdutos();

    atualizarTela();
}


// ==========================================
// PESQUISA
// ==========================================

buscarInput.addEventListener(
    "input",
    atualizarTela
);


// ==========================================
// FILTRO DE CATEGORIA
// ==========================================

filtroCategoria.addEventListener(
    "change",
    atualizarTela
);


// ==========================================
// INICIALIZAÇÃO
// ==========================================

atualizarTela();
```
