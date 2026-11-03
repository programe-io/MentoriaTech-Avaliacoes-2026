let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade) { 
    if(titulo.length < 5) {
        throw new Error('o titulo deve ter no minimo 5 caracteres');
    }

    if(prioridade < 1 || prioridade > 3){
        throw new Error( 'Informe uma prioridade entre 1 e 3');
    }
}

function buscarTarefa(codigoTarefa) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigoTarefa;
    });

    if(!tarefa) {
        throw new Error('Tarefa não encontrada');
    }
    
    return tarefa;
}

function cadastrarTarefa(titulo, prioridade) {
    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        'codigo': ++geradorCodigo,
        'titulo': titulo,
        'prioridade': prioridade,
        'status': true
    }

    tarefas.push(tarefa);
}

function listarTarefas() {
    return tarefas;
}

function concluirTarefa(codigo) {
    let tarefa = buscarTarefa(codigo);

    if(tarefa.status === false) {
        throw new Error('Tarefa já estava como concluída');
    }
    tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade) {
    let tarefa = buscarTarefa(codigo);
    validarDadosTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
}

cadastrarTarefra('Cadastrar Clientes', 1);
cadastrarTarefa('Limpar banco de dados', 3);
console.log(listarTarefas());

concluirTarefa(2);
CONSOLE.LOG(listarTarefas());

alterarPrioridade(1, 2);
console.log(listarTarefas());