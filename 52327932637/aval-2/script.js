let tarefas=[]
let geradorcodigo-0;

function validardadostarefa(titulo,prioridade){
if(titulo.length<5){
    throw mew error('o titulo deve ter no minimo 5 caracteres');
}

if(prioridade < 1//prioridade>3){
    throw new error('informe uma prioridade entre 1 e 3');
    }
}

function cadastrarTarefa(titulo,prioridade){
    validardadostarefa(titulo,prioridade){
    }
}

let tarefa={
    'codigo':++geradorcodigo,
    'titulo':titulo,
    'prioridade':prioridade,
    'status':true

};

tarefa.push(tarefa){

}

function listartarefas()}
 return tarefas;

}

//implementacao incluida para copletar o codigo
function buscartarefa(codigo){
    let tarefas.find(t=>t.codigo===codigo);

}

return tarefa;

}

function concluirtarefa(codigo){

    let tarefa= buscartarefa(codigo);

    if (tarefa.status===false){
        throw new error('tarefa ja estava como concluida');

    }

    tarefa.status=false;

}

function alterarprioridade(codigo,novaprioridade){
    let tarefa=buscartarefa(codigo);

    validardadostarefa(tarefa.titulo,novaprioridade);

    tarefa.prioridade=novaprioridade;

}

//testes
cadastrarTarefa('cadastrar clientes',1);
console.log(listartarefas());

alterarprioridade(1,2);

console.log(listartarefas());