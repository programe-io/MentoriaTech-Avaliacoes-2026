/* =====================================================
   SISTEMA DE ESTOQUE - STOCKPRO
   ===================================================== */


/* ================= DADOS ================= */

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

let movimentacoes =
    JSON.parse(localStorage.getItem("movimentacoes")) || [];


/* ================= ELEMENTOS ================= */

const modalProduto = document.getElementById("modalProduto");
const modalMovimentacao =
    document.getElementById("modalMovimentacao");

const formProduto =
    document.getElementById("formProduto");

const formMovimentacao =
    document.getElementById("formMovimentacao");


/* ================= NAVEGAÇÃO ================= */

const menuItems =
    document.querySelectorAll(".menu-item");

const sections =
    document.querySelectorAll(".section");


menuItems.forEach(item => {

    item.addEventListener("click", () => {

        const sectionId = item.dataset.section;

        menuItems.forEach(btn =>
            btn.classList.remove("active")
        );

        item.classList.add("active");

        sections.forEach(section =>
            section.classList.remove("active")
        );

        document
            .getElementById(sectionId)
            .classList.add("active");

        atualizarCabecalho(sectionId);

        if (sectionId === "produtos") {
            renderProdutos();
        }

        if (sectionId === "movimentacoes") {
            renderMovimentacoes();
        }

    });

});


function atualizarCabecalho(section) {

    const titulo =
        document.getElementById("pageTitle");

    const subtitulo =
        document.getElementById("pageSubtitle");

    if (section === "dashboard") {

        titulo.textContent = "Dashboard";

        subtitulo.textContent =
            "Visão geral do seu estoque";

    }

    if (section === "produtos") {

        titulo.textContent = "Produtos";

        subtitulo.textContent =
            "Gerencie os produtos do seu estoque";

    }

    if (section === "movimentacoes") {

        titulo.textContent = "Movimentações";

        subtitulo.textContent =
            "Histórico de entradas e saídas";

    }

}


/* ================= SALVAR DADOS ================= */

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


/* ================= FORMATAÇÕES ================= */

