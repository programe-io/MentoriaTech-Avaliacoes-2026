// =========================
// DADOS
// =========================

let produtos =
    JSON.parse(localStorage.getItem("produtos")) || [];

let movimentacoes =
    JSON.parse(localStorage.getItem("movimentacoes")) || [];


// =========================
// NAVEGAÇÃO
// =========================

function mostrarPagina(pagina) {

    document.querySelectorAll(".pagina").forEach(secao => {
        secao.classList.add("escondido");
    });

    const paginaSelecionada =
        document.getElementById(pagina);

    if (paginaSelecionada) {
        paginaSelecionada.classList.remove("escondido");
    }

    // Atualiza os dados da página selecionada
    if (pagina === "dashboard") {
        atualizarDashboard();
    }

    if (pagina === "produtos") {
        listarProdutos();
    }

    if (pagina === "movimentacoes") {
        listarMovimentacoes();
    }
}


// =========================
// MODAL
// =========================

function abrirModal(id = null) {

    const modal = document.getElementById("modal");

    modal.classList.remove("escondido");

    // NOVO PRODUTO
    if (id === null) {

        document.getElementById("tituloModal").textContent =
            "Novo Produto";

        document.getElementById("formProduto").reset();

        document.getElementById("produtoId").value = "";

        return;
    }

    // EDITAR PRODUTO

    const produto = produtos.find(
        p => p.id === id
    );

    if (!produto) return;

    document.getElementById("tituloModal").textContent =
        "Editar Produto";

    document.getElementById("produtoId").value =
        produto.id;

    document.getElementById("nome").value =
        produto.nome;

    document.getElementById("categoria").value =
        produto.categoria;

    document.getElementById("preco").value =
        produto.preco;

    document.getElementById("quantidade").value =
        produto.quantidade;

    document.getElementById("minimo").value =
        produto.minimo;
}


function fecharModal() {

    document
        .getElementById("modal")
        .classList.add("escondido");
}


// =========================
// FORMULÁRIO DE PRODUTO
// =========================

document
    .getElementById("formProduto")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const id =
            document.getElementById("produtoId").value;

        const nome =
            document.getElementById("nome").value.trim();

        const categoria =
            document.getElementById("categoria").value.trim();

        const preco =
            Number(document.getElementById("preco").value);

        const quantidade =
            Number(document.getElementById("quantidade").value);

        const minimo =
            Number(document.getElementById("minimo").value);


        // =========================
        // EDITAR PRODUTO
        // =========================

        if (id) {

            const produto =
                produtos.find(p => p.id == id);

            if (!produto) return;

            produto.nome = nome;
            produto.categoria = categoria;
            produto.preco = preco;
            produto.quantidade = quantidade;
            produto.minimo = minimo;

        }

        // =========================
        // NOVO PRODUTO
        // =========================

        else {

            const novoProduto = {

                id: Date.now(),

                nome,

                categoria,

                preco,

                quantidade,

                minimo
            };

            produtos.push(novoProduto);

            // Registra entrada inicial
            registrarMovimentacao(
                novoProduto.nome,
                "Entrada",
                quantidade
            );
        }


        // Salva os dados

        salvarDados();

        // Fecha o modal

        fecharModal();

        // Atualiza tudo

        atualizarSistema();
    });


// =========================
// LISTAR PRODUTOS
// =========================

