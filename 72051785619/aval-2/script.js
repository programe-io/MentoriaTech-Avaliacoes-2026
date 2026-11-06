let tarefas =[];
let geradorCodigo =0;
function validarDadosTarefa(titulos,priodade){
    if(titulo.length<5){
throw new Error('O titulo deve ter no minimo 5 caracteres');
    }
    if(prioridade<1|| prioridade >3){
        throw new Error ('informe uma prioridade entre 1 e 3');
    }
}
function buscarTarefas(codigoTarefa){
    const tarefasBuscada=tarefas.find(t=>t.codigo===codigoTarefa);

    if(!tarefasBuscada){
        throw new Error('código de tarefa não encontrado');
    }
}

function cadastrarTarefa(titulo,prioridade){
    validarDadosTarefa(titulo, prioridade);

    let tarefa={
        'codigo': ++geradorCodigo,
        'titulo': titulo,
        'prioridade': prioridade,
        'status': true
    }

    tarefas.push(tarefas);
}

function listaTarefas(){
    return tarefas;
}
function concluirTarefa(codigo){
    let tarefa=buscarTarefa(codigo);

    if(tarefa.status===false){
        throw new Error('tarefa já estava como concluída' );
    }
    tarefa.status=false;
}
 function alterarPrioridade(codigo,Prioridade){
    let tarefa=buscarTarefa(codigo);
 validarDadosTarefa(tarefa.titulo,novaPrioridade);

 tarefa.prioridade=novaPrioridade;
 }

 cadastrarTarefa('cadastrar Clientes',1);
 console.log(listarTarefas());

 alterarPrioridade(1,2);

 console.log(listarTarefas());
