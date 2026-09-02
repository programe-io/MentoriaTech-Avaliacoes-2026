
// =====================================================
// ESTOQUE INICIAL
// =====================================================

let produtos = [

    {
        codigo: 1001,
        descricao: "Fone Bluetooth",
        categoria: "Eletrônicos",
        quantidade: 35,
        valor: 59.90
    },

    {
        codigo: 1002,
        descricao: "Smartwatch Digital",
        categoria: "Eletrônicos",
        quantidade: 18,
        valor: 129.90
    },

    {
        codigo: 1003,
        descricao: "Caixa de Som Bluetooth",
        categoria: "Eletrônicos",
        quantidade: 12,
        valor: 99.90
    },

    {
        codigo: 1004,
        descricao: "Carregador USB-C",
        categoria: "Eletrônicos",
        quantidade: 40,
        valor: 29.90
    },

    {
        codigo: 1005,
        descricao: "Power Bank 10000mAh",
        categoria: "Eletrônicos",
        quantidade: 22,
        valor: 79.90
    },

    {
        codigo: 1006,
        descricao: "Cabo USB-C",
        categoria: "Eletrônicos",
        quantidade: 50,
        valor: 19.90
    },

    {
        codigo: 1007,
        descricao: "Lâmpada LED Inteligente",
        categoria: "Casa",
        quantidade: 15,
        valor: 45.90
    },

    {
        codigo: 1008,
        descricao: "Organizador de Cabos",
        categoria: "Casa",
        quantidade: 60,
        valor: 12.90
    },

    {
        codigo: 1009,
        descricao: "Garrafa Térmica",
        categoria: "Casa",
        quantidade: 25,
        valor: 49.90
    },

    {
        codigo: 1010,
        descricao: "Kit de Panelas",
        categoria: "Casa",
        quantidade: 7,
        valor: 189.90
    },

    {
        codigo: 1011,
        descricao: "Copo Térmico",
        categoria: "Casa",
        quantidade: 30,
        valor: 39.90
    },

    {
        codigo: 1012,
        descricao: "Almofada Decorativa",
        categoria: "Casa",
        quantidade: 16,
        valor: 34.90
    },

    {
        codigo: 1013,
        descricao: "Camiseta Básica Masculina",
        categoria: "Roupas",
        quantidade: 45,
        valor: 39.90
    },

    {
        codigo: 1014,
        descricao: "Calça Jeans Masculina",
        categoria: "Roupas",
        quantidade: 20,
        valor: 89.90
    },

    {
        codigo: 1015,
        descricao: "Vestido Feminino",
        categoria: "Roupas",
        quantidade: 14,
        valor: 79.90
    },

    {
        codigo: 1016,
        descricao: "Moletom Unissex",
        categoria: "Roupas",
        quantidade: 9,
        valor: 99.90
    },

    {
        codigo: 1017,
        descricao: "Short Esportivo",
        categoria: "Roupas",
        quantidade: 28,
        valor: 44.90
    },

    {
        codigo: 1018,
        descricao: "Jaqueta Feminina",
        categoria: "Roupas",
        quantidade: 6,
        valor: 119.90
    },

    {
        codigo: 1019,
        descricao: "Tênis Esportivo",
        categoria: "Calçados",
        quantidade: 13,
        valor: 159.90
    },

    {
        codigo: 1020,
        descricao: "Tênis Casual",
        categoria: "Calçados",
        quantidade: 8,
        valor: 119.90
    },

    {
        codigo: 1021,
        descricao: "Sandália Feminina",
        categoria: "Calçados",
        quantidade: 17,
        valor: 69.90
    },

    {
        codigo: 1022,
        descricao: "Chinelo Masculino",
        categoria: "Calçados",
        quantidade: 32,
        valor: 29.90
    },

    {
        codigo: 1023,
        descricao: "Bota Masculina",
        categoria: "Calçados",
        quantidade: 5,
        valor: 179.90
    },

    {
        codigo: 1024,
        descricao: "Rasteirinha Feminina",
        categoria: "Calçados",
        quantidade: 21,
        valor: 49.90
    },

    {
        codigo: 1025,
        descricao: "Mochila Escolar",
        categoria: "Acessórios",
        quantidade: 24,
        valor: 69.90
    },

    {
        codigo: 1026,
        descricao: "Bolsa Feminina",
        categoria: "Acessórios",
        quantidade: 11,
        valor: 89.90
    },

    {
        codigo: 1027,
        descricao: "Carteira Masculina",
        categoria: "Acessórios",
        quantidade: 19,
        valor: 39.90
    },

    {
        codigo: 1028,
        descricao: "Óculos de Sol",
        categoria: "Acessórios",
        quantidade: 27,
        valor: 49.90
    },

    {
        codigo: 1029,
        descricao: "Boné Esportivo",
        categoria: "Acessórios",
        quantidade: 23,
        valor: 34.90
    },

    {
        codigo: 1030,
        descricao: "Relógio Masculino",
        categoria: "Acessórios",
        quantidade: 4,
        valor: 109.90
    },

    {
        codigo: 1031,
        descricao: "Teclado Gamer",
        categoria: "Informática",
        quantidade: 10,
        valor: 149.90
    },

    {
        codigo: 1032,
        descricao: "Mouse Gamer",
        categoria: "Informática",
        quantidade: 18,
        valor: 89.90
    },

    {
        codigo: 1033,
        descricao: "Mouse Pad Gamer",
        categoria: "Informática",
        quantidade: 35,
        valor: 39.90
    },

    {
        codigo: 1034,
        descricao: "Webcam HD",
        categoria: "Informática",
        quantidade: 7,
        valor: 119.90
    },

    {
        codigo: 1035,
        descricao: "Headset Gamer",
        categoria: "Informática",
        quantidade: 13,
        valor: 159.90
    },

    {
        codigo: 1036,
        descricao: "Suporte para Notebook",
        categoria: "Informática",
        quantidade: 16,
        valor: 69.90
    },

    {
        codigo: 1037,
        descricao: "Kit de Maquiagem",
        categoria: "Beleza",
        quantidade: 20,
        valor: 79.90
    },

    {
        codigo: 1038,
        descricao: "Secador de Cabelo",
        categoria: "Beleza",
        quantidade: 9,
        valor: 129.90
    },

    {
        codigo: 1039,
        descricao: "Escova Secadora",
        categoria: "Beleza",
        quantidade: 6,
        valor: 149.90
    },

    {
        codigo: 1040,
        descricao: "Perfume Feminino",
        categoria: "Beleza",
        quantidade: 15,
        valor: 99.90
    }

];


