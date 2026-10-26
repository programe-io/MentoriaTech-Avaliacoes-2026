let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade) {
    if (typeof titulo !== "string" || titulo.trim().length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres");
    }

    if (prioridade < 1 || prioridade > 3 || !Number.isInteger(prioridade)) {
        throw new Error("Informe uma prioridade entre 1 e 3");
    }
}

function cadastrarTarefa(titulo, prioridade) {
    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        codigo: ++geradorCodigo,
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
    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        throw new Error("Tarefa não encontrada");
    }

    return tarefa;
}

function concluirTarefa(codigo) {
    let tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("Tarefa já estava como concluída");
    }

    tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade) {
    let tarefa = buscarTarefa(codigo);

    validarDadosTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
}

// Testes
cadastrarTarefa("Cadastrar Cliente", 1);

console.log("Lista inicial:");
console.log(listarTarefas());

alterarPrioridade(1, 2);

console.log("Lista após alterar a prioridade:");
console.log(listarTarefas());

concluirTarefa(1);

console.log("Lista após concluir a tarefa:");
console.log(listarTarefas());





