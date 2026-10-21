
"use strict";

// ========================================
// 1. DADOS DO SISTEMA
// ========================================

const CHAVE_ESTOQUE = "stockProProdutos";

function carregarProdutos() {
    try {
        const dados = localStorage.getItem(CHAVE_ESTOQUE);
        const produtosSalvos = dados ? JSON.parse(dados) : [];

        if (!Array.isArray(produtosSalvos)) {
            return [];
        }

        return produtosSalvos.filter((produto) =>
            produto &&
            Number.isInteger(produto.codigo) &&
            typeof produto.descricao === "string" &&
            typeof produto.categoria === "string" &&
            Number.isInteger(produto.quantidade) &&
            produto.quantidade >= 1 &&
            Number.isFinite(produto.preco) &&
            produto.preco >= 0
        );
    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
        return [];
    }
}

let produtos = carregarProdutos();

let proximoCodigo = produtos.reduce(
    (maior, produto) => Math.max(maior, produto.codigo),
    0
) + 1;

// ========================================
// 2. ELEMENTOS HTML
// ========================================

const form = document.getElementById("formProduto");
const campoCodigo = document.getElementById("codigo");
const campoDescricao = document.getElementById("descricao");
const campoCategoria = document.getElementById("categoria");
const campoQuantidade = document.getElementById("quantidade");
const campoPreco = document.getElementById("preco");

const tabela = document.getElementById("tabelaProdutos");
const pesquisa = document.getElementById("pesquisa");
const filtroCategoria = document.getElementById("filtroCategoria");

const tituloFormulario = document.getElementById("tituloFormulario");
const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");
const mensagemVazia = document.getElementById("mensagemVazia");

// ========================================
// 3. FUNÇÕES AUXILIARES
// ========================================

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function salvarProdutos() {
    try {
        localStorage.setItem(
            CHAVE_ESTOQUE,
            JSON.stringify(produtos)
        );
        return true;
    } catch (erro) {
        console.error("Erro ao salvar produtos:", erro);
        alert("Não foi possível salvar os dados no navegador.");
        return false;
    }
}

function buscarProdutoPorCodigo(codigo) {
    return produtos.find(
        (produto) => produto.codigo === codigo
    );
}

function validarProduto(descricao, categoria, quantidade, preco) {
    if (descricao.trim().length < 5) {
        throw new Error(
            "O nome deve possuir pelo menos cinco caracteres."
        );
    }

    if (!categoria) {
        throw new Error("Selecione uma categoria.");
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error(
            "A quantidade deve ser um número inteiro maior que zero."
        );
    }

    if (!Number.isFinite(preco) || preco < 0) {
        throw new Error(
            "O preço deve ser maior ou igual a zero."
        );
    }
}

// ========================================
// 4. CADASTRAR PRODUTO
// ========================================

function cadastrarProduto(descricao, categoria, quantidade, preco) {
    validarProduto(descricao, categoria, quantidade, preco);

    const novoProduto = {
        codigo: proximoCodigo,
        descricao: descricao.trim(),
        categoria: categoria,
        quantidade: quantidade,
        preco: preco
    };

    produtos.push(novoProduto);

    if (!salvarProdutos()) {
        produtos.pop();
        return false;
    }

    proximoCodigo++;
    listarProdutos();

    return true;
}

// ========================================
// 5. LISTAR E FILTRAR PRODUTOS
// ========================================

