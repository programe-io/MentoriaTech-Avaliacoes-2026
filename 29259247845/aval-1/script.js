// ===============================
// BANCO DE PRODUTOS
// ===============================

let produtos = [
    {
        codigo: 1,
        descricao: "Smartphone Básico",
        quantidade: 10,
        valor: 799.90
    },

    {
        codigo: 2,
        descricao: "Fone Bluetooth",
        quantidade: 15,
        valor: 99.90
    },

    {
        codigo: 3,
        descricao: "Teclado Gamer",
        quantidade: 8,
        valor: 149.90
    },

    {
        codigo: 4,
        descricao: "Mouse Sem Fio",
        quantidade: 20,
        valor: 59.90
    }
];


// ===============================
// CARRINHO
// ===============================

let carrinho = [];


// ===============================
// LISTAR PRODUTOS
// ===============================

function listarProdutos() {

    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    const pesquisa =
        document.getElementById("pesquisa").value.toLowerCase();

    const produtosFiltrados = produtos.filter(produto =>
        produto.descricao.toLowerCase().includes(pesquisa)
    );

    produtosFiltrados.forEach(produto => {

        const card = document.createElement("div");

        card.className = "card";

        let statusEstoque;

        if (produto.quantidade > 0) {

            statusEstoque =
                `<p class="estoque">
                    ✅ ${produto.quantidade} unidades disponíveis
                </p>`;

        } else {

            statusEstoque =
                `<p class="sem-estoque">
                    ❌ Produto sem estoque
                </p>`;
        }


        card.innerHTML = `

            <div class="imagem-produto">
                📦
            </div>

            <p class="codigo">
                Código: ${produto.codigo}
            </p>

            <h3>
                ${produto.descricao}
            </h3>

            <p class="preco">
                R$ ${produto.valor.toFixed(2)}
            </p>

            ${statusEstoque}

            <button
                class="comprar"
                onclick="adicionarCarrinho(${produto.codigo})"
                ${produto.quantidade === 0 ? "disabled" : ""}
            >
                🛒 Adicionar ao carrinho
            </button>

            <button
                class="editar"
                onclick="alterarValor(${produto.codigo})"
            >
                💰 Alterar valor
            </button>

            <button
                class="editar"
                onclick="alterarQuantidade(${produto.codigo})"
            >
                📦 Alterar quantidade
            </button>

            <button
                class="excluir"
                onclick="excluirProduto(${produto.codigo})"
            >
                🗑️ Excluir produto
            </button>
        `;

        lista.appendChild(card);
    });
}


// ===============================
// CADASTRAR PRODUTO
// ===============================

function cadastrarProduto() {

    const codigo =
        Number(document.getElementById("codigo").value);

    const descricao =
        document.getElementById("descricao").value;

    const quantidade =
        Number(document.getElementById("quantidade").value);

    const valor =
        Number(document.getElementById("valor").value);


    if (
        !codigo ||
        !descricao ||
        quantidade < 0 ||
        valor < 0
    ) {

        alert("Preencha todos os campos corretamente!");

        return;
    }


    const produtoExistente =
        produtos.find(produto =>
            produto.codigo === codigo
        );


    if (produtoExistente) {

        alert("Já existe um produto com esse código!");

        return;
    }


    const novoProduto = {

        codigo: codigo,

        descricao: descricao,

        quantidade: quantidade,

        valor: valor

    };


    produtos.push(novoProduto);


    alert("Produto cadastrado com sucesso!");


    limparFormulario();

    listarProdutos();
}


// ===============================
// ALTERAR VALOR
// ===============================

function alterarValor(codigo) {

    const produto =
        produtos.find(produto =>
            produto.codigo === codigo
        );


    if (!produto) return;


    const novoValor =
        prompt(
            `Digite o novo valor para ${produto.descricao}:`,
            produto.valor
        );


    if (novoValor === null) return;


    const valorNumerico =
        Number(novoValor);


    if (valorNumerico < 0 || isNaN(valorNumerico)) {

        alert("Valor inválido!");

        return;
    }


    produto.valor = valorNumerico;


    listarProdutos();

    atualizarCarrinho();
}


// ===============================
// ALTERAR QUANTIDADE
// ===============================

