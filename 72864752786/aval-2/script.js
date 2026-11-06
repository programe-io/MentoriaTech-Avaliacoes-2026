let tarefas=[]
let geradorCodigo=0;

function validarDadosTarefa(titulo,prioridade){
     if(titu.length.< 5){
        throw  new Error('Otitulo deve ter no mínimo 5 caracteres');
     }
     if(prioridade<1|| prioridade>3){
        throw new Error('informe uma prioridade entre 1e 3');

     }
}
function buscarTarefa(codigoTarefa){
    const tarefaBuscada=tarefas.find(t=codigo===codigoTarefa);
    if(!tarefeBuscada){
        throw new Error('Código de tarefa não encontrado');
    }
    return tarefaBuscada;
 }

 function cadastrarTarefa(titulo,prioridade){
    validarDadosTarefa(titulo,prioridade);
    let tarefa={
        'codigo':++geradorCodigo,
        'titulo':titulo,
        'prioridade':prioridade,
        'status':true
    }
    tarefa.push(tarefa);
 }

 function listarTarefas(){
    return tarefas;
 }
 function concluirTarefa(codigo){
    let tarefa=buscarTarefa(codigo);

    if(tarefa.status===false){
        throw new Error('Tarefa já estava como concluída');
    }
    tarefa.status=false;

 }
 function alterarPrioridade(codigo,novaPrioridade){
    let tarefa=buscarTarefa(codigo);
    validarDadoTarefa(tarefa.titulo,novaPriorideda);

    tarefa.priorideda=novaprioridade;
}
cadastrarTarefa('Cadastrar Clientes',1);
console.log(listarTarefas());

alterarPrioridade(1,2);
console.log(listarTarefas());