// =====================================================
// CADASTRAR PRODUTO
// =====================================================

document
    .getElementById("formProduto")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const codigo =
            Number(
                document.getElementById("codigo").value
            );


        const descricao =
            document.getElementById("descricao").value;


        const categoria =
            document.getElementById("categoria").value;


        const quantidade =
            Number(
                document.getElementById("quantidade").value
            );


        const valor =
            Number(
                document.getElementById("valor").value
            );


        // Verifica código repetido

        const existe =
            produtos.some(function(produto) {

                return produto.codigo === codigo;

            });


        if (existe) {

            alert(
                "Já existe um produto com esse código!"
            );

            return;
        }


        // Cria o produto

        const novoProduto = {

            codigo: codigo,

            descricao: descricao,

            categoria: categoria,

            quantidade: quantidade,

            valor: valor

        };


        produtos.push(novoProduto);


        alert(
            "Produto cadastrado com sucesso!"
        );


        document
            .getElementById("formProduto")
            .reset();


        listarProdutos();

    });


// =====================================================
// LISTAR PRODUTOS
// =====================================================

function listarProdutos() {

    const lista =
        document.getElementById("listaProdutos");


    const pesquisa =
        document
            .getElementById("pesquisa")
            .value
            .toLowerCase();


    const categoria =
        document
            .getElementById("filtroCategoria")
            .value;


    lista.innerHTML = "";


    // Filtra os produtos

    const produtosFiltrados =
        produtos.filter(function(produto) {

            const correspondeNome =
                produto.descricao
                    .toLowerCase()
                    .includes(pesquisa);


            const correspondeCategoria =
                categoria === "Todas" ||
                produto.categoria === categoria;


            return (
                correspondeNome &&
                correspondeCategoria
            );

        });


    // Atualiza contador

    document.getElementById("contador").textContent =
        `${produtosFiltrados.length} produtos`;


    // Caso não encontre

    if (produtosFiltrados.length === 0) {

        lista.innerHTML = `
            <p class="vazio">
                Nenhum produto encontrado.
            </p>
        `;

        atualizarPainel();

        return;
    }


    // Cria os cards

    produtosFiltrados.forEach(function(produto) {

        const div =
            document.createElement("div");


        div.classList.add("produto");


        let status;


        if (produto.quantidade <= 5) {

            status = `
                <div class="baixo">
                    ⚠️ Estoque baixo!
                </div>
            `;

        } else {

            status = `
                <div class="normal">
                    ✅ Estoque normal
                </div>
            `;

        }


        div.innerHTML = `

            <div class="produto-topo">

                <div>

                    <h3>
                        🛍️ ${produto.descricao}
                    </h3>

                    <p class="codigo">
                        Código: ${produto.codigo}
                    </p>

                </div>

            </div>


            <span class="categoria">
                ${produto.categoria}
            </span>


            <div class="informacoes">

                <div class="info">

                    <p>Quantidade</p>

                    <p>
                        📦 ${produto.quantidade}
                    </p>

                </div>


                <div class="info">

                    <p>Preço</p>

                    <p class="preco">
                        R$ ${produto.valor.toFixed(2)}
                    </p>

                </div>


                <div class="info">

                    <p>Valor em estoque</p>

                    <p class="preco">
                        R$
                        ${(produto.quantidade * produto.valor)
                            .toFixed(2)}
                    </p>

                </div>

            </div>


            ${status}


            <button
                class="excluir"
                onclick="excluirProduto(${produto.codigo})">

                🗑️ Excluir Produto

            </button>

        `;


        lista.appendChild(div);

    });


    atualizarPainel();

}


