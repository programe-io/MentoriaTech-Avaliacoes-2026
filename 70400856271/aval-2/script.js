let tarefas=[];
let geradorCodigo=0;
function validarDadosTarefas(titulo,prioridade){
    if(titulo.lenght<5){
        throw new Error('O título deve ter no mínimo 5 caracteres');
    }
    if(prioridade<1||prioridade>3){
        throw new Error('Informe uma prioridade entre 1 e 3');
    }
}
function buscarTarefa(codigoTarefa){
    const terefaBuscada=tarefas.find(t=>t.codigo===codigoTarefa);
    if(!terefaBuscada){
        throw new Error('Código de tarefa não encontrado');
    }
    return tarefaBuscada;
}
function cadstrarTarefas(titulo,prioridade){
    validarDadosTarefas(titulo,prioridade);
    let tarefa={
        'codigo':++geradorCodigo,
        'titulo': titulo,
        'prioridade':prioridade,
        'status':true
    }
    tarefas.push(tarefas);
}
function listarTarefas(){
    return tarefas;
}
function concluirTarefas(codigo){
    let tarefa=buscarTarefa(codigo);
    if(tarefa.status===false){
        throw new Error('Tarefa já estava concluída');
    }
    tarefa.status=false
}
function alterarPriordade(codigo,novaPrioridade){
    let tarefa=buscarTarefa(codigo);
    validarDadosTarefas(tarefa.titulo,novaPrioridade);
    tarefa.prioridade=novaPrioridade
}
cadstrarTarefas('Cadastar Clientes',1);
console.log(listarTarefas());
alterarPriordade1,2;
console.log(listarTarefas());