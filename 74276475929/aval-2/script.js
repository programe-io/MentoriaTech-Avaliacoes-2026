
/* Lista (Array) de Produtos */

let produtos = [];

let geradorCodigo = 0;

// Elementos HTML

const formProduto = document.getElementById("form-produto");

const descricao = document.getElementById("descricao");
const quantidade = document.getElementById("quantidade");
const valor = document.getElementById("valor");

const codigoValor = document.getElementById("codigo-valor");
const novoValor = document.getElementById("novo-valor");

const codigoQuantidade = document.getElementById("codigo-quantidade");
const novaQuantidade = document.getElementById("nova-quantidade");

const tabelaProdutos = document.getElementById("tabela-produtos");
const mensagem = document.getElementById("mensagem");

// Validar produto

function validarProduto(descricao, quantidade, valor) {

    if (descricao.trim().length < 5) {
        throw new Error("Descrição deve ter no mínimo cinco caracteres.");
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero.");
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero.");
    }

}

// Cadastrar produto

function cadastrarProduto(descricao, quantidade, valor) {

    validarProduto(descricao, quantidade, valor);

    let novoProduto = {

        codigo: ++geradorCodigo,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor

    };

    produtos.push(novoProduto);

    render();

}

// Listar produtos

function listarProdutos() {

    return produtos;

}

// Atualizar valor

function atualizarValor(codigoProduto, novoValor) {

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero.");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.valor = novoValor;

    render();

}

// Atualizar quantidade

function atualizarQuantidade(codigoProduto, novaQuantidade) {

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero.");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.quantidade += novaQuantidade;

    render();

}

// Mostrar mensagem

function mostrarMensagem(texto, erro = false) {

    mensagem.textContent = texto;

    mensagem.style.color = erro ? "red" : "green";

}

// Criar célula

function criarCelula(texto) {

    const td = document.createElement("td");

    td.textContent = texto;

    return td;

}

// Renderizar tabela

function render() {

    tabelaProdutos.innerHTML = "";

    if (produtos.length === 0) {

        const tr = document.createElement("tr");
        const td = document.createElement("td");

        td.colSpan = 4;
        td.textContent = "Nenhum produto cadastrado.";

        tr.appendChild(td);
        tabelaProdutos.appendChild(tr);

        return;

    }

    produtos.forEach(produto => {

        const tr = document.createElement("tr");

        tr.appendChild(criarCelula(produto.codigo));
        tr.appendChild(criarCelula(produto.descricao));
        tr.appendChild(criarCelula(produto.quantidade));

        tr.appendChild(
            criarCelula(
                produto.valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })
            )
        );

        tabelaProdutos.appendChild(tr);

    });

}

// Evento de cadastro

formProduto.addEventListener("submit", function(e) {

    e.preventDefault();

    try {

        cadastrarProduto(
            descricao.value,
            Number(quantidade.value),
            Number(valor.value)
        );

        mostrarMensagem("Produto cadastrado com sucesso!");

        formProduto.reset();

        descricao.focus();

    } catch (erro) {

        mostrarMensagem(erro.message, true);

    }

});

// Evento atualizar valor

document.getElementById("btn-valor").addEventListener("click", function() {

    try {

        atualizarValor(
            Number(codigoValor.value),
            Number(novoValor.value)
        );

        mostrarMensagem("Valor atualizado com sucesso!");

        codigoValor.value = "";
        novoValor.value = "";

    } catch (erro) {

        mostrarMensagem(erro.message, true);

    }

});

// Evento atualizar quantidade

document.getElementById("btn-quantidade").addEventListener("click", function() {

    try {

        atualizarQuantidade(
            Number(codigoQuantidade.value),
            Number(novaQuantidade.value)
        );

        mostrarMensagem("Quantidade atualizada com sucesso!");

        codigoQuantidade.value = "";
        novaQuantidade.value = "";

    } catch (erro) {

        mostrarMensagem(erro.message, true);

    }

});

// Inicialização

render();
