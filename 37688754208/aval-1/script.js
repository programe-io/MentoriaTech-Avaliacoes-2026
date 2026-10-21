"use strict";

// Recupera os produtos salvos no navegador.
let produtos = [];

try {
    const dadosSalvos = localStorage.getItem("produtosEstoque");
    const dados = dadosSalvos ? JSON.parse(dadosSalvos) : [];

    if (Array.isArray(dados)) {
        produtos = dados.filter((produto) =>
            produto &&
            Number.isInteger(produto.codigo) &&
            typeof produto.descricao === "string" &&
            Number.isInteger(produto.quantidade) &&
            Number.isFinite(produto.valor) &&
            produto.quantidade >= 1 &&
            produto.valor >= 0
        );
    }
} catch (erro) {
    console.error("Não foi possível carregar os produtos:", erro);
}

let codigoAtual = produtos.reduce(
    (maior, produto) => Math.max(maior, produto.codigo),
    0
) + 1;

let codigoEmEdicao = null;

// Elementos da página.
const formProduto = document.getElementById("formProduto");
const campoDescricao = document.getElementById("descricao");
const campoQuantidade = document.getElementById("quantidade");
const campoValor = document.getElementById("valor");
const listaProdutos = document.getElementById("listaProdutos");
const campoBusca = document.getElementById("busca");
const tituloFormulario = document.getElementById("tituloFormulario");
const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");
const mensagemVazia = document.getElementById("mensagemVazia");

// Formata valores em reais.
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Salva os produtos no armazenamento local.
function salvarProdutos() {
    try {
        localStorage.setItem(
            "produtosEstoque",
            JSON.stringify(produtos)
        );
    } catch (erro) {
        alert("Não foi possível salvar os dados neste navegador.");
        console.error(erro);
    }
}

// Valida os dados de um produto.
function validarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
        throw new Error(
            "A descrição deve ter pelo menos cinco caracteres."
        );
    }

    if (
        !Number.isInteger(quantidade) ||
        quantidade < 1
    ) {
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

// Busca um produto pelo código.
function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find(
        (produto) => produto.codigo === codigoProduto
    );
}

// Cadastra um novo produto.
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: codigoAtual++,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    salvarProdutos();
    listarProdutos();

    return novoProduto;
}

// Lista os produtos na tabela.
function listarProdutos() {
    const termo = campoBusca.value.trim().toLowerCase();

    const produtosFiltrados = produtos.filter((produto) =>
        produto.descricao.toLowerCase().includes(termo) ||
        String(produto.codigo).includes(termo)
    );

    listaProdutos.replaceChildren();

    produtosFiltrados.forEach((produto) => {
        const linha = document.createElement("tr");

        function adicionarCelula(texto) {
            const celula = document.createElement("td");
            celula.textContent = texto;
            linha.appendChild(celula);
            return celula;
        }

        adicionarCelula(String(produto.codigo));
        adicionarCelula(produto.descricao);
        adicionarCelula(String(produto.quantidade));
        adicionarCelula(formatarMoeda(produto.valor));

        adicionarCelula(
            formatarMoeda(produto.quantidade * produto.valor)
        );

        const celulaAcoes = document.createElement("td");
        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.className = "btn-editar";
        btnEditar.dataset.acao = "editar";
        btnEditar.dataset.codigo = produto.codigo;

        const btnEstoque = document.createElement("button");
        btnEstoque.textContent = "+ Estoque";
        btnEstoque.className = "btn-estoque";
        btnEstoque.dataset.acao = "estoque";
        btnEstoque.dataset.codigo = produto.codigo;

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "btn-excluir";
        btnExcluir.dataset.acao = "excluir";
        btnExcluir.dataset.codigo = produto.codigo;

        acoes.append(btnEditar, btnEstoque, btnExcluir);
        celulaAcoes.appendChild(acoes);
        linha.appendChild(celulaAcoes);

        listaProdutos.appendChild(linha);
    });

    mensagemVazia.hidden = produtosFiltrados.length > 0;
    mensagemVazia.textContent = produtos.length === 0
        ? "Nenhum produto cadastrado."
        : "Nenhum produto encontrado.";

    atualizarResumo();
}

