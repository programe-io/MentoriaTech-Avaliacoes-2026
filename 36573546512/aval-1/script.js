// LISTA DE PRODUTOS

let produtos = JSON.parse(
    localStorage.getItem("pinkstock") || "[]"
);

// ELEMENTOS DO HTML

const formulario = document.getElementById("formProduto");

const codigo = document.getElementById("codigo");
const descricao = document.getElementById("descricao");
const quantidade = document.getElementById("quantidade");
const valor = document.getElementById("valor");

const listaProdutos = document.getElementById("listaProdutos");

const pesquisa = document.getElementById("pesquisa");

const indiceEdicao = document.getElementById("indiceEdicao");


// FORMATAR VALORES EM REAIS

function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


// SALVAR PRODUTOS NO NAVEGADOR

function salvarDados() {

    localStorage.setItem(
        "pinkstock",
        JSON.stringify(produtos)
    );

}


// CADASTRAR E EDITAR PRODUTOS

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const novoProduto = {
        codigo: codigo.value.trim(),
        descricao: descricao.value.trim(),
        quantidade: Number(quantidade.value),
        valor: Number(valor.value)
    };

    if (
        !novoProduto.codigo ||
        !novoProduto.descricao ||
        !Number.isInteger(novoProduto.quantidade) ||
        novoProduto.quantidade < 0 ||
        !Number.isFinite(novoProduto.valor) ||
        novoProduto.valor < 0
    ) {

        alert("Preencha todos os campos corretamente!");

        return;

    }

    // VERIFICAR CÓDIGO REPETIDO

    const codigoExiste = produtos.some((produto, index) => {

        return (
            produto.codigo.toLowerCase() ===
            novoProduto.codigo.toLowerCase() &&
            index !== Number(indiceEdicao.value)
        );

    });

    if (codigoExiste) {

        alert("Este código já está cadastrado!");

        return;

    }

    // VERIFICAR SE ESTÁ EDITANDO

    if (indiceEdicao.value !== "") {

        const index = Number(indiceEdicao.value);

        produtos[index] = novoProduto;

        alert("Produto atualizado com sucesso!");

    } else {

        produtos.push(novoProduto);

        alert("Produto cadastrado com sucesso!");

    }

    salvarDados();

    formulario.reset();

    indiceEdicao.value = "";

    document.getElementById("tituloFormulario").textContent =
        "Cadastrar Produto";

    document.getElementById("botaoSalvar").textContent =
        "+ Cadastrar Produto";

    document.getElementById("botaoCancelar").hidden = true;

    atualizarTabela();

});


// LISTAR PRODUTOS

function atualizarTabela() {

    listaProdutos.innerHTML = "";

    const termo = pesquisa.value.toLowerCase().trim();

    const produtosFiltrados = produtos
        .map((produto, index) => ({ produto, index }))
        .filter(({ produto }) => {

            return (
                produto.codigo.toLowerCase().includes(termo) ||
                produto.descricao.toLowerCase().includes(termo)
            );

        });

    document.getElementById("mensagemVazia").style.display =
        produtosFiltrados.length === 0 ? "block" : "none";

    produtosFiltrados.forEach(({ produto, index }) => {

        const linha = document.createElement("tr");

        const valores = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            formatarMoeda(produto.valor)
        ];

        valores.forEach(valorCelula => {

            const celula = document.createElement("td");

            celula.textContent = valorCelula;

            linha.appendChild(celula);

        });

        // ÁREA DOS BOTÕES

        const celulaAcoes = document.createElement("td");

        const divAcoes = document.createElement("div");

        divAcoes.className = "acoes";

        // BOTÃO EDITAR

        const botaoEditar = document.createElement("button");

        botaoEditar.textContent = "Editar";

        botaoEditar.className = "editar";

        botaoEditar.onclick = function() {

            editarProduto(index);

        };

        // BOTÃO EXCLUIR

        const botaoExcluir = document.createElement("button");

        botaoExcluir.textContent = "Excluir";

        botaoExcluir.className = "excluir";

        botaoExcluir.onclick = function() {

            excluirProduto(index);

        };

        divAcoes.appendChild(botaoEditar);

        divAcoes.appendChild(botaoExcluir);

        celulaAcoes.appendChild(divAcoes);

        linha.appendChild(celulaAcoes);

        listaProdutos.appendChild(linha);

    });

    atualizarResumo();

}


// EDITAR PRODUTOS

function editarProduto(index) {

    const produto = produtos[index];

    codigo.value = produto.codigo;

    descricao.value = produto.descricao;

    quantidade.value = produto.quantidade;

    valor.value = produto.valor;

    indiceEdicao.value = index;

    document.getElementById("tituloFormulario").textContent =
        "Alterar Produto";

    document.getElementById("botaoSalvar").textContent =
        "Salvar Alterações";

    document.getElementById("botaoCancelar").hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// CANCELAR EDIÇÃO

function cancelarEdicao() {

    formulario.reset();

    indiceEdicao.value = "";

    document.getElementById("tituloFormulario").textContent =
        "Cadastrar Produto";

    document.getElementById("botaoSalvar").textContent =
        "+ Cadastrar Produto";

    document.getElementById("botaoCancelar").hidden = true;

}


// EXCLUIR PRODUTOS

function excluirProduto(index) {

    const confirmacao = confirm(
        "Deseja realmente excluir este produto?"
    );

    if (confirmacao) {

        produtos.splice(index, 1);

        salvarDados();

        atualizarTabela();

        alert("Produto excluído com sucesso!");

    }

}


// ATUALIZAR RESUMO DO ESTOQUE

function atualizarResumo() {

    // TOTAL DE PRODUTOS

    const totalProdutos = produtos.length;

    // TOTAL DE UNIDADES

    const totalUnidades = produtos.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    // VALOR TOTAL DO ESTOQUE

    const valorTotal = produtos.reduce(
        (total, produto) =>
            total + (produto.quantidade * produto.valor),
        0
    );

    document.getElementById("totalProdutos").textContent =
        totalProdutos;

    document.getElementById("totalUnidades").textContent =
        totalUnidades;

    document.getElementById("valorTotal").textContent =
        formatarMoeda(valorTotal);

}


// PESQUISAR PRODUTOS

pesquisa.addEventListener("input", function() {

    atualizarTabela();

});


// INICIALIZAR SISTEMA

atualizarTabela();