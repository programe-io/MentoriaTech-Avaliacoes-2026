// ================================
// DADOS
// ================================

let produtos = JSON.parse(localStorage.getItem("produtos")) || [
    {
        id: 1,
        nome: "Notebook Dell Inspiron",
        codigo: "NT-001",
        categoria: "Eletrônicos",
        quantidade: 12,
        estoqueMinimo: 5,
        preco: 3499.90,
        criadoEm: Date.now()
    },
    {
        id: 2,
        nome: "Mouse Logitech",
        codigo: "MS-002",
        categoria: "Periféricos",
        quantidade: 4,
        estoqueMinimo: 5,
        preco: 129.90,
        criadoEm: Date.now() - 1000
    },
    {
        id: 3,
        nome: "Teclado Mecânico",
        codigo: "TC-003",
        categoria: "Periféricos",
        quantidade: 18,
        estoqueMinimo: 5,
        preco: 299.90,
        criadoEm: Date.now() - 2000
    }
];

let movimentacoes =
    JSON.parse(localStorage.getItem("movimentacoes")) || [];

let tipoMovimentacao = "entrada";


// ================================
// LOCAL STORAGE
// ================================

function salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
    localStorage.setItem(
        "movimentacoes",
        JSON.stringify(movimentacoes)
    );
}


// ================================
// FORMATAÇÃO
// ================================

function moeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function escaparHTML(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}


// ================================
// DASHBOARD
// ================================

function atualizarDashboard() {

    const totalProdutos = produtos.length;

    const totalItens = produtos.reduce(
        (total, produto) => total + Number(produto.quantidade),
        0
    );

    const baixo = produtos.filter(
        produto => produto.quantidade <= produto.estoqueMinimo
    );

    const valor = produtos.reduce(
        (total, produto) =>
            total + produto.quantidade * produto.preco,
        0
    );

    document.getElementById("totalProdutos").textContent =
        totalProdutos;

    document.getElementById("totalItens").textContent =
        totalItens;

    document.getElementById("estoqueBaixo").textContent =
        baixo.length;

    document.getElementById("valorEstoque").textContent =
        moeda(valor);

    renderRecentes();
    renderEstoqueBaixo();
}


// ================================
// PRODUTOS RECENTES
// ================================

