/* =========================================================
   SWEETSTOCK 💜
   SCRIPT.JS
   Sistema de estoque de produtos
========================================================= */


/* =========================================================
   VARIÁVEIS
========================================================= */

let produtos = [];

let produtoEditando = null;


/* =========================================================
   ELEMENTOS DO HTML
========================================================= */

const tabelaProdutos =
    document.getElementById("tabelaProdutos");

const modal =
    document.getElementById("modal");

const formulario =
    document.getElementById("formProduto");

const inputCodigo =
    document.getElementById("codigo");

const inputDescricao =
    document.getElementById("descricao");

const inputQuantidade =
    document.getElementById("quantidade");

const inputValor =
    document.getElementById("valor");

const inputPesquisa =
    document.getElementById("pesquisa");

const tituloModal =
    document.getElementById("tituloModal");

const subtituloModal =
    document.getElementById("subtituloModal");

const toast =
    document.getElementById("toast");


/* =========================================================
   CARREGAR PRODUTOS
========================================================= */

function carregarProdutos() {

    const produtosSalvos =
        localStorage.getItem("sweetstock_produtos");

    if (produtosSalvos) {

        produtos =
            JSON.parse(produtosSalvos);

    } else {

        produtos = [];

    }

    atualizarTela();
}


/* =========================================================
   SALVAR PRODUTOS
========================================================= */

function salvarProdutos() {

    localStorage.setItem(
        "sweetstock_produtos",
        JSON.stringify(produtos)
    );
}


/* =========================================================
   GERAR ID
========================================================= */

function gerarId() {

    return Date.now() +
        Math.floor(Math.random() * 1000);
}


/* =========================================================
   FORMATAR DINHEIRO
========================================================= */

function formatarValor(valor) {

    return Number(valor).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );
}


/* =========================================================
   CADASTRAR PRODUTO
========================================================= */

function cadastrarProduto(event) {

    event.preventDefault();

    const codigo =
        inputCodigo.value.trim();

    const descricao =
        inputDescricao.value.trim();

    const quantidade =
        Number(inputQuantidade.value);

    const valor =
        Number(inputValor.value);


    /* -----------------------------------------
       VALIDAÇÕES
    ----------------------------------------- */

    if (codigo === "") {

        mostrarToast(
            "Digite o código do produto.",
            "erro"
        );

        inputCodigo.focus();

        return;
    }


    if (descricao.length < 3) {

        mostrarToast(
            "A descrição deve ter pelo menos 3 caracteres.",
            "erro"
        );

        inputDescricao.focus();

        return;
    }


    if (
        !Number.isInteger(quantidade) ||
        quantidade < 0
    ) {

        mostrarToast(
            "A quantidade deve ser um número inteiro maior ou igual a zero.",
            "erro"
        );

        inputQuantidade.focus();

        return;
    }


    if (
        isNaN(valor) ||
        valor < 0
    ) {

        mostrarToast(
            "Digite um valor válido.",
            "erro"
        );

        inputValor.focus();

        return;
    }


    /* =====================================================
       EDITAR PRODUTO
    ===================================================== */

    if (produtoEditando !== null) {

        const produto =
            produtos.find(
                produto =>
                    produto.id === produtoEditando
            );


        if (produto) {

            produto.codigo =
                codigo;

            produto.descricao =
                descricao;

            produto.quantidade =
                quantidade;

            produto.valor =
                valor;

            salvarProdutos();

            atualizarTela();

            fecharModal();

            mostrarToast(
                "Produto atualizado com sucesso! ✨"
            );
        }

        return;
    }


    /* =====================================================
       VERIFICAR CÓDIGO DUPLICADO
    ===================================================== */

    const codigoExiste =
        produtos.some(
            produto =>
                produto.codigo.toLowerCase() ===
                codigo.toLowerCase()
        );


    if (codigoExiste) {

        mostrarToast(
            "Já existe um produto com esse código.",
            "erro"
        );

        inputCodigo.focus();

        return;
    }


    /* =====================================================
       CRIAR PRODUTO
    ===================================================== */

    const novoProduto = {

        id: gerarId(),

        codigo: codigo,

        descricao: descricao,

        quantidade: quantidade,

        valor: valor

    };


    produtos.push(novoProduto);


    salvarProdutos();

    atualizarTela();

    fecharModal();

    mostrarToast(
        "Produto cadastrado com sucesso! 💜"
    );
}


