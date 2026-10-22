
let produtos = [];
let proximoCodigo = 1;

// Elementos da página
const formProduto = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");

// Formata os valores em reais
function formatarValor(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Valida os dados do produto
function validarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
        throw new Error(
            "A descrição deve ter, no mínimo, cinco caracteres."
        );
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error(
            "A quantidade deve ser um número inteiro maior que zero."
        );
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error(
            "O valor deve ser maior ou igual a zero."
        );
    }
}

// Cadastra um novo produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: proximoCodigo++,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    listarProdutos();
}

// Lista os produtos na tabela
function listarProdutos() {
    listaProdutos.replaceChildren();

    if (produtos.length === 0) {
        const linha = document.createElement("tr");
        const coluna = document.createElement("td");

        coluna.colSpan = 5;
        coluna.textContent = "Nenhum produto cadastrado.";

        linha.appendChild(coluna);
        listaProdutos.appendChild(linha);

        return;
    }

    produtos.forEach(function(produto) {
        const linha = document.createElement("tr");

        const codigo = document.createElement("td");
        codigo.textContent = produto.codigo;

        const descricao = document.createElement("td");
        descricao.textContent = produto.descricao;

        const quantidade = document.createElement("td");
        quantidade.textContent = produto.quantidade;

        const valor = document.createElement("td");
        valor.textContent = formatarValor(produto.valor);

        const acoes = document.createElement("td");
        acoes.className = "acoes";

        const botaoValor = document.createElement("button");
        botaoValor.textContent = "Alterar valor";
        botaoValor.className = "botao-valor";

        botaoValor.addEventListener("click", function() {
            solicitarNovoValor(produto.codigo);
        });

        const botaoQuantidade = document.createElement("button");
        botaoQuantidade.textContent = "Adicionar estoque";
        botaoQuantidade.className = "botao-quantidade";

        botaoQuantidade.addEventListener("click", function() {
            solicitarQuantidade(produto.codigo);
        });

        acoes.appendChild(botaoValor);
        acoes.appendChild(botaoQuantidade);

        linha.appendChild(codigo);
        linha.appendChild(descricao);
        linha.appendChild(quantidade);
        linha.appendChild(valor);
        linha.appendChild(acoes);

        listaProdutos.appendChild(linha);
    });
}

// Busca um produto pelo código
function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find(function(produto) {
        return produto.codigo === codigoProduto;
    });
}

// Atualiza o valor de um produto
function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error(
            "O valor deve ser maior ou igual a zero."
        );
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.valor = novoValor;

    listarProdutos();
}

// Adiciona unidades ao estoque existente
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        throw new Error(
            "A quantidade deve ser um número inteiro maior que zero."
        );
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.quantidade += novaQuantidade;

    listarProdutos();
}

// Solicita um novo valor
function solicitarNovoValor(codigoProduto) {
    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    const resposta = prompt(
        `Novo valor para ${produto.descricao}:`,
        produto.valor
    );

    if (resposta === null || resposta.trim() === "") {
        return;
    }

    const novoValor = Number(resposta.replace(",", "."));

    try {
        atualizarValor(codigoProduto, novoValor);
        alert("Valor atualizado com sucesso!");
    } catch (erro) {
        alert(erro.message);
    }
}

// Solicita uma quantidade para adicionar
function solicitarQuantidade(codigoProduto) {
    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    const resposta = prompt(
        `Quantas unidades deseja adicionar a ${produto.descricao}?`
    );

    if (resposta === null || resposta.trim() === "") {
        return;
    }

    const novaQuantidade = Number(resposta);

    try {
        atualizarQuantidade(codigoProduto, novaQuantidade);
        alert("Estoque atualizado com sucesso!");
    } catch (erro) {
        alert(erro.message);
    }
}

// Evento do formulário de cadastro
formProduto.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(
        document.getElementById("quantidade").value
    );
    const valor = Number(
        document.getElementById("valor").value
    );

    try {
        cadastrarProduto(descricao, quantidade, valor);

        alert("Produto cadastrado com sucesso!");

        formProduto.reset();
        document.getElementById("descricao").focus();

    } catch (erro) {
        alert(erro.message);
    }
});

// Exibe a lista inicial
listarProdutos();
