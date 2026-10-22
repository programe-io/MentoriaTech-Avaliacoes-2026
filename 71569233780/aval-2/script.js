let tarefas=[];
let geradorCodigo=0;

function validarDadostarefa(titulo,prioridade){
    if(titulo.length<5){
        throw new Error('O título deve ter bo mínimo 5 caracteres');
    }
    if(prioridade<1|| prioridade>3){
        throw new Error('informe uma prioridade entre 1 e 3');
    }
}
function buscarTarefa(codigoTarefa){
    const tarefaBuscada=tarefas.find(t=>t.codigo===codigotarefa);

    if(!tarefaBuscada){
        throw new Error('codigo de tarefa não encontrado');
    }
    return tarefaBuscada;
}
function cadastrarTarefa(titulo,prioridade){
    validarDadostarefa(titulo,prioridade);

    let tarefa={
        'codigo':++geradorCodigo,
        'titulo':titulo,
        'prioridade':prioridade,
        'status':true
    }
    tarefas.push(tarefa);
}
function listarTarefas(){
    return tarefas;
}
function concluirTarefa(codigo){
    let tarefa=buscarTarefa(codigo);

    if(tarefa.status===false){
        throw new Error('tarefa já estava como concluída');
    }
    tarefa.status=false;
}
function alterarprioridade(codigo,novaPrioridade){
    let tarefa=buscarTarefa(codigo);
    validarDadosTarefa(tarefa.titulo,novaPrioridade);

    tarefa.prioridade=novaPrioridade;
}
cadastrarTarefa('cadastrar Clientes',1);
console.log(listarTarefas());

alterarPrioridade(1,2);

console.log(listarTarefas());