// Atualiza os cartões do painel.
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

// Prepara o formulário para editar um produto.
function iniciarEdicao(codigoProduto) {
    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    codigoEmEdicao = codigoProduto;

    campoDescricao.value = produto.descricao;
    campoQuantidade.value = produto.quantidade;
    campoValor.value = produto.valor;

    // Na edição, a quantidade não será alterada.
    campoQuantidade.disabled = true;
    campoQuantidade.required = false;

    tituloFormulario.textContent =
        "Editar produto #" + produto.codigo;

    btnSalvar.textContent = "Salvar alterações";
    btnCancelar.hidden = false;

    formProduto.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// Cancela a edição e limpa o formulário.
function cancelarEdicao() {
    codigoEmEdicao = null;

    formProduto.reset();

    campoQuantidade.disabled = false;
    campoQuantidade.required = true;

    tituloFormulario.textContent = "Cadastrar produto";
    btnSalvar.textContent = "Cadastrar produto";
    btnCancelar.hidden = true;
}

// Atualiza a descrição e o valor de um produto.
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

    salvarProdutos();
    listarProdutos();
}

// Adiciona unidades à quantidade existente.
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (
        !Number.isInteger(novaQuantidade) ||
        novaQuantidade < 1
    ) {
        throw new Error(
            "A quantidade adicionada deve ser um inteiro maior que zero."
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

// Processa o cadastro ou a edição.
formProduto.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const descricao = campoDescricao.value.trim();
    const quantidade = Number(campoQuantidade.value);
    const valor = Number(campoValor.value);

    try {
        if (codigoEmEdicao !== null) {
            // Na edição, validamos a descrição e o valor.
            if (descricao.length < 5) {
                throw new Error(
                    "A descrição deve ter pelo menos cinco caracteres."
                );
            }

            atualizarValor(codigoEmEdicao, valor);

            const produto = buscarProdutoPorCodigo(codigoEmEdicao);
            produto.descricao = descricao;

            salvarProdutos();
            listarProdutos();

            alert("Produto atualizado com sucesso!");
        } else {
            validarProduto(descricao, quantidade, valor);

            cadastrarProduto(descricao, quantidade, valor);

            alert("Produto cadastrado com sucesso!");
        }

        cancelarEdicao();
    } catch (erro) {
        alert(erro.message);
    }
});

// Trata os botões de ação da tabela.
listaProdutos.addEventListener("click", function (evento) {
    const botao = evento.target.closest("button[data-acao]");

    if (!botao || !listaProdutos.contains(botao)) {
        return;
    }

    const codigo = Number(botao.dataset.codigo);
    const acao = botao.dataset.acao;

    try {
        if (acao === "editar") {
            iniciarEdicao(codigo);
        }

        if (acao === "estoque") {
            const quantidadeTexto = prompt(
                "Quantas unidades deseja adicionar ao estoque?"
            );

            if (quantidadeTexto === null) {
                return;
            }

            const quantidade = Number(quantidadeTexto);

            atualizarQuantidade(codigo, quantidade);

            alert("Estoque atualizado com sucesso!");
        }

        if (acao === "excluir") {
            const produto = buscarProdutoPorCodigo(codigo);

            if (!produto) {
                throw new Error("Produto não encontrado.");
            }

            const confirmar = confirm(
                'Deseja excluir o produto "' +
                produto.descricao + '"?'
            );

            if (!confirmar) {
                return;
            }

            produtos = produtos.filter(
                (item) => item.codigo !== codigo
            );

            salvarProdutos();
            listarProdutos();

            if (codigoEmEdicao === codigo) {
                cancelarEdicao();
            }

            alert("Produto excluído com sucesso!");
        }
    } catch (erro) {
        alert(erro.message);
    }
});

// Eventos de pesquisa e cancelamento.
campoBusca.addEventListener("input", listarProdutos);
btnCancelar.addEventListener("click", cancelarEdicao);

// Exibe os produtos salvos ao abrir a página.
listarProdutos();