function listarProdutos() {
    const termo = pesquisa.value.trim().toLowerCase();
    const categoriaSelecionada = filtroCategoria.value;

    const filtrados = produtos.filter((produto) => {
        const correspondeNome =
            produto.descricao.toLowerCase().includes(termo) ||
            String(produto.codigo).includes(termo);

        const correspondeCategoria =
            !categoriaSelecionada ||
            produto.categoria === categoriaSelecionada;

        return correspondeNome && correspondeCategoria;
    });

    tabela.replaceChildren();

    filtrados.forEach((produto) => {
        const linha = document.createElement("tr");

        function criarCelula(texto, classe = "") {
            const td = document.createElement("td");
            td.textContent = texto;

            if (classe) {
                td.className = classe;
            }

            linha.appendChild(td);
            return td;
        }

        criarCelula(
            "#" + String(produto.codigo).padStart(3, "0"),
            "codigo"
        );

        criarCelula(produto.descricao, "produto-nome");
        criarCelula(produto.categoria);
        criarCelula(String(produto.quantidade));
        criarCelula(formatarMoeda(produto.preco));

        criarCelula(
            formatarMoeda(produto.quantidade * produto.preco)
        );

        const celulaStatus = criarCelula("");
        const etiqueta = document.createElement("span");

        if (produto.quantidade <= 5) {
            etiqueta.className = "status status-baixo";
            etiqueta.textContent = "Estoque baixo";
        } else {
            etiqueta.className = "status status-normal";
            etiqueta.textContent = "Disponível";
        }

        celulaStatus.appendChild(etiqueta);

        const celulaAcoes = criarCelula("");
        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const botoes = [
            {
                texto: "Editar",
                acao: "editar",
                classe: "btn-editar"
            },
            {
                texto: "+ Entrada",
                acao: "entrada",
                classe: "btn-entrada"
            },
            {
                texto: "Excluir",
                acao: "excluir",
                classe: "btn-excluir"
            }
        ];

        botoes.forEach((item) => {
            const botao = document.createElement("button");

            botao.type = "button";
            botao.textContent = item.texto;
            botao.className = "btn-acao " + item.classe;
            botao.dataset.acao = item.acao;
            botao.dataset.codigo = produto.codigo;

            acoes.appendChild(botao);
        });

        celulaAcoes.appendChild(acoes);
        tabela.appendChild(linha);
    });

    mensagemVazia.hidden = filtrados.length > 0;

    document.getElementById("contador").textContent =
        filtrados.length +
        (filtrados.length === 1 ? " produto" : " produtos");

    atualizarIndicadores();
}

// ========================================
// 6. INDICADORES DO DASHBOARD
// ========================================

function atualizarIndicadores() {
    const quantidadeProdutos = produtos.length;

    const quantidadeUnidades = produtos.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    const valorEstoque = produtos.reduce(
        (total, produto) =>
            total + produto.quantidade * produto.preco,
        0
    );

    const produtosComEstoqueBaixo = produtos.filter(
        (produto) => produto.quantidade <= 5
    ).length;

    document.getElementById("totalProdutos").textContent =
        quantidadeProdutos;

    document.getElementById("totalUnidades").textContent =
        quantidadeUnidades;

    document.getElementById("valorTotal").textContent =
        formatarMoeda(valorEstoque);

    document.getElementById("estoqueBaixo").textContent =
        produtosComEstoqueBaixo;
}

// ========================================
// 7. EDITAR PRODUTO
// ========================================

function editarProduto(codigo) {
    const produto = buscarProdutoPorCodigo(codigo);

    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    campoCodigo.value = produto.codigo;
    campoDescricao.value = produto.descricao;
    campoCategoria.value = produto.categoria;
    campoQuantidade.value = produto.quantidade;
    campoPreco.value = produto.preco;

    // Durante a edição, a quantidade não será alterada.
    campoQuantidade.disabled = true;

    tituloFormulario.textContent = "Editar produto";
    btnSalvar.textContent = "Salvar alterações";
    btnCancelar.hidden = false;

    document.getElementById("cadastro").scrollIntoView({
        behavior: "smooth"
    });
}

function cancelarEdicao() {
    form.reset();
    campoCodigo.value = "";
    campoQuantidade.disabled = false;

    tituloFormulario.textContent = "Cadastrar produto";
    btnSalvar.textContent = "Salvar produto";
    btnCancelar.hidden = true;
}