function moeda(valor) {

    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


function dataAtual() {

    return new Date().toLocaleString("pt-BR");

}


/* ================= STATUS ================= */

function getStatus(produto) {

    if (produto.quantidade <= 0) {

        return {
            classe: "zerado",
            texto: "Sem estoque"
        };

    }

    if (produto.quantidade <= produto.estoqueMinimo) {

        return {
            classe: "baixo",
            texto: "Estoque baixo"
        };

    }

    return {
        classe: "normal",
        texto: "Normal"
    };

}


/* ================= DASHBOARD ================= */

function atualizarDashboard() {

    const totalProdutos =
        produtos.length;

    const totalItens =
        produtos.reduce(
            (total, produto) =>
                total + Number(produto.quantidade),
            0
        );

    const produtosBaixos =
        produtos.filter(produto =>
            produto.quantidade <= produto.estoqueMinimo
        ).length;

    const valorEstoque =
        produtos.reduce(
            (total, produto) =>
                total +
                Number(produto.quantidade) *
                Number(produto.precoCusto),
            0
        );


    document.getElementById("totalProdutos")
        .textContent = totalProdutos;

    document.getElementById("totalItens")
        .textContent = totalItens;

    document.getElementById("estoqueBaixo")
        .textContent = produtosBaixos;

    document.getElementById("valorEstoque")
        .textContent = moeda(valorEstoque);


    renderRecentes();

    renderAlertas();

    atualizarCategorias();

}


/* ================= PRODUTOS RECENTES ================= */

function renderRecentes() {

    const tabela =
        document.getElementById("tabelaRecentes");

    const recentes =
        [...produtos]
            .reverse()
            .slice(0, 5);


    if (recentes.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="4" class="empty">
                    Nenhum produto cadastrado.
                </td>
            </tr>
        `;

        return;
    }


    tabela.innerHTML = recentes.map(produto => {

        const status =
            getStatus(produto);

        return `
            <tr>

                <td>
                    <div class="product-name">
                        ${produto.nome}
                    </div>

                    <div class="product-code">
                        ${produto.codigo}
                    </div>
                </td>

                <td>${produto.categoria}</td>

                <td>${produto.quantidade}</td>

                <td>
                    <span class="status ${status.classe}">
                        ${status.texto}
                    </span>
                </td>

            </tr>
        `;

    }).join("");

}


/* ================= ALERTAS ================= */

function renderAlertas() {

    const container =
        document.getElementById("listaAlertas");


    const alertas =
        produtos.filter(produto =>
            produto.quantidade <= produto.estoqueMinimo
        );


    if (alertas.length === 0) {

        container.innerHTML = `
            <div class="empty">
                ✅ Nenhum alerta de estoque.
            </div>
        `;

        return;
    }


    container.innerHTML =
        alertas.map(produto => {

            const zerado =
                produto.quantidade <= 0;

            return `
                <div class="alert">

                    <strong>
                        ${zerado ? "🚨" : "⚠️"}
                        ${produto.nome}
                    </strong>

                    <span>
                        ${zerado
                            ? "Produto sem estoque."
                            : `Apenas ${produto.quantidade} unidade(s) em estoque.`}
                    </span>

                </div>
            `;

        }).join("");

}


/* ================= MODAL PRODUTO ================= */

document
    .getElementById("btnNovoProduto")
    .addEventListener("click", abrirNovoProduto);


function abrirNovoProduto() {

    formProduto.reset();

    document.getElementById("produtoId").value = "";

    document.getElementById("modalTitulo")
        .textContent = "Novo produto";

    document.getElementById("quantidade")
        .value = 0;

    document.getElementById("estoqueMinimo")
        .value = 5;

    document.getElementById("precoCusto")
        .value = 0;

    document.getElementById("precoVenda")
        .value = 0;

    modalProduto.classList.add("active");

}


/* ================= FECHAR MODAL ================= */

function fecharModalProduto() {

    modalProduto.classList.remove("active");

}


document
    .getElementById("fecharModal")
    .addEventListener("click", fecharModalProduto);

document
    .getElementById("cancelarModal")
    .addEventListener("click", fecharModalProduto);


/* ================= CADASTRAR / EDITAR ================= */

formProduto.addEventListener("submit", function(event) {

    event.preventDefault();


    const id =
        document.getElementById("produtoId").value;


    const produto = {

        id: id || Date.now().toString(),

        codigo:
            document.getElementById("codigo")
                .value
                .trim(),

        nome:
            document.getElementById("nome")
                .value
                .trim(),

        categoria:
            document.getElementById("categoria")
                .value
                .trim(),

        quantidade:
            Number(
                document.getElementById("quantidade")
                    .value
            ),

        estoqueMinimo:
            Number(
                document.getElementById("estoqueMinimo")
                    .value
            ),

        precoCusto:
            Number(
                document.getElementById("precoCusto")
                    .value
            ),

        precoVenda:
            Number(
                document.getElementById("precoVenda")
                    .value
            ),

        criadoEm:
            new Date().toISOString()

    };


    /* EDITAR */

    if (id) {

        const index =
            produtos.findIndex(
                p => p.id === id
            );

        if (index !== -1) {

            const quantidadeAnterior =
                produtos[index].quantidade;

            produtos[index] = produto;


            /* registra alteração de estoque */

            if (
                quantidadeAnterior !==
                produto.quantidade
            ) {

                const diferenca =
                    produto.quantidade -
                    quantidadeAnterior;

                movimentacoes.unshift({

                    id: Date.now().toString(),

                    produtoId: produto.id,

                    produtoNome: produto.nome,

                    tipo:
                        diferenca > 0
                            ? "entrada"
                            : "saida",

                    quantidade:
                        Math.abs(diferenca),

                    estoqueAtual:
                        produto.quantidade,

                    data:
                        dataAtual()

                });

            }

        }

    }

    /* NOVO */

    else {

        produtos.push(produto);

    }


    salvarDados();

    fecharModalProduto();

    atualizarTudo();

});


/* ================= EDITAR PRODUTO ================= */

function editarProduto(id) {

    const produto =
        produtos.find(p => p.id === id);

    if (!produto) return;


    document.getElementById("produtoId")
        .value = produto.id;

    document.getElementById("codigo")
        .value = produto.codigo;

    document.getElementById("nome")
        .value = produto.nome;

    document.getElementById("categoria")
        .value = produto.categoria;

    document.getElementById("quantidade")
        .value = produto.quantidade;

    document.getElementById("estoqueMinimo")
        .value = produto.estoqueMinimo;

    document.getElementById("precoCusto")
        .value = produto.precoCusto;

    document.getElementById("precoVenda")
        .value = produto.precoVenda;


    document.getElementById("modalTitulo")
        .textContent = "Editar produto";


    modalProduto.classList.add("active");

}


/* ================= EXCLUIR PRODUTO ================= */

function excluirProduto(id) {

    const produto =
        produtos.find(p => p.id === id);

    if (!produto) return;


    const confirmar =
        confirm(
            `Deseja realmente excluir "${produto.nome}"?`
        );


    if (!confirmar) return;


    produtos =
        produtos.filter(
            produto => produto.id !== id
        );


    salvarDados();

    atualizarTudo();

}


/* ================= RENDER PRODUTOS ================= */

function renderProdutos() {

    const tabela =
        document.getElementById("tabelaProdutos");


    const busca =
        document.getElementById("buscarProduto")
            .value
            .toLowerCase();

    const categoria =
        document.getElementById("filtroCategoria")
            .value;

    const filtroStatus =
        document.getElementById("filtroStatus")
            .value;


    let lista =
        produtos.filter(produto => {

            const correspondeBusca =
                produto.nome
                    .toLowerCase()
                    .includes(busca) ||

                produto.codigo
                    .toLowerCase()
                    .includes(busca);


            const correspondeCategoria =
                !categoria ||
                produto.categoria === categoria;


            const status =
                getStatus(produto);

            const correspondeStatus =
                !filtroStatus ||
                status.classe === filtroStatus;


            return (
                correspondeBusca &&
                correspondeCategoria &&
                correspondeStatus
            );

        });


    document.getElementById("contadorProdutos")
        .textContent =
        `${lista.length} produto(s)`;


    if (lista.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="7" class="empty">
                    Nenhum produto encontrado.
                </td>
            </tr>
        `;

        return;
    }


    tabela.innerHTML =
        lista.map(produto => {

            const status =
                getStatus(produto);


            return `
                <tr>

                    <td>
                        <strong>
                            ${produto.codigo}
                        </strong>
                    </td>

                    <td>
                        <div class="product-name">
                            ${produto.nome}
                        </div>
                    </td>

                    <td>
                        ${produto.categoria}
                    </td>

                    <td>
                        <strong>
                            ${produto.quantidade}
                        </strong>
                    </td>

                    <td>
                        ${moeda(produto.precoVenda)}
                    </td>

                    <td>
                        <span class="status ${status.classe}">
                            ${status.texto}
                        </span>
                    </td>

                    <td>

                        <div class="actions">

                            <button
                                class="action-btn"
                                onclick="abrirMovimentacao('${produto.id}')"
                                title="Movimentar"
                            >
                                🔄
                            </button>

                            <button
                                class="action-btn"
                                onclick="editarProduto('${produto.id}')"
                                title="Editar"
                            >
                                ✏️
                            </button>

                            <button
                                class="action-btn delete"
                                onclick="excluirProduto('${produto.id}')"
                                title="Excluir"
                            >
                                🗑️
                            </button>

                        </div>

                    </td>

                </tr>
            `;

        }).join("");

}


/* ================= FILTROS ================= */

document
    .getElementById("buscarProduto")
    .addEventListener(
        "input",
        renderProdutos
    );


document
    .getElementById("filtroCategoria")
    .addEventListener(
        "change",
        renderProdutos
    );


document
    .getElementById("filtroStatus")
    .addEventListener(
        "change",
        renderProdutos
    );


function atualizarCategorias() {

    const select =
        document.getElementById("filtroCategoria");


    const categoriaAtual =
        select.value;


    const categorias =
        [...new Set(
            produtos.map(
                produto => produto.categoria
            )
        )].sort();


    select.innerHTML =
        `<option value="">
            Todas as categorias
        </option>`;


    categorias.forEach(categoria => {

        select.innerHTML += `
            <option value="${categoria}">
                ${categoria}
            </option>
        `;

    });


    select.value = categoriaAtual;

}


/* ================= MOVIMENTAÇÃO ================= */

let tipoMovimentacao = "entrada";


function abrirMovimentacao(id) {

    const produto =
        produtos.find(
            produto => produto.id === id
        );

    if (!produto) return;


    document.getElementById("movProdutoId")
        .value = id;


    document.getElementById("produtoMovimentacao")
        .textContent =
        `${produto.nome} — estoque atual: ${produto.quantidade}`;


    document.getElementById("movQuantidade")
        .value = 1;


    tipoMovimentacao = "entrada";


    document
        .querySelectorAll(".mov-btn")
        .forEach(btn =>
            btn.classList.remove("active")
        );


    document
        .querySelector('.mov-btn[data-tipo="entrada"]')
        .classList.add("active");


    modalMovimentacao
        .classList.add("active");

}


/* ================= TIPO MOVIMENTAÇÃO ================= */

document
    .querySelectorAll(".mov-btn")
    .forEach(btn => {

        btn.addEventListener("click", () => {

            tipoMovimentacao =
                btn.dataset.tipo;


            document
                .querySelectorAll(".mov-btn")
                .forEach(button =>
                    button.classList.remove("active")
                );


            btn.classList.add("active");

        });

    });


/* ================= CONFIRMAR MOVIMENTAÇÃO ================= */

formMovimentacao.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const id =
            document.getElementById("movProdutoId")
                .value;


        const quantidade =
            Number(
                document.getElementById("movQuantidade")
                    .value
            );


        const produto =
            produtos.find(
                produto => produto.id === id
            );


        if (!produto) return;


        if (quantidade <= 0) {

            alert(
                "Informe uma quantidade válida."
            );

            return;

        }


        /* SAÍDA */

        if (tipoMovimentacao === "saida") {

            if (
                quantidade >
                produto.quantidade
            ) {

                alert(
                    "Quantidade de saída maior que o estoque disponível."
                );

                return;

            }


            produto.quantidade -= quantidade;

        }


        /* ENTRADA */