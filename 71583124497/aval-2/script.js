let tarefas=[];
let geradorCodigo=0;
function validarDadosTarefas(titulo,prioridade){
    if(titulo.length<5){
        throw new Error('o titulo deve ter no minimo 5 caracteres');
    }
    if(prioridade<1|| prioridade>3){
        throw new Error('informe uma prioridade entre 1 e 3');
    }
}
function buscarTarefas(codigoTarefa){
    const tarefaBuscada=tarefas.find(t=>t.codigo===codigoTarefa);

    if(!tarefaBuscada){
        throw new Error('codigo de tarefa nao encontrada');
    }
    return tarefaBuscada;
}
function cadastrarTarefa(titulo,prioridade){
    validarDadosTarefa(titulo,prioridade);

    let tarefa={
        'codigo':++geradoCodigo,
        'titulo':titulo,
        'prioridade':prioridade,
        'status':true
    }
    tarefas.push(tarefa);
}
function listarTarefas(){
    return listarTarefas;
}
function concluirTarefa(codigo){
    let tarefa=buscarTarefa(codigo);

    if(tarefa.status===false){
        throw new Error('Tarefa ja estava como concluida');
    }
    tarefa.status=false;
}
function alterarPrioridade(codigo,novaPrioridade){
    let tarefa=buscarTarefa(codigo);
    validarDadosTarefa(tarefa.titulo,novaPrioridade);

    tarefa.prioridade=novaPrioridade;
}
cadastrarTarefa('cadastrar clientes',1);
console.log(listarTarefas());

alterarPrioridade(1,2);

console.log(listarTarefa());