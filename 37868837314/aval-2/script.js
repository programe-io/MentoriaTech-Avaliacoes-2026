
"use strict";

// ==========================================
// 1. ELEMENTOS DA PÁGINA
// ==========================================

const formProduto = document.getElementById("formProduto");
const campoDescricao = document.getElementById("descricao");
const campoQuantidade = document.getElementById("quantidade");
const campoValor = document.getElementById("valor");
const campoPesquisa = document.getElementById("pesquisa");
const listaProdutos = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");

const CHAVE_ESTOQUE = "estoqueProdutos";

// Carrega os dados já salvos.
let produtos = carregarProdutos();


// ==========================================
// 2. ARMAZENAMENTO LOCAL
// ==========================================

function carregarProdutos() {
    try {
        const dados = localStorage.getItem(CHAVE_ESTOQUE);
        const lista = dados ? JSON.parse(dados) : [];

        if (!Array.isArray(lista)) {
            return [];
        }

        return lista.filter(produto =>
            produto &&
            Number.isSafeInteger(produto.codigo) &&
            produto.codigo > 0 &&
            typeof produto.descricao === "string" &&
            produto.descricao.trim().length >= 5 &&
            produto.descricao.trim().length <= 120 &&
            Number.isSafeInteger(produto.quantidade) &&
            produto.quantidade >= 1 &&
            Number.isFinite(produto.valor) &&
            produto.valor >= 0
        );
    } catch (erro) {
        return [];
    }
}

function salvarProdutos() {
    try {
        localStorage.setItem(
            CHAVE_ESTOQUE,
            JSON.stringify(produtos)
        );
    } catch (erro) {
        throw new Error(
            "Não foi possível salvar. Verifique o armazenamento do navegador."
        );
    }
}


// ==========================================
// 3. MENSAGENS E FORMATAÇÃO
// ==========================================

function exibirMensagem(texto, tipo = "sucesso") {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


// ==========================================
// 4. VALIDAÇÃO DO PRODUTO
// ==========================================

function validarProduto(descricao, quantidade, valor) {
    if (typeof descricao !== "string") {
        throw new Error("Informe uma descrição válida.");
    }

    const descricaoLimpa = descricao.trim();

    if (descricaoLimpa.length < 5 ||
        descricaoLimpa.length > 120) {
        throw new Error(
            "A descrição deve ter entre 5 e 120 caracteres."
        );
    }

    if (!Number.isSafeInteger(quantidade) ||
        quantidade < 1) {
        throw new Error(
            "A quantidade deve ser um número inteiro maior que zero."
        );
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error(
            "O valor deve ser um número maior ou igual a zero."
        );
    }
}


// ==========================================
// 5. BUSCA E CÓDIGO AUTOMÁTICO
// ==========================================

function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find(
        produto => produto.codigo === codigoProduto
    );
}

function gerarCodigo() {
    const maiorCodigo = produtos.reduce(
        (maior, produto) => Math.max(maior, produto.codigo),
        0
    );

    if (maiorCodigo >= Number.MAX_SAFE_INTEGER) {
        throw new Error("Não foi possível gerar outro código.");
    }

    return maiorCodigo + 1;
}


// ==========================================
// 6. CADASTRAR PRODUTO
// ==========================================

function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: gerarCodigo(),
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    try {
        salvarProdutos();
    } catch (erro) {
        produtos.pop();
        throw erro;
    }

    return novoProduto;
}


// ==========================================
// 7. CRIAR ELEMENTOS DA TABELA
// ==========================================

function adicionarCelula(linha, valor) {
    const celula = document.createElement("td");
    celula.textContent = String(valor);
    linha.appendChild(celula);
}

function criarBotao(container, texto, classe, acao) {
    const botao = document.createElement("button");

    botao.type = "button";
    botao.textContent = texto;
    botao.className = classe;
    botao.addEventListener("click", acao);

    container.appendChild(botao);
}


// ==========================================
// 8. LISTAR E PESQUISAR PRODUTOS
// ==========================================

function listarProdutos(termo = "") {
    listaProdutos.replaceChildren();

    const busca = termo.trim().toLocaleLowerCase("pt-BR");

    const filtrados = produtos.filter(produto =>
        String(produto.codigo).includes(busca) ||
        produto.descricao
            .toLocaleLowerCase("pt-BR")
            .includes(busca)
    );

    if (filtrados.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 6;
        celula.className = "vazio";
        celula.textContent = produtos.length === 0
            ? "Nenhum produto cadastrado."
            : "Nenhum produto encontrado.";

        linha.appendChild(celula);
        listaProdutos.appendChild(linha);

        atualizarResumo();
        return;
    }

    filtrados.forEach(produto => {
        const linha = document.createElement("tr");

        adicionarCelula(linha, produto.codigo);
        adicionarCelula(linha, produto.descricao);
        adicionarCelula(linha, produto.quantidade);
        adicionarCelula(linha, formatarMoeda(produto.valor));

        adicionarCelula(
            linha,
            formatarMoeda(produto.quantidade * produto.valor)
        );

        const celulaAcoes = document.createElement("td");
        const acoes = document.createElement("div");
        acoes.className = "acoes";

        criarBotao(
            acoes,
            "Editar valor",
            "botao botao-editar",
            () => editarValor(produto.codigo)
        );

        criarBotao(
            acoes,
            "Entrada",
            "botao botao-estoque",
            () => adicionarEstoque(produto.codigo)
        );

        criarBotao(
            acoes,
            "Excluir",
            "botao botao-excluir",
            () => excluirProduto(produto.codigo)
        );

        celulaAcoes.appendChild(acoes);
        linha.appendChild(celulaAcoes);
        listaProdutos.appendChild(linha);
    });

    atualizarResumo();
}