function atualizarProduto(codigo, descricao, categoria, preco) {
    const produto = buscarProdutoPorCodigo(codigo);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    if (descricao.trim().length < 5) {
        throw new Error(
            "O nome deve possuir pelo menos cinco caracteres."
        );
    }

    if (!categoria) {
        throw new Error("Selecione uma categoria.");
    }

    if (!Number.isFinite(preco) || preco < 0) {
        throw new Error("O preço deve ser maior ou igual a zero.");
    }

    const dadosAntigos = { ...produto };

    produto.descricao = descricao.trim();
    produto.categoria = categoria;
    produto.preco = preco;

    if (!salvarProdutos()) {
        Object.assign(produto, dadosAntigos);
        return false;
    }

    listarProdutos();
    return true;
}

// ========================================
// 8. ADICIONAR UNIDADES AO ESTOQUE
// ========================================

function atualizarQuantidade(codigo, quantidadeAdicionada) {
    if (
        !Number.isInteger(quantidadeAdicionada) ||
        quantidadeAdicionada < 1
    ) {
        throw new Error(
            "Informe uma quantidade inteira maior que zero."
        );
    }

    const produto = buscarProdutoPorCodigo(codigo);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    const quantidadeAntiga = produto.quantidade;
    produto.quantidade += quantidadeAdicionada;

    if (!salvarProdutos()) {
        produto.quantidade = quantidadeAntiga;
        return false;
    }

    listarProdutos();
    return true;
}

// ========================================
// 9. EXCLUIR PRODUTO
// ========================================

function excluirProduto(codigo) {
    const produto = buscarProdutoPorCodigo(codigo);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    const confirmacao = confirm(
        'Deseja excluir "' + produto.descricao + '"?'
    );

    if (!confirmacao) {
        return false;
    }

    const indice = produtos.findIndex(
        (item) => item.codigo === codigo
    );

    const removido = produtos.splice(indice, 1)[0];

    if (!salvarProdutos()) {
        produtos.splice(indice, 0, removido);
        return false;
    }

    listarProdutos();

    if (Number(campoCodigo.value) === codigo) {
        cancelarEdicao();
    }

    return true;
}

// ========================================
// 10. EVENTOS DO FORMULÁRIO
// ========================================

form.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const codigo = Number(campoCodigo.value);
    const descricao = campoDescricao.value.trim();
    const categoria = campoCategoria.value;
    const quantidade = Number(campoQuantidade.value);
    const preco = Number(campoPreco.value);

    try {
        if (campoCodigo.value !== "") {
            if (atualizarProduto(codigo, descricao, categoria, preco)) {
                cancelarEdicao();
                alert("Produto atualizado com sucesso!");
            }
        } else {
            if (cadastrarProduto(descricao, categoria, quantidade, preco)) {
                cancelarEdicao();
                alert("Produto cadastrado com sucesso!");
            }
        }
    } catch (erro) {
        alert(erro.message);
    }
});

// ========================================
// 11. EVENTOS DA TABELA
// ========================================

tabela.addEventListener("click", function(evento) {
    const botao = evento.target.closest("button[data-acao]");

    if (!botao || !tabela.contains(botao)) {
        return;
    }

    const codigo = Number(botao.dataset.codigo);

    try {
        switch (botao.dataset.acao) {
            case "editar":
                editarProduto(codigo);
                break;

            case "entrada": {
                const texto = prompt(
                    "Quantas unidades deseja adicionar ao estoque?"
                );

                if (texto === null) {
                    break;
                }

                const quantidade = Number(texto);

                if (atualizarQuantidade(codigo, quantidade)) {
                    alert("Estoque atualizado com sucesso!");
                }

                break;
            }

            case "excluir":
                excluirProduto(codigo);
                break;
        }
    } catch (erro) {
        alert(erro.message);
    }
});

// ========================================
// 12. PESQUISA E BOTÕES
// ========================================

pesquisa.addEventListener("input", listarProdutos);
filtroCategoria.addEventListener("change", listarProdutos);

btnCancelar.addEventListener("click", cancelarEdicao);

document.getElementById("novoProduto").addEventListener("click", () => {
    cancelarEdicao();
    document.getElementById("cadastro").scrollIntoView({
        behavior: "smooth"
    });
});

// ========================================
// 13. INICIALIZAÇÃO
// ========================================

listarProdutos();