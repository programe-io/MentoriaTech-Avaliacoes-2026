
"use strict";

let tarefas = [];
let proximoCodigo = 1;

const formulario = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const contador = document.getElementById("contador");
const mensagem = document.getElementById("mensagem");

// Cadastrar uma tarefa
formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    mensagem.textContent = "";

    const titulo = campoTitulo.value.trim();
    const prioridade = Number(campoPrioridade.value);

    if (titulo.length < 5) {
        mensagem.textContent =
            "Erro: o título deve ter pelo menos 5 caracteres.";
        campoTitulo.focus();
        return;
    }

    if (![1, 2, 3].includes(prioridade)) {
        mensagem.textContent =
            "Erro: selecione uma prioridade entre 1 e 3.";
        return;
    }

    const tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);
    proximoCodigo++;

    formulario.reset();
    campoPrioridade.value = "2";

    listarTarefas();

    mensagem.style.color = "#15803d";
    mensagem.textContent = "Tarefa cadastrada com sucesso!";
});

// Mostrar o nome da prioridade
function nomePrioridade(valor) {
    switch (valor) {
        case 1:
            return "Alta";
        case 2:
            return "Média";
        case 3:
            return "Baixa";
        default:
            return "Inválida";
    }
}

// Listar as tarefas
function listarTarefas() {
    listaTarefas.replaceChildren();

    contador.textContent =
        "Total de tarefas: " + tarefas.length;

    if (tarefas.length === 0) {
        const aviso = document.createElement("p");
        aviso.textContent = "Nenhuma tarefa cadastrada.";
        listaTarefas.appendChild(aviso);
        return;
    }

    tarefas.forEach(function(tarefa) {
        const cartao = document.createElement("article");
        cartao.className = "tarefa";

        if (tarefa.concluida) {
            cartao.classList.add("concluida");
        }

        const titulo = document.createElement("h3");
        titulo.textContent =
            "Código: " + tarefa.codigo + " - " + tarefa.titulo;

        const prioridade = document.createElement("p");
        prioridade.textContent =
            "Prioridade: " + tarefa.prioridade +
            " - " + nomePrioridade(tarefa.prioridade);

        const status = document.createElement("p");
        status.textContent = tarefa.concluida
            ? "Status: Concluída"
            : "Status: Pendente";

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const botaoConcluir = document.createElement("button");
        botaoConcluir.type = "button";
        botaoConcluir.className = "btn-concluir";
        botaoConcluir.textContent = tarefa.concluida
            ? "Tarefa concluída"
            : "Marcar como concluída";
        botaoConcluir.disabled = tarefa.concluida;

        botaoConcluir.addEventListener("click", function() {
            concluirTarefa(tarefa.codigo);
        });

        const botaoAlterar = document.createElement("button");
        botaoAlterar.type = "button";
        botaoAlterar.className = "btn-alterar";
        botaoAlterar.textContent = "Alterar prioridade";

        botaoAlterar.addEventListener("click", function() {
            alterarPrioridade(tarefa.codigo);
        });

        acoes.append(botaoConcluir, botaoAlterar);

        cartao.append(
            titulo,
            prioridade,
            status,
            acoes
        );

        listaTarefas.appendChild(cartao);
    });
}

// Marcar uma tarefa como concluída
function concluirTarefa(codigo) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) {
        return;
    }

    tarefa.concluida = true;
    listarTarefas();
}

// Alterar a prioridade de uma tarefa
function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada.");
        return;
    }

    const resposta = prompt(
        "Digite a nova prioridade:\n" +
        "1 - Alta\n" +
        "2 - Média\n" +
        "3 - Baixa",
        String(tarefa.prioridade)
    );

    if (resposta === null) {
        return;
    }

    const valor = resposta.trim();

    if (!["1", "2", "3"].includes(valor)) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = Number(valor);
    listarTarefas();
}

// Exibir a lista inicial
listarTarefas();
