/* Array que vai guardar o conjunto de todas as tarefas */
let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade){
    if(titulo.length < 5){
         throw new Error('O título deve ter no mínimo 5 caracteres');
    }
    if(prioridade < 1 || prioridade >3){
         throw new Error('Informe uma prioridade entre 1 e 3');
    }
}


function buscarTarefa(codigoTarefa){
    const tarefaBuscada = tarefas.find(t => t.codigo === codigoTarefa);

    if(!tarefaBuscada){
        throw new Error('Código de tarefa não encontrado')
    }
    return tarefaBuscada;
}


function cadastrarTarefa(titulo, prioridade){
    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        'codigo': ++geradorCodigo,
        'titulo': titulo,
        'prioridade': prioridade,
        'status': true
    }

    tarefas.push(tarefa);
}


function listarTarefas(){
    return tarefas;
}

function concluirTarefa(codigo){
   let tarefa = buscarTarefa(codigo);

   if(tarefa.status === false){
       throw new Error('Tarefa já estava como concluída')
   }
   tarefa.status = false;
}


function alterarPrioridade(codigo, novaPrioridade){
    let tarefa = buscarTarefa(codigo);
     validarDadosTarefa(tarefa.titulo, novaPrioridade);

     tarefa.prioridade = novaPrioridade
}







cadastrarTarefa('Cadastrar Clientes', 1);
console.log(listarTarefas());

alterarPrioridade(1, 2);



console.log(listarTarefas())






