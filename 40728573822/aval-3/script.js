/* =====================================================
   SISTEMA DE ESTOQUE - STOCKPRO
===================================================== */


/* =====================================================
   VARIÁVEIS
===================================================== */

let produtos = JSON.parse(
    localStorage.getItem("stockpro_produtos")
) || [];

let tipoEdicao = "valor";


/* =====================================================
   ELEMENTOS
===================================================== */

const form = document.getElementById("produtoForm");

const tabela = document.getElementById("tabelaProdutos");

const emptyState = document.getElementById("emptyState");

const pesquisa = document.getElementById("pesquisa");

const modal = document.getElementById("modal");

const produtoId = document.getElementById("produtoId");

const novoValor = document.getElementById("novoValor");

const editLabel = document.getElementById("editLabel");

const editIcon = document.getElementById("editIcon");

const btnValor = document.getElementById("btnValor");

const btnQuantidade = document.getElementById("btnQuantidade");


/* =====================================================
   FORMATADORES
===================================================== */

function formatarMoeda(valor) {

    return Number(valor).toLocaleString("pt-BR", {

        style: "currency",

        currency: "BRL"

    });

}


function escaparHTML(texto) {

    const div = document.createElement("div");

    div.textContent = texto;

    return div.innerHTML;

}


/* =====================================================
   SALVAR NO LOCAL STORAGE
===================================================== */

function salvarProdutos() {

    localStorage.setItem(
        "stockpro_produtos",
        JSON.stringify(produtos)
    );

}


/* =====================================================
   CADASTRAR PRODUTO
===================================================== */

form.addEventListener("submit", function(event) {

    event.preventDefault();


    const codigo = document
        .getElementById("codigo")
        .value
        .trim();

    const descricao = document
        .getElementById("descricao")
        .value
        .trim();

    const quantidade = Number(
        document.getElementById("quantidade").value
    );

    const valor = Number(
        document.getElementById("valor").value
    );


    /* Validação */

    if (!codigo || !descricao) {

        mostrarToast(
            "Atenção",
            "Preencha todos os campos obrigatórios.",
            false
        );

        return;

    }


    if (quantidade < 0 || valor < 0) {

        mostrarToast(
            "Valor inválido",
            "Quantidade e valor não podem ser negativos.",
            false
        );

        return;

    }


    /* Verifica código duplicado */

    const codigoExiste = produtos.some(
        produto =>
            produto.codigo.toLowerCase() === codigo.toLowerCase()
    );


    if (codigoExiste) {

        mostrarToast(
            "Código duplicado",
            "Já existe um produto com esse código.",
            false
        );

        return;

    }


    /* Cria produto */

    const produto = {

        id: Date.now(),

        codigo: codigo,

        descricao: descricao,

        quantidade: quantidade,

        valor: valor

    };


    produtos.push(produto);

    salvarProdutos();

    renderizarProdutos();

    atualizarDashboard();

    form.reset();


    mostrarToast(
        "Produto cadastrado",
        `${descricao} foi adicionado ao estoque.`
    );


    /* Scroll para produtos */

    setTimeout(() => {

        document
            .getElementById("produtos")
            .scrollIntoView({
                behavior: "smooth"
            });

    }, 300);

});


/* =====================================================
   RENDERIZAR PRODUTOS
===================================================== */

