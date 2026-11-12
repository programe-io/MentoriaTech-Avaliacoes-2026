let tarefas=[];
let geradorCodigo=0;

function validarDadosTarefas(titulo,prioridade){
    if(titulo.lenght<5){
        throw new Error('O titulo deve ter no mínino 5 caracteres');
    }
    if(prioridade<1 || prioridade>3){
        throw new Error('informe uma prioridade entre 1 e 3');
    }
}

function buscarTarefas(codigoTarefas){
    const tarefaBuscada=tarefas.find(t=>t.codigo===codigoTarefas);
    if(!tarefaBuscada){
        throw new Error('Código de tarefa não encontrado');
    }
    return tarefaBuscada;
}

function cadastrarTarefas(titulo,prioridade){
    validarDadosTarefas(titulo,prioridade);
    let tarefa={
        'codigo':++geradorCodigo,
        'titulo':titulo,
        'prioridade':prioridade,
        'status':true
    }
    tarefas.push(tarefas);
}
function listarTarefas(){
    return tarefas;
}
function concluirTarefa(codigo){
    let tarefa=buscarTarefas(codigo);
    if(tarefa.status===false){
        throw new Error('Tarefa já estava como concluida');
    }
    tarefa.status=false;
}

function alterarPrioridade(codigo,novaPrioridade){
    let tarefa=buscarTarefas(codigo);
    validarDadosTarefas(tarefa.titulo, novaPrioridade);
    tarefa.prioridade=novaPrioridade;
}
cadastrarTarefas('Cadastrar Cliente ,1);
console.log(listarTarefas());
alterarPrioridade(1,2);
console.log(listarTarefas);