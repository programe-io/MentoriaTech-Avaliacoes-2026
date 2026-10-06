// ========================================
// MENTORIA TECH
// SISTEMA DE ESTOQUE
// ========================================


// PRODUTOS

let produtos =
    JSON.parse(
        localStorage.getItem(
            "mentoriaTechProdutos"
        )
    ) || [

        {
            id: 1,
            nome: "Notebook",
            categoria: "Informática",
            quantidade: 8,
            preco: 3500
        },

        {
            id: 2,
            nome: "Mouse",
            categoria: "Acessórios",
            quantidade: 25,
            preco: 89.90
        },

        {
            id: 3,
            nome: "Teclado",
            categoria: "Acessórios",
            quantidade: 12,
            preco: 249.90
        },

        {
            id: 4,
            nome: "Monitor",
            categoria: "Eletrônicos",
            quantidade: 4,
            preco: 899.90
        }

    ];


// ELEMENTOS

const form =
    document.getElementById(
        "formProduto"
    );

const tabela =
    document.getElementById(
        "tabelaProdutos"
    );

const pesquisa =
    document.getElementById(
        "pesquisa"
    );


// FORMATAÇÃO DE MOEDA

function moeda(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


// SALVAR DADOS

function salvarProdutos() {

    localStorage.setItem(
        "mentoriaTechProdutos",
        JSON.stringify(produtos)
    );

}


// ATUALIZAR DASHBOARD

function atualizarDashboard() {

    const totalProdutos =
        produtos.length;


    const totalItens =
        produtos.reduce(
            (total, produto) =>
                total + produto.quantidade,
            0
        );


    const valorEstoque =
        produtos.reduce(
            (total, produto) =>
                total +
                produto.quantidade *
                produto.preco,
            0
        );


    const estoqueBaixo =
        produtos.filter(
            produto =>
                produto.quantidade <= 5
        ).length;


    document.getElementById(
        "totalProdutos"
    ).textContent =
        totalProdutos;


    document.getElementById(
        "totalItens"
    ).textContent =
        totalItens;


    document.getElementById(
        "valorEstoque"
    ).textContent =
        moeda(valorEstoque);


    document.getElementById(
        "estoqueBaixo"
    ).textContent =
        estoqueBaixo;

}


// MOSTRAR PRODUTOS

function mostrarProdutos(lista = produtos) {

    tabela.innerHTML = "";


    if (lista.length === 0) {

        tabela.innerHTML = `

            <tr>

                <td colspan="8"
                    style="text-align:center">

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


        const linha =
            document.createElement("tr");


        linha.innerHTML = `

            <td>
                #${produto.id}
            </td>

            <td>
                <strong>
                    ${produto.nome}
                </strong>
            </td>

            <td>
                ${produto.categoria}
            </td>

            <td>
                ${produto.quantidade}
            </td>

            <td>
                ${moeda(produto.preco)}
            </td>

            <td>
                ${moeda(valorTotal)}
            </td>

            <td>

                <span class="${
                    estoqueBaixo
                    ? "status-baixo"
                    : "status-normal"
                }">

                    ${
                        estoqueBaixo
                        ? "⚠ Estoque baixo"
                        : "✓ Normal"
                    }

                </span>

            </td>

            <td>

                <button
                    class="acao entrada"
                    onclick="entrada(${produto.id})"
                >
                    + Entrada
                </button>

                <button
                    class="acao saida"
                    onclick="saida(${produto.id})"
                >
                    - Saída
                </button>

                <button
                    class="acao excluir"
                    onclick="excluir(${produto.id})"
                >
                    🗑
                </button>

            </td>

        `;


        tabela.appendChild(linha);

    });

}


// CADASTRAR PRODUTO

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


        if (
            !nome ||
            !categoria ||
            quantidade < 0 ||
            preco < 0
        ) {

            alert(
                "Preencha os campos corretamente."
            );

            return;
        }


        const novoId =
            produtos.length > 0
            ? Math.max(
                ...produtos.map(
                    produto => produto.id
                )
            ) + 1
            : 1;


        const novoProduto = {

            id: novoId,

            nome: nome,

            categoria: categoria,

            quantidade: quantidade,

            preco: preco

        };


        produtos.push(
            novoProduto
        );


        salvarProdutos();

        mostrarProdutos();

        atualizarDashboard();


        form.reset();


        alert(
            "Produto cadastrado com sucesso!"
        );

    }
);


// ENTRADA DE ESTOQUE

function entrada(id) {

    const produto =
        produtos.find(
            produto =>
                produto.id === id
        );


    if (!produto) return;


    const quantidade =
        Number(
            prompt(
                "Digite a quantidade de entrada:"
            )
        );


    if (
        !Number.isFinite(quantidade) ||
        quantidade <= 0
    ) {

        alert(
            "Digite uma quantidade válida."
        );

        return;
    }


    produto.quantidade +=
        quantidade;


    salvarProdutos();

    mostrarProdutos();

    atualizarDashboard();

}


// SAÍDA DE ESTOQUE

function saida(id) {

    const produto =
        produtos.find(
            produto =>
                produto.id === id
        );


    if (!produto) return;


    const quantidade =
        Number(
            prompt(
                "Digite a quantidade de saída:"
            )
        );


    if (
        !Number.isFinite(quantidade) ||
        quantidade <= 0
    ) {

        alert(
            "Digite uma quantidade válida."
        );

        return;
    }


    if (
        quantidade >
        produto.quantidade
    ) {

        alert(
            "Estoque insuficiente."
        );

        return;
    }


    produto.quantidade -=
        quantidade;


    salvarProdutos();

    mostrarProdutos();

    atualizarDashboard();

}


// EXCLUIR PRODUTO

function excluir(id) {

    const produto =
        produtos.find(
            produto =>
                produto.id === id
        );


    if (!produto) return;


    const confirmar =
        confirm(
            `Deseja excluir ${produto.nome}?`
        );


    if (!confirmar) return;


    produtos =
        produtos.filter(
            produto =>
                produto.id !== id
        );


    salvarProdutos();

    mostrarProdutos();

    atualizarDashboard();

}


// PESQUISA

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


        mostrarProdutos(
            resultado
        );

    }
);


// DATA ATUAL

function mostrarData() {

    const data =
        new Date();


    document.getElementById(
        "dataAtual"
    ).textContent =

        data.toLocaleDateString(
            "pt-BR",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        );

}


// INICIALIZAÇÃO

mostrarData();

mostrarProdutos();

atualizarDashboard();
