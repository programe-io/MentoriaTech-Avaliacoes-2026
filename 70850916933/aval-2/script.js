
"use strict";

// BANCO DE DADOS EM MEMÓRIA
let tarefas = [];

// CADASTRAR TAREFA
function cadastrarTarefa(titulo, descricao, data, prioridade, categoria) {

    if (!titulo || !descricao || !data || !prioridade || !categoria) {
        return "Preencha todos os campos!";
    }

    const tarefa = {
        id: Date.now() + Math.random(),
        titulo,
        descricao,
        data,
        prioridade,
        categoria,
        status: "Pendente",
        criadaEm: new Date().toLocaleString("pt-BR"),
        concluidaEm: null
    };

    tarefas.push(tarefa);

    return "Tarefa cadastrada com sucesso!";
}

// LISTAR TAREFAS
function listarTarefas() {
    return [...tarefas];
}

// PESQUISAR TAREFAS
function pesquisarTarefa(termo) {

    termo = termo.toLowerCase();

    return tarefas.filter(t =>
        t.titulo.toLowerCase().includes(termo) ||
        t.descricao.toLowerCase().includes(termo) ||
        t.categoria.toLowerCase().includes(termo)
    );

}

// CONCLUIR TAREFA
function concluirTarefa(id) {

    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) {
        return "Tarefa não encontrada!";
    }

    if (tarefa.status === "Concluída") {
        return "Esta tarefa já foi concluída!";
    }

    tarefa.status = "Concluída";
    tarefa.concluidaEm = new Date().toLocaleString("pt-BR");

    return "Tarefa concluída com sucesso!";
}

// REABRIR TAREFA
function reabrirTarefa(id) {

    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) {
        return "Tarefa não encontrada!";
    }

    tarefa.status = "Pendente";
    tarefa.concluidaEm = null;

    return "Tarefa reaberta!";
}

// EDITAR TAREFA
function editarTarefa(id, novosDados) {

    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) {
        return "Tarefa não encontrada!";
    }

    const campos = [
        "titulo",
        "descricao",
        "data",
        "prioridade",
        "categoria"
    ];

    for (const campo of campos) {
        if (
            novosDados[campo] !== undefined &&
            novosDados[campo] !== null
        ) {
            if (
                typeof novosDados[campo] !== "string" ||
                !novosDados[campo].trim()
            ) {
                return "Dados inválidos!";
            }

            tarefa[campo] = novosDados[campo].trim();
        }
    }

    return "Tarefa atualizada com sucesso!";
}

// EXCLUIR TAREFA
function excluirTarefa(id) {

    const indice = tarefas.findIndex(t => t.id === id);

    if (indice === -1) {
        return "Tarefa não encontrada!";
    }

    tarefas.splice(indice, 1);

    return "Tarefa excluída com sucesso!";
}

// FILTRAR TAREFAS PENDENTES
function tarefasPendentes() {

    return tarefas.filter(
        t => t.status === "Pendente"
    );

}

// FILTRAR TAREFAS CONCLUÍDAS
function tarefasConcluidas() {

    return tarefas.filter(
        t => t.status === "Concluída"
    );

}

// IDENTIFICAR TAREFAS ATRASADAS
function tarefasAtrasadas() {

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return tarefas.filter(t => {

        const prazo = new Date(t.data + "T00:00:00");

        return (
            prazo < hoje &&
            t.status === "Pendente"
        );

    });

}

// FILTRAR POR PRIORIDADE
function filtrarPrioridade(prioridade) {

    return tarefas.filter(
        t => t.prioridade === prioridade
    );

}

// FILTRAR POR CATEGORIA
function filtrarCategoria(categoria) {

    return tarefas.filter(
        t => t.categoria === categoria
    );

}

// CONTADORES DO SISTEMA
function relatorioTarefas() {

    return {
        total: tarefas.length,

        pendentes: tarefasPendentes().length,

        concluidas: tarefasConcluidas().length,

        atrasadas: tarefasAtrasadas().length,

        percentualConclusao: tarefas.length
            ? (
                tarefasConcluidas().length /
                tarefas.length
            ) * 100
            : 0
    };

}

// EXEMPLO DE UTILIZAÇÃO

console.log(
    cadastrarTarefa(
        "Estudar JavaScript",
        "Aprender funções e objetos",
        "2026-11-10",
        "Alta",
        "Estudo"
    )
);

console.log(
    cadastrarTarefa(
        "Organizar documentos",
        "Separar documentos pessoais",
        "2026-11-15",
        "Média",
        "Pessoal"
    )
);

// CONSULTAR TODAS AS TAREFAS
console.log(listarTarefas());

// PESQUISAR
console.log(pesquisarTarefa("JavaScript"));

// CONCLUIR A PRIMEIRA TAREFA
const primeiraTarefa = tarefas[0];

console.log(concluirTarefa(primeiraTarefa.id));

// RELATÓRIO
console.log(relatorioTarefas());