/* =========================================================
   LISTAR PRODUTOS
========================================================= */

function listarProdutos(lista = produtos) {

    if (!tabelaProdutos) {

        return;
    }


    if (lista.length === 0) {

        tabelaProdutos.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="vazio"
                >

                    <div class="vazio-icon">
                        📦
                    </div>

                    <strong>
                        Nenhum produto encontrado
                    </strong>

                    <span>
                        Cadastre um produto para começar.
                    </span>

                </td>

            </tr>

        `;

        return;
    }


    tabelaProdutos.innerHTML =
        lista.map(produto => {

            let status = "";

            if (produto.quantidade === 0) {

                status = `
                    <span class="tag"
                          style="background:#ffe8ed;color:#e46d82;">
                        Sem estoque
                    </span>
                `;

            } else if (produto.quantidade <= 5) {

                status = `
                    <span class="tag tag-baixo">
                        Estoque baixo
                    </span>
                `;

            } else {

                status = `
                    <span class="tag tag-ok">
                        Disponível
                    </span>
                `;
            }


            return `

                <tr>

                    <td>
                        <span class="codigo">
                            #${escaparHTML(produto.codigo)}
                        </span>
                    </td>


                    <td>

                        <span class="produto">
                            ${escaparHTML(produto.descricao)}
                        </span>

                    </td>


                    <td>

                        <strong>
                            ${produto.quantidade}
                        </strong>

                    </td>


                    <td>

                        <span class="valor">
                            ${formatarValor(produto.valor)}
                        </span>

                    </td>


                    <td>
                        ${status}
                    </td>


                    <td>

                        <div class="acoes">

                            <button
                                class="acao editar"
                                onclick="editarProduto(${produto.id})"
                                title="Editar produto"
                            >
                                ✏️
                            </button>


                            <button
                                class="acao"
                                onclick="alterarQuantidade(${produto.id})"
                                title="Alterar quantidade"
                            >
                                📦
                            </button>


                            <button
                                class="acao excluir"
                                onclick="excluirProduto(${produto.id})"
                                title="Excluir produto"
                            >
                                🗑️
                            </button>

                        </div>

                    </td>

                </tr>

            `;

        }).join("");
}


/* =========================================================
   EDITAR PRODUTO
========================================================= */

function editarProduto(id) {

    const produto =
        produtos.find(
            produto =>
                produto.id === id
        );


    if (!produto) {

        mostrarToast(
            "Produto não encontrado.",
            "erro"
        );

        return;
    }


    produtoEditando = id;


    tituloModal.textContent =
        "Editar produto ✏️";


    subtituloModal.textContent =
        "Atualize as informações do produto.";


    inputCodigo.value =
        produto.codigo;

    inputDescricao.value =
        produto.descricao;

    inputQuantidade.value =
        produto.quantidade;

    inputValor.value =
        produto.valor;


    abrirModal();
}


/* =========================================================
   ALTERAR QUANTIDADE
========================================================= */

function alterarQuantidade(id) {

    const produto =
        produtos.find(
            produto =>
                produto.id === id
        );


    if (!produto) {

        mostrarToast(
            "Produto não encontrado.",
            "erro"
        );

        return;
    }


    const novaQuantidade =
        prompt(
            `Quantidade atual: ${produto.quantidade}\n\nDigite a nova quantidade:`,
            produto.quantidade
        );


    if (novaQuantidade === null) {

        return;
    }


    const quantidade =
        Number(novaQuantidade);


    if (
        !Number.isInteger(quantidade) ||
        quantidade < 0
    ) {

        mostrarToast(
            "Digite uma quantidade válida.",
            "erro"
        );

        return;
    }


    produto.quantidade =
        quantidade;


    salvarProdutos();

    atualizarTela();


    mostrarToast(
        "Quantidade atualizada! 📦"
    );
}


/* =========================================================
   ALTERAR VALOR
========================================================= */

function alterarValor(id) {

    const produto =
        produtos.find(
            produto =>
                produto.id === id
        );


    if (!produto) {

        mostrarToast(
            "Produto não encontrado.",
            "erro"
        );

        return;
    }


    const novoValor =
        prompt(
            `Valor atual: ${formatarValor(produto.valor)}\n\nDigite o novo valor:`,
            produto.valor
        );


    if (novoValor === null) {

        return;
    }


    const valor =
        Number(
            novoValor.replace(",", ".")
        );


    if (
        isNaN(valor) ||
        valor < 0
    ) {

        mostrarToast(
            "Digite um valor válido.",
            "erro"
        );

        return;
    }


    produto.valor =
        valor;


    salvarProdutos();

    atualizarTela();


    mostrarToast(
        "Valor atualizado! 💰"
    );
}


/* =========================================================
   EXCLUIR PRODUTO
========================================================= */

function excluirProduto(id) {

    const produto =
        produtos.find(
            produto =>
                produto.id === id
        );


    if (!produto) {

        return;
    }


    const confirmar =
        confirm(
            `Deseja realmente excluir "${produto.descricao}"?`
        );


    if (!confirmar) {

        return;
    }


    produtos =
        produtos.filter(
            produto =>
                produto.id !== id
        );


    salvarProdutos();

    atualizarTela();


    mostrarToast(
        "Produto excluído com sucesso."
    );
}


/* =========================================================
   PESQUISAR
========================================================= */

function pesquisarProdutos() {

    const termo =
        inputPesquisa.value
            .toLowerCase()
            .trim();


    if (termo === "") {

        listarProdutos();

        return;
    }


    const resultado =
        produtos.filter(produto =>

            produto.codigo
                .toLowerCase()
                .includes(termo)

            ||

            produto.descricao
                .toLowerCase()
                .includes(termo)

        );


    listarProdutos(resultado);
}


/* =========================================================
   ATUALIZAR DASHBOARD
========================================================= */

function atualizarCards() {

    const totalProdutos =
        produtos.length;


    const quantidadeTotal =
        produtos.reduce(
            (total, produto) =>
                total + produto.quantidade,
            0
        );


    const valorEstoque =
        produtos.reduce(
            (total, produto) =>
                total +
                (
                    produto.quantidade *
                    produto.valor
                ),
            0
        );


    const estoqueBaixo =
        produtos.filter(
            produto =>
                produto.quantidade <= 5
        ).length;


    const elementoProdutos =
        document.getElementById(
            "totalProdutos"
        );


    const elementoQuantidade =
        document.getElementById(
            "totalQuantidade"
        );


    const elementoValor =
        document.getElementById(
            "valorEstoque"
        );


    const elementoBaixo =
        document.getElementById(
            "estoqueBaixo"
        );


    if (elementoProdutos) {

        elementoProdutos.textContent =
            totalProdutos;
    }


    if (elementoQuantidade) {

        elementoQuantidade.textContent =
            quantidadeTotal;
    }


    if (elementoValor) {

        elementoValor.textContent =
            formatarValor(valorEstoque);
    }


    if (elementoBaixo) {

        elementoBaixo.textContent =
            estoqueBaixo;
    }
}


/* =========================================================
   ATUALIZAR TELA
========================================================= */

function atualizarTela() {

    listarProdutos();

    atualizarCards();
}


/* =========================================================
   ABRIR MODAL
========================================================= */

function abrirModal() {

    if (!modal) {

        return;
    }


    modal.classList.remove(
        "escondido"
    );


    setTimeout(() => {

        inputCodigo?.focus();

    }, 100);
}


/* =========================================================
   NOVO PRODUTO
========================================================= */

function novoProduto() {

    produtoEditando = null;


    formulario?.reset();


    tituloModal.textContent =
        "Novo produto ✨";


    subtituloModal.textContent =
        "Cadastre um novo produto no estoque.";


    abrirModal();
}


/* =========================================================
   FECHAR MODAL
========================================================= */

function fecharModal() {

    if (!modal) {

        return;
    }


    modal.classList.add(
        "escondido"
    );


    produtoEditando = null;

    formulario?.reset();
}


/* =========================================================
   TOAST
========================================================= */

let timeoutToast;


function mostrarToast(
    mensagem,
    tipo = "sucesso"
) {

    if (!toast) {

        return;
    }


    clearTimeout(timeoutToast);


    toast.textContent =
        mensagem;


    toast.className =
        "toast mostrar";


    if (tipo === "erro") {

        toast.style.background =
            "#d85d75";

    } else {

        toast.style.background =
            "#6243a9";
    }


    timeoutToast =
        setTimeout(() => {

            toast.classList.remove(
                "mostrar"
            );

        }, 3000);
}


/* =========================================================
   ESCAPAR HTML
   Proteção contra HTML inserido nos campos
========================================================= */

function escaparHTML(texto) {

    return String(texto)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");
}


/* =========================================================
   FECHAR MODAL CLICANDO FORA
========================================================= */

if (modal) {

    modal.addEventListener(
        "click",
        function(event) {

            if (
                event.target === modal
            ) {

                fecharModal();
            }

        }
    );
}


/* =========================================================
   TECLA ESC
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            fecharModal();
        }

    }
);


/* =========================================================
   PESQUISA EM TEMPO REAL
========================================================= */

if (inputPesquisa) {

    inputPesquisa.addEventListener(
        "input",
        pesquisarProdutos
    );
}


/* =========================================================
   FORMULÁRIO
========================================================= */

if (formulario) {

    formulario.addEventListener(
        "submit",
        cadastrarProduto
    );
}


/* =========================================================
   EXPORTAR PRODUTOS
========================================================= */

function exportarProdutos() {

    if (produtos.length === 0) {

        mostrarToast(
            "Não existem produtos para exportar.",
            "erro"
        );

        return;
    }


    const dados =
        JSON.stringify(
            produtos,
            null,
            4
        );


    const arquivo =
        new Blob(
            [dados],
            {
                type: "application/json"
            }
        );


    const url =
        URL.createObjectURL(
            arquivo
        );


    const link =
        document.createElement("a");


    link.href =
        url;


    link.download =
        "sweetstock-produtos.json";


    link.click();


    URL.revokeObjectURL(url);


    mostrarToast(
        "Estoque exportado com sucesso! 📁"
    );
}


/* =========================================================
   IMPORTAR PRODUTOS
========================================================= */

function importarProdutos(event) {

    const arquivo =
        event.target.files[0];


    if (!arquivo) {

        return;
    }


    const leitor =
        new FileReader();


    leitor.onload =
        function(e) {

            try {

                const dados =
                    JSON.parse(
                        e.target.result
                    );


                if (
                    !Array.isArray(dados)
                ) {

                    throw new Error(
                        "Formato inválido."
                    );
                }


                produtos =
                    dados;


                salvarProdutos();

                atualizarTela();


                mostrarToast(
                    "Estoque importado com sucesso! 💜"
                );


            } catch (erro) {

                mostrarToast(
                    "Não foi possível importar o arquivo.",
                    "erro"
                );

            }

        };


    leitor.readAsText(
        arquivo
    );
}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        carregarProdutos();

    }
);