
let tarefas = [];

// Validar dados da tarefa
function validarDadosTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres");
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
    return tarefas;
}

// Buscar tarefa
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

// Alterar título
function alterarTitulo(codigo, novoTitulo) {
    let tarefa = buscarTarefa(codigo);

    validarDadosTarefa(novoTitulo, tarefa.prioridade);

    tarefa.titulo = novoTitulo;

    console.log("Título alterado com sucesso!");
}

// Concluir tarefa
function concluirTarefa(codigo) {
    let tarefa = buscarTarefa(codigo);

    tarefa.concluida = true;

    console.log("Tarefa concluída!");
}

// Excluir tarefa
function excluirTarefa(codigo) {
    let indice = tarefas.findIndex(
        tarefa => tarefa.codigo === codigo
    );

    if (indice === -1) {
        throw new Error("Tarefa não encontrada");
    }

    tarefas.splice(indice, 1);

    console.log("Tarefa excluída com sucesso!");
}

// Listar tarefas pendentes
function listarPendentes() {
    return tarefas.filter(tarefa => !tarefa.concluida);
}

// Listar tarefas concluídas
function listarConcluidas() {
    return tarefas.filter(tarefa => tarefa.concluida);
}

// EXECUÇÃO DO PROJETO

cadastrarTarefa("Cadastrar Clientes", 1);
cadastrarTarefa("Organizar Estoque", 3);
cadastrarTarefa("Atualizar Sistema", 5);
cadastrarTarefa("Enviar Relatório", 2);

console.log("\nLISTA DE TAREFAS:");
console.log(listarTarefas());

console.log("\nALTERANDO PRIORIDADE:");
alterarPrioridade(1, 2);

console.log("\nALTERANDO TÍTULO:");
alterarTitulo(2, "Organizar Produtos");

console.log("\nCONCLUINDO TAREFA:");
concluirTarefa(1);

console.log("\nTAREFAS PENDENTES:");
console.log(listarPendentes());

console.log("\nTAREFAS CONCLUÍDAS:");
console.log(listarConcluidas());

console.log("\nEXCLUINDO TAREFA:");
excluirTarefa(3);

console.log("\nLISTA FINAL:");
console.log(listarTarefas());
