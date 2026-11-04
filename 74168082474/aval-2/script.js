
let tarefas = [];
let proximoCodigo = 0;

function validarDadosDaTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres.");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("A prioridade deve estar entre 1 e 3.");
    }
}

function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, prioridade);

    proximoCodigo++;

    const tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);
}

function listarTarefas() {
    return tarefas;
}

function buscarTarefa(codigo) {
    const tarefa = tarefas.find(tarefa => tarefa.codigo === codigo);

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}

function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (!tarefa.status) {
        throw new Error("A tarefa já está concluída.");
    }

    tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
}

cadastrarTarefa("Estudar JavaScript", 1);
cadastrarTarefa("Fazer atividade", 2);
cadastrarTarefa("Organizar caderno", 3);

console.log(listarTarefas());

concluirTarefa(1);

alterarPrioridade(2, 1);

console.log(listarTarefas());