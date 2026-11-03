let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade){
    if(titulo, length <5) {
        throw new Error ("informe uma prioridade entre 1 e 3") ;
    }
}

function buscarTarefa(codigoTarefas) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigoTarefa;
    });

    if(! tarefa){
        throw new Error("tarefa não encontrada");
    }
    return tarefa;
}

function cadastrarTarefa(titulo, prioridade){
    validarDadosTarefa(titulo, prioridade);

    let tarefa = { 
        "codigo": ++geradorCodigo,
        "titulop":titulo,
        "prioridade":prioridade,
        "status":true

    }

    tarefa.push(tarefa);
}
function listarTarefas(){
    return tarefas; 
}
function concluirTarefas(codigo){
    let tarefas = buscarTarefa(codigo);

    if(tarefas.status === false){
        throw new Erro("tarefa já estava como concluída");
    }
    tarefas.status = false;
}

function alterarPrioridade(codigo, novaPrioridade){
    let tarefa = buscarTarefa(codigo);
    validarDadosTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
}

cadastrarTarefa("cadatrar Clientes", 1);
cadastrarTarefa("limpar banco de dados", 3);
console.log(listatTarefas());

concluirTarefas(2);
console.log(listarTarefas());

alterarPrioridade(1, 2);
console.log(listarTarefas()); 