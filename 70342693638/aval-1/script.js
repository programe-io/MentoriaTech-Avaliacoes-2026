
"use strict";

// Lista que armazena os produtos.
let produtos = carregarProdutos();

// Elementos da página.
const formulario = document.getElementById("form-produto");
const campoDescricao = document.getElementById("descricao");
const campoQuantidade = document.getElementById("quantidade");
const campoValor = document.getElementById("valor");
const listaProdutos = document.getElementById("lista-produtos");
const mensagem = document.getElementById("mensagem");

// Carrega os dados salvos no navegador.
function carregarProdutos() {
    try {
        return JSON.parse(
            localStorage.getItem("produtosEstoque")
        ) || [];
    } catch (erro) {
        return [];
    }
}

// Salva os produtos no navegador.
function salvarProdutos() {
    localStorage.setItem(
        "produtosEstoque",
        JSON.stringify(produtos)
    );
}

// Exibe uma mensagem para o usuário.
function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = tipo;
}

// Valida os dados do produto.
function validarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
        throw new Error(
            "A descrição deve ter pelo menos 5 caracteres."
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

// Cadastra um novo produto.
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const novoCodigo = produtos.length > 0
        ? Math.max(...produtos.map(p => p.codigo)) + 1
        : 1;

    const novoProduto = {
        codigo: novoCodigo,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    salvarProdutos();
    listarProdutos();
}

// Lista os produtos na tabela.
function listarProdutos() {
    listaProdutos.replaceChildren();

    produtos.forEach(function(produto) {
        const linha = document.createElement("tr");

        adicionarCelula(linha, produto.codigo);
        adicionarCelula(linha, produto.descricao);
        adicionarCelula(linha, produto.quantidade);
        adicionarCelula(linha, formatarMoeda(produto.valor));

        const celulaAcoes = document.createElement("td");

        const botaoValor = document.createElement("button");
        botaoValor.textContent = "Alterar valor";
        botaoValor.addEventListener("click", function() {
            solicitarNovoValor(produto.codigo);
        });

        const botaoQuantidade = document.createElement("button");
        botaoQuantidade.textContent = "Adicionar estoque";
        botaoQuantidade.addEventListener("click", function() {
            solicitarQuantidade(produto.codigo);
        });

        celulaAcoes.append(botaoValor, botaoQuantidade);
        linha.appendChild(celulaAcoes);
        listaProdutos.appendChild(linha);
    });

    atualizarResumo();
}

// Adiciona uma célula à tabela.
function adicionarCelula(linha, texto) {
    const celula = document.createElement("td");
    celula.textContent = texto;
    linha.appendChild(celula);
}

// Formata o valor como moeda brasileira.
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Atualiza os números do resumo.
function atualizarResumo() {
    document.getElementById("total-produtos").textContent =
        produtos.length;

    const totalUnidades = produtos.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    document.getElementById("total-unidades").textContent =
        totalUnidades;
}

// Busca um produto pelo código.
function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find(
        produto => produto.codigo === codigoProduto
    );
}

// Atualiza o valor de um produto.
function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error("O valor não pode ser negativo.");
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.valor = novoValor;

    salvarProdutos();
    listarProdutos();
}

// Adiciona unidades ao estoque existente.
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        throw new Error(
            "Informe uma quantidade inteira maior que zero."
        );
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.quantidade += novaQuantidade;

    salvarProdutos();
    listarProdutos();
}

// Solicita o novo valor do produto.
function solicitarNovoValor(codigo) {
    const produto = buscarProdutoPorCodigo(codigo);

    if (!produto) {
        mostrarMensagem("Produto não encontrado.", "erro");
        return;
    }

    const entrada = prompt(
        `Novo valor para ${produto.descricao}:`,
        produto.valor
    );

    if (entrada === null) return;

    if (entrada.trim() === "") {
        mostrarMensagem("Informe um valor válido.", "erro");
        return;
    }

    const novoValor = Number(entrada);

    try {
        atualizarValor(codigo, novoValor);
        mostrarMensagem("Valor atualizado com sucesso!", "sucesso");
    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
}

// Solicita quantas unidades serão adicionadas.
function solicitarQuantidade(codigo) {
    const produto = buscarProdutoPorCodigo(codigo);

    if (!produto) {
        mostrarMensagem("Produto não encontrado.", "erro");
        return;
    }

    const entrada = prompt(
        `Quantas unidades deseja adicionar a ${produto.descricao}?`
    );

    if (entrada === null) return;

    if (entrada.trim() === "") {
        mostrarMensagem("Informe uma quantidade válida.", "erro");
        return;
    }

    const quantidade = Number(entrada);

    try {
        atualizarQuantidade(codigo, quantidade);
        mostrarMensagem("Estoque atualizado com sucesso!", "sucesso");
    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
}

// Evento de cadastro do formulário.
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const descricao = campoDescricao.value;
    const quantidade = Number(campoQuantidade.value);
    const valor = Number(campoValor.value);

    try {
        cadastrarProduto(descricao, quantidade, valor);

        mostrarMensagem(
            "Produto cadastrado com sucesso!",
            "sucesso"
        );

        formulario.reset();
        campoDescricao.focus();
    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
});

// Mostra os produtos quando a página abre.
listarProdutos();
