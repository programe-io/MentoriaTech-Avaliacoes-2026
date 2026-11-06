let tarefas=[];
let geradorCodigo=0;

function ValidarDadosTarefa(titulo,prioridade){
    if(titulo.length<5){
        throw new Error('o título deve ter no mínimo 5 caracteres');
    }
    if(prioridade<1|| prioridade>3){
        throw new Error('informe uma prioridade entre 1 e 3');
    }
}
function buscarTarefa(codigoTarefa){
    const tarefaBuscada= tarefas.find(t=>t.codigo===codigoTarefa);
    
    if(!tarefaBuscada){
        throw new Error('código de tarefa não encontrado');
    }
    return tarefaBuscada
}
function cadastrarTarefa(titulo,prioridade){
    ValidarDadosTarefa(titulo,prioridade);

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
        throw new Error ('tarefa já estava como concluída');
    }
    tarefas.status=false;
}

function alterarPrioridade(codigo,novaPrioridade){
    let tarefa=buscarTarefa(codigo);
    validarDadosTarefa(tarefa.titulo,novaprioridade);

    tarefa.prioridade=novaPrioridade;
}

cadastrarTarefa('cadastrar Clientes',1);
console.log(listarTarefa());

alterarPrioridade(1,2);

console.log(listarTarefa());