let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(título, prioridade){
    if(título.length<5){
        throw new Error('O título deve ter no mínimo 5 caractere');
    }


    if (prioridade<1 || prioridade<3){
        throw new Error('informe uma prioridade entre1 e 3')
    }
}

function cadstrarTarefa(título,prioridade){
    validarDadosTarefa(titulo,prioridade);


    let tarefa={
        'codigo':++geradorCodigo,
        'titulo':titulo,
        'prioridade':prioridade,
        'status':true
    };


    tarefas.push(tarefa);

}


function listarTarefas(){
    return tarefas;

}


// Implementacao incluida para completar o codigo
function buscarTarefa(codigo){
    let tarefa= tarefas.find(t=>t.codigo === codigo);


    if (!tarefa){
        throw new Error('tarefa nao encontrada');
    }


    return
}


function concluirTarefa(codigo){
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


//teste
cadastrartarefas('Cadastrar Clientes',1);
console.log(listarTarefas());


alterarPrioridade(1,2);


console.log(listarTarefas());