// =====================================================
// ATUALIZAR PAINEL
// =====================================================

function atualizarPainel() {


    // Total de produtos

    document.getElementById(
        "totalProdutos"
    ).textContent =
        produtos.length;


    // Total de itens

    let totalItens = 0;


    produtos.forEach(function(produto) {

        totalItens += produto.quantidade;

    });


    document.getElementById(
        "totalItens"
    ).textContent =
        totalItens;


    // Valor total

    let valorTotal = 0;


    produtos.forEach(function(produto) {

        valorTotal +=
            produto.quantidade *
            produto.valor;

    });


    document.getElementById(
        "valorEstoque"
    ).textContent =
        valorTotal.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );


    // Estoque baixo

    const quantidadeBaixa =
        produtos.filter(function(produto) {

            return produto.quantidade <= 5;

        }).length;


    document.getElementById(
        "estoqueBaixo"
    ).textContent =
        quantidadeBaixa;

}


// =====================================================
// ALTERAR VALOR
// =====================================================

function alterarValor() {


    const codigo =
        Number(
            document.getElementById(
                "codigoAlterar"
            ).value
        );


    const produto =
        produtos.find(function(produto) {

            return produto.codigo === codigo;

        });


    if (!produto) {

        alert(
            "Produto não encontrado!"
        );

        return;
    }


    const novoValor =
        Number(
            prompt(
                `Novo valor para ${produto.descricao}:`
            )
        );


    if (
        isNaN(novoValor) ||
        novoValor < 0
    ) {

        alert(
            "Digite um valor válido!"
        );

        return;
    }


    produto.valor = novoValor;


    alert(
        "Valor alterado com sucesso!"
    );


    listarProdutos();

}


// =====================================================
// ALTERAR QUANTIDADE
// =====================================================

function alterarQuantidade() {


    const codigo =
        Number(
            document.getElementById(
                "codigoAlterar"
            ).value
        );


    const produto =
        produtos.find(function(produto) {

            return produto.codigo === codigo;

        });


    if (!produto) {

        alert(
            "Produto não encontrado!"
        );

        return;
    }


    const novaQuantidade =
        Number(
            prompt(
                `Nova quantidade para ${produto.descricao}:`
            )
        );


    if (
        isNaN(novaQuantidade) ||
        novaQuantidade < 0
    ) {

        alert(
            "Digite uma quantidade válida!"
        );

        return;
    }


    produto.quantidade =
        novaQuantidade;


    alert(
        "Quantidade alterada com sucesso!"
    );


    listarProdutos();

}


// =====================================================
// EXCLUIR PRODUTO
// =====================================================

function excluirProduto(codigo) {


    const produto =
        produtos.find(function(produto) {

            return produto.codigo === codigo;

        });


    if (!produto) {

        alert(
            "Produto não encontrado!"
        );

        return;
    }


    const confirmar =
        confirm(
            `Deseja excluir "${produto.descricao}"?`
        );


    if (!confirmar) {

        return;
    }


    produtos =
        produtos.filter(function(produto) {

            return produto.codigo !== codigo;

        });


    alert(
        "Produto excluído com sucesso!"
    );


    listarProdutos();

}


// =====================================================
// INICIA O SISTEMA
// =====================================================

listarProdutos();
