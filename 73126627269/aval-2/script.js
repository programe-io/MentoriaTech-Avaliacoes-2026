let tarefas = [];
let geradorcodigo = 0;

function validardadostarefas(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error('O titulo deve ter no minimo 5 caracteres');
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error('Informe uma prioridade entre 1 e 3');
    }
}

function buscartarefas(codigotarefa) {
    const tarefabuscada = tarefas.find(t => t.codigo === codigotarefa);

    if (!tarefabuscada) {
        throw new Error('Codigo de tarefa não encontrado');
    }
}

function cadastrartarefa(titulo, prioridade) {
    validardadostarefas(titulo, prioridade);

    let tarefa = {
        'codigo': geradorcodigo + 1,
        'titulo': titulo,
        'prioridade': prioridade,
        'status': true
    };

    tarefas.push(tarefa);
}

function buscartarefa(codigotarefa) {

}

function listartarefa() {
    return tarefas;
}