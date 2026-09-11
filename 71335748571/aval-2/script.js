
/*Array que vai guardar o conjunto de todas as tarefas */
let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefas(titulo, prioridade){
  if(titulo.length < 5){
        throw new Error('o titulo deve ter no minimo 5 caracteres');
  }
  if(prioridade < 1 || prioridade > 3){
        throw new Error('informe uma prioridade entre 1 e 3');
  }
}


function buscarTarefa(codigoTarefa){
  const tarefaBuscada = tarefas.find(t => t.codigo === codigoTarefa);

  if(!tarefaBuscada){
       throw new Error('Codigo de tarefa não encontrado')
  }
  return tarefaBuscada;
}


function cadastrarTarefa(titulo, prioridade){
  validarDadosTarefas(titulo, prioridade);
  
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
    throw new Error('Tarefa ja estava como concluida');
  }
  tarefa.status = false; 
}


function alterarPrioridade(codigo, novaPrioridade){
  let tarefa = buscarTarefa(codigo);
  validarDadosTarefas(tarefa.titulo, novaPrioridade);

  tarefa.prioridade = novaPrioridade;
}







cadastrarTarefa('Cadastrar Clientes', 1);
console.log(listarTarefas());


alterarPrioridade(1, 2);


console.log(listarTarefas());