function alterarQuantidade(codigo) {

    const produto =
        produtos.find(produto =>
            produto.codigo === codigo
        );


    if (!produto) return;


    const novaQuantidade =
        prompt(
            `Digite a nova quantidade de ${produto.descricao}:`,
            produto.quantidade
        );


    if (novaQuantidade === null) return;


    const quantidadeNumerica =
        Number(novaQuantidade);


    if (
        quantidadeNumerica < 0 ||
        !Number.isInteger(quantidadeNumerica)
    ) {

        alert("Digite uma quantidade inteira válida!");

        return;
    }


    produto.quantidade =
        quantidadeNumerica;


    listarProdutos();
}


// ===============================
// EXCLUIR PRODUTO
// ===============================

function excluirProduto(codigo) {

    const produto =
        produtos.find(produto =>
            produto.codigo === codigo
        );


    if (!produto) return;


    const confirmar =
        confirm(
            `Deseja excluir "${produto.descricao}"?`
        );


    if (!confirmar) return;


    produtos =
        produtos.filter(produto =>
            produto.codigo !== codigo
        );


    carrinho =
        carrinho.filter(item =>
            item.codigo !== codigo
        );


    listarProdutos();

    atualizarCarrinho();
}


// ===============================
// ADICIONAR AO CARRINHO
// ===============================

function adicionarCarrinho(codigo) {

    const produto =
        produtos.find(produto =>
            produto.codigo === codigo
        );


    if (!produto || produto.quantidade <= 0) {

        alert("Produto sem estoque!");

        return;
    }


    const item =
        carrinho.find(item =>
            item.codigo === codigo
        );


    if (item) {

        if (item.quantidade < produto.quantidade) {

            item.quantidade++;

        } else {

            alert("Quantidade máxima disponível no estoque!");

            return;
        }

    } else {

        carrinho.push({

            codigo: produto.codigo,

            descricao: produto.descricao,

            valor: produto.valor,

            quantidade: 1

        });
    }


    atualizarCarrinho();
}


// ===============================
// ATUALIZAR CARRINHO
// ===============================

function atualizarCarrinho() {

    const lista =
        document.getElementById("listaCarrinho");

    const contador =
        document.getElementById("contadorCarrinho");

    const totalElemento =
        document.getElementById("totalCarrinho");


    lista.innerHTML = "";


    let total = 0;

    let quantidadeTotal = 0;


    if (carrinho.length === 0) {

        lista.innerHTML =
            "<p>Seu carrinho está vazio.</p>";

    }


    carrinho.forEach(item => {

        const subtotal =
            item.valor * item.quantidade;


        total += subtotal;

        quantidadeTotal += item.quantidade;


        const div =
            document.createElement("div");

        div.className =
            "item-carrinho";


        div.innerHTML = `

            <span>
                ${item.descricao}
                (${item.quantidade}x)
            </span>

            <strong>
                R$ ${subtotal.toFixed(2)}
            </strong>

            <button
                onclick="removerCarrinho(${item.codigo})"
            >
                ❌
            </button>

        `;


        lista.appendChild(div);
    });


    contador.textContent =
        quantidadeTotal;


    totalElemento.textContent =
        total.toFixed(2);
}


// ===============================
// REMOVER DO CARRINHO
// ===============================

function removerCarrinho(codigo) {

    carrinho =
        carrinho.filter(item =>
            item.codigo !== codigo
        );


    atualizarCarrinho();
}


// ===============================
// FINALIZAR COMPRA
// ===============================

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio!");

        return;
    }


    carrinho.forEach(item => {

        const produto =
            produtos.find(produto =>
                produto.codigo === item.codigo
            );


        if (produto) {

            produto.quantidade -=
                item.quantidade;
        }
    });


    alert(
        "🎉 Compra realizada com sucesso!\n\nObrigado por comprar na Amazon Pobre!"
    );


    carrinho = [];


    listarProdutos();

    atualizarCarrinho();
}


// ===============================
// LIMPAR FORMULÁRIO
// ===============================

function limparFormulario() {

    document.getElementById("codigo").value = "";

    document.getElementById("descricao").value = "";

    document.getElementById("quantidade").value = "";

    document.getElementById("valor").value = "";
}


// ===============================
// PESQUISA
// ===============================

document
    .getElementById("pesquisa")
    .addEventListener("input", listarProdutos);


// ===============================
// BOTÃO DO BANNER
// ===============================

function irParaProdutos() {

    document
        .getElementById("produtos")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ===============================
// INICIAR SISTEMA
// ===============================

listarProdutos();

atualizarCarrinho();
