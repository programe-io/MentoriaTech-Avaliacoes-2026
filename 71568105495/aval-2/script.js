let tarefas=[];
let geradorCodigo=0
function validarDadosTarefas(titulo,prioridade){
if(titulo.lenght<5){
    throw new Error('O titulo deve ter no minimo 5 caracteres');
}
if(prioridade<1||Prioridade>3){
    throw new Error('Informe uma prioridade entre 1 e 3');
  }
}
function buscarTarefa(codigoTarefa){
    const tarefaBuscar=tarefas.find(t=>t.codigo===codigoTarefa);
    if(!tarefaBuscada){
        throw new Error('codigo de tarefa nao encontrado');
    }
    return tarefasBuscada;
}
function cadastrarTarefa(titulo,prioridade);
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
function concluirTarefas(codigo){
    let tarefa=buscarTarefa(codigo);
    if(tarefa.status===false){
        throw new Error('tarefa ja estava como concluida');
    }
    tarefa.status=false;
}
function alterarPrioridade(codigo,novaPrioridade){
    let tarefa=buscarTarefa(codigo);
    validarDadosTarefa(tarefa.titulo,novaPrioridade);
    tarefa.prioridade=novaPrioridade;
}
cadastrarTarefa('Cadastrar Clientes',1);
console.log(listarTarefas());
alterarPrioridade(1,2);
console.log(listarTarefas());
