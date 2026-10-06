/* ========================================
   MENTORIA TECH
   SISTEMA DE ESTOQUE
======================================== */


/* ========================================
   PRODUTOS
======================================== */

let produtos =
    JSON.parse(localStorage.getItem("mentoriaTechProdutos")) || [

        {
            id: 1,
            nome: "Notebook Dell",
            categoria: "Informática",
            quantidade: 8,
            preco: 3500
        },

        {
            id: 2,
            nome: "Mouse Sem Fio",
            categoria: "Acessórios",
            quantidade: 25,
            preco: 89.90
        },

        {
            id: 3,
            nome: "Teclado Mecânico",
            categoria: "Acessórios",
            quantidade: 12,
            preco: 249.90
        },

        {
            id: 4,
            nome: "Monitor 24 Polegadas",
            categoria: "Eletrônicos",
            quantidade: 4,
            preco: 899.90
        }

    ];


/* ========================================
   SALVAR NO LOCALSTORAGE
======================================== */

function salvarProdutos() {

    localStorage.setItem(
        "mentoriaTechProdutos",
        JSON.stringify(produtos)
    );

}


/* ========================================
   FORMATAÇÃO DE MOEDA
======================================== */

function formatarMoeda(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* ========================================
   ATUALIZAR DASHBOARD
======================================== */

function atualizarDashboard() {

    const totalProdutos =
        produtos.length;


    const totalItens =
        produtos.reduce(
            (total, produto) => {

                return total + produto.quantidade;

            },
            0
        );


    const valorEstoque =
        produtos.reduce(
            (total, produto) => {

                return total +
                    produto.quantidade *
                    produto.preco;

            },
            0
        );


    const estoqueBaixo =
        produtos.filter(
            produto => produto.quantidade <= 5
        ).length;


    document.getElementById(
        "totalProdutos"
    ).textContent = totalProdutos;


    document.getElementById(
        "totalItens"
    ).textContent = totalItens;


    document.getElementById(
        "valorEstoque"
    ).textContent =
        formatarMoeda(valorEstoque);


    document.getElementById(
        "estoqueBaixo"
    ).textContent = estoqueBaixo;

}


/* ========================================
   MOSTRAR PRODUTOS
======================================== */

function mostrarProdutos(lista = produtos) {

    const tabela =
        document.getElementById(
            "tabelaProdutos"
        );


    tabela.innerHTML = "";


    if (lista.length === 0) {

        tabela.innerHTML = `

            <tr>

                <td
                    colspan="8"
                    style="text-align:center; padding:30px;"
                >

                    Nenhum produto encontrado.

                </td>

            </tr>

        `;

        return;

    }


    lista.forEach(produto => {

        const valorTotal =
            produto.quantidade *
            produto.preco;


        const estoqueBaixo =
            produto.quantidade <= 5;


        const tr =
            document.createElement("tr");


        tr.innerHTML = `

            <td>
                <strong>#${produto.id}</strong>
            </td>


            <td>
                <strong>${produto.nome}</strong>
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
                <strong>
                    ${formatarMoeda(valorTotal)}
                </strong>
            </td>


            <td>

                <span class="status
                    ${
                        estoqueBaixo
                        ? "status-baixo"
                        : "status-ok"
                    }
                ">

                    ${
                        estoqueBaixo
                        ? "⚠ Estoque baixo"
                        : "✓ Normal"
                    }

                </span>

            </td>


            <td class="acoes">

                <button
                    class="btn-acao btn-entrada"
                    onclick="entradaProduto(${produto.id})"
                    title="Adicionar estoque"
                >
                    + Entrada
                </button>


                <button
                    class="btn-acao btn-saida"
                    onclick="saidaProduto(${produto.id})"
                    title="Retirar estoque"
                >
                    - Saída
                </button>


                <button
                    class="btn-acao btn-excluir"
                    onclick="excluirProduto(${produto.id})"
                    title="Excluir produto"
                >
                    🗑
                </button>

            </td>

        `;


        tabela.appendChild(tr);

    });

}


/* ========================================
   CADASTRAR PRODUTO
======================================== */

const form =
    document.getElementById(
        "formProduto"
    );


form.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const nome =
            document
                .getElementById("nome")
                .value
                .trim();


        const categoria =
            document
                .getElementById("categoria")
                .value;


        const quantidade =
            Number(
                document
                    .getElementById("quantidade")
                    .value
            );


        const preco =
            Number(
                document
                    .getElementById("preco")
                    .value
            );


        if (!nome || !categoria) {

            alert(
                "Preencha todos os campos."
            );

            return;

        }


        if (
            quantidade < 0 ||
            preco < 0
        ) {

            alert(
                "Quantidade e preço não podem ser negativos."
            );

            return;

        }


        const novoProduto = {

            id:
                produtos.length > 0
                    ? Math.max(
                        ...produtos.map(
                            produto => produto.id
                        )
                    ) + 1
                    : 1,

            nome: nome,

            categoria: categoria,

            quantidade: quantidade,

            preco: preco

        };


        produtos.push(novoProduto);


        salvarProdutos();


        mostrarProdutos();


        atualizarDashboard();


        form.reset();


        alert(
            "Produto cadastrado com sucesso! 🚀"
        );

    }
);


