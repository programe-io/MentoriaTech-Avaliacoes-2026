
// ========================================
// GERENCIADOR INTELIGENTE
// ESTOQUE E TAREFAS
// ========================================


// SALVAR E RECUPERAR DADOS

function carregarDados(chave) {
    try {
        return JSON.parse(localStorage.getItem(chave)) || [];
    } catch {
        return [];
    }
}

let produtos = carregarDados("produtos");
let tarefas = carregarDados("tarefas");

function salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}


// PROTEGER TEXTOS EXIBIDOS

function escapar(texto) {
    return String(texto).replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[caractere]);
}


// ========================================
// MENU DE NAVEGAÇÃO
// ========================================

const botoesAbas = document.querySelectorAll(".aba");
const secoes = document.querySelectorAll(".secao");

botoesAbas.forEach(botao => {

    botao.addEventListener("click", function() {

        botoesAbas.forEach(b => b.classList.remove("ativa"));
        secoes.forEach(s => s.classList.remove("ativa"));

        this.classList.add("ativa");

        const nomeAba = this.dataset.aba;

        document.getElementById(nomeAba).classList.add("ativa");

    });

});


// ========================================
// CONTROLE DE ESTOQUE
// ========================================

const formProduto = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");
const mensagemProdutos = document.getElementById("mensagemProdutos");


// CADASTRAR PRODUTO

formProduto.addEventListener("submit", function(event) {

    event.preventDefault();

    const codigo = document.getElementById("codigoProduto").value.trim();

    const descricao = document.getElementById("descricaoProduto").value.trim();

    const quantidade = Number(document.getElementById("quantidadeProduto").value);

    const valor = Number(document.getElementById("valorProduto").value);

    if (!codigo || !descricao) {
        alert("Preencha o código e a descrição!");
        return;
    }

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        alert("Informe uma quantidade inteira válida!");
        return;
    }

    if (!Number.isFinite(valor) || valor < 0) {
        alert("Informe um valor válido!");
        return;
    }

    const codigoExiste = produtos.some(
        produto => produto.codigo.toLowerCase() === codigo.toLowerCase()
    );

    if (codigoExiste) {
        alert("Este código já está cadastrado!");
        return;
    }

    const novoProduto = {
        codigo,
        descricao,
        quantidade,
        valor
    };

    produtos.push(novoProduto);

    salvarDados();
    mostrarProdutos();

    formProduto.reset();

    alert("Produto cadastrado com sucesso!");

});


// LISTAR PRODUTOS

