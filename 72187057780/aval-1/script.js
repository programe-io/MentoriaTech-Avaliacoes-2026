
"use strict";

// Array que armazena os produtos.
const produtos = [];

// Elementos HTML.
const formProduto = document.getElementById("formProduto");
const formValor = document.getElementById("formValor");
const formQuantidade = document.getElementById("formQuantidade");

const campoDescricao = document.getElementById("descricao");
const campoQuantidade = document.getElementById("quantidade");
const campoValor = document.getElementById("valor");

const campoCodigoBusca = document.getElementById("codigoBusca");
const listaProdutos = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");

// Exibe mensagens na página.
function exibirMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = tipo;
}

// Valida descrição, quantidade e valor.
function validarProduto(descricao, quantidade, valor) {
    if (typeof descricao !== "string" ||
        descricao.trim().length < 5) {
        throw new Error(
            "A descrição deve ter, no mínimo, cinco caracteres."
        );
    }

    if (!Number.isSafeInteger(quantidade) || quantidade < 1) {
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
    const descricaoValidada = descricao.trim();

    validarProduto(descricaoValidada, quantidade, valor);

    const novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricaoValidada,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    return novoProduto;
}

// Retorna a lista de produtos.
function listarProdutos() {
    return produtos;
}

// Busca um produto pelo código.
function buscarProdutoPorCodigo(codigoProduto) {
    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    return produto;
}

// Atualiza o valor unitário.
function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error(
            "O valor deve ser maior ou igual a zero."
        );
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);
    produto.valor = novoValor;

    return produto;
}

// Adiciona unidades à quantidade existente.
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (!Number.isSafeInteger(novaQuantidade) ||
        novaQuantidade < 1) {
        throw new Error(
            "A quantidade a adicionar deve ser um inteiro maior que zero."
        );
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!Number.isSafeInteger(produto.quantidade + novaQuantidade)) {
        throw new Error("A quantidade final é muito grande.");
    }

    produto.quantidade += novaQuantidade;

    return produto;
}

// Cria elementos de texto sem interpretar HTML digitado pelo usuário.
function criarElemento(tag, texto, classe = "") {
    const elemento = document.createElement(tag);
    elemento.textContent = texto;
    elemento.className = classe;
    return elemento;
}

// Renderiza produtos na página.
function renderizarProdutos(colecao = listarProdutos()) {
    listaProdutos.replaceChildren();

    if (colecao.length === 0) {
        listaProdutos.appendChild(
            criarElemento("p", "Nenhum produto encontrado.", "vazio")
        );
        return;
    }

    colecao.forEach(produto => {
        const cartao = document.createElement("article");
        cartao.className = "produto";

        cartao.append(
            criarElemento("h3", produto.descricao),
            criarElemento("p", "Código: " + produto.codigo),
            criarElemento("p", "Quantidade em estoque: " + produto.quantidade),
            criarElemento(
                "p",
                "Valor unitário: " +
                produto.valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })
            ),
            criarElemento(
                "p",
                "Valor total em estoque: " +
                (produto.quantidade * produto.valor).toLocaleString(
                    "pt-BR",
                    {
                        style: "currency",
                        currency: "BRL"
                    }
                )
            )
        );

        listaProdutos.appendChild(cartao);
    });
}

// Evento de cadastro.
formProduto.addEventListener("submit", evento => {
    evento.preventDefault();

    try {
        cadastrarProduto(
            campoDescricao.value,
            Number(campoQuantidade.value),
            Number(campoValor.value)
        );

        formProduto.reset();

        exibirMensagem(
            "Produto cadastrado com sucesso!",
            "sucesso"
        );

        renderizarProdutos();
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
});

// Evento de busca.
document.getElementById("btnBuscar").addEventListener("click", () => {
    const valorCodigo = campoCodigoBusca.value.trim();

    if (valorCodigo === "") {
        exibirMensagem("Digite o código do produto.", "erro");
        return;
    }

    const codigo = Number(valorCodigo);

    if (!Number.isSafeInteger(codigo) || codigo < 1) {
        exibirMensagem("Digite um código inteiro positivo.", "erro");
        return;
    }

    try {
        const produto = buscarProdutoPorCodigo(codigo);

        renderizarProdutos([produto]);
        exibirMensagem("Produto encontrado.", "sucesso");
    } catch (erro) {
        renderizarProdutos([]);
        exibirMensagem(erro.message, "erro");
    }
});

// Exibe todos os produtos.
document.getElementById("btnListar").addEventListener("click", () => {
    campoCodigoBusca.value = "";
    renderizarProdutos();
    exibirMensagem("Lista completa de produtos.", "sucesso");
});

// Evento de atualização do valor.
formValor.addEventListener("submit", evento => {
    evento.preventDefault();

    try {
        const codigo = Number(
            document.getElementById("codigoValor").value
        );

        const novoValor = Number(
            document.getElementById("novoValor").value
        );

        if (!Number.isSafeInteger(codigo) || codigo < 1) {
            throw new Error("Informe um código válido.");
        }

        atualizarValor(codigo, novoValor);

        formValor.reset();
        renderizarProdutos();

        exibirMensagem("Valor atualizado com sucesso!", "sucesso");
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
});

// Evento de atualização da quantidade.
formQuantidade.addEventListener("submit", evento => {
    evento.preventDefault();

    try {
        const codigo = Number(
            document.getElementById("codigoQuantidade").value
        );

        const novaQuantidade = Number(
            document.getElementById("novaQuantidade").value
        );

        if (!Number.isSafeInteger(codigo) || codigo < 1) {
            throw new Error("Informe um código válido.");
        }

        atualizarQuantidade(codigo, novaQuantidade);

        formQuantidade.reset();
        renderizarProdutos();

        exibirMensagem(
            "Estoque atualizado com sucesso!",
            "sucesso"
        );
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
});

// Inicializa a página.
renderizarProdutos();