function renderRecentes() {

    const tbody = document.getElementById("recentesTable");

    const recentes = [...produtos]
        .sort((a, b) => b.criadoEm - a.criadoEm)
        .slice(0, 5);

    if (!recentes.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" class="empty">
                    Nenhum produto cadastrado.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = recentes.map(produto => `
        <tr>
            <td>
                <div class="product-name">
                    <div class="product-avatar">
                        ${produto.nome.charAt(0).toUpperCase()}
                    </div>

                    <strong>
                        ${escaparHTML(produto.nome)}
                    </strong>
                </div>
            </td>

            <td>${escaparHTML(produto.categoria)}</td>

            <td>
                <strong>${produto.quantidade}</strong>
            </td>

            <td>
                ${moeda(produto.preco)}
            </td>
        </tr>
    `).join("");
}


// ================================
// ESTOQUE BAIXO
// ================================

function renderEstoqueBaixo() {

    const container =
        document.getElementById("estoqueBaixoLista");

    const produtosBaixos = produtos.filter(
        produto => produto.quantidade <= produto.estoqueMinimo
    );

    if (!produtosBaixos.length) {
        container.innerHTML = `
            <div style="padding:25px;text-align:center;color:#7b8497">
                ✓ Nenhum produto com estoque baixo
            </div>
        `;

        return;
    }

    container.innerHTML = produtosBaixos.map(produto => `
        <div class="low-stock-item">

            <div class="low-stock-info">
                <div class="product-avatar">
                    ${produto.nome.charAt(0).toUpperCase()}
                </div>

                <div>
                    <strong>
                        ${escaparHTML(produto.nome)}
                    </strong>

                    <span>
                        Mínimo: ${produto.estoqueMinimo}
                    </span>
                </div>
            </div>

            <span class="badge badge-orange">
                ${produto.quantidade} un.
            </span>

        </div>
    `).join("");
}


// ================================
// LISTAGEM DE PRODUTOS
// ================================

function renderProdutos() {

    const tbody = document.getElementById("produtosTable");

    const busca =
        document.getElementById("searchInput").value
            .toLowerCase();

    const categoria =
        document.getElementById("categoriaFiltro").value;

    const filtrados = produtos.filter(produto => {

        const correspondeBusca =
            produto.nome.toLowerCase().includes(busca) ||
            produto.codigo.toLowerCase().includes(busca) ||
            produto.categoria.toLowerCase().includes(busca);

        const correspondeCategoria =
            !categoria ||
            produto.categoria === categoria;

        return correspondeBusca && correspondeCategoria;
    });

    document.getElementById("contadorProdutos").textContent =
        `${filtrados.length} produto${filtrados.length !== 1 ? "s" : ""}`;

    if (!filtrados.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;padding:35px;color:#7b8497">
                    Nenhum produto encontrado.
                </td>
            </tr>
        `;

        return;
    }

    tbody.innerHTML = filtrados.map(produto => {

        let status = "Em estoque";
        let classe = "badge-green";

        if (produto.quantidade === 0) {
            status = "Esgotado";
            classe = "badge-red";
        } else if (
            produto.quantidade <= produto.estoqueMinimo
        ) {
            status = "Estoque baixo";
            classe = "badge-orange";
        }

        return `
            <tr>

                <td>
                    <div class="product-name">
                        <div class="product-avatar">
                            ${produto.nome.charAt(0).toUpperCase()}
                        </div>

                        <strong>
                            ${escaparHTML(produto.nome)}
                        </strong>
                    </div>
                </td>

                <td>${escaparHTML(produto.codigo)}</td>

                <td>${escaparHTML(produto.categoria)}</td>

                <td>
                    <strong>${produto.quantidade}</strong>
                </td>

                <td>${moeda(produto.preco)}</td>

                <td>
                    <span class="badge ${classe}">
                        ${status}
                    </span>
                </td>

                <td>
                    <div class="action-buttons">

                        <button
                            class="action-btn"
                            title="Movimentar"
                            onclick="abrirMovimentacao(${produto.id})"
                        >
                            🔄
                        </button>

                        <button
                            class="action-btn"
                            title="Editar"
                            onclick="editarProduto(${produto.id})"
                        >
                            ✏️
                        </button>

                        <button
                            class="action-btn"
                            title="Excluir"
                            onclick="excluirProduto(${produto.id})"
                        >
                            🗑️
                        </button>

                    </div>
                </td>

            </tr>
        `;
    }).join("");
}


// ================================
// CATEGORIAS
// ================================

function atualizarCategorias() {

    const select =
        document.getElementById("categoriaFiltro");

    const categoriaAtual = select.value;

    const categorias = [
        ...new Set(produtos.map(produto => produto.categoria))
    ].sort();

    select.innerHTML =
        `<option value="">Todas as categorias</option>`;

    categorias.forEach(categoria => {

        const option = document.createElement("option");

        option.value = categoria;
        option.textContent = categoria;

        select.appendChild(option);
    });

    select.value = categoriaAtual;
}


// ================================
// MODAL PRODUTO
// ================================

function abrirModal() {

    document.getElementById("produtoForm").reset();

    document.getElementById("produtoId").value = "";

    document.getElementById("modalTitle").textContent =
        "Novo produto";

    document.getElementById("produtoModal")
        .classList.add("show");
}

function fecharModal() {

    document.getElementById("produtoModal")
        .classList.remove("show");
}


// ================================
// CADASTRAR / EDITAR
// ================================

document.getElementById("produtoForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const id =
            document.getElementById("produtoId").value;

        const dados = {

            nome:
                document.getElementById("nome").value.trim(),

            codigo:
                document.getElementById("codigo").value.trim(),

            categoria:
                document.getElementById("categoria").value.trim(),

            quantidade:
                Number(document.getElementById("quantidade").value),

            estoqueMinimo:
                Number(
                    document.getElementById("estoqueMinimo").value
                ),

            preco:
                Number(document.getElementById("preco").value)
        };


        if (id) {

            const produto =
                produtos.find(p => p.id == id);

            if (produto) {

                produto.nome = dados.nome;
                produto.codigo = dados.codigo;
                produto.categoria = dados.categoria;
                produto.quantidade = dados.quantidade;
                produto.estoqueMinimo = dados.estoqueMinimo;
                produto.preco = dados.preco;
            }

            mostrarToast("Produto atualizado!");

        } else {

            produtos.push({
                id: Date.now(),
                ...dados,
                criadoEm: Date.now()
            });

            mostrarToast("Produto cadastrado!");
        }

        salvarDados();
        atualizarTudo();
        fecharModal();
    });


// ================================
// EDITAR
// ================================

function editarProduto(id) {

    const produto =
        produtos.find(p => p.id === id);

    if (!produto) return;

    document.getElementById("produtoId").value =
        produto.id;

    document.getElementById("nome").value =
        produto.nome;

    document.getElementById("codigo").value =
        produto.codigo;

    document.getElementById("categoria").value =
        produto.categoria;

    document.getElementById("quantidade").value =
        produto.quantidade;

    document.getElementById("estoqueMinimo").value =
        produto.estoqueMinimo;

    document.getElementById("preco").value =
        produto.preco;

    document.getElementById("modalTitle").textContent =
        "Editar produto";

    document.getElementById("produtoModal")
        .classList.add("show");
}


// ================================
// EXCLUIR
// ================================

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
        produtos.filter(p => p.id !== id);

    salvarDados();
    atualizarTudo();

    mostrarToast("Produto excluído!");
}


// ================================
// MOVIMENTAÇÃO
// ================================

function abrirMovimentacao(id) {

    const produto =
        produtos.find(p => p.id === id);

    if (!produto) return;

    document.getElementById("movProdutoId").value =
        produto.id;

    document.getElementById("produtoSelecionado").innerHTML =
        `📦 ${escaparHTML(produto.nome)}
         <br>
         <small style="color:#7b8497">
            Estoque atual: ${produto.quantidade} unidades
         </small>`;

    document.getElementById("quantidadeMov").value = "";

    selecionarTipo("entrada");

    document.getElementById("movimentacaoModal")
        .classList.add("show");
}

function fecharMovimentacao() {

    document.getElementById("movimentacaoModal")
        .classList.remove("show");
}


function selecionarTipo(tipo) {

    tipoMovimentacao = tipo;

    document.getElementById("tipoMovimentacao").value =
        tipo;

    document.getElementById("btnEntrada")
        .classList.toggle(
            "active",
            tipo === "entrada"
        );

    document.getElementById("btnSaida")
        .classList.toggle(
            "active",
            tipo === "saida"
        );
}


// ================================
// SALVAR MOVIMENTAÇÃO
// ================================

document.getElementById("movimentacaoForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const id =
            Number(
                document.getElementById("movProdutoId").value
            );

        const quantidade =
            Number(
                document.getElementById("quantidadeMov").value
            );

        const produto =
            produtos.find(p => p.id === id);

        if (!produto || quantidade <= 0) return;


        if (
            tipoMovimentacao === "saida" &&
            quantidade > produto.quantidade
        ) {

            mostrarToast(
                "Quantidade maior que o estoque disponível."
            );

            return;
        }


        if (tipoMovimentacao === "entrada") {

            produto.quantidade += quantidade;

        } else {

            produto.quantidade -= quantidade;
        }


        movimentacoes.unshift({

            id: Date.now(),

            produtoId: produto.id,

            produto: produto.nome,

            tipo: tipoMovimentacao,

            quantidade,

            estoqueAtual: produto.quantidade,

            data: new Date().toLocaleString("pt-BR")
        });


        salvarDados();
        atualizarTudo();
        renderMovimentacoes();
        fecharMovimentacao();

        mostrarToast(
            tipoMovimentacao === "entrada"
                ? "Entrada registrada!"
                : "Saída registrada!"
        );
    });


// ================================
// MOVIMENTAÇÕES
// ================================

function renderMovimentacoes() {

    const tbody =
        document.getElementById("movimentacoesTable");

    if (!movimentacoes.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="5"
                    style="text-align:center;padding:35px;color:#7b8497">
                    Nenhuma movimentação registrada.
                </td>
            </tr>
        `;

        return;
    }

    tbody.innerHTML =
        movimentacoes.slice(0, 100).map(mov => {

            const entrada =
                mov.tipo === "entrada";

            return `
                <tr>

                    <td>${mov.data}</td>

                    <td>
                        <strong>
                            ${escaparHTML(mov.produto)}
                        </strong>
                    </td>

                    <td>
                        <span class="badge ${
                            entrada
                                ? "badge-green"
                                : "badge-red"
                        }">
                            ${
                                entrada
                                    ? "📥 Entrada"
                                    : "📤 Saída"
                            }
                        </span>
                    </td>

                    <td>
                        ${entrada ? "+" : "-"}${mov.quantidade}
                    </td>

                    <td>
                        ${mov.estoqueAtual}
                    </td>

                </tr>
            `;
        }).join("");
}


// ================================
// NAVEGAÇÃO
// ================================

document.querySelectorAll(".nav-item")
    .forEach(button => {

        button.addEventListener("click", () => {

            const section =
                button.dataset.section;

            mudarSecao(section);
        });
    });


function mudarSecao(section) {

    document.querySelectorAll(".nav-item")
        .forEach(btn => {
            btn.classList.toggle(
                "active",
                btn.dataset.section === section
            );
        });

    document.querySelectorAll(".section")
        .forEach(sec => {
            sec.classList.toggle(
                "active",
                sec.id === section
            );
        });


    const titulos = {

        dashboard: [
            "Dashboard",
            "Visão geral do seu estoque"
        ],

        produtos: [
            "Produtos",
            "Gerencie os produtos cadastrados"
        ],

        movimentacoes: [
            "Movimentações",
            "Histórico de entradas e saídas"
        ]
    };


    document.getElementById("page-title").textContent =
        titulos[section][0];

    document.getElementById("page-subtitle").textContent =
        titulos[section][1];
}


function abrirProdutos() {
    mudarSecao("produtos");
}


// ================================
// BUSCA
// ================================

document.getElementById("searchInput")
    .addEventListener("input", renderProdutos);

document.getElementById("categoriaFiltro")
    .addEventListener("change", renderProdutos);


// ================================
// TOAST
// ================================

function mostrarToast(mensagem) {

    const toast =
        document.getElementById("toast");

    toast.textContent = mensagem;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}


// ================================
// ATUALIZAR TUDO
// ================================

function atualizarTudo() {

    atualizarDashboard();
    atualizarCategorias();
    renderProdutos();
    renderMovimentacoes();
}


// ================================
// BOTÃO NOVO PRODUTO
// ================================

document.getElementById("btnNovoProduto")
    .addEventListener("click", abrirModal);


// ================================
// FECHAR MODAIS CLICANDO FORA
// ================================

document.getElementById("produtoModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {
            fecharModal();
        }
    });

document.getElementById("movimentacaoModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {
            fecharMovimentacao();
        }
    });


// ================================
// INICIALIZAÇÃO
// ================================

atualizarTudo();