function mostrarProdutos() {

    listaProdutos.innerHTML = "";

    if (produtos.length === 0) {
        mensagemProdutos.style.display = "block";
        return;
    }

    mensagemProdutos.style.display = "none";

    produtos.forEach((produto, indice) => {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${escapar(produto.codigo)}</td>
            <td>${escapar(produto.descricao)}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })}</td>

            <td>
                <button class="acao alterar"
                    data-acao="valor"
                    data-indice="${indice}">
                    Alterar valor
                </button>

                <button class="acao alterar"
                    data-acao="quantidade"
                    data-indice="${indice}">
                    Alterar quantidade
                </button>
            </td>
        `;

        listaProdutos.appendChild(linha);

    });

}


// ALTERAR PRODUTOS

listaProdutos.addEventListener("click", function(event) {

    const botao = event.target.closest("button[data-acao]");

    if (!botao) return;

    const indice = Number(botao.dataset.indice);
    const acao = botao.dataset.acao;

    const produto = produtos[indice];

    if (!produto) return;

    if (acao === "valor") {

        const novoValor = prompt(
            "Digite o novo valor:",
            produto.valor
        );

        if (novoValor === null) return;

        const valor = Number(novoValor.replace(",", "."));

        if (novoValor.trim() === "" ||
            !Number.isFinite(valor) || valor < 0) {

            alert("Digite um valor válido!");
            return;
        }

        produto.valor = valor;

    }

    if (acao === "quantidade") {

        const novaQuantidade = prompt(
            "Digite a nova quantidade:",
            produto.quantidade
        );

        if (novaQuantidade === null) return;

        const quantidade = Number(novaQuantidade);

        if (novaQuantidade.trim() === "" ||
            !Number.isInteger(quantidade) || quantidade < 0) {

            alert("Digite uma quantidade válida!");
            return;
        }

        produto.quantidade = quantidade;

    }

    salvarDados();
    mostrarProdutos();

    alert("Produto atualizado com sucesso!");

});


// ========================================
// GERENCIADOR DE TAREFAS
// ========================================

const formTarefa = document.getElementById("formTarefa");
const listaTarefas = document.getElementById("listaTarefas");
const mensagemTarefas = document.getElementById("mensagemTarefas");


// CADASTRAR TAREFA

formTarefa.addEventListener("submit", function(event) {

    event.preventDefault();

    const titulo = document.getElementById("tituloTarefa").value.trim();

    const prioridade = Number(
        document.getElementById("prioridadeTarefa").value
    );

    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    if (![1, 2, 3].includes(prioridade)) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    const codigo = tarefas.length > 0
        ? Math.max(...tarefas.map(t => t.codigo)) + 1
        : 1;

    const novaTarefa = {
        codigo,
        titulo,
        prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);

    salvarDados();
    mostrarTarefas();

    formTarefa.reset();

    alert("Tarefa cadastrada com sucesso!");

});


// LISTAR TAREFAS

function mostrarTarefas() {

    listaTarefas.innerHTML = "";

    if (tarefas.length === 0) {
        mensagemTarefas.style.display = "block";
        return;
    }

    mensagemTarefas.style.display = "none";

    tarefas.forEach((tarefa, indice) => {

        let nomePrioridade;

        if (tarefa.prioridade === 1) {
            nomePrioridade = "Alta";
        } else if (tarefa.prioridade === 2) {
            nomePrioridade = "Média";
        } else {
            nomePrioridade = "Baixa";
        }

        const status = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${tarefa.codigo}</td>
            <td>${escapar(tarefa.titulo)}</td>
            <td>${tarefa.prioridade} - ${nomePrioridade}</td>
            <td>${status}</td>

            <td>
                <button class="acao concluir"
                    data-acao="concluir"
                    data-indice="${indice}"
                    ${tarefa.concluida ? "disabled" : ""}>
                    ${tarefa.concluida ? "Concluída" : "Concluir"}
                </button>

                <button class="acao alterar"
                    data-acao="prioridade"
                    data-indice="${indice}">
                    Alterar prioridade
                </button>
            </td>
        `;

        listaTarefas.appendChild(linha);

    });

}


// CONCLUIR TAREFAS E ALTERAR PRIORIDADES

listaTarefas.addEventListener("click", function(event) {

    const botao = event.target.closest("button[data-acao]");

    if (!botao) return;

    const indice = Number(botao.dataset.indice);
    const acao = botao.dataset.acao;

    const tarefa = tarefas[indice];

    if (!tarefa) return;

    if (acao === "concluir") {

        if (tarefa.concluida) return;

        tarefa.concluida = true;

        salvarDados();
        mostrarTarefas();

        alert("Tarefa concluída!");

    }

    if (acao === "prioridade") {

        const novaPrioridade = prompt(
            "Digite a nova prioridade:\n\n1 - Alta\n2 - Média\n3 - Baixa",
            tarefa.prioridade
        );

        if (novaPrioridade === null) return;

        if (!["1", "2", "3"].includes(novaPrioridade.trim())) {
            alert("Digite 1, 2 ou 3!");
            return;
        }

        tarefa.prioridade = Number(novaPrioridade);

        salvarDados();
        mostrarTarefas();

        alert("Prioridade alterada com sucesso!");

    }

});


// ========================================
// INICIAR SISTEMA
// ========================================

mostrarProdutos();
mostrarTarefas();
