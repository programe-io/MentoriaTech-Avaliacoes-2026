let tarefas=[];
let geradorCoodigo=0;

function validarDadosTarefa(titulo,prioridade){
    if(titulo.length<5){
        throw new Error('Informe uma prioridade entre 1 e 3');
    }
}

function buscarTarefa(codigoTarefa){
    const tarefaBuscada=tarefas.find(t=codigo===codigoTarefa);
    if(!tarefaBuscada){
        throw new Error('Código de tarefa não encontrado');
    }
    return tarefaBuscada;
}

function cadrastarTarefa(titulo,prioridade){
    validarDadosTarefa(titulo,prioridade);
    let tarefa={
        'codigo':++geradorCodigo,
        'titulo':titulo,
        'prioridade':prioridade,
        'status':true
    }
    terefas.push(tarefa);
}
function listarTarefas(){
    return terefas;
}
function concluirTarefa(codigo){
    let terefa=buscarTarefa(codigo);
    if(tarefa.status===false){
        throw new Error('tarefa já estava como concluida');
    }
    tarefa.status=false;
}
function alterarPrioridade(codigo,novaPrioridade){
let tarefa=buscarTarefa(codigo);
validarDadosTarefa(tarefa.titulo,novaPrioridade);

tarefa.prioridade=novaPrioridade;
}
cadrastarTarefa('Cadrastar Clientes', 1);
console.log(listarTarefas());
alterarPrioridade(1,2);
console.log(listarTarefas())

