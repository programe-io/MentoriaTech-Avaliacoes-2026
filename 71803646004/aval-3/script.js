// ==========================================
// SISTEMA DE ESTOQUE - STOCKPRO
// ==========================================


// ==========================================
// DADOS INICIAIS
// ==========================================

let estoque = JSON.parse(localStorage.getItem("estoque")) || [
    {
        id: 1,
        codigo: "PROD-001",
        nome: "Teclado Mecânico",
        categoria: "Informática",
        quantidade: 15,
        preco: 149.90
    },

    {
        id: 2,
        codigo: "PROD-002",
        nome: "Mouse Gamer",
        categoria: "Acessórios",
        quantidade: 8,
        preco: 89.90
    },

    {
        id: 3,
        codigo: "PROD-003",
        nome: "Monitor 24 Polegadas",
        categoria: "Informática",
        quantidade: 4,
        preco: 799.90
    }
];


// ==========================================
// ELEMENTOS HTML
// ==========================================

const tabela = document.getElementById("tabelaProdutos");
const form = document.getElementById("formProduto");

const campoBusca = document.getElementById("campoBusca");
const filtroCategoria = document.getElementById("filtroCategoria");
const filtroStatus = document.getElementById("filtroStatus");


// ==========================================
// SALVAR NO LOCAL STORAGE
// ==========================================

function salvarEstoque() {

    localStorage.setItem(
        "estoque",
        JSON.stringify(estoque)
    );

}


// ==========================================
// FORMATAR DINHEIRO
// ==========================================

function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


// ==========================================
// VERIFICAR STATUS
// ==========================================

function verificarStatus(quantidade) {

    if (quantidade === 0) {
        return "esgotado";
    }

    if (quantidade <= 5) {
        return "baixo";
    }

    return "normal";

}


// ==========================================
// TEXTO DO STATUS
// ==========================================

function textoStatus(status) {

    if (status === "esgotado") {
        return "Esgotado";
    }

    if (status === "baixo") {
        return "Estoque baixo";
    }

    return "Normal";

}


// ==========================================
// LISTAR PRODUTOS
// ==========================================