function renderizarProdutos() {

    const termo = pesquisa.value
        .toLowerCase()
        .trim();


    const produtosFiltrados = produtos.filter(produto => {

        return (

            produto.codigo.toLowerCase().includes(termo) ||

            produto.descricao.toLowerCase().includes(termo)

        );

    });


    tabela.innerHTML = "";


    if (produtosFiltrados.length === 0) {

        tabela.style.display = "none";

        emptyState.style.display = "block";

        return;

    }


    tabela.style.display = "table";

    emptyState.style.display = "none";


    produtosFiltrados.forEach(produto => {

        const tr = document.createElement("tr");


        /* Status */

        let statusTexto;

        let statusClasse;


        if (produto.quantidade === 0) {

            statusTexto = "Sem estoque";

            statusClasse = "empty";

        }

        else if (produto.quantidade <= 5) {

            statusTexto = "Estoque baixo";

            statusClasse = "low";

        }

        else {

            statusTexto = "Disponível";

            statusClasse = "available";

        }


        /* Valor total */

        const valorTotal =
            produto.quantidade * produto.valor;


        tr.innerHTML = `

            <td>
                <span class="product-code">
                    ${escaparHTML(produto.codigo)}
                </span>
            </td>

            <td>
                <span class="product-name">
                    ${escaparHTML(produto.descricao)}
                </span>
            </td>

            <td>
                <span class="quantity">
                    ${produto.quantidade}
                </span>
            </td>

            <td>
                <span class="money">
                    ${formatarMoeda(produto.valor)}
                </span>
            </td>

            <td>
                <span class="money">
                    ${formatarMoeda(valorTotal)}
                </span>
            </td>

            <td>
                <span class="status ${statusClasse}">
                    ${statusTexto}
                </span>
            </td>

            <td>

                <div class="actions">

                    <button
                        class="action-btn"
                        title="Editar valor"
                        onclick="abrirEdicao(${produto.id}, 'valor')"
                    >
                        <i class="fa-solid fa-dollar-sign"></i>
                    </button>


                    <button
                        class="action-btn"
                        title="Editar quantidade"
                        onclick="abrirEdicao(${produto.id}, 'quantidade')"
                    >
                        <i class="fa-solid fa-cubes"></i>
                    </button>


                    <button
                        class="action-btn delete"
                        title="Excluir produto"
                        onclick="excluirProduto(${produto.id})"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>

            </td>

        `;


        tabela.appendChild(tr);

    });

}


/* =====================================================
   PESQUISA
===================================================== */

pesquisa.addEventListener(
    "input",
    renderizarProdutos
);


/* =====================================================
   ABRIR MODAL DE EDIÇÃO
===================================================== */

function abrirEdicao(id, tipo) {

    const produto = produtos.find(
        produto => produto.id === id
    );


    if (!produto) return;


    produtoId.value = id;


    document.getElementById(
        "previewDescricao"
    ).textContent = produto.descricao;


    document.getElementById(
        "previewCodigo"
    ).textContent = `Código: ${produto.codigo}`;


    selecionarEdicao(tipo);


    if (tipo === "valor") {

        novoValor.value = produto.valor;

    }

    else {

        novoValor.value = produto.quantidade;

    }


    modal.classList.add("show");

}


/* =====================================================
   SELECIONAR TIPO DE EDIÇÃO
===================================================== */

function selecionarEdicao(tipo) {

    tipoEdicao = tipo;


    if (tipo === "valor") {

        btnValor.classList.add("active");

        btnQuantidade.classList.remove("active");


        editLabel.textContent =
            "Novo valor unitário";


        editIcon.className =
            "fa-solid fa-brazilian-real-sign";


        novoValor.step = "0.01";

        novoValor.placeholder =
            "Digite o novo valor";

    }

    else {

        btnQuantidade.classList.add("active");

        btnValor.classList.remove("active");


        editLabel.textContent =
            "Nova quantidade";


        editIcon.className =
            "fa-solid fa-cubes";


        novoValor.step = "1";

        novoValor.placeholder =
            "Digite a nova quantidade";

    }

}


/* =====================================================
   SALVAR ALTERAÇÃO
===================================================== */

