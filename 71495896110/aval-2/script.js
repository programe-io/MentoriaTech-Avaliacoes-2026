// Array que vai guardar o conjunto de todas as tarefas
let tarefas = [];

function validarDadosTarefa(titulo, prioridade) {

    if (titulo.length < 5) {
        throw new Error('O título deve ter no mínimo 5 caracteres');
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error('Informe uma prioridade entre 1 e 3');
    }
}

function gerarCodigo() {
    return tarefas.length + 1;
}

function cadastrarTarefa(titulo, prioridade) {

    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        'codigo': gerarCodigo(),
        'titulo': titulo,
        'prioridade': prioridade,
        'status': true
    };

    tarefas.push(tarefa);
}

function listarTarefas() {
    return tarefas;
}

function buscarTarefa(codigo) {

    let tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        throw new Error('Tarefa não encontrada');
    }

    return tarefa;
}

function concluirTarefa(codigo) {

    let tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error('A tarefa já estava concluída');
    }

    tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade) {

    let tarefa = buscarTarefa(codigo);

    validarDadosTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
}


// Cadastrar tarefas
cadastrarTarefa('Cadastrar Clientes', 1);
cadastrarTarefa('Limpar banco de dados', 3);

console.log(listarTarefas());

concluirTarefa(2);

console.log(listarTarefas());

alterarPrioridade(1, 2);

console.log(listarTarefas());