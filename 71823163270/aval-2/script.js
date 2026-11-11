
let tarefas = [];

// Validar os dados da tarefa
function validarDadosTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error("O título deve ter pelo menos 5 caracteres");
    }

    if (prioridade < 1 || prioridade > 5) {
        throw new Error("A prioridade deve estar entre 1 e 5");
    }
}

// Cadastrar tarefa
function cadastrarTarefa(titulo, prioridade) {
    validarDadosTarefa(titulo, prioridade);

    const novaTarefa = {
        codigo: tarefas.length + 1,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);

    console.log("Tarefa cadastrada com sucesso!");
}

// Listar tarefas
function listarTarefas() {
    console.log("===== LISTA DE TAREFAS =====");

    return tarefas;
}

// Buscar tarefa pelo código
function buscarTarefa(codigo) {
    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        throw new Error("Tarefa não encontrada");
    }

    return tarefa;
}

// Alterar prioridade
function alterarPrioridade(codigo, novaPrioridade) {
    let tarefa = buscarTarefa(codigo);

    validarDadosTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;

    console.log("Prioridade alterada com sucesso!");
}

// Concluir tarefa
function concluirTarefa(codigo) {
    let tarefa = buscarTarefa(codigo);

    tarefa.concluida = true;

    console.log("Tarefa concluída com sucesso!");
}

// Reabrir tarefa
function reabrirTarefa(codigo) {
    let tarefa = buscarTarefa(codigo);

    tarefa.concluida = false;

    console.log("Tarefa reaberta com sucesso!");
}

// Excluir tarefa
function excluirTarefa(codigo) {
    const indice = tarefas.findIndex(
        tarefa => tarefa.codigo === codigo
    );

    if (indice === -1) {
        throw new Error("Tarefa não encontrada");
    }

    tarefas.splice(indice, 1);

    console.log("Tarefa excluída com sucesso!");
}

// Filtrar tarefas concluídas
function listarConcluidas() {
    return tarefas.filter(tarefa => tarefa.concluida);
}

// Filtrar tarefas pendentes
function listarPendentes() {
    return tarefas.filter(tarefa => !tarefa.concluida);
}

// EXECUÇÃO DO SISTEMA

cadastrarTarefa("Cadastrar Clientes", 2);
cadastrarTarefa("Organizar Estoque", 3);
cadastrarTarefa("Atualizar Sistema", 5);
cadastrarTarefa("Enviar Relatório", 1);

console.log("\n===== TODAS AS TAREFAS =====");
console.log(listarTarefas());

console.log("\n===== ALTERAR PRIORIDADE =====");
alterarPrioridade(1, 5);

console.log("\n===== CONCLUIR TAREFA =====");
concluirTarefa(2);

console.log("\n===== TAREFAS CONCLUÍDAS =====");
console.log(listarConcluidas());

console.log("\n===== TAREFAS PENDENTES =====");
console.log(listarPendentes());

console.log("\n===== REABRIR TAREFA =====");
reabrirTarefa(2);

console.log("\n===== EXCLUIR TAREFA =====");
excluirTarefa(3);

console.log("\n===== LISTA FINAL =====");
console.log(listarTarefas());
