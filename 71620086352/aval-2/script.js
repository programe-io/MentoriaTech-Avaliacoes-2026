/* Array que vai guardar o conjuto de todas as tarefas */
let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade){
  if(titulo.length < 5){
    throw new Error('O titulo deve ter no minimo 5 caractares');
  }
  if(prioridade < 1 || prioridade > 3){
    throw new Error('Informe uma prioridade de 1 a 3');
  }
}


function buscarTarefa(codigoTarefa){
  const tarefaBuscada = tarefas.find(t => t.codigo === codigoTarefa);

  if(!tarefaBuscada){
    throw new Error('Codigo de tarefa não encontrado');
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
    throw new Error('Tarefa já estava como concluida');
  }
  
  tarefa.status = false;
}


function alterarPrioridade(codigo, novaPrioridade){
  let tarefa = buscarTarefa(codigo);
  validarDadosTarefa(tarefa.titulo, novaPrioridade);

  tarefa.prioridade = novaPrioridade;
}









cadastrarTarefa('Cadastrar clientes', 1)
cadastrarTarefa('Limpar banco de dados', 3)
console.log(listarTarefas());


alterarPrioridade(1, 2);

console.log(listarTarefas());