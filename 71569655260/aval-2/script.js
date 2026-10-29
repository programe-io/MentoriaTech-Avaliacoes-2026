let tarefas=[];
let geradorCodigo = 0;
function validarDadosTerafa(titulo,prioridade){
    if (titulo.length<5){
        throw new Error ('O titulo deve ser ter no minimo 5 caracteres');
    }
    if(prioridade < 1|| prioridade >3){
        throw new Error ('informe uma prioridade entre 1 e 3');
    }
}
function buscarTarefa(codigoTarefa){
    const tarefaBuscada = tarefas.find (=> t.codigo === codigoTarefa);
    if(!tarefaBuscada){
        throw new Error ('Codigo de tarefa não encontrado');
    }
    return tarefaBuscada;
}
function cadastrarTarefa (titulo,prioridade){
    validarDadosTerafa(titulo,prioridade);
    let tarefa = {
        'codigo':++geradorCodigo,
        'titulo': titulo,
        'prioridade':prioridade,
        'status':true
    }
    tarefas.push(tarefa);
}
function listarTarefas(){
    return tarefas;
}
function concluirTarefa(codigo){
    let tarefa = buscarTarefa(codigo);
    if(tarefa.status=== false){
        throw new Error ('tarefa ja estava como concluida');
    }
    tarefa.status = false;
}
function alterarPrioridade(codigo,novaPrioridade){
    let tarefa = buscarTarefa (codigo);
    validarDadosTerafa(tarefa.titulo,novaPrioridade);
    tarefa.prioridade = novaPrioridade;
}
cadastrarTarefa('Cadastrar Cliente',1);
console.log(listarTarefas());
alterarPrioridade(1,2);
console.log(listarTarefas());