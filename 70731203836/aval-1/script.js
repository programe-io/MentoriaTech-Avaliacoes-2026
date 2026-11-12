let tarefas=[];
let geradorcodigo=0;

function validerdadostarefa(titulo,prioridade){
if (titulo.length<5){
    throw new error ('o titulo deve ter no minimo 5 caracteres'); 
}

if(prioridade<1|| prioridade > 3){
    throw new error ('informe uma prioridade entre 1 e 3');
}

}

function cadastrartarefa(titulo,prioridade){
    validerdadostarefa(titulo,prioridade);

    let tarefa={
        'codigo':++geradorcodigo,
        'titulo':titulo,
        'prioridade':prioridade,
        'status':true

    };

    tarefas.push(tarefa);
}

function listartarefas(){
    return tarefas;
}

//lmplementscao incluida para completar o codigo 
function buscartarefa(codigo){
    let tarefa =tarefas.find(t=> t. codigo===codigo);

    if(!tarefa){
        throw new erro('tarefa nao encontrada');
    }

    return tarefa; 
}
function concluirtarefa(codigo){
    let tarefa=buscartarefa(codigo);
}

if(tarefa.status===false){
    throw new error('tarefa ja estava como concluida');
}
tarefa.status=false;

}

function alterarprioridade(codigo,novaprioridade){
    lettarefa=buscartarefa(codigo);

    validardadostarefa(tarefa.titulo,novaprioridade);

    tarefa.prioridade=novaprioridade

}

//testes
cadastrartarefa('cadastrar clientes');
console.log(listartarefas());

alterarprioridade(1,2);

console.log(listartarefas());