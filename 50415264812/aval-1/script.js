
"use strict";

// Recuperar os produtos armazenados
let produtos = [];

try {
    const dados = localStorage.getItem("meuEstoque");

    if (dados) {
        const recuperados = JSON.parse(dados);

        if (Array.isArray(recuperados)) {
            produtos = recuperados;
        }
    }
} catch (erro) {
    console.error("Erro ao recuperar produtos:", erro);
}

// Elementos HTML
const formulario = document.getElementById("formProduto");
const tabela = document.getElementById("listaProdutos");
const campoPesquisa = document.getElementById("pesquisa");

// Formatar dinheiro
function moeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Salvar produtos
function salvar() {
    try {
        localStorage.setItem(
            "meuEstoque",
            JSON.stringify(produtos)
        );
    } catch (erro) {
        alert("Não foi possível salvar os dados.");
    }
}

// Cadastrar produto
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const codigo = Number(document.getElementById("codigo").value);
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (
        !Number.isSafeInteger(codigo) || codigo <= 0 ||
        descricao === "" ||
        !Number.isSafeInteger(quantidade) || quantidade < 0 ||
        !Number.isFinite(valor) || valor < 0
    ) {
        alert("Verifique os dados informados!");
        return;
    }

    const existe = produtos.some(function(produto) {
        return produto.codigo === codigo;
    });

    if (existe) {
        alert("Este código já existe!");
        return;
    }

    produtos.push({
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    });

    salvar();
    listarProdutos();

    formulario.reset();

    alert("Produto cadastrado com sucesso!");
});

// Criar célula da tabela
function criarCelula(texto) {
    const td = document.createElement("td");
    td.textContent = texto;
    return td;
}

// Listar produtos
function listarProdutos() {

    tabela.innerHTML = "";

    const termo = campoPesquisa.value.toLowerCase().trim();

    const encontrados = produtos.filter(function(produto) {
        return (
            String(produto.codigo).includes(termo) ||
            produto.descricao.toLowerCase().includes(termo)
        );
    });

    encontrados.forEach(function(produto) {

        const tr = document.createElement("tr");

        tr.appendChild(criarCelula(produto.codigo));
        tr.appendChild(criarCelula(produto.descricao));
        tr.appendChild(criarCelula(produto.quantidade));
        tr.appendChild(criarCelula(moeda(produto.valor)));

        const acoes = document.createElement("td");

        // Botão alterar valor
        const btnValor = document.createElement("button");
        btnValor.textContent = "Valor";
        btnValor.className = "btn-valor";

        btnValor.addEventListener("click", function() {
            alterarValor(produto.codigo);
        });

        // Botão alterar quantidade
        const btnQuantidade = document.createElement("button");
        btnQuantidade.textContent = "Quantidade";
        btnQuantidade.className = "btn-quantidade";

        btnQuantidade.addEventListener("click", function() {
            alterarQuantidade(produto.codigo);
        });

        // Botão excluir
        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "btn-excluir";

        btnExcluir.addEventListener("click", function() {
            excluirProduto(produto.codigo);
        });

        acoes.append(btnValor, btnQuantidade, btnExcluir);

        tr.appendChild(acoes);
        tabela.appendChild(tr);
    });

    document.getElementById("mensagemVazia").style.display =
        encontrados.length === 0 ? "block" : "none";

    atualizarResumo();
}

// Alterar valor
function alterarValor(codigo) {

    const produto = produtos.find(function(p) {
        return p.codigo === codigo;
    });

    if (!produto) return;

    const resposta = prompt("Digite o novo valor:");

    if (resposta === null || resposta.trim() === "") return;

    const novoValor = Number(resposta.replace(",", "."));

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Valor inválido!");
        return;
    }

    produto.valor = novoValor;

    salvar();
    listarProdutos();

    alert("Valor alterado com sucesso!");
}

// Alterar quantidade
function alterarQuantidade(codigo) {

    const produto = produtos.find(function(p) {
        return p.codigo === codigo;
    });

    if (!produto) return;

    const resposta = prompt("Digite a nova quantidade:");

    if (resposta === null || resposta.trim() === "") return;

    const novaQuantidade = Number(resposta);

    if (!Number.isSafeInteger(novaQuantidade) || novaQuantidade < 0) {
        alert("Quantidade inválida!");
        return;
    }

    produto.quantidade = novaQuantidade;

    salvar();
    listarProdutos();

    alert("Quantidade alterada com sucesso!");
}

// Excluir produto
function excluirProduto(codigo) {

    const confirmar = confirm("Deseja excluir este produto?");

    if (!confirmar) return;

    produtos = produtos.filter(function(p) {
        return p.codigo !== codigo;
    });

    salvar();
    listarProdutos();

    alert("Produto excluído com sucesso!");
}

// Atualizar os cartões
function atualizarResumo() {

    const total = produtos.length;

    const quantidade = produtos.reduce(function(soma, p) {
        return soma + p.quantidade;
    }, 0);

    const valor = produtos.reduce(function(soma, p) {
        return soma + (p.quantidade * p.valor);
    }, 0);

    document.getElementById("totalProdutos").textContent = total;

    document.getElementById("totalQuantidade").textContent = quantidade;

    document.getElementById("valorTotal").textContent = moeda(valor);
}

// Pesquisa
campoPesquisa.addEventListener("input", listarProdutos);

// Inicialização
listarProdutos();