function listarProdutos() {

    tabela.innerHTML = "";

    const busca = campoBusca.value.toLowerCase();

    const categoria = filtroCategoria.value;

    const statusFiltro = filtroStatus.value;


    const produtosFiltrados = estoque.filter(produto => {

        const correspondeBusca =
            produto.nome.toLowerCase().includes(busca) ||
            produto.codigo.toLowerCase().includes(busca);


        const correspondeCategoria =
            categoria === "todos" ||
            produto.categoria === categoria;


        const status = verificarStatus(produto.quantidade);

        const correspondeStatus =
            statusFiltro === "todos" ||
            status === statusFiltro;


        return (
            correspondeBusca &&
            correspondeCategoria &&
            correspondeStatus
        );

    });


    if (produtosFiltrados.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;padding:30px;">
                    Nenhum produto encontrado.
                </td>
            </tr>
        `;

        return;
    }


    produtosFiltrados.forEach(produto => {

        const status = verificarStatus(produto.quantidade);

        const tr = document.createElement("tr");


        tr.innerHTML = `

            <td>
                <strong>${produto.codigo}</strong>
            </td>

            <td>
                ${produto.nome}
            </td>

            <td>
                ${produto.categoria}
            </td>

            <td>
                ${produto.quantidade}
            </td>

            <td>
                ${formatarMoeda(produto.preco)}
            </td>

            <td>
                <span class="status ${status}">
                    ${textoStatus(status)}
                </span>
            </td>

            <td>

                <button
                    class="action-btn edit"
                    onclick="editarProduto(${produto.id})"
                    title="Editar"
                >
                    ✏️
                </button>

                <button
                    class="action-btn delete"
                    onclick="removerProduto(${produto.id})"
                    title="Excluir"
                >
                    🗑️
                </button>

            </td>
        `;


        tabela.appendChild(tr);

    });

}


// ==========================================
// CADASTRAR PRODUTO
// ==========================================

form.addEventListener("submit", function(event) {

    event.preventDefault();


    const codigo =
        document.getElementById("codigo").value.trim();

    const nome =
        document.getElementById("nome").value.trim();

    const categoria =
        document.getElementById("categoria").value.trim();

    const quantidade =
        Number(document.getElementById("quantidade").value);

    const preco =
        Number(document.getElementById("preco").value);


    if (
        !codigo ||
        !nome ||
        !categoria ||
        quantidade < 0 ||
        preco < 0
    ) {

        mostrarToast("Preencha todos os campos corretamente.");

        return;
    }


    const codigoExistente = estoque.some(
        produto => produto.codigo.toLowerCase() === codigo.toLowerCase()
    );


    if (codigoExistente) {

        mostrarToast("Esse código já está cadastrado.");

        return;
    }


    const novoProduto = {

        id: Date.now(),

        codigo: codigo,

        nome: nome,

        categoria: categoria,

        quantidade: quantidade,

        preco: preco

    };


    estoque.push(novoProduto);


    salvarEstoque();

    form.reset();

    atualizarSistema();

    mostrarToast("Produto cadastrado com sucesso!");


    window.location.hash = "produtos";

});


// ==========================================
// EXCLUIR PRODUTO
// ==========================================

function removerProduto(id) {

    const produto = estoque.find(
        item => item.id === id
    );


    if (!produto) {
        return;
    }


    const confirmar = confirm(
        `Deseja realmente excluir "${produto.nome}"?`
    );


    if (!confirmar) {
        return;
    }


    estoque = estoque.filter(
        item => item.id !== id
    );


    salvarEstoque();

    atualizarSistema();

    mostrarToast("Produto removido com sucesso.");

}


// ==========================================
// EDITAR PRODUTO
// ==========================================

function editarProduto(id) {

    const produto = estoque.find(
        item => item.id === id
    );


    if (!produto) {
        return;
    }


    const novoNome = prompt(
        "Nome do produto:",
        produto.nome
    );


    if (novoNome === null || novoNome.trim() === "") {
        return;
    }


    const novaCategoria = prompt(
        "Categoria:",
        produto.categoria
    );


    if (
        novaCategoria === null ||
        novaCategoria.trim() === ""
    ) {
        return;
    }


    const novaQuantidade = prompt(
        "Quantidade:",
        produto.quantidade
    );


    if (
        novaQuantidade === null ||
        Number(novaQuantidade) < 0
    ) {
        return;
    }


    const novoPreco = prompt(
        "Preço:",
        produto.preco
    );


    if (
        novoPreco === null ||
        Number(novoPreco) < 0
    ) {
        return;
    }


    produto.nome = novoNome.trim();

    produto.categoria = novaCategoria.trim();

    produto.quantidade = Number(novaQuantidade);

    produto.preco = Number(novoPreco);


    salvarEstoque();

    atualizarSistema();

    mostrarToast("Produto atualizado com sucesso.");

}


// ==========================================
// ATUALIZAR DASHBOARD
// ==========================================

function atualizarDashboard() {

    const totalProdutos = estoque.length;


    const totalItens = estoque.reduce(
        (total, produto) =>
            total + produto.quantidade,
        0
    );


    const produtosBaixos = estoque.filter(
        produto =>
            produto.quantidade > 0 &&
            produto.quantidade <= 5
    );


    const produtosEsgotados = estoque.filter(
        produto =>
            produto.quantidade === 0
    );


    const valorTotal = estoque.reduce(
        (total, produto) =>
            total +
            produto.quantidade *
            produto.preco,
        0
    );


    document.getElementById(
        "totalProdutos"
    ).textContent = totalProdutos;


    document.getElementById(
        "totalItens"
    ).textContent = totalItens;


    document.getElementById(
        "estoqueBaixo"
    ).textContent = produtosBaixos.length;


    document.getElementById(
        "valorEstoque"
    ).textContent = formatarMoeda(valorTotal);


    document.getElementById(
        "relatorioProdutos"
    ).textContent = totalProdutos;


    document.getElementById(
        "relatorioItens"
    ).textContent = totalItens;


    document.getElementById(
        "relatorioBaixo"
    ).textContent = produtosBaixos.length;


    document.getElementById(
        "relatorioEsgotado"
    ).textContent = produtosEsgotados.length;


    document.getElementById(
        "relatorioValor"
    ).textContent = formatarMoeda(valorTotal);

}


// ==========================================
// ATUALIZAR CATEGORIAS
// ==========================================

function atualizarCategorias() {

    const categoriaAtual =
        filtroCategoria.value;


    const categorias = [
        ...new Set(
            estoque.map(
                produto => produto.categoria
            )
        )
    ];


    filtroCategoria.innerHTML = `
        <option value="todos">
            Todas as categorias
        </option>
    `;


    categorias.forEach(categoria => {

        const option =
            document.createElement("option");

        option.value = categoria;

        option.textContent = categoria;

        filtroCategoria.appendChild(option);

    });


    if (
        categorias.includes(categoriaAtual)
    ) {

        filtroCategoria.value =
            categoriaAtual;

    }

}


// ==========================================
// PRODUTOS RECENTES
// ==========================================

function atualizarProdutosRecentes() {

    const container =
        document.getElementById(
            "produtosRecentes"
        );


    container.innerHTML = "";


    const recentes =
        [...estoque]
            .reverse()
            .slice(0, 5);


    if (recentes.length === 0) {

        container.innerHTML = `
            <p style="color:#6b7280;">
                Nenhum produto cadastrado.
            </p>
        `;

        return;
    }


    recentes.forEach(produto => {

        container.innerHTML += `

            <div class="recent-product">

                <div class="product-info">

                    <div class="product-icon">
                        📦
                    </div>

                    <div>

                        <strong>
                            ${produto.nome}
                        </strong>

                        <span>
                            ${produto.categoria}
                        </span>

                    </div>

                </div>

                <div class="product-price">

                    ${formatarMoeda(produto.preco)}

                </div>

            </div>

        `;

    });

}


// ==========================================
// ALERTAS
// ==========================================

function atualizarAlertas() {

    const container =
        document.getElementById("alertas");


    container.innerHTML = "";


    const esgotados = estoque.filter(
        produto =>
            produto.quantidade === 0
    );


    const baixos = estoque.filter(
        produto =>
            produto.quantidade > 0 &&
            produto.quantidade <= 5
    );


    if (
        esgotados.length === 0 &&
        baixos.length === 0
    ) {

        container.innerHTML = `
            <div class="alert success">
                ✓ Todos os produtos possuem
                estoque suficiente.
            </div>
        `;

        return;
    }


    esgotados.forEach(produto => {

        container.innerHTML += `

            <div class="alert danger">

                🔴 <strong>
                    ${produto.nome}
                </strong>
                está esgotado.

            </div>

        `;

    });


    baixos.forEach(produto => {

        container.innerHTML += `

            <div class="alert warning">

                ⚠️ <strong>
                    ${produto.nome}
                </strong>

                possui apenas
                ${produto.quantidade}
                unidade(s).

            </div>

        `;

    });

}


// ==========================================
// TOAST
// ==========================================

function mostrarToast(mensagem) {

    const toast =
        document.getElementById("toast");


    toast.textContent = mensagem;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


// ==========================================
// EVENTOS DE FILTRO
// ==========================================

campoBusca.addEventListener(
    "input",
    listarProdutos
);


filtroCategoria.addEventListener(
    "change",
    listarProdutos
);


filtroStatus.addEventListener(
    "change",
    listarProdutos
);


// ==========================================
// ATUALIZAR SISTEMA
// ==========================================

function atualizarSistema() {

    atualizarCategorias();

    listarProdutos();

    atualizarDashboard();

    atualizarProdutosRecentes();

    atualizarAlertas();

}


// ==========================================
// INICIALIZAÇÃO
// ==========================================

atualizarSistema();