function listarProdutos() {

    const tabela =
        document.getElementById("tabelaProdutos");

    const campoPesquisa =
        document.getElementById("pesquisa");

    const pesquisa =
        campoPesquisa
            ? campoPesquisa.value.toLowerCase().trim()
            : "";

    tabela.innerHTML = "";


    // Filtra os produtos

    const lista = produtos.filter(produto =>

        produto.nome
            .toLowerCase()
            .includes(pesquisa)

        ||

        produto.categoria
            .toLowerCase()
            .includes(pesquisa)
    );


    // Nenhum produto

    if (lista.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center">
                    Nenhum produto encontrado.
                </td>
            </tr>
        `;

        return;
    }


    // Mostra os produtos

    lista.forEach(produto => {

        const estoqueBaixo =
            Number(produto.quantidade) <=
            Number(produto.minimo);


        const linha =
            document.createElement("tr");


        linha.innerHTML = `

            <td>
                ${produto.nome}
            </td>

            <td>
                ${produto.categoria}
            </td>

            <td>
                ${formatarMoeda(produto.preco)}
            </td>

            <td>
                ${produto.quantidade}
            </td>

            <td>
                ${produto.minimo}
            </td>

            <td>

                <span class="status ${estoqueBaixo ? "baixo" : "ok"}">

                    ${estoqueBaixo
                        ? "Estoque baixo"
                        : "Normal"}

                </span>

            </td>

            <td>

                <button
                    class="btn-editar"
                    onclick="abrirModal(${produto.id})">

                    Editar

                </button>

                <button
                    class="btn-excluir"
                    onclick="excluirProduto(${produto.id})">

                    Excluir

                </button>

            </td>
        `;


        tabela.appendChild(linha);
    });
}


// =========================
// EXCLUIR PRODUTO
// =========================

function excluirProduto(id) {

    const produto =
        produtos.find(p => p.id === id);

    if (!produto) return;


    const confirmar =
        confirm(
            `Deseja excluir o produto "${produto.nome}"?`
        );


    if (!confirmar) return;


    produtos =
        produtos.filter(p => p.id !== id);


    salvarDados();

    atualizarSistema();
}


// =========================
// MOVIMENTAÇÕES
// =========================

function registrarMovimentacao(
    produto,
    tipo,
    quantidade
) {

    movimentacoes.unshift({

        id: Date.now(),

        data:
            new Date().toLocaleString("pt-BR"),

        produto,

        tipo,

        quantidade
    });


    salvarDados();
}


// =========================
// LISTAR MOVIMENTAÇÕES
// =========================

function listarMovimentacoes() {

    const tabela =
        document.getElementById(
            "tabelaMovimentacoes"
        );

    tabela.innerHTML = "";


    // Nenhuma movimentação

    if (movimentacoes.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center">
                    Nenhuma movimentação registrada.
                </td>
            </tr>
        `;

        return;
    }


    // Lista as movimentações

    movimentacoes.forEach(mov => {

        const linha =
            document.createElement("tr");


        linha.innerHTML = `

            <td>
                ${mov.data}
            </td>

            <td>
                ${mov.produto}
            </td>

            <td>
                ${mov.tipo}
            </td>

            <td>
                ${mov.quantidade}
            </td>

        `;


        tabela.appendChild(linha);
    });
}


// =========================
// DASHBOARD
// =========================

function atualizarDashboard() {


    // Total de produtos

    const totalProdutos =
        produtos.length;


    // Total de itens

    const totalEstoque =
        produtos.reduce(

            (total, produto) =>

                total +
                Number(produto.quantidade),

            0
        );


    // Produtos com estoque baixo

    const produtosBaixos =
        produtos.filter(

            produto =>

                Number(produto.quantidade) <=
                Number(produto.minimo)
        );


    // Valor total do estoque

    const valorEstoque =
        produtos.reduce(

            (total, produto) =>

                total +

                Number(produto.preco) *
                Number(produto.quantidade),

            0
        );


    // Atualiza os cards

    document.getElementById(
        "totalProdutos"
    ).textContent =
        totalProdutos;


    document.getElementById(
        "totalEstoque"
    ).textContent =
        totalEstoque;


    document.getElementById(
        "estoqueBaixo"
    ).textContent =
        produtosBaixos.length;


    document.getElementById(
        "valorEstoque"
    ).textContent =
        formatarMoeda(valorEstoque);


    // =========================
    // TABELA DE ESTOQUE BAIXO
    // =========================

    const tabela =
        document.getElementById(
            "tabelaBaixoEstoque"
        );


    tabela.innerHTML = "";


    // Nenhum produto com estoque baixo

    if (produtosBaixos.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center">
                    Nenhum produto com estoque baixo.
                </td>
            </tr>
        `;

        return;
    }


    // Lista produtos com estoque baixo

    produtosBaixos.forEach(produto => {

        const linha =
            document.createElement("tr");


        linha.innerHTML = `

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
                ${produto.minimo}
            </td>

        `;


        tabela.appendChild(linha);
    });
}


// =========================
// FORMATAR MOEDA
// =========================

function formatarMoeda(valor) {

    return Number(valor).toLocaleString(

        "pt-BR",

        {
            style: "currency",

            currency: "BRL"
        }
    );
}


// =========================
// SALVAR DADOS
// =========================

function salvarDados() {

    localStorage.setItem(

        "produtos",

        JSON.stringify(produtos)
    );


    localStorage.setItem(

        "movimentacoes",

        JSON.stringify(movimentacoes)
    );
}


// =========================
// ATUALIZAR SISTEMA
// =========================

function atualizarSistema() {

    listarProdutos();

    listarMovimentacoes();

    atualizarDashboard();
}


// =========================
// INICIALIZAÇÃO
// =========================

// Mostra o Dashboard ao abrir

mostrarPagina("dashboard");

// Atualiza todos os dados

atualizarSistema();