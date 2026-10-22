
let produtos = [];
let proximoCodigo = 1;

// Capturar os elementos do HTML
const formulario = document.getElementById("formProduto");
const campoDescricao = document.getElementById("descricao");
const campoQuantidade = document.getElementById("quantidade");
const campoValor = document.getElementById("valor");
const listaProdutos = document.getElementById("listaProdutos");
const contador = document.getElementById("contador");

// Cadastrar um novo produto
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const descricao = campoDescricao.value.trim();
    const quantidade = Number(campoQuantidade.value);
    const valor = Number(campoValor.value);

    // Validar a descrição
    if (descricao.length === 0) {
        alert("Informe a descrição do produto!");
        return;
    }

    // Validar a quantidade
    if (
        campoQuantidade.value.trim() === "" ||
        !Number.isInteger(quantidade) ||
        quantidade < 0
    ) {
        alert("Informe uma quantidade inteira igual ou maior que zero!");
        return;
    }

    // Validar o valor
    if (
        campoValor.value.trim() === "" ||
        !Number.isFinite(valor) ||
        valor < 0
    ) {
        alert("Informe um valor igual ou maior que zero!");
        return;
    }

    const produto = {
        codigo: proximoCodigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);
    proximoCodigo++;

    formulario.reset();

    listarProdutos();
});

// Listar os produtos cadastrados
function listarProdutos() {
    listaProdutos.replaceChildren();

    contador.textContent =
        "Total de produtos: " + produtos.length;

    if (produtos.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.textContent = "Nenhum produto cadastrado.";
        listaProdutos.appendChild(mensagem);
        return;
    }

    produtos.forEach(function(produto) {
        const cartao = document.createElement("article");
        cartao.className = "produto";

        const titulo = document.createElement("h3");
        titulo.textContent =
            "Código: " + produto.codigo +
            " - " + produto.descricao;

        const quantidade = document.createElement("p");
        quantidade.textContent =
            "Quantidade em estoque: " + produto.quantidade;

        const valor = document.createElement("p");
        valor.textContent =
            "Valor unitário: " +
            produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

        const total = document.createElement("p");
        total.textContent =
            "Valor total em estoque: " +
            (produto.quantidade * produto.valor)
                .toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                });

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const botaoValor = document.createElement("button");
        botaoValor.className = "btn-valor";
        botaoValor.textContent = "Alterar valor";

        botaoValor.addEventListener("click", function() {
            alterarValor(produto.codigo);
        });

        const botaoQuantidade = document.createElement("button");
        botaoQuantidade.className = "btn-quantidade";
        botaoQuantidade.textContent = "Alterar quantidade";

        botaoQuantidade.addEventListener("click", function() {
            alterarQuantidade(produto.codigo);
        });

        acoes.append(botaoValor, botaoQuantidade);

        cartao.append(
            titulo,
            quantidade,
            valor,
            total,
            acoes
        );

        listaProdutos.appendChild(cartao);
    });
}

// Alterar o valor de um produto
function alterarValor(codigo) {
    const produto = produtos.find(function(item) {
        return item.codigo === codigo;
    });

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    const novoValor = prompt(
        "Digite o novo valor do produto (R$):",
        produto.valor
    );

    if (novoValor === null) {
        return;
    }

    const texto = novoValor.trim();
    const valor = Number(texto);

    if (
        texto === "" ||
        !Number.isFinite(valor) ||
        valor < 0
    ) {
        alert("Informe um valor válido, igual ou maior que zero!");
        return;
    }

    produto.valor = valor;

    listarProdutos();
}

// Alterar a quantidade de um produto
function alterarQuantidade(codigo) {
    const produto = produtos.find(function(item) {
        return item.codigo === codigo;
    });

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    const novaQuantidade = prompt(
        "Digite a nova quantidade em estoque:",
        produto.quantidade
    );

    if (novaQuantidade === null) {
        return;
    }

    const texto = novaQuantidade.trim();
    const quantidade = Number(texto);

    if (
        texto === "" ||
        !Number.isInteger(quantidade) ||
        quantidade < 0
    ) {
        alert("Informe uma quantidade inteira igual ou maior que zero!");
        return;
    }

    produto.quantidade = quantidade;

    listarProdutos();
}

// Exibir a lista inicial
listarProdutos();
