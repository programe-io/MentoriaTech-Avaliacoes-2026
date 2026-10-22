let produtos = [];
let proximoCodigo = 1;

const formProduto = document.getElementById("formProduto");
const formValor = document.getElementById("formAtualizarValor");
const formQuantidade = document.getElementById("formAtualizarQuantidade");

function validarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
        throw new Error("A descrição deve ter pelo menos 5 caracteres.");
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error("A quantidade deve ser um número inteiro maior que zero.");
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }
}

function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const produto = {
        codigo: proximoCodigo++,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);
    listarProdutos();

    return produto;
}

function listarProdutos() {
    const lista = document.getElementById("listaProdutos");
    lista.innerHTML = "";

    produtos.forEach(produto => {
        const linha = document.createElement("tr");

        [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })
        ].forEach(texto => {
            const coluna = document.createElement("td");
            coluna.textContent = texto;
            linha.appendChild(coluna);
        });

        lista.appendChild(linha);
    });
}

function buscarProduto(codigo) {
    const produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    return produto;
}

function atualizarValor(codigo, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }

    const produto = buscarProduto(codigo);
    produto.valor = novoValor;
    listarProdutos();
}

function atualizarQuantidade(codigo, quantidade) {
    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error("Informe uma quantidade inteira maior que zero.");
    }

    const produto = buscarProduto(codigo);
    produto.quantidade += quantidade;
    listarProdutos();
}

function mostrarMensagem(texto, erro = false) {
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = texto;
    mensagem.style.color = erro ? "#c62828" : "#218838";
}

formProduto.addEventListener("submit", function(event) {
    event.preventDefault();

    try {
        const descricao = document.getElementById("descricao").value;
        const quantidade = Number(document.getElementById("quantidade").value);
        const valor = Number(document.getElementById("valor").value);

        cadastrarProduto(descricao, quantidade, valor);

        mostrarMensagem("Produto cadastrado com sucesso!");
        formProduto.reset();
    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
});

formValor.addEventListener("submit", function(event) {
    event.preventDefault();

    try {
        const codigo = Number(document.getElementById("codigoValor").value);
        const valor = Number(document.getElementById("novoValor").value);

        buscarProduto(codigo);
        atualizarValor(codigo, valor);

        mostrarMensagem("Valor atualizado com sucesso!");
        formValor.reset();
    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
});

formQuantidade.addEventListener("submit", function(event) {
    event.preventDefault();

    try {
        const codigo = Number(document.getElementById("codigoQuantidade").value);
        const quantidade = Number(document.getElementById("novaQuantidade").value);

        atualizarQuantidade(codigo, quantidade);

        mostrarMensagem("Estoque atualizado com sucesso!");
        formQuantidade.reset();
    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
});