// ==========================================
// 9. RESUMO DO ESTOQUE
// ==========================================

function atualizarResumo() {
    const totalProdutos = produtos.length;

    const totalUnidades = produtos.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    const valorEstoque = produtos.reduce(
        (total, produto) =>
            total + produto.quantidade * produto.valor,
        0
    );

    document.getElementById("totalProdutos").textContent =
        totalProdutos;

    document.getElementById("totalUnidades").textContent =
        totalUnidades;

    document.getElementById("valorEstoque").textContent =
        formatarMoeda(valorEstoque);
}


// ==========================================
// 10. ATUALIZAR VALOR
// ==========================================

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

    const valorAnterior = produto.valor;
    produto.valor = novoValor;

    try {
        salvarProdutos();
    } catch (erro) {
        produto.valor = valorAnterior;
        throw erro;
    }

    listarProdutos(campoPesquisa.value);
}

function editarValor(codigoProduto) {
    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        exibirMensagem("Produto não encontrado.", "erro");
        return;
    }

    const resposta = prompt(
        `Novo valor de ${produto.descricao}:`,
        String(produto.valor)
    );

    if (resposta === null) {
        return;
    }

    const texto = resposta.trim().replace(",", ".");
    const novoValor = texto === "" ? NaN : Number(texto);

    try {
        atualizarValor(codigoProduto, novoValor);
        exibirMensagem("Valor atualizado com sucesso!");
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
}


// ==========================================
// 11. ATUALIZAR QUANTIDADE
// ==========================================

function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (!Number.isSafeInteger(novaQuantidade) ||
        novaQuantidade < 1) {
        throw new Error(
            "Informe uma quantidade inteira maior que zero."
        );
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    const quantidadeFinal = produto.quantidade + novaQuantidade;

    if (!Number.isSafeInteger(quantidadeFinal)) {
        throw new Error("Quantidade final fora do limite permitido.");
    }

    const quantidadeAnterior = produto.quantidade;
    produto.quantidade = quantidadeFinal;

    try {
        salvarProdutos();
    } catch (erro) {
        produto.quantidade = quantidadeAnterior;
        throw erro;
    }

    listarProdutos(campoPesquisa.value);
}

function adicionarEstoque(codigoProduto) {
    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        exibirMensagem("Produto não encontrado.", "erro");
        return;
    }

    const resposta = prompt(
        `Quantas unidades deseja adicionar a ${produto.descricao}?`
    );

    if (resposta === null) {
        return;
    }

    const texto = resposta.trim();
    const quantidade = /^\d+$/.test(texto)
        ? Number(texto)
        : NaN;

    try {
        atualizarQuantidade(codigoProduto, quantidade);
        exibirMensagem("Entrada de estoque registrada!");
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
}


// ==========================================
// 12. EXCLUIR PRODUTO
// ==========================================

function excluirProduto(codigoProduto) {
    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        exibirMensagem("Produto não encontrado.", "erro");
        return;
    }

    const confirmar = confirm(
        `Deseja excluir "${produto.descricao}"?`
    );

    if (!confirmar) {
        return;
    }

    const indice = produtos.findIndex(
        item => item.codigo === codigoProduto
    );

    const removido = produtos.splice(indice, 1)[0];

    try {
        salvarProdutos();
    } catch (erro) {
        produtos.splice(indice, 0, removido);
        exibirMensagem(erro.message, "erro");
        return;
    }

    listarProdutos(campoPesquisa.value);
    exibirMensagem("Produto excluído com sucesso!");
}


// ==========================================
// 13. EVENTO DE CADASTRO
// ==========================================

formProduto.addEventListener("submit", evento => {
    evento.preventDefault();

    const descricao = campoDescricao.value;
    const quantidade = campoQuantidade.value.trim() === ""
        ? NaN
        : Number(campoQuantidade.value);

    const valor = campoValor.value.trim() === ""
        ? NaN
        : Number(campoValor.value);

    try {
        const produto = cadastrarProduto(
            descricao,
            quantidade,
            valor
        );

        listarProdutos(campoPesquisa.value);
        formProduto.reset();

        exibirMensagem(
            `Produto cadastrado! Código: ${produto.codigo}.`
        );

        campoDescricao.focus();
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
});


// ==========================================
// 14. EVENTO DE PESQUISA
// ==========================================

campoPesquisa.addEventListener("input", () => {
    listarProdutos(campoPesquisa.value);
});


// ==========================================
// 15. INICIALIZAÇÃO
// ==========================================

listarProdutos();
