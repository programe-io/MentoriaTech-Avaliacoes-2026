// Array que vai guardar o conjunto de todas as tarefas
let tarefas = [];
let geradorcodigo = 0;

function validarDadosTarefa(titulo, prioridade){
    if(titulo.length < 5){
        throw new Error('O título deve ter no mínimo 5 caracteres');
    }

    if(prioridade < 1 || prioridade > 3){
        throw new Error('Informe uma prioridade entre 1 e 3');
    }
}

function buscarTarefa(codigoTarefa){
    const tarefaBuscada = tarefas.find(t => t.codigo === codigoTarefa);

    if(!tarefaBuscada){
        throw new Error('Código de tarefa não encontrado');
    }

    return tarefaBuscada;
}

function cadastrarTarefa(titulo, prioridade){
    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        'codigo': ++geradorcodigo,
        'titulo': titulo,
        'prioridade': prioridade,
        'status': true
    }

    tarefas.push(tarefa);
}

function listartarefa(){
    return tarefas;
}

function concluirTarefa(codigo){
    let tarefa = buscarTarefa(codigo);

    if(tarefa.status === false){
        throw new Error('Tarefa já estava como concluída');
    }

    tarefa.status = false;
}

function alterarprioridade(codigo, novaPrioridade){
    let tarefa = buscarTarefa(codigo);

    validarDadosTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
}

function excluirTarefa(codigo){
    let tarefa = buscarTarefa(codigo);

    let indice = tarefas.indexOf(tarefa);

    tarefas.splice(indice, 1);
}


cadastrarTarefa('Cadastrar Clientes', 1);
cadastrarTarefa('Fazer relatório', 2);

console.log(listartarefa());

excluirTarefa(1);

console.log(listartarefa());