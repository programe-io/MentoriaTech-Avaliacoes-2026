// Array que vai guardar o conjunto de todas as tarefas
let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error('O título deve ter no mínimo 5 caracteres');
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error('Informe uma prioridade entre 1 e 3');
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
    return tarefas.find(tarefa => tarefa.codigo === codigo);
}

function concluirTarefa(codigo) {
    let tarefa = buscarTarefa(codigo);

    if (!tarefa) {
        throw new Error('Tarefa não encontrada');
    }

    tarefa.status = false;
}

// Cadastro da primeira tarefa
cadastrarTarefa('Cadastrar Clientes', 1);

console.log(listarTarefas());

// Cadastro da segunda tarefa
cadastrarTarefa('Cadastrar Clientes', 2);

console.log(listarTarefas());