function salvarAlteracao() {

    const id = Number(produtoId.value);

    const produto = produtos.find(
        produto => produto.id === id
    );


    if (!produto) return;


    const novo = Number(novoValor.value);


    if (
        novoValor.value === "" ||
        novo < 0 ||
        !Number.isFinite(novo)
    ) {

        mostrarToast(
            "Valor inválido",
            "Informe um valor válido.",
            false
        );

        return;

    }


    if (
        tipoEdicao === "quantidade" &&
        !Number.isInteger(novo)
    ) {

        mostrarToast(
            "Quantidade inválida",
            "A quantidade deve ser um número inteiro.",
            false
        );

        return;

    }


    if (tipoEdicao === "valor") {

        produto.valor = novo;

        mostrarToast(
            "Valor atualizado",
            "O valor do produto foi alterado."
        );

    }

    else {

        produto.quantidade = novo;

        mostrarToast(
            "Quantidade atualizada",
            "A quantidade do produto foi alterada."
        );

    }


    salvarProdutos();

    renderizarProdutos();

    atualizarDashboard();

    fecharModal();

}


/* =====================================================
   FECHAR MODAL
===================================================== */

function fecharModal() {

    modal.classList.remove("show");

    novoValor.value = "";

}


/* Fecha ao clicar fora do modal */

modal.addEventListener("click", function(event) {

    if (event.target === modal) {

        fecharModal();

    }

});


/* =====================================================
   EXCLUIR PRODUTO
===================================================== */

function excluirProduto(id) {

    const produto = produtos.find(
        produto => produto.id === id
    );


    if (!produto) return;


    const confirmar = confirm(
        `Deseja realmente excluir o produto "${produto.descricao}"?`
    );


    if (!confirmar) return;


    produtos = produtos.filter(
        produto => produto.id !== id
    );


    salvarProdutos();

    renderizarProdutos();

    atualizarDashboard();


    mostrarToast(
        "Produto removido",
        `${produto.descricao} foi excluído do estoque.`
    );

}


/* =====================================================
   DASHBOARD
===================================================== */

function atualizarDashboard() {

    const totalProdutos = produtos.length;


    const totalItens = produtos.reduce(
        (total, produto) => {

            return total + produto.quantidade;

        },
        0
    );


    const valorEstoque = produtos.reduce(
        (total, produto) => {

            return total +
                produto.quantidade * produto.valor;

        },
        0
    );


    document.getElementById(
        "totalProdutos"
    ).textContent = totalProdutos;


    document.getElementById(
        "totalItens"
    ).textContent = totalItens;


    document.getElementById(
        "valorEstoque"
    ).textContent = formatarMoeda(valorEstoque);

}


/* =====================================================
   TOAST
===================================================== */

let toastTimeout;


function mostrarToast(
    titulo,
    mensagem,
    sucesso = true
) {

    const toast =
        document.getElementById("toast");


    const toastTitulo =
        document.getElementById("toastTitulo");


    const toastMensagem =
        document.getElementById("toastMensagem");


    const toastIcon =
        document.querySelector(".toast-icon");


    toastTitulo.textContent = titulo;

    toastMensagem.textContent = mensagem;


    if (sucesso) {

        toastIcon.style.background =
            "#dcfce7";

        toastIcon.style.color =
            "#16a34a";

        toastIcon.innerHTML =
            '<i class="fa-solid fa-check"></i>';

    }

    else {

        toastIcon.style.background =
            "#fee2e2";

        toastIcon.style.color =
            "#dc2626";

        toastIcon.innerHTML =
            '<i class="fa-solid fa-xmark"></i>';

    }


    toast.classList.add("show");


    clearTimeout(toastTimeout);


    toastTimeout = setTimeout(() => {

        toast.classList.remove("show");

    }, 3500);

}


/* =====================================================
   MENU LATERAL
===================================================== */

document.querySelectorAll(".menu-item").forEach(item => {

    item.addEventListener("click", function() {

        document
            .querySelectorAll(".menu-item")
            .forEach(menu =>
                menu.classList.remove("active")
            );


        this.classList.add("active");

    });

});


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

renderizarProdutos();

atualizarDashboard();