/* ========================================
   ENTRADA DE ESTOQUE
======================================== */

function entradaProduto(id) {

    const produto =
        produtos.find(
            produto => produto.id === id
        );


    if (!produto) return;


    const quantidade =
        Number(
            prompt(
                `Informe a quantidade de entrada para ${produto.nome}:`
            )
        );


    if (
        !Number.isFinite(quantidade) ||
        quantidade <= 0
    ) {

        alert(
            "Informe uma quantidade válida."
        );

        return;

    }


    produto.quantidade += quantidade;


    salvarProdutos();

    mostrarProdutos();

    atualizarDashboard();

}


/* ========================================
   SAÍDA DE ESTOQUE
======================================== */

function saidaProduto(id) {

    const produto =
        produtos.find(
            produto => produto.id === id
        );


    if (!produto) return;


    const quantidade =
        Number(
            prompt(
                `Informe a quantidade de saída para ${produto.nome}:`
            )
        );


    if (
        !Number.isFinite(quantidade) ||
        quantidade <= 0
    ) {

        alert(
            "Informe uma quantidade válida."
        );

        return;

    }


    if (
        quantidade > produto.quantidade
    ) {

        alert(
            "Quantidade de saída maior que o estoque disponível."
        );

        return;

    }


    produto.quantidade -= quantidade;


    salvarProdutos();

    mostrarProdutos();

    atualizarDashboard();

}


/* ========================================
   EXCLUIR PRODUTO
======================================== */

function excluirProduto(id) {

    const produto =
        produtos.find(
            produto => produto.id === id
        );


    if (!produto) return;


    const confirmar =
        confirm(
            `Deseja excluir o produto "${produto.nome}"?`
        );


    if (!confirmar) return;


    produtos =
        produtos.filter(
            produto => produto.id !== id
        );


    salvarProdutos();

    mostrarProdutos();

    atualizarDashboard();


    alert(
        "Produto excluído com sucesso."
    );

}


/* ========================================
   PESQUISA
======================================== */

const pesquisa =
    document.getElementById(
        "pesquisa"
    );


pesquisa.addEventListener(
    "input",
    function() {

        const texto =
            this.value
                .toLowerCase()
                .trim();


        const resultado =
            produtos.filter(
                produto =>

                    produto.nome
                        .toLowerCase()
                        .includes(texto)

                    ||

                    produto.categoria
                        .toLowerCase()
                        .includes(texto)
            );


        mostrarProdutos(resultado);

    }
);


/* ========================================
   DATA ATUAL
======================================== */

function mostrarData() {

    const data =
        new Date();


    const dataFormatada =
        data.toLocaleDateString(
            "pt-BR",
            {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );


    document.getElementById(
        "dataAtual"
    ).textContent =
        dataFormatada;

}


/* ========================================
   INICIALIZAÇÃO
======================================== */

mostrarData();

mostrarProdutos();

atualizarDashboard();
