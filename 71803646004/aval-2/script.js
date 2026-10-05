```javascript
/* =========================================
   STOCKPRO
   SISTEMA PROFISSIONAL DE ESTOQUE
========================================= */


/* =========================================
   DADOS
========================================= */

let produtos =
    JSON.parse(
        localStorage.getItem("stockProProdutos")
    ) || [];


/* =========================================
   ELEMENTOS
========================================= */

const formulario =
    document.getElementById("produtoForm");

const codigoInput =
    document.getElementById("codigo");

const nomeInput =
    document.getElementById("nome");

const categoriaInput =
    document.getElementById("categoria");

const quantidadeInput =
    document.getElementById("quantidade");

const precoInput =
    document.getElementById("preco");

const produtoIdInput =
    document.getElementById("produtoId");

const btnSalvar =
    document.getElementById("btnSalvar");

const listaProdutos =
    document.getElementById("listaProdutos");

const mensagemVazia =
    document.getElementById("mensagemVazia");

const buscar =
    document.getElementById("buscar");

const filtroCategoria =
    document.getElementById("filtroCategoria");

const filtroStatus =
    document.getElementById("filtroStatus");


/* =========================================
   INICIALIZAÇÃO
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        mostrarData();

        atualizarTudo();

        configurarMenu();

    }
);


/* =========================================
   DATA
========================================= */

function mostrarData() {

    const agora = new Date();

    const data =
        agora.toLocaleDateString(
            "pt-BR",
            {
                weekday: "long",
                day: "2-digit",
                month: "long"
            }
        );

    document.getElementById(
        "currentDate"
    ).textContent = data;

}


/* =========================================
   LOCAL STORAGE
========================================= */

function salvarDados() {

    localStorage.setItem(
        "stockProProdutos",
        JSON.stringify(produtos)
    );

}


/* =========================================
   MOEDA
========================================= */

function moeda(valor) {

    return Number(valor).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* =========================================
   STATUS
========================================= */

function obterStatus(quantidade) {

    if (quantidade === 0) {

        return {
            nome: "Esgotado",
            classe: "status-empty"
        };

    }

    if (quantidade <= 5) {

        return {
            nome: "Estoque baixo",
            classe: "status-low"
        };

    }

    return {
        nome: "Disponível",
        classe: "status-ok"
    };

}


/* =========================================
   ATUALIZAR TUDO
========================================= */

function atualizarTudo() {

    atualizarResumo();

    mostrarProdutosTabela();

    mostrarProdutosRecentes();

    mostrarAlertas();

}


/* =========================================
   RESUMO
========================================= */

function atualizarResumo() {

    const totalProdutos =
        produtos.length;

    const totalItens =
        produtos.reduce(
            (total, produto) =>
                total + Number(produto.quantidade),
            0
        );

    const baixo =
        produtos.filter(
            produto =>
                produto.quantidade > 0 &&
                produto.quantidade <= 5
        ).length;

    const valor =
        produtos.reduce(
            (total, produto) =>
                total +
                (
                    Number(produto.quantidade) *
                    Number(produto.preco)
                ),
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
    ).textContent = baixo;


    document.getElementById(
        "valorEstoque"
    ).textContent = moeda(valor);


    document.getElementById(
        "notificationCount"
    ).textContent =
        baixo;


    document.getElementById(
        "alertBadge"
    ).textContent =
        baixo;

}


/* =========================================
   FILTROS
========================================= */

function obterProdutosFiltrados() {

    const texto =
        buscar.value
            .toLowerCase()
            .trim();

    const categoria =
        filtroCategoria.value;

    const status =
        filtroStatus.value;


    return produtos.filter(
        produto => {

            const correspondeTexto =
                produto.nome
                    .toLowerCase()
                    .includes(texto) ||

                produto.codigo
                    .toLowerCase()
                    .includes(texto);


            const correspondeCategoria =
                categoria === "todos" ||
                produto.categoria === categoria;


            let correspondeStatus = true;


            if (status !== "todos") {

                if (
                    status === "disponivel"
                ) {

                    correspondeStatus =
                        produto.quantidade > 5;

                }

                if (
                    status === "baixo"
                ) {

                    correspondeStatus =
                        produto.quantidade > 0 &&
                        produto.quantidade <= 5;

                }

                if (
                    status === "esgotado"
                ) {

                    correspondeStatus =
                        produto.quantidade === 0;

                }

            }


            return (
                correspondeTexto &&
                correspondeCategoria &&
                correspondeStatus
            );

        }
    );

}


/* =========================================
   MOSTRAR TABELA
========================================= */

function mostrarProdutosTabela() {

    const lista =
        obterProdutosFiltrados();


    listaProdutos.innerHTML = "";


    if (lista.length === 0) {

        mensagemVazia.style.display =
            "block";

        return;

    }


    mensagemVazia.style.display =
        "none";


    lista.forEach(
        produto => {

            const status =
                obterStatus(
                    Number(produto.quantidade)
                );


            const valorTotal =
                Number(produto.quantidade) *
                Number(produto.preco);


            const tr =
                document.createElement("tr");


            tr.innerHTML = `

                <td>

                    <div class="product-cell">

                        <div class="product-cell-icon">
                            📦
                        </div>

                        <div>

                            <strong>
                                ${escaparHTML(produto.nome)}
                            </strong>

                            <span>
                                Produto cadastrado
                            </span>

                        </div>

                    </div>

                </td>


                <td>
                    ${escaparHTML(produto.codigo)}
                </td>


                <td>

                    <span class="category-tag">
                        ${escaparHTML(produto.categoria)}
                    </span>

                </td>


                <td>
                    <strong>
                        ${produto.quantidade}
                    </strong>
                </td>


                <td>
                    ${moeda(produto.preco)}
                </td>


                <td>
                    <strong>
                        ${moeda(valorTotal)}
                    </strong>
                </td>


                <td>

                    <span
                        class="status ${status.classe}"
                    >
                        ${status.nome}
                    </span>

                </td>


                <td>

                    <div class="action-buttons">

                        <button
                            class="action-button edit"
                            title="Editar"
                            onclick="editarProduto(${produto.id})"
                        >
                            ✏️
                        </button>


                        <button
                            class="action-button delete"
                            title="Excluir"
                            onclick="excluirProduto(${produto.id})"
                        >
                            🗑️
                        </button>

                    </div>

                </td>

            `;


            listaProdutos.appendChild(tr);

        }
    );

}


/* =========================================
   PRODUTOS RECENTES
========================================= */

function mostrarProdutosRecentes() {

    const container =
        document.getElementById(
            "produtosRecentes"
        );


    if (produtos.length === 0) {

        container.innerHTML = `
            <div class="no-alert">
                Nenhum produto cadastrado.
            </div>
        `;

        return;

    }


    const recentes =
        [...produtos]
            .reverse()
            .slice(0, 5);


    container.innerHTML = "";


    recentes.forEach(
        produto => {

            const div =
                document.createElement("div");

            div.className =
                "recent-product";


            div.innerHTML = `

                <div class="product-mini">

                    <div class="product-mini-icon">
                        📦
                    </div>

                    <div>

                        <strong>
                            ${escaparHTML(produto.nome)}
                        </strong>

                        <span>
                            ${escaparHTML(produto.categoria)}
                            · ${produto.quantidade} unidades
                        </span>

                    </div>

                </div>


                <div class="product-price">
                    ${moeda(produto.preco)}
                </div>

            `;


            container.appendChild(div);

        }
    );

}


/* =========================================
   ALERTAS
========================================= */

function mostrarAlertas() {

    const container =
        document.getElementById(
            "listaAlertas"
        );


    const alertas =
        produtos.filter(
            produto =>
                produto.quantidade <= 5
        );


    container.innerHTML = "";


    if (alertas.length === 0) {

        container.innerHTML = `
            <div class="no-alert">
                ✓ Nenhum produto precisa de atenção.
            </div>
        `;

        return;

    }


    alertas.forEach(
        produto => {

            const div =
                document.createElement("div");

            div.className =
                "alert-item";


            const mensagem =
                produto.quantidade === 0
                    ? "Produto esgotado"
                    : `${produto.quantidade} unidade(s) restante(s)`;


            div.innerHTML = `

                <div class="alert-icon">
                    ⚠
                </div>

                <div>

                    <strong>
                        ${escaparHTML(produto.nome)}
                    </strong>

                    <span>
                        ${mensagem}
                    </span>

                </div>

            `;


            container.appendChild(div);

        }
    );

}


/* =========================================
   CADASTRO
========================================= */

formulario.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const id =
            produtoIdInput.value;


        const codigo =
            codigoInput.value.trim();

        const nome =
            nomeInput.value.trim();

        const categoria =
            categoriaInput.value;

        const quantidade =
            Number(quantidadeInput.value);

        const preco =
            Number(precoInput.value);


        if (
            !codigo ||
            !nome ||
            !categoria ||
            quantidade < 0 ||
            preco < 0 ||
            isNaN(quantidade) ||
            isNaN(preco)
        ) {

            mostrarToast(
                "Atenção",
                "Preencha todos os campos corretamente.",
                "⚠"
            );

            return;

        }


        /* EDITAR */

        if (id) {

            const indice =
                produtos.findIndex(
                    produto =>
                        produto.id == id
                );


            if (indice !== -1) {

                const codigoDuplicado =
                    produtos.some(
                        produto =>
                            produto.id != id &&
                            produto.codigo
                                .toLowerCase() ===
                            codigo.toLowerCase()
                    );


                if (codigoDuplicado) {

                    mostrarToast(
                        "Código duplicado",
                        "Já existe outro produto com esse código.",
                        "⚠"
                    );

                    return;

                }


                produtos[indice] = {

                    id:
                        Number(id),

                    codigo,
                    nome,
                    categoria,
                    quantidade,
                    preco

                };


                mostrarToast(
                    "Produto atualizado",
                    "As informações foram atualizadas.",
                    "✓"
                );

            }

        }


        /* NOVO */

        else {

            const codigoExiste =
                produtos.some(
                    produto =>
                        produto.codigo
                            .toLowerCase() ===
                        codigo.toLowerCase()
                );


            if (codigoExiste) {

                mostrarToast(
                    "Código duplicado",
                    "Já existe um produto com esse código.",
                    "⚠"
                );

                return;

            }


            produtos.push({

                id:
                    Date.now(),

                codigo,
                nome,
                categoria,
                quantidade,
                preco

            });


            mostrarToast(
                "Produto cadastrado",
                `${nome} foi adicionado ao estoque.`,
                "✓"
            );

        }


        salvarDados();

        limparFormulario();

        atualizarTudo();

        mostrarProdutos();

    }
);


/* =========================================
   EDITAR
========================================= */

function editarProduto(id) {

    const produto =
        produtos.find(
            produto =>
                produto.id === id
        );


    if (!produto) return;


    produtoIdInput.value =
        produto.id;


    codigoInput.value =
        produto.codigo;


    nomeInput.value =
        produto.nome;


    categoriaInput.value =
        produto.categoria;


    quantidadeInput.value =
        produto.quantidade;


    precoInput.value =
        produto.preco;


    btnSalvar.innerHTML =
        "💾 Salvar alterações";


    document.getElementById(
        "tituloCadastro"
    ).textContent =
        "Editar produto";


    mostrarCadastro();

}


/* =========================================
   EXCLUIR
========================================= */

function excluirProduto(id) {

    const produto =
        produtos.find(
            produto =>
                produto.id === id
        );


    if (!produto) return;


    const confirmar =
        confirm(
            `Deseja excluir o produto "${produto.nome}"?`
        );


    if (!confirmar) return;


    produtos =
        produtos.filter(
            produto =>
                produto.id !== id
        );


    salvarDados();

    atualizarTudo();


    mostrarToast(
        "Produto excluído",
        "O produto foi removido do estoque.",
        "✓"
    );

}


/* =========================================
   LIMPAR FORMULÁRIO
========================================= */

function limparFormulario() {

    formulario.reset();

    produtoIdInput.value = "";

    btnSalvar.innerHTML =
        "＋ Adicionar produto";


    document.getElementById(
        "tituloCadastro"
    ).textContent =
        "Cadastrar produto";

}


/* =========================================
   NAVEGAÇÃO
========================================= */

function esconderSecoes() {

    document
        .querySelectorAll(".page-section")
        .forEach(
            secao =>
                secao.classList.add(
                    "hidden-section"
                )
        );

}


function mostrarDashboard() {

    esconderSecoes();

    document
        .getElementById("dashboard")
        .classList.remove(
            "hidden-section"
        );

    atualizarTitulo(
        "Dashboard"
    );

    atualizarMenu(
        "dashboard"
    );

}


function mostrarProdutos() {

    esconderSecoes();

    document
        .getElementById("produtos")
        .classList.remove(
            "hidden-section"
        );

    atualizarTitulo(
        "Produtos"
    );

    atualizarMenu(
        "produtos"
    );

    mostrarProdutosTabela();

}


function mostrarCadastro() {

    esconderSecoes();

    document
        .getElementById("cadastro")
        .classList.remove(
            "hidden-section"
        );

    atualizarTitulo(
        "Cadastrar produto"
    );

    atualizarMenu(
        "cadastro"
    );

}


function abrirCadastro() {

    limparFormulario();

    mostrarCadastro();

}


/* =========================================
   TÍTULO
========================================= */

function atualizarTitulo(titulo) {

    document.getElementById(
        "pageTitle"
    ).textContent =
        titulo;

}


/* =========================================
   MENU
========================================= */

function atualizarMenu(secao) {

    document
        .querySelectorAll(".menu-item")
        .forEach(
            item =>
                item.classList.remove(
                    "active"
                )
        );


    const item =
        document.querySelector(
            `.menu-item[href="#${secao}"]`
        );


    if (item) {

        item.classList.add(
            "active"
        );

    }


    document
        .getElementById("sidebar")
        .classList.remove(
            "open"
        );

}


/* =========================================
   LINKS DO MENU
========================================= */

document
    .querySelectorAll(".menu-item")
    .forEach(
        item => {

            item.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();


                    const destino =
                        this.getAttribute(
                            "href"
                        ).replace(
                            "#",
                            ""
                        );


                    if (
                        destino ===
                        "dashboard"
                    ) {

                        mostrarDashboard();

                    }

                    if (
                        destino ===
                        "produtos"
                    ) {

                        mostrarProdutos();

                    }

                    if (
                        destino ===
                        "cadastro"
                    ) {

                        abrirCadastro();

                    }

                }
            );

        }
    );


/* =========================================
   BUSCA E FILTROS
========================================= */

buscar.addEventListener(
    "input",
    mostrarProdutosTabela
);


filtroCategoria.addEventListener(
    "change",
    mostrarProdutosTabela
);


filtroStatus.addEventListener(
    "change",
    mostrarProdutosTabela
);


/* =========================================
   MENU MOBILE
========================================= */

function configurarMenu() {

    const mobileMenu =
        document.getElementById(
            "mobileMenu"
        );


    mobileMenu.addEventListener(
        "click",
        () => {

            document
                .getElementById("sidebar")
                .classList.toggle(
                    "open"
                );

        }
    );

}


/* =========================================
   TOAST
========================================= */

let toastTimeout;


function mostrarToast(
    titulo,
    mensagem,
    icone = "✓"
) {

    const toast =
        document.getElementById(
            "toast"
        );


    document.getElementById(
        "toastTitle"
    ).textContent =
        titulo;


    document.getElementById(
        "toastMessage"
    ).textContent =
        mensagem;


    document.getElementById(
        "toastIcon"
    ).textContent =
        icone;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimeout
    );


    toastTimeout =
        setTimeout(
            fecharToast,
            4000
        );

}


function fecharToast() {

    document
        .getElementById("toast")
        .classList.remove(
            "show"
        );

}


/* =========================================
   NOTIFICAÇÕES
========================================= */

document
    .getElementById(
        "notificationButton"
    )
    .addEventListener(
        "click",
        () => {

            const baixo =
                produtos.filter(
                    produto =>
                        produto.quantidade <= 5
                );


            if (baixo.length === 0) {

                mostrarToast(
                    "Tudo certo!",
                    "Não existem alertas no estoque.",
                    "✓"
                );

            } else {

                mostrarToast(
                    "Atenção",
                    `${baixo.length} produto(s) precisam de atenção.`,
                    "⚠"
                );

            }

        }
    );


/* =========================================
   ESCAPAR HTML
   Proteção contra conteúdo HTML
   inserido nos campos
========================================= */

function escaparHTML(texto) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        texto;

    return div.innerHTML;

}
```
